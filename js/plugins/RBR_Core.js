//=============================================================================
// RBR_Core.js
//=============================================================================

/*:
 * @plugindesc RPGMaker code overrides affecting whole system
 * @author KineticDog
 *
 */

//=============================================================================
// Set property and functions that match the context in game
//=============================================================================
Object.defineProperties(Game_BattlerBase.prototype, {
  mmp: {
    get: function () {
      return this.param(1);
    },
    configurable: true,
  }, //mmp
  mtp: {
    get: function () {
      return this.maxTp();
    },
    configurable: true,
  }, //mmd
  atk: {
    get: function () {
      return this.param(2);
    },
    configurable: true,
  }, //atk
  def: {
    get: function () {
      return this.param(3);
    },
    configurable: true,
  }, //def
  mat: {
    get: function () {
      return this.param(4);
    },
    configurable: true,
  }, //mat
  mdf: {
    get: function () {
      return this.param(5);
    },
    configurable: true,
  }, //mdf
});

//=============================================================================
// Advanced states effect management
//=============================================================================
Game_BattlerBase.prototype.clearStates = function () {
  this._states = [];
  this._stateTurns = {};
  this._stateDetails = {};
};

Game_BattlerBase.prototype.stateDetails = function (stateId) {
  if (stateId) return this._stateDetails[stateId] || {};
  else return this._stateDetails;
};

Game_BattlerBase.prototype.addNewState = function (stateId, stateDetails = {}) {
  // if (stateId === this.deathStateId()) {
  //   this.die();
  // }
  var restricted = this.isRestricted();
  this._states.push(stateId);
  this.sortStates();
  const state = STATE_DETAILS[stateId];
  if (state) {
    const defaultDetails = { lv: 0, gauge: 0, stk: 0 };
    this._stateDetails[stateId] = { ...defaultDetails, ...stateDetails };
    if (!restricted && this.isRestricted()) this.onRestrict();
    if (state.types && state.types.includes(STATE_TYPES.DEBUFF))
      $util.notification(
        COLORS.DEBUFF,
        '#{lblDebuffApplied}',
        `#{lblActor${this.actorId()}}`,
        `#{lblStates.${state.id}.iconLabel}`,
      );
  }
};

Game_BattlerBase.prototype.addStateLevel = function (stateId, increase = 1) {
  const stateDetails = this.stateDetails(stateId);
  stateDetails.lv = Math.min(99, (stateDetails.lv || 0) + increase);
};

Game_BattlerBase.prototype.addStateGauge = function (stateId, increase = 1) {
  const stateDetails = this.stateDetails(stateId);
  const state = STATE_DETAILS[stateId];
  const current = stateDetails.gauge || 0;
  const newValue = _.clamp(current + increase, 0, 100);
  stateDetails.gauge = newValue;

  if (state.types.includes(STATE_TYPES.DEBUFF)) {
    const actorId = this.actorId();
    if (state.types.includes(STATE_TYPES.ACTIVE)) {
      if (current !== 100 && newValue === 100) {
        stateDetails.active = true;
        $util.notification(
          COLORS.DEBUFF,
          '#{lblActiveStart}',
          `#{lblActor${actorId}}`,
          `#{lblStates.${state.id}.iconLabel}`,
        );
      }
    }
  }
};

Game_BattlerBase.prototype.addStateStack = function (stateId, increase = 1) {
  const stateDetails = this.stateDetails(stateId);
  const max = STATE_DETAILS[stateId].max || 10;
  stateDetails.stk = _.clamp((stateDetails.stk || 0) + increase, 0, max);
};

Game_Battler.prototype.addState = function (stateId, stateDetails) {
  if (this.isStateAddable(stateId)) {
    if (!this.isStateAffected(stateId)) {
      this.addNewState(stateId, stateDetails);
      this.refresh();
    }
    this.resetStateCounts(stateId);
    this._result.pushAddedState(stateId);
  }
};

Game_BattlerBase.prototype.eraseState = function (stateId) {
  var index = this._states.indexOf(stateId);
  if (index >= 0) {
    this._states.splice(index, 1);
  }
  delete this._stateTurns[stateId];
  delete this._stateDetails[stateId];
};

Game_BattlerBase.prototype.updateStateDetails = function (stateId, stateDetails = {}) {
  if (this.isStateAffected(stateId)) {
    this._stateDetails[stateId] = stateDetails;
  }
};

