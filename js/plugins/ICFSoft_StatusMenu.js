//=============================================================================
// ICF-Soft Plugins - Status Menu
// ICFSoft_StatusMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.ICFSoft_StatusMenu = true;

var ICF = ICF || {};
ICF.StatusMenu = ICF.StatusMenu || {};
ICF.NotetagsProcessor = ICF.NotetagsProcessor || {};

ICF.StatusMenu.Version = 106; // 1.06

//=============================================================================
/*:
 * @plugindesc v1.06 A status menu where you can organize actor params.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Main menu gauges1
 * @desc Gauge names that will be shown in row.
 * @default hp
 *
 * @param Main menu gauges2
 * @desc Gauge names that will be shown in row.
 * @default mp
 *
 * @param Main menu gauges3
 * @desc Gauge names that will be shown in row.
 * @default tp
 *
 * @param Status menu gauges1
 * @desc Gauge names that will be shown in row.
 * @default hp
 *
 * @param Status menu gauges2
 * @desc Gauge names that will be shown in row.
 * @default mp tp
 *
 * @param Column1
 * @desc Param names that will be shown in column.
 * @default atk def mat mdf agi luk
 *
 * @param Column2
 * @desc Param names that will be shown in column.
 * @default
 *
 * @param Column3
 * @desc Param names that will be shown in column.
 * @default
 *
 * @param Equip Column
 * @desc Param names that will be shown in equip menu.
 * @default atk def mat mdf agi luk
 *
 * @param Battle Status Gauges
 * @desc Gauge names that will be shown in battle status window.
 * @default hp mp tp
 *
 * @param Battle Status Gauge Length
 * @desc Gauge length for battle status window.
 * @default 330
 *
 * @param Percentage params
 * @desc What params will be used as percentages.
 * @default
 *
 * @param Evaluables
 * @desc Making values througth formulas.
 * @type struct<Evals>[]
 * @default ["{\"Name\":\"Something random\",\"Formula\":\"Math.trunc(Math.random() * 100)\"}"]
 *
 * @param Percentages
 * @desc Making percentage values througth formulas.
 * @type struct<Percents>[]
 * @default ["{\"Name\":\"Something random\",\"Formula\":\"Math.random()\"}"]
 *
 * @param Gauges
 * @desc Making gauges througth formulas.
 * @type struct<Gauges>[]
 * @default ["{\"Name\":\"Random gauge\",\"Current\":\"Math.trunc(Math.random() * 100)\",\"Max\":\"100\",\"Color1\":\"#e99\",\"Color2\":\"17\",\"Show Current and Max\":\"false\"}"]
 *
 * @param XParam0 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Hit rate
 *
 * @param XParam1 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Evasion rate
 *
 * @param XParam2 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Critical rate
 *
 * @param XParam3 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Critical evasion rate
 *
 * @param XParam4 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Magic evasion rate
 *
 * @param XParam5 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Magic reflection rate
 *
 * @param XParam6 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Counter-attack rate
 *
 * @param XParam7 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Hp-regen rate
 *
 * @param XParam8 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Mp-regen rate
 *
 * @param XParam9 Full Name
 * @desc Name that will be shown for this extra param.
 * @default Tp-regen rate
 *
 * @param SParam0 Full Name
 * @desc Name that will be shown for this special param.
 * @default Targeted rate
 *
 * @param SParam1 Full Name
 * @desc Name that will be shown for this special param.
 * @default Guard rate
 *
 * @param SParam2 Full Name
 * @desc Name that will be shown for this special param.
 * @default Recovery rate
 *
 * @param SParam3 Full Name
 * @desc Name that will be shown for this special param.
 * @default Pharmacology
 *
 * @param SParam4 Full Name
 * @desc Name that will be shown for this special param.
 * @default Mp cost rate
 *
 * @param SParam5 Full Name
 * @desc Name that will be shown for this special param.
 * @default Tp cost rate
 *
 * @param SParam6 Full Name
 * @desc Name that will be shown for this special param.
 * @default Phisical damage rate
 *
 * @param SParam7 Full Name
 * @desc Name that will be shown for this special param.
 * @default Magical damage rate
 *
 * @param SParam8 Full Name
 * @desc Name that will be shown for this special param.
 * @default Floor damage rate
 *
 * @param SParam9 Full Name
 * @desc Name that will be shown for this special param.
 * @default Experience rate
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin is made for use with ICF-Soft Params Core but can work alone.
 *
 * Allows you to show params in up to three columns plus equip, using all
 * window width.
 * Also allow using gauges for hp, mp, tp and cparams for simple status on
 * status menu and main menu.
 *
 * You can use javascript code to be run to get a value and change columns
 * for specified actors.
 *
 * ============================================================================
 * How to use
 * ============================================================================
 *
 * You can give different columns for specified actors with this notetag:
 *
 * <STATUS MENU COL x param param param>
 *
 * You need to specify column from 1 to 3 that will be replaced and
 * params are separated by spaces.
 * Allow param, nparam, pparam, xparam, sparam, evals, percents, gauges and
 * cparam basic or counter.
 *
 * <EQUIP STATUS MENU COL param param param>
 *
 * Replace shown params in equip menu. Params are separated by spaces.
 * Allow param, nparam, pparam, xparam, sparam, evals, percents and cparams.
 *
 * <STATUS MENU GAUGES x param param param>
 *
 * Replace shown gauges in small info area from status menu. Params are
 * separated by spaces. Allow hp, mp, tp, cparam counter and gauges.
 *
 * <MAIN MENU INFO GAUGES x param param param>
 *
 * Replace shown gauges in small info area from main menu. Params are
 * separated by spaces. Allow hp, mp, tp, cparam counter and gauges.
 *
 * <BATTLE STATUS MENU COL param param param>
 *
 * Replace shown gauges in small info area from battle window. Params are
 * separated by spaces. Allow hp, mp, tp, cparam counter and gauges.
 *
 * More features will be added in the future.
 *
 * ============================================================================
 * Parameters
 * ============================================================================
 *
 * Main menu gaugesX: Place the gauge names that will be shown in row separated
 * by spaces. You can use up to 3 rows.
 *
 * Status menu gaugesX: Place the gauge names that will be shown in row
 * separated by spaces. You can use up to 2 rows.
 *
 * ColumnX: Place the param names that will be shown in comlumn separated by
 * spaces. You can use up to 3 columns sharing width with equips.
 * It works with param, nparam, pparam, evals, percents and gauges.
 *
 * Equip Column: Place the param names that will be shown in equip menu comlumn
 * separated by spaces.
 * It doesn't use gauges.
 *
 * Battle Status Gauges: Place the gauge names that will be shown in battle
 * status window separated by spaces.
 *
 * Battle Status Gauge Length: Gauge length for battle status window.
 *
 * Percentage params: Tell what params will be used as percentages.
 * It works with pparam.
 *
 * You can create all evals and gauges you'll need with indexes starfing from 0.
 *
 * Evaluables: A name and a formula to determine a status slot.
 * Use eval0, eval1, eval2 ... etc.
 *
 * Percentages: A name and a formula to determine a status slot as a percentage.
 * Use percentage0, percentage1, percentage2 ... etc.
 *
 * Gauges: Place a gauge in a status slot. You can configure name, formulas for
 * current and max values, gauge colors and if you want to show both current
 * and max values or only current.
 * Use gauge0, gauge1, gauge2 ... etc.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * resetStatusInfoData actor place
 *  - Resets the display info to defaut for specified actor. You can clear all,
 *    statuscol1, statuscol2, statuscol3, statuscols, statusgauge1,
 *    statusgauge2, statusgauges, menugauge1, menugauge2, menugauge3,
 *    menugauges, equip and battle. Selfexplanatory.
 *
 * changeStatusInfoData actor place names
 *  - Sets the display info place for specified actor. You can change
 *    statuscol1, statuscol2, statuscol3, statusgauge1, statusgauge2,
 *    menugauge1, menugauge2, menugauge3, equip and battle. Selfexplanatory.
 *
 * ============================================================================
 * Incompatibilities
 * ============================================================================
 *
 * Can be incompatible or interfere with some similar plugins.
 *
 * ============================================================================
 * Known isues
 * ============================================================================
 *
 * Can interfere with some similar plugins or enhace them.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.06:
 * - Allow to change columns and rows ingame.
 *
 * Version 1.05:
 * - Allow editing gauge places from battle window.
 *
 * Version 1.04:
 * - Added use of cparams.
 * - Allow editing gauge places from small info on main and status menus.
 * - Removed obsolete system.
 *
 * Version 1.03:
 * - Added a column for equipment menu.
 * - Added custom formulas for gauges.
 * - Use of 1.5.0 new plugin parameters.
 *
 * Version 1.02:
 * - Added custom formulas to get values.
 * - Added custom columns for specified actors.
 *
 * Version 1.01:
 * - Allow to show special and extra params.
 *
 * Version 1.00:
 * - Finished plugin!
 *
 * ============================================================================
 *
 * For commercial and non-commercial games.
 * Credit to ICF-Soft.
 * This entire header must be included with plugin.
 *
 * ============================================================================
 */
