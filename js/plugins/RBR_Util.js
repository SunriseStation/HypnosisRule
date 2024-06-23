//=============================================================================
// RBR_Util.js
//=============================================================================

/*:
 * @plugindesc General utility functions
 * @author KineticDog
 *
 *
 */
function RBR_Util() {
  // get all meanningful values from object
  this.validValues = _.flow(_.values, _.compact);

  // generate file path with number pattern
  this.genPath = (prefix = '', max = 0, max2 = 0) => {
    if (max) {
      if (max2) {
        const fnPrefix = _.isString(prefix) ? (num, num2) => `${prefix}.${num}.${num2}` : prefix;
        const range1 = _.range(1, max + 1);
        const range2 = _.range(1, max2 + 1);
        const paths = _.flatten(range1.map(num1 => range2.map(num2 => fnPrefix(num1, num2))));
        return paths;
      } else {
        const fnPrefix = _.isString(prefix) ? num => `${prefix}.${num}` : prefix;
        const paths = _.range(1, max + 1).map(num => fnPrefix(num));
        return paths;
      }
    } else return [];
  };

  // generate list of string with number
  this.genName = (suffix = '', range1 = 1, range2) => {
    const start = _.isNumber(range2) ? range1 : 1;
    const end = _.isNumber(range2) ? range2 : range1;
    if (end > start) {
      const paths = _.range(start, end + 1).map(num => `pic_actor${num}_${suffix}`);
      return paths;
    } else return [];
  };

  // randomly pick an integer number from 1 to max
  this.ranNum = (max, exclusions = []) => _.sample(_.without(_.range(1, max + 1), ...exclusions));

  this.sample = (items, exclusions = []) => _.sample(_.without(items, ...exclusions));

  // trigger a random check and return result
  this.triggered = (rate = 0.5) => {
    const validRate = Math.floor(_.clamp(rate * 100, 0, 100));
    const value = _.random(1, 100);
    return validRate >= value;
  };

  // get an integer value within a range
  this.polish = (value, range = [0, 100]) => {
    return Math.floor(_.clamp(value, ...range));
  };

  // randomly pick one item from weighted items
  this.weightedSample = (options, key = 'value') => {
    if (options && options.length) {
      const samples = _.concat(...options.map(option => _.times(option.weight, () => option[key])));
      return _.sample(samples);
    }
  };

  // get a random variance
  this.variance = (variance = 0.2) => _.random(1 - variance, 1 + variance, true);

  // used in functions called with high frequency, where normal log would cause lag
  this.throttleLog = _.throttle(params => {
    console.log(params);
  }, 1000);

  this.getSelfSwitch = (evtName, tag = 'A') => {
    const event = this.findMapEvent(evtName);
    const value = $gameSelfSwitches.value([$gameMap._mapId, event.id, tag]);
    return value;
  };

  // turn self switch to specific value, or turn to opposite if not providing value
  this.toggleSelfSwitch = (evtName, tag = 'A') => {
    const event = this.findMapEvent(evtName);
    const value = $gameSelfSwitches.value([$gameMap._mapId, event.id, tag]);
    $gameSelfSwitches.setValue([$gameMap._mapId, event.id, tag], !value);
  };

  // construct basic util functions for all variables
  Object.entries(VARS).forEach(([variable, idx]) => {
    this[_.camelCase(`get_${variable}`)] = () => $gameVariables.value(idx);
    this[_.camelCase(`set_${variable}`)] = value => $gameVariables.setValue(idx, value);
    this[_.camelCase(`add_${variable}`)] = (value, reason) => {
      // verify
      const current = $gameVariables.value(idx);
      if (!_.isNumber(current)) throw new Error(`Variable ${idx} is not a number`);
      // set value
      const varDetails = VAR_DETAILS[idx];
      if (value) {
        let newValue = current + value;
        if (varDetails && varDetails.range)
          newValue = _.clamp(current + value, ...varDetails.range);
        if (newValue !== current) $gameVariables.setValue(idx, newValue);
        // notification
        if (varDetails.notification && newValue !== current) {
          const positive = value === Math.abs(value);
          const color = varDetails.moreBetter === positive ? COLORS.BUFF : COLORS.DEBUFF;
          const labelReason = reason ? $util.localize('#{lblDueTo}', reason) : '';
          const name = `${varDetails.icon}${varDetails.label}`;
          const change = positive ? '#{lblIncreaseBy}' : '#{lblDecreaseBy}';
          const fmtValue = Number(Math.abs(value)).toLocaleString();
          $util.notification(color, `${labelReason}${name}${change}${fmtValue} `);
        }
      }
    };
  });

  // construct basic util functions for all switches
  Object.entries(SWITCHES).forEach(([swc, idx]) => {
    this[_.camelCase(`get_${swc}`)] = () => $gameSwitches.value(idx);
    this[_.camelCase(`set_${swc}`)] = value => {
      $gameSwitches.setValue(idx, value);
    };
    this[_.camelCase(`toggle_${swc}`)] = () =>
      $gameSwitches.setValue(idx, !$gameSwitches.value(idx));
  });

  // data process during rule config change
  this.saveRule = rules => {
    $util.setRule(rules);
    // add rule item according to rule change
    const ruleIds = RULES.map(rule => rule.id);
    $gameParty.items().forEach(item => {
      if (ruleIds.includes(item.id)) $gameParty.loseItem(item, 1, true);
    });
    rules.forEach(rule => {
      if (rule.value === RULE_OPTS.OPEN) $gameParty.gainItem($dataItems[rule.id], 1, true);
      // add rule debuff according to rule change
      if (rule.state) {
        $gameParty.members().forEach(actor => {
          if (rule.value) {
            if (!actor.hasState(rule.state)) actor.addNewState(rule.state);
          } else actor.removeState(rule.state);
        });
      }
    });
  };

  // check value of a rule
  this.checkRule = id => {
    const rules = $util.getRule() || [];
    const rule = rules.find(rule => rule.id === id);
    return rule && rule.value;
  };

  // play a list of messages
  this.playMsg = (...msgs) => {
    if (msgs && msgs.length) {
      $util.setMsg(msgs.map(msg => formatMsg(msg)));
      $gameTemp.reserveCommonEvent(EVENTS.MSG);
    }
  };

  // assemble message data rm message format
  this.MSG_POS = { TOP: 0, MID: 1, BTTM: 2 };
  this.MSG_BACK = { WIN: 0, DIM: 1, TRAN: 2 };
  const formatMsg = msg => {
    if (_.isString(msg)) return msg;
    else if (msg.text) {
      const speed = ConfigManager.delay;
      const { text, title, pos, back } = msg;
      if (_.isNumber(pos)) $gameMessage.setPositionType(pos);
      if (_.isNumber(back)) $gameMessage.setBackground(back);
      const strTitle = title ? `\\n<${title}>` : '';
      const strQuick = speed ? `${_.repeat('\\.', speed)}\\^` : '';
      return `${strTitle}${text}${strQuick}`;
    }
  };

  let notiStart = false;
  const msgs = [];
  this.notification = (color, msg, ...params) => {
    if (msg && msg.length) {
      const text = this.localize(msg, ...params);
      msgs.push({ text, color });
      if (!notiStart) playNotification();
    }
  };

  const playNotification = () => {
    if (msgs.length) {
      notiStart = true;
      const { text, color } = msgs.shift();
      Notification.add(text, 7, color || COLORS.DEBUFF);
      setTimeout(() => {
        playNotification();
      }, 500);
    } else notiStart = false;
  };

  // perform event with parameters
  let eventParams = undefined;
  this.playEvent = (event, params) => {
    eventParams = params;
    $gameTemp.reserveCommonEvent(event);
  };
  this.getEventParams = key => (key ? _.get(eventParams, key) : eventParams);
  this.setEventParams = params => {
    eventParams = params;
  };
  this.addEventParams = params => {
    eventParams = { ...eventParams, ...params };
  };
  this.clearEventParams = () => {
    eventParams = undefined;
  };

  // use localization with parameters
  this.localize = (label, ...params) => IAVRA.I18N.localize(label, ...params);

  this.pureLocalize = (label, ...params) => IAVRA.I18N.localize(`#{${label}}`, ...params);

  // find event object in current map by event name
  this.findMapEvent = evtName => {
    const eventData = $dataMap.events.find(event => event && event.name === evtName);
    if (!eventData) throw Error(`Event '${evtName}' not exist`);
    const event = $gameMap.events().find(event => event && event.eventId() === eventData.id);
    return event;
  };

  this.playSe = (name, options = { volume: 90, pitch: 100, pan: 0 }) =>
    AudioManager.playSe({ name, volume: 90, pitch: 100, pan: 0, ...options });

  this.playBgm = (name, options = { volume: 90, pitch: 100, pan: 0 }) =>
    AudioManager.playBgm({ name, volume: 90, pitch: 100, pan: 0, ...options });

  // time related
  this.getPeriod = () => PERIODS.find(period => period.hours.includes($util.getTime()));
  this.hideTime = () => {
    $gameScreen.erasePicture(1);
    SceneManager.clearText();
  };
  this.addTime = hour => {
    if (!hour) return;
    const time = $util.getTime() || 0;
    $util.setTime((time + hour) % 24);
    const period = $util.getPeriod();
    $util.setPeriod(period.id);
    $util.notification(COLORS.DEBUFF, '#{lblTimePass}', hour);
    if ((time + hour) / 24 > 1) {
      // debt increase when a new day comes
      const debtIncrease = Math.floor($util.getDebt() * 0.5);
      $util.addDebt(debtIncrease, '#{lblReason.debtRate}');
    }
  };

  const briefPlaceholder = '\\C[8]????????????????????';
  const descPlaceholder = '\\C[8]????????????????????????????????????????';
  // setup rule basic structure; init rule to original format
  this.initRules = () => {
    const prevRules = $util.getRule() || [];
    const rules = RULES.map(rule => {
      const prevRule = prevRules.find(prevRule => prevRule.id === rule.id) || {};
      const showBasic = rule.isBasic || prevRule.basicOwned;
      const options = [];
      if (!rule.isBasic)
        options.push({
          id: RULE_OPTS.CLOSE,
          label: '#{lblClose}',
          desc: prevRule.basicOwned ? `#{lblRules.${rule.id}.basic}` : descPlaceholder,
        });
      if (showBasic)
        options.push({
          id: RULE_OPTS.OPEN,
          label: rule.isBasic ? '#{lblForceOpen}' : '#{lblOpen}',
          desc: showBasic ? `#{lblRules.${rule.id}.basic}` : descPlaceholder,
        });

      return {
        ...rule,
        label: showBasic ? `\\I[${rule.id + 31}]#{lblRules.${rule.id}.brief}` : briefPlaceholder,
        value: rule.isBasic ? RULE_OPTS.OPEN : RULE_OPTS.CLOSE,
        options,
        basicOwned: showBasic,
      };
    });
    $util.saveRule(rules);
  };

  // update rule options with latest rules purchased
  this.updateRules = prevRules => {
    const rules = (prevRules || $util.getRule()).map(rule => {
      const options = [];
      if (!rule.isBasic)
        options.push({
          id: RULE_OPTS.CLOSE,
          label: '#{lblClose}',
          desc: rule.basicOwned ? `#{lblRules.${rule.id}.basic}` : descPlaceholder,
        });
      if (rule.isBasic || rule.basicOwned)
        options.push({
          id: RULE_OPTS.OPEN,
          label: rule.isBasic ? '#{lblForceOpen}' : '#{lblOpen}',
          desc: rule.basicOwned ? `#{lblRules.${rule.id}.basic}` : descPlaceholder,
        });
      return {
        ...rule,
        label: rule.basicOwned
          ? `\\I[${rule.id + 31}]#{lblRules.${rule.id}.brief}`
          : briefPlaceholder,
        options,
      };
    });
    $util.saveRule(rules);
  };

  // get the description of a certain rule
  this.getRuleDesc = id => {
    const rule = $util.getRule().find(rule => rule.id === id);
    const option = rule.options.find(option => option.id === rule.value);
    return option.desc;
  };

  // When a new rule option added, activate this option
  this.setNewRuleOption = (id, value) => {
    const rules = $util.getRule();
    const rule = rules.find(rule => rule.id === id);
    rule.value = value;
    if (value === RULE_OPTS.OPEN) rule.basicOwned = true;
    $util.updateRules(rules);
  };

  // array to object
  this.arrToObj = array =>
    array.reduce((array, text, idx) => ({ ...array, [String(idx + 1)]: text }), {});

  this.resortObj = obj =>
    Object.entries(obj).reduce((obj, [key, value], idx) => ({ ...obj, [idx + 1]: value }), {});

  this.setSelfSwitch = (eventId, tag, value) => {
    $gameSelfSwitches.setValue([$gameMap._mapId, eventId, tag], value);
  };

  // format message for requirement
  this.formatReq = (reqs, params) => {
    const content = _.join(
      _.concat(reqs).map(req => (_.isFunction(req.label) ? req.label(params) : req.label)),
      ` #{lblAnd} `,
    );
    return content && `【${content}】`;
  };

  this.verifyReq = (reqs, logic = LOGICS.AND, params) => {
    const results = _.concat(reqs).map(req => !!req.verify(params));
    if (logic === LOGICS.AND) return !results.includes(false);
    else return results.includes(true);
  };

  // setup choices based on requirements
  this.setupReqChoice = (choices, msg, onCancel) => {
    const choiceLabels = [];
    const choiceHelps = [];
    choices.forEach((choice, idx) => {
      const verified = $util.verifyReq(choice.reqs || [], choice.logic, choice.params);
      const color = verified ? '\\C[0]' : '\\C[8]';
      const reqLabel = verified ? '' : $util.formatReq(choice.reqs || [], choice.params);
      const label = `${color}#{${choice.label}}${reqLabel}`;
      choiceLabels.push(label);
      choiceHelps.push(choice.help);
      if (!verified) $gameSystem.disableChoice(idx + 1);
    });
    $gameMessage.add(msg);
    $gameMessage.setChoices(choiceLabels, 0);
    $gameMessage.setChoiceHelps(choiceHelps);
    $gameMessage.setChoiceCallback(idx => {
      $gameSystem.clearChoiceSettings();
      const choice = choices.find(choice => choice.id === idx);
      if (choice) {
        $util.playEvent(choice.event, choice.params);
        if (choice.onFinish) choice.onFinish();
      } else if (onCancel) {
        onCancel();
      }
    });
  };

  // sort an array in a random order
  this.randomSort = (input = []) => _.sortBy(input, () => _.random(input.length * 10));

  this.eventTrigger = (events, key = 'id') => {
    while (events.length) {
      const idx = _.random(events.length - 1);
      const event = events[idx];
      if ($util.triggered(event.rate)) {
        return event[key];
      }
      events.splice(idx, 0);
    }
  };

  this.eachActor = fn => $gameParty.members().forEach(actor => fn(actor));
}

const $util = new RBR_Util();