//=============================================================================
// UI Adjustment
//=============================================================================
// Remove escape command
Window_PartyCommand.prototype.makeCommandList = function () {
  this.addCommand(TextManager.fight, 'fight');
  // this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
};

// Remove weapon and armor in item menu
Window_ItemCategory.prototype.makeCommandList = function () {
  this.addCommand(TextManager.item, 'item');
  // this.addCommand(TextManager.weapon, 'weapon');
  // this.addCommand(TextManager.armor, 'armor');
  this.addCommand(TextManager.keyItem, 'keyItem');
};
// there will only be rules as item
Window_ItemCategory.prototype.maxCols = function () {
  return 2;
};
// there will only be rules as item
Window_ItemList.prototype.maxCols = function () {
  return 1;
};

// remove optimize in equipment menu
Window_EquipCommand.prototype.makeCommandList = function () {
  this.addCommand(TextManager.equip2, 'equip');
  // this.addCommand(TextManager.optimize, 'optimize');
  this.addCommand(TextManager.clear, 'clear');
};
// adjust equipment menu width
Window_EquipCommand.prototype.maxCols = function () {
  return 2;
};

// increase equip status window visible rows to see all properties
Window_EquipStatus.prototype.numVisibleRows = function () {
  return 8;
};

// ensure auto word wraping for help windows
// WARNING: Stopped using because it will cause error when using choice list
// Window_Base.prototype.processNormalCharacter = function (textState) {
//   var c = textState.text[textState.index];
//   var w = this.textWidth(c);
//   if (this.width - 2 * this.standardPadding() - textState.x >= w) {
//     this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
//     textState.index++;
//     textState.x += w;
//   } else {
//     this.processNewLine(textState);
//     textState.index--;
//     this.processNormalCharacter(textState);
//   }
// };

// add one line height to status windown end line due to add of crit rate
Window_Status.prototype.refresh = function () {
  this.contents.clear();
  if (this._actor) {
    var lineHeight = this.lineHeight();
    this.drawBlock1(lineHeight * 0);
    this.drawHorzLine(lineHeight * 1);
    this.drawBlock2(lineHeight * 2);
    this.drawHorzLine(lineHeight * 6);
    this.drawBlock3(lineHeight * 7);
    this.drawHorzLine(lineHeight * 14);
    this.drawBlock4(lineHeight * 14);
  }
};

// extend help window basic height to 6 lines
Window_Help.prototype.initialize = function (numLines) {
  var width = Graphics.boxWidth;
  var height = this.fittingHeight(numLines || 6);
  Window_Base.prototype.initialize.call(this, 0, 0, width, height);
  this._text = '';
};

// increase width of status window in equipment page in order to fit critical rate
Window_EquipStatus.prototype.windowWidth = function () {
  return 390;
};

// increase equipment name slot width to ensure English and Japanese long names can be fit in
Window_EquipSlot.prototype.drawItem = function (index) {
  if (this._actor) {
    var rect = this.itemRectForText(index);
    this.changeTextColor(this.systemColor());
    this.changePaintOpacity(this.isEnabled(index));
    this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
    this.drawItemName(this._actor.equips()[index], rect.x + 230, rect.y);
    this.changePaintOpacity(true);
  }
};

