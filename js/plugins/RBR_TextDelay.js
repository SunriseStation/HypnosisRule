//=============================================================================
// RBR_TextDelay.js
//=============================================================================

/*:
 * @plugindesc Control the text auto play delay between texts
 * @author KineticDog
 *
 */

const OPTIONS = {
  0: '#{lblManual}',
  1: '#{lblFastSpeed}',
  2: '#{lblMiddleSpeed}',
  3: '#{lblSlowSpeed}',
};

(function () {
  var delay;

  Object.defineProperty(ConfigManager, 'delay', {
    get: function () {
      return delay;
    },
    set: function (value) {
      delay = value;
    },
  });

  var ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function () {
    var config = ConfigManager_makeData.apply(this, arguments);
    config.delay = this.delay;
    return config;
  };

  var ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function (config) {
    ConfigManager_applyData.apply(this, arguments);
    this.delay = _.isNumber(config.delay) ? config.delay : 1;
  };

  var _prevOption = function (delay) {
    const options = Object.keys(OPTIONS).map(num => Number(num));
    const index = options.indexOf(delay) + 1;
    return index >= options.length ? 0 : index;
  };

  var _nextOption = function (delay) {
    const options = Object.keys(OPTIONS).map(num => Number(num));
    const index = options.indexOf(delay) - 1;
    return index < 0 ? options.length - 1 : index;
  };

  var Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function () {
    this.addCommand(`#{lblTextDelay}`, 'delay');
    Window_Options_makeCommandList.apply(this, arguments);
  };

  var alias_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function (index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    return symbol === 'delay' ? OPTIONS[value] : alias_statusText.call(this, index);
  };

  var alias_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function () {
    var symbol = this.commandSymbol(this.index()),
      value = this.getConfigValue(symbol);
    if (symbol === 'delay') {
      return this.changeValue(symbol, _nextOption(value));
    }
    alias_processOk.call(this);
  };

  var alias_cursorLeft = Window_Options.prototype.cursorLeft;
  Window_Options.prototype.cursorLeft = function (wrap) {
    var symbol = this.commandSymbol(this.index()),
      value = this.getConfigValue(symbol);
    if (symbol === 'delay') {
      return this.changeValue(symbol, _prevOption(value));
    }
    alias_cursorLeft.call(this, wrap);
  };

  var alias_cursorRight = Window_Options.prototype.cursorRight;
  Window_Options.prototype.cursorRight = function (wrap) {
    var symbol = this.commandSymbol(this.index()),
      value = this.getConfigValue(symbol);
    if (symbol === 'delay') {
      return this.changeValue(symbol, _nextOption(value));
    }
    alias_cursorRight.call(this, wrap);
  };
})();