//=============================================================================
/*:es
 * @plugindesc v1.06 Una ventana de estado que permite mostrar
 * los nparam, los pparam y los cparam.
 * @author ICF-Soft [http://icfsoft.blogspot.com.es/]
 *
 * @param Main menu gauges1
 * @desc Nombre de los medidores separados por espacios.
 * @default hp
 *
 * @param Main menu gauges2
 * @desc Nombre de los medidores separados por espacios.
 * @default mp
 *
 * @param Main menu gauges3
 * @desc Nombre de los medidores separados por espacios.
 * @default tp
 *
 * @param Status menu gauges1
 * @desc Nombre de los medidores separados por espacios.
 * @default hp
 *
 * @param Status menu gauges2
 * @desc Nombre de los medidores separados por espacios.
 * @default mp tp
 *
 * @param Column1
 * @desc Nombres básicos de los parámetros separados por espacios.
 * @default atk def mat mdf agi luk
 *
 * @param Column2
 * @desc Nombres básicos de los parámetros separados por espacios.
 * @default
 *
 * @param Column3
 * @desc Nombres básicos de los parámetros separados por espacios.
 * @default
 *
 * @param Equip Column
 * @desc Nombres básicos de los parámetros separados por espacios.
 * @default atk def mat mdf agi luk
 *
 * @param Battle Status Gauges
 * @desc Nombre de los medidores separados por espacios.
 * @default hp mp tp
 *
 * @param Battle Status Gauge Length
 * @desc Longitud del area de los medidores en batalla.
 * @default 330
 *
 * @param Percentage params
 * @desc Indica qué parámetros serán tratados como porcentajes.
 * @default
 *
 * @param Evaluables
 * @desc Obteniendo valores a través de fórmulas.
 * @type struct<Evals>[]
 * @default ["{\"Name\":\"Algo aleatorio\",\"Formula\":\"Math.trunc(Math.random() * 100)\"}"]
 *
 * @param Percentages
 * @desc Obteniendo valores porcentuales a través de fórmulas.
 * @type struct<Percents>[]
 * @default ["{\"Name\":\"Algo aleatorio\",\"Formula\":\"Math.random()\"}"]
 *
 * @param Gauges
 * @desc Obteniendo barras de medición a través de fórmulas.
 * @type struct<Gauges>[]
 * @default ["{\"Name\":\"Medidor aleatorio\",\"Current\":\"Math.trunc(Math.random() * 100)\",\"Max\":\"100\",\"Color1\":\"#e99\",\"Color2\":\"17\",\"Show Current and Max\":\"false\"}"]
 *
 * @param XParam0 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Puntería
 *
 * @param XParam1 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Evasión
 *
 * @param XParam2 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Probabilidad de crítico
 *
 * @param XParam3 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Evadir crítico
 *
 * @param XParam4 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Evasión mágica
 *
 * @param XParam5 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Reflejo mágico
 *
 * @param XParam6 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Contraataque
 *
 * @param XParam7 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Regenerar vida
 *
 * @param XParam8 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Regenerar magia
 *
 * @param XParam9 Full Name
 * @desc Nombre mostrado para este parámetro extra.
 * @default Regenerar turbo
 *
 * @param SParam0 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Ser el objetivo
 *
 * @param SParam1 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Efecto defensivo
 *
 * @param SParam2 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Efecto de recuperación
 *
 * @param SParam3 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Farmacología
 *
 * @param SParam4 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Coste de mp
 *
 * @param SParam5 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Coste de tp
 *
 * @param SParam6 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Daño físico recibido
 *
 * @param SParam7 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Daño mágico recibido
 *
 * @param SParam8 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Daño por el terreno
 *
 * @param SParam9 Full Name
 * @desc Nombre mostrado para este parámetro especial.
 * @default Experiencia obtenible
 *
 * @help
 * ============================================================================
 * Introducción
 * ============================================================================
 *
 * Este plugin está hecho para su uso con el ICF-Soft Params Core pero puede
 * usarse solo.
 *
 * Permite mostrar los parámetros en hasta tres columnas aparte del
 * equipamiento aprovechando todo el ancho.
 * Además permite mostrar medidores de hp, mp, tp y los nuevos cparams
 * status menu and main menu.
 *
 * Puedes utilizar código javascript que se ejecutará para obtener un valor
 * y además cambiar columnas para personajes específicos.
 *
 * Iré añadiendo más características.
 *
 * ============================================================================
 * Uso
 * ============================================================================
 *
 * Puedes alterar las columnas para personajes específicos con la
 * siguiente etiqueta:
 *
 * <STATUS MENU COL x param param param>
 *
 * Debes especificar una columna entre la 1 y la 3 que será reemplazada
 * y los parámetros separados por espacios.
 * Permite param, nparam, pparam, xparam, sparam, evaluables, porcentajes y
 * barras.
 *
 * <EQUIP STATUS MENU COL param param param>
 *
 * Reemplaza los parámetros a mostrar en el menú de equipamiento.
 * Permite param, nparam, pparam, xparam, sparam, evaluables y porcentajes.
 *
 * <STATUS MENU GAUGES x param param param>
 *
 * 3 Filas disponibles.
 * Reemplaza los medidores a mostrar en el menú de estado.
 * Permite hp, mp, tp, barras de medición y los nuevos cparam.
 *
 * <MAIN MENU INFO GAUGES x param param param>
 *
 * 3 Filas disponibles.
 * Reemplaza los medidores a mostrar en distintos menús.
 * Permite hp, mp, tp, barras de medición y los nuevos cparam.
 *
 * <BATTLE STATUS MENU COL param param param>
 *
 * Reemplaza los medidores de los personajes a mostrar en batalla.
 * Permite hp, mp, tp, barras de medición y los nuevos cparam.
 *
 * ============================================================================
 * Parámetros
 * ============================================================================
 *
 * Main menu gaugesX: Para colocar los nombres básicos de los parámetros de
 * medición separados por espacios. Hay hasta 3 filas que ocupan el ancho
 * disponible de la ventana. Sólo parámetros de medición.
 *
 * Status menu gaugesX: Para colocar los nombres básicos de los parámetros de
 * medición separados por espacios. Hay hasta 2 filas que ocupan el ancho
 * disponible de la ventana. Sólo parámetros de medición.
 *
 * ColumnX: Para colocar los nombres básicos de los parámetros separados por
 * espacios. Hay hasta 3 columnas repartidas entre el ancho de la ventana.
 * Funciona con todos los ya mostrados.
 *
 * Equip Column: Para colocar los nombres básicos de los parámetros en el menú
 * de equipamiento separados por espacios.
 * No usa barras de medición.
 *
 * Battle Status Gauges: Para colocar los nombres básicos de los parámetros de
 * medición separados por espacios en batalla.
 *
 * Battle Status Gauge Length: Longitud del area de los medidores en batalla.
 *
 * Percentage params: Indica qué parámetros serán tratados como porcentajes.
 * Usa dos decimales. De momento solo para los pparam.
 *
 * Puedes crear todos los evaluables y medidores que necesites con índices a
 * partir de 0.
 *
 * Evaluables: Nombre y fórmula para obtener un valor.
 * Se utiliza eval0, eval1, eval2 ... etc.
 *
 * Percentages: Nombre y fórmula para obtener un valor porcentual.
 * Se utiliza percentage0, percentage1, percentage2 ... etc.
 *
 * Gauges: Coloca una barra de medición similar a las de vida. Puedes
 * configurar el nómbre, fórmulas para los valores actual y máximo, colores de
 * la barra si mostrar ambos valores o solo el actual.
 * Se utiliza gauge0, gauge1, gauge2 ... etc.
 *
 * ============================================================================
 * Comandos de complemento
 * ============================================================================
 *
 * resetStatusInfoData actor place
 *  - Reinicia la información a mostrar del actor. Puedes usar los comandos all,
 *    statuscol1, statuscol2, statuscol3, statuscols, statusgauge1,
 *    statusgauge2, statusgauges, menugauge1, menugauge2, menugauge3,
 *    menugauges, equip y battle.
 *
 * changeStatusInfoData actor place names
 *  - Cambia la información a mostrar del actor. Puedes usar los comandos
 *    statuscol1, statuscol2, statuscol3, statusgauge1, statusgauge2,
 *    menugauge1, menugauge2, menugauge3, equip y battle.
 *
 * ============================================================================
 * Incompatibilidades
 * ============================================================================
 *
 * Puede ser incompatible con otros plugins similares.
 *
 * ============================================================================
 * Problemas conocidos
 * ============================================================================
 *
 * Puede interferir con otros plugins similares. Pero puede combinarse
 * con otros.
 *
 * ============================================================================
 * Historial de versiones
 * ============================================================================
 *
 * Versión 1.06:
 * - Permite cambiar los ajustes de los personajes durante la partida.
 *
 * Versión 1.05:
 * - Permite la edición de medidores en la pantalla de batalla.
 *
 * Versión 1.04:
 * - Añadido el uso de cparams (parámetros de medición).
 * - Permite la edición de medidores de distintos menús.
 * - Se ha eliminado el antiguo sistema obsoleto.
 *
 * Versión 1.03:
 * - Añadida columna para el menú de equipamiento.
 * - Añadidas fórmulas personalizadas para obtener valores de medición.
 * - Uso del sistema de parámetros del 1.5.0.
 *
 * Versión 1.02:
 * - Añadidas fórmulas personalizadas para obtener valores.
 * - Añadidas columnas personalizadas para personajes específicos.
 *
 * Versión 1.01:
 * - Permite mostrar los parámetros especiales y extra.
 *
 * Versión 1.00:
 * - Complemento terminado.
 *
 * ============================================================================
 *
 * Para juegos comerciales y no comerciales.
 * Se debe incluir a ICF-Soft en los créditos.
 * Esta cabecera debe incluirse íntegramente con el plugin.
 *
 * ============================================================================
 */
