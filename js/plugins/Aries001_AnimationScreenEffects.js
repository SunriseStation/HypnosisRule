//=============================================================================
// ★ Animation Screen Effects ★                                         1.0.2
//=============================================================================
/*:
 * @plugindesc Additional screen effects in RPG Maker MV.
 * @author Aries
 *
 * @help
 * ----------------------------------------------------------------------------
 * ★ Animation Screen Effects ★                                         1.0.2
 * ----------------------------------------------------------------------------
 * ★ Creating Screen Effects via Events
 * ----------------------------------------------------------------------------
 * Listed below are plugin and script commands to create screen effects.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Plugin: AriesScreenShakeType [Type]
 *  Script: Aries.P001_ASE.setScreenShakeType(Type)
 *
 * Changes the screen shake method in-game.
 *   Types     - "Standard" "Random" "Horizontal" "Vertical"
 *               The plugin command can accept these without the "" marks.
 *               However, the script command requires the "" to be present.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Plugin: AriesBlur [Duration] [Power]
 *  Script: Aries.P001_ASE.blur(Duration, Power)
 *
 * Causes the screen to blur at [Power] intensity for [Duration] frames.
 *   Power     - Number between 0 to 10. Exceeding 10 will be counted as 10.
 *   Duration  - Length of the effect in frames.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Plugin: AriesZoomBlur [Duration] [Power] [X] [Y]
 *  Script: Aries.P001_ASE.zoomBlur(X, Y, Duration, Power)
 *
 * Causes the screen to zoom blur at [X] [Y] coordinates, with [Power] intensity
 * for [Duration] frames.
 *   X, Y      - Coordinates in pixels, where the origin of the effect is.
 *   Power     - Number between 0 to 10. Exceeding 10 will be counted as 10.
 *   Duration  - Length of the effect in frames.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Plugin: AriesGlow [Duration] [Power] [Size] [Threshold]
 *  Script: Aries.P001_ASE.glow(Duration, Power, Size, Threshold)
 *
 * Causes the screen to glow with [Power] intensity, at [Size] and [Threshold],
 * for [Duration] frames.
 *   Power     - Number between 0 to 10. Exceeding 10 will be counted as 10.
 *   Size      - The size of the glow effect. The larger the number, the larger
 *               the glare from bright objects appear.
 *   Threshold - How bright should an object be before it glows.
 *               A number between 0 to 100.
 *   Duration  - Length of the effect in frames.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Plugin: AriesWave [Duration] [Power] [X] [Y]
 *  Script: Aries.P001_ASE.wave(X, Y, Duration, Power)
 *
 * Creates a ripple effect at [X][Y] coordinates, with [Power] intensity
 * and for [Duration] frames.
 *   X, Y      - Coordinates in pixels, where the origin of the effect is.
 *   Power     - Number between 0 to 10. Exceeding 10 will be counted as 10.
 *   Duration  - Length of the effect in frames.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Plugin: AriesDistort [Duration] [Power] [Offset] [Density]
 *  Script: Aries.P001_ASE.distort(Duration, Power, Offset, Density)
 *
 * Creates a screenwide Distortion effect of [Power] intensity, for [Duration]
 * frames. Adding [Offset] creates color channel distortion, and [Density]
 * adjusts the density of the effect.
 *   Duration  - Length of the effect in frames.
 *   Power     - Number between 0 to 10. Exceeding 10 will be counted as 10.
 *   Offset    - RGB Color Fringe offset.
 *   Density   - Density of the Distortion effect (0-10).
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * ★ Creating Screen Effects via Battle Animations
 * ----------------------------------------------------------------------------
 * Required:
 * Prepare sound effect files with the filenames determined in the configuration.
 * Within the Animation Editor, you can then assign these sound effects into
 * the animation's frame timings to invoke the associated screen effects.
 *
 * Adjust the properties of the screen effect via the screen flash section
 * of the frame timing.
 *
 * When a sound effect is associated with a screen effect, the sound and flash
 * will not play in-game. Please set the volume and intensity to 0 to ease in previewing.
 *
 * - Shake
 * Flash:
 * [Red] controls the Power of the screen shake. 255 is equivalent to Power 9.
 * [Green] controls the Speed of the screen shake. 255 is equivalent to Speed 9.
 * [Duration] controls how long the Shake lasts.
 * Note:  Duration is counted in 60 FPS as opposed to the project's defined Animation Rate.
 *
 * - Blur
 * Flash:
 * [Red] controls the Intensity of the blur effect.
 * [Duration] controls how long the blur effect lasts.
 * Note:  Duration is counted in 60 FPS as opposed to the project's defined Animation Rate.
 *
 * - Zoom Blur
 * Flash:
 * [Red] controls the Intensity of the blur effect.
 * [Green] controls the radius of focus - the area that the blur will not affect.
 * [Duration] controls how long the blur effect lasts.
 * Note:  Duration is counted in 60 FPS as opposed to the project's defined Animation Rate.
 *
 * - Glow
 * Flash:
 * [Red] controls the Intensity of the glow effect.
 * [Green] controls the size of the glow.
 * [Blue] controls the glow effect's threshold.
 * [Duration] controls how long the blur effect lasts.
 * Note:  Duration is counted in 60 FPS as opposed to the project's defined Animation Rate.
 *
 * - Wave
 * Flash:
 * [Red] controls the displacement's intensity.
 * [Green] controls the width of the wave.
 * [Duration] controls how long the wave lasts - and how fast the wave expands.
 * Note:  Duration is counted in 60 FPS as opposed to the project's defined Animation Rate.
 *
 * - Distortion
 * Flash:
 * [Red] controls the Intensity of the distortion effect.
 * [Green] controls the density of the effect: the higher this number, the noisier the screen becomes.
 * [Blue] controls the color seperation of the distortion effect.
 * [Duration] controls how long the distortion effect lasts.
 * Note:  Duration is counted in 60 FPS as opposed to the project's defined Animation Rate.
 *
 * ★ Changelog
 * ----------------------------------------------------------------------------
 * ◆ 10 Apr 2019
 * 1.0.1    -    Compatibility edit with Action Sequences
 *          -    Added Glow Effect filter
 *          -    Updated Japanese Language Plugin Help
 * ◆ 18 Mar 2019
 * 1.0.0    -    Release
 *
 * ★ Credits
 * ----------------------------------------------------------------------------
 * Uses filters from the community authored custom display filter collection.
 *  ● https://github.com/pixijs/pixi-filters
 *
 * With help from Olivia. Thank you!
 *  ● https://fallenangelolivia.itch.io/
 *
 * @param Screen Shakes
 * @default
 *
 * @param Sound Effect File Names
 * @default
 *
 * @param Options
 * @default
 *
 * @param Shake Type
 * @parent Screen Shakes
 * @desc Changes the shake method when screen shakes are executed.
 * Valid: Standard Random Horizontal Vertical
 * @default Vertical
 *
 * @param Shake SE
 * @parent Sound Effect File Names
 * @desc Filename for the SE to trigger screen shakes in Animations.
 * Valid: Any file name.
 * @default SSFX_Shake
 *
 * @param Blur SE
 * @parent Sound Effect File Names
 * @desc (Special Effects) Filename for the SE to trigger blurs in Animations.
 * Valid: Any file name.
 * @default SSFX_Blur
 *
 * @param ZoomBlur SE
 * @parent Sound Effect File Names
 * @desc (Special Effects) Filename for the SE to trigger blurs in Animations.
 * Valid: Any file name.
 * @default SSFX_ZoomBlur
 *
 * @param Glow SE
 * @parent Sound Effect File Names
 * @desc (Special Effects) Filename for the SE to trigger glow effects in Animations.
 * Valid: Any file name.
 * @default SSFX_Glow
 *
 * @param Wave SE
 * @parent Sound Effect File Names
 * @desc (Special Effects) Filename for the SE to trigger shockwaves in Animations.
 * Valid: Any file name.
 * @default SSFX_Wave
 *
 * @param Distort SE
 * @parent Sound Effect File Names
 * @desc (Special Effects) Filename for the SE to trigger distortion in Animations.
 * Valid: Any file name.
 * @default SSFX_Distort
 *
 * @param Allow Options
 * @parent Options
 * @type boolean
 * @on On
 * @off Off
 * @desc Allow the toggling of special effects in-game.
 * Valid: true or false
 * @default true
 *
 * @param Options Text Effect Playback
 * @parent Options
 * @desc Text for toggling screen effects.
 * Valid: Any text.
 * @default Screen Effects
 *
 * @param Options Text Effect Power
 * @parent Options
 * @desc Text for adjusting  screen effect power.
 * Valid: Any text.
 * @default Screen Effect Power
 *
 * @param Default Option
 * @parent Options
 * @type boolean
 * @on On
 * @off Off
 * @desc Default setting for whether special effects should play.
 * Valid: true or false
 * @default true
 *
 * @param Default Power
 * @parent Options
 * @type number
 * @min 0
 * @max 100
 * @desc Default setting for the power of all screen effects.
 * Valid: A number between 0 to 100
 * @default 100
 *
 */
