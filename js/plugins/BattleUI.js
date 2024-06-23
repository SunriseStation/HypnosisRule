//=============================================================================
// BattleUI.js
//=============================================================================

/*:
 * @plugindesc 战斗UI【立绘控制】.
 * @author hugh
 *
 * @param file
 * @text 立绘文件夹位置
 * @desc 默认[img/pictures/]
 * @default img/pictures/
 *
 * @param uiw
 * @text UI宽度
 * @desc UI槽宽度
 * @default 512
 *
 * @param aminOffsetX
 * @text 角色动画显示X偏移
 * @desc X偏移值.
 * @default 0
 *
 * @param aminOffsetY
 * @text 角色动画显示Y偏移
 * @desc Y偏移值.
 * @default -40
 *
 * @param damageOffsetY
 * @text 角色伤害显示Y偏移
 * @desc Y偏移值.
 * @default -40
 *
 * @param Hud01_Y
 * @text 角色01战斗立绘Y
 * @desc Y偏移值.
 * @default 1000
 *
 * @param Hud01_Zoom
 * @text 角色01战斗立绘放大倍率。
 * @desc 放大倍率.
 * @default 1
 *
 * @param Hud02_Y
 * @text 角色02战斗立绘Y
 * @desc Y偏移值.
 * @default 1000
 *
 * @param Hud02_Zoom
 * @text 角色02战斗立绘放大倍率。
 * @desc 放大倍率.
 * @default 1
 *
 * @param Hud03_Y
 * @text 角色03战斗立绘Y
 * @desc Y偏移值.
 * @default 1000
 *
 * @param Hud03_Zoom
 * @text 角色03战斗立绘放大倍率。
 * @desc 放大倍率.
 * @default 1
 *
 * @help
 * 技能备注：
 * <TpRecover>  \\攻击减少tp 【需要使用技能项目中的效果项目中增加TP】
 * 注：使用此代码后，技能项目中的效果项目中增加TP会执行减少TP
 *
 * 脚本说明：
 *  $gameTemp.setBattlerImage(id,Img1,Img2,Img3,Img4,Img5)  \\ 设定立绘
 *   id：角色ID
 *   Img1,Img2,Img3,Img4,Img5: 图片名
 *  $gameTemp.setBattlerImg1(id,Img)    \\  修改图层1立绘
 *  $gameTemp.setBattlerImg2(id,Img)    \\  修改图层2立绘
 *  $gameTemp.setBattlerImg3(id,Img)    \\  修改图层3立绘
 *  $gameTemp.setBattlerImg4(id,Img)    \\  修改图层4立绘
 *  $gameTemp.setBattlerImg5(id,Img)    \\  修改图层5立绘
 *   id：角色ID
 *   back: 图片名
 *
 */
