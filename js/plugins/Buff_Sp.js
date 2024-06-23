/*:
 * @plugindesc 状态特殊效果.
 * @author hugh
 *
 * 状态备注：
 * <buff up>
 * atk cf(user,state)      注：一行只能写一个能力增减[不可以有数字]   user:角色  state:状态
 * xxx yy(user,state)
 * ...
 * </buff up>
 * xxx部分代码：
 *  mhp,mmp,atk,def,mat,mdf,agi,luk,
 *  hit,eva,cri,cev,mev,mrf,cnt,hrg,mrg,trg,
 *  tgr,grd,rec,pha,mcr,tcr,pdr,mdr,fdr,exr
 *  
*/

(() => {
var buff = {}
    buff.Parameter = 
{ 
	mhp: 0, mmp: 1, atk: 2, def: 3, mat: 4, mdf: 5, agi: 6, luk: 7
};

    buff.XParameter =
{
    hit: 0, eva: 1, cri: 2, cev: 3, mev: 4, mrf: 5, cnt: 6, hrg: 7, mrg: 8, trg: 9
};

    buff.SParameter =
{
    tgr: 0, grd: 1, rec: 2, pha: 3, mcr: 4, tcr: 5, pdr: 6, mdr: 7, fdr: 8, exr: 9
};

var buff_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  buff_DataManager_isDatabaseLoaded.call(this);
  this.processData($dataStates);
  return true;
};
	
DataManager.processData = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);
    var actionType = 0;
	obj.buff = [];
	obj.isbuff = false;
    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:buff up)>/i)) {
		obj.isbuff = true;
        actionType = 1;
      } else if (line.match(/<\/(?:buff up)>/i)) {
        var actionType = 0;
      } else {
        this.SequenceBuff(obj, line, actionType);
      }
    }
  }
};
	
DataManager.SequenceBuff = function(obj, line, actionType) {
  if (actionType <= 0 || actionType > 1) return;
  var seqArgs = line.match(/(\w+)\s*(\D+)?/i);
  var tpye = seqArgs[1];
  var value = seqArgs[2];
  var data = {};
  if (buff.Parameter[tpye] >= 0) {
	data.tpye = 'p'; 
	data.index = Number(buff.Parameter[tpye]);
  } else if (buff.XParameter[tpye] >= 0) {
	data.tpye = 'xp';
	data.index = Number(buff.Parameter[tpye]);
  } else if (buff.SParameter[tpye] >= 0) {
	data.tpye = 'sp';
	data.index = Number(buff.Parameter[tpye]);
  };
  data.value = value;
  if (actionType === 1) obj.buff.push(data);
};

var buff_Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
    buff_Game_BattlerBase_initMembers.call(this);
	this.plus = {};
	this.plusClear();
};

Game_BattlerBase.prototype.plusClear = function() {
	this.plus.param = [1,1,1,1,1,1,1,1];
	this.plus.xparam = [1,1,1,1,1,1,1,1,1,1];
	this.plus.sparam = [1,1,1,1,1,1,1,1,1,1];
}

Game_BattlerBase.prototype.buffsp = function() {
    return this._states.map(function(id) {
		if ($dataStates[id].isbuff) {
        return $dataStates[id];
		}
    });
};

Game_BattlerBase.prototype.getbuffvalue = function() {
	const buff = this.buffsp();
	this.plusClear();
	for (let i = 0;i < buff.length;i++) {
		if (buff[i]) {
		const states = buff[i].buff;
		for (let j = 0;j < states.length;j++) {
		const state1 = states[j];
		var state = buff[i];
		var user = this;
			if (state1.tpye === 'p') {
				const index = Number(state1.index);
				const value = eval(state1.value);
				this.plus.param[index] *= value; 
			} else if (state1.tpye === 'xp') {
				const index = Number(state1.index);
				const value = eval(state1.value);
				this.plus.xparam[index] *= value; 
			} else if (state1.tpye === 'sp') {
				const index = Number(state1.index);
				const value = eval(state1.value);
				this.plus.sparam[index] *= value; 
			}							
		}
		}
	}
	return true;
}

var buff_Game_BattlerBase_paramRate = Game_BattlerBase.prototype.paramRate 
Game_BattlerBase.prototype.paramRate = function(paramId){
    var value = buff_Game_BattlerBase_paramRate.call(this, paramId);
	this.getbuffvalue();
    return value * this.plus.param[paramId];
};

var buff_Game_BattlerBase_xparam = Game_BattlerBase.prototype.xparam 
Game_BattlerBase.prototype.xparam = function(xparamId){
    var value = buff_Game_BattlerBase_xparam.call(this, xparamId);
	this.getbuffvalue();
    return value * this.plus.xparam[xparamId];
};

var buff_Game_BattlerBase_sparam = Game_BattlerBase.prototype.sparam
Game_BattlerBase.prototype.sparam = function(sparamId){
    var value = buff_Game_BattlerBase_sparam.call(this, sparamId);
	this.getbuffvalue();
    return value * this.plus.sparam[sparamId];
};

})();