/*:ja
 * @plugindesc RPGツクールMV画面効果機能延長
 * @author Aries
 *
 * @help
 * ★ イベントで画面効果を呼び出す
 * ----------------------------------------------------------------------------
 * 下記のプラグインコマンドやスクリプトコールで画面効果を呼び出せます。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  プラグイン: AriesScreenShakeType [Type]
 *  スクリプト: Aries.P001_ASE.setScreenShakeType(Type)
 *
 * インゲーム中でも画面揺れの方向や仕様を変更する。
 * Typeの代わりに、'Standard', 'Random', 'Horizontal', 'Vertical'の４つから選べます。
 *   Types     - 'Standard', 'Random', 'Horizontal', 'Vertical'
 *               プラグインコマンドであれば''マークは書く必要ありませんが、
 *               スクリプトコールで呼び出す際、''を必ず入れてください。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  プラグイン: AriesBlur [Duration] [Power]
 *  スクリプト: Aries.P001_ASE.blur(Duration, Power)
 *
 * 画面全体にブラー効果をつける。[Power]で強さを制御し、[Duration]で時間の制御をする。
 *   Power     - 0-10の数字です。10は最大効果、10以上入力すると10として発生する。
 *   Duration  - 効果の長さです。60fpsで数えていますので、60は1秒です。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  プラグイン: AriesZoomBlur [Duration] [Power] [X] [Y]
 *  スクリプト: Aries.P001_ASE.zoomBlur(Duration, Power, X, Y)
 *
 * 画面全体に放射ブラー効果をつける。
 * [X][Y]で中心を設定し、ブラーと同様、[Power]と[Duration]で強さ、時間を制御する。
 *   X, Y      - 中心の位置です。
 *   Power     - 0-10の数字です。10は最大効果、10以上入力すると10として発生する。
 *   Duration  - 効果の長さです。60fpsで数えていますので、60は1秒です。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  プラグイン: AriesGlow [Duration] [Power] [Size] [Threshold]
 *  スクリプト: Aries.P001_ASE.glow(Duration, Power, Size, Threshold)
 *
 * 画面全体にグロー効果をつける。
 * ピクセルの明度により周囲のピクセルを光らせる効果です。
 *   Power     - 0-10の数字です。10は最大効果、10以上入力すると10として発生する。
 *   Size      - 光らせる範囲を決めることができます。
 *   Threshold - 光らせるピクセルの必要な明度。
 *               0-100の数字です。
 *   Duration  - 効果の長さです。60fpsで数えていますので、60は1秒です。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  プラグイン: AriesWave [Duration] [Power] [X] [Y]
 *  スクリプト: Aries.P001_ASE.wave(Duration, Power, X, Y)
 *
 * 画面歪みでショックウェーブ効果を発動する。
 * 放射ブラーと同様、[X][Y]で中心を設定し、[Power]と[Duration]で強さ、時間を制御する。
 *   X, Y      - 中心の位置です。
 *   Power     - 強さの数字です。ブラー系と異なって上限は設定していません。
 *   Duration  - 効果の長さです。60fpsで数えていますので、60は1秒です。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  プラグイン: AriesDistort [Duration] [Power] [Offset] [Density]
 *  スクリプト: Aries.P001_ASE.distort(Duration, Power, Offset, Density)
 *
 * 画面全体にディストーション効果を発動させます。
 * デジタル損害のような画面効果を発動させます。パラメーターにより、
 * 色分解やノイズの部分を調整可能です。
 *   Duration  - 効果の長さです。60fpsで数えていますので、60は1秒です。
 *   Power     - 0-10の数字です。10は最大効果、10以上入力すると10として発生する。
 *   Offset    - 色分解の強さです。
 *   Density   - 賑やかさ、ノイズの程度です。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * ★ バトルアニメーションで画面効果を呼び出す
 * ----------------------------------------------------------------------------
 * 先に必要:
 * SEファイルをプラグイン設定どおりのファイル名をAudio/SEフォルダーに入れてください。
 *
 * データベースのアニメーションエディターで画面効果を呼び出すため、フレームタイミング
 * にSEをつけします。
 *
 * つけたSEのフレームタイミング内、フラッシュ効果の色パラメーターで
 * 画面効果の設定は可能です。
 *
 * プラグインで登録されたSEはバトルアニメーションで再生しないようになっています。
 * エディター内に、ボリュームを0にするをお勧めします。
 *
 * - 画面揺れ
 * フラッシュの色設定:
 * [赤] の数値で画面揺れの強さを調整する。255はイベントコマンドの9と同じ強さ。
 * [緑] の数値で画面揺れの速さを調整する。255はイベントコマンドの9と同じ強さ。
 * [デュレーション] 画面揺れの長さをちょうせいできます。
 * ※  [デュレーション]は60FPSと考えてフレーム数の数え方です。
 *     プロジェクト設定や他プラグインよりアニメーションレートが違うことがあります。
 *
 * - ブラー
 * フラッシュの色設定:
 * [赤] の数値でブラー効果の強さを調整する
 * [デュレーション]の数値でブラーの長さを調整する
 * ※  [デュレーション]は60FPSと考えてフレーム数の数え方です。
 *     プロジェクト設定や他プラグインよりアニメーションレートが違うことがあります。
 *
 * - 放射ブラー
 * フラッシュの色設定:
 * [赤] の数値で放射ブラー効果の強さを調整する
 * [緑] の数値で放射ブラーのフォールオフ範囲を調整する
 * [デュレーション]の数値で放射ブラーの長さを調整する
 * ※  [デュレーション]は60FPSと考えてフレーム数の数え方です。
 *     プロジェクト設定や他プラグインよりアニメーションレートが異なることがあります。
 *
 * - グロー
 * フラッシュの色設定:
 * [赤] の数値でグロー効果の強さを調整する
 * [緑] の数値でグロー効果の幅を調整する
 * [青] の数値でグロー効果のしきい値を調整する
 * [デュレーション]の数値でグローの長さを調整する
 * ※  [デュレーション]は60FPSと考えてフレーム数の数え方です。
 *     プロジェクト設定や他プラグインよりアニメーションレートが異なることがあります。
 *
 * - ディストーション
 * フラッシュの色設定:
 * [赤] の数値でディストーション効果の強さを調整する
 * [緑] の数値でディストーション効果の散乱度を調整する
 * [青] の数値でディストーション効果の色分解の幅を調整する
 * [デュレーション]の数値でディストーションの長さを調整する
 * ※  [デュレーション]は60FPSと考えてフレーム数の数え方です。
 *     プロジェクト設定や他プラグインよりアニメーションレートが異なることがあります。
 *
 * ★ アップデート歴史
 * ----------------------------------------------------------------------------
 * ◆ 10 Apr 2019
 * 1.0.1    -    Action Sequencesとプラグイン連動調整
 *          -    グロー効果の追加
 *          -    日本語(JA)説明文章の多少修正
 * ◆ 18 Mar 2019
 * 1.0.0    -    リリース
 *
 * ★ クレジット
 * ----------------------------------------------------------------------------
 * コミュニティーフィルターコレクションからのフィルターを使用しています。
 *  ● https://github.com/pixijs/pixi-filters
 *
 * オリビアさんのお手伝いより完成しました。ありがとうございました！
 *  ● https://fallenangelolivia.itch.io/
 *
 * @param Screen Shakes
 * @default
 *
 * @param Sound Effect File Names
 * @default
 *
 * @param Options
 * @default
 *
 * @param Shake Type
 * @parent Screen Shakes
 * @desc 画面揺れの仕様です。 StandardはMVと変わらない画面揺れです。
 * 有効設定: Standard Random Horizontal Vertical
 * @default Vertical
 *
 * @param Shake SE
 * @parent Sound Effect File Names
 * @desc バトルアニメーションで画面揺れを呼び出すためのSEファイル名
 * 有効設定: ファイル名
 * @default SSFX_Shake
 *
 * @param Blur SE
 * @parent Sound Effect File Names
 * @desc バトルアニメーションでブラーを呼び出すためのSEファイル名
 * 有効設定: ファイル名
 * @default SSFX_Blur
 *
 * @param ZoomBlur SE
 * @parent Sound Effect File Names
 * @desc バトルアニメーションで放射ブラーを呼び出すためのSEファイル名
 * 有効設定: ファイル名
 * @default SSFX_ZoomBlur
 *
 * @param Glow SE
 * @parent Sound Effect File Names
 * @desc バトルアニメーションでグロー効果を呼び出すためのSEファイル名
 * 有効設定: ファイル名
 * @default SSFX_Glow
 *
 * @param Wave SE
 * @parent Sound Effect File Names
 * @desc バトルアニメーションでショックウェーブを呼び出すためのSEファイル名
 * 有効設定: ファイル名
 * @default SSFX_Wave
 *
 * @param Distort SE
 * @parent Sound Effect File Names
 * @desc バトルアニメーションでディストーションを呼び出すためのSEファイル名
 * 有効設定: ファイル名
 * @default SSFX_Distort
 *
 * @param Allow Options
 * @parent Options
 * @type boolean
 * @on On
 * @off Off
 * @desc オプションより画面効果の発生を設定可能にする
 * 有効設定: true、 false
 * @default true
 *
 * @param Options Text Effect Playback
 * @parent Options
 * @desc 画面効果設定テキスト
 * 有効設定: テキスト
 * @default Screen Effects
 *
 * @param Options Text Effect Power
 * @parent Options
 * @desc 画面効果の強さ設定テキスト
 * 有効設定: テキスト
 * @default Screen Effect Power
 *
 * @param Default Option
 * @parent Options
 * @type boolean
 * @on On
 * @off Off
 * @desc 画面効果の標準設定
 * 有効設定: true、 false
 * @default true
 *
 * @param Default Power
 * @parent Options
 * @type number
 * @min 0
 * @max 100
 * @desc 画面効果の強さの標準設定
 * Valid: A number between 0 to 100
 * @default 100
 *
 */

// ★ Evaluate Parameters
var Aries = Aries || {};
var Imported = Imported || {};
Aries.P001_ASE = {};
Aries.P001_ASE.Param = PluginManager.parameters(
	'Aries001_AnimationScreenEffects',
);
switch (String(Aries.P001_ASE.Param['Shake Type']).toUpperCase()) {
	case 'STANDARD':
		Aries.P001_ASE.ShakeType = 0;
		break;
	case 'RANDOM':
		Aries.P001_ASE.ShakeType = 1;
		break;
	case 'HORIZONTAL':
		Aries.P001_ASE.ShakeType = 2;
		break;
	case 'VERTICAL':
		Aries.P001_ASE.ShakeType = 3;
		break;
	default:
		Aries.P001_ASE.ShakeType = 1;
		break;
}
Aries.P001_ASE.ShakeSE = String(Aries.P001_ASE.Param['Shake SE']);
Aries.P001_ASE.BlurSE = String(Aries.P001_ASE.Param['Blur SE']);
Aries.P001_ASE.GlowSE = String(Aries.P001_ASE.Param['Glow SE']);
Aries.P001_ASE.ZoomBlurSE = String(Aries.P001_ASE.Param['ZoomBlur SE']);
Aries.P001_ASE.WaveSE = String(Aries.P001_ASE.Param['Wave SE']);
Aries.P001_ASE.DistortSE = String(Aries.P001_ASE.Param['Distort SE']);
Aries.P001_ASE.AllowOptions =
	String(Aries.P001_ASE.Param['Allow Options']) === 'true';
Aries.P001_ASE.OptionsMenuToggleText = String(
	Aries.P001_ASE.Param['Options Text Effect Playback'],
);
Aries.P001_ASE.OptionsMenuIntensityText = String(
	Aries.P001_ASE.Param['Options Text Effect Power'],
);
Aries.P001_ASE.Options = {};
Aries.P001_ASE.Options.PlayScreenEffects = eval(
	Aries.P001_ASE.Param['Default Option'],
);
Aries.P001_ASE.Options.ScreenEffectsIntensity = eval(
	Aries.P001_ASE.Param['Default Power'],
);
var _aries_p001_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	_aries_p001_pluginCommand.call(this, command, args);
	if (command === 'AriesScreenShakeType') {
		switch (args[0].toUpperCase()) {
			case 'STANDARD':
				Aries.P001_ASE.ShakeType = 0;
				break;
			case 'RANDOM':
				Aries.P001_ASE.ShakeType = 1;
				break;
			case 'HORIZONTAL':
				Aries.P001_ASE.ShakeType = 2;
				break;
			case 'VERTICAL':
				Aries.P001_ASE.ShakeType = 3;
				break;
			default:
		}
	} else if (command === 'AriesBlur') {
		Aries.P001_ASE.blur(args[0], args[1]);
	} else if (command === 'AriesZoomBlur') {
		Aries.P001_ASE.zoomBlur(args[0], args[1], args[2], args[3]);
	} else if (command === 'AriesGlow') {
		Aries.P001_ASE.glow(args[0], args[1], args[2], args[3]);
	} else if (command === 'AriesWave') {
		Aries.P001_ASE.wave(args[0], args[1], args[2], args[3]);
	} else if (command === 'AriesDistort') {
		Aries.P001_ASE.distort(args[0], args[1], args[2], args[3]);
	}
};
Aries.P001_ASE.setScreenShakeType = function (type) {
	switch (type.toUpperCase()) {
		case 'STANDARD':
			Aries.P001_ASE.ShakeType = 0;
			break;
		case 'RANDOM':
			Aries.P001_ASE.ShakeType = 1;
			break;
		case 'HORIZONTAL':
			Aries.P001_ASE.ShakeType = 2;
			break;
		case 'VERTICAL':
			Aries.P001_ASE.ShakeType = 3;
			break;
		default:
	}
};
Aries.P001_ASE.blur = function (dur, pwr) {
	if ($gameScreen) {
		$gameScreen.startBlur(0.5 * Math.min(pwr, 10), dur);
	}
};
Aries.P001_ASE.zoomBlur = function (dur, pwr, x, y) {
	if ($gameScreen) {
		$gameScreen.startZBlur(0.1 * Math.min(pwr, 10), dur, 0, new Point(x, y));
	}
};
Aries.P001_ASE.wave = function (dur, pwr, x, y) {
	if ($gameScreen) {
		$gameScreen.startWave(0.1 * pwr, 0.5 + 0.1 * pwr, dur, new Point(x, y));
	}
};
Aries.P001_ASE.distort = function (dur, pwr, off, dens) {
	if ($gameScreen) {
		$gameScreen.startDistortion(
			Math.min(pwr, 10) * 0.75,
			Math.min(dens, 10) * 25.5,
			off,
			dur,
		);
	}
};
Aries.P001_ASE.glow = function (dur, pwr, size, thrs) {
	if ($gameScreen) {
		$gameScreen.startGlow(
			0.1 * Math.min(pwr, 10),
			0.1 * Math.min(size, 10),
			thrs * 0.01,
			dur,
		);
	}
};
ConfigManager.screenEffectsEnabled = Aries.P001_ASE.Options.PlayScreenEffects;
ConfigManager.screenEffectsIntensity =
	Aries.P001_ASE.Options.ScreenEffectsIntensity;
var _aries_p001_configManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
	var config = _aries_p001_configManager_makeData.call(this);
	config.screenEffectsEnabled = this.screenEffectsEnabled;
	config.screenEffectsIntensity = this.screenEffectsIntensity;
	return config;
};
var _aries_p001_configManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
	_aries_p001_configManager_applyData.call(this, config);
	this.screenEffectsEnabled = this.readFlag(config, 'screenEffectsEnabled');
	this.screenEffectsIntensity =
		config.screenEffectsIntensity ||
		Aries.P001_ASE.Options.ScreenEffectsIntensity;
};
var _aries_p001_windowOptions_addGeneralOptions =
	Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
	_aries_p001_windowOptions_addGeneralOptions.call(this);
	if (!Imported.YEP_OptionsCore) {
		if (Aries.P001_ASE.AllowOptions) {
			this.addCommand(
				Aries.P001_ASE.OptionsMenuToggleText,
				'screenEffectsEnabled',
			);
		}
	}
};
var _aries_p001_windowOptions_addVolumeOptions =
	Window_Options.prototype.addVolumeOptions;
Window_Options.prototype.addVolumeOptions = function () {
	if (Aries.P001_ASE.AllowOptions) {
		this.addCommand(
			Aries.P001_ASE.OptionsMenuIntensityText,
			'screenEffectsIntensity',
		);
	}
	_aries_p001_windowOptions_addVolumeOptions.call(this);
};
var _aries_p001_windowOptions_isVolumeSymbol =
	Window_Options.prototype.isVolumeSymbol;
Window_Options.prototype.isVolumeSymbol = function (symbol) {
	if (symbol === 'screenEffectsIntensity') {
		return !0;
	} else {
		return _aries_p001_windowOptions_isVolumeSymbol.call(this, symbol);
	}
};
var _aries_p001_spriteAnimation_processTimingData =
	Sprite_Animation.prototype.processTimingData;