//=============================================================================
// Icon detail display
//=============================================================================
Window_Base.prototype.drawActorIcons = function (actor, x, y, width) {
  const textColor = '#e6cc80';
  const gaugeWidth = Window_Base._iconWidth * 0.95;
  const addText = (text, y, fontColor) => {
    if (fontColor) this.changeTextColor(fontColor);
    this.drawText(text, x + Window_Base._iconWidth * i, y, Window_Base._iconWidth, 'left');
    return y + 13;
  };
  const addBar = (value, y, barColor1, barColor2, fontColor) => {
    if (fontColor) this.changeTextColor(fontColor);
    const barWidth = (gaugeWidth * Math.floor(value)) / 100;
    this.contents.fillRect(x + Window_Base._iconWidth * i + 1, y + 30, gaugeWidth, 4, '#000000');
    this.contents.gradientFillRect(
      x + Window_Base._iconWidth * i + 1,
      y + 30,
      barWidth,
      4,
      barColor1,
      barColor2,
    );
    return y - 13;
  };
  var lastFontSize = this.contents.fontSize;
  this.contents.fontSize = 10;
  this.changeTextColor(textColor);
  width = width || 144;

  const states = actor.states();
  const icons = actor.allIcons().slice(0, Math.floor(width / Window_Base._iconWidth));
  for (var i = 0; i < icons.length; i++) {
    // icon
    this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
    let startY = y - 4,
      endY = y + 2;
    // details

    const state = STATE_DETAILS[states[i].id];
    if (state) {
      const details = actor.stateDetails(state.id);
      // turn
      if (state.types.includes(STATE_TYPES.TURN)) {
        let turn = actor.stateTurns(states[i].id);
        startY = addText(`Trn ${turn}`, startY);
      }
      if (state.types.includes(STATE_TYPES.LEVEL))
        startY = addText(`Lv ${details.lv || 0}`, startY);
      if (state.types.includes(STATE_TYPES.STACK))
        startY = addText(`Stk ${details.stk || 0}`, startY);
      if (state.types.includes(STATE_TYPES.ACTIVE))
        startY = addText(details.active ? 'On' : 'Off', startY);
      if (state.types.includes(STATE_TYPES.GAUGE))
        endY = addBar(details.gauge || 0, endY, ...BARS.YELLOW);
    }
  }

  this.contents.fontSize = lastFontSize;
};

//=============================================================================
// Time and period display
//=============================================================================

Scene_Battle.prototype.createDisplayObjects = function () {
  this.createSpriteset();
  this.createWindowLayer();
  this.createAllWindows();
  BattleManager.setLogWindow(this._logWindow);
  BattleManager.setStatusWindow(this._statusWindow);
  BattleManager.setSpriteset(this._spriteset);
  this._logWindow.setSpriteset(this._spriteset);
  this.addChild(new Sprite_Period());
  this.addChild(new Sprite_Time());
};

// hide gold window and merge it to variable window; Use this function to add time
Scene_Menu.prototype.createGoldWindow = function () {
  this._goldWindow = new Window_Gold(0, 0);
  this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
  // this.addWindow(this._goldWindow);
  this.addChild(new Sprite_Period());
  this.addChild(new Sprite_Time());
};

// period related
function Sprite_Period() {
  this.initialize.apply(this, arguments);
}

Sprite_Period.prototype = Object.create(Sprite_Base.prototype);
Sprite_Period.prototype.constructor = Sprite_Period;

Sprite_Period.prototype.initialize = function (index) {
  Sprite_Base.prototype.initialize.call(this);
  this._id = index;
  this.createGraphics();
};

Sprite_Period.prototype.createGraphics = function () {
  const period = $util.getPeriod();
  this.bitmap = ImageManager.loadPicture(period.img);
  if (SceneManager._scene instanceof Scene_Battle) {
    this.x = 1400;
    this.y = 25;
  } else if (SceneManager._scene instanceof Scene_Menu) {
    this.x = 10;
    this.y = 300;
  }
};

Sprite_Period.prototype.update = function () {
  Sprite_Base.prototype.update.call(this);
  this.createGraphics();
  // Only show in enemy turn
  if (SceneManager._scene instanceof Scene_Battle) {
    if (BattleManager._actorIndex < 0 && !this.visible) this.show();
    else if (BattleManager._actorIndex > -1 && this.visible) this.hide();
  }
};

// time related
function Sprite_Time() {
  this.initialize.apply(this, arguments);
}

Sprite_Time.prototype = Object.create(Sprite_Base.prototype);
Sprite_Time.prototype.constructor = Sprite_Time;

Sprite_Time.prototype.initialize = function (index) {
  Sprite_Base.prototype.initialize.call(this);
  this._id = index;
  this.opacity = 255;
  if (!this.bitmap) this.bitmap = new Bitmap(Graphics.width, Graphics.height);
  this.displayText();
};

Sprite_Time.prototype.displayText = function () {
  this.bitmap.clear();
  if (SceneManager._scene instanceof Scene_Battle)
    this.bitmap.drawText($lgcMgr.formatTime(), Graphics.width - 100 - 150, 60, 100, 30, 'right');
  else if (SceneManager._scene instanceof Scene_Menu)
    this.bitmap.drawText($lgcMgr.formatTime(), 130, 330, 100, 30, 'left');
};

Sprite_Time.prototype.update = function () {
  Sprite_Base.prototype.update.call(this);
  this.displayText();
  // Only show in enemy turn
  if (SceneManager._scene instanceof Scene_Battle) {
    if (BattleManager._actorIndex < 0 && !this.visible) this.show();
    else if (BattleManager._actorIndex > -1 && this.visible) this.hide();
  }
};

