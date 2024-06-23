//==================================================================================================
//   battlehelp.js
//==================================================================================================

/*:
 * @plugindesc (v1.0) 战斗描述窗口.
 * @author hugh
 * @help
 * ==================================================================================================
 * 角色和敌人项目备注：
 * <Target Description>
 *  \js<a.atk> \js<b.atk> \I[8]
 * </Target Description>
 * \js<xxx> : 执行代码   xxx：代码；
 * a : 目前行动的角色      b: 选择的攻击对象  item:使用的技能
 * 支持对话窗口的\I[2],\C[1]等功能
 *
 *
 *
 *
 * ==================================================================================================
*/

(() => {
　　var Imported = Imported || {};
　　Imported.battlehelp = true;

var ttt_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  ttt_DataManager_isDatabaseLoaded.call(this);
  this.processData($dataActors);
  this.processData($dataEnemies);
  return true;
};
	
DataManager.processData = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);
    var actionType = 0;
	obj.help = "";
    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:Target Description)>/i)) {
        actionType = 1;
      } else if (line.match(/<\/(?:Target Description)>/i)) {
        var actionType = 0;
      } else {
        this.SequenceText(obj, line, actionType);
      }
    }
  }
};
	
DataManager.SequenceText = function(obj, line, actionType) {
  if (actionType <= 0 || actionType > 1) return;
  var seqArgs = line;
  var array = seqArgs;
  if (actionType === 1) obj.help += array;
};

var ttt_Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    ttt_Game_Temp_initialize.call(this);
    this._target = null;
};

Game_Temp.prototype.test = function() {
    return "1111\\C[2]1111";
};

Game_Actor.prototype.help = function() {
    return this.actor().help;
};

Game_Enemy.prototype.help = function() {
    return this.enemy().help;
};

var ttt_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    ttt_Scene_Battle_createAllWindows.call(this);
	this.createBattleHelpWindow();
};

Scene_Battle.prototype.createBattleHelpWindow = function() {
    this._battlehelp = new Window_BattleHelp(1);
    this.addWindow(this._battlehelp);
	this._actorWindow.setHelp(this._battlehelp);
	this._enemyWindow.setHelp(this._battlehelp);
};

var ttt_Scene_Battle_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
Scene_Battle.prototype.selectActorSelection = function() {
    ttt_Scene_Battle_selectActorSelection.call(this);
	this._battlehelp.show();
	this._battlehelp.refresh();
};

var ttt_Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    ttt_Scene_Battle_selectEnemySelection.call(this);
	this._battlehelp.show();
	this._battlehelp.refresh();
};

var ttt_Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
    this._battlehelp.hide();
    ttt_Scene_Battle_onActorOk.call(this);
};

var ttt_Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    this._battlehelp.hide();
    ttt_Scene_Battle_onActorCancel.call(this);
};

var ttt_Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    this._battlehelp.hide();
    ttt_Scene_Battle_onEnemyOk.call(this);
};

var ttt_Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    this._battlehelp.hide();
    ttt_Scene_Battle_onEnemyCancel.call(this);
};

//-----------------------------------------------------------------------------
// Window_BattleHelp
//
// The window for displaying the description of the selected item.

function Window_BattleHelp() {
    this.initialize.apply(this, arguments);
}

Window_BattleHelp.prototype = Object.create(Window_Base.prototype);
Window_BattleHelp.prototype.constructor = Window_BattleHelp;

Window_BattleHelp.prototype.initialize = function(numLines) {
	var width = Graphics.boxWidth;
    var height = this.fittingHeight(numLines || 1);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
	this.deactivate();
	this.hide();
};

Window_BattleHelp.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};

Window_BattleHelp.prototype.clear = function() {
    this.setText('');
};

Window_BattleHelp.prototype.setItem = function(item) {
    this.setText(item ? item.help() : "");
};

Window_BattleHelp.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};

Window_BattleHelp.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bjs<(.*?)>/gi, function() {
    return this.processJs(arguments[1]);
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
};

Window_BattleHelp.prototype.processJs = function(text) {
   var a = BattleManager.actor();
   var b = $gameTemp._target;
   var item = BattleManager.actor().currentAction().item();
   text = eval(text);
   text = String(text);
   return text.replace(/\\/g, '\x1b');
};

Window_BattleActor.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._battleHelpWindow && this.visible) {
		$gameTemp._target = this.actor();
        this._battleHelpWindow.setItem(this.actor());
		this._battleHelpWindow.refresh();
    }
};

Window_BattleActor.prototype.setHelp  = function(Window) {
    this._battleHelpWindow = Window;
};

Window_BattleEnemy.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._battleHelpWindow && this.visible) {
		$gameTemp._target = this.enemy();
        this._battleHelpWindow.setItem(this.enemy());
		this._battleHelpWindow.refresh();
    }
};

Window_BattleEnemy.prototype.setHelp  = function(Window) {
    this._battleHelpWindow = Window;
};

})();