(function () {
  var ttt = ttt || {};

  ttt.parameters = PluginManager.parameters('BattleUI');
  ttt._file = ttt.parameters['file'] || 'img/pictures/';
  ttt._uiw = Number(ttt.parameters['uiw'] || 200);
  ttt._hud01_y = Number(ttt.parameters['Hud01_Y'] || 1000);
  ttt._hud02_y = Number(ttt.parameters['Hud02_Y'] || 1000);
  ttt._hud03_y = Number(ttt.parameters['Hud03_Y'] || 1000);
  ttt._damageOffsetY = Number(ttt.parameters['damageOffsetY'] || -40);
  ttt._aminOffsetX = Number(ttt.parameters['aminOffsetX'] || 0);
  ttt._aminOffsetY = Number(ttt.parameters['aminOffsetY'] || -40);

  ttt._hud01_zoom = Number(ttt.parameters['Hud01_Zoom'] || 1);
  ttt._hud02_zoom = Number(ttt.parameters['Hud02_Zoom'] || 1);
  ttt._hud03_zoom = Number(ttt.parameters['Hud03_Zoom'] || 1);

  ImageManager.loadFile = function (filename, hue) {
    return this.loadBitmap(ttt._file, filename, hue, false);
  };

  Game_Temp.prototype.setBattlerImage = function (id, Img1, Img2, Img3, Img4, Img5) {
    this.setBattlerImg1(id, Img1);
    this.setBattlerImg2(id, Img2);
    this.setBattlerImg3(id, Img3);
    this.setBattlerImg4(id, Img4);
    this.setBattlerImg5(id, Img5);
  };

  Game_Temp.prototype.setBattlerImg1 = function (id, back) {
    const item = $gameActors._data[id];
    if (item) {
      item._Img1 = back ? back : '';
    }
  };

  Game_Temp.prototype.setBattlerImg2 = function (id, back) {
    const item = $gameActors._data[id];
    if (item) {
      item._Img2 = back ? back : '';
    }
  };

  Game_Temp.prototype.setBattlerImg3 = function (id, back) {
    const item = $gameActors._data[id];
    if (item) {
      item._Img3 = back ? back : '';
    }
  };

  Game_Temp.prototype.setBattlerImg4 = function (id, back) {
    const item = $gameActors._data[id];
    if (item) {
      item._Img4 = back ? back : '';
    }
  };

  Game_Temp.prototype.setBattlerImg5 = function (id, back) {
    const item = $gameActors._data[id];
    if (item) {
      item._Img5 = back ? back : '';
    }
  };

  Game_Temp.prototype.layerzoom = function () {
    const c1 = ttt._hud01_zoom;
    const c2 = ttt._hud02_zoom;
    const c3 = ttt._hud03_zoom;
    const data = [c1, c2, c3];
    return data;
  };

  Game_Action.prototype.isTpRecover = function () {
    return this.item().meta.TpRecover;
  };

  Game_Action.prototype.itemEffectGainTp = function (target, effect) {
    var value = Math.floor(effect.value1);
    if (value !== 0) {
      value = this.isTpRecover() ? -value : value;
      target.gainTp(value);
      this.makeSuccess(target);
    }
  };

  var hhh_Game_Action_testApply = Game_Action.prototype.testApply;
  Game_Action.prototype.testApply = function (target) {
    return (
      hhh_Game_Action_testApply.call(this, target) ||
      (this.isTpRecover() && target.tp < target.maxTp())
    );
  };

  var hugh_Game_Actor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function (actorId) {
    hugh_Game_Actor_setup.call(this, actorId);
    this._Img1 = '';
    this._Img2 = '';
    this._Img3 = '';
    this._Img4 = '';
    this._Img5 = '';
  };

  Game_Actor.prototype.performActionStart = function (action) {
    Game_Battler.prototype.performActionStart.call(this, action);
    this.requestEffect('whiten');
  };

  Game_Actor.prototype.performCollapse = function () {
    Game_Battler.prototype.performCollapse.call(this);
    this.requestEffect('collapse');
    SoundManager.playEnemyCollapse();
  };

  Game_Actor.prototype.performDamage = function () {
    Game_Battler.prototype.performDamage.call(this);
    SoundManager.playEnemyDamage();
    this.requestEffect('blink');
  };

  Game_Battler.prototype.startDamagePopup = function () {
    var result = this.result();
    if (result.missed || result.evaded) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      copyResult.mpDamage = 0;
      copyResult.tpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result.hpAffected) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.mpDamage = 0;
      copyResult.tpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result.mpDamage !== 0) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      copyResult.tpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result.tpDamage !== 0) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
      copyResult.mpDamage = 0;
      this._damagePopup.push(copyResult);
    }
  };

  Sprite_Damage.prototype.setup = function (target) {
    this._result = target.shiftDamagePopup();
    var result = this._result;
    if (result.missed || result.evaded) {
      this.createMiss();
    } else if (result.hpAffected) {
      this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
      this.createDigits(2, result.mpDamage);
    } else if (target.isAlive() && result.tpDamage !== 0) {
      this.createDigits(1, result.tpDamage);
    }
    if (result.critical) {
      this.setupCriticalEffect();
    }
  };

  Spriteset_Battle.prototype.createActors = function () {
    this._actorSprites = [];
    this._battlerSprites = [];
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
      //this._actorSprites[i] = new Sprite_Actor();
      this._actorSprites[i] = new Sprite_BattleActor();
      //this._battlerSprites[i] = new Sprite_BattleActor();
      this._battleField.addChild(this._actorSprites[i]);
      //this._battleField.addChild(this._battlerSprites[i]);
    }
    const members = $gameParty.battleMembers();
    for (let i = 0; i < this._actorSprites.length; i++) {
      this._actorSprites[i].setBattler(members[i]);
    }
  };

  Sprite_Battler.prototype.updateVisibility = function () {
    Sprite_Base.prototype.updateVisibility.call(this);
  };

  Spriteset_Battle.prototype.updateActors = function () {
    // const members = $gameParty.battleMembers();
    // for (let i = 0; i < this._actorSprites.length; i++) {
    //   this._actorSprites[i].setBattler(members[i]);
    // }
    //for (let i = 0; i < this._battlerSprites.length; i++) {
    //    this._battlerSprites[i].setBattler(members[i]);
    // }
  };

  //-----------------------------------------------------------------------------
  // Sprite_BattleActor
  //
  // The sprite for displaying an enemy.

  function Sprite_BattleActor() {
    this.initialize.apply(this, arguments);
  }

  Sprite_BattleActor.prototype = Object.create(Sprite_Battler.prototype);
  Sprite_BattleActor.prototype.constructor = Sprite_BattleActor;

  Sprite_BattleActor.prototype.initialize = function (battler) {
    Sprite_Battler.prototype.initialize.call(this, battler);
  };

  Sprite_BattleActor.prototype.initMembers = function () {
    Sprite_Battler.prototype.initMembers.call(this);
    this._enemy = null;
    this._appeared = false;
    this._effectType = null;
    this._effectDuration = 0;
    this._shake = 0;
    this._Img1 = new Sprite_Base();
    this._Img1.anchor.x = 0.5;
    this._Img1.anchor.y = 1;
    this._Img2 = new Sprite_Base();
    this._Img2.anchor.x = 0.5;
    this._Img2.anchor.y = 1;
    this._Img3 = new Sprite_Base();
    this._Img3.anchor.x = 0.5;
    this._Img3.anchor.y = 1;
    this._Img4 = new Sprite_Base();
    this._Img4.anchor.x = 0.5;
    this._Img4.anchor.y = 1;
    this._Img5 = new Sprite_Base();
    this._Img5.anchor.x = 0.5;
    this._Img5.anchor.y = 1;
    this.addChild(this._Img1);
    this.addChild(this._Img2);
    this.addChild(this._Img3);
    this.addChild(this._Img4);
    this.addChild(this._Img5);
    this._effectTarget = this._Img2;
  };

  Sprite_BattleActor.prototype.setBattler = function (battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._enemy = battler;
    const index = $gameParty.battleMembers().indexOf(battler);
    const scale = $gameTemp.layerzoom()[index];
    const zoom = new Point(scale, scale);
    this._Img1.scale = zoom;
    this._Img2.scale = zoom;
    this._Img3.scale = zoom;
    this._Img4.scale = zoom;
    this._Img5.scale = zoom;
    const pos_x = [256, 768, 1280];
    const pos_y = [ttt._hud01_y, ttt._hud02_y, ttt._hud03_y];
    this.setHome(pos_x[index], pos_y[index]);
  };

  Sprite_BattleActor.prototype.update = function () {
    Sprite_Battler.prototype.update.call(this);
    if (this._enemy) {
      this.updateEffect();
    }
  };

  Sprite_BattleActor.prototype.updateBitmap = function () {
    Sprite_Battler.prototype.updateBitmap.call(this);
    if (this._enemy) {
      this.loadBitmap(name);
      this.initVisibility();
    }
  };

  Sprite_BattleActor.prototype.setupWeaponAnimation = function () {};

  Sprite_BattleActor.prototype.loadBitmap = function (name) {
    this._Img1.bitmap = this._enemy._Img1
      ? ImageManager.loadFile(this._enemy._Img1)
      : ImageManager.loadFile('');
    this._Img2.bitmap = this._enemy._Img2
      ? ImageManager.loadFile(this._enemy._Img2)
      : ImageManager.loadFile('');
    this._Img3.bitmap = this._enemy._Img3
      ? ImageManager.loadFile(this._enemy._Img3)
      : ImageManager.loadFile('');
    this._Img4.bitmap = this._enemy._Img4
      ? ImageManager.loadFile(this._enemy._Img4)
      : ImageManager.loadFile('');
    this._Img5.bitmap = this._enemy._Img5
      ? ImageManager.loadFile(this._enemy._Img5)
      : ImageManager.loadFile('');
  };

  Sprite_BattleActor.prototype.updateSelectionEffect = function () {
    var target = this._effectTarget;
    if (this._battler.isSelected()) {
      this._Img1.setBlendColor([255, 255, 255, 80]);
      this._Img2.setBlendColor([255, 255, 255, 80]);
      this._Img3.setBlendColor([255, 255, 255, 80]);
      this._Img4.setBlendColor([255, 255, 255, 80]);
      this._Img5.setBlendColor([255, 255, 255, 80]);
    } else {
      this._Img1.setBlendColor([0, 0, 0, 0]);
      this._Img2.setBlendColor([0, 0, 0, 0]);
      this._Img3.setBlendColor([0, 0, 0, 0]);
      this._Img4.setBlendColor([0, 0, 0, 0]);
      this._Img5.setBlendColor([0, 0, 0, 0]);
    }
  };

  Sprite_BattleActor.prototype.updateFrame = function () {
    Sprite_Battler.prototype.updateFrame.call(this);
    var frameHeight = this._Img2.bitmap.height;
    this.setFrame(0, 0, this._Img2.bitmap.width, frameHeight);
  };

  Sprite_BattleActor.prototype.updatePosition = function () {
    Sprite_Battler.prototype.updatePosition.call(this);
    this._Img1.x += this._shake;
    this._Img2.x += this._shake;
    this._Img3.x += this._shake;
    this._Img4.x += this._shake;
    this._Img5.x += this._shake;
  };

  Sprite_BattleActor.prototype.initVisibility = function () {
    this._appeared = this._enemy.isAlive();
    if (!this._appeared) {
      this.opacity = 192;
      this.setBlendColor([255, 128, 128, 128]);
    }
  };

  Sprite_BattleActor.prototype.setupEffect = function () {
    if (this._appeared && this._enemy.isEffectRequested()) {
      this.startEffect(this._enemy.effectType());
      this._enemy.clearEffect();
    }
    if (!this._appeared && this._enemy.isAlive()) {
      this.startEffect('appear');
    } else if (this._appeared && this._enemy.isHidden()) {
      this.startEffect('disappear');
    }
  };

  Sprite_BattleActor.prototype.startEffect = function (effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
      case 'appear':
        this.startAppear();
        break;
      case 'disappear':
        this.startDisappear();
        break;
      case 'whiten':
        this.startWhiten();
        break;
      case 'blink':
        this.startBlink();
        break;
      case 'collapse':
        this.startCollapse();
        break;
      case 'instantCollapse':
        this.startInstantCollapse();
        break;
    }
    this.revertToNormal();
  };

  Sprite_BattleActor.prototype.startAppear = function () {
    this._effectDuration = 16;
    this._appeared = true;
  };

  Sprite_BattleActor.prototype.startDisappear = function () {
    this._effectDuration = 32;
    this._appeared = false;
  };

  Sprite_BattleActor.prototype.startWhiten = function () {
    this._effectDuration = 16;
  };

  Sprite_BattleActor.prototype.startBlink = function () {
    this._effectDuration = 20;
  };

  Sprite_BattleActor.prototype.startCollapse = function () {
    this._effectDuration = 32;
    this._appeared = false;
  };

  Sprite_BattleActor.prototype.startBossCollapse = function () {
    this._effectDuration = this.bitmap.height;
    this._appeared = false;
  };

  Sprite_BattleActor.prototype.startInstantCollapse = function () {
    this._effectDuration = 16;
    this._appeared = false;
  };

  Sprite_BattleActor.prototype.updateEffect = function () {
    this.setupEffect();
    if (this._effectDuration > 0) {
      this._effectDuration--;
      switch (this._effectType) {
        case 'whiten':
          this.updateWhiten();
          break;
        case 'blink':
          this.updateBlink();
          break;
        case 'appear':
          this.updateAppear();
          break;
        case 'disappear':
          this.updateDisappear();
          break;
        case 'collapse':
          this.updateCollapse();
          break;
        case 'instantCollapse':
          this.updateInstantCollapse();
          break;
      }
      if (this._effectDuration === 0) {
        this._effectType = null;
      }
    }
  };

  Sprite_BattleActor.prototype.isEffecting = function () {
    return this._effectType !== null;
  };

  Sprite_BattleActor.prototype.revertToNormal = function () {
    this._Img1._shake = 0;
    this._Img1.blendMode = 0;
    this._Img1.opacity = 255;
    this._Img1.setBlendColor([0, 0, 0, 0]);
    this._Img2._shake = 0;
    this._Img2.blendMode = 0;
    this._Img2.opacity = 255;
    this._Img2.setBlendColor([0, 0, 0, 0]);
    this._Img3._shake = 0;
    this._Img3.blendMode = 0;
    this._Img3.opacity = 255;
    this._Img3.setBlendColor([0, 0, 0, 0]);
    this._Img4._shake = 0;
    this._Img4.blendMode = 0;
    this._Img4.opacity = 255;
    this._Img4.setBlendColor([0, 0, 0, 0]);
    this._Img5._shake = 0;
    this._Img5.blendMode = 0;
    this._Img5.opacity = 255;
    this._Img5.setBlendColor([0, 0, 0, 0]);
  };

  Sprite_BattleActor.prototype.updateWhiten = function () {
    var alpha = 128 - (16 - this._effectDuration) * 10;
    this._Img1.setBlendColor([255, 255, 255, alpha]);
    this._Img2.setBlendColor([255, 255, 255, alpha]);
    this._Img3.setBlendColor([255, 255, 255, alpha]);
    this._Img4.setBlendColor([255, 255, 255, alpha]);
    this._Img5.setBlendColor([255, 255, 255, alpha]);
  };

  Sprite_BattleActor.prototype.updateBlink = function () {
    this._Img1.opacity = this._effectDuration % 10 < 5 ? 255 : 0;
    this._Img2.opacity = this._effectDuration % 10 < 5 ? 255 : 0;
    this._Img3.opacity = this._effectDuration % 10 < 5 ? 255 : 0;
    this._Img4.opacity = this._effectDuration % 10 < 5 ? 255 : 0;
    this._Img5.opacity = this._effectDuration % 10 < 5 ? 255 : 0;
  };

  Sprite_BattleActor.prototype.updateAppear = function () {
    this._Img1.opacity = (16 - this._effectDuration) * 16;
    this._Img2.opacity = (16 - this._effectDuration) * 16;
    this._Img3.opacity = (16 - this._effectDuration) * 16;
    this._Img4.opacity = (16 - this._effectDuration) * 16;
    this._Img5.opacity = (16 - this._effectDuration) * 16;
  };

  Sprite_BattleActor.prototype.updateDisappear = function () {
    this._Img1.opacity = 256 - (32 - this._effectDuration) * 10;
    this._Img2.opacity = 256 - (32 - this._effectDuration) * 10;
    this._Img3.opacity = 256 - (32 - this._effectDuration) * 10;
    this._Img4.opacity = 256 - (32 - this._effectDuration) * 10;
    this._Img5.opacity = 256 - (32 - this._effectDuration) * 10;
  };

  Sprite_BattleActor.prototype.updateCollapse = function () {
    this._Img1.blendMode = Graphics.BLEND_ADD;
    this._Img1.setBlendColor([255, 128, 128, 128]);
    this._Img2.blendMode = Graphics.BLEND_ADD;
    this._Img2.setBlendColor([255, 128, 128, 128]);
    this._Img3.blendMode = Graphics.BLEND_ADD;
    this._Img3.setBlendColor([255, 128, 128, 128]);
    this._Img4.blendMode = Graphics.BLEND_ADD;
    this._Img4.setBlendColor([255, 128, 128, 128]);
    this._Img5.blendMode = Graphics.BLEND_ADD;
    this._Img5.setBlendColor([255, 128, 128, 128]);
  };

  Sprite_BattleActor.prototype.updateInstantCollapse = function () {
    this.opacity = 0;
  };

  Sprite_BattleActor.prototype.damageOffsetX = function () {
    return 0;
  };

  Sprite_BattleActor.prototype.damageOffsetY = function () {
    return ttt._damageOffsetY;
  };

  Sprite_BattleActor.prototype.startAnimation = function (animation, mirror, delay) {
    var sprite = new Sprite_AnimationActor();
    sprite.setup(this._effectTarget, animation, mirror, delay);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
  };

  function Sprite_AnimationActor() {
    this.initialize.apply(this, arguments);
  }

  Sprite_AnimationActor.prototype = Object.create(Sprite_Animation.prototype);
  Sprite_AnimationActor.prototype.constructor = Sprite_AnimationActor;

  Sprite_AnimationActor.prototype.updateCellSprite = function (sprite, cell) {
    Sprite_Animation.prototype.updateCellSprite.call(this, sprite, cell);
    sprite.x += ttt._aminOffsetX;
    sprite.y += ttt._aminOffsetY;
  };

  Window_BattleStatus.prototype.initialize = function () {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - width;
    var y = Graphics.boxHeight - height;
    this._actorIcons = [];
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
      this._actorIcons[i] = 0;
    }
    this._iconTimer = 0;
    this._maxIconTimer = 60;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.openness = 0;
    this.opacity = 0;
  };

  Window_BattleStatus.prototype.windowWidth = function () {
    return (Graphics.boxWidth / 3) * this.maxItems() + this.standardPadding() * 2;
  };

  Window_BattleStatus.prototype.windowHeight = function () {
    return this.fittingHeight(4);
  };

  Window_BattleStatus.prototype.itemHeight = function () {
    return this.contentsHeight();
  };

  Window_BattleStatus.prototype.updateCursor = function () {
    if (this._cursorAll) {
      var allRowsHeight = this.maxRows() * this.itemHeight();
      this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
      this.setTopRow(0);
    } else if (this.isCursorVisible()) {
      var rect = this.itemRect2(this.index());
      this.setCursorRect(rect.x, rect.y, rect.width, rect.height - this.fittingHeight(0));
    } else {
      this.setCursorRect(0, 0, 0, 0);
    }
  };

  Window_BattleStatus.prototype.itemRect2 = function (index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = this.itemWidth();
    rect.height = this.itemHeight();
    rect.x = (index % maxCols) * rect.width;
    rect.y =
      Math.floor(index / maxCols) * rect.height +
      ($dataSystem.optDisplayTp ? 0 : this.lineHeight());
    return rect;
  };

  Window_BattleStatus.prototype.numVisibleRows = function () {
    return 1;
  };

  Window_BattleStatus.prototype.maxCols = function () {
    return this.maxItems();
  };

  Window_BattleStatus.prototype.maxItems = function () {
    return $gameParty.battleMembers().length;
  };

  Window_BattleStatus.prototype.drawItem = function (index) {
    var actor = $gameParty.battleMembers()[index];
    var rect = this.itemRect(index);
    if (actor) {
      var x = rect.x + Math.floor(Graphics.boxWidth / 6) - Math.floor(ttt._uiw / 2) + 1;
      var y = rect.y;
      var width = rect.width - x - this.textPadding();
      var w1 = ttt._uiw;
      var w2 = ttt._uiw / 2;
      var w3 = ttt._uiw / 2;
      var lineHeight = this.lineHeight();
      if (!$dataSystem.optDisplayTp) y += lineHeight;
      this.drawStateArea(rect, actor);
      this.drawActorName(actor, x, y + lineHeight * 0);
      this.drawActorHp(actor, x, y + lineHeight * 1, w1);
      this.drawActorMp(actor, x, y + lineHeight * 2, w2);
      if ($dataSystem.optDisplayTp)
        this.drawActorTp(actor, x + ttt._uiw / 2, y + lineHeight * 2, w3);
    }
  };

  var _Window_BattleStatus_update = Window_BattleStatus.prototype.update;
  Window_BattleStatus.prototype.update = function () {
    _Window_BattleStatus_update.call(this);
    // this._iconTimer++;
    // if (this._iconTimer >= this._maxIconTimer) {
    //   for (var i = 0; i < this._actorIcons.length; i++) {
    //     this._actorIcons[i]++;
    //   }
    //   this._iconTimer = 0;
    // }
  };

  Window_BattleStatus.prototype.drawStateArea = function (rect, actor) {
    var row = 4;
    var wy = this.lineHeight() * 3;
    var w1 = ttt._uiw;
    var x =
      rect.x +
      Math.floor(Graphics.boxWidth / 6) -
      Math.floor(ttt._uiw / 2) -
      Math.floor(this.standardPadding() / 2) +
      9;
    this.drawActorIcons(actor, x, wy, w1);
  };

  Window_Selectable.prototype.clearItem = function (index) {
    var rect = this.itemRect(index);
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
  };

  var _Scene_Battle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
  Scene_Battle.prototype.selectNextCommand = function () {
    _Scene_Battle_selectNextCommand.call(this);
    this.updateActorCommandWindowPosition();
  };

  Scene_Battle.prototype.updateWindowPositions = function () {
    if (BattleManager.isInputting()) {
      this.updateActorCommandWindowPosition();
      if (
        (this._actorWindow.active || this._enemyWindow.active) &&
        !this._actorCommandWindow.isClosing() &&
        !this._actorCommandWindow.isClosed()
      )
        this._actorCommandWindow.close();
      else if (
        !this._actorWindow.active &&
        !this._enemyWindow.active &&
        !this._actorCommandWindow.isOpening() &&
        !this._actorCommandWindow.isOpen() &&
        this._actorCommandWindow.active
      )
        this._actorCommandWindow.open();
    }
  };

  Scene_Battle.prototype.updateActorCommandWindowPosition = function () {
    var index = this._statusWindow.index();
    if (index < 0) index = 0;
    var rect = this._statusWindow.itemRect(index);
    var x =
      this._statusWindow.x +
      this._statusWindow.standardPadding() +
      rect.x +
      rect.width / 2 -
      this._actorCommandWindow.width / 2;
    this._actorCommandWindow.x = x;
    this._actorCommandWindow.y = Graphics.boxHeight / 2 - 36 + 100;
  };

  var _SceneBattle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
  Scene_Battle.prototype.createStatusWindow = function () {
    _SceneBattle_createStatusWindow.call(this);
    this._statusWindow.x = Graphics.boxWidth / 2 - this._statusWindow.width / 2;
  };

  var _SceneBattle_createActorWindow = Scene_Battle.prototype.createActorWindow;
  Scene_Battle.prototype.createActorWindow = function () {
    _SceneBattle_createActorWindow.call(this);
    this._actorWindow.x = Graphics.boxWidth / 2 - this._actorWindow.width / 2;
  };

  Window_PartyCommand.prototype.numVisibleRows = function () {
    return 1;
  };

  Window_PartyCommand.prototype.maxCols = function () {
    return 2;
  };

  Window_PartyCommand.prototype.itemTextAlign = function () {
    return 'center';
  };

  var _SceneBattle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
  Scene_Battle.prototype.createPartyCommandWindow = function () {
    _SceneBattle_createPartyCommandWindow.call(this);
    this._partyCommandWindow.x = 0;
    this._partyCommandWindow.y = 0;
    this._partyCommandWindow.width = Graphics.boxWidth;
  };

  var _SceneBattle_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
  Scene_Battle.prototype.createEnemyWindow = function () {
    _SceneBattle_createEnemyWindow.call(this);
    this._enemyWindow.x = 0;
    this._enemyWindow.width = Graphics.boxWidth;
  };

  Window_ActorCommand.prototype.numVisibleRows = function () {
    return 2;
  };
})();
