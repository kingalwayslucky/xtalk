//得到消息通道散列值
var crypto = require('crypto');
var fs = require("fs");

//全局配置入口
exports.configs = {
	"port" : 8888 //服务监听端口
};

//得到指定联系人对的消息通道ID
exports.getChannelID = function(from, to){
	//得到消息通道ID
	var tmp = from + "" + to;
	if(from > to) tmp = to + "" + from;
	var sha1 = crypto.createHash('sha1');
	sha1.update(JSON.stringify(tmp));
	var channelID = sha1.digest('hex')+"";
	return channelID;
};
//返回指定的json对象的字符串描述
exports.getRetStr = function(codein, cbmin, cmsin){
	var retObj = {
		"codeout": codein,
		"cbm": cbmin,
		"cms" : cmsin	
	};
	return JSON.stringify(retObj);
};
//生成指定地址的二维码
exports.getQrImg = function(addr, res){
//	try {
//		var qr = require('qr-image');
//		var fs = require('fs');
//      var img = qr.image(addr,  {size :10});
//      var stream = fs.createWriteStream(__dirname + '/addrs/'+addr+'.jpg') ;
//      img.pipe(stream);
//      
//      res.writeHead(200, {'Content-Type': 'image/jpg'});
//      fs.createReadStream(__dirname + '/addrs/'+addr+'.jpg').pipe(res);
//  } catch (e) {
//      res.writeHead(414, {'Content-Type': 'text/html'});
//      res.end('<h1>qr err</h1>');
//  }

	try {
		var qr = require('qr-image');
		var fs = require('fs');
        var img = qr.image(addr,  {size :10});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
   } catch (e) {
        res.writeHead(414, {'Content-Type': 'text/html'});
        res.end('<h1>qr err</h1>');
    }
};

exports.getQrImg2 = function(addr){
	console.log("");
	return;
	
	try {
		var qr = require('qr-image');
		var fs = require('fs');
        var img = qr.image(addr,  {size :10});
        var stream = fs.createWriteStream(__dirname + '/addrs/'+addr+'.jpg') ;
        img.pipe(stream);
    } catch (e) {
    		console.log(e);
    }
};

//得到当前时间字符串
exports.getNow = function(){
	var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

//生成新随机公开地址
exports.getNewAddr = function(){
	//得到随机密码长度40-60位
	var len = Math.random()*20 + 40;
	len = parseInt(len, 10);

	//生成指定长度随机数码
	var randUID = crypto.randomBytes(len).toString('hex');  
	var shasum = crypto.createHash('sha512');
	shasum.update(randUID);
	var addrtmp = shasum.digest('hex');
	var rimp160 = crypto.createHash('ripemd160');
	rimp160.update(addrtmp);
	var addr = rimp160.digest('hex');

	return "A"+addr.toUpperCase()+"A";
};

//生成新随机公开地址
exports.getAddrHash = function(addr){
	//生成指定长度随机数码
	var shasum = crypto.createHash('sha512');
	shasum.update(addr);
	var hashtmp = shasum.digest('hex');
	var rimp160 = crypto.createHash('ripemd160');
	rimp160.update(hashtmp);
	var hashloc = rimp160.digest('hex');

	return "H"+hashloc.toUpperCase()+"H";
};

//消息加密
exports.addpwd = function(msg){
	//加密
	var len = Math.random()*8 + 8;
	len = parseInt(len, 10);
	var lenStr = "ab"+ len;
	if (len < 10) lenStr = "ab0" + len + "";
	//生成指定长度随机数码
	var randPwd = crypto.randomBytes(len).toString('hex');  
	//加密原始明文
	var cipher = crypto.createCipher('aes-256-cbc',randPwd);
	var crypted = cipher.update(msg,'utf8','hex');
	crypted += cipher.final('hex');
	
	//得到拼接字符串
	crypted = lenStr + randPwd + crypted;
	return crypted;
}

//0.0.4-根据分组内容获得hash
exports.getContentHash = function(info){
	//生成指定长度随机数码
	var shasum = crypto.createHash('sha512');
	shasum.update(info);
	var hashtmp = shasum.digest('hex');
	var rimp160 = crypto.createHash('ripemd160');
	rimp160.update(hashtmp);
	var hashloc = rimp160.digest('hex');

	return hashloc.toUpperCase();
}

//上传文件测试
//exports.uploadFile = function(files, name){
//	console.log("+++++++>"+files);
//	var co = require('co');
//	var OSS = require('ali-oss');
//	var fs = require('fs');
//
//	var client = new OSS({
//		region: 'oss-cn-shanghai',
//		accessKeyId: '3mF1hC6UIidCr7tD',
//		accessKeySecret: 'SG9EBz9G6AaEgrVGIWi7NdeEanqPZ2',
//		bucket: 'ethtesting'
//	});
//	
//	var imgData = files;
//	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
//	var dataBuffer = new Buffer(base64Data, 'base64');
//	fs.writeFile("out.png", dataBuffer, function(err) {
//		if(err){
//		  console.log("err");
//		}else{
//		  console.log("success");
//		}
//	});
//	
////	var buf = new Buffer(files);
//	co(function* () {
//		// use 'chunked encoding'
//		console.log(files.responseText);
//		var stream = fs.createReadStream("out.png");
//		var result = yield client.putStream(name, stream);
//		console.log(result);
//
//		// don't use 'chunked encoding'
////		var stream = fs.createReadStream('local-file');
////		var size = fs.statSync('local-file').size;
////		var result = yield client.putStream(
////  		'object-key', stream, {contentLength: size});
////		console.log(result);
//	}).catch(function (err) {
//		console.log(err);
//	});
//}

//获取验证码
exports.getCode = function(tel){
	var App = require('alidayu-node');
	var app = new App('23427068', 'd8fe46b25c6fefd4ac7494a73bf867e3');
	//生成验证码
	var rnd = ""
	for(var i=0; i<6; i++){
		rnd += Math.floor(Math.random()*10);
	}
	
	app.smsSend({
	    sms_free_sign_name: '小红花', //短信签名，参考这里 http://www.alidayu.com/admin/service/sign
	    sms_param: JSON.stringify({"code": rnd}),//短信变量，对应短信模板里面的变量
	    rec_num: tel, //接收短信的手机号
	    sms_template_code: 'SMS_13005010' //短信模板，参考这里 http://www.alidayu.com/admin/service/tpl
	},function(result){
		console.log("result:"+JSON.stringify(result));
		if(result.alibaba_aliqin_fc_sms_num_send_response && result.alibaba_aliqin_fc_sms_num_send_response.result &&
		result.alibaba_aliqin_fc_sms_num_send_response.result.success == true){
			fs.writeFileSync(tel, rnd, "utf-8")	
		}
	});
	return "RSY000";
}

//验证验证码
exports.chkCode = function(tel, code){
	try{
		var data = fs.readFileSync(tel,"utf-8");
		if(data == code){
			fs.unlinkSync(tel);
			return "RSY000";
		}else{
			return "RSE014";
		}
	}catch(e){
		return "RSE014";
	}
}