Sprite_Animation.prototype.processTimingData = function (timing) {
	if (
		timing.se != null &&
		timing.se.name.toUpperCase() == Aries.P001_ASE.ShakeSE.toUpperCase()
	) {
		var shakepwr = timing.flashColor[0] * 0.03529411764705882352941176470588;
		var shakespd = timing.flashColor[1] * 0.03529411764705882352941176470588;
		var shakedur = timing.flashDuration;
		$gameScreen.startShake(shakepwr, shakespd, shakedur);
	} else if (
		timing.se != null &&
		timing.se.name.toUpperCase() == Aries.P001_ASE.BlurSE.toUpperCase()
	) {
		var blurpwr = timing.flashColor[0] * 0.01960784313725490196078431372549;
		var blurdur = timing.flashDuration;
		$gameScreen.startBlur(blurpwr, blurdur);
	} else if (
		timing.se != null &&
		timing.se.name.toUpperCase() == Aries.P001_ASE.ZoomBlurSE.toUpperCase()
	) {
		var blurpwr = timing.flashColor[0] * 0.0039215686274509803921568627451;
		var blurNRadius = timing.flashColor[1] * 0.0039215686274509803921568627451;
		var blurdur = timing.flashDuration;
		var origin = new Point(this._target.x, this._target.y);
		$gameScreen.startZBlur(blurpwr, blurdur, blurNRadius, origin);
	} else if (
		timing.se != null &&
		timing.se.name.toUpperCase() == Aries.P001_ASE.GlowSE.toUpperCase()
	) {
		var glowpwr = timing.flashColor[0] * 0.0039215686274509803921568627451;
		var glowsize = timing.flashColor[1] * 0.0039215686274509803921568627451;
		var glowthrs = timing.flashColor[2] * 0.0039215686274509803921568627451;
		var glowdur = timing.flashDuration;
		$gameScreen.startGlow(glowpwr, glowsize, glowthrs, glowdur);
	} else if (
		timing.se != null &&
		timing.se.name.toUpperCase() == Aries.P001_ASE.WaveSE.toUpperCase()
	) {
		var amplitude = timing.flashColor[0] * 0.0039215686274509803921568627451;
		var wavelength = timing.flashColor[1] * 0.0039215686274509803921568627451;
		var duration = timing.flashDuration;
		var origin = new Point(this._target.x, this._target.y);
		$gameScreen.startWave(amplitude, wavelength, duration, origin);
	} else if (
		timing.se != null &&
		timing.se.name.toUpperCase() == Aries.P001_ASE.DistortSE.toUpperCase()
	) {
		var distpower = timing.flashColor[0] * 0.008;
		var distdensity = timing.flashColor[1];
		var distoffset = timing.flashColor[2] * 0.039215686274509803921568627451;
		var duration = timing.flashDuration;
		$gameScreen.startDistortion(distpower, distdensity, distoffset, duration);
	} else {
		_aries_p001_spriteAnimation_processTimingData.call(this, timing);
	}
};
var _aries_p001_gameScreen_clear = Game_Screen.prototype.clear;
Game_Screen.prototype.clear = function () {
	_aries_p001_gameScreen_clear.call(this);
	this.clearEffects();
};
var _aries_p001_gameScreen_onBattleStart = Game_Screen.prototype.onBattleStart;
Game_Screen.prototype.onBattleStart = function () {
	_aries_p001_gameScreen_onBattleStart.call(this);
	this.clearEffects();
};
Game_Screen.prototype.clearEffects = function () {
	this._standardBlurDuration = 0;
	this._standardBlurStrength = 0;
	this._standardBlurDelta = 0;
	this._standardBlurIndefinite = !1;
	this._zoomBlurDuration = 0;
	this._zoomBlurStrength = 0;
	this._zoomBlurDelta = 0;
	this._zoomBlurNRadius = 0;
	this._zoomBlurOrigin = new Point(0, 0);
	this._zoomBlurOffset = new Point(0, 0);
	this._zoomBlurIndefinite = !1;
	this._glowDuration = 0;
	this._glowPower = 0;
	this._glowDelta = 0;
	this._glowSize = 0;
	this._glowThreshold = 0;
	this._shockwaveDuration = 0;
	this._shockwaveInitialDuration = 0;
	this._shockwaveDelta = 0;
	this._shockwaveAmp = 0;
	this._shockwaveLength = 0;
	this._shockwaveOrigin = new Point(0, 0);
	this._distortionPower = 0;
	this._distortionDelta = [0, 0];
	this._distortionDensity = 0;
	this._distortionOffset = 0;
	this._distortionDuration = 0;
	this._distortionInitialDuration = 0;
};
Game_Screen.prototype.blurDuration = function () {
	return this._standardBlurDuration;
};
Game_Screen.prototype.blurStrength = function () {
	return this._standardBlurStrength;
};
Game_Screen.prototype.zblurDuration = function () {
	return this._zoomBlurDuration;
};
Game_Screen.prototype.zblurStrength = function () {
	return this._zoomBlurStrength;
};
Game_Screen.prototype.zblurOrigin = function () {
	return this._zoomBlurOrigin;
};
Game_Screen.prototype.zblurNRadius = function () {
	return this._zoomBlurNRadius;
};
Game_Screen.prototype.glowDuration = function () {
	return this._glowDuration;
};
Game_Screen.prototype.glowPower = function () {
	return this._glowPower;
};
Game_Screen.prototype.glowSize = function () {
	return this._glowSize;
};
Game_Screen.prototype.glowThreshold = function () {
	return this._glowThreshold;
};
Game_Screen.prototype.waveDuration = function () {
	return this._shockwaveDuration;
};
Game_Screen.prototype.waveTime = function () {
	return (
		1.5 *
		(1 -
			(this._shockwaveDuration / Math.max(this._shockwaveInitialDuration, 1)) **
				2)
	);
};
Game_Screen.prototype.waveData = function () {
	return [200 * this._shockwaveAmp, 200 * this._shockwaveLength];
};
Game_Screen.prototype.waveOrigin = function () {
	return this._shockwaveOrigin;
};
Game_Screen.prototype.distPower = function () {
	return this._distortionPower;
};
Game_Screen.prototype.distOffset = function () {
	return this._distortionOffset;
};
Game_Screen.prototype.distDensity = function () {
	return this._distortionDensity;
};
Game_Screen.prototype.distDuration = function () {
	return this._distortionDuration;
};
Game_Screen.prototype.screenEffectsIntensity = function () {
	return 0.01 * ConfigManager.screenEffectsIntensity;
};
var _aries_p001_gameScreen_clearShake = Game_Screen.prototype.clearShake;
Game_Screen.prototype.clearShake = function () {
	_aries_p001_gameScreen_clearShake.call(this);
	this._shakeVector = new Point(0, 0);
};
var _aries_p001_gameScreen_startShake = Game_Screen.prototype.startShake;
Game_Screen.prototype.startShake = function (power, speed, duration) {
	_aries_p001_gameScreen_startShake.call(this, power, speed, duration);
	this._shakeVector = new Point(0, 0);
};
Game_Screen.prototype.startBlur = function (power, duration) {
	this._standardBlurDuration = duration;
	this._standardBlurStrength = power * this.screenEffectsIntensity();
	this._standardBlurDelta = this._standardBlurStrength / duration;
};
Game_Screen.prototype.startZBlur = function (power, duration, nradius, origin) {
	this._zoomBlurDuration = duration;
	this._zoomBlurStrength = power * this.screenEffectsIntensity();
	this._zoomBlurDelta = this._zoomBlurStrength / duration;
	this._zoomBlurNRadius = nradius;
	this._zoomBlurOrigin = origin;
};
Game_Screen.prototype.startGlow = function (power, size, threshold, duration) {
	this._glowDuration = duration;
	this._glowPower = power * this.screenEffectsIntensity();
	this._glowDelta = this._glowPower / duration;
	this._glowSize = size;
	this._glowThreshold = threshold;
};
Game_Screen.prototype.startWave = function (
	amplitude,
	wavelength,
	duration,
	origin,
) {
	this._shockwaveDuration = duration;
	this._shockwaveInitialDuration = duration;
	this._shockwaveAmp = amplitude * this.screenEffectsIntensity();
	this._shockwaveDelta = this._shockwaveAmp / duration;
	this._shockwaveLength = wavelength;
	this._shockwaveOrigin = origin;
};
Game_Screen.prototype.startDistortion = function (
	power,
	density,
	offset,
	duration,
) {
	this._distortionPower = power * this.screenEffectsIntensity();
	this._distortionDensity = density;
	this._distortionOffset = offset;
	this._distortionOffsetChannels = [
		Math.randomInt(offset) - Math.randomInt(offset),
		Math.randomInt(offset) - Math.randomInt(offset),
		Math.randomInt(offset) - Math.randomInt(offset),
	];
	this._distortionDuration = duration;
	this._distortionDelta = [this._distortionPower / duration, offset / duration];
	this._distortionInitialDuration = duration;
};
Game_Screen.prototype.shakeVector = function () {
	return this._shakeVector;
};
var _aries_p001_gameScreen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function () {
	_aries_p001_gameScreen_update.call(this);
	if (ConfigManager.screenEffectsEnabled) {
		this.updateEffects();
	}
};
var _aries_p001_gameScreen_updateShake = Game_Screen.prototype.updateShake;
Game_Screen.prototype.updateShake = function () {
	switch (Aries.P001_ASE.ShakeType) {
		case 0:
			_aries_p001_gameScreen_updateShake.call(this);
			break;
		case 1:
			this.updateShakeRandom();
			break;
		case 2:
			this.updateShakeOscillate(1, 0);
			break;
		case 3:
			this.updateShakeOscillate(0, 1);
			break;
		default:
			_aries_p001_gameScreen_updateShake.call(this);
	}
};
Game_Screen.prototype.updateEffects = function () {
	if (this._standardBlurDuration > 0) {
		this._standardBlurStrength -= this._standardBlurDelta;
		this._standardBlurDuration--;
	} else {
		this._standardBlurStrength = 0;
	}
	if (this._zoomBlurDuration > 0) {
		this._zoomBlurStrength -= this._zoomBlurDelta;
		this._zoomBlurDuration--;
	} else {
		this._zoomBlurStrength = 0;
	}
	if (this._glowDuration > 0) {
		this._glowPower -= this._glowDelta;
		this._glowDuration--;
	} else {
		this._glowPower = 0;
	}
	if (this._shockwaveDuration > 0) {
		this._shockwaveAmp -= this._shockwaveDelta;
		this._shockwaveDuration--;
	} else {
		this._shockwaveAmp = 0;
	}
	if (this._distortionDuration > 0) {
		this._distortionDuration--;
		this._distortionPower -= this._distortionDelta[0];
		this._distortionOffset -= this._distortionDelta[1];
	} else {
		this._distortionPower = 0;
		this._distortionOffset = 0;
	}
};
Game_Screen.prototype.updateShakeRandom = function () {
	if (this._shakeDuration > 0 || this._shake !== 0) {
		var shakeX =
			(Math.randomInt(this._shakePower) - Math.randomInt(this._shakePower)) *
			(Math.min(this._shakeDuration, 30) * 0.5);
		var shakeY =
			(Math.randomInt(this._shakePower) - Math.randomInt(this._shakePower)) *
			(Math.min(this._shakeDuration, 30) * 0.5);
		var delta =
			(this._shakePower * this._shakeSpeed * this._shakeDirection) /
			(11 - this._shakeSpeed);
		if (this._shakeDuration <= 1) {
			this._shake = 0;
			this._shakeVector.x = 0;
			this._shakeVector.y = 0;
		} else {
			this._shake = 0;
			this._shakeVector.x = shakeX;
			this._shakeVector.y = shakeY;
		}
		this._shakeDuration--;
	}
};
Game_Screen.prototype.updateShakeOscillate = function (h, v) {
	if (this._shakeDuration > 0 || this._shake !== 0) {
		var delta =
			(this._shakePower * (2 * this._shakeSpeed) * this._shakeDirection) / 5;
		if (this._shakeDuration <= 1 && this._shake * (this._shake + delta) < 0) {
			this._shake = 0;
		} else {
			this._shake += delta;
		}
		if (this._shake > this._shakePower * 2) {
			this._shakeDirection = -1;
		}
		if (this._shake < -this._shakePower * 2) {
			this._shakeDirection = 1;
		}
		this._shakePower *= 0.9;
		this._shakeDuration--;
	}
};
var _aries_p001_spritesetBase_initialize = Spriteset_Base.prototype.initialize;
Spriteset_Base.prototype.initialize = function () {
	_aries_p001_spritesetBase_initialize.call(this);
	this.createScreenEffectFilters();
};
Spriteset_Base.prototype.createScreenEffectFilters = function () {
	this._filters = this._filters || [];
	this._ase_blur_filter = new PIXI.filters.BlurFilter();
	this._ase_blur_filter.blur = 0;
	this._filters.push(this._ase_blur_filter);
	this._ase_zblur_filter = new PIXI.filters.ZoomBlurFilter();
	this._ase_zblur_filter.center = new Point(
		Graphics.boxWidth / 2,
		Graphics.boxHeight / 2,
	);
	this._ase_zblur_filter.strength = 0;
	this._filters.push(this._ase_zblur_filter);
	this._ase_glow_filter = new PIXI.filters.AdvancedBloomFilter();
	this._ase_glow_filter.bloomScale = 0;
	this._ase_glow_filter.blur = 0;
	this._ase_glow_filter.threshold = 1;
	this._filters.push(this._ase_glow_filter);
	this._ase_wave_filter = new PIXI.filters.ShockwaveFilter();
	this._ase_wave_filter.center = new Point(0.5, 0.5);
	this._ase_wave_filter.amplitude = 0;
	this._ase_wave_filter.brightness = 1.1;
	this._ase_wave_filter.time = 0;
	this._filters.push(this._ase_wave_filter);
	this._ase_dist_filter = new PIXI.filters.GlitchFilter();
	this._ase_dist_filter.enabled = !1;
	this._ase_dist_filter.fillmode = 2;
	this._ase_dist_filter.average = !0;
	this._ase_dist_filter.slices = 2;
	this._ase_dist_filter.offset = 0;
	this._filters.push(this._ase_dist_filter);
};
var _aries_p001_spritesetBase_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function () {
	_aries_p001_spritesetBase_update.call(this);
	if (ConfigManager.screenEffectsEnabled) {
		this.updateScreenEffects();
	}
};
var _aries_p001_spritesetBase_updatePositon =
	Spriteset_Base.prototype.updatePosition;
