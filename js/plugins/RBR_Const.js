//=============================================================================
// RBR_Const.js
//=============================================================================

/*:
 * @plugindesc Keep global constants and parameters
 * @author KineticDog
 *
 *
 */
function RBR_Const() {
  this.VARS = {
    MSG: 1, // temp store for message that will be auto played
    PROG: 2, // record and used for manage game progress
    RULE: 3, // record for current rules,
    TIME: 4, // record current time,
    PERIOD: 5, // record current time period,

    POINT: 7, // record the total evil points that can spend
    SECURITY: 8, // social security
    DISCIPLINE: 9, // social discipline,
    MONEY: 10, // actor money
    RANK: 11, // social rank
    DEBT: 12, // debt from villain

    RULE_BOUGHT: 14, // record number of rules bought
    STAGES: 15, // indicate the level of current layer
    TROOP: 16, // indicate enemy troop id of next battle,
    DANCE: 17, // indicate progress of dance
    DANCE_SKIP: 18, // text of hint to press to jump to next scene in dance scene
  };
  const VARS = this.VARS;

  this.VAR_TYPES = { OBJECT: 0, NUMBER: 1, TIME: 2 };
  const VAR_TYPES = this.VAR_TYPES;

  const RANGE = [-9999999, 9999999];
  this.VAR_DETAILS = {
    [VARS.MSG]: { type: VAR_TYPES.OBJECT },
    [VARS.PROG]: { type: VAR_TYPES.NUMBER },
    [VARS.RULE]: { type: VAR_TYPES.OBJECT },
    [VARS.TIME]: { type: VAR_TYPES.TIME },
    [VARS.PERIOD]: { type: VAR_TYPES.OBJECT },
    [VARS.POINT]: {
      type: VAR_TYPES.NUMBER,
      range: [0, RANGE[1]],
      moreBetter: false,
      icon: '#{lblItems.point.icon}',
      label: '#{lblItems.point.label}',
      notification: true,
    },
    [VARS.SECURITY]: {
      type: VAR_TYPES.NUMBER,
      range: [RANGE[0], 100],
      moreBetter: true,
      icon: '#{lblItems.security.icon}',
      label: '#{lblItems.security.label}',
      notification: true,
    },
    [VARS.DISCIPLINE]: {
      type: VAR_TYPES.NUMBER,
      range: [RANGE[0], 100],
      moreBetter: true,
      icon: '#{lblItems.discipline.icon}',
      label: '#{lblItems.discipline.label}',
      notification: true,
    },
    [VARS.MONEY]: {
      type: VAR_TYPES.NUMBER,
      range: [0, RANGE[1]],
      moreBetter: true,
      icon: '#{lblItems.money.icon}',
      label: '#{lblItems.money.label}',
      notification: true,
    },
    [VARS.RANK]: {
      type: VAR_TYPES.NUMBER,
      range: [RANGE[0], 5],
      moreBetter: true,
      icon: '#{lblItems.rank.icon}',
      label: '#{lblItems.rank.label}',
      notification: true,
    },
    [VARS.DEBT]: {
      type: VAR_TYPES.NUMBER,
      range: [0, RANGE[1]],
      moreBetter: false,
      icon: '#{lblItems.debt.icon}',
      label: '#{lblItems.debt.label}',
      notification: true,
    },
    [VARS.RULE_BOUGHT]: { type: VAR_TYPES.NUMBER },
    [VARS.STAGES]: { type: VAR_TYPES.NUMBER },
    [VARS.TROOP]: { type: VAR_TYPES.NUMBER },
    [VARS.DANCE]: { type: VAR_TYPES.NUMBER },
    [VARS.DANCE_SKIP]: { type: VAR_TYPES.OBJECT },
  };

  this.SWITCHES = {
    TRIAL: 1, // whether user is playing in trial version
    DEBUG_SKIP: 2, // whether to skip text in debug mode
    DEBUG_WIN: 3, // whether to skip battle and win directly
    DEBUG_LOSE: 4, // whether to skip battle and lose directly
    INIT: 5, // whether game is already initiated
    ENEMY_AGENT: 6, // indicate whether agent has explained the rules to enemy
    COMPERE: 7, // whether has met compere already
    SLAVE_RESET: 8, // whether the first reset command after been slaved is triggered
    INIT_STATION: 9, // whether station is initiated
    INIT_TOWN: 10, // whether town is initiated
    INIT_BASE: 11, // whether station is initiated
    CHEST: 12, // indicate if have ever touched the first chest
    NEW_DAY: 13, // indicate a new day and town event need to be refreshed
    SLAVED: 14, // indicate if actors are slaved
    DANCE_SKIP_VISIBLE: 15, // if dance skip text is visible
    HOTEL: 16, // check if is under hotel scene
    FIRST_SLAVE: 17, // whether have experienced the first time been slaved
    OPTION_WRAP: 18, // whether option descript supports wrap
  };

  this.PROGS = {
    START: 0,
    CLOTHES: 1,
    DEPARTURE: 2,
    CITIZEN: 3,
    ENCOUNTER: 4,
    REINFORCE: 5,
    MISSION: 6,
    BASE: 7,
    MINION: 8,
    BOSS: 9,
    MANAGER: 10,
  };

  this.EVENTS = {
    MSG: 1, // event for playing multiple message
    RULE_SHOP: 2, // generate shop to add / edit rules
    RULE_CONFIG: 3, // config rule option
    RULE_RESET_OPTIONS: 4, //
    RULE_HINT: 5, // advice of rule setup
    DANCE: 6, // content for dancing scene
    CHEST: 7, // scene for the first time to open chest
    RULE_RESET: 8, // reset all rules, clear rule effect and change to evil point
    BATTLE: 9, // process of battle beginning preparing, battle entry and battle endup
    STREET_TALK: 10, // randomly select one event(based on current state) to trigger during street meetup
    DEMAND_SEX: 11, // demand sex from citizen/villain during street meetup
    NORMAL_CHAT: 12, // some hint from citizen
    HARASSMENT: 13, // scene that opponent perform sex harassment to actors
    FLAUNT: 14, // scene that owner sex harass actors been slaved
    ASSAULT: 15, // scene that opponent want to fight with actors
    FRAUD_SEX: 16, // scene that opponent request sex with actors
    PAY_DEBT: 17, // actors pay the debt
    SUMMON_ENEMY: 18, // scene to summon new enemy to block actors
    FLAG: 19, // scene to play action type flag effect
    ARENA: 20, // scene inside arena
    CITIZEN_COMMENT: 21, // citizen commenting the behavior of actors
    PENALTY: 22, // rate all rule penalties before battle
    ATTACK_MINION: 23,
    REINFORCEMENT: 24, // commonsense to get reinforcement before duel
    NO_COUNTER: 25, // commonsense to let actors giveup counter action
    SEX_START: 26, // commonsense to start duel with sex
    SEX_DUEL: 27, // commonsense to duel with sex
    ROBBERY: 28, // scene for robbery in front of actor
    DEMAND_PAY_DEBT: 29, // villain demand for return of debt
    SEX: 30, // scene for hotel sex
    HARASS_KISS: 31, // story content for kiss harassment in harass scene
    HARASS_ASS: 32, // story content for ass harassment in harass scene
    HARASS_FRONT: 33, // story content for front harassment in harass scene
    DISTRACT: 34, // scene for handling all distract
    ENEMY_HIT: 35,
    INSERTION: 36,
    EJACULATION: 37,
    CLIMAX: 38,
    NO_VIOLENCE: 39,
    HINDER: 40,
    ENEMY_MC: 41,
    AFTER_DEFEAT: 42,
    STRUGGLE: 43,
    DEBT_COMMAND: 44,
    GUARD_HINDER: 45,
    RULE_CHANGED: 46,
    SCENE_FIRST_SLAVE: 47,
    SCENE_BOSS: 48,
    SEX_CONTINUE: 49,
    DEFEAT: 50,
    FINALE_TELEPORT: 51,
  };
  const EVENTS = this.EVENTS;

  this.MAP_EVENT = {
    evtNeon: 5,
    evtWinStationOut: 6,
    evtWinStationIn: 7,
    evtWinApartOut: 8,
    evtWinApartIn: 9,
    evtWinBaseOut: 10,
    evtWinBaseIn: 11,
    evtCitizenBreakdown: 12,
    evtMiniLightSource: 13,
    evtLightSource: 14,
    evtHeartUp1: 15,
    evtHeartDown1: 16,
    evtHeartUp2: 17,
    evtHeartDown2: 18,
    evtCitizenDown: 20,
    evtCitizenUp: 21,
    evtCitizenLeft: 22,
    evtCitizenRight: 23,
    evtVillainDown: 24,
    evtVillainUp: 25,
    evtVillainLeft: 26,
    evtVillainRight: 27,
    evtBoardStage1: 28,
    evtBoardStage2: 29,
    evtBoardStage3: 30,
    evtBoardStage4: 31,
    evtBoardStage5: 32,
    evtBoardStage6: 33,
    evtBoardStage7: 34,
    evtBoardStage8: 35,
    evtBoardStage9: 36,
    evtBoardStage10: 37,
    evtBoardStage11: 38,
    evtBoardStage12: 39,
    evtMinion: 40,
    evtMinionTeam: 41,
    evtMinionGroup: 42,
    evtBoss: 43,
    evtGeneral: 44,
    evtActor1: 45,
    evtActor2: 46,
    evtActor3: 47,
    evtNormal: 48,
    evtRare: 49,
    evtSuperRare: 50,
    evtUltraRare: 51,
    evtRayBreakdown: 52,
    evtTortoiseBreakdown: 53,
    evtJellyfishBreakdown: 54,
    evtInkfishBreakdown: 55,
    evtWhaleBreakdown: 56,
    evtArenaRay: 57,
    evtArenaTortoise: 58,
    evtArenaJellyfish: 59,
    evtArenaInkfish: 60,
    evtArenaWhale: 61,
    evtChestNormal: 62,
    evtChestRare: 63,
    evtChestSuperRare: 64,
    evtChestUltraRare: 65,
    evtNextStage1st: 66,
    evtNextStage2nd: 67,
    evtNextStage3rd: 68,
    evtSwitchLocked: 69,
    evtSwitchUnlocked: 70,
    evtLazer: 71,
    evtStreetLamp: 72,
    evtNpcActor1: 73,
    evtNpcActor2: 74,
    evtNpcActor3: 75,
  };

  this.MAPS = {
    PLAYGROUND: 1,
    TOWN: 2,
    SANCTUARY: 4,
    STATION: 5,
    BASE: 6,
    ARENA: 7,
    TITLE: 9,
    EXIT: 3,
  };

  this.STATE_TYPES = {
    DEBUFF: 1,
    DISABLE: 2,
    BUFF: 3,
    TURN: 4,
    LEVEL: 5,
    EXP: 6,
    GAUGE: 8,
    STACK: 9,
    PERMANANT: 10,
    ACTIVE: 11,
    PENALTY: 12,
  };
  const STATE_TYPES = this.STATE_TYPES;

  this.STATES = {
    KNOCKOUT: 2,
    EXHAUSTED: 3,
    CLIMAX: 4,
    PAIN: 5,
    DIZZY: 6,
    PARALYZED: 7,
    CORRUPTION: 11,
    FAVORABILITY: 12,
    SENSITIVITY: 13,
    HORNY: 14,
    SEX_ADDICTION: 15,
    SM_ADDICTION: 16,
    CRISIS_ADDICTION: 17,
    SLAVED: 18,
    NO_VIOLENCE: 21,
    RANK_PENALTY: 23,
    DEBT_PENALTY: 24,
    OPPOSAL_PENALTY: 25,
    NO_COUNTER: 26,
    MATING: 27,
    SEX: 28,
    MC_GUN: 29,
    PHONE_MC: 30,
    PENDULUM_MC: 31,
    PENDANT_MC: 32,
    BLOCKED: 33,
    SEX_START: 34,
    SLAVE_PENALTY: 35,
    RECOVERY_DRONE: 41,
    SHEATH_CHARGE: 42,
    BEDROCK_COUNTER: 43,
    HOUND_CHASE: 44,
    SNAKE_FORMATION: 45,
    IRON_WALL: 46,
  };
  const STATES = this.STATES;

  this.STATE_DETAILS = {
    [STATES.KNOCKOUT]: {
      id: 2,
      label: '#{lblStates.2.label}',
      types: [STATE_TYPES.DISABLE, STATE_TYPES.DEBUFF],
    },
    [STATES.EXHAUSTED]: {
      id: 3,
      label: '#{lblStates.3.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DISABLE, STATE_TYPES.DEBUFF],
    },
    [STATES.CLIMAX]: {
      id: 4,
      label: '#{lblStates.4.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DISABLE, STATE_TYPES.DEBUFF],
    },
    [STATES.PAIN]: {
      id: 5,
      label: '#{lblStates.5.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DISABLE, STATE_TYPES.DEBUFF],
    },
    [STATES.DIZZY]: {
      id: 6,
      label: '#{lblStates.6.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DISABLE, STATE_TYPES.DEBUFF],
    },
    [STATES.PARALYZED]: {
      id: 7,
      label: '#{lblStates.7.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DISABLE, STATE_TYPES.DEBUFF],
    },
    [STATES.CORRUPTION]: {
      id: 11,
      label: '#{lblStates.11.label}',
      types: [STATE_TYPES.LEVEL, STATE_TYPES.PERMANANT, STATE_TYPES.DEBUFF],
    },
    [STATES.FAVORABILITY]: {
      id: 12,
      label: '#{lblStates.12.label}',
      types: [STATE_TYPES.LEVEL, STATE_TYPES.PERMANANT, STATE_TYPES.DEBUFF],
    },
    [STATES.SENSITIVITY]: {
      id: 13,
      label: '#{lblStates.13.label}',
      types: [STATE_TYPES.LEVEL, STATE_TYPES.PERMANANT, STATE_TYPES.DEBUFF],
    },
    [STATES.HORNY]: {
      id: 14,
      label: '#{lblStates.14.label}',
      types: [
        STATE_TYPES.LEVEL,
        STATE_TYPES.GAUGE,
        STATE_TYPES.ACTIVE,
        STATE_TYPES.PERMANANT,
        STATE_TYPES.DEBUFF,
      ],
    },
    [STATES.SEX_ADDICTION]: {
      id: 15,
      label: '#{lblStates.15.label}',
      types: [
        STATE_TYPES.LEVEL,
        STATE_TYPES.GAUGE,
        STATE_TYPES.ACTIVE,
        STATE_TYPES.PERMANANT,
        STATE_TYPES.DEBUFF,
      ],
    },
    [STATES.SM_ADDICTION]: {
      id: 16,
      label: '#{lblStates.16.label}',
      types: [STATE_TYPES.LEVEL, STATE_TYPES.PERMANANT, STATE_TYPES.DEBUFF],
    },
    [STATES.CRISIS_ADDICTION]: {
      id: 17,
      label: '#{lblStates.17.label}',
      types: [STATE_TYPES.LEVEL, STATE_TYPES.PERMANANT, STATE_TYPES.DEBUFF],
    },
    [STATES.SLAVED]: {
      id: 18,
      label: '#{lblStates.18.label}',
      types: [STATE_TYPES.DEBUFF],
    },
    [STATES.NO_VIOLENCE]: {
      id: 21,
      label: '#{lblStates.21.label}',
      types: [STATE_TYPES.DEBUFF],
    },
    [STATES.RANK_PENALTY]: {
      id: 23,
      label: '#{lblStates.23.label}',
      types: [STATE_TYPES.LEVEL, STATE_TYPES.PENALTY, STATE_TYPES.DEBUFF],
    },
    [STATES.DEBT_PENALTY]: {
      id: 24,
      label: '#{lblStates.24.label}',
      types: [STATE_TYPES.LEVEL, STATE_TYPES.PENALTY, STATE_TYPES.DEBUFF],
    },
    [STATES.OPPOSAL_PENALTY]: {
      id: 25,
      label: '#{lblStates.25.label}',
      types: [STATE_TYPES.LEVEL, STATE_TYPES.PENALTY, STATE_TYPES.DEBUFF],
    },
    [STATES.NO_COUNTER]: {
      id: 26,
      label: '#{lblStates.26.label}',
      types: [STATE_TYPES.DEBUFF],
    },
    [STATES.MATING]: {
      id: 27,
      label: '#{lblStates.27.label}',
      types: [STATE_TYPES.DEBUFF, STATE_TYPES.GAUGE],
    },
    [STATES.SEX]: {
      id: 28,
      label: '#{lblStates.28.label}',
      types: [STATE_TYPES.DEBUFF, STATE_TYPES.DISABLE],
    },
    [STATES.MC_GUN]: {
      id: 29,
      label: '#{lblStates.29.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DEBUFF],
    },
    [STATES.PHONE_MC]: {
      id: 30,
      label: '#{lblStates.30.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DEBUFF],
    },
    [STATES.PENDULUM_MC]: {
      id: 31,
      label: '#{lblStates.31.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DEBUFF],
    },
    [STATES.PENDANT_MC]: {
      id: 32,
      label: '#{lblStates.32.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DEBUFF],
    },
    [STATES.BLOCKED]: {
      id: 33,
      label: '#{lblStates.33.label}',
      types: [STATE_TYPES.STACK, STATE_TYPES.DEBUFF],
    },
    [STATES.SEX_START]: {
      id: 34,
      label: '#{lalStates.34.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.DEBUFF],
    },
    [STATES.SLAVE_PENALTY]: {
      id: 35,
      label: '#{lblStates.35.label}',
      types: [STATE_TYPES.PENALTY, STATE_TYPES.DEBUFF],
    },
    [STATES.RECOVERY_DRONE]: {
      id: 41,
      label: '#{lblStates.41.label}',
      types: [STATE_TYPES.TURN, STATE_TYPES.BUFF],
    },
    [STATES.SHEATH_CHARGE]: {
      id: 42,
      label: '#{lblStates.42.label}',
      types: [STATE_TYPES.STACK, STATE_TYPES.BUFF],
      max: 5,
      format: value => `${value || 0} / 5`,
    },
    [STATES.BEDROCK_COUNTER]: {
      id: 43,
      label: '#{lblStates.43.label}',
      types: [STATE_TYPES.STACK, STATE_TYPES.BUFF],
      max: 5,
      format: value => `${value || 0} / 5`,
    },
    [STATES.HOUND_CHASE]: {
      id: 44,
      label: '#{lblStates.44.label}',
      types: [STATE_TYPES.STACK, STATE_TYPES.BUFF],
      max: 5,
      format: value => `${value || 0} / 5`,
    },
    [STATES.SNAKE_FORMATION]: {
      id: 45,
      label: '#{lblStates.45.label}',
      types: [STATE_TYPES.STACK, STATE_TYPES.BUFF],
      max: 1,
      format: value => `${value || 0} / 1`,
    },
    [STATES.IRON_WALL]: {
      id: 46,
      label: '#{lblStates.46.label}',
      types: [STATE_TYPES.BUFF],
    },
  };

  this.SOUNDS = {
    RULE: 'Chime1',
    SCAN: 'Magic1',
    SUPPORT: 'Chime2',
    UNSUPPORT: 'Buzzer2',
    // ERROR: 'Buzzer1',
    // STRUGGLE: 'Close2',
    // BREAK: 'Door3',
    // UP: 'Up4',
    // CORRECT: 'Chime2',
    // HINT: 'Computer',
    // IMPACT: 'Damage1',
    // HAMPERED: 'Darkness3',
    // RESISTED: 'Flash1',
    // MC: 'Stare',
  };

  this.BARS = {
    GREEN: ['#0B610B', '#04B404'],
    BLUE: ['#04B4AE', '#81F7F3'],
    RED: ['#990000', '#FF0000'],
    YELLOW: ['#ffcc00', '#ffff00'],
    PINK: ['#B404AE', '#F6CEF5'],
  };

  this.DIRECTS = {
    DOWN: 2,
    LEFT: 4,
    RIGHT: 6,
    UP: 8,
  };

  this.RULES = [
    { id: 1, isBasic: true },
    { id: 2, isBasic: true },
    { id: 3, isBasic: true },
    { id: 4, isBasic: true },
    { id: 5, isBasic: false, state: STATES.CORRUPTION },
    { id: 6, isBasic: false, state: STATES.FAVORABILITY },
    { id: 7, isBasic: false, state: STATES.SENSITIVITY },
    { id: 8, isBasic: false, state: STATES.HORNY },
    { id: 9, isBasic: false, state: STATES.SEX_ADDICTION },
    { id: 10, isBasic: false, state: STATES.SM_ADDICTION },
    { id: 11, isBasic: false, state: STATES.CRISIS_ADDICTION },
    { id: 12, isBasic: true },
    { id: 13, isBasic: true },
    { id: 14, isBasic: true },
    { id: 15, isBasic: true },
    { id: 16, isBasic: true },
    { id: 17, isBasic: true },
    { id: 18, isBasic: false },
    { id: 19, isBasic: false },
    { id: 20, isBasic: true },
    { id: 21, isBasic: true },
    { id: 22, isBasic: true },
    { id: 23, isBasic: true },
    { id: 24, isBasic: false },
    { id: 25, isBasic: false },
    { id: 26, isBasic: false },
    { id: 27, isBasic: false },
    { id: 28, isBasic: false },
    { id: 29, isBasic: false },
    { id: 30, isBasic: false },
  ];

  this.RULE_OPTS = {
    CLOSE: 0,
    OPEN: 1,
  };

  this.PERIODS = [
    {
      id: 1,
      label: 'lblDawn',
      img: 'period_dawn',
      hours: [5, 6],
      color: 'DAWN',
    },
    {
      id: 2,
      label: 'lblDay',
      img: 'period_day',
      hours: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      color: 'DAY',
    },
    {
      id: 3,
      label: 'lblSunset',
      img: 'period_sunset',
      hours: [17, 18],
      color: 'SUNSET',
    },
    {
      id: 4,
      label: 'lblNight',
      img: 'period_night',
      hours: [19, 20, 21, 22, 23, 0, 1, 2, 3, 4],
      color: 'NIGHT',
    },
  ];

  this.MAP_PERIOD = {
    DAWN: 1,
    DAY: 2,
    SUNSET: 3,
    NIGHT: 4,
  };

  this.COLORS = {
    DAWN: '#8778ba',
    DAY: '#bfbfbf',
    SUNSET: '#8778ba',
    NIGHT: '#323264',
    BASE: '#a64dff',
    DEBUFF: '#F633FF',
    BUFF: '#2874A6',
  };

  const images = ['PERIOD'];
  this.IMAGES = images.reduce((all, image, idx) => ({ ...all, [image]: idx + 1 }), {});

  this.ENEMIES = { CITIZEN: 1, RAY: 2, TORTOISE: 3, JELLYFISH: 4, INKFISH: 5, WHALE: 6 };
  const ENEMIES = this.ENEMIES;

  this.ANIMS = {
    HIT: 1,
    EXCLAMATION: 2,
    QUESTION: 3,
    MUSIC: 4,
    HEART: 5,
    ANGER: 6,
    SWEAT: 7,
    COBWEB: 8,
    SILENCE: 9,
    BULB: 10,
    SLEEP: 11,
    TSUKKOMI: 12,
    UPSET: 13,
    WORRIED: 14,
    MC: 15,
    FLOATING_HEART: 16,
    SEX_ONGOING: 17,
    CLOTHES_SWITCH: 20,
    PARALYZED: 21,
    NOTICE: 22,
    HAND_CATCH: 31,
    STRUGGLE: 32,
    POWER_DOWN: 41,
    SEX_ONGOING2: 42,
    CONFUSION: 43,
  };

  this.RANKS = {
    [ENEMIES.WHALE]: 4,
    [ENEMIES.TORTOISE]: 3,
    [ENEMIES.JELLYFISH]: 3,
    [ENEMIES.INKFISH]: 3,
    [ENEMIES.RAY]: 2,
    [ENEMIES.CITIZEN]: 1,
  };

  this.LOGICS = { AND: '#{lblAnd}', OR: '#{lblOr}' };

  this.REQS = {
    SLAVED: slaved => ({
      label: () => (slaved ? '#{lblHintSlaved}' : '#{lblHintNotSlaved}'),
      verify: () => !!slaved === !!$util.getSlaved(),
    }),
    BUY_RULE: num => ({
      label: () => $util.localize('#{lblHintBuyRule}', num),
      verify: () => $util.getRuleBought() >= num,
    }),
    OPEN_RULE: id => ({
      label: () => `#{lblActivate}\\I[${id + 31}]#{lblRule}${id}`,
      verify: () => $util.checkRule(id),
    }),
    RESET_RULE_ONCE: {
      label: '#{lblResetRuleOnce}',
      verify: () => $util.getSlaveReset(),
    },
    DEMAND_SEX: {
      label: '#{lblReqDemandSex}',
      verify: () => {
        // corruption and sex addiction
        const level = Math.max(
          $lgcMgr.getStateMinLevel(STATES.CORRUPTION),
          $lgcMgr.getStateMinLevel(STATES.SEX_ADDICTION),
        );
        const displine = $util.getDiscipline();
        const slaved = $util.getSlaved();
        return level >= 3 && displine < 76 && !slaved;
      },
    },
    DISCIPLINE: (value, isGte) => ({
      label: () =>
        $util.localize(
          isGte ? '#{lblGte}' : '#{lblLte}',
          '#{lblItems.discipline.iconLabel}',
          value,
        ),
      verify: () => {
        const discipline = $util.getDiscipline();
        return isGte ? discipline >= value : discipline <= value;
      },
    }),
    TARGET: target => ({
      label: () =>
        $util.localize(
          '#{lblTargetIs}',
          target === ENEMIES.CITIZEN ? '#{lblCitizen}' : '#{lblVillain}',
        ),
      verify: params => params.target === target,
    }),
    DEBT: debt => ({
      label: () => $util.localize('#{lblReqPayDebt}', debt),
      verify: () => $util.getDebt() >= debt,
    }),
    MONEY: money => ({
      label: () => $util.localize('#{lblReqMoney}', money),
      verify: () => $util.getMoney() >= money,
    }),
  };
  const REQS = this.REQS;

  const fnDifficulty = difficulty => {
    const GENERAL_DIFFICULTY = [
      { value: 0, weight: 80 },
      { value: 1, weight: 19 },
      { value: 2, weight: 1 },
    ];
    return Math.min(4, difficulty + $util.weightedSample(GENERAL_DIFFICULTY));
  };
  this.STAGES = [
    { id: 1, difficulty: 1, bonus: 1, next: 3 },
    { id: 2, difficulty: 1, bonus: fnDifficulty, next: 1 },
    { id: 3, difficulty: 1, bonus: 4, next: 3 },
    { id: 4, difficulty: () => _.sample([1, 1, 1, 2]), bonus: fnDifficulty, next: 3 },
    { id: 5, difficulty: () => _.sample([1, 1, 2, 2]), bonus: fnDifficulty, next: 1 },
    { id: 6, difficulty: 2, bonus: 4, next: 3 },
    { id: 7, difficulty: () => _.sample([2, 2, 2, 2]), bonus: fnDifficulty, next: 3 },
    { id: 8, difficulty: () => _.sample([2, 2, 2, 3]), bonus: fnDifficulty, next: 1 },
    { id: 9, difficulty: 2, bonus: 4, next: 3 },
    { id: 10, difficulty: () => _.sample([2, 3, 3, 3]), bonus: fnDifficulty, next: 3 },
    { id: 11, difficulty: () => _.sample([3, 3, 3, 3]), bonus: fnDifficulty, next: 1 },
    { id: 12, difficulty: 3, bonus: 4, next: 0 },
  ];

  this.SCENES = {
    STREET_CITIZEN: 1,
    STREET_VILLAIN: 2,
  };
  const SCENES = this.SCENES;

  this.TOPICS = [
    {
      label: 'lblNormalChat',
      reqs: [],
      event: EVENTS.NORMAL_CHAT,
      weight: 1,
      scenes: [SCENES.STREET_CITIZEN],
    },
    {
      label: 'lblHarassment',
      reqs: [REQS.SLAVED(), REQS.DISCIPLINE(51), REQS.OPEN_RULE(28)],
      event: EVENTS.HARASSMENT,
      weight: 5,
      scenes: [SCENES.STREET_CITIZEN],
    },
    {
      label: 'lblFraudSex',
      reqs: [REQS.SLAVED(), REQS.DISCIPLINE(26), REQS.OPEN_RULE(30)],
      event: EVENTS.FRAUD_SEX,
      weight: 5,
      scenes: [SCENES.STREET_CITIZEN],
    },
    {
      label: 'lblRobbery',
      reqs: [REQS.SLAVED(true)],
      event: EVENTS.ROBBERY,
      weight: 5,
      scenes: [SCENES.STREET_CITIZEN],
    },
    {
      label: 'lblAssault',
      reqs: [REQS.SLAVED()],
      event: EVENTS.ASSAULT,
      weight: 5,
      scenes: [SCENES.STREET_VILLAIN],
    },
    {
      label: 'lblDemandPayDebt',
      reqs: [REQS.SLAVED(), REQS.DEBT(1000000)],
      event: EVENTS.DEMAND_PAY_DEBT,
      weight: 5,
      scenes: [SCENES.STREET_VILLAIN],
    },
    {
      label: 'lblFlaunt',
      reqs: [REQS.SLAVED(true)],
      event: EVENTS.FLAUNT,
      weight: 5,
      scenes: [SCENES.STREET_CITIZEN, SCENES.STREET_VILLAIN],
    },
  ];

  this.TROOPS = {
    TEST: 1,
    EMPTY: 2,
    RAY_DIFFICULTY1: 3,
    RAY_DIFFICULTY2: 4,
    RAY_DIFFICULTY3: 5,
    TORTOISE_LV1: 6,
    TORTOISE_LV2: 7,
    TORTOISE_LV3: 8,
    JELLYFISH_LV1: 9,
    JELLYFISH_LV2: 10,
    JELLYFISH_LV3: 11,
    INKFISH_LV1: 12,
    INKFISH_LV2: 13,
    INKFISH_LV3: 14,
    WHALE: 15,
  };

  this.DANCE_POSES = [
    { id: 1, height: 5, back: false, stable: true },
    { id: 2, height: 5, back: false, stable: false },
    { id: 3, height: 5, back: false, stable: false },
    { id: 4, height: 3, back: false, stable: true },
    { id: 5, height: 2, back: false, stable: false },
    { id: 6, height: 2, back: false, stable: false },
    { id: 7, height: 4, back: true, stable: false },
    { id: 8, height: 2, back: true, stable: false },
    { id: 9, height: 2, back: true, stable: false },
    { id: 10, height: 3, back: true, stable: true },
    { id: 11, height: 2, back: true, stable: false },
    { id: 12, height: 2, back: true, stable: false },
    { id: 13, height: 3, back: true, stable: true },
    { id: 14, height: 2, back: true, stable: false },
    { id: 15, height: 1, back: true, stable: false },
  ];

  this.DANCE_PROGS = {
    STOPPED: 0,
    STARTED: 1,
    FINALE: 2,
  };

  this.SKILLS = {
    BOSS_ACTION: 5,
    GUARD: 6,
    DISTRACT: 7,
    STATUS_CHECK: 11,
    MEDICARE: 12,
    ENERGY_DRINK: 13,
    RECOVERY_FIELD: 14,
    RECOVERY_DRONE: 15,
    SWALLOW: 16,
    SHEATH_CHARGE: 17,
    MOMENTARY_SLASH: 18,
    SHEATH_SHIELD: 19,
    SWALLOW_GROUP: 20,
    HEAVY_BLADE: 21,
    INFINITE_SLASH: 22,
    HANDLE_HIT: 23,
    BEDROCK_COUNTER: 24,
    HAMMER_HIT: 25,
    DRAGON_DRIFT: 26,
    IRON_STRIKE: 27,
    IRON_WALL: 28,
    DOUBLE_DRAGON: 29,
    KNIFE_HIT: 30,
    HOUND_CHASE: 31,
    CROSS_SLASH: 32,
    SHAKE_FORMATION: 33,
    SNAKE_BITE: 34,
    NOISE_FOLLOWER: 35,
    BLADE_DANCE: 36,
    STRUGGLE: 37,
    //enemies
    BELLY_PUNCH: 51,
    PUSSY_KICK: 52,
    SPANK: 53,
    SWING_BAT: 54,
    SWING_WHIP: 55,
    SOLDERING_IRON: 56,
    ELEC_BATON: 57,
    STUNGUN: 58,
    TASER: 59,
    SLEEPING_GAS: 60,
    PARALYZE_INJECTION: 61,
    ENERGY_DRAIN_INJECTION: 62,
    MC_GUN: 63,
    PHONE_MC: 64,
    PENDULUM_MC: 65,
    PENDANT_MC: 66,
    // special
    INSERTION1: 71,
    EJACULATION1: 72,
    INSERTION2: 73,
    EJACULATION2: 74,
    INSERTION3: 75,
    EJACULATION3: 76,
  };
  const SKILLS = this.SKILLS;

  this.SKILL_TYPES = {
    SUPPORT: 0,
    MINION_FOCUS: 1,
    BOSS_FOCUS: 2,
    ENEMY: 3,
    LEWD: 4,
    PASSIVE: 5,
  };
  const SKILL_TYPES = this.SKILL_TYPES;

  this.SKILL_DETAILS = {
    [SKILLS.STATUS_CHECK]: { type: SKILL_TYPES.SUPPORT },
    [SKILLS.MEDICARE]: { type: SKILL_TYPES.SUPPORT },
    [SKILLS.ENERGY_DRINK]: { type: SKILL_TYPES.SUPPORT },
    [SKILLS.RECOVERY_DRONE]: {
      type: SKILL_TYPES.SUPPORT,
    },
    [SKILLS.RECOVERY_FIELD]: {
      type: SKILL_TYPES.PASSIVE,
    },
    [SKILLS.SWALLOW]: { type: SKILL_TYPES.MINION_FOCUS, multi: 1 },
    [SKILLS.SHEATH_CHARGE]: { type: SKILL_TYPES.PASSIVE, state: STATES.SHEATH_CHARGE },
    [SKILLS.MOMENTARY_SLASH]: { type: SKILL_TYPES.BOSS_FOCUS, rate: 3 },
    [SKILLS.SHEATH_SHIELD]: { type: SKILL_TYPES.PASSIVE },
    [SKILLS.SWALLOW_GROUP]: { type: SKILL_TYPES.MINION_FOCUS, multi: 3 },
    [SKILLS.HEAVY_BLADE]: { type: SKILL_TYPES.BOSS_FOCUS, rate: 6 },
    [SKILLS.INFINITE_SLASH]: { type: SKILL_TYPES.BOSS_FOCUS, rate: 2 },
    [SKILLS.HANDLE_HIT]: { type: SKILL_TYPES.MINION_FOCUS, multi: 1 },
    [SKILLS.BEDROCK_COUNTER]: {
      type: SKILL_TYPES.PASSIVE,
      state: STATES.BEDROCK_COUNTER,
    },
    [SKILLS.HAMMER_HIT]: { type: SKILL_TYPES.BOSS_FOCUS, rate: 3 },
    [SKILLS.DRAGON_DRIFT]: { type: SKILL_TYPES.MINION_FOCUS, multi: 2 },
    [SKILLS.IRON_STRIKE]: { type: SKILL_TYPES.BOSS_FOCUS, rate: 5 },
    [SKILLS.IRON_WALL]: { type: SKILL_TYPES.PASSIVE, state: STATES.IRON_WALL },
    [SKILLS.DOUBLE_DRAGON]: { type: SKILL_TYPES.BOSS_FOCUS, rate: 10 },
    [SKILLS.KNIFE_HIT]: { type: SKILL_TYPES.MINION_FOCUS, multi: 1 },
    [SKILLS.HOUND_CHASE]: {
      type: SKILL_TYPES.PASSIVE,
      state: STATES.HOUND_CHASE,
    },
    [SKILLS.CROSS_SLASH]: { type: SKILL_TYPES.BOSS_FOCUS, rate: 2 },
    [SKILLS.SHAKE_FORMATION]: { type: SKILL_TYPES.PASSIVE, state: STATES.SNAKE_FORMATION },
    [SKILLS.SNAKE_BITE]: { type: SKILL_TYPES.MINION_FOCUS, multi: 4 },
    [SKILLS.NOISE_FOLLOWER]: { type: SKILL_TYPES.PASSIVE },
    [SKILLS.BLADE_DANCE]: { type: SKILL_TYPES.MINION_FOCUS, multi: 10 },
  };
  const SKILL_DETAILS = this.SKILL_DETAILS;
  Object.values(SKILLS).map(skillId => {
    SKILL_DETAILS[skillId] = {
      id: skillId,
      label: `lblSkills.${skillId}`,
      ...SKILL_DETAILS[skillId],
    };
  });

  this.ACTION_TYPES = {
    GUARD: 1,
    COUNTER: 2,
    HINDER: 3,
    RAID: 4,
    STOP: 5,
    CHASE: 6,
    ANTI_COUNTER: 7,
    MULTI: 8,
    DISTRACT: 9,
  };

  this.MAP_ENEMY_SKILL = {
    3: [SKILLS.BELLY_PUNCH, SKILLS.PUSSY_KICK, SKILLS.SPANK],
    4: [SKILLS.SWING_BAT, SKILLS.SWING_WHIP, SKILLS.SOLDERING_IRON],
    5: [SKILLS.ELEC_BATON, SKILLS.STUNGUN, SKILLS.TASER],
    6: [SKILLS.SLEEPING_GAS, SKILLS.PARALYZE_INJECTION, SKILLS.ENERGY_DRAIN_INJECTION],
    7: [SKILLS.SWING_BAT, SKILLS.SWING_WHIP, SKILLS.SOLDERING_IRON],
    8: [SKILLS.ELEC_BATON, SKILLS.STUNGUN, SKILLS.TASER],
    9: [SKILLS.SLEEPING_GAS, SKILLS.PARALYZE_INJECTION, SKILLS.ENERGY_DRAIN_INJECTION],
    10: [SKILLS.SWING_BAT, SKILLS.SWING_WHIP, SKILLS.SOLDERING_IRON],
    11: [SKILLS.ELEC_BATON, SKILLS.STUNGUN, SKILLS.TASER],
    12: [SKILLS.SLEEPING_GAS, SKILLS.PARALYZE_INJECTION, SKILLS.ENERGY_DRAIN_INJECTION],
    13: [SKILLS.MC_GUN, SKILLS.PHONE_MC, SKILLS.PENDULUM_MC, SKILLS.PENDANT_MC],
  };

  this.SEX_PHASES = {
    INSERTION: 0,
    MATING: 1,
    CLIMAX: 2,
    DOWN: 3,
  };
  const SEX_PHASES = this.SEX_PHASES;

  this.MAP_SEX_FACE = {
    [SEX_PHASES.INSERTION]: {
      0: {
        eye: ['dizzy_angry', 'dizzy_sad', 'shocked_angry', 'shocked_sad'],
        mouse: ['pout', 'tongue_heavy', 'teeth_heavy'],
      },
      1: {
        eye: [
          'dizzy_angry',
          'dizzy_sad',
          'dizzy_happy',
          'shocked_angry',
          'shocked_sad',
          'shocked_happy',
        ],
        mouse: ['pout', 'tongue_heavy', 'teeth_heavy'],
      },
      2: {
        eye: ['dizzy_angry', 'dizzy_sad', 'dizzy_happy', 'shocked_sad', 'shocked_happy'],
        mouse: ['pout', 'tongue_heavy'],
      },
      3: {
        eye: ['dizzy_angry', 'dizzy_sad', 'dizzy_happy', 'shocked_sad', 'shocked_happy'],
        mouse: ['pout', 'tongue_happy', 'tongue_heavy'],
      },
    },
    [SEX_PHASES.MATING]: {
      0: {
        eye: [
          'addicted_angry',
          'addicted_sad',
          'enduring_angry',
          'enduring_sad',
          'dizzy_angry',
          'dizzy_sad',
        ],
        mouse: ['teeth_heavy', 'breath', 'breath_heavy', 'tongue', 'tongue_heavy', 'pout'],
      },
      1: {
        eye: [
          'addicted_angry',
          'addicted_sad',
          'enjoying_angry',
          'enjoying_sad',
          'enduring_angry',
          'enduring_sad',
          'dizzy_angry',
          'dizzy_sad',
        ],
        mouse: ['breath', 'breath_heavy', 'breath_happy', 'tongue', 'tongue_heavy', 'pout'],
      },
      2: {
        eye: [
          'addicted_angry',
          'addicted_sad',
          'addicted_happy',
          'enjoying_angry',
          'enjoying_sad',
          'enjoying_happy',
          'enduring_angry',
          'enduring_sad',
          'enduring_happy',
          'dizzy_angry',
          'dizzy_sad',
          'dizzy_happy',
        ],
        mouse: [
          'breath',
          'breath_heavy',
          'breath_happy',
          'tongue',
          'tongue_heavy',
          'tongue_happy',
          'pout',
        ],
      },
      3: {
        eye: [
          'addicted_happy',
          'enjoying_angry',
          'enjoying_sad',
          'enjoying_happy',
          'enduring_angry',
          'enduring_sad',
          'enduring_happy',
          'dizzy_angry',
          'dizzy_sad',
          'dizzy_happy',
        ],
        mouse: [
          'teeth_happy',
          'breath',
          'breath_heavy',
          'breath_happy',
          'tongue',
          'tongue_heavy',
          'tongue_happy',
          'pout',
        ],
      },
    },
    [SEX_PHASES.CLIMAX]: {
      0: { eye: ['climax_angry', 'climax_sad'], mouse: ['pout', 'tongue_heavy'] },
      1: { eye: ['climax_angry', 'climax_sad', 'climax_happy'], mouse: ['pout', 'tongue_heavy'] },
      2: { eye: ['climax_angry', 'climax_sad', 'climax_happy'], mouse: ['pout', 'tongue_heavy'] },
      3: { eye: ['climax_angry', 'climax_sad', 'climax_happy'], mouse: ['pout', 'tongue_heavy'] },
    },
    [SEX_PHASES.DOWN]: {
      0: { eye: ['faint', 'climax_sad'], mouse: ['breath', 'breath_heavy', 'tongue'] },
      1: {
        eye: ['faint', 'climax_sad', 'climax_happy'],
        mouse: ['breath', 'breath_heavy', 'tongue'],
      },
      2: {
        eye: ['faint', 'climax_sad', 'climax_happy'],
        mouse: ['breath', 'breath_heavy', 'breath_happy', 'tongue'],
      },
      3: {
        eye: ['faint', 'climax_sad', 'climax_happy'],
        mouse: ['breath', 'breath_heavy', 'breath_happy', 'tongue', 'tongue_happy'],
      },
    },
  };

  this.ENEMY_TITLE = {
    1: '#{lblMsgRay}',
    2: '#{lblMsgCitizen}',
    3: '#{lblMsgRay}',
    4: '#{lblMsgTortoise}',
    5: '#{lblMsgJellyfish}',
    6: '#{lblMsgInkfish}',
    7: '#{lblMsgTortoise}',
    8: '#{lblMsgJellyfish}',
    9: '#{lblMsgInkfish}',
    10: '#{lblMsgTortoise}',
    11: '#{lblMsgJellyfish}',
    12: '#{lblMsgInkfish}',
    13: '#{lblWhale}',
    14: '#{lblMsgRay}',
    15: '#{lblMsgRay}',
    16: '#{lblMsgRay}',
  };

  this.ENEMY_ACTIONS = {
    [SKILLS.BELLY_PUNCH]: { phase: 1, hit: 'punch', se: 'Damage5', state: STATES.PAIN },
    [SKILLS.PUSSY_KICK]: { phase: 1, hit: 'kick', se: 'Damage5', state: STATES.PAIN },
    [SKILLS.SPANK]: { phase: 1, hit: 'slap', se: 'Slap', state: STATES.PAIN },
    [SKILLS.SWING_BAT]: { phase: 1, hit: 'knock', se: 'Blow9', state: STATES.DIZZY },
    [SKILLS.SWING_WHIP]: { phase: 1, hit: 'whip', se: 'Slap', state: STATES.PAIN },
    [SKILLS.SOLDERING_IRON]: { phase: 1, hit: 'iron', se: 'Ice2', state: STATES.PAIN },
    [SKILLS.ELEC_BATON]: {
      phase: 1,
      hit: 'baton',
      se: ['Slap', 'Thunder8'],
      state: STATES.PARALYZED,
    },
    [SKILLS.STUNGUN]: {
      phase: 1,
      hit: 'stungun',
      se: ['Biri', 'Thunder8'],
      state: STATES.PARALYZED,
    },
    [SKILLS.TASER]: {
      phase: 1,
      hit: 'taser',
      se: ['Gun1', 'Thunder8'],
      state: STATES.PARALYZED,
    },
    [SKILLS.SLEEPING_GAS]: { phase: 1, hit: 'gas', se: 'Pollen', state: STATES.DIZZY },
    [SKILLS.PARALYZE_INJECTION]: {
      phase: 2,
      hit: ['paralyze', 'paralized'],
      se: ['Slash2', 'Paralyze3'],
      state: STATES.PARALYZED,
    },
    [SKILLS.ENERGY_DRAIN_INJECTION]: {
      phase: 2,
      hit: ['injection', 'excretion'],
      se: ['Slash2', 'Eject'],
      state: STATES.DIZZY,
    },
  };

  this.CHEST_ITEMS = [
    { actor: 0, bonus: 1, armor: 1 },
    { actor: 0, bonus: 2, armor: 2 },
    { actor: 0, bonus: 3, armor: 3 },
    { actor: 0, bonus: 4, armor: 4 },
    { actor: 1, bonus: 1, armor: 5 },
    { actor: 1, bonus: 2, armor: 6 },
    { actor: 1, bonus: 3, armor: 7 },
    { actor: 1, bonus: 4, armor: 8 },
    { actor: 2, bonus: 1, armor: 9 },
    { actor: 2, bonus: 2, armor: 10 },
    { actor: 2, bonus: 3, armor: 11 },
    { actor: 2, bonus: 4, armor: 12 },
    { actor: 3, bonus: 1, armor: 13 },
    { actor: 3, bonus: 2, armor: 14 },
    { actor: 3, bonus: 3, armor: 15 },
    { actor: 3, bonus: 4, armor: 16 },
  ];
}

const $const = new RBR_Const();

const {
  VARS,
  SWITCHES,
  PROGS,
  EVENTS,
  MAPS,
  STATES,
  SOUNDS,
  BARS,
  DIRECTS,
  RULES,
  RULE_OPTS,
  PERIODS,
  MAP_PERIOD,
  MAP_EVENT,
  COLORS,
  IMAGES,
  ANIMS,
  NOTIS,
  RANKS,
  LOGICS,
  STATE_TYPES,
  REQS,
  ENEMIES,
  STAGES,
  DOORS,
  PLEASURE_TYPES,
  TOPICS,
  SCENES,
  TROOPS,
  DANCE_POSES,
  DANCE_PROGS,
  STATE_DETAILS,
  VAR_DETAILS,
  VAR_TYPES,
  SKILL_DETAILS,
  ACTION_TYPES,
  SKILLS,
  SKILL_TYPES,
  MAP_ENEMY_SKILL,
  SEX_PHASES,
  MAP_SEX_FACE,
  ENEMY_TITLE,
  ENEMY_ACTIONS,
  CHEST_ITEMS,
} = $const;
