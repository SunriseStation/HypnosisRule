//=============================================================================
// KD_Effect.js
//=============================================================================

/*:
 * @plugindesc Plugin for collecting and simplifying functions for calling screen effects
 * @author KineticDog
 *
 *
 */
// keeping customized configs
const CONFIG = {
  SHAKE: {},
};
function KD_Effect() {
  //=============================================================================
  // Element level. Only provide basic effect usages
  //=============================================================================
  // se
  this.playSe = (name, params = {}) => {
    AudioManager.playSe({
      name: name,
      volume: 100,
      pitch: 100,
      pan: 0,
      ...params,
    });
  };

  this.playBgm = (name, params = {}) => {
    AudioManager.playBgm({
      name: name,
      volume: 100,
      pitch: 100,
      pan: 0,
      ...params,
    });
  };

  // screen shake
  this.SHAKE = {
    ANGER: 1,
    SHOCK: 2,
    SHAKE: 3,
    QUAKE: 3,
  };
  this.shakeScreen = config => {
    if (_.isNumber(config)) {
      // #TODO: need some real time adjustment to get best value
    } else $gameScreen.startShake(...config);
  };

  this.flashScreen = (duration = 10) => {
    $gameScreen.startFlash([255, 255, 255, 170], duration);
  };

  //=============================================================================
  // Middle Level. Focus on advanced effects and may combine element level
  //=============================================================================

  //=============================================================================
  // High Level. Focus on achieving business logics
  //=============================================================================
}

const $effect = new KD_Effect();