/*~struct~Evals:
 * @param Name
 * @desc A name to show inside status menu.
 * @default
 *
 * @param Formula
 * @desc Custom formula to show a value.
 * @default
 *
 */
/*~struct~Percents:
 * @param Name
 * @desc A name to show inside status menu.
 * @default
 *
 * @param Formula
 * @desc Custom formula to show a percentage value.
 * @default
 *
 */
/*~struct~Gauges:
 * @param Name
 * @desc A name to show inside status menu.
 * @default
 *
 * @param Current
 * @desc Custom formula to show a percentage value.
 * @default
 *
 * @param Max
 * @desc Custom formula to show a percentage value.
 * @default
 *
 * @param Color1
 * @desc First color for gauge. Can be a html code or a number.
 * @default
 *
 * @param Color2
 * @desc Second color for gauge. Can be a html code or a number.
 * @default
 *
 * @param Show Current and Max
 * @desc When true it shows current and max values.
 * @default true
 *
 */
/*~struct~Evals:es
 * @param Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default
 *
 * @param Formula
 * @desc Fórmula personalizada para obtener un valor.
 * @default
 *
 */
/*~struct~Percents:es
 * @param Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default
 *
 * @param Formula
 * @desc Fórmula personalizada para obtener un valor porcentual.
 * @default
 *
 */
