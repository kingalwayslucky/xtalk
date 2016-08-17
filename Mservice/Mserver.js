//全局帮助函数
var common = require("./common");
var mapi001 = require("./X001Wrapper");
var express = require('express');
var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//测试
app.get('/', function (req, res) {
	var retStr = common.getRetStr("none", "ERR", "请求参数无效!");
	res.send(retStr);
});

// get 请求云服务
app.get('/api', function (req, res) {
	//定义处理结果对象
	var retStr = "";
	
	//检查参数是否有效
	if(!req.query.argin){
		retStr = common.getRetStr("none", "ERR", "输入参数丢失!");
		res.send(retStr);
		return;
	}
	//检查参数是否有效
	try{
//		console.log(req.query.argin)
		var argObj = JSON.parse(req.query.argin);
//		console.log(argObj);
		if(!argObj || !argObj.version || !argObj.codein){
			retStr = common.getRetStr("none", "ERR", "请求参数格式不支持!");
		}else if(argObj.version == "0.0.3"){
			//处理0.0.3API集合（Xtalk服务）
			retStr = xtalk.getRetObj(res, argObj);
		}else{
			//不支持的API集合
			retStr = common.getRetStr("none", "ERR", "不支持的API版本!");
		}
	}catch(e){
		retStr = common.getRetStr("none", "ERR", "请求失败!");
	}
	
	//二维码特殊处理
	if(argObj.version && argObj.version == "0.0.3" && argObj.codein && argObj.codein == "BM003") return;
	//返回处理结果
	res.send(retStr);
});

var server = app.listen(common.configs["port"], function () {
  console.log("服务已启动,端口号是："+common.configs["port"]);
});
