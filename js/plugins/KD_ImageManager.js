//=============================================================================
// KD_ImageManager.js
//=============================================================================

/*:
 * @plugindesc Simplify image group rendering and image effects
 * @author KineticDog
 *
 * @param Global Duration
 * @type number
 * @min 0
 * @desc Default duration for any kind of time limited effects if no duration is specified
 * Default: 15
 * @default 15
 *
 * @param Global Offset
 * @type number
 * @min 0
 * @desc Default offset for any kind of move effects if no offset is specified
 * Default: 72
 * @default 72
 *
 * @param Global Dim Tone
 * @type text
 * @desc Default tone to dim images
 * Default: [0, 0, 68, 68]
 * @default [0, 0, 68, 68]
 *
 * @param Global Dim Duration
 * @type number
 * @min 0
 * @desc Default duration to dim an image or reset image's dim
 * Default: 2
 * @default 2
 */

const KD_ImageManager_Params = {
  durationGlobal: Number(PluginManager.parameters('KD_ImageManager')['Global Duration']),
  offsetGlobal: Number(PluginManager.parameters('KD_ImageManager')['Global Offset']),
  dimToneGlobal: JSON.parse(PluginManager.parameters('KD_ImageManager')['Global Dim Tone']),
  dimDurationGlobal: Number(PluginManager.parameters('KD_ImageManager')['Global Dim Duration']),
};

