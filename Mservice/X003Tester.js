//通用区块云服务测试框架v0.2 by yx 2016-05
var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = [ { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "chkType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "chk Type", "template": "elements_input_uint" } ], "name": "chkInfo", "outputs": [ { "name": "", "type": "uint256" } ], "type": "function", "displayName": "chk Info" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" } ], "name": "addUser", "outputs": [], "type": "function", "displayName": "add User" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "val1", "type": "string", "typeShort": "string", "bits": "", "displayName": "val1", "template": "elements_input_string" }, { "name": "val2", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "val2", "template": "elements_input_uint" } ], "name": "setUserStr", "outputs": [], "type": "function", "displayName": "set User Str" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" } ], "name": "getAdminUint", "outputs": [ { "name": "", "type": "uint256" } ], "type": "function", "displayName": "get Admin Uint" }, { "constant": false, "inputs": [ { "name": "aaddr", "type": "string", "typeShort": "string", "bits": "", "displayName": "aaddr", "template": "elements_input_string" }, { "name": "apwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "apwd", "template": "elements_input_string" }, { "name": "uaddr", "type": "string", "typeShort": "string", "bits": "", "displayName": "uaddr", "template": "elements_input_string" }, { "name": "money", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "money", "template": "elements_input_uint" } ], "name": "inCharge", "outputs": [], "type": "function", "displayName": "in Charge" }, { "constant": false, "inputs": [ { "name": "addrfrom", "type": "string", "typeShort": "string", "bits": "", "displayName": "addrfrom", "template": "elements_input_string" }, { "name": "pwdfrom", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwdfrom", "template": "elements_input_string" }, { "name": "addrto", "type": "string", "typeShort": "string", "bits": "", "displayName": "addrto", "template": "elements_input_string" }, { "name": "money", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "money", "template": "elements_input_uint" } ], "name": "sendMoney", "outputs": [], "type": "function", "displayName": "send Money" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "type": "function", "displayName": "kill" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "money", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "money", "template": "elements_input_uint" } ], "name": "addMsgTotal", "outputs": [], "type": "function", "displayName": "add Msg Total" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "value", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "value", "template": "elements_input_uint" } ], "name": "setAdminUint", "outputs": [], "type": "function", "displayName": "set Admin Uint" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "target", "type": "string", "typeShort": "string", "bits": "", "displayName": "target", "template": "elements_input_string" }, { "name": "channelID", "type": "string", "typeShort": "string", "bits": "", "displayName": "channel I D", "template": "elements_input_string" }, { "name": "msg", "type": "string", "typeShort": "string", "bits": "", "displayName": "msg", "template": "elements_input_string" } ], "name": "sendMsg", "outputs": [], "type": "function", "displayName": "send Msg" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "idx", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "idx", "template": "elements_input_uint" }, { "name": "channelID", "type": "string", "typeShort": "string", "bits": "", "displayName": "channel I D", "template": "elements_input_string" } ], "name": "getUserStr", "outputs": [ { "name": "", "type": "string" } ], "type": "function", "displayName": "get User Str" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "value", "type": "string", "typeShort": "string", "bits": "", "displayName": "value", "template": "elements_input_string" }, { "name": "idx", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "idx", "template": "elements_input_uint" } ], "name": "setAdminStr", "outputs": [], "type": "function", "displayName": "set Admin Str" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "channelID", "type": "string", "typeShort": "string", "bits": "", "displayName": "channel I D", "template": "elements_input_string" } ], "name": "getUserUint", "outputs": [ { "name": "", "type": "uint256" } ], "type": "function", "displayName": "get User Uint" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "target", "type": "string", "typeShort": "string", "bits": "", "displayName": "target", "template": "elements_input_string" }, { "name": "channelID", "type": "string", "typeShort": "string", "bits": "", "displayName": "channel I D", "template": "elements_input_string" } ], "name": "delChannel", "outputs": [], "type": "function", "displayName": "del Channel" }, { "constant": false, "inputs": [ { "name": "addr", "type": "string", "typeShort": "string", "bits": "", "displayName": "addr", "template": "elements_input_string" }, { "name": "pwd", "type": "string", "typeShort": "string", "bits": "", "displayName": "pwd", "template": "elements_input_string" }, { "name": "dataType", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "data Type", "template": "elements_input_uint" }, { "name": "idx", "type": "uint256", "typeShort": "uint", "bits": "256", "displayName": "idx", "template": "elements_input_uint" } ], "name": "getAdminStr", "outputs": [ { "name": "", "type": "string" } ], "type": "function", "displayName": "get Admin Str" }, { "inputs": [], "type": "constructor" } ];

var xtalk = web3.eth.contract(abi).at("0x4021bA268811432220b43E88EC25f314da202773");

//处理命令行参数
var MAX_LEN = 35;
var args = process.argv.splice(2);
if(args.length == 0){
	console.log('Xtalk区块服务测试框架V0.1 用法如下:');
	console.log(formatStr("0 addr pwd chkType", MAX_LEN)+"检查指定信息是否有效chkType:1 验证用户地址是否注册;2 验证管理员信息;3 用户信息验证");
	console.log(formatStr("1 dataType idx", MAX_LEN)+"dataType 1：得到公开电子币账户地址；2：合约版本信息");
	console.log(formatStr("2 dataType value idx", MAX_LEN)+"dataType:1 设置公开电子币账户地址;2 设置管理员密码");
	console.log(formatStr("3 dataType", MAX_LEN)+"dataType:1 得到系统注册用户数;2 得到当前电子币汇率;3 得到当前每代币购买消息数");	
	console.log(formatStr("4 dataType value", MAX_LEN)+"dataType:1 设置当前电子币汇率;2 得到当前每代币购买消息数");
	console.log(formatStr("5 addr pwd", MAX_LEN)+"注册新用户");	
	console.log(formatStr("6 addr pwd dataType idx channelID", MAX_LEN)+"dataType:1 指定联系人  idx:联系人列表索引;2 得到指定消息通道指定消息 idx:消息通道索引");
	console.log(formatStr("7 addr pwd dataType val1 val2", MAX_LEN)+"dataType:1 设置用户密码  val1:新密码;2 删除指定通道指定消息 val1:消息通道ID val2:索引");
	console.log(formatStr("8 addr pwd dataType channelID", MAX_LEN)+"dataType:1 得到用户余额;2 得到可用消息数目;3 联系人总数;4 得到指定消息通道消息总数");
	console.log(formatStr("9 uaddr money", MAX_LEN)+"管理员充值");	
	console.log(formatStr("10 addr pwd money", MAX_LEN)+"用户购买消息");
	console.log(formatStr("11 addr pwd addrto money", MAX_LEN)+"用户转账");
	console.log(formatStr("12 addr pwd target channelID msg", MAX_LEN)+"向指定用户发送消息");
	console.log(formatStr("13 addr pwd target channelID", MAX_LEN)+"删除消息通道");
	return;
}

//得到工作模式
var workMode = args[0];

//检查参数信息是否有效
function chkArgsOK(argsIn, len, errInfo){
	if(argsIn.length != len+1
	){
		console.log(errInfo);
		return false;
	}
	return true;
}

//返回固定长度的字符串，不足部分右补空格
function formatStr(str, len){
	if(str.length >= len) return str;
	
	var tmp = '';
	for(var idx=0; idx < len-str.length; idx++)
		tmp += ' ';
	return "   " + str + tmp + " -> ";
}

//管理员信息
var admin = "ADMIN0123456789ADMIN";
var apwd = "19830811";

var ret;

//检查指定信息是否有效chkType:1 验证用户地址是否注册;2 验证管理员信息;3 用户信息验证(读)
if(workMode == "0"){ 
	if(!chkArgsOK(args, 3, '参数无效: 0 addr pwd chkType')) return;
	
	//得到用户信息
	var addr = args[1];
	var pwd = args[2];
	var chkType = args[3];
	ret = xtalk.chkInfo.call(addr, pwd, chkType);
}

//得到管理员指定的字符串信息，dataType 1：得到公开电子币账户地址；2：合约版本信息；(读)
if(workMode == "1"){ 
	if(!chkArgsOK(args, 2, '参数无效: 1 dataType idx')) return;
	//得到用户信息
	var dataType = args[1];
	var idx = args[2];
	ret = xtalk.getAdminStr.call(admin, apwd, dataType, idx);
}

//dataType:1 设置公开电子币账户地址;2 设置管理员密码（写）
if(workMode == "2"){ 
	if(!chkArgsOK(args, 3, '参数无效: 2 dataType value idx')) return;
	
	//得到用户信息
	var dataType = args[1];
	var value = args[2];
	var idx = args[3];
	ret = xtalk.setAdminStr.sendTransaction(admin, apwd, dataType, value, idx, {from : web3.eth.coinbase, gas:3000000});
}

//得到管理员指定的整数信息(读)
//dataType:
//	1 得到系统注册用户数
//	2 得到当前电子币汇率
//	3 得到当前每代币购买消息数
if(workMode == "3"){ 
	if(!chkArgsOK(args, 1, '参数无效: 3 dataType')) return;
	
	//得到用户信息
	var dataType = args[1];
	ret = xtalk.getAdminUint.call(admin, apwd, dataType);
}

//设置管理员指定的整数信息(写)
//dataType:
//	1 设置当前电子币汇率
//	2 得到当前每代币购买消息数
if(workMode == "4"){ 
	if(!chkArgsOK(args, 2, '参数无效: 4 dataType value')) return;
	
	//得到用户信息
	var dataType = args[1];
	var value = args[2];
	ret = xtalk.setAdminUint.sendTransaction(admin, apwd, dataType, value, {from : web3.eth.coinbase, gas:3000000});
}

//注册新用户(写)
if(workMode == "5"){ 
	if(!chkArgsOK(args, 2, '参数无效: 5 addr pwd')) return;
	
	//得到用户信息
	var addr = args[1];
	var pwd = args[2];
	ret = xtalk.addUser.sendTransaction(addr, pwd, {from : web3.eth.coinbase, gas:3000000});
}

//得到用户字符串信息(读)
//dataType:
//	1 指定联系人  idx:联系人列表索引
//	2 得到指定消息通道指定消息 idx:消息通道索引
if(workMode == "6"){ 
	if(!chkArgsOK(args, 5, '参数无效: 6 addr pwd dataType idx channelID')) return;
	
	//得到用户信息
	var addr = args[1];
	var pwd = args[2];
	var dataType = args[3];
	var idx = args[4];
	var channelID = args[5];
	ret = xtalk.getUserStr.call(addr, pwd, dataType, idx, channelID);
}

//设置用户字符串信息(写)
//dataType:
//	1 设置用户密码  val1:新密码
//	2 删除指定通道指定消息 val1:消息通道ID val2:索引
if(workMode == "7"){ 
	if(!chkArgsOK(args, 5, '参数无效: 7 addr pwd dataType val1 val2')) return;
	
	//得到用户信息
	var addr = args[1];
	var pwd = args[2];
	var dataType = args[3];
	var val1 = args[4];
	var val2 = args[5];
	ret = xtalk.setUserStr.sendTransaction(addr, pwd, dataType, val1, val2, {from : web3.eth.coinbase, gas:3000000});
}

//得到用户整数信息(读)
//dataType:
//	1 得到用户余额
//	2 得到可用消息数目
//	3 联系人总数
//	4 得到指定消息通道消息总数
if(workMode == "8"){ 
	if(!chkArgsOK(args, 4, '参数无效: 8 addr pwd dataType channelID')) return;
	
	//得到用户信息
	var addr = args[1];
	var pwd = args[2];
	var dataType = args[3];
	var channelID = args[4];
	ret = xtalk.getUserUint.call(addr, pwd, dataType, channelID);
}

//管理员充值(写)
if(workMode == "9"){ 
	if(!chkArgsOK(args, 2, '参数无效: 9 uaddr money')) return;
	
	//得到用户信息
	var uaddr = args[1];
	var money = args[2];
	ret = xtalk.inCharge.sendTransaction(admin, apwd, uaddr, money, {from : web3.eth.coinbase, gas:3000000});
}


//用户购买消息(写)
if(workMode == "10"){
	if(!chkArgsOK(args, 3, '参数无效: 10 addr pwd money')) return;
	
	//得到用户信息
	var addr = args[1];
	var pwd = args[2];
	var money = args[3];
	ret = xtalk.addMsgTotal.sendTransaction(addr, pwd, money, {from : web3.eth.coinbase, gas:3000000});
}

//用户转账(写)
if(workMode == "11"){
	if(!chkArgsOK(args, 4, '参数无效: 11 addr pwd addrto money')) return;
	
	//得到用户信息
	var addr = args[1];
	var pwd = args[2];
	var addrto = args[3];
	var money = args[4];
	ret = xtalk.sendMoney.sendTransaction(addr, pwd, addrto, money, {from : web3.eth.coinbase, gas:3000000});
}

//向指定用户发送消息(写)
if(workMode == "12"){
	if(!chkArgsOK(args, 5, '参数无效: 12 addr pwd target channelID msg')) return;
	
	//得到用户信息
	var addr = args[1];
	var pwd = args[2];
	var target = args[3];
	var channelID = args[4];
	var msg = args[5];
	ret = xtalk.sendMsg.sendTransaction(addr, pwd, target, channelID, msg, {from : web3.eth.coinbase, gas:3000000});
}

//删除消息通道(写)
if(workMode == "13"){
	if(!chkArgsOK(args, 4, '参数无效: 13 addr pwd target channelID')) return;
	
	//得到用户信息
	var addr = args[1];
	var pwd = args[2];
	var target = args[3];
	var channelID = args[4];
	ret = xtalk.delChannel.sendTransaction(addr, pwd, target, channelID, {from : web3.eth.coinbase, gas:3000000});
}
//输出处理结果
console.log(workMode+"->["+ret+"]");