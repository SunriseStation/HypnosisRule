//=============================================================================
// KD_CustomConfig.js
//=============================================================================

/*:
 * @plugindesc Extra game configuration
 * @author KineticDog
 *
 * @param Config Variable
 * @type number
 * @min 0
 * @desc The variable used to save config meta data and current value
 * Default: 0
 * @default 0
 *
 * @param Window Width
 * @type number
 * @min 0
 * @desc The width of the config window
 * Default: 400
 * @default 400
 *
 * @param On Change
 * @desc Script Function executed if there are any changes made in config
 *
 */

let helpWindow = null;
const KD_CustomConfig_Params = {
  varId: Number(PluginManager.parameters('KD_CustomConfig')['Config Variable']),
  width: Number(PluginManager.parameters('KD_CustomConfig')['Window Width']),
  onChange: eval(PluginManager.parameters('KD_CustomConfig')['On Change']),
};

const getConfigs = () => {
  if (isNaN(KD_CustomConfig_Params.varId) || KD_CustomConfig_Params.varId < 1) return [];
  return $gameVariables.value(KD_CustomConfig_Params.varId) || [];
};
const setConfigs = config => {
  if (isNaN(KD_CustomConfig_Params.varId) || KD_CustomConfig_Params.varId < 1) return;
  $gameVariables.setValue(KD_CustomConfig_Params.varId, config || []);
  if (KD_CustomConfig_Params.onChange) KD_CustomConfig_Params.onChange();
};
const findConfig = symbol => {
  const configs = getConfigs();
  return configs.find(config => config.id === symbol);
};
//-----------------------------------------------------------------------------
// Scene_CustomOptions
//
// The scene class of the options screen.

function Scene_CustomOptions() {
  this.initialize.apply(this, arguments);
}

Scene_CustomOptions.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CustomOptions.prototype.constructor = Scene_CustomOptions;

Scene_CustomOptions.prototype.initialize = function () {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_CustomOptions.prototype.create = function () {
  Scene_MenuBase.prototype.create.call(this);
  this.createHelpWindow();
  helpWindow = this._helpWindow;
  this.createOptionsWindow(this._helpWindow);
};

Scene_CustomOptions.prototype.terminate = function () {
  Scene_MenuBase.prototype.terminate.call(this);
  ConfigManager.save();
};

Scene_CustomOptions.prototype.createOptionsWindow = function (helpWindow) {
  this._optionsWindow = new Window_CustomOptions();
  this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
  this._optionsWindow._helpWindow = helpWindow;
  this.addWindow(this._optionsWindow);
};

//-----------------------------------------------------------------------------
// Window_CustomOptions
//
// The window for changing various settings on the options screen.
function Window_CustomOptions() {
  this.initialize.apply(this, arguments);
}

Window_CustomOptions.prototype = Object.create(Window_Command.prototype);
Window_CustomOptions.prototype.constructor = Window_CustomOptions;

Window_CustomOptions.prototype.initialize = function () {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.updatePlacement();
};

Window_CustomOptions.prototype.windowWidth = function () {
  return KD_CustomConfig_Params.width || 400;
};

Window_CustomOptions.prototype.windowHeight = function () {
  return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};

Window_CustomOptions.prototype.updatePlacement = function () {
  this.x = (Graphics.boxWidth - this.width) / 2;
  this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_CustomOptions.prototype.makeCommandList = function () {
  const configs = getConfigs();
  configs.forEach(config => {
    this.addCommand(config.label, config.id);
  });
};

Window_CustomOptions.prototype.addGeneralOptions = function () {
  this.addCommand(TextManager.alwaysDash, 'alwaysDash');
  this.addCommand(TextManager.commandRemember, 'commandRemember');
};

Window_CustomOptions.prototype.addVolumeOptions = function () {
  this.addCommand(TextManager.bgmVolume, 'bgmVolume');
  this.addCommand(TextManager.bgsVolume, 'bgsVolume');
  this.addCommand(TextManager.meVolume, 'meVolume');
  this.addCommand(TextManager.seVolume, 'seVolume');
};

Window_CustomOptions.prototype.drawItem = function (index) {
  var rect = this.itemRectForText(index);
  var statusWidth = this.statusWidth();
  var titleWidth = rect.width - statusWidth;
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
  this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
};

Window_CustomOptions.prototype.statusWidth = function () {
  return 120;
};

Window_CustomOptions.prototype.statusText = function (index) {
  var symbol = this.commandSymbol(index);
  const config = findConfig(symbol);
  const option = config.options.find(option => option.id === config.value);
  return option.label;
};

Window_CustomOptions.prototype.isVolumeSymbol = function (symbol) {
  return symbol.contains('Volume');
};

Window_CustomOptions.prototype.booleanStatusText = function (value) {
  return value ? 'ON' : 'OFF';
};

Window_CustomOptions.prototype.volumeStatusText = function (value) {
  return value + '%';
};

Window_CustomOptions.prototype.processOk = function () {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  const config = findConfig(symbol);
  const idx = config.options.findIndex(option => option.id === config.value);
  const nextIdx = (idx + 1) % config.options.length;
  this.changeValue(symbol, config.options[nextIdx].id);
};

Window_CustomOptions.prototype.cursorRight = function () {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  const config = findConfig(symbol);
  const idx = config.options.findIndex(option => option.id === config.value);
  const nextIdx = (idx + 1) % config.options.length;
  this.changeValue(symbol, config.options[nextIdx].id);
};

Window_CustomOptions.prototype.cursorLeft = function () {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  const config = findConfig(symbol);
  const idx = config.options.findIndex(option => option.id === config.value);
  const prevIdx = (idx + config.options.length - 1) % config.options.length;
  this.changeValue(symbol, config.options[prevIdx].id);
};

Window_CustomOptions.prototype.volumeOffset = function () {
  return 20;
};

Window_CustomOptions.prototype.changeValue = function (symbol, value) {
  const config = findConfig(symbol);
  if (config.value !== value) {
    this.setConfigValue(symbol, value);
    this.redrawItem(this.findSymbol(symbol));
    SoundManager.playCursor();

    const option = config.options.find(option => option.id === config.value);
    helpWindow.setText(option.desc);
  }
};

Window_CustomOptions.prototype.getConfigValue = function (symbol) {
  return findConfig(symbol).value;
};

Window_CustomOptions.prototype.setConfigValue = function (symbol, value) {
  const configs = getConfigs();
  const config = configs.find(config => config.id === symbol);
  config.value = value;
  setConfigs(configs);
};

Window_CustomOptions.prototype.callUpdateHelp = function (index) {
  if (index > -1) {
    var symbol = this.commandSymbol(index);
    const config = findConfig(symbol);
    const option = config.options.find(option => option.id === config.value);
    helpWindow.setText(option.desc);
  }
};

Window_CustomOptions.prototype.select = function (index) {
  this._index = index;
  this._stayCount = 0;
  this.ensureCursorVisible();
  this.updateCursor();
  this.callUpdateHelp(index);
};
