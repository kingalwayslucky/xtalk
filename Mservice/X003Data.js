/**
 * 功能:数据存储中间层
 * */
//通用区块云服务测试框架v0.2 by yx 2016-05
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = [ { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "chkType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "chk Type", "template": "elements_input_uint" } ], "name": "chkInfo", "outputs": [ { "name": "", "type": "uint256" } ], "type": "function", "displayName": "chk Info" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" } ], "name": "addUser", "outputs": [], "type": "function", "displayName": "add User" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "val1", "type": "string", "typeShort": "string", "bits": "", "displayName": "val1", "template": "elements_input_string" }, { "name": "val2", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "val2", "template": "elements_input_uint" } ], "name": "setUserStr", "outputs": [], "type": "function", "displayName": "set User Str" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" } ], "name": "getAdminUint", "outputs": [ { "name": "", "type": "uint256" } ], "type": "function", "displayName": "get Admin Uint" }, { "constant": false, "inputs": [ { "name": "aaddr", "type": "string", "typeShort": "string", "bits": "", "displayName": "aaddr", "template": "elements_input_string" }, { "name": "apwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "apwd", "template": "elements_input_string" }, { "name": "uaddr", "type": "string", "typeShort": "string", "bits": "", "displayName": "uaddr", "template": "elements_input_string" }, { "name": "money", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "money", "template": "elements_input_uint" } ], "name": "inCharge", "outputs": [], "type": "function", "displayName": "in Charge" }, { "constant": false, "inputs": [ { "name": "addrfrom", "type": "string", "typeShort": "string", "bits": "", "displayName": "addrfrom", "template": "elements_input_string" }, { "name": "pwdfrom", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwdfrom", "template": "elements_input_string" }, { "name": "addrto", "type": "string", "typeShort": "string", "bits": "", "displayName": "addrto", "template": "elements_input_string" }, { "name": "money", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "money", "template": "elements_input_uint" } ], "name": "sendMoney", "outputs": [], "type": "function", "displayName": "send Money" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "type": "function", "displayName": "kill" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "money", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "money", "template": "elements_input_uint" } ], "name": "addMsgTotal", "outputs": [], "type": "function", "displayName": "add Msg Total" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "value", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "value", "template": "elements_input_uint" } ], "name": "setAdminUint", "outputs": [], "type": "function", "displayName": "set Admin Uint" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "target", "type": "string", "typeShort": "string", "bits": "", "displayName": "target", "template": "elements_input_string" }, { "name": "channelID", "type": "string", "typeShort": "string", "bits": "", "displayName": "channel I D", "template": "elements_input_string" }, { "name": "msg", "type": "string", "typeShort": "string", "bits": "", "displayName": "msg", "template": "elements_input_string" } ], "name": "sendMsg", "outputs": [], "type": "function", "displayName": "send Msg" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "idx", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "idx", "template": "elements_input_uint" }, { "name": "channelID", "type": "string", "typeShort": "string", "bits": "", "displayName": "channel I D", "template": "elements_input_string" } ], "name": "getUserStr", "outputs": [ { "name": "", "type": "string" } ], "type": "function", "displayName": "get User Str" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "value", "type": "string", "typeShort": "string", "bits": "", "displayName": "value", "template": "elements_input_string" }, { "name": "idx", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "idx", "template": "elements_input_uint" } ], "name": "setAdminStr", "outputs": [], "type": "function", "displayName": "set Admin Str" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "channelID", "type": "string", "typeShort": "string", "bits": "", "displayName": "channel I D", "template": "elements_input_string" } ], "name": "getUserUint", "outputs": [ { "name": "", "type": "uint256" } ], "type": "function", "displayName": "get User Uint" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "target", "type": "string", "typeShort": "string", "bits": "", "displayName": "target", "template": "elements_input_string" }, { "name": "channelID", "type": "string", "typeShort": "string", "bits": "", "displayName": "channel I D", "template": "elements_input_string" } ], "name": "delChannel", "outputs": [], "type": "function", "displayName": "del Channel" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "idx", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "idx", "template": "elements_input_uint" } ], "name": "getAdminStr", "outputs": [ { "name": "", "type": "string" } ], "type": "function", "displayName": "get Admin Str" }, { "inputs": [], "type": "constructor" } ];

var xtalk = web3.eth.contract(abi).at("0x4021bA268811432220b43E88EC25f314da202773");


var crypto = require('crypto');
var xhelp = require('./common');

//管理员信息
var admin = "ADMIN0123456789ADMIN";
var apwd = "19830811";

var ret;
//得到合约信息(区块链)
exports.getSystemInfo = function(){
	var idx = "";
	ret = xtalk.getAdminStr.call(admin, apwd, 2, idx);
	return ret;
}

//得到指定范围的提现请求
exports.getWithDraws = function(addr, pwd, start, count){
	//验证管理员
	var reg = xtalk.chkInfo.call(addr, pwd, 2);
	if(reg != 1) return "RSE006";
	
	//判断交易列表是否有效
	var withDrawNum = xtalk.getAdminUint.call(addr, pwd, 6);
	if(withDrawNum == 0) return "RSE018";
	
	//得到起止范围,检查是否有效整数
	var ss = parseInt(start, 10);
	var cc = parseInt(count, 10);
	if(isNaN(ss) || isNaN(cc) || ss< 0 ||
	   ss >= withDrawNum || cc <= 0) return "RSE008";
	
	//判断是否得到默认列表
	var txarr = [];
	
	//得到起止索引 [start, end)
	var startloc = ss, endloc = startloc + cc;
	if(endloc > withDrawNum)
		endloc = withDrawNum;	
		
	//得到指定范围的交易
	for(var idx=startloc; idx<endloc; idx++){
			txarr.push(xtalk.tranfromIdx.call(addr, pwd, idx));
	}
	
	//返回交易列表
	var retObj = {
		"totoal": withDrawNum,
		"txs": txarr
	};
	return JSON.stringify(retObj);
}


//处理用户提现请求
exports.handleWithDraw = function(addr, pwd, idx){
	//验证管理员
	var reg = xtalk.chkInfo.call(addr, pwd, 2);
	if(reg != 1) return "RSE006";
	ret = xtalk.handleWithDraw.sendTransaction(addr, pwd, idx, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";
}

//用户提现请求
exports.userWithDraw = function(addr, pwd, money, target){
	var blank = "";
	//地址未注册或密码无效 
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";

	//转账金额无效 4
	var moneyloc = parseInt(money);
	var Umoney = xtalk.getUserUint.call(addr, pwd, 1, blank);
	if(isNaN(moneyloc) || Umoney < moneyloc) return "RSE005";
	
	//验证以太币账号是否有效
	if(target.length != 42 || target[0] != 0 || target[1] != "x") return "RSE004";
	
	//检查消息数是否有效
	var msgNum = xtalk.getUserUint.call(addr, pwd, 2, blank);
	if(msgNum < 1) return "RSE015";
	
	//得到官方代币账号
	var AllAct = xtalk.getAdminStr.call(admin, apwd, 1, blank);
	var act = JSON.parse(AllAct).aaddr;
	//转账到官方代币账号
	var cge = xtalk.sendMoney.sendTransaction(addr, pwd, act, moneyloc, {from : web3.eth.coinbase, gas:3000000});
	//给官方代币账号发消息
	var channelID = xhelp.getChannelID(addr, act);
	var newmsg = "提现金额和账号："+money+"--"+target;
	var crypted = xhelp.addpwd(newmsg);
	var time = xhelp.getNow();
	var MSG = {
		"from":addr,
		"msg":crypted,
		"date":time
	}
	console.log("222222222");
	MSG = JSON.stringify(MSG);
	var sendMsg = xtalk.sendMsg.sendTransaction(addr, pwd, act, channelID, MSG, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";
}

//管理员提现
exports.adminWithDraw = function(admin, pwd, money){
	//验证管理员
	if(sysinfo.admin != admin || sysinfo.pwd != pwd) return "RSE006";
	
	//验证充值金额是否有效
	var moneyloc = parseInt(money);
	if(isNaN(moneyloc) || sysinfo.adminMoney < moneyloc) return "RSE005";
	
	//管理员金额减少
	sysinfo.adminMoney -= moneyloc;
	return "RSY000";
}

//用户打赏系统（区块链）
exports.rewardMoney = function(addr, pwd, money, msg){
	var blank = '';
	//地址未注册或密码无效 
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//转账金额无效 4
	var moneyloc = parseInt(money);
	var Umoney = xtalk.getUserUint.call(addr, pwd, 1, blank);
	if(isNaN(moneyloc) || Umoney < moneyloc) return "RSE005";
	
	//验证消息条数
	var msgNum = xtalk.getUserUint.call(addr, pwd, 2, blank);
	if(msgNum < 1) return "RSE015";
	
	//官方APP代币地址获取
	var AllAct = xtalk.getAdminStr.call(admin, apwd, 1, blank);
	var act = JSON.parse(AllAct).aaddr;
	
	//转账到官方代币账号
	var cge = xtalk.sendMoney.sendTransaction(addr, pwd, act, moneyloc, {from : web3.eth.coinbase, gas:3000000});
	
	//给官方代币账号发消息
	var channelID = xhelp.getChannelID(addr, act);
	var newmsg;
	if(msg == ""){
		newmsg = "打赏金额："+money;
	}else{
		newmsg = "打赏金额和留言："+money+"--"+msg;
	}
	
	var crypted = xhelp.addpwd(newmsg);
	var time = xhelp.getNow();
	var MSG = {
		"from":addr,
		"msg":crypted,
		"date":time
	}
	MSG = JSON.stringify(MSG);
	var sendMsg = xtalk.sendMsg.sendTransaction(addr, pwd, act, channelID, MSG, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";
}

//返回指定地址联系人列表总数（区块链）
exports.getContCnt = function(addr, pwd){
	var blank = '';
	//地址未注册或密码错误
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//返回联系人列表数目
	ret = xtalk.getUserUint.call(addr, pwd, 3, blank);
	return ret;
}

//返回指定地址交易列表总数
exports.getTranCnt = function(addr, pwd){
	//地址未注册或密码错误
	if(!userDB[addr] || userDB[addr].pwd != pwd) return "RSE002";
	
	//返回指定地址的交易数目
	return userDB[addr].transacts ? userDB[addr].transacts.length : 0;
}

//返回指定联系人消息列表总数（区块链）
exports.getMsgCnt = function(addr, pwd, target){
	var blank = "";
	//源地址未注册或密码错误
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//目标地址不存在
	var regT = xtalk.chkInfo.call(target, blank, 1);
	if(regT != 1) return "RSE004";
	
	//得到指定联系人的消息数目
	var channelID = xhelp.getChannelID(addr, target);
	ret = xtalk.getUserUint.call(addr, pwd, 4, channelID);
	return ret;
}

//删除消息通道（区块链）
exports.delChannel = function(addr, pwd, target){
	var blank = "";
	//源地址未注册或密码错误
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//目标地址不存在
	var regT = xtalk.chkInfo.call(target, blank, 1);
	if(regT != 1) return "RSE004";
	
	//删除通道
	var channelID = xhelp.getChannelID(addr, target);
	ret = xtalk.delChannel.sendTransaction(addr, pwd, target, channelID, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";
}

//消息条数充值（区块链）
exports.addMsgTotal = function(addr, pwd, money){
	var blank = "";
	//源地址未注册或密码错误
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//充值金额无效或余额不足
	var moneyloc = parseInt(money);
	var Umoney = xtalk.getUserUint.call(addr, pwd, 1, blank);
	if(isNaN(moneyloc) || Umoney < moneyloc) return "RSE005";
	
	//增加可用消息数目
	ret = xtalk.addMsgTotal.sendTransaction(addr, pwd, moneyloc, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";	
}

//删除指定消息(区块链)
exports.delMsg = function(addr, pwd, idx, target){
	//地址未注册或密码错误
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//删除消息
	var	channelID = xhelp.getChannelID(addr, target);
	xtalk.setUserStr.sendTransaction(addr, pwd, 2, channelID, idx, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";
}

//解码指定消息(区块链)
exports.decodeMsg = function(addr, pwd, msg){
	//地址未注册或密码错误
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//得到随机密码长度
	var len = parseInt(msg.substr(2, 2));
	
	//提取实际加密消息体和随机密码
	var randPwd2 = msg.substr(4, len*2);
	var realMsg = msg.substr(4+len*2);
	
	try{
		var decipher = crypto.createDecipher('aes-256-cbc', randPwd2);
		var decret = decipher.update(realMsg, 'hex', 'utf8');
		decret += decipher.final('utf8')
		return decret;
	}catch(e){
		return "RSE012";
	}
	
	//返回指定消息
	return JSON.stringify(msgDB[mid]);
}

//得到指定联系人的消息列表(区块链)
exports.getMessages = function(addr, pwd, target, start, count){
	var blank = "";
	//源地址未注册或密码错误
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//目标地址不存在
	var regT = xtalk.chkInfo.call(target, blank, 1);
	if(regT != 1) return "RSE004";
	
	//消息列表为空
	var channelID = xhelp.getChannelID(addr, target);
	var Mnum = xtalk.getUserUint.call(addr, pwd, 4, channelID);
	if(Mnum == 0) return "RSE014";
		
	//得到起止范围,检查是否有效整数
	var ss = parseInt(start, 10);
	var cc = parseInt(count, 10);
	if(isNaN(ss) || isNaN(cc) || ss< 0 ||ss >= Mnum || cc <= 0) return "RSE008";
	   
	//判断是否得到默认列表
	var msgarr = [];
	
	//得到起止索引 [start, end)
	var startloc = ss, endloc = startloc + cc;
	if(endloc > Mnum)
		endloc = Mnum;	
	
	//得到该消息通道指定范围的消息
	var msgs = [];
	for(var idx=startloc; idx<endloc; idx++){
		var MSG  = xtalk.getUserStr.call(addr, pwd, 2, idx, channelID);
		if(MSG != ""){
			MSG = JSON.parse(MSG);
			MSG.idx = idx;
			msgs.push(MSG);
		}
	}
	
	//得到返回结果
	var retObj = {
		"total": Mnum,
		"msgs" : msgs
	};
	return JSON.stringify(retObj);
}

//消息发送（区块链)
exports.sendMsg = function(addr, pwd, target, msg){
	var blank = "";
	var channelID = xhelp.getChannelID(addr, target);
	//源地址未注册或密码错误
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//目标账号地址不存在
	var toReg = xtalk.chkInfo.call(target, blank, 1);
	if(toReg != 1) return "RSE004";
	
	//检查消息可用条数是否足够
	var MsgNum = xtalk.getUserUint.call(addr, pwd, 2, blank);
	if(MsgNum < 1) return "RSE015";
	

	//消息内容加密
	var crypted = xhelp.addpwd(msg);
	
	//发送消息
	var time = xhelp.getNow();
	var MSG = {
		"from":addr,
		"msg":crypted,
		"date":time
	}
	MSG = JSON.stringify(MSG);
	console.log(MSG);
	ret = xtalk.sendMsg.sendTransaction(addr, pwd, target, channelID, MSG, {from : web3.eth.coinbase, gas:3000000});
	return crypted;
}

//得到指定地址的联系人列表（区块链）
exports.getContacts = function(addr, pwd, start, count){
	//地址未注册
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//检查联系人列表
	var channelID = "";
	var CNum = xtalk.getUserUint.call(addr, pwd, 3, channelID);
	if(CNum == 0) return "RSE010";
		
	//得到起止范围,检查是否有效整数
	var ss = parseInt(start, 10);
	var cc = parseInt(count, 10);
	if(isNaN(ss) || isNaN(cc) || ss< 0 ||
	   ss >= CNum ||
	   cc <= 0) return "RSE008";
	   
	//得到起止索引 [start, end)
	var startloc = ss, endloc = startloc + cc;
	if(endloc > CNum)
		endloc = CNum;	

	//得到所有联系人的消息通道ID
	var contacts = [];
	var userList;
	for(var idx=startloc; idx<endloc; idx++){
		userList =  xtalk.getUserStr.call(addr, pwd, 1, idx, channelID);
		if(userList != ""){
			contacts.push({
				"id": userList
			});
		}
		
	}
	
	//返回处理结果
	var retObj = {
		"total":CNum,
		"contacts":contacts
	};
	return JSON.stringify(retObj);
}

//代币充值(区块链)
exports.inCharge = function(addra, pwda, target, money){
	//验证管理员
	var regA = xtalk.chkInfo.call(addra, pwda, 2);
	if(regA != 1) return "RSE006";
	
	//验证目标是否有效
	var pwdu = "";//只验证目标账号是否注册，无密码
	var regU = xtalk.chkInfo.call(target, pwdu, 1);
	if(regU != 1) return "RSE004";
	
	//验证充值金额是否有效
	var moneyloc = parseInt(money);
	if(isNaN(moneyloc) || moneyloc <= 0) return "RSE005";
	
	//充值
	ret = xtalk.inCharge.sendTransaction(addra, pwda, target, money, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";
}

//设置系统信息（区块链）
exports.setInfo = function(addr, pwd, type, value){
	var blank = "";
	//验证管理员
	var reg = xtalk.chkInfo.call(addr, pwd, 2);
	if(reg != 1) return "RSE006";
	
	if(type == "pwd") xtalk.setAdminStr.sendTransaction(addr, pwd, 2, value, blank, {from : web3.eth.coinbase, gas:3000000});
	else if(type == "rate") xtalk.setAdminUint.sendTransaction(addr, pwd, 1, value, {from : web3.eth.coinbase, gas:3000000});
	else if(type == "msgrate") xtalk.setAdminUint.sendTransaction(addr, pwd, 2, value, {from : web3.eth.coinbase, gas:3000000});
	else if(type == "addr") xtalk.setAdminStr.sendTransaction(addr, pwd, 1, value, blank, {from : web3.eth.coinbase, gas:3000000});
	else return "RSE016";
	
	return "RSY000";
}

//得到系统注册信息(区块链)
exports.getInfo = function(){
	var blank = "";
	var SystemAddr = xtalk.getAdminStr.call(admin, apwd, 1, blank);
//	var money = xtalk.getAdminUint.call(admin, apwd, 2);
	var users = xtalk.getAdminUint.call(admin, apwd, 1);
	var rate = xtalk.getAdminUint.call(admin, apwd, 2);
	var msgrate = xtalk.getAdminUint.call(admin, apwd, 3);
	var retObj = {
		"addr" : SystemAddr, //系统对外以太地址
//		"money" : money,//系统流通代币说明
		"users" : users,//注册用户总数
		"rate" : rate, //一个外部电子货币的额定兑换率
		"msgrate": msgrate //一个代币购买可用消息数目
	};
	return JSON.stringify(retObj);
}

//检查指定地址是否注册（区块链）
exports.chkAddr = function(addr, pwd){
	ret = xtalk.chkInfo.call(addr, pwd, 1);
	if(ret == 1){
		return true;
	}else{
		return false;
	}
}

//进行实际的用户注册（区块链）
exports.addAddr = function(addr, pwd){
	ret = xtalk.addUser.sendTransaction(addr, pwd, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";
}

//修改密码(区块链)
exports.modifyPwd = function(addr, pwdold, pwdnew){
	//用户addr不存在或密码错误
	var reg = xtalk.chkInfo.call(addr, pwdold, 3);
	if(reg != 1) return "RSE002";

	//修改密码
	var val2 = "";
	ret = xtalk.setUserStr.sendTransaction(addr, pwdold, 1, pwdnew, val2, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";
}

//进行用户转账(区块链)
exports.sendMoney = function(from, frompwd, to, money, msg){
	var blank = "";
	//地址未注册或密码无效 
	var reg = xtalk.chkInfo.call(from, frompwd, 3);
	if(reg != 1) return "RSE002";
	
	//判断转账地址是否有效
	var regU = xtalk.chkInfo.call(to, blank, 1);
	if(regU != 1) return "RSE004";
	
	//转账金额无效 4
	var moneyloc = parseInt(money);
	var myMoney = xtalk.getUserUint.call(from, frompwd, 1, blank);
	if(isNaN(moneyloc) || myMoney < moneyloc) return "RSE005";
	
	//验证消息条数
	var msgNum = xtalk.getUserUint.call(from, frompwd, 2, blank);
	if(msgNum < 1) return "RSE015";
	
	//转账
	ret = xtalk.sendMoney.sendTransaction(from, frompwd, to, moneyloc, {from : web3.eth.coinbase, gas:3000000});
	
	//发送留言
	var channelID = xhelp.getChannelID(from, to);
	var newmsg;
	if(msg == ""){
		newmsg = "转账金额："+money;
	}else{
		newmsg = "转账金额和留言："+money+"--"+msg;
	}
	
	var crypted = xhelp.addpwd(newmsg);
	var time = xhelp.getNow();
	var MSG = {
		"from":from,
		"msg":crypted,
		"date":time
	}
	MSG = JSON.stringify(MSG);
	console.log("111111111");
	var sendMsg = xtalk.sendMsg.sendTransaction(from, frompwd, to, channelID, MSG, {from : web3.eth.coinbase, gas:3000000});
	return "RSY000";
}

//验证用户信息(区块链)
exports.validAddr = function(addr, pwd){
	//地址未注册
	var reg = xtalk.chkInfo.call(addr, pwd, 3);
	if(reg != 1) return "RSE002";
	
	//返回当前汇率代币余额和可用消息数目
	var channelID = "";
	var rate = xtalk.getAdminUint.call(admin, apwd, 2);
	var msgrate = xtalk.getAdminUint.call(admin, apwd, 3);
	var money = xtalk.getUserUint.call(addr, pwd, 1, channelID);
	var msgtotal = xtalk.getUserUint.call(addr, pwd, 2, channelID);
	var retObj = {
		"rate" : rate, //汇率
		"msgrate" : msgrate, //每代币购买消息数
		"money" : money, //代币余额
		"msgtotal": msgtotal //可用消息数
	};
	return JSON.stringify(retObj);
}

//删除指定用户指定交易
exports.delTransact = function(addr, pwd, txid){
	//地址未注册或密码不对
	if(!userDB[addr] || userDB[addr].pwd != pwd) return "RSE002";
	
	//删除指定交易
	for(var idx = 0; idx < userDB[addr].transacts.length; idx++){
		var tid = userDB[addr].transacts[idx];
		if(tid && tid == txid){
			userDB[addr].transacts[idx] = "";
		   	tranDB[tid] = ""
			return "RSY000";
		}
	}
	
	//没找到指定的交易
	return "RSE009";
}

//得到指定用户交易列表
exports.getTransacts = function(addr, pwd, start, count){
	//地址未注册
	if(!userDB[addr] || userDB[addr].pwd != pwd) return "RSE002";
	
	//判断交易列表是否有效
	if(userDB[addr].transacts.length == 0) return "RSE007";
	
	//得到起止范围,检查是否有效整数
	var ss = parseInt(start, 10);
	var cc = parseInt(count, 10);
	if(isNaN(ss) || isNaN(cc) || ss< 0 ||
	   ss >= userDB[addr].transacts.length ||
	   cc <= 0) return "RSE008";
	
	//判断是否得到默认列表
	var txarr = [];
	
	//得到起止索引 [start, end)
	var startloc = ss, endloc = startloc + cc;
	if(endloc > userDB[addr].transacts.length)
		endloc = userDB[addr].transacts.length;	
		
	//得到指定范围的交易
	for(var idx=startloc; idx<endloc; idx++){
		if(userDB[addr].transacts[idx])
			txarr.push(tranDB[userDB[addr].transacts[idx]]);
	}
	
	//返回交易列表
	var retObj = {
		"totoal": userDB[addr].transacts.length,
		"txs": txarr
	};
	return JSON.stringify(retObj);
}
