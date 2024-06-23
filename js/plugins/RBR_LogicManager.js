//=============================================================================
// RBR_LogicManager.js
//=============================================================================

/*:
 * @plugindesc General place for holding business logics
 * @author KineticDog
 *
 *
 */
function RBR_LogicManager() {
  // setup debug mode
  this.initDebug = () => {
    this.initGame();
    $dataArmors.forEach(item => item && $gameParty.gainItem(item, 10));
    // const rules = $util.getRule().map(rule => {
    //   return {
    //     ...rule,
    //     basicOwned: true,
    //     value: RULE_OPTS.OPEN,
    //   };
    // });
    // $util.saveRule(rules);
    $gameParty.members().forEach(actor => {
      // actor.addState(STATES.NO_VIOLENCE);
      // actor.addState(STATES.NO_COUNTER);
      // [
      //   STATES.CORRUPTION,
      //   STATES.FAVORABILITY,
      //   STATES.SENSITIVITY,
      //   STATES.HORNY,
      //   STATES.SEX_ADDICTION,
      //   STATES.SM_ADDICTION,
      //   STATES.CRISIS_ADDICTION,
      // ].forEach(stateId => actor.addState(stateId, { lv: 1 }));
    });
    // $util.setSlaved(true);
    $util.setProg(PROGS.MANAGER);
    $util.setDebugSkip(false);
    $util.setDebugWin(false);
    $util.setDebugLose(false);
    $util.setPoint(100000);
    $util.setEnemyAgent(true);
    $util.setSlaveReset(true);
    $util.setCompere(true);
    $util.setChest(true);
    $util.setSecurity(10);
    $util.setDiscipline(10);
    // $util.setRank(0);
    $util.setDebt(1000000);
    $util.setFirstSlave(true);
  };

  // initiation of a new game play
  this.initGame = () => {
    // game init
    if (!$util.getInit()) {
      // init basic rules
      $util.initRules();
      // init rule parameter items
      this.initRuleParams();
      // init time
      $util.setTime(7);
      const period = $util.getPeriod();
      $util.setPeriod(period.id);
      // avoid init second time
      $util.setInit(true);
      // init arena
      this.initArena();
      // blank hint text
      $util.setDanceSkip('#{lblLongPressJump}');
      // init new day
      $util.setNewDay(true);
    }
  };

  // init rule parameter items
  this.initRuleParams = () => {
    $util.setSecurity(60);
    $util.setDiscipline(80);
    $util.setRank(5);

    for (let id = 31; id < 38; id++) $gameParty.gainItem($dataItems[id], 1, true);
  };

  // init map
  const MAP_COM_POS = {
    FOOD: { pos: [16, 6], dir: DIRECTS.UP },
    WASHING: { pos: [17, 6], dir: DIRECTS.UP },
    BASIN: { pos: [18, 5], dir: DIRECTS.UP },
    COMPUTER: { pos: [12, 6], dir: DIRECTS.UP },
    BED: { pos: [10, 5], dir: DIRECTS.DOWN },
    MONITOR: { pos: [15, 6], dir: DIRECTS.DOWN },
  };
  this.isBeforeMonitor = () => $util.findMapEvent('npcCommander').x === MAP_COM_POS.MONITOR.pos[0];
  this.initCommander = () => {
    const commander = $util.findMapEvent('npcCommander');
    const locations = Object.values(_.omit(MAP_COM_POS, ['BED', 'MONITOR']));
    const period = $util.getPeriod();
    const location = period.id === MAP_PERIOD.NIGHT ? MAP_COM_POS.BED : _.sample(locations);
    commander.locate(...location.pos);
    commander.setDirection(location.dir);
  };
  this.initStation = () => {
    if ($util.getInitStation()) return;
    // init window
    Galv.SPAWN.event(MAP_EVENT.evtWinStationIn, 3, 2, true);
    Galv.SPAWN.event(MAP_EVENT.evtWinStationIn, 6, 2, true);
    $util.setInitStation(true);
  };
  this.resetCommander = () => {
    // init commander location
    const commander = $util.findMapEvent('npcCommander');
    const locations = Object.values(_.omit(MAP_COM_POS, ['BED', 'MONITOR']));
    const period = $util.getPeriod();
    const location = period.id === MAP_PERIOD.NIGHT ? MAP_COM_POS.BED : _.sample(locations);
    commander.locate(...location.pos);
    commander.setDirection(location.dir);
  };
  this.initBaseMap = () => {
    if ($util.getInitBase()) return;
    // init neon
    [1, 8, 32, 39].forEach(x => {
      Galv.SPAWN.event(MAP_EVENT.evtNeon, x, 9, true);
    });
    [12, 28].forEach(x => {
      Galv.SPAWN.event(MAP_EVENT.evtNeon, x, 8, true);
    });
    // light source
    Galv.SPAWN.event(MAP_EVENT.evtLightSource, 20, 11, true);
    // heart
    [16, 18, 20, 22, 24].map(x => {
      Galv.SPAWN.event(MAP_EVENT.evtHeartUp1, x, 8, true);
      Galv.SPAWN.event(MAP_EVENT.evtHeartDown1, x, 9, true);
    });
    [17, 19, 21, 23].map(x => {
      Galv.SPAWN.event(MAP_EVENT.evtHeartUp2, x, 8, true);
      Galv.SPAWN.event(MAP_EVENT.evtHeartDown2, x, 9, true);
    });
    $util.setInitBase(true);
  };
  // !REMINDER: remove all windows and small light source to increase performance
  this.initTownMap = () => {
    if ($util.getInitTown()) return;
    $util.setInitTown(true);
  };

  // setup npc display in the street
  this.refreshTown = () => {
    const npcs = [20, 21, 23, 24];
    const time = $util.getTime();
    const period = $util.getPeriod();
    // refresh all npcs
    if (time > 5 && time < 23 && $util.getProg() >= PROGS.REINFORCE) {
      npcs.forEach(npc => {
        const event = $gameMap.event(npc);
        $gameSelfSwitches.setValue([event._mapId, event._eventId, 'A'], false);
      });
    } else {
      npcs.forEach(npc => {
        const event = $gameMap.event(npc);
        $gameSelfSwitches.setValue([event._mapId, event._eventId, 'A'], true);
      });
    }
    // init light source
    Galv.SPAWN.clear(MAPS.TOWN, true);
    if (period.id !== MAP_PERIOD.DAY) {
      // init street lamp
      [3, 20, 37].forEach(x => {
        [6, 18].forEach(y => {
          Galv.SPAWN.event(MAP_EVENT.evtStreetLamp, x, y);
        });
      });
    }
    // mini light source
    [
      [21, 0],
      [22, 0],
      [30, 0],
      [31, 0],
      [34, 2],
      [20, 3],
      [21, 3],
      [29, 3],
      [31, 3],
      [32, 3],
      [34, 3],
      [24, 4],
      [28, 4],
      [29, 4],
      [34, 4],
      [23, 5],
      [29, 5],
    ].forEach(([x, y]) => {
      Galv.SPAWN.event(MAP_EVENT.evtMiniLightSource, x, y);
    });
    // $lgcMgr.refreshAmbient();
  };

  this.refreshExit = () => {
    // 14 ~ 25
    const doors = _.range(14, 26);
    const stages = $util.getStages();
    doors.forEach(door => {
      const stage = stages.find(stage => stage.id === door - 13);
      if (!stage.locked) $gameSelfSwitches.setValue([MAPS.EXIT, door, 'A'], true);
    });
  };

  this.showTitle = () => {
    $imgMgr.setup(1, 'title_en', [Graphics.boxWidth / 2, Graphics.boxHeight / 2]);
    $imgMgr.reset(1, 200);
    setTimeout(() => {
      $imgMgr.reset(1, 1000);
    }, 1000);
  };

  this.totalRecover = () => {
    $gameParty.members().forEach(actor => {
      actor.gainHp(actor.mhp);
      actor.gainMp(actor.mmp);
    });
  };

  const MAP_RULE_ITEM = RULES.reduce((items, rule) => {
    if (!rule.isBasic) items.push({ id: rule.id, type: RULE_OPTS.OPEN, price: 1000 });
    return items;
  }, []);
  // setup rule shop item status
  this.setupRuleShop = () => {
    $util.setOptionWrap(true);
    const point = $util.getPoint();
    const rules = $util.getRule();
    const choices = [];

    MAP_RULE_ITEM.forEach(item => {
      const rule = rules.find(rule => rule.id === item.id);
      if (item.type === RULE_OPTS.OPEN && rule.basicOwned) return;
      choices.push(item);
    });
    if (choices.length) {
      const choiceLabels = [];
      const choiceHelps = [];
      choices.forEach((choice, idx) => {
        choiceLabels.push(`#{lblRules.${choice.id}.brief}`);
        choiceHelps.push(`#{lblRules.${choice.id}.basic}`);
        // disable rule item if can't afford the price
        if (point < choice.price) $gameSystem.disableChoice(idx + 1);
      });

      $gameMessage.add($util.localize('#{msgRuleShop}', $util.getPoint()));
      $gameMessage.setChoices(choiceLabels, 0);
      $gameMessage.setChoiceHelps(choiceHelps);
      $gameMessage.setChoiceCallback(idx => {
        $util.setOptionWrap(false);
        // recover global choice status
        $gameSystem.clearChoiceSettings();
        if (!_.isNumber(idx)) {
          if ($util.getEventParams('change')) $util.playEvent(EVENTS.RULE_CHANGED);
          return;
        }
        const item = choices[idx];
        $effect.playSe('Shop2');
        $util.addPoint(-item.price);
        $util.notification(COLORS.DEBUFF, '#{lblNewRuleActivated}', `#{lblRules.${item.id}.brief}`);
        $util.setNewRuleOption(item.id, item.type);
        $util.addRuleBought(1);
        $util.playEvent(EVENTS.RULE_SHOP, { change: true });
      });
    } else {
      $lgcMgr.activateAchievement(9);
      $gameMessage.add('#{msgAllRuleBought}');
      if ($util.getEventParams('change')) $util.playEvent(EVENTS.RULE_CHANGED);
    }
  };

  // format range rule type description
  this.getRangeColor = (value, range) => {
    if (range) return _.inRange(value, range[0], range[1] + 1) ? '\\C[0]' : '\\C[7]';
    else return value <= 0 ? '\\C[0]' : '\\C[7]';
  };

  // format level type state description
  this.getLevelColor = (value, req) => (value === req ? '\\C[0]' : '\\C[7]');

  // check the top lewd level
  this.getLewdLevel = actorId => {
    const actor = $gameActors.actor(actorId);
    const lewdDebuff = [STATES.CORRUPTION, STATES.FAVORABILITY, STATES.HORNY, STATES.SEX_ADDICTION];
    const maxLevel = Math.max(
      ...lewdDebuff.map(id => {
        const state = STATE_DETAILS[id];
        const stateDetails = actor.stateDetails(state.id);
        if ((state.types || []).includes(STATE_TYPES.GAUGE) && stateDetails.gauge !== 100) return 0;
        else return stateDetails.lv || 0;
      }),
    );
    return Math.min(3, maxLevel);
  };

  this.getStateLevel = (actorId, stateId) => {
    const actor = $gameActors.actor(actorId);
    const details = actor.stateDetails(stateId);
    const level = _.get(details, 'lv', 0);
    const DETAILS = STATE_DETAILS[stateId];
    if (DETAILS.types.includes(STATE_TYPES.GAUGE)) {
      const gauge = _.get(details, 'gauge', 0);
      return gauge === 100 ? level : 0;
    } else return level;
  };

  // get the minimum lewd level of all actors
  this.getGroupLewdLevel = () => {
    const levels = $gameParty.members().map(actor => $lgcMgr.getLewdLevel(actor.actorId()));
    return Math.min(...levels, 3);
  };

  // get the minimum level of a state among all actors
  this.getStateMinLevel = stateId => {
    const levels = $gameParty.members().map(actor => {
      const state = STATE_DETAILS[stateId];
      const stateDetails = actor.stateDetails(state.id);
      if ((state.types || []).includes(STATE_TYPES.GAUGE) && stateDetails.gauge !== 100) return 0;
      else return stateDetails.lv || 0;
    });
    return Math.min(...levels);
  };

  // generate the npc citizens in scene encounter
  this.genSceneEncounterNpc = () => {
    Galv.SPAWN.event(MAP_EVENT.evtCitizenDown, 7, 7);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenDown, 11, 7);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenDown, 12, 7);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenRight, 4, 8);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenRight, 4, 10);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenRight, 4, 11);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenRight, 3, 10);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenUp, 6, 13);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenUp, 8, 13);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenUp, 12, 13);
    Galv.SPAWN.event(MAP_EVENT.evtCitizenUp, 7, 14);
  };

  // process duel money change
  this.processDuelMoney = (win, enemy) => {
    const enemyRank = RANKS[enemy];
    // win if enemyRank is not passed
    if (enemy > ENEMIES.CITIZEN)
      if (win) {
        const rank = $util.getRank();
        const money = rank * 10000;
        if (rank >= 0) {
          if (rank >= 0) $util.addMoney(money, '#{lblReason.duelWin}');
        } else {
          $util.notification(COLORS.DEBUFF, '#{lblWinNoMoney}', rank);
        }
      } else {
        const money = enemyRank * 100000;
        $util.addDebt(money, '#{lblReason.duelLose}');
      }
  };

  // process duel rank change
  this.processDuelRank = win => {
    if (win) $util.addRank(1, '#{lblReason.duelWin}');
    else $util.addRank(-1, '#{lblReason.duelLose}');
  };

  // setup services provided for agent
  this.setupAgent = () => {
    const choices = [
      {
        id: 0,
        label: 'lblBuyRule',
        event: EVENTS.RULE_SHOP,
        reqs: REQS.SLAVED(true),
      },
      {
        id: 1,
        label: 'lblConfigRule',
        event: EVENTS.RULE_CONFIG,
        reqs: [REQS.SLAVED(true), REQS.BUY_RULE(1)],
      },
      {
        id: 2,
        label: 'lblResetRule',
        event: EVENTS.RULE_RESET_OPTIONS,
      },
      {
        id: 3,
        label: 'lblConfigRuleHint',
        event: EVENTS.RULE_HINT,
        reqs: [REQS.SLAVED(true)],
      },
      {
        id: 4,
        label: 'lblCancel',
      },
    ];
    $util.setupReqChoice(choices, '#{msgAgentCall}');
  };

  // setup reset rule choices
  this.setupRuleResetMode = () => {
    const choices = [
      {
        id: 0,
        label: 'lblResetAllRules',
        event: EVENTS.RULE_RESET,
      },
      {
        id: 1,
        label: 'lblResetSlavery',
        event: EVENTS.RULE_RESET,
        reqs: [REQS.RESET_RULE_ONCE, REQS.SLAVED(true)],
        params: { onlySlavery: true },
      },
      {
        id: 2,
        label: 'lblCancel',
      },
    ];
    $util.setupReqChoice(choices, '#{msgHowToReset}');
  };

  // setup dance options
  this.setupDance = () => {
    const choices = [
      {
        id: 0,
        label: 'lblYes',
        event: EVENTS.DANCE,
        reqs: REQS.OPEN_RULE(29),
      },
      {
        id: 1,
        label: 'msgForgetIt',
      },
    ];
    $util.setupReqChoice(choices, '#{msgDance}');
  };

  // get the general bust of actors based on status
  this.getBust = (actorId, slaved) => {
    const MAP_LEWD_FACE = {
      0: 'normal',
      1: 'shy',
      2: 'tough',
      3: 'alluring',
    };
    const isSlaved = slaved === undefined ? $util.getSlaved() : slaved;
    const enemy = isSlaved ? '_villain_hug' : '';
    const lewdLevel = Math.min(3, $lgcMgr.getLewdLevel(actorId));
    const face = MAP_LEWD_FACE[lewdLevel];
    const bustName = `port_actor${actorId}${enemy}_${face}`;
    return bustName;
  };

  this.getBustByLewdLevel = (actorId, LewdFaces) => {
    const lewdLevel = Math.min(3, $lgcMgr.getLewdLevel(actorId));
    return `port_actor${actorId}_${LewdFaces[lewdLevel]}`;
  };

  // bust when actors should show sad faces
  this.getSadBust = (actorId, slaved) => {
    const isSlaved = slaved === undefined ? $util.getSlaved() : slaved;
    const enemy = isSlaved ? '_villain_hug' : '';
    const face = $lgcMgr.getLewdLevel(actorId) > 2 ? 'tough' : 'sad';
    const bustName = `port_actor${actorId}${enemy}_${face}`;
    return bustName;
  };

  // bust when actors should show angry faces
  this.getAngryBust = (actorId, slaved) => {
    const mapFace = {
      0: 'angry',
      1: 'reluctant',
      2: 'shy',
      3: 'tough',
    };
    const isSlaved = slaved === undefined ? $util.getSlaved() : slaved;
    const enemy = isSlaved ? '_villain_hug' : '';
    const face = mapFace[Math.min(3, $lgcMgr.getLewdLevel(actorId))];
    const bustName = `port_actor${actorId}${enemy}_${face}`;
    return bustName;
  };

  // Reset all rules
  this.resetRules = (onlySlavery, byDuel) => {
    // rule clear
    if (!onlySlavery) $util.initRules();
    // var clear
    $util.setSlaved(false);
    if (!onlySlavery) {
      const securityPoint = 100 - $util.getSecurity();
      $util.setSecurity(100);
      $util.addPoint(securityPoint, '#{lblReason.securityReset}');
      const disciplinePoint = 100 - $util.getDiscipline();
      $util.setDiscipline(100);
      $util.addPoint(disciplinePoint, '#{lblReason.disciplineReset}');
      const rankPoint = (5 - $util.getRank()) * 10;
      $util.setRank(5);
      $util.addPoint(rankPoint, '#{lblReason.rankReset}');
      const debtPoint = Math.floor($util.getDebt() / 100000);
      $util.setDebt(0);
      $util.addPoint(debtPoint, '#{lblReason.debtClear}');
    }

    // state clear
    if (onlySlavery) {
      $gameParty.members().forEach(actor => {
        actor.removeState(STATES.SLAVED);
      });
      // Won't calculate point if reset triggerred by winning the slave masters in duel
      if (!byDuel) $util.addPoint(30, '#{lblReason.stateRemove}');
    } else {
      let stateLevel = 0;
      $gameParty.members().forEach(actor => {
        Object.values(STATES).forEach(stateId => {
          const stateDetails = STATE_DETAILS[stateId];
          if (actor.hasState(stateId) && (stateDetails.types || []).includes(STATE_TYPES.DEBUFF)) {
            const level = _.get(actor.stateDetails(stateId), 'lv', 0);
            const levelSum = level + 1;
            stateLevel += levelSum;
          }
          actor.removeState(stateId);
        });
      });
      if (stateLevel) $util.addPoint(stateLevel * 10, '#{lblReason.stateRemove}');
    }
    // tp clear
    if (!onlySlavery) {
      let tpPoint = 0;
      $gameParty.members().forEach(actor => {
        if (actor.tp > 0) {
          tpPoint += Math.ceil(actor.tp / 10);
          actor.gainTp(-100);
        }
      });
      if (tpPoint) $util.addPoint(tpPoint, '#{lblReason.tpClear}');
    }
  };

  // format the order of leaders
  this.formatLeader = () => {
    const MAP_LEADER_NAME = {
      [ENEMIES.TORTOISE]: '\\C[11]#{lblTortoise}\\fr',
      [ENEMIES.JELLYFISH]: '\\C[9]#{lblJellyfish}\\fr',
      [ENEMIES.INKFISH]: '\\C[10]#{lblInkfish}\\fr',
    };
    const leaders = [ENEMIES.TORTOISE, ENEMIES.JELLYFISH, ENEMIES.INKFISH];
    const stages = $util.getStages();
    const leaderOrders = stages
      .filter(stage => leaders.includes(stage.enemy))
      .map(stage => MAP_LEADER_NAME[stage.enemy]);
    return $util.localize('#{msgEnemyOrder.2}', ...leaderOrders);
  };

  // form next stage basic info based on stage specification in STAGES constant
  this.formStage = stageId => {
    const stage = STAGES.find(stage => stage.id === stageId);
    const difficulty = _.isNumber(stage.difficulty) ? stage.difficulty : stage.difficulty();
    const bonus = _.isNumber(stage.bonus) ? stage.bonus : stage.bonus(difficulty);
    const actor = _.sample([0, 1, 2, 3]);
    return { id: stageId, difficulty, bonus, actor };
  };

  // initiate all stages
  this.initArena = () => {
    const leaders = [
      ...$util.randomSort([ENEMIES.TORTOISE, ENEMIES.JELLYFISH, ENEMIES.INKFISH]),
      ENEMIES.WHALE,
    ];
    const prevStages = $util.getStages();
    const stages = STAGES.map((stage, idx) => {
      const next = _.times(stage.next, () => $lgcMgr.formStage(stage.id + 1)).map(
        (nextStage, idx) => ({
          ...nextStage,
          enemy: (stage.id + 1) % 3 === 0 ? leaders[(stage.id + 1) / 3 - 1] : ENEMIES.RAY,
          x: stage.next === 1 ? 12 : 6 + 6 * idx,
        }),
      );
      return {
        id: stage.id,
        locked: prevStages ? prevStages[idx].locked : true,
        enemy: stage.id % 3 === 0 ? leaders[stage.id / 3 - 1] : ENEMIES.RAY,
        next,
        active: false,
      };
    });
    $util.setStages(stages);
  };

  this.unlock = () => {
    const stages = $util.getStages();
    const stage = _.findLast(stages, stage => stage.active);
    stage.locked = false;
    $util.setStages(stages);
    $gameSelfSwitches.setValue([MAPS.ARENA, 3, 'A'], false);
    $gameSelfSwitches.setValue([MAPS.ARENA, 3, 'B'], true);
  };

  this.isLocked = stageId => {
    const stages = $util.getStages();
    const stage = stageId
      ? stages.find(stage => stage.id === stageId)
      : _.findLast(stages, stage => stage.active);
    return stage.locked;
  };

  this.formatUnlockMsg = () => {
    const stages = $util.getStages();
    const id = _.findLast(stages, stage => stage.active).id;
    const level = `${id % 3 === 0 ? Math.floor(id / 3) : Math.floor(id / 3) + 1}-${
      id % 3 === 0 ? 3 : id % 3
    }`;
    return $util.localize('#{msgUnlocked}', level);
  };

  // arrange stage elements
  this.setupStage = stageBasic => {
    Galv.SPAWN.clear(MAPS.ARENA, true);
    // merge all info
    const stages = $util.getStages();
    const idx = stages.findIndex(stage => stage.id === stageBasic.id);
    const stage = { ...stages[idx], ...stageBasic, active: true };
    stages[idx] = stage;
    $util.setStages(stages);
    // stage board
    Galv.SPAWN.event(stage.id + 27, 24, 0, true);
    // lock
    if (stage.locked) {
      Galv.SPAWN.event(MAP_EVENT.evtSwitchLocked, 0, 15, true);
      $gameSelfSwitches.setValue([MAPS.ARENA, 3, 'A'], true);
      $gameSelfSwitches.setValue([MAPS.ARENA, 3, 'B'], false);
    } else {
      Galv.SPAWN.event(MAP_EVENT.evtSwitchUnlocked, 0, 15, true);
      $gameSelfSwitches.setValue([MAPS.ARENA, 3, 'A'], false);
      $gameSelfSwitches.setValue([MAPS.ARENA, 3, 'B'], true);
    }
    // major enemy
    Galv.SPAWN.event(stage.enemy + MAP_EVENT.evtArenaRay - 2, 12, 8);
    // minion leaders based on difficulty
    const subLeaders = [];
    for (let count = stage.difficulty; count > 1; count--)
      subLeaders.push(12 + (count - 1) * 4, 12 - (count - 1) * 4);
    subLeaders.forEach(x => {
      Galv.SPAWN.event(MAP_EVENT.evtArenaRay, x, 8);
    });
    // bonus
    Galv.SPAWN.event(MAP_EVENT.evtChestNormal - 1 + stage.bonus, 12, 5, true);
    // next stage
    stage.next.forEach((nextStage, idx) => {
      // door
      Galv.SPAWN.event(MAP_EVENT.evtNextStage1st + idx, nextStage.x, 2, true);
      // lazer
      Galv.SPAWN.event(MAP_EVENT.evtLazer, nextStage.x, 2);
      // board
      if (nextStage.enemy === ENEMIES.RAY)
        Galv.SPAWN.event(MAP_EVENT.evtMinion - 1 + nextStage.difficulty, nextStage.x - 1, 1, true);
      else Galv.SPAWN.event(MAP_EVENT.evtGeneral - 1, nextStage.x - 1, 1, true);
      Galv.SPAWN.event(MAP_EVENT.evtGeneral + nextStage.actor, nextStage.x, 1, true);
      Galv.SPAWN.event(MAP_EVENT.evtNormal - 1 + nextStage.bonus, nextStage.x + 1, 1, true);
    });
    // play arena scene
    $util.playEvent(EVENTS.ARENA, {
      enemy: stage.enemy,
      difficulty: stage.difficulty,
      stage: stage.id,
    });
  };

  // next stages selected
  this.selectStage = idx => {
    const stages = $util.getStages();
    const stage = _.findLast(stages, stage => stage.active);
    this.setupStage(stage.next[idx]);
  };

  // setups after battle win
  this.stageWin = () => {
    // remove lazer and enemy
    Galv.SPAWN.clear(MAPS.ARENA);
    const stages = $util.getStages();
    const stage = _.findLast(stages, stage => stage.active);
    // major enemy down
    Galv.SPAWN.event(stage.enemy + MAP_EVENT.evtRayBreakdown - 2, 12, 8);
    // minion leaders down based on difficulty
    const subLeaders = [];
    for (let count = stage.difficulty; count > 1; count--)
      subLeaders.push(12 + (count - 1) * 4, 12 - (count - 1) * 4);
    subLeaders.forEach(x => {
      Galv.SPAWN.event(MAP_EVENT.evtRayBreakdown, x, 8);
    });
    // achievements
    $lgcMgr.activateAchievement(stage.enemy + 1);
  };

  this.battleWin = () => {
    const enemy = $lgcMgr.getBattleInfo('target');
    $lgcMgr.processDuelMoney(true, enemy);
    $lgcMgr.processDuelRank(true);
    $util.addSecurity(10, '#{lblReason.duelWin}');
    $util.addDiscipline(10, '#{lblReason.duelWin}');
    $lgcMgr.totalRecover();
    $lgcMgr.resetRules(true, true);
  };

  this.battleLose = () => {
    const enemy = $lgcMgr.getBattleInfo('target');
    $gameParty.members().forEach(actor => {
      [
        STATES.CORRUPTION,
        STATES.FAVORABILITY,
        STATES.SENSITIVITY,
        STATES.HORNY,
        STATES.SEX_ADDICTION,
        STATES.SM_ADDICTION,
        STATES.CRISIS_ADDICTION,
      ].forEach(state => {
        if (actor.hasState(state)) actor.addStateLevel(state);
      });
    });
    $lgcMgr.processDuelMoney(false, enemy);
    $lgcMgr.processDuelRank(false);
    $util.addSecurity(-10, '#{lblReason.duelLose}');
    $util.addDiscipline(-10, '#{lblReason.duelLose}');
    $util.addPoint(3000, '#{lblReason.duelLose}');
    $dataArmors.forEach(item => item && $gameParty.gainItem(item, -99, true));
    $util.notification(COLORS.DEBUFF, '#{lblEquipmentGone}');
    $gameScreen.startFadeOut(20);
    if ($util.getSlaved()) {
      $util.playEvent(EVENTS.AFTER_DEFEAT, { new: false });
    } else {
      $util.setSlaved(true);
      $gameParty.members().forEach(actor => actor.addState(STATES.SLAVED));
      $util.playEvent(EVENTS.AFTER_DEFEAT, { new: true });
    }
    $lgcMgr.totalRecover();
    $lgcMgr.initArena();
  };

  this.afterSex = () => {
    $lgcMgr.totalRecover();
    $gameParty.members().forEach(actor => {
      [
        STATES.CORRUPTION,
        STATES.FAVORABILITY,
        STATES.SENSITIVITY,
        STATES.HORNY,
        STATES.SEX_ADDICTION,
        STATES.SM_ADDICTION,
        STATES.CRISIS_ADDICTION,
      ].forEach(state => {
        if (actor.hasState(state)) actor.addStateLevel(state);
      });
    });
    $util.addDiscipline(-10, '#{lblReason.sex}');
  };

  // get name of enemy by id
  this.enemyName = enemyId => {
    const enemy = $dataEnemies.find(enemy => enemy && enemy.id === enemyId);
    return enemy.name;
  };

  // setup options of street talk
  this.setupStreetTalk = (target, interpreter) => {
    const params = { target, mapId: interpreter._mapId, eventId: interpreter._eventId };
    // otherwise npc would move during talk
    $gameMap.event(params.eventId)._moveType = 0;
    const isCitizen = target === ENEMIES.CITIZEN;
    const onCancel = () => ($gameMap.event(params.eventId)._moveType = 1);
    const choices = [
      {
        id: 0,
        label: 'lblTalk',
        event: EVENTS.STREET_TALK,
        params,
        help: this.formatTalkTopics(params),
      },
      {
        id: 1,
        label: isCitizen ? 'lblDemandSex' : 'lblPayDebt',
        event: isCitizen ? EVENTS.DEMAND_SEX : EVENTS.PAY_DEBT,
        reqs: isCitizen ? [REQS.DEMAND_SEX] : [REQS.DEBT(1), REQS.MONEY(1)],
        params,
      },
      { id: 2, label: 'msgOver', onFinish: onCancel },
    ];
    const enemy = isCitizen ? '#{lblMsgCitizenA}' : '#{lblMsgRayA}';
    $util.setupReqChoice(choices, `${enemy}#{msgWhatsup}`, onCancel);
  };

  // check if talk topics can happen in current context
  const verifyTalkTopics = params =>
    TOPICS.filter(topic =>
      topic.scenes.includes(
        params.target === ENEMIES.CITIZEN ? SCENES.STREET_CITIZEN : SCENES.STREET_VILLAIN,
      ),
    )
      .map(topic => ({
        ...topic,
        verified: $util.verifyReq(topic.reqs, topic.logic, params),
      }))
      .map(topic => ({ ...topic, weight: topic.verified ? topic.weight : 0 }));

  // randomly pick one topic to happen in street meet
  this.pickTalkTopic = params => {
    const topics = verifyTalkTopics(params);
    const sample = $util.weightedSample(topics, 'label');
    const topic = topics.find(topic => topic.label === sample);
    $util.playEvent(topic.event, params);
  };

  // format help message of possible talk topics
  this.formatTalkTopics = params => {
    const topics = verifyTalkTopics(params);
    const sum = _.sumBy(topics, 'weight');
    const helps = topics
      .map(topic => ({
        ...topic,
        rate: topic.weight / sum,
      }))
      .map(topic => {
        const color = topic.verified ? '\\C[0]' : '\\C[8]';
        const rate = Math.floor(topic.rate * 100);
        const reqLabel = topic.verified ? '' : $util.formatReq(topic.reqs || [], topic.params);
        return `\n${color}#{${topic.label}} (${rate}%)${reqLabel}`;
      });
    return '#{lblPossibleEvents}' + helps.join('; ');
  };

  // general procedures to clearup talk events
  this.clearEvent = hourPassed => {
    const eventParams = $util.getEventParams();
    const { mapId, eventId } = eventParams;
    CallPluginCommand('filter_clear');
    $imgMgr.clearAll();
    if (hourPassed) $util.addTime(hourPassed);
    $lgcMgr.refreshTown();
    $lgcMgr.refreshAmbient();
    $gameSelfSwitches.setValue([mapId, eventId, 'A'], true);
  };

  // get common chat of an enemy
  this.getEnemyChat = () => {
    const enemy = $util.getEventParams().enemy;
    const mapMsg = {
      [ENEMIES.RAY]: 'msgArenaRay',
      [ENEMIES.TORTOISE]: 'msgArenaTortoise',
      [ENEMIES.JELLYFISH]: 'msgArenaJellyfish',
      [ENEMIES.INKFISH]: 'msgArenaInkfish',
      [ENEMIES.WHALE]: 'msgArenaWhale',
    };
    return `#{${mapMsg[enemy]}}`;
  };

  // format the data details of a state
  this.formatStateInfo = (stateId, actor = $gameParty.menuActor()) => {
    const stateInfo = STATE_DETAILS[stateId];
    const { types, format } = stateInfo;
    const details = actor.stateDetails(stateId);
    const items = [];
    if (types.includes(STATE_TYPES.TURN))
      items.push({ label: '#{lblTurnLeft}', value: actor.stateTurns(stateId) });
    if (types.includes(STATE_TYPES.LEVEL)) {
      const suffix = details.lv === 100 ? ' (MAX)' : '';
      items.push({ label: '#{lblEffectLevel}', value: `${details.lv}${suffix}` });
    }
    if (types.includes(STATE_TYPES.GAUGE)) {
      let label = '#{lblBreakout}';
      if (stateId === 34) label = '#{lblBondageEndurance}';
      else if (stateId === 35) label = '#{lblEjaculation}';
      items.push({ label, value: `${details.gauge} / 100` });
    }
    if (types.includes(STATE_TYPES.MINION)) {
      const suffix = details.lv === 100 ? ' (MAX)' : '';
      items.push({ label: '#{lblNumPeople}', value: `${details.stk}${suffix}` });
      items.push({ label: '#{lblTotalHp}', value: `${details.hp} / ${details.maxHp}` });
    }
    if (types.includes(STATE_TYPES.STACK)) {
      items.push({
        label: '#{lblStack}',
        value: format ? format(details.stk, stateInfo) : details.stk,
      });
    }
    if (types.includes(STATE_TYPES.PENALTY)) {
      const rate = $lgcMgr.debuffRate(actor, { id: stateId });
      items.push({ label: '#{lblOverallDebuff}', value: `${rate * 100}%` });
    }
    const desc = items.map(item => `${item.label}: ${item.value}`).join('; ');
    return `\\C[21]${desc}\\fr`;
  };

  // decide the comment of a duel among citizen
  this.citizenComment = () => {
    const MAP_REASON = { SUPPORT: 0, SECURITY: 1, DISCIPLINE: 2 };
    const options = [{ value: MAP_REASON.SUPPORT, weight: 5 }];
    // security unsupport
    const security = $util.getSecurity();
    let weightSecurity = 0;
    if (security < 26) weightSecurity = 20;
    else if (security < 51) weightSecurity = 10;
    else if (security < 76) weightSecurity = 2;
    options.push({ value: MAP_REASON.SECURITY, weight: weightSecurity });
    // discipline unsupport
    const discipline = $util.getDiscipline();
    let weightDiscipline = 0;
    if (discipline < 26) weightDiscipline = 20;
    else if (discipline < 51) weightDiscipline = 10;
    else if (discipline < 76) weightDiscipline = 2;
    options.push({ value: MAP_REASON.DISCIPLINE, weight: weightDiscipline });
    // result
    const votes = _.times(3, () => $util.weightedSample(options));
    const opposalLevel = votes.filter(vote => vote > MAP_REASON.SUPPORT).length;
    const comments = votes.map(vote => {
      const prefix = vote ? 'Unsupport' : 'Support';
      let suffix = '';
      if (vote === MAP_REASON.SECURITY) suffix = 'Security';
      else if (vote === MAP_REASON.DISCIPLINE) suffix = 'Discipline';
      const label = `#{msg${prefix}${suffix}.${_.random(4)}}`;
      return { vote, label };
    });
    $util.setEventParams({ ...$util.getEventParams(), opposalLevel, comments });
  };

  // play sound corresponding to vote result
  this.voteSoundEffect = idx => {
    const comment = $util.getEventParams('comments')[idx];
    if (comment.vote) {
      $effect.playSe(SOUNDS.UNSUPPORT);
      $util.notification(COLORS.DEBUFF, '#{lblNotSupport}');
    } else {
      $effect.playSe(SOUNDS.SUPPORT);
      $util.notification(COLORS.BUFF, '#{lblSupport}');
    }
  };

  // get enemy port according to enemy type
  this.getEnemyBust = enemy => {
    const MAP_ENEMY = _.invert(ENEMIES);
    const enemyType = _.isNumber(enemy) ? enemy : $util.getEventParams('target');
    const enemyLabel = _.lowerCase(MAP_ENEMY[String(enemyType)]);
    return `port_${enemyLabel}`;
  };

  // check if opposal debuff can be added
  this.triggerOpposalDebuff = () => {
    // at least one citizen opposes
    const opposal = $util.getEventParams('opposalLevel') > 0;
    // opposal debuff rule activates
    const rule = $util.getRule()[18].value > 0;
    return opposal && rule;
  };
  // check if sm addiction is triggered
  this.triggerSmAddiction = lv => $lgcMgr.getStateMinLevel(STATES.SM_ADDICTION) >= (lv || 1);
  // check if crisis addiction is triggered
  this.triggerCrisisAddiction = lv =>
    $lgcMgr.getStateMinLevel(STATES.CRISIS_ADDICTION) >= (lv || 1);
  // check if rank penalty debuff can be added
  this.triggerRankPenalty = () => {
    // enemy rank is higher than actors
    const rank = RANKS[$util.getEventParams('target')] > $util.getRank();
    return rank;
  };
  // check if gain pleasure from gaining debuff
  this.triggerDebuffAddiction = () => {
    // rule state reaches lv3
    const rule = $lgcMgr.getStateMinLevel(STATES.CRISIS_ADDICTION) >= 3;
    // has been granted debuffs
    const actor = $gameActors.actor(1);
    const crisis =
      actor.hasState(STATES.NO_VIOLENCE) ||
      actor.hasState(STATES.RANK_PENALTY) ||
      actor.hasState(STATES.DEBT_PENALTY) ||
      actor.hasState(STATES.SLAVE_PENALTY);
    return rule && crisis;
  };

  // pick one commonsense rule to trigger
  this.pickCommonsense = () => {
    // commonsense rule and event ids are the same
    const ruleIds = [EVENTS.REINFORCEMENT, EVENTS.NO_COUNTER, EVENTS.SEX_START, EVENTS.SEX_DUEL];
    const options = ruleIds.map(ruleId => {
      // close: 0; open: 1
      const value = $util.checkRule(ruleId);
      return { value: ruleId, weight: value };
    });
    const eventId = $util.weightedSample(options);
    $util.addEventParams({ commonsense: eventId });
  };

  // pick the enemy troop to fight with
  this.pickTroop = info => {
    const { target, difficulty, stage, sex, slaved } = info;
    let troop = undefined;
    if (!target) troop = TROOPS.TEST;
    else if (sex) troop = TROOPS.EMPTY;
    else if (slaved) troop = TROOPS.RAY_DIFFICULTY2;
    else if (target === ENEMIES.RAY) {
      if (difficulty === 1) troop = TROOPS.RAY_DIFFICULTY1;
      else if (difficulty === 2) troop = TROOPS.RAY_DIFFICULTY2;
      else if (difficulty === 3) troop = TROOPS.RAY_DIFFICULTY3;
    } else if (target === ENEMIES.TORTOISE) troop = TROOPS[`TORTOISE_LV${Math.ceil(stage / 3)}`];
    else if (target === ENEMIES.JELLYFISH) troop = TROOPS[`JELLYFISH_LV${Math.ceil(stage / 3)}`];
    else if (target === ENEMIES.INKFISH) troop = TROOPS[`INKFISH_LV${Math.ceil(stage / 3)}`];
    else if (target === ENEMIES.WHALE) troop = TROOPS.WHALE;
    $util.setTroop(troop);
  };

  // setup all items for dance
  this.prepareDance = () => {
    Galv.SPAWN.event(MAP_EVENT.evtNpcActor2, 19, 12);
    Galv.SPAWN.event(MAP_EVENT.evtNpcActor1, 20, 12);
    Galv.SPAWN.event(MAP_EVENT.evtNpcActor3, 21, 12);
    const audience = [
      [17, 16],
      [19, 16],
      [24, 16],
      [14, 17],
      [16, 17],
      [17, 17],
      [20, 17],
      [23, 17],
      [25, 17],
      [26, 17],
      [27, 17],
      [12, 18],
      [13, 18],
      [15, 18],
      [17, 18],
      [20, 18],
      [21, 18],
      [22, 18],
      [26, 18],
      [27, 18],
      [29, 18],
      [16, 19],
      [18, 19],
      [20, 19],
      [21, 19],
    ];
    audience.forEach(pos => {
      Galv.SPAWN.event(MAP_EVENT.evtCitizenUp, pos[0], pos[1]);
    });
  };

  // dance light effect
  this.danceLight = () => {
    // reflect
    const reflect = $gameScreen.picture(2);
    const color = $util.ranNum(6, [Number(_.last(reflect ? reflect._name : 0))]);
    $imgMgr.show(2, `stage_reflect_${color}`);
    // foreground
    $imgMgr.show(21, `stage_foreground_${color}`);
    // heart
    const heart = $gameScreen.picture(3);
    $imgMgr.show(3, `stage_heart_${$util.ranNum(3, [Number(_.last(heart._name))])}`);
    // light
    const light = $gameScreen.picture(22);
    $imgMgr.setup(22, `stage_light_${$util.ranNum(3, [Number(_.last(light._name))])}`);
    $imgMgr.shineIn(22, 5);
  };

  // format skill target info display
  this.formatTargetDesc = (user, target, skill) => {
    const items = [];
    const skillDetails = SKILL_DETAILS[skill.id];
    // boss
    if (!target.isActor()) {
      items.push({ label: '#{lblAttack}', value: target.atk });
      items.push({ label: '#{lblDefense}', value: target.def });
    } else {
      const minionNum = _.get(target.stateDetails(STATES.BLOCKED), 'stk', 0);
      if (minionNum) items.push({ label: '#{lblBlockedMinions}', value: minionNum });
      // hinder
      let multi = skillDetails.multi || 0;
      if ($gameActors.actor(3).hasSkill(SKILLS.NOISE_FOLLOWER)) multi += 1;
      const userMinionStk = _.get(user.stateDetails(STATES.BLOCKED), 'stk', 0);
      const rest = Math.max(0, userMinionStk - multi);
      items.push({ label: '#{lblHinderRate}', value: `${Math.min(100, 30 * rest)}%` });
      // block hint
      if (target.actorId() === user.actorId() && user.hasState(STATES.BLOCKED))
        items.push({ label: '\\C[21]#{lblBlockFocus}' });
      // rape warning
      if (!target.canMove() && target.hasState(STATES.BLOCKED))
        items.push({ label: '\\C[21]#{lblToBeRaped}' });
    }
    const desc = items
      .map(item =>
        _.has(item, 'value')
          ? `${$util.localize(item.label)}: ${item.value}`
          : $util.localize(item.label),
      )
      .join('; ');
    return desc;
  };

  // setup initial pose on the dance stage
  this.setupDanceStart = () => {
    const mapLocation = { 1: [768, 460], 2: [368, 380], 3: [1168, 380] };
    const faces = {
      0: ['angry', 'guilty', 'sad'],
      1: ['sad', 'shy', 'embarrassed'],
      2: ['alluring', 'embarrassed', 'tough'],
      3: ['alluring', 'cheering', 'happy'],
    };
    const poses = DANCE_POSES.filter(pose => pose.stable).map(pose => pose.id);

    const config = $gameParty.members().reduce((config, actor) => {
      const actorId = actor.actorId();
      const scale = actorId === 1 ? 1.2 : 1;
      const level = $lgcMgr.getLewdLevel(actorId);
      const face = $util.sample(
        faces[level],
        config.map(actor => actor.face),
      );
      const pose = $util.sample(
        poses,
        config.map(actor => actor.pose),
      );
      const mirror = _.sample([true, false]);
      $imgMgr.show(
        14 - actorId,
        `stage_pose${pose}_actor${actorId}_${face}`,
        mapLocation[actorId],
        [(mirror ? -1 : 1) * scale * 100, scale * 100],
      );
      return [...config, { face, pose, mirror }];
    }, []);
    $util.addEventParams({ config });
  };

  // find poses that varies not too much from current pose
  const similarPoses = poseId => {
    const prevPose = DANCE_POSES.find(pose => pose.id === poseId);
    const similarPoses = DANCE_POSES.filter(pose => {
      const diffSide = prevPose.back === pose.back ? 0 : 1;
      const diffHeight = Math.abs(pose.height - prevPose.height);
      return diffSide + diffHeight < 4;
    }).map(pose => pose.id);
    return similarPoses;
  };
  // setup dance pose
  this.randomDancePose = () => {
    const mapLocation = { 1: [768, 460], 2: [368, 380], 3: [1168, 380] };
    const faces = {
      0: ['angry', 'guilty', 'sad', 'shy'],
      1: ['sad', 'shy', 'embarrassed', 'tough'],
      2: ['embarrassed', 'tough', 'alluring', 'cheering'],
      3: ['alluring', 'cheering', 'happy', 'high'],
    };
    const config = $gameParty.members().reduce((config, actor, idx) => {
      const actorId = actor.actorId();
      const scale = actorId === 1 ? 1.2 : 1;
      const level = $lgcMgr.getLewdLevel(actorId);
      const face = $util.sample(
        faces[level],
        config.map(actor => actor.face),
      );
      const pose = $util.sample(
        similarPoses(config[idx].pose),
        config.map(actor => actor.pose),
      );
      const mirror = _.sample([true, false]);
      $imgMgr.setup(
        14 - actorId,
        `stage_pose${pose}_actor${actorId}_${face}`,
        mapLocation[actorId],
        [(mirror ? -1 : 1) * scale * 100, scale * 100],
      );
      $imgMgr.fadeIn(14 - actorId, 50);
      config[idx] = { face, pose, mirror };
      return config;
    }, $util.getEventParams('config'));
    $util.addEventParams({ config });
  };

  // clear dance
  this.clearDance = () => {
    $util.setDance(DANCE_PROGS.STOPPED);
    $util.setDanceSkipVisible(false);
    $imgMgr.clearAll();
    Galv.SPAWN.clear(MAPS.BASE);
  };

  // dance related scene effects
  this.dancePose = params => {
    const { actorId, face, wet, motion, shake, tremble, paralyze } = params;
    const { pose } = $util.getEventParams('config')[actorId - 1];
    const id = 14 - actorId;
    const { _x, _y, _scaleX, _scaleY } = $gameScreen.picture(id);
    $imgMgr.show(id, `stage_pose${pose}_actor${actorId}_${face}`);
    if (wet) {
      $imgMgr.setup(id + 3, `stage_pose${pose}_wet`, [_x, _y], [_scaleX, _scaleY]);
      $imgMgr.fadeIn(id + 3);
    }
    if (motion) {
      $imgMgr.setup(id + 3, `stage_pose${pose}_motion`, [_x, _y], [_scaleX, _scaleY]);
      $imgMgr.fadeIn(id + 3);
    }
    if (shake) $imgMgr.show(id + 6, `stage_pose${pose}_shake`, [_x, _y], [_scaleX, _scaleY]);
    if (tremble) {
      $imgMgr.setup(id + 6, `stage_pose${pose}_tremble`, [_x, _y], [_scaleX, _scaleY]);
      $imgMgr.shakeEffect(id + 6);
    }
    if (paralyze) $imgMgr.anim(id, ANIMS.PARALYZED);
  };

  // logics about paying debt
  this.payDebt = () => {
    const debt = $util.getDebt();
    const money = $util.getMoney();
    if (money >= debt) {
      $util.addDebt(-debt, '#{lblReason.payDebt}');
      $util.addMoney(-debt, '#{lblReason.payDebt}');
      return true;
    } else {
      $util.addDebt(-money, '#{lblReason.payDebt}');
      $util.addMoney(-money, '#{lblReason.payDebt}');
      return false;
    }
  };

  // format pay debt choice text
  this.formatCanPayDebtMsg = () => {
    const debt = $util.getDebt();
    const money = $util.getMoney();
    const req = money >= debt ? '' : ` (${$util.localize('#{lblReqMoney}', debt)})`;
    return `#{lblPayDebt}${req}`;
  };

  // comfirm target and provide corresponding title in sex start scene
  this.addMsgTitle = msg => {
    const target = $util.getEventParams('target');
    const title = target === ENEMIES.RAY ? '#{lblMsgRay}' : '#{lblMsgCitizen}';
    return `${title}#{${msg}}`;
  };

  // give different text in flaunt depending on target
  this.getFlauntMsg = idx => {
    const isCitizen = $util.getEventParams('target') === ENEMIES.CITIZEN;
    const enemy = isCitizen ? 'citizen' : 'villain';
    return `#{msgFlaunt.${idx}.${enemy}}`;
  };

  // randomly pick on harass focus for each actor in flaunt scene
  this.setupFlauntFocus = () => {
    const focuses = _.sampleSize(['boob', 'pussy', 'hip', 'ass'], 3);
    const items = $gameParty.members().map((actor, idx) => ({
      actorId: actor.actorId(),
      focus: focuses[idx],
      x: 1800 - 512 * actor.actorId(),
      y: 432 + (idx % 2 === 0 ? 1 : -1) * 200,
    }));
    items.forEach(item => {
      const focusLight = `focus_actor${item.actorId}_harass_${item.focus}_light`;
      const focusHeavy = `focus_actor${item.actorId}_harass_${item.focus}_heavy`;
      $imgMgr.setup(16 - item.actorId, focusLight, [item.x, item.y]);
      $imgMgr.setup(19 - item.actorId, focusHeavy, [item.x, item.y]);
      $imgMgr.setup(22 - item.actorId, focusHeavy, [item.x, item.y]);
    });
  };

  // randomly pick one fraud pattern for fraud sex scene
  this.pickFraudPattern = () => {
    const pattern = _.random(1);
    $util.addEventParams({ fraud: pattern });
  };

  // randomly pick and allocate harass items to actors
  this.setupHarass = () => {
    const events = _.sampleSize(['kiss', 'ass', 'front'], 3);
    const harass = events.reduce((harass, event, idx) => ({ [3 - idx]: event, ...harass }), {});
    $util.addEventParams({ harass });
  };

  // prepare msg for harass scene
  this.harassMsg = (cut, id, actorDialog) => {
    const actorId = $util.getEventParams('active');
    const lewdLevel = Math.min(3, $lgcMgr.getLewdLevel(actorId));
    const msg = $util.localize(
      `#{msgHarass.play.${cut}.lewd${lewdLevel}.${id}}`,
      `#{lblActor${actorId}Nickname}`,
    );
    const title = actorDialog ? `#{lblMsgActor${actorId}}` : '';
    return `${title}${msg}`;
  };

  this.kissCut = (status, eye, mouse, start) => {
    const actorId = $util.getEventParams('active');
    const eyeStatus = status === 'split' ? 'split' : 'join';
    $imgMgr.setup(12, `focus_kiss_actor${actorId}_${status}`);
    $imgMgr.setup(13, `focus_kiss_${eyeStatus}_eye_${eye}`);
    $imgMgr.setup(14, `focus_kiss_${status}_mouse_${mouse}`);
    if (start) $imgMgr.fadeIn([12, 13, 14]);
    else $imgMgr.show([12, 13, 14]);
  };

  this.harassCut = (content, start) => {
    const actorId = $util.getEventParams('active');
    $imgMgr.setup(11, `focus_actor${actorId}_${content}`, [1160, 432]);
    if (start) $imgMgr.zoomIn(11);
    else $imgMgr.show(11);
  };

  this.harassPort = (face, effect, anim) => {
    const actorId = $util.getEventParams('active');
    $imgMgr.show(actorId, `port_actor${actorId}_citizen_rub_${face}`);
    const { _x, _y } = $gameScreen.picture(actorId);
    if (effect) {
      $imgMgr.show(actorId + 6, `port_actor${actorId}_slaved_${effect}`, [_x, _y]);
      if (effect === 'tremble' && !$gameScreen.picture(actorId + 3))
        $imgMgr.show(actorId + 3, `port_actor${actorId}_slaved_wet`, [_x, _y]);
    }
    if (anim) $imgMgr.anim(actorId, anim, [70, 20]);
  };

  this.battleInfo = {};
  this.getBattleInfo = key => (key ? this.battleInfo[key] : this.battleInfo);
  this.setBattleInfo = info => {
    this.battleInfo = info;
  };
  this.addBattleInfo = info => {
    this.battleInfo = { ...this.battleInfo, ...info };
  };

  this.setupBattle = info => {
    const target = $util.getEventParams('target');
    const difficulty = $util.getEventParams('difficulty') || 1;
    const stage = $util.getEventParams('stage') || 1;
    const duel = $util.getEventParams('duel');
    const sex = $util.getEventParams('sex');
    const reinforcement = $util.getEventParams('reinforcement');
    const sexStart = $util.getEventParams('sexStart');
    const crowd = $util.getEventParams('crowd');
    const slaved = $util.getSlaved();
    const battleInfo = {
      target,
      difficulty,
      stage,
      duel,
      sex,
      reinforcement,
      sexStart,
      crowd,
      slaved,
      ...info,
    };
    this.setBattleInfo(battleInfo);
    // setup battle map
    if ($gameMap.mapId() === MAPS.TOWN) {
      const period = $util.getPeriod();
      if (period.id === MAP_PERIOD.NIGHT) $gameMap.changeBattleback('Asphalt1', 'Park1');
      else $gameMap.changeBattleback('Asphalt1', 'Park1');
    }
    // prepare picture
    const suffix = battleInfo.sex ? 'normal' : 'battle';
    $gameTemp.setBattlerImage(1, `pic_actor1_${suffix}`);
    $gameTemp.setBattlerImage(2, `pic_actor2_${suffix}`);
    $gameTemp.setBattlerImage(3, `pic_actor3_${suffix}`);
    // confirm troop
    $lgcMgr.pickTroop(battleInfo);
  };

  this.getEnemyTitle = () => {
    const target = $util.getEventParams('target');
    const mapEnemy = {
      [ENEMIES.CITIZEN]: '#{lblMsgCitizen}',
      [ENEMIES.RAY]: '#{lblMsgRay}',
      [ENEMIES.TORTOISE]: '#{lblMsgTortoise}',
      [ENEMIES.JELLYFISH]: '#{lblMsgJellyfish',
      [ENEMIES.INKFISH]: '#{lblMsgInkfish}',
      [ENEMIES.WHALE]: '#{lblMsgWhale}',
    };
    return mapEnemy[target];
  };

  this.prepareBattle = () => {
    $gameParty.members().forEach(actor => {
      actor.skills().forEach(skill => {
        // add related buffs
        const relatedBuff = _.get(SKILL_DETAILS, [skill.id, 'state']);
        if (relatedBuff) actor.addState(relatedBuff);
      });
      if ($lgcMgr.getBattleInfo('sex')) actor.addState(STATES.SEX);
    });
  };

  this.enemyReinforcement = () => {
    // minus 3 invisible member
    const { sex, reinforcement } = $lgcMgr.getBattleInfo();
    const start = $util.getEventParams('start');
    let num = 0;
    if (sex) num = $gameActors.actor(1).hasState(STATES.BLOCKED) ? 0 : 1;
    else {
      num = reinforcement && start ? 10 : Math.max(0, $gameTroop.aliveMembers().length - 3);
    }
    if (num) {
      $gameParty.members().forEach(actor => {
        if (!actor.hasState(STATES.BLOCKED)) actor.addState(STATES.BLOCKED);
        actor.addStateStack(STATES.BLOCKED, num);
      });
      $util.notification(COLORS.DEBUFF, '#{lblMsgReinforce}', num);
    }
    return num;
  };

  this.minionFocusScope = (user, target) => {
    if (!target.isActor()) return false;
    else {
      if (user.hasState(STATES.MATING)) return false;
      const userStk = _.get(user.stateDetails(STATES.BLOCKED), 'stk', 0);
      if (userStk) return user.actorId() === target.actorId();
      else return target.hasState(STATES.BLOCKED);
    }
  };

  this.bossFocusScope = (user, target) => {
    if (user.hasState(STATES.MATING)) return false;
    const userStk = _.get(user.stateDetails(STATES.BLOCKED), 'stk', 0);
    if (userStk) return false;
    else return !target.isActor();
  };

  this.teammateFocusScope = (user, target) => {
    if (!target.isActor()) return false;
    else {
      if (user.hasState(STATES.MATING)) return false;
      const userStk = _.get(user.stateDetails(STATES.BLOCKED), 'stk', 0);
      if (userStk) return user.actorId() === target.actorId();
      else return true;
    }
  };

  this.prepareMsg = (msg, titleLocation, isActor) => {
    const mapTime = { 1: 15, 2: 60, 3: 120 };
    const wait = ConfigManager.delay ? `\\w[${mapTime[ConfigManager.delay]}]\\^` : '';
    let title = '';
    if (titleLocation) {
      const person = $util.getEventParams(titleLocation);
      const id = isActor ? person.actorId() : person.enemyId();
      title = isActor ? `#{lblMsgActor${id}}` : ENEMY_TITLE[id];
    }
    return `${title}#{${msg}}${wait}`;
  };

  this.showFlag = (type, id = 1) => {
    const actorId = $util.getEventParams('target').actorId();
    const name = `check_${_.lowerCase(_.invert(ACTION_TYPES)[type])}_${IAVRA.I18N.language}`;
    const pos = [512 * actorId - 256, 640];
    $imgMgr.setup(id, name, pos);
    $imgMgr.zoomIn(id);
  };

  this.showFace = (eyes, mouses, appear, tremble = true) => {
    const face = $lgcMgr.randomFace();
    const eye = Array.isArray(eyes) ? _.sample(eyes) : eyes;
    const mouse = Array.isArray(mouses) ? _.sample(mouses) : mouses;
    const actorId = $util.getEventParams('target').actorId();
    const pos = [1280, 160];
    $imgMgr.setup(21, `focus_face_actor${actorId}`, pos);
    const eyeStyle = eye.includes('mc_') ? '' : `_style${face.eye}`;
    $imgMgr.setup(22, `focus_face_eye_${eye}${eyeStyle}`, pos);
    $imgMgr.setup(23, `focus_face_mouse_${mouse}_style${face.mouse}`, pos);
    if (tremble) $imgMgr.setup(24, `focus_face_tremble${face.tremble}`, pos);
    else $imgMgr.clear(24);
    if (appear) $imgMgr.slideIn([21, 22, 23, 24]);
    else $imgMgr.show([21, 22, 23, 24]);
  };

  this.showHit = action => {
    const actorId = $util.getEventParams('target').actorId();
    $effect.flashScreen(60);
    $effect.shakeScreen([3, 3, 30]);
    $imgMgr.setup(11, `hit_actor${actorId}_${action}`, [520, 432]);
    $imgMgr.zoomIn(11);
  };

  this.showPicture = action => {
    const actorId = $util.getEventParams('target').actorId();
    $effect.flashScreen(30);
    const picture = `pic_actor${actorId}_${action}`;
    $imgMgr.setup(11, picture, [520, 432]);
    $imgMgr.zoomIn(11);
    $gameTemp.setBattlerImage(actorId, picture);
  };

  this.showDown = fertilized => {
    const actorId = $util.getEventParams('target').actorId();
    const num = $lgcMgr.randomPose(actorId);
    $effect.flashScreen(10);
    $effect.shakeScreen([3, 3, 30]);
    const status = fertilized ? 'fertilized' : 'normal';
    $imgMgr.setup(11, `pic_actor${actorId}_down_pose${num}_${status}`, [520, 432]);
    $imgMgr.zoomIn(11);
    $lgcMgr.showSteam();
    $gameTemp.setBattlerImage(actorId, `pic_actor${actorId}_down_pose${num}_${status}`);
  };

  this.showSex = (climax, rape) => {
    const actorId = $util.getEventParams('target').actorId();
    const num = $lgcMgr.randomPose(actorId, true);
    const action = rape ? 'rape' : 'sex';
    const phase = climax ? 'climax' : 'mating';
    const picture = `pic_actor${actorId}_${action}_pose${num}_${phase}`;
    $imgMgr.setup(11, picture, [520, 432]);
    $imgMgr.zoomIn(11);
    $lgcMgr.showSteam();
    $effect.flashScreen(60);
    $effect.shakeScreen([3, 3, 30]);
    $gameTemp.setBattlerImage(actorId, picture);
    return picture;
  };

  this.showSteam = () => {
    $imgMgr.show(12, `steam${_.random(1, 5)}`, [520, 640], [150, 150]);
    $imgMgr.moveTo(12, [520, 160], 180);
  };

  this.showHeartBack = () => {
    $imgMgr.setup(32, 'back_heart', [768, 432], [200, 200]);
    $imgMgr.zoomIn(32, 30);
  };

  this.bossAction = (enemy, target) => {
    let minMp = 20;
    if (target.hasState(STATES.IRON_WALL)) minMp = 10;
    if (target.hasState(STATES.BEDROCK_COUNTER)) {
      const stk = target.stateDetails(STATES.BEDROCK_COUNTER).stk;
      if (stk >= 1) minMp = 0;
    }
    if (target.hasState(STATES.SNAKE_FORMATION)) {
      const stk = target.stateDetails(STATES.SNAKE_FORMATION).stk;
      if (stk) minMp = 0;
    }
    const targetIdx = target.index();
    if (target.mp < minMp || !target.canMove() || target.hasState(STATES.NO_COUNTER)) {
      const enemyId = enemy.enemyId();
      const skills = MAP_ENEMY_SKILL[enemyId];
      const skill = _.sample(skills);
      enemy.forceAction(skill, targetIdx);
      return;
    }
    // hinder
    const minionNum = _.get(target.stateDetails(STATES.BLOCKED), 'stk', 0);
    const hinderRate = Math.min(1, 0.3 * minionNum);
    if ($util.triggered(hinderRate)) {
      $util.playEvent(EVENTS.GUARD_HINDER, { user: enemy, target });
      return;
    }
    // distract
    const distractStates = [
      STATES.CORRUPTION,
      STATES.FAVORABILITY,
      STATES.HORNY,
      STATES.SEX_ADDICTION,
    ]
      .map(stateId => ({ id: stateId, level: $lgcMgr.getStateLevel(target.actorId(), stateId) }))
      .filter(state => state.level >= 2);
    const distractRate = 1 - 0.5 ** distractStates.length;
    if ($util.triggered(distractRate)) {
      enemy.forceAction(SKILLS.DISTRACT, targetIdx);
      return;
    }
    // successfully guard
    enemy.forceAction(SKILLS.GUARD, targetIdx);
  };

  this.enemyDmg = (enemy, actor) => {
    actor.gainMp(-100);
    const dmg = Math.floor((enemy.atk / actor.def) * 100);
    if (_.get(actor.stateDetails(STATES.SM_ADDICTION), 'lv', 0) >= 1) {
      const tp = Math.floor(($util.variance() * dmg) / 10);
      actor.gainTp(tp);
    }
    return dmg;
  };

  this.enemySex = (actor, climax) => {
    actor.gainTp(climax ? -100 : Math.floor(40 * $util.variance()));
    actor.gainMp(Math.floor((climax ? -100 : -50) * $util.variance()));
    return climax ? 300 : 0;
  };

  this.actorDmg = (actor, enemy, skill) => {
    let rate = SKILL_DETAILS[skill.id].rate || 1;
    if (actor.hasState(STATES.SHEATH_CHARGE)) {
      const stk = actor.stateDetails(STATES.SHEATH_CHARGE).stk || 0;
      rate += actor.stateDetails(STATES.SHEATH_CHARGE).stk * 0.1;
      if (stk && [SKILLS.MOMENTARY_SLASH, SKILLS.HEAVY_BLADE].includes(skill.id)) rate *= 1.5;
      if (SKILLS.INFINITE_SLASH === skill.id) {
        const multiplier = 2 ** stk;
        rate *= multiplier;
      }
    }
    if (actor.hasState(STATES.HOUND_CHASE)) {
      const stk = actor.stateDetails(STATES.HOUND_CHASE).stk || 0;
      rate += stk;
    }
    let damage = (actor.atk * rate * 100) / enemy.def;
    return damage;
  };

  this.actorGuard = actor => {
    let cost = 20;
    if (actor.hasState(STATES.IRON_WALL)) cost = 10;
    if (actor.hasState(STATES.BEDROCK_COUNTER)) {
      const stk = actor.stateDetails(STATES.BEDROCK_COUNTER).stk;
      if (stk < 1) actor.addStateStack(STATES.BEDROCK_COUNTER, 1);
      else {
        actor.addStateStack(STATES.BEDROCK_COUNTER, -1);
        cost = 0;
      }
    }
    if (actor.hasState(STATES.SNAKE_FORMATION)) {
      const stk = actor.stateDetails(STATES.SNAKE_FORMATION).stk;
      if (stk) {
        actor.addStateStack(STATES.SNAKE_FORMATION, -1);
        cost = 0;
      }
    }
    return cost;
  };

  this.hasStateType = (actorId, type) =>
    $gameActors
      .actor(actorId)
      .states()
      .some(state => {
        const stateDetails = STATE_DETAILS[state.id];
        if (stateDetails) {
          return stateDetails.types.includes(type);
        } else return false;
      });

  this.minionFocusExec = (user, target, skill) => {
    const items = [];
    const skillDetails = SKILL_DETAILS[skill.id];
    let multi = skillDetails.multi || 0;
    if ($gameActors.actor(3).hasSkill(SKILLS.NOISE_FOLLOWER)) multi += 1;
    // boss
    const targetMinionStk = _.get(target.stateDetails(STATES.BLOCKED), 'stk', 0);
    if (targetMinionStk) items.push({ label: '#{lblBlockedMinions}', value: targetMinionStk });
    if (multi) items.push({ label: '#{lblAttackTarget}', value: multi });
    if (skillDetails.type === SKILL_TYPES.MINION_FOCUS) {
      // stop
      if (user.hasState(STATES.NO_VIOLENCE)) {
        $util.playEvent(EVENTS.NO_VIOLENCE, { target: user });
        return;
      }
      // hinder
      if (user.actorId() === target.actorId()) {
        const userMinionStk = _.get(user.stateDetails(STATES.BLOCKED), 'stk', 0);
        const rest = Math.max(0, userMinionStk - multi);
        const hinderRate = Math.min(1, 0.3 * rest);
        if ($util.triggered(hinderRate)) {
          $util.playEvent(EVENTS.HINDER, { target: user });
          return;
        }
        // debt command
        if ($util.getDebt() >= 100000 && $util.checkRule(18)) {
          $util.addDebt(-100000, '#{lblReason.debtCommand}');
          $util.playEvent(EVENTS.DEBT_COMMAND, { target });
          return;
        }
      }
      // successfully execute
      const rest = Math.max(0, targetMinionStk - multi);
      if (rest > 0) target.addStateStack(STATES.BLOCKED, -multi);
      else target.removeState(STATES.BLOCKED);
      $util.notification(
        COLORS.BUFF,
        '#{lblMinionDown}',
        `#{lblActor${target.actorId()}}`,
        Math.min(multi, targetMinionStk),
      );
      if ([SKILLS.SWALLOW].includes(skill.id)) user.addStateStack(STATES.SHEATH_CHARGE, 1);
      if (SKILLS.SWALLOW_GROUP === skill.id) user.addStateStack(STATES.SHEATH_CHARGE, 3);
      $util.playEvent(EVENTS.ATTACK_MINION, { target, user, skill });
      $effect.shakeScreen([2, 1, 10 + 2 * multi]);
    }
  };

  this.bossFocusExec = (user, target, skill) => {
    const sheathChargeStk = _.get(user.stateDetails(STATES.SHEATH_CHARGE), 'stk', 0);
    if (sheathChargeStk > 0) {
      if (skill.id === SKILLS.MOMENTARY_SLASH) user.addStateStack(STATES.SHEATH_CHARGE, -1);
      if (skill.id === SKILLS.INFINITE_SLASH)
        user.addStateStack(STATES.SHEATH_CHARGE, -sheathChargeStk);
    } else {
      if (skill.id === SKILLS.HEAVY_BLADE) user.addStateStack(STATES.SHEATH_CHARGE, 1);
    }
    if (user.hasState(STATES.HOUND_CHASE)) user.addStateStack(STATES.HOUND_CHASE, 1);
    const dmg = target.result().hpDamage;
    const power = Math.min(1 + Math.ceil(dmg / 5000), 3);
    const duration = Math.min(10 + Math.ceil(dmg / 250), 50);
    $effect.shakeScreen([power, 1, duration]);
  };

  this.guard = actor => {
    $lgcMgr.actorAnim(actor.actorId(), ANIMS.HIT);
    if (actor.hasSkill(SKILLS.SHEATH_SHIELD)) actor.addStateStack(STATES.SHEATH_CHARGE, 1);
    $util.playEvent(EVENTS.FLAG, { target: actor, flag: ACTION_TYPES.GUARD });
    $effect.shakeScreen([2, 1, 20]);
  };

  this.recoverPosture = () => {
    $gameParty.members().forEach(actor => {
      if (actor.canMove() && !actor.hasState(STATES.MATING)) {
        const actorId = actor.actorId();
        const sex = $lgcMgr.getBattleInfo('sex');
        const action = sex ? 'normal' : 'battle';
        $gameTemp.setBattlerImage(actorId, `pic_actor${actorId}_${action}`);
      }
    });
  };

  this.sexFace = (phase, appear) => {
    const actorId = $util.getEventParams('target').actorId();
    const lewdLevel = Math.min($lgcMgr.getLewdLevel(actorId), 3);
    const face = MAP_SEX_FACE[phase][lewdLevel];
    $lgcMgr.showFace(face.eye, face.mouse, appear, true);
  };

  this.focusActor = (target, lockedTarget) => {
    if (lockedTarget) {
      if (lockedTarget !== target.actorId()) return false;
      if (!target.hasState(STATES.BLOCKED)) return false;
      if (!target.hasState(STATES.MATING) && target.canMove()) return false;
      return true;
    } else {
      const actor2 = $gameActors.actor(2);
      if (actor2.hasState(STATES.IRON_WALL) && !actor2.hasState(STATES.MATING))
        return target.actorId() === 2;
      else return !target.hasState(STATES.MATING);
    }
  };

  this.actorAnim = (actorId, animId) => {
    const x = 512 * actorId - 256;
    CallPluginCommand(`PlaceAnim ${animId} ${x} 640 0 0`);
  };

  this.prepareTurn = () => {
    const actor3 = $gameActors.actor(3);
    actor3.addStateStack(STATES.HOUND_CHASE, -5);
    if (actor3.hasState(STATES.SNAKE_FORMATION)) actor3.addStateStack(STATES.SNAKE_FORMATION, 1);
  };

  this.struggle = user => {
    const actorId = user.actorId();
    const distracts = [];
    if ($lgcMgr.getStateLevel(actorId, STATES.SM_ADDICTION) >= 2)
      distracts.push({ id: STATES.SM_ADDICTION, rate: 0.5 });
    if ($lgcMgr.getStateLevel(actorId, STATES.CRISIS_ADDICTION) >= 2)
      distracts.push({ id: STATES.CRISIS_ADDICTION, rate: 0.5 });
    const distractTrigger = $util.eventTrigger(distracts);
    $util.playEvent(EVENTS.STRUGGLE, { user, target: user, distract: distractTrigger });
  };

  this.battleResult = () => {
    const defeat = $gameParty.members().every(actor => actor.hasState(STATES.KNOCKOUT));
    if (defeat) BattleManager.processDefeat();
    else {
      const sex = $lgcMgr.getBattleInfo('sex');
      const victory = $gameTroop
        .aliveMembers()
        .filter(enemy => enemy.hp > 0)
        .every(enemy => enemy.enemyId() > 13);
      if (!sex && victory) BattleManager.processVictory();
    }
  };

  this.gainItem = () => {
    const stages = $util.getStages();
    const stage = _.findLast(stages, stage => stage.active);
    if (stage) {
      const item = CHEST_ITEMS.find(
        item => item.actor === stage.actor && item.bonus === stage.bonus,
      );
      if (item) {
        const armor = $dataArmors[item.armor];
        $gameParty.gainItem(armor, 1);
        $util.notification(COLORS.BUFF, '#{lblGainItem}', armor.name);
      }
    }
  };

  this.formatBondage = actor =>
    $util.localize('#{lblBondageHp}', _.get(actor.stateDetails(STATES.MATING), 'gauge', 0));

  this.targetDesc = (actor, skill) => {
    let desc = '';
    const type = _.get(SKILL_DETAILS[skill.id], 'type');
    if ([SKILL_TYPES.BOSS_FOCUS].includes(type)) {
      if (actor.hasState(STATES.BLOCKED)) desc = 'lblMinionBlock';
      else if (actor.hasState(STATES.MATING)) desc = 'lblBondageBlock';
      else if (actor.mp < 20) desc = 'lblNoSp';
    }
    if (desc) return `\\C[8](#{${desc}})`;
    else return desc;
  };

  const sex = [0, 0, 0];
  const down = [0, 0, 0];
  this.randomPose = (actorId, isSex) => {
    if (isSex) {
      down[actorId - 1] = 0;
      const options = _.without(_.range(1, 11), ...sex);
      sex[actorId - 1] = _.sample(options);
      return sex[actorId - 1];
    } else {
      sex[actorId - 1] = 0;
      const options = _.without(_.range(1, 11), ...down);
      down[actorId - 1] = _.sample(options);
      return down[actorId - 1];
    }
  };

  const face = { eye: 0, mouse: 0, tremble: 0 };
  this.randomFace = () => {
    const eyes = _.without(_.range(1, 4), face.eye);
    const mouses = _.without(_.range(1, 4), face.mouse);
    const trembles = _.without(_.range(1, 6), face.tremble);
    face.eye = _.sample(eyes);
    face.mouse = _.sample(mouses);
    face.tremble = _.sample(trembles);
    return face;
  };

  this.canHelp = () => {
    const actor = $gameActors.actor(1);
    const corruptionLevel = _.get(actor.stateDetails(STATES.CORRUPTION), 'lv', 0);
    const favorabilityLevel = _.get(actor.stateDetails(STATES.FAVORABILITY), 'lv', 0);
    return corruptionLevel < 2 && favorabilityLevel < 2;
  };

  this.formatHelpText = () => {
    const req = $lgcMgr.canHelp() ? '' : '(#{lblReqStopRobbery})';
    return `#{lblHelp}${req}`;
  };

  this.activeStage = () => {
    const stages = $util.getStages();
    const stage = _.findLast(stages, stage => stage.active);
    return stage && stage.id;
  };

  this.debuffRate = (user, state) => {
    const debuffId = state.id;
    const mapDebuff = {
      [STATES.RANK_PENALTY]: 0.01,
      [STATES.DEBT_PENALTY]: 0.01,
      [STATES.OPPOSAL_PENALTY]: 0.1,
      [STATES.SLAVE_PENALTY]: 0.3,
    };
    const level = _.get(user.stateDetails(debuffId), 'lv') || 1;
    const rate = Math.max(0.01, 1 - level * (mapDebuff[debuffId] || 0));
    return rate;
  };

  this.formatTime = () => String(`${_.padStart($util.getTime(), 2, '0')} : 00`);

  this.refreshAmbient = () => {
    const mapId = $gameMap.mapId();
    if (mapId === MAPS.BASE) $gameLighting.setMapAmbient(COLORS.BASE);
    else if (mapId === MAPS.TOWN) {
      const period = $util.getPeriod();
      $gameLighting.setMapAmbient(COLORS[period.color]);
    } else $gameLighting.setMapAmbient(COLORS.DAY);
  };

  this.recoverMapBgm = () => {
    const mapBgm = {
      [MAPS.TOWN]: 'Town',
      [MAPS.STATION]: 'Station',
      [MAPS.BASE]: 'Base',
      [MAPS.ARENA]: 'Arena',
    };
    $effect.playBgm(mapBgm[$gameMap.mapId()]);
  };

  this.needGarrot = () => {
    const actor = $util.getEventParams('target');
    return !actor.hasState(STATES.MATING) && !actor.hasState(STATES.SEX);
  };

  const se = { piston1: 0, piston2: 0, mucus1: 0, mucus2: 0, climax: false, repeat: false };
  this.playPiston = (isNew, isClimax) => {
    if (isNew) {
      const piston1 = $util.ranNum(10, [se.piston1, se.piston2]);
      const piston2 = $util.ranNum(10, [se.piston1, se.piston2]);
      const mucus1 = $util.ranNum(10, [se.mucus1, se.mucus2]);
      const mucus2 = $util.ranNum(10, [se.mucus1, se.mucus2]);
      se.piston1 = piston1;
      se.piston2 = piston2;
      se.mucus1 = mucus1;
      se.mucus2 = mucus2;
      se.climax = isClimax;
    }
    se.repeat = !se.repeat;
    $effect.playSe(`Piston${se.repeat ? se.piston1 : se.piston2}`, { volume: 300 });
    $effect.playSe(`Mucus${se.repeat ? se.mucus1 : se.mucus2}`, { volume: 100 });
    if (se.climax) $effect.shakeScreen([2, 1, 20]);
    else $effect.shakeScreen([3, 1, 25]);
  };

  this.preloadBattleRes = () => {
    const assets = {
      animations: ['Confusion', 'SexOngoing', 'FloatingHeart', 'HandsCatch'],
      battlebacks1: ['Arena_Floor'],
      battlebacks2: ['Arena_Wall'],
      enemies: ['Blank', 'Ray'],
      pictures: [
        'back_heart',
        'focus_face_tremble1',
        'focus_face_tremble2',
        'focus_face_tremble3',
        'focus_face_tremble4',
        'focus_face_tremble5',
        'period_dawn',
        'period_day',
        'period_night',
        'period_sunset',
        'steam1',
        'steam2',
        'steam3',
        'steam4',
        'steam5',
        'focus_face_actor1',
        'focus_face_actor2',
        'focus_face_actor3',
        'pic_ray_shadow',
      ],
      system: ['Damage'],
    };
    Object.entries(assets).forEach(([folder, imgs]) => {
      imgs.forEach(img => {
        Galv.CACHE.load(folder, img);
      });
    });
  };

  this.activateAchievement = id => {
    if (!$env.trial && $env.steam && OrangeGreenworks.isSteamRunning())
      OrangeGreenworks.activateAchievement(`ACHIEVEMENT${id}`);
  };
}

const $lgcMgr = new RBR_LogicManager();