Spriteset_Base.prototype.updatePosition = function () {
	_aries_p001_spritesetBase_updatePositon.call(this);
	this.x -= Math.round($gameScreen.shake());
	switch (Aries.P001_ASE.ShakeType) {
		case 0:
			this.x += Math.round($gameScreen.shake());
			break;
		case 1:
			this.x += Math.round($gameScreen._shakeVector.x);
			this.y += Math.round($gameScreen._shakeVector.y);
			break;
		case 2:
			this.x += Math.round(2 * $gameScreen.shake());
			break;
		case 3:
			this.y += Math.round(2 * $gameScreen.shake());
			break;
		default:
			this.x += Math.round($gameScreen.shake());
	}
};
Spriteset_Base.prototype.updateScreenEffects = function () {
	var screen = $gameScreen;
	if (this._ase_blur_filter && screen.blurStrength() > 0) {
		this._ase_blur_filter.enabled = !0;
		this._ase_blur_filter.blur = 4 * screen.blurStrength();
	} else {
		if (this._ase_blur_filter) {
			this._ase_blur_filter.enabled = !1;
			this._ase_blur_filter.blur = 0;
		}
	}
	if (this._ase_zblur_filter && screen.zblurStrength() > 0) {
		this._ase_zblur_filter.enabled = !0;
		this._ase_zblur_filter.strength = screen.zblurStrength() * 0.5;
		this._ase_zblur_filter.center = screen.zblurOrigin();
		this._ase_zblur_filter.innerRadius = screen.zblurNRadius();
	} else {
		if (this._ase_zblur_filter) {
			this._ase_zblur_filter.enabled = !1;
			this._ase_zblur_filter.strength = 0;
		}
	}
	if (this._ase_glow_filter && screen.glowPower() > 0) {
		this._ase_glow_filter.enabled = !0;
		this._ase_glow_filter.bloomScale = 10 * screen.glowPower();
		this._ase_glow_filter.brightness = 1 + 0.3 * screen.glowPower();
		this._ase_glow_filter.blur = 10 * screen.glowSize();
		this._ase_glow_filter.threshold = screen.glowThreshold();
	} else {
		if (this._ase_glow_filter) {
			this._ase_glow_filter.enabled = !1;
			this._ase_glow_filter.bloomScale = 0;
			this._ase_glow_filter.blur = 0;
			this._ase_glow_filter.threshold = 1;
		}
	}
	if (this._ase_wave_filter && screen.waveData()[0] > 0) {
		this._ase_wave_filter.enabled = !0;
		this._ase_wave_filter.amplitude = screen.waveData()[0];
		this._ase_wave_filter.wavelength = screen.waveData()[1];
		this._ase_wave_filter.time = screen.waveTime();
		this._ase_wave_filter.center = [
			screen.waveOrigin().x,
			screen.waveOrigin().y,
		];
	} else {
		if (this._ase_wave_filter) {
			this._ase_wave_filter.enabled = !1;
			this._ase_wave_filter.amplitude = 0;
		}
	}
	if (this._ase_dist_filter && screen.distDuration() > 0) {
		this._ase_dist_filter.enabled = !0;
		this._ase_dist_filter.slices = 2 * screen.distDensity();
		this._ase_dist_filter.offset = 30 * screen.distPower();
		this._ase_dist_filter.red = [
			1 + screen.distOffset() + 2 * Math.randomInt(screen.distOffset()),
			0,
		];
		this._ase_dist_filter.green = [
			1 + screen.distOffset() + 2 * Math.randomInt(screen.distOffset()),
			0,
		];
		this._ase_dist_filter.blue = [
			1 + screen.distOffset() + 2 * Math.randomInt(screen.distOffset()),
			0,
		];
		this._ase_dist_filter.refresh();
	} else {
		if (this._ase_dist_filter) {
			this._ase_dist_filter.enabled = !1;
		}
	}
};
var __filters = (function (e, t) {
	'use strict';
	var n =
			'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}',
		r =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n',
		o = (function (e) {
			function t(t) {
				e.call(this, n, r),
					Object.assign(
						this,
						{
							gamma: 1,
							saturation: 1,
							contrast: 1,
							brightness: 1,
							red: 1,
							green: 1,
							blue: 1,
							alpha: 1,
						},
						t,
					);
			}
			return (
				e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t),
				(t.prototype.apply = function (e, t, n, r) {
					(this.uniforms.gamma = Math.max(this.gamma, 1e-4)),
						(this.uniforms.saturation = this.saturation),
						(this.uniforms.contrast = this.contrast),
						(this.uniforms.brightness = this.brightness),
						(this.uniforms.red = this.red),
						(this.uniforms.green = this.green),
						(this.uniforms.blue = this.blue),
						(this.uniforms.alpha = this.alpha),
						e.applyFilter(this, t, n, r);
				}),
				t
			);
		})(t.Filter),
		i = n,
		l =
			'\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}',
		s =
			'\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n',
		a = (function (e) {
			function n(n, r, o) {
				void 0 === n && (n = 4),
					void 0 === r && (r = 3),
					void 0 === o && (o = !1),
					e.call(this, i, o ? s : l),
					(this.uniforms.uOffset = new Float32Array(2)),
					(this._pixelSize = new t.Point()),
					(this.pixelSize = 1),
					(this._clamp = o),
					(this._kernels = null),
					Array.isArray(n)
						? (this.kernels = n)
						: ((this._blur = n), (this.quality = r));
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				kernels: { configurable: !0 },
				clamp: { configurable: !0 },
				pixelSize: { configurable: !0 },
				quality: { configurable: !0 },
				blur: { configurable: !0 },
			};
			return (
				(n.prototype.apply = function (e, t, n, r) {
					var o,
						i = this.pixelSize.x / t.size.width,
						l = this.pixelSize.y / t.size.height;
					if (1 === this._quality || 0 === this._blur)
						(o = this._kernels[0] + 0.5),
							(this.uniforms.uOffset[0] = o * i),
							(this.uniforms.uOffset[1] = o * l),
							e.applyFilter(this, t, n, r);
					else {
						for (
							var s,
								a = e.getRenderTarget(!0),
								u = t,
								c = a,
								f = this._quality - 1,
								h = 0;
							h < f;
							h++
						)
							(o = this._kernels[h] + 0.5),
								(this.uniforms.uOffset[0] = o * i),
								(this.uniforms.uOffset[1] = o * l),
								e.applyFilter(this, u, c, !0),
								(s = u),
								(u = c),
								(c = s);
						(o = this._kernels[f] + 0.5),
							(this.uniforms.uOffset[0] = o * i),
							(this.uniforms.uOffset[1] = o * l),
							e.applyFilter(this, u, n, r),
							e.returnRenderTarget(a);
					}
				}),
				(n.prototype._generateKernels = function () {
					var e = this._blur,
						t = this._quality,
						n = [e];
					if (e > 0)
						for (var r = e, o = e / t, i = 1; i < t; i++) (r -= o), n.push(r);
					this._kernels = n;
				}),
				(r.kernels.get = function () {
					return this._kernels;
				}),
				(r.kernels.set = function (e) {
					Array.isArray(e) && e.length > 0
						? ((this._kernels = e),
						  (this._quality = e.length),
						  (this._blur = Math.max.apply(Math, e)))
						: ((this._kernels = [0]), (this._quality = 1));
				}),
				(r.clamp.get = function () {
					return this._clamp;
				}),
				(r.pixelSize.set = function (e) {
					'number' == typeof e
						? ((this._pixelSize.x = e), (this._pixelSize.y = e))
						: Array.isArray(e)
						? ((this._pixelSize.x = e[0]), (this._pixelSize.y = e[1]))
						: e instanceof t.Point
						? ((this._pixelSize.x = e.x), (this._pixelSize.y = e.y))
						: ((this._pixelSize.x = 1), (this._pixelSize.y = 1));
				}),
				(r.pixelSize.get = function () {
					return this._pixelSize;
				}),
				(r.quality.get = function () {
					return this._quality;
				}),
				(r.quality.set = function (e) {
					(this._quality = Math.max(1, Math.round(e))), this._generateKernels();
				}),
				(r.blur.get = function () {
					return this._blur;
				}),
				(r.blur.set = function (e) {
					(this._blur = e), this._generateKernels();
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		u = n,
		c =
			"\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n",
		f = (function (e) {
			function t(t) {
				void 0 === t && (t = 0.5), e.call(this, u, c), (this.threshold = t);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = { threshold: { configurable: !0 } };
			return (
				(n.threshold.get = function () {
					return this.uniforms.threshold;
				}),
				(n.threshold.set = function (e) {
					this.uniforms.threshold = e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		h =
			'uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n',
		p = (function (e) {
			function n(n) {
				e.call(this, u, h),
					'number' == typeof n && (n = { threshold: n }),
					(n = Object.assign(
						{
							threshold: 0.5,
							bloomScale: 1,
							brightness: 1,
							kernels: null,
							blur: 8,
							quality: 4,
							pixelSize: 1,
							resolution: t.settings.RESOLUTION,
						},
						n,
					)),
					(this.bloomScale = n.bloomScale),
					(this.brightness = n.brightness);
				var r = n.kernels,
					o = n.blur,
					i = n.quality,
					l = n.pixelSize,
					s = n.resolution;
				(this._extractFilter = new f(n.threshold)),
					(this._extractFilter.resolution = s),
					(this._blurFilter = r ? new a(r) : new a(o, i)),
					(this.pixelSize = l),
					(this.resolution = s);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				resolution: { configurable: !0 },
				threshold: { configurable: !0 },
				kernels: { configurable: !0 },
				blur: { configurable: !0 },
				quality: { configurable: !0 },
				pixelSize: { configurable: !0 },
			};
			return (
				(n.prototype.apply = function (e, t, n, r, o) {
					var i = e.getRenderTarget(!0);
					this._extractFilter.apply(e, t, i, !0, o);
					var l = e.getRenderTarget(!0);
					this._blurFilter.apply(e, i, l, !0, o),
						(this.uniforms.bloomScale = this.bloomScale),
						(this.uniforms.brightness = this.brightness),
						(this.uniforms.bloomTexture = l),
						e.applyFilter(this, t, n, r),
						e.returnRenderTarget(l),
						e.returnRenderTarget(i);
				}),
				(r.resolution.get = function () {
					return this._resolution;
				}),
				(r.resolution.set = function (e) {
					(this._resolution = e),
						this._extractFilter && (this._extractFilter.resolution = e),
						this._blurFilter && (this._blurFilter.resolution = e);
				}),
				(r.threshold.get = function () {
					return this._extractFilter.threshold;
				}),
				(r.threshold.set = function (e) {
					this._extractFilter.threshold = e;
				}),
				(r.kernels.get = function () {
					return this._blurFilter.kernels;
				}),
				(r.kernels.set = function (e) {
					this._blurFilter.kernels = e;
				}),
				(r.blur.get = function () {
					return this._blurFilter.blur;
				}),
				(r.blur.set = function (e) {
					this._blurFilter.blur = e;
				}),
				(r.quality.get = function () {
					return this._blurFilter.quality;
				}),
				(r.quality.set = function (e) {
					this._blurFilter.quality = e;
				}),
				(r.pixelSize.get = function () {
					return this._blurFilter.pixelSize;
				}),
				(r.pixelSize.set = function (e) {
					this._blurFilter.pixelSize = e;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		d = n,
		m =
			'varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}',
		g = (function (e) {
			function t(t) {
				void 0 === t && (t = 8), e.call(this, d, m), (this.size = t);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = { size: { configurable: !0 } };
			return (
				(n.size.get = function () {
					return this.uniforms.pixelSize;
				}),
				(n.size.set = function (e) {
					this.uniforms.pixelSize = e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		v = n,
		x =
			'precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n',
		y = (function (e) {
			function n(t) {
				void 0 === t && (t = {}),
					e.call(this, v, x),
					(this.uniforms.lightColor = new Float32Array(3)),
					(this.uniforms.shadowColor = new Float32Array(3)),
					(t = Object.assign(
						{
							rotation: 45,
							thickness: 2,
							lightColor: 16777215,
							lightAlpha: 0.7,
							shadowColor: 0,
							shadowAlpha: 0.7,
						},
						t,
					)),
					(this.rotation = t.rotation),
					(this.thickness = t.thickness),
					(this.lightColor = t.lightColor),
					(this.lightAlpha = t.lightAlpha),
					(this.shadowColor = t.shadowColor),
					(this.shadowAlpha = t.shadowAlpha);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				rotation: { configurable: !0 },
				thickness: { configurable: !0 },
				lightColor: { configurable: !0 },
				lightAlpha: { configurable: !0 },
				shadowColor: { configurable: !0 },
				shadowAlpha: { configurable: !0 },
			};
			return (
				(n.prototype._updateTransform = function () {
					(this.uniforms.transformX = this._thickness * Math.cos(this._angle)),
						(this.uniforms.transformY =
							this._thickness * Math.sin(this._angle));
				}),
				(r.rotation.get = function () {
					return this._angle / t.DEG_TO_RAD;
				}),
				(r.rotation.set = function (e) {
					(this._angle = e * t.DEG_TO_RAD), this._updateTransform();
				}),
				(r.thickness.get = function () {
					return this._thickness;
				}),
				(r.thickness.set = function (e) {
					(this._thickness = e), this._updateTransform();
				}),
				(r.lightColor.get = function () {
					return t.utils.rgb2hex(this.uniforms.lightColor);
				}),
				(r.lightColor.set = function (e) {
					t.utils.hex2rgb(e, this.uniforms.lightColor);
				}),
				(r.lightAlpha.get = function () {
					return this.uniforms.lightAlpha;
				}),
				(r.lightAlpha.set = function (e) {
					this.uniforms.lightAlpha = e;
				}),
				(r.shadowColor.get = function () {
					return t.utils.rgb2hex(this.uniforms.shadowColor);
				}),
				(r.shadowColor.set = function (e) {
					t.utils.hex2rgb(e, this.uniforms.shadowColor);
				}),
				(r.shadowAlpha.get = function () {
					return this.uniforms.shadowAlpha;
				}),
				(r.shadowAlpha.set = function (e) {
					this.uniforms.shadowAlpha = e;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		b = t.filters,
		_ = b.BlurXFilter,
		C = b.BlurYFilter,
		S = b.AlphaFilter,
		F = (function (e) {
			function n(n, r, o, i) {
				var l, s;
				void 0 === n && (n = 2),
					void 0 === r && (r = 4),
					void 0 === o && (o = t.settings.RESOLUTION),
					void 0 === i && (i = 5),
					e.call(this),
					'number' == typeof n
						? ((l = n), (s = n))
						: n instanceof t.Point
						? ((l = n.x), (s = n.y))
						: Array.isArray(n) && ((l = n[0]), (s = n[1])),
					(this.blurXFilter = new _(l, r, o, i)),
					(this.blurYFilter = new C(s, r, o, i)),
					(this.blurYFilter.blendMode = t.BLEND_MODES.SCREEN),
					(this.defaultFilter = new S());
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				blur: { configurable: !0 },
				blurX: { configurable: !0 },
				blurY: { configurable: !0 },
			};
			return (
				(n.prototype.apply = function (e, t, n) {
					var r = e.getRenderTarget(!0);
					this.defaultFilter.apply(e, t, n),
						this.blurXFilter.apply(e, t, r),
						this.blurYFilter.apply(e, r, n),
						e.returnRenderTarget(r);
				}),
				(r.blur.get = function () {
					return this.blurXFilter.blur;
				}),
				(r.blur.set = function (e) {
					this.blurXFilter.blur = this.blurYFilter.blur = e;
				}),
				(r.blurX.get = function () {
					return this.blurXFilter.blur;
				}),
				(r.blurX.set = function (e) {
					this.blurXFilter.blur = e;
				}),
				(r.blurY.get = function () {
					return this.blurYFilter.blur;
				}),
				(r.blurY.set = function (e) {
					this.blurYFilter.blur = e;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		z = n,
		A =
			'uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n',
		w = (function (e) {
			function t(t, n, r) {
				e.call(this, z, A),
					(this.uniforms.dimensions = new Float32Array(2)),
					(this.center = t || [0.5, 0.5]),
					(this.radius = 'number' == typeof n ? n : 100),
					(this.strength = 'number' == typeof r ? r : 1);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				radius: { configurable: !0 },
				strength: { configurable: !0 },
				center: { configurable: !0 },
			};
			return (
				(t.prototype.apply = function (e, t, n, r) {
					(this.uniforms.dimensions[0] = t.sourceFrame.width),
						(this.uniforms.dimensions[1] = t.sourceFrame.height),
						e.applyFilter(this, t, n, r);
				}),
				(n.radius.get = function () {
					return this.uniforms.radius;
				}),
				(n.radius.set = function (e) {
					this.uniforms.radius = e;
				}),
				(n.strength.get = function () {
					return this.uniforms.strength;
				}),
				(n.strength.set = function (e) {
					this.uniforms.strength = e;
				}),
				(n.center.get = function () {
					return this.uniforms.center;
				}),
				(n.center.set = function (e) {
					this.uniforms.center = e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		T = n,
		D =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}',
		O = (function (e) {
			function n(t, n, r) {
				void 0 === n && (n = !1),
					void 0 === r && (r = 1),
					e.call(this, T, D),
					(this._size = 0),
					(this._sliceSize = 0),
					(this._slicePixelSize = 0),
					(this._sliceInnerSize = 0),
					(this._scaleMode = null),
					(this._nearest = !1),
					(this.nearest = n),
					(this.mix = r),
					(this.colorMap = t);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				colorSize: { configurable: !0 },
				colorMap: { configurable: !0 },
				nearest: { configurable: !0 },
			};
			return (
				(n.prototype.apply = function (e, t, n, r) {
					(this.uniforms._mix = this.mix), e.applyFilter(this, t, n, r);
				}),
				(r.colorSize.get = function () {
					return this._size;
				}),
				(r.colorMap.get = function () {
					return this._colorMap;
				}),
				(r.colorMap.set = function (e) {
					e instanceof t.Texture || (e = t.Texture.from(e)),
						e &&
							e.baseTexture &&
							((e.baseTexture.scaleMode = this._scaleMode),
							(e.baseTexture.mipmap = !1),
							(this._size = e.height),
							(this._sliceSize = 1 / this._size),
							(this._slicePixelSize = this._sliceSize / this._size),
							(this._sliceInnerSize = this._slicePixelSize * (this._size - 1)),
							(this.uniforms._size = this._size),
							(this.uniforms._sliceSize = this._sliceSize),
							(this.uniforms._slicePixelSize = this._slicePixelSize),
							(this.uniforms._sliceInnerSize = this._sliceInnerSize),
							(this.uniforms.colorMap = e)),
						(this._colorMap = e);
				}),
				(r.nearest.get = function () {
					return this._nearest;
				}),
				(r.nearest.set = function (e) {
					(this._nearest = e),
						(this._scaleMode = e
							? t.SCALE_MODES.NEAREST
							: t.SCALE_MODES.LINEAR);
					var n = this._colorMap;
					n &&
						n.baseTexture &&
						((n.baseTexture._glTextures = {}),
						(n.baseTexture.scaleMode = this._scaleMode),
						(n.baseTexture.mipmap = !1),
						n._updateID++,
						n.baseTexture.emit('update', n.baseTexture));
				}),
				(n.prototype.updateColorMap = function () {
					var e = this._colorMap;
					e &&
						e.baseTexture &&
						(e._updateID++,
						e.baseTexture.emit('update', e.baseTexture),
						(this.colorMap = e));
				}),
				(n.prototype.destroy = function (t) {
					this._colorMap && this._colorMap.destroy(t),
						e.prototype.destroy.call(this);
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		P = n,
		M =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n',
		R = (function (e) {
			function n(t, n, r) {
				void 0 === t && (t = 16711680),
					void 0 === n && (n = 0),
					void 0 === r && (r = 0.4),
					e.call(this, P, M),
					(this.uniforms.originalColor = new Float32Array(3)),
					(this.uniforms.newColor = new Float32Array(3)),
					(this.originalColor = t),
					(this.newColor = n),
					(this.epsilon = r);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				originalColor: { configurable: !0 },
				newColor: { configurable: !0 },
				epsilon: { configurable: !0 },
			};
			return (
				(r.originalColor.set = function (e) {
					var n = this.uniforms.originalColor;
					'number' == typeof e
						? (t.utils.hex2rgb(e, n), (this._originalColor = e))
						: ((n[0] = e[0]),
						  (n[1] = e[1]),
						  (n[2] = e[2]),
						  (this._originalColor = t.utils.rgb2hex(n)));
				}),
				(r.originalColor.get = function () {
					return this._originalColor;
				}),
				(r.newColor.set = function (e) {
					var n = this.uniforms.newColor;
					'number' == typeof e
						? (t.utils.hex2rgb(e, n), (this._newColor = e))
						: ((n[0] = e[0]),
						  (n[1] = e[1]),
						  (n[2] = e[2]),
						  (this._newColor = t.utils.rgb2hex(n)));
				}),
				(r.newColor.get = function () {
					return this._newColor;
				}),
				(r.epsilon.set = function (e) {
					this.uniforms.epsilon = e;
				}),
				(r.epsilon.get = function () {
					return this.uniforms.epsilon;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		j = n,
		L =
			'precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n',
		k = (function (e) {
			function t(t, n, r) {
				void 0 === n && (n = 200),
					void 0 === r && (r = 200),
					e.call(this, j, L),
					(this.uniforms.texelSize = new Float32Array(2)),
					(this.uniforms.matrix = new Float32Array(9)),
					void 0 !== t && (this.matrix = t),
					(this.width = n),
					(this.height = r);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				matrix: { configurable: !0 },
				width: { configurable: !0 },
				height: { configurable: !0 },
			};
			return (
				(n.matrix.get = function () {
					return this.uniforms.matrix;
				}),
				(n.matrix.set = function (e) {
					var t = this;
					e.forEach(function (e, n) {
						return (t.uniforms.matrix[n] = e);
					});
				}),
				(n.width.get = function () {
					return 1 / this.uniforms.texelSize[0];
				}),
				(n.width.set = function (e) {
					this.uniforms.texelSize[0] = 1 / e;
				}),
				(n.height.get = function () {
					return 1 / this.uniforms.texelSize[1];
				}),
				(n.height.set = function (e) {
					this.uniforms.texelSize[1] = 1 / e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		I = n,
		E =
			'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n',
		B = (function (e) {
			function t() {
				e.call(this, I, E);
			}
			return (
				e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t),
				t
			);
		})(t.Filter),
		X = n,
		q =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    vec2 dir = vec2(coord - vec2(0.5, 0.5));\n\n    float _c = curvature > 0. ? curvature : 1.;\n    float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n    vec2 uv = dir * k;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0) {\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n',
		N = (function (e) {
			function t(t) {
				e.call(this, X, q),
					(this.uniforms.dimensions = new Float32Array(2)),
					(this.time = 0),
					(this.seed = 0),
					Object.assign(
						this,
						{
							curvature: 1,
							lineWidth: 1,
							lineContrast: 0.25,
							verticalLine: !1,
							noise: 0,
							noiseSize: 1,
							seed: 0,
							vignetting: 0.3,
							vignettingAlpha: 1,
							vignettingBlur: 0.3,
							time: 0,
						},
						t,
					);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				curvature: { configurable: !0 },
				lineWidth: { configurable: !0 },
				lineContrast: { configurable: !0 },
				verticalLine: { configurable: !0 },
				noise: { configurable: !0 },
				noiseSize: { configurable: !0 },
				vignetting: { configurable: !0 },
				vignettingAlpha: { configurable: !0 },
				vignettingBlur: { configurable: !0 },
			};
			return (
				(t.prototype.apply = function (e, t, n, r) {
					(this.uniforms.dimensions[0] = t.sourceFrame.width),
						(this.uniforms.dimensions[1] = t.sourceFrame.height),
						(this.uniforms.seed = this.seed),
						(this.uniforms.time = this.time),
						e.applyFilter(this, t, n, r);
				}),
				(n.curvature.set = function (e) {
					this.uniforms.curvature = e;
				}),
				(n.curvature.get = function () {
					return this.uniforms.curvature;
				}),
				(n.lineWidth.set = function (e) {
					this.uniforms.lineWidth = e;
				}),
				(n.lineWidth.get = function () {
					return this.uniforms.lineWidth;
				}),
				(n.lineContrast.set = function (e) {
					this.uniforms.lineContrast = e;
				}),
				(n.lineContrast.get = function () {
					return this.uniforms.lineContrast;
				}),
				(n.verticalLine.set = function (e) {
					this.uniforms.verticalLine = e;
				}),
				(n.verticalLine.get = function () {
					return this.uniforms.verticalLine;
				}),
				(n.noise.set = function (e) {
					this.uniforms.noise = e;
				}),
				(n.noise.get = function () {
					return this.uniforms.noise;
				}),
				(n.noiseSize.set = function (e) {
					this.uniforms.noiseSize = e;
				}),
				(n.noiseSize.get = function () {
					return this.uniforms.noiseSize;
				}),
				(n.vignetting.set = function (e) {
					this.uniforms.vignetting = e;
				}),
				(n.vignetting.get = function () {
					return this.uniforms.vignetting;
				}),
				(n.vignettingAlpha.set = function (e) {
					this.uniforms.vignettingAlpha = e;
				}),
				(n.vignettingAlpha.get = function () {
					return this.uniforms.vignettingAlpha;
				}),
				(n.vignettingBlur.set = function (e) {
					this.uniforms.vignettingBlur = e;
				}),
				(n.vignettingBlur.get = function () {
					return this.uniforms.vignettingBlur;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		W = n,
		G =
			'precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n',
		K = (function (e) {
			function t(t, n) {
				void 0 === t && (t = 1),
					void 0 === n && (n = 5),
					e.call(this, W, G),
					(this.scale = t),
					(this.angle = n);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = { scale: { configurable: !0 }, angle: { configurable: !0 } };
			return (
				(n.scale.get = function () {
					return this.uniforms.scale;
				}),
				(n.scale.set = function (e) {
					this.uniforms.scale = e;
				}),
				(n.angle.get = function () {
					return this.uniforms.angle;
				}),
				(n.angle.set = function (e) {
					this.uniforms.angle = e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		Y = n,
		Q =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n\n    // Un-premultiply alpha before applying the color\n    if (sample.a > 0.0) {\n        sample.rgb /= sample.a;\n    }\n\n    // Premultiply alpha again\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}',
		U = (function (e) {
			function n(n) {
				n &&
					n.constructor !== Object &&
					(console.warn(
						'DropShadowFilter now uses options instead of (rotation, distance, blur, color, alpha)',
					),
					(n = { rotation: n }),
					void 0 !== arguments[1] && (n.distance = arguments[1]),
					void 0 !== arguments[2] && (n.blur = arguments[2]),
					void 0 !== arguments[3] && (n.color = arguments[3]),
					void 0 !== arguments[4] && (n.alpha = arguments[4])),
					(n = Object.assign(
						{
							rotation: 45,
							distance: 5,
							color: 0,
							alpha: 0.5,
							shadowOnly: !1,
							kernels: null,
							blur: 2,
							quality: 3,
							pixelSize: 1,
							resolution: t.settings.RESOLUTION,
						},
						n,
					)),
					e.call(this);
				var r = n.kernels,
					o = n.blur,
					i = n.quality,
					l = n.pixelSize,
					s = n.resolution;
				(this._tintFilter = new t.Filter(Y, Q)),
					(this._tintFilter.uniforms.color = new Float32Array(4)),
					(this._tintFilter.resolution = s),
					(this._blurFilter = r ? new a(r) : new a(o, i)),
					(this.pixelSize = l),
					(this.resolution = s),
					(this.targetTransform = new t.Matrix());
				var u = n.shadowOnly,
					c = n.rotation,
					f = n.distance,
					h = n.alpha,
					p = n.color;
				(this.shadowOnly = u),
					(this.rotation = c),
					(this.distance = f),
					(this.alpha = h),
					(this.color = p),
					this._updatePadding();
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				resolution: { configurable: !0 },
				distance: { configurable: !0 },
				rotation: { configurable: !0 },
				alpha: { configurable: !0 },
				color: { configurable: !0 },
				kernels: { configurable: !0 },
				blur: { configurable: !0 },
				quality: { configurable: !0 },
				pixelSize: { configurable: !0 },
			};
			return (
				(n.prototype.apply = function (e, t, n, r) {
					var o = e.getRenderTarget();
					(o.transform = this.targetTransform),
						this._tintFilter.apply(e, t, o, !0),
						(o.transform = null),
						this._blurFilter.apply(e, o, n, r),
						!0 !== this.shadowOnly && e.applyFilter(this, t, n, !1),
						e.returnRenderTarget(o);
				}),
				(n.prototype._updatePadding = function () {
					this.padding = this.distance + 2 * this.blur;
				}),
				(n.prototype._updateTargetTransform = function () {
					(this.targetTransform.tx = this.distance * Math.cos(this.angle)),
						(this.targetTransform.ty = this.distance * Math.sin(this.angle));
				}),
				(r.resolution.get = function () {
					return this._resolution;
				}),
				(r.resolution.set = function (e) {
					(this._resolution = e),
						this._tintFilter && (this._tintFilter.resolution = e),
						this._blurFilter && (this._blurFilter.resolution = e);
				}),
				(r.distance.get = function () {
					return this._distance;
				}),
				(r.distance.set = function (e) {
					(this._distance = e),
						this._updatePadding(),
						this._updateTargetTransform();
				}),
				(r.rotation.get = function () {
					return this.angle / t.DEG_TO_RAD;
				}),
				(r.rotation.set = function (e) {
					(this.angle = e * t.DEG_TO_RAD), this._updateTargetTransform();
				}),
				(r.alpha.get = function () {
					return this._tintFilter.uniforms.alpha;
				}),
				(r.alpha.set = function (e) {
					this._tintFilter.uniforms.alpha = e;
				}),
				(r.color.get = function () {
					return t.utils.rgb2hex(this._tintFilter.uniforms.color);
				}),
				(r.color.set = function (e) {
					t.utils.hex2rgb(e, this._tintFilter.uniforms.color);
				}),
				(r.kernels.get = function () {
					return this._blurFilter.kernels;
				}),
				(r.kernels.set = function (e) {
					this._blurFilter.kernels = e;
				}),
				(r.blur.get = function () {
					return this._blurFilter.blur;
				}),
				(r.blur.set = function (e) {
					(this._blurFilter.blur = e), this._updatePadding();
				}),
				(r.quality.get = function () {
					return this._blurFilter.quality;
				}),
				(r.quality.set = function (e) {
					this._blurFilter.quality = e;
				}),
				(r.pixelSize.get = function () {
					return this._blurFilter.pixelSize;
				}),
				(r.pixelSize.set = function (e) {
					this._blurFilter.pixelSize = e;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		Z = n,
		V =
			'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n',
		H = (function (e) {
			function t(t) {
				void 0 === t && (t = 5), e.call(this, Z, V), (this.strength = t);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = { strength: { configurable: !0 } };
			return (
				(n.strength.get = function () {
					return this.uniforms.strength;
				}),
				(n.strength.set = function (e) {
					this.uniforms.strength = e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		$ = n,
		J =
			'// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n',
		ee = (function (e) {
			function n(n) {
				void 0 === n && (n = {}),
					e.call(this, $, J),
					(this.uniforms.dimensions = new Float32Array(2)),
					(n = Object.assign(
						{
							slices: 5,
							offset: 100,
							direction: 0,
							fillMode: 0,
							average: !1,
							seed: 0,
							red: [0, 0],
							green: [0, 0],
							blue: [0, 0],
							minSize: 8,
							sampleSize: 512,
						},
						n,
					)),
					(this.direction = n.direction),
					(this.red = n.red),
					(this.green = n.green),
					(this.blue = n.blue),
					(this.offset = n.offset),
					(this.fillMode = n.fillMode),
					(this.average = n.average),
					(this.seed = n.seed),
					(this.minSize = n.minSize),
					(this.sampleSize = n.sampleSize),
					(this._canvas = document.createElement('canvas')),
					(this._canvas.width = 4),
					(this._canvas.height = this.sampleSize),
					(this.texture = t.Texture.fromCanvas(
						this._canvas,
						t.SCALE_MODES.NEAREST,
					)),
					(this._slices = 0),
					(this.slices = n.slices);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				sizes: { configurable: !0 },
				offsets: { configurable: !0 },
				slices: { configurable: !0 },
				direction: { configurable: !0 },
				red: { configurable: !0 },
				green: { configurable: !0 },
				blue: { configurable: !0 },
			};
			return (
				(n.prototype.apply = function (e, t, n, r) {
					var o = t.sourceFrame.width,
						i = t.sourceFrame.height;
					(this.uniforms.dimensions[0] = o),
						(this.uniforms.dimensions[1] = i),
						(this.uniforms.aspect = i / o),
						(this.uniforms.seed = this.seed),
						(this.uniforms.offset = this.offset),
						(this.uniforms.fillMode = this.fillMode),
						e.applyFilter(this, t, n, r);
				}),
				(n.prototype._randomizeSizes = function () {
					var e = this._sizes,
						t = this._slices - 1,
						n = this.sampleSize,
						r = Math.min(this.minSize / n, 0.9 / this._slices);
					if (this.average) {
						for (var o = this._slices, i = 1, l = 0; l < t; l++) {
							var s = i / (o - l),
								a = Math.max(s * (1 - 0.6 * Math.random()), r);
							(e[l] = a), (i -= a);
						}
						e[t] = i;
					} else {
						for (
							var u = 1, c = Math.sqrt(1 / this._slices), f = 0;
							f < t;
							f++
						) {
							var h = Math.max(c * u * Math.random(), r);
							(e[f] = h), (u -= h);
						}
						e[t] = u;
					}
					this.shuffle();
				}),
				(n.prototype.shuffle = function () {
					for (var e = this._sizes, t = this._slices - 1; t > 0; t--) {
						var n = (Math.random() * t) >> 0,
							r = e[t];
						(e[t] = e[n]), (e[n] = r);
					}
				}),
				(n.prototype._randomizeOffsets = function () {
					for (var e = 0; e < this._slices; e++)
						this._offsets[e] = Math.random() * (Math.random() < 0.5 ? -1 : 1);
				}),
				(n.prototype.refresh = function () {
					this._randomizeSizes(), this._randomizeOffsets(), this.redraw();
				}),
				(n.prototype.redraw = function () {
					var e,
						t = this.sampleSize,
						n = this.texture,
						r = this._canvas.getContext('2d');
					r.clearRect(0, 0, 8, t);
					for (var o = 0, i = 0; i < this._slices; i++) {
						e = Math.floor(256 * this._offsets[i]);
						var l = this._sizes[i] * t,
							s = e > 0 ? e : 0,
							a = e < 0 ? -e : 0;
						(r.fillStyle = 'rgba(' + s + ', ' + a + ', 0, 1)'),
							r.fillRect(0, o >> 0, t, (l + 1) >> 0),
							(o += l);
					}
					n.baseTexture.update(), (this.uniforms.displacementMap = n);
				}),
				(r.sizes.set = function (e) {
					for (var t = Math.min(this._slices, e.length), n = 0; n < t; n++)
						this._sizes[n] = e[n];
				}),
				(r.sizes.get = function () {
					return this._sizes;
				}),
				(r.offsets.set = function (e) {
					for (var t = Math.min(this._slices, e.length), n = 0; n < t; n++)
						this._offsets[n] = e[n];
				}),
				(r.offsets.get = function () {
					return this._offsets;
				}),
				(r.slices.get = function () {
					return this._slices;
				}),
				(r.slices.set = function (e) {
					this._slices !== e &&
						((this._slices = e),
						(this.uniforms.slices = e),
						(this._sizes = this.uniforms.slicesWidth = new Float32Array(e)),
						(this._offsets = this.uniforms.slicesOffset = new Float32Array(e)),
						this.refresh());
				}),
				(r.direction.get = function () {
					return this._direction;
				}),
				(r.direction.set = function (e) {
					if (this._direction !== e) {
						this._direction = e;
						var n = e * t.DEG_TO_RAD;
						(this.uniforms.sinDir = Math.sin(n)),
							(this.uniforms.cosDir = Math.cos(n));
					}
				}),
				(r.red.get = function () {
					return this.uniforms.red;
				}),
				(r.red.set = function (e) {
					this.uniforms.red = e;
				}),
				(r.green.get = function () {
					return this.uniforms.green;
				}),
				(r.green.set = function (e) {
					this.uniforms.green = e;
				}),
				(r.blue.get = function () {
					return this.uniforms.blue;
				}),
				(r.blue.set = function (e) {
					this.uniforms.blue = e;
				}),
				(n.prototype.destroy = function () {
					this.texture.destroy(!0),
						(this.texture = null),
						(this._canvas = null),
						(this.red = null),
						(this.green = null),
						(this.blue = null),
						(this._sizes = null),
						(this._offsets = null);
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter);
	(ee.TRANSPARENT = 0),
		(ee.ORIGINAL = 1),
		(ee.LOOP = 2),
		(ee.CLAMP = 3),
		(ee.MIRROR = 4);
	var te = n,
		ne =
			'varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float distance;\nuniform float outerStrength;\nuniform float innerStrength;\nuniform vec4 glowColor;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nconst float PI = 3.14159265358979323846264;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float totalAlpha = 0.0;\n    float maxTotalAlpha = 0.0;\n    float cosAngle;\n    float sinAngle;\n    vec2 displaced;\n    for (float angle = 0.0; angle <= PI * 2.0; angle += %QUALITY_DIST%) {\n       cosAngle = cos(angle);\n       sinAngle = sin(angle);\n       for (float curDistance = 1.0; curDistance <= %DIST%; curDistance++) {\n           displaced.x = vTextureCoord.x + cosAngle * curDistance * px.x;\n           displaced.y = vTextureCoord.y + sinAngle * curDistance * px.y;\n           curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n           totalAlpha += (distance - curDistance) * curColor.a;\n           maxTotalAlpha += (distance - curDistance);\n       }\n    }\n    maxTotalAlpha = max(maxTotalAlpha, 0.0001);\n\n    ownColor.a = max(ownColor.a, 0.0001);\n    ownColor.rgb = ownColor.rgb / ownColor.a;\n    float outerGlowAlpha = (totalAlpha / maxTotalAlpha)  * outerStrength * (1. - ownColor.a);\n    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * innerStrength * ownColor.a;\n    float resultAlpha = (ownColor.a + outerGlowAlpha);\n    gl_FragColor = vec4(mix(mix(ownColor.rgb, glowColor.rgb, innerGlowAlpha / ownColor.a), glowColor.rgb, outerGlowAlpha / resultAlpha) * resultAlpha, resultAlpha);\n}\n',
		re = (function (e) {
			function n(t, n, r, o, i) {
				void 0 === t && (t = 10),
					void 0 === n && (n = 4),
					void 0 === r && (r = 0),
					void 0 === o && (o = 16777215),
					void 0 === i && (i = 0.1),
					e.call(
						this,
						te,
						ne
							.replace(/%QUALITY_DIST%/gi, '' + (1 / i / t).toFixed(7))
							.replace(/%DIST%/gi, '' + t.toFixed(7)),
					),
					(this.uniforms.glowColor = new Float32Array([0, 0, 0, 1])),
					(this.distance = t),
					(this.color = o),
					(this.outerStrength = n),
					(this.innerStrength = r);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				color: { configurable: !0 },
				distance: { configurable: !0 },
				outerStrength: { configurable: !0 },
				innerStrength: { configurable: !0 },
			};
			return (
				(r.color.get = function () {
					return t.utils.rgb2hex(this.uniforms.glowColor);
				}),
				(r.color.set = function (e) {
					t.utils.hex2rgb(e, this.uniforms.glowColor);
				}),
				(r.distance.get = function () {
					return this.uniforms.distance;
				}),
				(r.distance.set = function (e) {
					this.uniforms.distance = e;
				}),
				(r.outerStrength.get = function () {
					return this.uniforms.outerStrength;
				}),
				(r.outerStrength.set = function (e) {
					this.uniforms.outerStrength = e;
				}),
				(r.innerStrength.get = function () {
					return this.uniforms.innerStrength;
				}),
				(r.innerStrength.set = function (e) {
					this.uniforms.innerStrength = e;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		oe = n,
		ie =
			'vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n',
		le =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n}\n',
		se = (function (e) {
			function n(n) {
				e.call(this, oe, le.replace('${perlin}', ie)),
					(this.uniforms.dimensions = new Float32Array(2)),
					'number' == typeof n &&
						(console.warn(
							'GodrayFilter now uses options instead of (angle, gain, lacunarity, time)',
						),
						(n = { angle: n }),
						void 0 !== arguments[1] && (n.gain = arguments[1]),
						void 0 !== arguments[2] && (n.lacunarity = arguments[2]),
						void 0 !== arguments[3] && (n.time = arguments[3])),
					(n = Object.assign(
						{
							angle: 30,
							gain: 0.5,
							lacunarity: 2.5,
							time: 0,
							parallel: !0,
							center: [0, 0],
						},
						n,
					)),
					(this._angleLight = new t.Point()),
					(this.angle = n.angle),
					(this.gain = n.gain),
					(this.lacunarity = n.lacunarity),
					(this.parallel = n.parallel),
					(this.center = n.center),
					(this.time = n.time);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				angle: { configurable: !0 },
				gain: { configurable: !0 },
				lacunarity: { configurable: !0 },
			};
			return (
				(n.prototype.apply = function (e, t, n, r) {
					var o = t.sourceFrame,
						i = o.width,
						l = o.height;
					(this.uniforms.light = this.parallel
						? this._angleLight
						: this.center),
						(this.uniforms.parallel = this.parallel),
						(this.uniforms.dimensions[0] = i),
						(this.uniforms.dimensions[1] = l),
						(this.uniforms.aspect = l / i),
						(this.uniforms.time = this.time),
						e.applyFilter(this, t, n, r);
				}),
				(r.angle.get = function () {
					return this._angle;
				}),
				(r.angle.set = function (e) {
					this._angle = e;
					var n = e * t.DEG_TO_RAD;
					(this._angleLight.x = Math.cos(n)),
						(this._angleLight.y = Math.sin(n));
				}),
				(r.gain.get = function () {
					return this.uniforms.gain;
				}),
				(r.gain.set = function (e) {
					this.uniforms.gain = e;
				}),
				(r.lacunarity.get = function () {
					return this.uniforms.lacunarity;
				}),
				(r.lacunarity.set = function (e) {
					this.uniforms.lacunarity = e;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		ae = n,
		ue =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n',
		ce = (function (e) {
			function n(n, r, o) {
				void 0 === n && (n = [0, 0]),
					void 0 === r && (r = 5),
					void 0 === o && (o = 0),
					e.call(this, ae, ue),
					(this.uniforms.uVelocity = new Float32Array(2)),
					(this._velocity = new t.ObservablePoint(this.velocityChanged, this)),
					(this.velocity = n),
					(this.kernelSize = r),
					(this.offset = o);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = { velocity: { configurable: !0 }, offset: { configurable: !0 } };
			return (
				(n.prototype.apply = function (e, t, n, r) {
					var o = this.velocity,
						i = o.x,
						l = o.y;
					(this.uniforms.uKernelSize =
						0 !== i || 0 !== l ? this.kernelSize : 0),
						e.applyFilter(this, t, n, r);
				}),
				(r.velocity.set = function (e) {
					Array.isArray(e)
						? this._velocity.set(e[0], e[1])
						: (e instanceof t.Point || e instanceof t.ObservablePoint) &&
						  this._velocity.copy(e);
				}),
				(r.velocity.get = function () {
					return this._velocity;
				}),
				(n.prototype.velocityChanged = function () {
					(this.uniforms.uVelocity[0] = this._velocity.x),
						(this.uniforms.uVelocity[1] = this._velocity.y);
				}),
				(r.offset.set = function (e) {
					this.uniforms.uOffset = e;
				}),
				(r.offset.get = function () {
					return this.uniforms.uOffset;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		fe = n,
		he =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n',
		pe = (function (e) {
			function n(t, n, r) {
				void 0 === n && (n = 0.05),
					void 0 === r && (r = null),
					(r = r || t.length),
					e.call(this, fe, he.replace(/%maxColors%/g, r)),
					(this.epsilon = n),
					(this._maxColors = r),
					(this._replacements = null),
					(this.uniforms.originalColors = new Float32Array(3 * r)),
					(this.uniforms.targetColors = new Float32Array(3 * r)),
					(this.replacements = t);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				replacements: { configurable: !0 },
				maxColors: { configurable: !0 },
				epsilon: { configurable: !0 },
			};
			return (
				(r.replacements.set = function (e) {
					var n = this.uniforms.originalColors,
						r = this.uniforms.targetColors,
						o = e.length;
					if (o > this._maxColors)
						throw (
							'Length of replacements (' +
							o +
							') exceeds the maximum colors length (' +
							this._maxColors +
							')'
						);
					n[3 * o] = -1;
					for (var i = 0; i < o; i++) {
						var l = e[i],
							s = l[0];
						'number' == typeof s
							? (s = t.utils.hex2rgb(s))
							: (l[0] = t.utils.rgb2hex(s)),
							(n[3 * i] = s[0]),
							(n[3 * i + 1] = s[1]),
							(n[3 * i + 2] = s[2]);
						var a = l[1];
						'number' == typeof a
							? (a = t.utils.hex2rgb(a))
							: (l[1] = t.utils.rgb2hex(a)),
							(r[3 * i] = a[0]),
							(r[3 * i + 1] = a[1]),
							(r[3 * i + 2] = a[2]);
					}
					this._replacements = e;
				}),
				(r.replacements.get = function () {
					return this._replacements;
				}),
				(n.prototype.refresh = function () {
					this.replacements = this._replacements;
				}),
				(r.maxColors.get = function () {
					return this._maxColors;
				}),
				(r.epsilon.set = function (e) {
					this.uniforms.epsilon = e;
				}),
				(r.epsilon.get = function () {
					return this.uniforms.epsilon;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		de = n,
		me =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n',
		ge = (function (e) {
			function t(t, n) {
				void 0 === n && (n = 0),
					e.call(this, de, me),
					(this.uniforms.dimensions = new Float32Array(2)),
					'number' == typeof t
						? ((this.seed = t), (t = null))
						: (this.seed = n),
					Object.assign(
						this,
						{
							sepia: 0.3,
							noise: 0.3,
							noiseSize: 1,
							scratch: 0.5,
							scratchDensity: 0.3,
							scratchWidth: 1,
							vignetting: 0.3,
							vignettingAlpha: 1,
							vignettingBlur: 0.3,
						},
						t,
					);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				sepia: { configurable: !0 },
				noise: { configurable: !0 },
				noiseSize: { configurable: !0 },
				scratch: { configurable: !0 },
				scratchDensity: { configurable: !0 },
				scratchWidth: { configurable: !0 },
				vignetting: { configurable: !0 },
				vignettingAlpha: { configurable: !0 },
				vignettingBlur: { configurable: !0 },
			};
			return (
				(t.prototype.apply = function (e, t, n, r) {
					(this.uniforms.dimensions[0] = t.sourceFrame.width),
						(this.uniforms.dimensions[1] = t.sourceFrame.height),
						(this.uniforms.seed = this.seed),
						e.applyFilter(this, t, n, r);
				}),
				(n.sepia.set = function (e) {
					this.uniforms.sepia = e;
				}),
				(n.sepia.get = function () {
					return this.uniforms.sepia;
				}),
				(n.noise.set = function (e) {
					this.uniforms.noise = e;
				}),
				(n.noise.get = function () {
					return this.uniforms.noise;
				}),
				(n.noiseSize.set = function (e) {
					this.uniforms.noiseSize = e;
				}),
				(n.noiseSize.get = function () {
					return this.uniforms.noiseSize;
				}),
				(n.scratch.set = function (e) {
					this.uniforms.scratch = e;
				}),
				(n.scratch.get = function () {
					return this.uniforms.scratch;
				}),
				(n.scratchDensity.set = function (e) {
					this.uniforms.scratchDensity = e;
				}),
				(n.scratchDensity.get = function () {
					return this.uniforms.scratchDensity;
				}),
				(n.scratchWidth.set = function (e) {
					this.uniforms.scratchWidth = e;
				}),
				(n.scratchWidth.get = function () {
					return this.uniforms.scratchWidth;
				}),
				(n.vignetting.set = function (e) {
					this.uniforms.vignetting = e;
				}),
				(n.vignetting.get = function () {
					return this.uniforms.vignetting;
				}),
				(n.vignettingAlpha.set = function (e) {
					this.uniforms.vignettingAlpha = e;
				}),
				(n.vignettingAlpha.get = function () {
					return this.uniforms.vignettingAlpha;
				}),
				(n.vignettingBlur.set = function (e) {
					this.uniforms.vignettingBlur = e;
				}),
				(n.vignettingBlur.get = function () {
					return this.uniforms.vignettingBlur;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		ve = n,
		xe =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n',
		ye = (function (e) {
			function n(t, r, o) {
				void 0 === t && (t = 1),
					void 0 === r && (r = 0),
					void 0 === o && (o = 0.1);
				var i = Math.max(o * n.MAX_SAMPLES, n.MIN_SAMPLES),
					l = ((2 * Math.PI) / i).toFixed(7);
				e.call(this, ve, xe.replace(/\$\{angleStep\}/, l)),
					(this.uniforms.thickness = new Float32Array([0, 0])),
					(this.thickness = t),
					(this.uniforms.outlineColor = new Float32Array([0, 0, 0, 1])),
					(this.color = r),
					(this.quality = o);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = { color: { configurable: !0 } };
			return (
				(n.prototype.apply = function (e, t, n, r) {
					(this.uniforms.thickness[0] = this.thickness / t.size.width),
						(this.uniforms.thickness[1] = this.thickness / t.size.height),
						e.applyFilter(this, t, n, r);
				}),
				(r.color.get = function () {
					return t.utils.rgb2hex(this.uniforms.outlineColor);
				}),
				(r.color.set = function (e) {
					t.utils.hex2rgb(e, this.uniforms.outlineColor);
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter);
	(ye.MIN_SAMPLES = 1), (ye.MAX_SAMPLES = 100);
	var be = n,
		_e =
			'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n',
		Ce = (function (e) {
			function t(t) {
				void 0 === t && (t = 10), e.call(this, be, _e), (this.size = t);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = { size: { configurable: !0 } };
			return (
				(n.size.get = function () {
					return this.uniforms.size;
				}),
				(n.size.set = function (e) {
					'number' == typeof e && (e = [e, e]), (this.uniforms.size = e);
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		Se = n,
		Fe =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n',
		ze = (function (e) {
			function t(t, n, r, o) {
				void 0 === t && (t = 0),
					void 0 === n && (n = [0, 0]),
					void 0 === r && (r = 5),
					void 0 === o && (o = -1),
					e.call(this, Se, Fe),
					(this._angle = 0),
					(this.angle = t),
					(this.center = n),
					(this.kernelSize = r),
					(this.radius = o);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				angle: { configurable: !0 },
				center: { configurable: !0 },
				radius: { configurable: !0 },
			};
			return (
				(t.prototype.apply = function (e, t, n, r) {
					(this.uniforms.uKernelSize = 0 !== this._angle ? this.kernelSize : 0),
						e.applyFilter(this, t, n, r);
				}),
				(n.angle.set = function (e) {
					(this._angle = e), (this.uniforms.uRadian = (e * Math.PI) / 180);
				}),
				(n.angle.get = function () {
					return this._angle;
				}),
				(n.center.get = function () {
					return this.uniforms.uCenter;
				}),
				(n.center.set = function (e) {
					this.uniforms.uCenter = e;
				}),
				(n.radius.get = function () {
					return this.uniforms.uRadius;
				}),
				(n.radius.set = function (e) {
					(e < 0 || e === 1 / 0) && (e = -1), (this.uniforms.uRadius = e);
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		Ae = n,
		we =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n',
		Te = (function (e) {
			function t(t) {
				e.call(this, Ae, we),
					(this.uniforms.amplitude = new Float32Array(2)),
					(this.uniforms.waveLength = new Float32Array(2)),
					(this.uniforms.alpha = new Float32Array(2)),
					(this.uniforms.dimensions = new Float32Array(2)),
					Object.assign(
						this,
						{
							mirror: !0,
							boundary: 0.5,
							amplitude: [0, 20],
							waveLength: [30, 100],
							alpha: [1, 1],
							time: 0,
						},
						t,
					);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				mirror: { configurable: !0 },
				boundary: { configurable: !0 },
				amplitude: { configurable: !0 },
				waveLength: { configurable: !0 },
				alpha: { configurable: !0 },
			};
			return (
				(t.prototype.apply = function (e, t, n, r) {
					(this.uniforms.dimensions[0] = t.sourceFrame.width),
						(this.uniforms.dimensions[1] = t.sourceFrame.height),
						(this.uniforms.time = this.time),
						e.applyFilter(this, t, n, r);
				}),
				(n.mirror.set = function (e) {
					this.uniforms.mirror = e;
				}),
				(n.mirror.get = function () {
					return this.uniforms.mirror;
				}),
				(n.boundary.set = function (e) {
					this.uniforms.boundary = e;
				}),
				(n.boundary.get = function () {
					return this.uniforms.boundary;
				}),
				(n.amplitude.set = function (e) {
					(this.uniforms.amplitude[0] = e[0]),
						(this.uniforms.amplitude[1] = e[1]);
				}),
				(n.amplitude.get = function () {
					return this.uniforms.amplitude;
				}),
				(n.waveLength.set = function (e) {
					(this.uniforms.waveLength[0] = e[0]),
						(this.uniforms.waveLength[1] = e[1]);
				}),
				(n.waveLength.get = function () {
					return this.uniforms.waveLength;
				}),
				(n.alpha.set = function (e) {
					(this.uniforms.alpha[0] = e[0]), (this.uniforms.alpha[1] = e[1]);
				}),
				(n.alpha.get = function () {
					return this.uniforms.alpha;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		De = n,
		Oe =
			'precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n',
		Pe = (function (e) {
			function t(t, n, r) {
				void 0 === t && (t = [-10, 0]),
					void 0 === n && (n = [0, 10]),
					void 0 === r && (r = [0, 0]),
					e.call(this, De, Oe),
					(this.red = t),
					(this.green = n),
					(this.blue = r);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				red: { configurable: !0 },
				green: { configurable: !0 },
				blue: { configurable: !0 },
			};
			return (
				(n.red.get = function () {
					return this.uniforms.red;
				}),
				(n.red.set = function (e) {
					this.uniforms.red = e;
				}),
				(n.green.get = function () {
					return this.uniforms.green;
				}),
				(n.green.set = function (e) {
					this.uniforms.green = e;
				}),
				(n.blue.get = function () {
					return this.uniforms.blue;
				}),
				(n.blue.set = function (e) {
					this.uniforms.blue = e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		Me = n,
		Re =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n',
		je = (function (e) {
			function t(t, n, r) {
				void 0 === t && (t = [0, 0]),
					void 0 === n && (n = {}),
					void 0 === r && (r = 0),
					e.call(this, Me, Re),
					(this.center = t),
					Array.isArray(n) &&
						(console.warn(
							'Deprecated Warning: ShockwaveFilter params Array has been changed to options Object.',
						),
						(n = {})),
					(n = Object.assign(
						{
							amplitude: 30,
							wavelength: 160,
							brightness: 1,
							speed: 500,
							radius: -1,
						},
						n,
					)),
					(this.amplitude = n.amplitude),
					(this.wavelength = n.wavelength),
					(this.brightness = n.brightness),
					(this.speed = n.speed),
					(this.radius = n.radius),
					(this.time = r);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				center: { configurable: !0 },
				amplitude: { configurable: !0 },
				wavelength: { configurable: !0 },
				brightness: { configurable: !0 },
				speed: { configurable: !0 },
				radius: { configurable: !0 },
			};
			return (
				(t.prototype.apply = function (e, t, n, r) {
					(this.uniforms.time = this.time), e.applyFilter(this, t, n, r);
				}),
				(n.center.get = function () {
					return this.uniforms.center;
				}),
				(n.center.set = function (e) {
					this.uniforms.center = e;
				}),
				(n.amplitude.get = function () {
					return this.uniforms.amplitude;
				}),
				(n.amplitude.set = function (e) {
					this.uniforms.amplitude = e;
				}),
				(n.wavelength.get = function () {
					return this.uniforms.wavelength;
				}),
				(n.wavelength.set = function (e) {
					this.uniforms.wavelength = e;
				}),
				(n.brightness.get = function () {
					return this.uniforms.brightness;
				}),
				(n.brightness.set = function (e) {
					this.uniforms.brightness = e;
				}),
				(n.speed.get = function () {
					return this.uniforms.speed;
				}),
				(n.speed.set = function (e) {
					this.uniforms.speed = e;
				}),
				(n.radius.get = function () {
					return this.uniforms.radius;
				}),
				(n.radius.set = function (e) {
					this.uniforms.radius = e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		Le = n,
		ke =
			'varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n',
		Ie = (function (e) {
			function n(t, n, r) {
				void 0 === n && (n = 0),
					void 0 === r && (r = 1),
					e.call(this, Le, ke),
					(this.uniforms.dimensions = new Float32Array(2)),
					(this.uniforms.ambientColor = new Float32Array([0, 0, 0, r])),
					(this.texture = t),
					(this.color = n);
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				texture: { configurable: !0 },
				color: { configurable: !0 },
				alpha: { configurable: !0 },
			};
			return (
				(n.prototype.apply = function (e, t, n, r) {
					(this.uniforms.dimensions[0] = t.sourceFrame.width),
						(this.uniforms.dimensions[1] = t.sourceFrame.height),
						e.applyFilter(this, t, n, r);
				}),
				(r.texture.get = function () {
					return this.uniforms.uLightmap;
				}),
				(r.texture.set = function (e) {
					this.uniforms.uLightmap = e;
				}),
				(r.color.set = function (e) {
					var n = this.uniforms.ambientColor;
					'number' == typeof e
						? (t.utils.hex2rgb(e, n), (this._color = e))
						: ((n[0] = e[0]),
						  (n[1] = e[1]),
						  (n[2] = e[2]),
						  (n[3] = e[3]),
						  (this._color = t.utils.rgb2hex(n)));
				}),
				(r.color.get = function () {
					return this._color;
				}),
				(r.alpha.get = function () {
					return this.uniforms.ambientColor[3];
				}),
				(r.alpha.set = function (e) {
					this.uniforms.ambientColor[3] = e;
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		Ee = n,
		Be =
			'varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n',
		Xe = (function (e) {
			function n(n, r, o, i) {
				void 0 === n && (n = 100),
					void 0 === r && (r = 600),
					void 0 === o && (o = null),
					void 0 === i && (i = null),
					e.call(this, Ee, Be),
					(this.uniforms.blur = n),
					(this.uniforms.gradientBlur = r),
					(this.uniforms.start = o || new t.Point(0, window.innerHeight / 2)),
					(this.uniforms.end = i || new t.Point(600, window.innerHeight / 2)),
					(this.uniforms.delta = new t.Point(30, 30)),
					(this.uniforms.texSize = new t.Point(
						window.innerWidth,
						window.innerHeight,
					)),
					this.updateDelta();
			}
			e && (n.__proto__ = e),
				(n.prototype = Object.create(e && e.prototype)),
				(n.prototype.constructor = n);
			var r = {
				blur: { configurable: !0 },
				gradientBlur: { configurable: !0 },
				start: { configurable: !0 },
				end: { configurable: !0 },
			};
			return (
				(n.prototype.updateDelta = function () {
					(this.uniforms.delta.x = 0), (this.uniforms.delta.y = 0);
				}),
				(r.blur.get = function () {
					return this.uniforms.blur;
				}),
				(r.blur.set = function (e) {
					this.uniforms.blur = e;
				}),
				(r.gradientBlur.get = function () {
					return this.uniforms.gradientBlur;
				}),
				(r.gradientBlur.set = function (e) {
					this.uniforms.gradientBlur = e;
				}),
				(r.start.get = function () {
					return this.uniforms.start;
				}),
				(r.start.set = function (e) {
					(this.uniforms.start = e), this.updateDelta();
				}),
				(r.end.get = function () {
					return this.uniforms.end;
				}),
				(r.end.set = function (e) {
					(this.uniforms.end = e), this.updateDelta();
				}),
				Object.defineProperties(n.prototype, r),
				n
			);
		})(t.Filter),
		qe = (function (e) {
			function t() {
				e.apply(this, arguments);
			}
			return (
				e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t),
				(t.prototype.updateDelta = function () {
					var e = this.uniforms.end.x - this.uniforms.start.x,
						t = this.uniforms.end.y - this.uniforms.start.y,
						n = Math.sqrt(e * e + t * t);
					(this.uniforms.delta.x = e / n), (this.uniforms.delta.y = t / n);
				}),
				t
			);
		})(Xe),
		Ne = (function (e) {
			function t() {
				e.apply(this, arguments);
			}
			return (
				e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t),
				(t.prototype.updateDelta = function () {
					var e = this.uniforms.end.x - this.uniforms.start.x,
						t = this.uniforms.end.y - this.uniforms.start.y,
						n = Math.sqrt(e * e + t * t);
					(this.uniforms.delta.x = -t / n), (this.uniforms.delta.y = e / n);
				}),
				t
			);
		})(Xe),
		We = (function (e) {
			function t(t, n, r, o) {
				void 0 === t && (t = 100),
					void 0 === n && (n = 600),
					void 0 === r && (r = null),
					void 0 === o && (o = null),
					e.call(this),
					(this.tiltShiftXFilter = new qe(t, n, r, o)),
					(this.tiltShiftYFilter = new Ne(t, n, r, o));
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				blur: { configurable: !0 },
				gradientBlur: { configurable: !0 },
				start: { configurable: !0 },
				end: { configurable: !0 },
			};
			return (
				(t.prototype.apply = function (e, t, n) {
					var r = e.getRenderTarget(!0);
					this.tiltShiftXFilter.apply(e, t, r),
						this.tiltShiftYFilter.apply(e, r, n),
						e.returnRenderTarget(r);
				}),
				(n.blur.get = function () {
					return this.tiltShiftXFilter.blur;
				}),
				(n.blur.set = function (e) {
					this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = e;
				}),
				(n.gradientBlur.get = function () {
					return this.tiltShiftXFilter.gradientBlur;
				}),
				(n.gradientBlur.set = function (e) {
					this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = e;
				}),
				(n.start.get = function () {
					return this.tiltShiftXFilter.start;
				}),
				(n.start.set = function (e) {
					this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = e;
				}),
				(n.end.get = function () {
					return this.tiltShiftXFilter.end;
				}),
				(n.end.set = function (e) {
					this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		Ge = n,
		Ke =
			'varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n',
		Ye = (function (e) {
			function t(t, n, r) {
				void 0 === t && (t = 200),
					void 0 === n && (n = 4),
					void 0 === r && (r = 20),
					e.call(this, Ge, Ke),
					(this.radius = t),
					(this.angle = n),
					(this.padding = r);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				offset: { configurable: !0 },
				radius: { configurable: !0 },
				angle: { configurable: !0 },
			};
			return (
				(n.offset.get = function () {
					return this.uniforms.offset;
				}),
				(n.offset.set = function (e) {
					this.uniforms.offset = e;
				}),
				(n.radius.get = function () {
					return this.uniforms.radius;
				}),
				(n.radius.set = function (e) {
					this.uniforms.radius = e;
				}),
				(n.angle.get = function () {
					return this.uniforms.angle;
				}),
				(n.angle.set = function (e) {
					this.uniforms.angle = e;
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter),
		Qe = n,
		Ue =
			"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = 32.0;\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",
		Ze = (function (e) {
			function t(t, n, r, o) {
				void 0 === t && (t = 0.1),
					void 0 === n && (n = [0, 0]),
					void 0 === r && (r = 0),
					void 0 === o && (o = -1),
					e.call(this, Qe, Ue),
					(this.center = n),
					(this.strength = t),
					(this.innerRadius = r),
					(this.radius = o);
			}
			e && (t.__proto__ = e),
				(t.prototype = Object.create(e && e.prototype)),
				(t.prototype.constructor = t);
			var n = {
				center: { configurable: !0 },
				strength: { configurable: !0 },
				innerRadius: { configurable: !0 },
				radius: { configurable: !0 },
			};
			return (
				(n.center.get = function () {
					return this.uniforms.uCenter;
				}),
				(n.center.set = function (e) {
					this.uniforms.uCenter = e;
				}),
				(n.strength.get = function () {
					return this.uniforms.uStrength;
				}),
				(n.strength.set = function (e) {
					this.uniforms.uStrength = e;
				}),
				(n.innerRadius.get = function () {
					return this.uniforms.uInnerRadius;
				}),
				(n.innerRadius.set = function (e) {
					this.uniforms.uInnerRadius = e;
				}),
				(n.radius.get = function () {
					return this.uniforms.uRadius;
				}),
				(n.radius.set = function (e) {
					(e < 0 || e === 1 / 0) && (e = -1), (this.uniforms.uRadius = e);
				}),
				Object.defineProperties(t.prototype, n),
				t
			);
		})(t.Filter);
	return (
		(e.AdjustmentFilter = o),
		(e.AdvancedBloomFilter = p),
		(e.AsciiFilter = g),
		(e.BevelFilter = y),
		(e.BloomFilter = F),
		(e.BulgePinchFilter = w),
		(e.ColorMapFilter = O),
		(e.ColorReplaceFilter = R),
		(e.ConvolutionFilter = k),
		(e.CrossHatchFilter = B),
		(e.CRTFilter = N),
		(e.DotFilter = K),
		(e.DropShadowFilter = U),
		(e.EmbossFilter = H),
		(e.GlitchFilter = ee),
		(e.GlowFilter = re),
		(e.GodrayFilter = se),
		(e.KawaseBlurFilter = a),
		(e.MotionBlurFilter = ce),
		(e.MultiColorReplaceFilter = pe),
		(e.OldFilmFilter = ge),
		(e.OutlineFilter = ye),
		(e.PixelateFilter = Ce),
		(e.RadialBlurFilter = ze),
		(e.ReflectionFilter = Te),
		(e.RGBSplitFilter = Pe),
		(e.ShockwaveFilter = je),
		(e.SimpleLightmapFilter = Ie),
		(e.TiltShiftFilter = We),
		(e.TiltShiftAxisFilter = Xe),
		(e.TiltShiftXFilter = qe),
		(e.TiltShiftYFilter = Ne),
		(e.TwistFilter = Ye),
		(e.ZoomBlurFilter = Ze),
		e
	);
})({}, PIXI);
Object.assign(PIXI.filters, this ? this.__filters : __filters);