/*~struct~Gauges:es
 * @param Name
 * @desc Nombre a mostrar en el menú de estado.
 * @default
 *
 * @param Current
 * @desc Fórmula personalizada para obtener un valor actual.
 * @default
 *
 * @param Max
 * @desc Fórmula personalizada para obtener un valor máximo.
 * @default
 *
 * @param Color1
 * @desc Primer color de la barra. Se puede usar un color html o un número.
 * @default
 *
 * @param Color2
 * @desc Segundo color de la barra. Se puede usar un color html o un número.
 * @default
 *
 * @param Show Current and Max
 * @desc Si está activado mostrará los valores actual y máximo.
 * @default true
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

ICF.Parameters = PluginManager.parameters('ICFSoft_StatusMenu');
ICF.Param = ICF.Param || {};

ICF.Param.MainMenuGauge1 = ICF.Parameters['Main menu gauges1'].toLowerCase().trim().split(/\s+/);
ICF.Param.MainMenuGauge2 = ICF.Parameters['Main menu gauges2'].toLowerCase().trim().split(/\s+/);
ICF.Param.MainMenuGauge3 = ICF.Parameters['Main menu gauges3'].toLowerCase().trim().split(/\s+/);
ICF.Param.StatusMenuGauge1 = ICF.Parameters['Status menu gauges1']
  .toLowerCase()
  .trim()
  .split(/\s+/);
ICF.Param.StatusMenuGauge2 = ICF.Parameters['Status menu gauges2']
  .toLowerCase()
  .trim()
  .split(/\s+/);
ICF.Param.StatusMenuCol1 = ICF.Parameters['Column1'].toLowerCase().trim().split(/\s+/);
ICF.Param.StatusMenuCol2 = ICF.Parameters['Column2'].toLowerCase().trim().split(/\s+/);
ICF.Param.StatusMenuCol3 = ICF.Parameters['Column3'].toLowerCase().trim().split(/\s+/);
ICF.Param.EquipStatusMenuCol = ICF.Parameters['Equip Column'].toLowerCase().trim().split(/\s+/);
ICF.Param.BattleStatusCol = ICF.Parameters['Battle Status Gauges']
  .toLowerCase()
  .trim()
  .split(/\s+/);
ICF.Param.BattleStatusGaugeLength = Number(ICF.Parameters['Battle Status Gauge Length']) || 330;
ICF.Param.PercentageParams = ICF.Parameters['Percentage params'].toLowerCase().split(/\s+/);

if (ICF.Param.StatusMenuCol1[0] == '') ICF.Param.StatusMenuCol1.shift();
if (ICF.Param.StatusMenuCol2[0] == '') ICF.Param.StatusMenuCol2.shift();
if (ICF.Param.StatusMenuCol3[0] == '') ICF.Param.StatusMenuCol3.shift();
if (ICF.Param.StatusMenuGauge1[0] == '') ICF.Param.StatusMenuGauge1.shift();
if (ICF.Param.StatusMenuGauge2[0] == '') ICF.Param.StatusMenuGauge2.shift();
if (ICF.Param.MainMenuGauge1[0] == '') ICF.Param.MainMenuGauge1.shift();
if (ICF.Param.MainMenuGauge2[0] == '') ICF.Param.MainMenuGauge2.shift();
if (ICF.Param.MainMenuGauge3[0] == '') ICF.Param.MainMenuGauge3.shift();
if (ICF.Param.EquipStatusMenuCol[0] == '') ICF.Param.EquipStatusMenuCol.shift();
if (ICF.Param.BattleStatusCol[0] == '') ICF.Param.BattleStatusCol.shift();

if (!Imported.ICFSoft_ParamCore) {
  ICF.Param.NParams = [];
  ICF.Param.PParams = [];
  ICF.Param.CParams = [];
  ICF.Param.CParamsMax = [];
  ICF.Param.BParams = ['mhp', 'mmp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk'];
  ICF.Param.XParamsFullName = [];
  ICF.Param.XParams = ['hit', 'eva', 'cri', 'cev', 'mev', 'mrf', 'cnt', 'hrg', 'mrg', 'trg'];
  ICF.Param.SParamsFullName = [];
  ICF.Param.SParams = ['tgr', 'grd', 'rec', 'pha', 'mcr', 'tcr', 'pdr', 'mdr', 'fdr', 'exr'];

  for (var i = 0; i < 10; i++) {
    ICF.Param.XParamsFullName[i] = String(ICF.Parameters['XParam' + i + ' Full Name']);
    ICF.Param.SParamsFullName[i] = String(ICF.Parameters['SParam' + i + ' Full Name']);
  }
}

ICF.Param.EvalParams = [];
ICF.Param.EvalPercentParams = [];
ICF.Param.EvalGauges = [];

if (!Imported.ICFSoft_MainUtility) {
  ICF.MainUtility = ICF.MainUtility || {};
  ICF.MainUtility.validateColor = function (color) {
    if (!isNaN(Number(color))) return Number(color);
    try {
      var btm = new Bitmap(2, 2);
      var gra = btm._context.createLinearGradient(1, 1, 1, 2);
      gra.addColorStop(1, color);
      return color;
    } catch (e) {
      return 'rgba(0,0,0,0)';
    }
    return 'rgba(0,0,0,0)';
  };
}

ICF.temp = JSON.parse(ICF.Parameters['Evaluables']);
for (var i = 0; i < ICF.temp.length; i++) {
  ICF.temp[i] = JSON.parse(ICF.temp[i]);
  ICF.Param.EvalParams[i] = [];
  ICF.Param.EvalParams[i][0] = ICF.temp[i]['Name'];
  ICF.Param.EvalParams[i][1] = ICF.temp[i]['Formula'];
}
ICF.temp = JSON.parse(ICF.Parameters['Percentages']);
for (var i = 0; i < ICF.temp.length; i++) {
  ICF.temp[i] = JSON.parse(ICF.temp[i]);
  ICF.Param.EvalPercentParams[i] = [];
  ICF.Param.EvalPercentParams[i][0] = ICF.temp[i]['Name'];
  ICF.Param.EvalPercentParams[i][1] = ICF.temp[i]['Formula'];
}
ICF.temp = JSON.parse(ICF.Parameters['Gauges']);
for (var i = 0; i < ICF.temp.length; i++) {
  ICF.temp[i] = JSON.parse(ICF.temp[i]);
  ICF.Param.EvalGauges[i] = [];
  ICF.Param.EvalGauges[i][0] = ICF.temp[i]['Name'];
  ICF.Param.EvalGauges[i][1] = ICF.temp[i]['Current'];
  ICF.Param.EvalGauges[i][2] = ICF.temp[i]['Max'];
  ICF.Param.EvalGauges[i][3] = ICF.MainUtility.validateColor(ICF.temp[i]['Color1']);
  ICF.Param.EvalGauges[i][4] = ICF.MainUtility.validateColor(ICF.temp[i]['Color2']);
  ICF.Param.EvalGauges[i][5] = ICF.temp[i]['Show Current and Max'].toLowerCase() === 'true';
}

//=============================================================================
// DataManager
//=============================================================================

ICF.StatusMenu.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
  if (!ICF.StatusMenu.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!ICF.StatusMenu.Procesed) {
    ICF.NotetagsProcessor.statusMenu($dataActors);
    ICF.StatusMenu.Procesed = true;
  }
  return true;
};

ICF.NotetagsProcessor.statusMenu = function (group) {
  var note1 = /<(?:STATUS[-_ ]MENU[-_ ]COL[-_ ])(\d)[ ]+((?:[\w-_]+\s*)+)>/i;
  var note2 = /<(?:EQUIP[-_ ]STATUS[-_ ]MENU[-_ ]COL)[ ]+((?:[\w-_]+\s*)+)>/i;
  var note3 = /<(?:STATUS[-_ ]MENU[-_ ]GAUGES[-_ ])(\d)[ ]+((?:[\w-_]+\s*)+)>/i;
  var note4 = /<(?:MAIN[-_ ]MENU[-_ ]INFO[-_ ]GAUGES[-_ ])(\d)[ ]+((?:[\w-_]+\s*)+)>/i;
  var note5 = /<(?:BATTLE[-_ ]STATUS[-_ ]MENU[-_ ]COL)[ ]+((?:[\w-_]+\s*)+)>/i;

  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.StatusMenuCols = [];
    obj.StatusMenuGauges = [];
    obj.EquipStatusMenuCol = [];
    obj.MainMenuGauges = [];
    obj.BattleStatusCol = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.StatusMenuCols[Number(RegExp.$1)] = RegExp.$2.toLowerCase().trim().split(/\s+/);
      } else if (line.match(note2)) {
        obj.EquipStatusMenuCol = RegExp.$1.toLowerCase().trim().split(/\s+/);
      } else if (line.match(note3)) {
        obj.StatusMenuGauges[Number(RegExp.$1)] = RegExp.$2.toLowerCase().trim().split(/\s+/);
      } else if (line.match(note4)) {
        obj.MainMenuGauges[Number(RegExp.$1)] = RegExp.$2.toLowerCase().trim().split(/\s+/);
      } else if (line.match(note5)) {
        obj.BattleStatusCol = RegExp.$1.toLowerCase().trim().split(/\s+/);
      }
    }
  }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.statusMenuCols = function () {
  var st0 = $dataActors[this._actorId].StatusMenuCols;
  var st1 = this._statusMenuCols || [[], [], [], []];
  var st2 = [];
  st2[1] = st1[1].length > 0 ? st1[1] : st0[1] || ICF.Param.StatusMenuCol1;
  st2[2] = st1[2].length > 0 ? st1[2] : st0[2] || ICF.Param.StatusMenuCol2;
  st2[3] = st1[3].length > 0 ? st1[3] : st0[3] || ICF.Param.StatusMenuCol3;
  return st2;
};

Game_Actor.prototype.statusMenuInfo = function () {
  var st0 = $dataActors[this._actorId].StatusMenuGauges;
  var st1 = this._statusMenuInfo || [[], [], [], []];
  var st2 = [];
  st2[1] = st1[1].length > 0 ? st1[1] : st0[1] || ICF.Param.StatusMenuGauge1;
  st2[2] = st1[2].length > 0 ? st1[2] : st0[2] || ICF.Param.StatusMenuGauge2;
  return st2;
};

Game_Actor.prototype.mainMenuInfo = function () {
  var st0 = $dataActors[this._actorId].MainMenuGauges;
  var st1 = this._mainMenuInfo || [[], [], [], []];
  var st2 = [];
  st2[1] = st1[1].length > 0 ? st1[1] : st0[1] || ICF.Param.MainMenuGauge1;
  st2[2] = st1[2].length > 0 ? st1[2] : st0[2] || ICF.Param.MainMenuGauge2;
  st2[3] = st1[3].length > 0 ? st1[3] : st0[3] || ICF.Param.MainMenuGauge3;
  return st2;
};

Game_Actor.prototype.eqStatusMenuCols = function () {
  var st0 = $dataActors[this._actorId].EquipStatusMenuCol;
  var st1 = this._eqStatusMenuCols || [];
  var st2 = st1.length > 0 ? st1 : st0.length > 0 ? st0 : ICF.Param.EquipStatusMenuCol;
  return st2;
};

Game_Actor.prototype.battleStatusCols = function () {
  var st0 = $dataActors[this._actorId].BattleStatusCol;
  var st1 = this._battleStatusCols || [];
  var st2 = st1.length > 0 ? st1 : st0.length > 0 ? st0 : ICF.Param.BattleStatusCol;
  return st2;
};

Game_Actor.prototype.changeStatusInfoData = function (name, array) {
  if (!this._statusMenuCols) this._statusMenuCols = [[], [], [], []];
  if (!this._statusMenuInfo) this._statusMenuInfo = [[], [], [], []];
  if (!this._mainMenuInfo) this._mainMenuInfo = [[], [], [], []];
  if (!this._eqStatusMenuCols) this._eqStatusMenuCols = [];
  if (!this._battleStatusCols) this._battleStatusCols = [];
  if (!Array.isArray(array)) return;
  switch (name) {
    case 'statuscol1':
      this._statusMenuCols[1] = array;
      break;
    case 'statuscol2':
      this._statusMenuCols[2] = array;
      break;
    case 'statuscol3':
      this._statusMenuCols[3] = array;
      break;
    case 'statusgauge1':
      this._statusMenuInfo[1] = array;
      break;
    case 'statusgauge2':
      this._statusMenuInfo[2] = array;
      break;
    case 'statusgauge3':
      this._statusMenuInfo[3] = array;
      break;
    case 'menugauge1':
      this._mainMenuInfo[1] = array;
      break;
    case 'menugauge2':
      this._mainMenuInfo[2] = array;
      break;
    case 'menugauge3':
      this._mainMenuInfo[3] = array;
      break;
    case 'equip':
      this._eqStatusMenuCols = array;
      break;
    case 'battle':
      this._battleStatusCols = array;
      break;
  }
};

Game_Actor.prototype.resetStatusInfoData = function (name) {
  switch (name) {
    case 'all':
      this._statusMenuCols = [[], [], [], []];
      this._statusMenuInfo = [[], [], [], []];
      this._mainMenuInfo = [[], [], [], []];
      this._eqStatusMenuCols = [];
      this._battleStatusCols = [];
      break;
    case 'statuscol1':
      this._statusMenuCols[1] = [];
      break;
    case 'statuscol2':
      this._statusMenuCols[2] = [];
      break;
    case 'statuscol3':
      this._statusMenuCols[3] = [];
      break;
    case 'statuscols':
      this._statusMenuCols = [[], [], [], []];
      break;
    case 'statusgauge1':
      this._statusMenuInfo[1] = [];
      break;
    case 'statusgauge2':
      this._statusMenuInfo[2] = [];
      break;
    case 'statusgauge3':
      this._statusMenuInfo[3] = [];
      break;
    case 'statusgauges':
      this._statusMenuInfo = [[], [], [], []];
      break;
    case 'menugauge1':
      this._mainMenuInfo[1] = [];
      break;
    case 'menugauge2':
      this._mainMenuInfo[2] = [];
      break;
    case 'menugauge3':
      this._mainMenuInfo[3] = [];
      break;
    case 'menugauges':
      this._mainMenuInfo = [[], [], [], []];
      break;
    case 'equip':
      this._eqStatusMenuCols = [];
      break;
    case 'battle':
      this._battleStatusCols = [];
      break;
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

ICF.StatusMenu.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  ICF.StatusMenu.pluginCommand.call(this, command, args);
  if (command.toLowerCase() === 'resetstatusinfodata' && args.length > 1) {
    var actor = $gameActors.actor(args[0]);
    if (actor) actor.resetStatusInfoData(args[1] || 'all');
  } else if (command.toLowerCase() == 'changestatusinfodata' && args.length > 2) {
    var actor = $gameActors.actor(args.shift());
    if (actor) actor.changeStatusInfoData(args.shift(), args);
  }
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
  var st = actor.mainMenuInfo();
  var lineHeight = this.lineHeight();
  var x2 = x + 180;
  var width2 = Math.min(200, width - 180 - this.textPadding());
  this.drawActorName(actor, x, y);
  this.drawActorLevel(actor, x, y + lineHeight * 1);
  this.drawActorIcons(actor, x, y + lineHeight * 2);
  this.drawActorClass(actor, x2, y);
  this.drawGaugesLine(actor, x2, y + lineHeight * 1, st[1], 0);
  this.drawGaugesLine(actor, x2, y + lineHeight * 2, st[2], 0);
  this.drawGaugesLine(actor, x2, y + lineHeight * 3, st[3], 0);
};

if (Imported.YEP_CoreEngine) {
  Window_Base.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
    var st = actor.mainMenuInfo();
    var lineHeight = this.lineHeight();
    var xpad = Window_Base._faceWidth + 2 * Yanfly.Param.TextPadding;
    var x2 = x + xpad;
    var width2 = Math.max(180, width - xpad - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y, width2);
    this.drawGaugesLine(actor, x2, y + lineHeight * 1, st[1], 0);
    this.drawGaugesLine(actor, x2, y + lineHeight * 2, st[2], 0);
    this.drawGaugesLine(actor, x2, y + lineHeight * 3, st[3], 0);
  };
}

Window_Base.prototype.drawCParamGauge = function (actor, param, x, y, width) {
  width = width || 186;
  var color1 = ICF.Param.CParamColor1[param];
  var color2 = ICF.Param.CParamColor2[param];
  color1 = isNaN(color1) ? color1 : this.textColor(color1);
  color2 = isNaN(color2) ? color2 : this.textColor(color2);
  var rate = actor.CParamValue(param) / actor.CParam(param);
  this.drawGauge(x, y, width, rate, color1, color2);
  this.changeTextColor(this.systemColor());
  this.drawText(ICF.Param.CParamsAbreviation[param], x, y, 44);
  this.drawCurrentAndMax(
    actor.CParamValue(param),
    actor.CParam(param),
    x + 44,
    y,
    width - 44,
    this.normalColor(),
    this.normalColor(),
  );
};

Window_Base.prototype.drawEvalGauge = function (actor, gauge, x, y, width) {
  width = width || 186;
  var color1 = gauge[3];
  var color2 = gauge[4];
  color1 = isNaN(color1) ? color1 : this.textColor(color1);
  color2 = isNaN(color2) ? color2 : this.textColor(color2);
  var rate = gauge[1] / gauge[2];
  this.drawGauge(x, y, width, rate, color1, color2);
  this.changeTextColor(this.systemColor());
  this.drawText(gauge[0], x, y, 44);
  this.drawCurrentAndMax(gauge[1], gauge[2], x, y, width, this.normalColor(), this.normalColor());
};

Window_Base.prototype.drawGaugesLine = function (actor, x, y, st, margin) {
  if (!st || st.length < 1) return;
  let width = (this.contentsWidth() - x - this.textPadding() - margin) / 2;
  var max = Math.trunc(Math.min(width / 100, st.length));
  var width2 = Math.trunc(width / max);
  for (var i = 0; i < max; i++) {
    if (st[i] == 'hp') this.drawActorHp(actor, x + width2 * i, y, width2 - this.textPadding());
    else if (st[i] == 'mp') this.drawActorMp(actor, x + width2 * i, y, width2 - this.textPadding());
    else if (st[i] == 'tp') this.drawActorTp(actor, x + width2 * i, y, width2 - this.textPadding());
    else if (ICF.Param.CParams.contains(st[i])) {
      var param = ICF.Param.CParams.indexOf(st[i]);
      this.drawCParamGauge(actor, param, x + width2 * i, y, width2 - this.textPadding());
    }
    if (st[i].match(/(?:gauge)(\d+)/i)) {
      var paramId = ICF.Param.EvalGauges[RegExp.$1];
      var gauge = [];
      gauge.push(paramId[0]);
      gauge.push(eval(paramId[1]));
      gauge.push(eval(paramId[2]));
      gauge.push(paramId[3]);
      gauge.push(paramId[4]);
      gauge.push(paramId[5]);
      this.drawEvalGauge(actor, gauge, x + width2 * i, y, width2 - this.textPadding());
    }
  }
};

//=============================================================================
// Window_Status
//=============================================================================

Window_Status.prototype.drawBlock2 = function (y) {
  var st = this._actor.statusMenuInfo();
  this.drawActorFace(this._actor, 12, y);
  this.drawBasicInfo(204, y, st);
  this.drawExpInfo(this.contentsWidth() - 570 - this.textPadding(), y);
};

ICF.StatusMenu.drawBasicInfoOldStyle = Window_Status.prototype.drawBasicInfo;
Window_Status.prototype.drawBasicInfo = function (x, y, st) {
  if (st == undefined) {
    ICF.StatusMenu.drawBasicInfoOldStyle.call(this, x, y);
    return;
  }
  var lineHeight = this.lineHeight();
  this.drawActorLevel(this._actor, x, y + lineHeight * 0);
  this.drawActorIcons(this._actor, x, y + lineHeight * 1);
  this.drawGaugesLine(this._actor, x, y + lineHeight * 2, st[1], 290);
  this.drawGaugesLine(this._actor, x, y + lineHeight * 3, st[2], 290);
};

Window_Status.prototype.drawBlock3 = function (y) {
  var st = this._actor.statusMenuCols();

  if (st[1].length == 0) {
    this.drawEquipments(this.contentsWidth() / 2, y);
  } else if (st[2].length == 0) {
    var width = this.contentsWidth() / 2 - this.textPadding() * 3;
    this.drawParameters(this.textPadding(), y, width, st[1]);
    this.drawEquipments(this.contentsWidth() / 2 + this.textPadding(), y);
  } else if (st[3].length == 0) {
    var width = this.contentsWidth() / 3 - this.textPadding() * 4;
    this.drawParameters(this.textPadding(), y, width, st[1]);
    this.drawParameters(this.contentsWidth() / 3 + this.textPadding(), y, width, st[2]);
    this.drawEquipments((this.contentsWidth() * 2) / 3 + this.textPadding(), y);
  } else {
    var width = this.contentsWidth() / 4 - this.textPadding() * 5;
    this.drawParameters(this.textPadding(), y, width, st[1]);
    this.drawParameters(this.contentsWidth() / 4 + this.textPadding(), y, width, st[2]);
    this.drawParameters((this.contentsWidth() * 2) / 4 + this.textPadding(), y, width, st[3]);
    this.drawEquipments((this.contentsWidth() * 3) / 4 + this.textPadding(), y);
  }
};

ICF.StatusMenu.drawParamsOldStyle = Window_Status.prototype.drawParameters;
Window_Status.prototype.drawParameters = function (x, y, width, ary) {
  if (width == undefined || ary == undefined) {
    ICF.StatusMenu.drawParamsOldStyle.call(this, x, y);
    return;
  }
  var lineHeight = this.lineHeight();
  var y2 = y;
  var actor = this._actor;
  for (var i = 0; i < ary.length; i++) {
    var param = [];
    var gauge = false;
    if (ICF.Param.NParams.indexOf(ary[i]) > -1) {
      var paramId = ICF.Param.NParams.indexOf(ary[i]);
      param.push(ICF.Param.NParamsFullName[paramId]);
      param.push(actor.NParam(paramId));
    } else if (ICF.Param.PParams.indexOf(ary[i]) > -1) {
      var paramId = ICF.Param.PParams.indexOf(ary[i]);
      param.push(ICF.Param.PParamsFullName[paramId]);
      if (ICF.Param.PercentageParams.indexOf(ary[i]) > -1 || ICF.Param.PParamIsPercent[paramId]) {
        param.push((actor.PParam(paramId) * 100).toFixed(2) + '%');
      } else {
        param.push(Math.trunc(actor.PParam(paramId)));
      }
    } else if (ICF.Param.CParams.indexOf(ary[i]) > -1) {
      var paramId = ICF.Param.CParams.indexOf(ary[i]);
      param.push(ICF.Param.CParamsFullName[paramId]);
      param.push(actor.CParamValue(paramId));
      param.push(actor.CParam(paramId));
      param.push(ICF.Param.CParamColor1[paramId]);
      param.push(ICF.Param.CParamColor2[paramId]);
      gauge = true;
    } else if (ICF.Param.CParamsMax.indexOf(ary[i]) > -1) {
      var paramId = ICF.Param.CParamsMax.indexOf(ary[i]);
      param.push(ICF.Param.CParamsMaxFullName[paramId]);
      param.push(actor.CParam(paramId));
    } else if (ICF.Param.BParams.indexOf(ary[i]) > -1) {
      var paramId = ICF.Param.BParams.indexOf(ary[i]);
      param.push(TextManager.param(paramId));
      param.push(actor.param(paramId));
    } else if (ICF.Param.XParams.indexOf(ary[i]) > -1) {
      var paramId = ICF.Param.XParams.indexOf(ary[i]);
      param.push(ICF.Param.XParamsFullName[paramId]);
      param.push((actor.xparam(paramId) * 100).toFixed(2) + '%');
    } else if (ICF.Param.SParams.indexOf(ary[i]) > -1) {
      var paramId = ICF.Param.SParams.indexOf(ary[i]);
      param.push(ICF.Param.SParamsFullName[paramId]);
      param.push((actor.sparam(paramId) * 100).toFixed(2) + '%');
    } else if (ary[i].match(/(?:eval)(\d+)/i)) {
      var paramId = ICF.Param.EvalParams[RegExp.$1];
      param.push(paramId[0]);
      param.push(eval(paramId[1]));
    } else if (ary[i].match(/(?:percentage)(\d+)/i)) {
      var paramId = ICF.Param.EvalPercentParams[RegExp.$1];
      param.push(paramId[0]);
      param.push((eval(paramId[1]) * 100).toFixed(2) + '%');
    } else if (ary[i].match(/(?:gauge)(\d+)/i)) {
      var paramId = ICF.Param.EvalGauges[RegExp.$1];
      param.push(paramId[0]);
      param.push(eval(paramId[1]));
      param.push(eval(paramId[2]));
      param.push(paramId[3]);
      param.push(paramId[4]);
      param.push(paramId[5]);
      gauge = true;
    }
    if (gauge) {
      var color1 = isNaN(param[3]) ? param[3] : this.textColor(param[3]);
      var color2 = isNaN(param[4]) ? param[4] : this.textColor(param[4]);
      this.drawGauge(x, y2, width, (param[1] / param[2]).clamp(0.0, 1.0), color1, color2);
      if (param[5]) {
        var wd = this.textWidth(param[1] + '/' + param[2]);
        this.changeTextColor(this.systemColor());
        this.drawText(param[0], x, y2, width - wd);
        this.drawCurrentAndMax(
          param[1],
          param[2],
          x + wd,
          y2,
          width - wd,
          this.normalColor(),
          this.normalColor(),
        );
      } else {
        this.changeTextColor(this.systemColor());
        this.drawText(param[0], x, y2, (width * 2) / 3);
        this.resetTextColor();
        this.drawText(param[1], x + (width * 2) / 3, y2, width / 3, 'right');
      }
    } else if (param.length > 0) {
      this.changeTextColor(this.systemColor());
      this.drawText(param[0], x, y2, (width * 2) / 3);
      this.resetTextColor();
      this.drawText(param[1], x + width / 3, y2, width / 3, 'right');
    }
    y2 += lineHeight;
  }
};

//=============================================================================
// Window_EquipStatus
//=============================================================================

Window_EquipStatus.prototype.refresh = function () {
  this.contents.clear();
  var st = [];
  if (this._actor) st = this._actor.eqStatusMenuCols();
  if (st.length > 0) {
    this.drawActorName(this._actor, this.textPadding(), 0);
    for (var i = 0; i < st.length; i++) {
      var param = null;
      var paramId = null;
      var percentage = false;
      var evaluate = null;
      if (ICF.Param.NParams.indexOf(st[i]) > -1) {
        paramId = ICF.Param.NParams.indexOf(st[i]);
        param = ICF.Param.NParams[paramId];
        paramId = ICF.Param.NParamsFullName[paramId];
      } else if (ICF.Param.PParams.indexOf(st[i]) > -1) {
        paramId = ICF.Param.PParams.indexOf(st[i]);
        param = ICF.Param.PParams[paramId];
        if (ICF.Param.PercentageParams.indexOf(st[i]) > -1 || ICF.Param.PParamIsPercent[paramId])
          percentage = true;
        paramId = ICF.Param.PParamsFullName[paramId];
      } else if (ICF.Param.CParamsMax.indexOf(st[i]) > -1) {
        paramId = ICF.Param.CParamsMax.indexOf(st[i]);
        param = ICF.Param.CParamsMax[paramId];
        paramId = ICF.Param.CParamsMaxFullName[paramId];
      } else if (ICF.Param.BParams.indexOf(st[i]) > -1) {
        paramId = ICF.Param.BParams.indexOf(st[i]);
        param = ICF.Param.BParams[paramId];
        paramId = TextManager.param(paramId);
      } else if (ICF.Param.XParams.indexOf(st[i]) > -1) {
        paramId = ICF.Param.XParams.indexOf(st[i]);
        param = ICF.Param.XParams[paramId];
        paramId = ICF.Param.XParamsFullName[paramId];
        percentage = true;
      } else if (ICF.Param.SParams.indexOf(st[i]) > -1) {
        paramId = ICF.Param.SParams.indexOf(st[i]);
        param = ICF.Param.SParams[paramId];
        paramId = ICF.Param.SParamsFullName[paramId];
        percentage = true;
      } else if (st[i].match(/(?:eval)(\d+)/i)) {
        paramId = ICF.Param.EvalParams[RegExp.$1];
        param = paramId[0];
        evaluate = paramId[1];
        paramId = param;
      } else if (st[i].match(/(?:percentage)(\d+)/i)) {
        paramId = ICF.Param.EvalPercentParams[RegExp.$1];
        param = paramId[0];
        evaluate = paramId[1];
        paramId = param;
        percentage = true;
      }
      if (param !== null) {
        this.drawItem(0, this.lineHeight() * (1 + i), paramId, param, percentage, evaluate);
      }
    }
  }
  this.resetTextColor();
};

// MODIFIED: Increase width to fit long Japanese and English content
Window_EquipStatus.prototype.drawItem = function (x, y, paramId, paramName, percentage, evaluate) {
  this.changeTextColor(this.systemColor());
  this.drawText(paramId, x + this.textPadding(), y, 120);
  this.resetTextColor();
  if (this._actor) {
    this.drawCurrentParam(x + 180, y, paramId, paramName, percentage, evaluate);
  }
  this.drawRightArrow(x + 240, y);
  if (this._tempActor) {
    this.drawNewParam(x + 300, y, paramId, paramName, percentage, evaluate);
  }
};

Window_EquipStatus.prototype.drawCurrentParam = function (
  x,
  y,
  paramId,
  paramName,
  percentage,
  evaluate,
) {
  this.resetTextColor();
  var actor = this._actor;
  var text = evaluate !== null ? eval(evaluate) : this._actor[paramName];
  if (percentage) text = (text * 100).toFixed(text < 0.1 ? 2 : text < 0.5 ? 1 : 0) + '%';
  else text = Math.trunc(text);
  this.drawText(text, x, y, 48, 'right');
};

Window_EquipStatus.prototype.drawNewParam = function (
  x,
  y,
  paramId,
  paramName,
  percentage,
  evaluate,
) {
  var actor = this._tempActor;
  var newValue = evaluate !== null ? eval(evaluate) : this._tempActor[paramName];
  actor = this._actor;
  var oldValue = evaluate !== null ? eval(evaluate) : this._actor[paramName];
  this.changeTextColor(this.paramchangeTextColor(newValue - oldValue));
  if (percentage)
    newValue = (newValue * 100).toFixed(newValue < 0.1 ? 2 : newValue < 0.5 ? 1 : 0) + '%';
  else newValue = Math.trunc(newValue);
  this.drawText(newValue, x, y, 48, 'right');
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.gaugeAreaWidth = function () {
  return ICF.Param.BattleStatusGaugeLength;
};

ICF.StatusMenu.drawBattleInfoOldStyle = Window_BattleStatus.prototype.drawGaugeArea;
Window_BattleStatus.prototype.drawGaugeArea = function (rect, actor) {
  var st = actor.battleStatusCols();
  if (st.length < 1) {
    ICF.StatusMenu.drawBattleInfoOldStyle.call(this, rect, actor);
    return;
  }
  this.drawGaugesLine(actor, rect.x, rect.y, st, 0);
};

//=============================================================================
// End of File
//=============================================================================