//=============================================================================
// Notification
//=============================================================================
Game_Variables.prototype.setValue = function (variableId, value) {
  if (variableId > 0 && variableId < $dataSystem.variables.length) {
    if (typeof value === 'number') {
      value = Math.floor(value);
    }
    this._data[variableId] = value;
    this.onChange();
  }
};

Game_Switches.prototype.setValue = function (switchId, value) {
  if (switchId > 0 && switchId < $dataSystem.switches.length) {
    this._data[switchId] = value;
    this.onChange();
  }
};

//=============================================================================
// Others
//=============================================================================
// tp gain side effects and notifications
Game_Battler.prototype.gainTp = function (value) {
  // sensitivity increase
  const tp = this.tp || 0;
  let pleasure = value;
  if (pleasure > 0) {
    if (this.hasState(STATES.SENSITIVITY)) {
      const rateMap = { 0: 1, 1: 1.1, 2: 1.2, 3: 1.3 };
      const level = Math.min(3, this._stateDetails[STATES.SENSITIVITY].lv);
      pleasure = value * rateMap[level];
    }
    const actorId = this.actorId();
    [STATES.CORRUPTION, STATES.FAVORABILITY, STATES.HORNY, STATES.SEX_ADDICTION].forEach(state => {
      if ($lgcMgr.getStateLevel(actorId, state) >= 1) pleasure *= 1.1;
    });
    if (
      _.get(this.stateDetails(STATES.MATING, 'gauge', 0) > 0) &&
      $lgcMgr.getStateLevel(STATES.CRISIS_ADDICTION) >= 1
    )
      pleasure *= 1.1;
  }

  pleasure = Math.floor(pleasure);
  if (isNaN(pleasure)) console.error('Receive NaN in gainTp');
  // basic logic
  this._result.tpDamage = -pleasure;
  this.setTp(tp + pleasure);

  // notification
  const actorName = `#{lbl${this.battlerName()}}`;
  if (tp !== this.tp && pleasure > 0)
    $util.notification(COLORS.DEBUFF, '#{lblGainTp}', actorName, pleasure);

  // side effect
  if (pleasure > 0) {
    if (this.hasState(STATES.HORNY))
      this.addStateGauge(STATES.HORNY, pleasure, '#{lblReason.tpIncrease}');
    if (this.hasState(STATES.SEX_ADDICTION))
      this.addStateGauge(STATES.SEX_ADDICTION, pleasure, '#{lblReason.tpIncrease}');
  }
};

// abort original guard function and use guard as a skip
Game_Action.prototype.setGuard = function () {
  // this.setSkill(this.subject().guardSkillId());
};

/**
 * Since there are three invisible enemies in battle scene,
 * use the skill command box popup time to check if all visible enemies are died and judge battle victory
 */
Window_ActorCommand.prototype.setup = function (actor) {
  this._actor = actor;
  this.clearCommandList();
  this.makeCommandList();
  this.refresh();
  this.selectLast();
  this.activate();
  this.open();
  $lgcMgr.battleResult();
};

// hack load map method to refresh sky ambient according to time
Scene_Map.prototype.onMapLoaded = function () {
  if (this._transfer) {
    $gamePlayer.performTransfer();
  }
  this.createDisplayObjects();
  $lgcMgr.refreshAmbient();
};

// add env file load
DataManager._databaseFiles = [
  { name: '$dataActors', src: 'Actors.json' },
  { name: '$dataClasses', src: 'Classes.json' },
  { name: '$dataSkills', src: 'Skills.json' },
  { name: '$dataItems', src: 'Items.json' },
  { name: '$dataWeapons', src: 'Weapons.json' },
  { name: '$dataArmors', src: 'Armors.json' },
  { name: '$dataEnemies', src: 'Enemies.json' },
  { name: '$dataTroops', src: 'Troops.json' },
  { name: '$dataStates', src: 'States.json' },
  { name: '$dataAnimations', src: 'Animations.json' },
  { name: '$dataTilesets', src: 'Tilesets.json' },
  { name: '$dataCommonEvents', src: 'CommonEvents.json' },
  { name: '$dataSystem', src: 'System.json' },
  { name: '$dataMapInfos', src: 'MapInfos.json' },
  { name: '$env', src: 'env.json' },
];
