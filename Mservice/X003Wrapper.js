/**
 * 功能:处理API集合0.0.1相关功能
 * */
var xdict = require("./X003Dict");

//返回指定错误信息
exports.getRetObj = function(res, argObj){
	var retStr = "";
	var xhelp = require("./common");
	var xdata = require("./X003Data");
	var retCode = 9;//未知错误
	
	if(argObj.codein == "BM001"){//检查服务器是否可用（获得合约信息）*
		retCode = xdata.getSystemInfo();
		retStr = xhelp.getRetStr(argObj.codein, "OK", retCode);
	}else if(argObj.codein == "BM002"){
		//默认错误地址*
		retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE002");
		try{
			retStr = xhelp.getRetStr(argObj.codein, "OK", xhelp.getNewAddr());
		}catch(e){ }
	}else if(argObj.codein == "BM003"){
		//得到指定地址二维码*
		if(!argObj.addr || argObj.addr.length < 10){
			res.writeHead(414, {'Content-Type': 'text/html'});
        		retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
			return retStr;
		}
		xhelp.getQrImg(argObj.addr, res);
	}else if(argObj.codein == "BM004"){
		//用户注册,检查地址或者密码是否有效*
		if(!argObj.addr || !argObj.pwd){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			if(xdata.chkAddr(argObj.addr, argObj.pwd)){
				retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE003");
			}else{
				//进行实际注册*
				retCode = xdata.addAddr(argObj.addr, argObj.pwd);
				retStr = xhelp.getRetStr(argObj.codein, "OK", retCode);
			}
		}
	}else if(argObj.codein == "BM005"){
		if(!argObj.addr || !argObj.pwd){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			//用户验证，验证成功返回余额，失败返回原因*
			retCode = xdata.validAddr(argObj.addr, argObj.pwd);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM006"){
		//密码修改*
		if(!argObj.addr || !argObj.pwdold || !argObj.pwdnew){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.modifyPwd(argObj.addr, argObj.pwdold, argObj.pwdnew);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM007"){
		//转账 from to money*
		if(!argObj.from || !argObj.frompwd || !argObj.to || !argObj.money){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.sendMoney(argObj.from, argObj.frompwd, argObj.to, argObj.money, argObj.msg);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM008"){
		//得到系统统计状态*
		retStr = xhelp.getRetStr(argObj.codein, "OK", xdata.getInfo());
	}else if(argObj.codein == "BM009"){
		//系统充值*
		if(!argObj.admin || !argObj.pwd || !argObj.target || !argObj.money){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.inCharge(argObj.admin, argObj.pwd, argObj.target, argObj.money);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM010"){
		//系统提现
		if(!argObj.admin || !argObj.pwd || !argObj.target || !argObj.money){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.withDraw(argObj.admin, argObj.pwd, argObj.target, argObj.money);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM011"){
		//得到指定范围的交易列表
		if(!argObj.addr || !argObj.pwd || !argObj.start || !argObj.count){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.getTransacts(argObj.addr, argObj.pwd, argObj.start, argObj.count);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM012"){
		//删除指定交易
		if(!argObj.addr || !argObj.pwd || !argObj.txid){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.delTransact(argObj.addr, argObj.pwd, argObj.txid);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM013"){
		//得到指定地址的联系人列表*
		if(!argObj.addr || !argObj.pwd || !argObj.start || !argObj.count){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.getContacts(argObj.addr, argObj.pwd, argObj.start, argObj.count);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM014"){
		//消息发送*
		if(!argObj.addr || !argObj.pwd || !argObj.target || !argObj.msg){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.sendMsg(argObj.addr, argObj.pwd, argObj.target, argObj.msg);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM015"){
		//得到指定联系人的消息列表*
		if(!argObj.addr || !argObj.pwd || !argObj.target || !argObj.start || !argObj.count){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.getMessages(argObj.addr, argObj.pwd, argObj.target, argObj.start, argObj.count);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM016"){
		//解码指定消息
		if(!argObj.addr || !argObj.pwd || !argObj.msg){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.decodeMsg(argObj.addr, argObj.pwd, argObj.msg);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM017"){
		//删除指定消息*
		if(!argObj.addr || !argObj.pwd || !argObj.idx || !argObj.target){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.delMsg(argObj.addr, argObj.pwd, argObj.idx, argObj.target);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM018"){
		//冲值消息发送条数*
		if(!argObj.addr || !argObj.pwd || !argObj.money){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.addMsgTotal(argObj.addr, argObj.pwd, argObj.money);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM019"){
		//删除会话通道*
		if(!argObj.addr || !argObj.pwd || !argObj.target){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.delChannel(argObj.addr, argObj.pwd, argObj.target);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM020"){
		//得到指定联系人消息总数*
		if(!argObj.addr || !argObj.pwd || !argObj.target){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.getMsgCnt(argObj.addr, argObj.pwd, argObj.target);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM021"){
		//返回指定地址联系人列表总数*
		if(!argObj.addr || !argObj.pwd){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.getContCnt(argObj.addr, argObj.pwd);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM022"){
		//返回指定地址交易列表总数
		if(!argObj.addr || !argObj.pwd){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.getTranCnt(argObj.addr, argObj.pwd);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM023"){
		//用户打赏系统*
		if(!argObj.addr || !argObj.pwd || !argObj.money){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.rewardMoney(argObj.addr, argObj.pwd, argObj.money, argObj.msg);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM024"){
		//管理员提现
		if(!argObj.admin || !argObj.pwd || !argObj.money){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.adminWithDraw(argObj.addr, argObj.pwd, argObj.money);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM025"){
		//用户提现请求
		if(!argObj.addr || !argObj.pwd || !argObj.money || !argObj.target){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.userWithDraw(argObj.addr, argObj.pwd, argObj.money, argObj.target);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM026"){
		//处理用户提现请求
		if(!argObj.admin || !argObj.pwd || !argObj.idx){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.handleWithDraw(argObj.addr, argObj.pwd, argObj.idx);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM027"){
		//得到指定范围的提现请求
		if(!argObj.admin || !argObj.pwd || !argObj.start || !argObj.count){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.getWithDraws(argObj.admin, argObj.pwd, argObj.start, argObj.count);
			retStr = xhelp.getRetStr(argObj.codein, xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else if(argObj.codein == "BM028"){
		//设置系统指定状态*
		if(!argObj.admin || !argObj.pwd || !argObj.type || !argObj.value){
			retStr = xhelp.getRetStr(argObj.codein, "ERR", "RSE001");
		}else{
			retCode = xdata.setInfo(argObj.admin, argObj.pwd, argObj.type, argObj.value);
			retStr = xhelp.getRetStr(argObj.codein, 
				xdict.chkErrCode(retCode)? "ERR" : "OK", retCode);
		}
	}else{
		retStr = xhelp.getRetStr(argObj.codein, "ERR", 
			"不支持的请求代码["+ argObj.codein +"]");
	}
	return retStr;
};