function KD_ImageManager() {
  // remove all images
  this.clearAll = () => {
    for (let counter = 1; counter < 100; counter++) $gameScreen.erasePicture(counter);
  };

  // create and display an image
  this.show = (id, name, pos, scale) => {
    if (Array.isArray(id)) id.forEach(e => this.show(e, name, pos, scale));
    else {
      const existing = $gameScreen.picture(id) || {};
      const {
        _x = Graphics.boxWidth / 2,
        _y = Graphics.boxHeight / 2,
        _scaleX = 100,
        _scaleY = 100,
        _name,
      } = existing;
      const finalPos = _.defaultTo(pos, [_x, _y]);
      const finalScale = _.defaultTo(scale, [_scaleX, _scaleY]);
      $gameScreen.showPicture(id, name || _name, 1, ...finalPos, ...finalScale, 255, 0);
    }
  };

  // remove an image
  this.clear = id => {
    if (Array.isArray(id)) id.forEach(e => this.clear(e));
    else $gameScreen.erasePicture(id);
  };

  // create an image but not display yet
  this.setup = (id, name, pos, scale) => {
    const x = _.defaultTo(pos && pos[0], Graphics.boxWidth / 2);
    const y = _.defaultTo(pos && pos[1], Graphics.boxHeight / 2);
    const scaleX = _.defaultTo(scale && scale[0], 100);
    const scaleY = _.defaultTo(scale && scale[1], 100);
    if (Array.isArray(id)) id.forEach(e => this.setup(e, name, [x, y]));
    else $gameScreen.showPicture(id, name, 1, x, y, scaleX, scaleY, 0, 0);
  };

  // reset an image to normal display status
  this.reset = (id, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.reset(e, duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y, _scaleX, _scaleY } = existing;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        $gameScreen.movePicture(id, 1, _x, _y, _scaleX, _scaleY, 255, 0, dur);
        const dimDuration = KD_ImageManager_Params.dimDurationGlobal;
        this.tint(id, [0, 0, 0, 0], dimDuration);
      }
    }
  };

  // hide an image
  this.hide = id => {
    if (Array.isArray(id)) id.forEach(e => this.hide(e));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y, _scaleX, _scaleY } = existing;
        const dur = KD_ImageManager_Params.durationGlobal;
        $gameScreen.movePicture(id, 1, _x, _y, _scaleX, _scaleY, 0, 0, dur);
      }
    }
  };

  // fade in an image
  this.fadeIn = (id, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.fadeIn(e, duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y, _scaleX, _scaleY } = existing;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        $gameScreen.movePicture(id, 1, _x, _y, _scaleX, _scaleY, 255, 0, dur);
      }
    }
  };

  // fade out an image
  this.fadeOut = (id, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.fadeOut(e, duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y, _scaleX, _scaleY } = existing;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        $gameScreen.movePicture(id, 1, _x, _y, _scaleX, _scaleY, 0, 0, dur);
      }
    }
  };

  // fade in and shrink to normal size
  this.zoomIn = (id, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.zoomIn(e, duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _name, _x, _y, _scaleX, _scaleY } = existing;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        this.setup(id, _name, [_x, _y], [_scaleX * 1.2, _scaleY * 1.2]);
        $gameScreen.movePicture(id, 1, _x, _y, _scaleX, _scaleY, 255, 0, dur);
      }
    }
  };

  // fade out and increase size
  this.zoomOut = (id, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.zoomOut(e, duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y, _scaleX, _scaleY } = existing;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        this.show(id);
        $gameScreen.movePicture(id, 1, _x, _y, _scaleX * 2, _scaleY * 2, 0, 0, dur);
      }
    }
  };

  // fade in an image with addictive blend mode
  this.shineIn = (id, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.shineIn(e, duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _name, _x, _y, _scaleX, _scaleY } = existing;
        $gameScreen.showPicture(id, _name, 1, _x, _y, _scaleX, _scaleY, 1, 0);
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        $gameScreen.movePicture(id, 1, _x, _y, _scaleX, _scaleY, 255, 1, dur);
      }
    }
  };

  // mirror an image horizonatally
  this.mirror = id => {
    if (Array.isArray(id)) id.forEach(e => this.mirror(e));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y, _scaleX, _scaleY, _opacity } = existing;
        $gameScreen.movePicture(id, 1, _x, _y, -_scaleX, _scaleY, _opacity, 0, 1);
      }
    }
  };

  // move an image to a certain position
  this.moveTo = (id, [x, y], duration) => {
    if (Array.isArray(id)) id.forEach(e => this.moveTo(e, [x, y], duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _scaleX, _scaleY } = existing;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        $gameScreen.movePicture(id, 1, x, y, _scaleX, _scaleY, 255, 0, dur);
      }
    }
  };

  // move an image by certain offset
  this.moveBy = (id, offset, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.moveBy(e, offset, duration));
    else {
      const [offsetX = 0, offsetY = 0] = offset || [];
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y, _scaleX, _scaleY } = existing;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        $gameScreen.movePicture(id, 1, _x + offsetX, _y + offsetY, _scaleX, _scaleY, 255, 0, dur);
      }
    }
  };

  // move an image to a certain position with fast speed at first and then slow down
  this.dashTo = (id, [x, y], duration) => {
    if (Array.isArray(id)) id.forEach(e => this.dashTo(e, [x, y], duration));
    else {
      const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
      CallPluginCommand(`MovePicture ${id} origin:1 curve:QuartOut x:${x} y:${y} duration:${dur}`);
    }
  };

  // move an image by certain offset with fast speed at first and then slow down
  this.dashBy = (id, offset, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.dashBy(e, offset, duration));
    else {
      const [offsetX = 0, offsetY = 0] = offset || [];
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y } = existing;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        CallPluginCommand(
          `MovePicture ${id} origin:1 curve:QuartOut x:${_x + offsetX} y:${
            _y + offsetY
          } duration:${dur}`,
        );
      }
    }
  };

  // move and fade in an image
  this.slideIn = (id, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.slideIn(e, duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _name, _x, _y, _scaleX, _scaleY } = existing;
        const fromX = _x + (Graphics.width / 2 > _x ? -1 : 1) * KD_ImageManager_Params.offsetGlobal;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        this.setup(id, _name, [fromX, _y]);
        $gameScreen.movePicture(id, 1, _x, _y, _scaleX, _scaleY, 255, 0, dur);
      }
    }
  };

  // move and fade out an image
  this.slideOut = (id, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.slideOut(e, duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y, _scaleX, _scaleY } = existing;
        const toX = _x + (Graphics.width / 2 > _x ? -1 : 1) * KD_ImageManager_Params.offsetGlobal;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        $gameScreen.movePicture(id, 1, toX, _y, _scaleX, _scaleY, 0, 0, dur);
      }
    }
  };

  this.slideTo = (id, [x, y], duration) => {
    if (Array.isArray(id)) id.forEach(e => this.slideTo(e, [x, y], duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _scaleX, _scaleY } = existing;
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        $gameScreen.movePicture(id, 1, x, y, _scaleX, _scaleY, 255, 0, dur);
      }
    }
  };

  // simulate jump action for an image
  this.jump = (id, height, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.jump(e, height, duration));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y } = existing;
        const hei = _.defaultTo(height, KD_ImageManager_Params.offsetGlobal);
        const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
        this.moveTo(id, [_x, _y - hei], dur / 2);
        setTimeout(() => {
          this.moveTo(id, [_x, _y], dur / 2);
        }, dur / 2);
      }
    }
  };

  // simulate shake action for an image
  this.shake = (id, power, off) => {
    if (Array.isArray(id)) id.forEach(e => this.shake(e, power, off));
    CallPluginCommand(`pic_shake : ${id} : ${off ? 'false' : 'true'}${power ? ` : ${power}` : ``}`);
  };

  // simulate tremble on time
  this.tremble = (id, power, speed, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.tremble(e, power, speed, duration));
    else {
      const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal * 5);
      CallPluginCommand(
        `pic_shake : ${id} : true${power ? ` : ${power}` : ``}${speed ? ` : ${speed}` : ``}`,
      );
      setTimeout(() => {
        const existing = $gameScreen.picture(id);
        if (existing) {
          const { _name, _x, _y } = existing;
          this.show(id, _name, [_x, _y]);
        }
      }, dur);
    }
  };

  this.trembleEffect = id => {
    if (Array.isArray(id)) id.forEach(e => this.trembleEffect(e));
    else {
      $imgMgr.fadeIn(id, 5);
      setTimeout(() => {
        $imgMgr.fadeOut(id, 75);
      }, 100);
    }
  };

  this.shakeEffect = id => {
    if (Array.isArray(id)) id.forEach(e => this.shakeEffect(e));
    else {
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _name, _x, _y, _scaleX, _scaleY } = existing;
        $imgMgr.fadeIn(id, 5);
        $imgMgr.shake(id, 5);
        setTimeout(() => {
          $imgMgr.fadeOut(id, 75);
          setTimeout(() => {
            $imgMgr.setup(id, _name, [_x, _y], [_scaleX, _scaleY]);
          }, 1000);
        }, 100);
      }
    }
  };

  // change tone of an image
  this.tint = (id, tone, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.tint(e, tone, duration));
    const dur = _.defaultTo(duration, KD_ImageManager_Params.durationGlobal);
    $gameScreen.tintPicture(id, tone, dur);
  };

  // change tone of an image and then change back
  this.dim = (id, tone, duration) => {
    if (Array.isArray(id)) id.forEach(e => this.dim(e, tone, duration));
    else {
      const dur = _.defaultTo(duration, KD_ImageManager_Params.dimDurationGlobal);
      const dimTone = _.defaultTo(tone, KD_ImageManager_Params.dimToneGlobal);
      this.tint(id, dimTone, dur);
    }
  };

  // play animation on an image
  this.anim = (id, animId, offset) => {
    if (Array.isArray(id)) id.forEach(e => this.anim(e, animId, offset));
    else {
      const [offsetX = 0, offsetY = 0] = offset || [];
      const existing = $gameScreen.picture(id);
      if (existing) {
        const { _x, _y } = existing;
        CallPluginCommand(`PlaceAnim ${animId} ${_x + offsetX} ${_y + offsetY} 0 0`);
      }
    }
  };

  // play animation on an image repeated until image is removed or hided
  this.animLoop = (id, animId, interval, offset) => {
    if (Array.isArray(id)) id.forEach(e => this.animLoop(e, animId, interval, offset));
    else {
      const [offsetX = 0, offsetY = 0] = offset || [];
      const fn = setInterval(() => {
        const existing = $gameScreen.picture(id);
        if (existing && existing._opacity) {
          const { _x, _y } = existing;
          CallPluginCommand(`PlaceAnim ${animId} ${_x + offsetX} ${_y + offsetY} 0 0`);
        } else clearInterval(fn);
      }, interval);
    }
  };
}

const $imgMgr = new KD_ImageManager();
