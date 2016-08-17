//使用前包含外部js
var dictRes = {
	"CHINESE" : dictChinese, //中文资源字典
	"ENGLISH" : dictEnglish, //英文资源字典
	"TCHINESE" : dictTChinese, //繁体中文字典
	"KOREAN" : dictKorean, //韩语字典
	"JAPANESE" : dictJapanese, //日语中文字典
	"TIBETAN" : dictTibetan //藏语中文字典
}
//用法实例
//var resType = "CHINESE";
//console.log(dictRes[resType]["google"]);
function resReplace(resType, changeLan) {
	for(var i=0; i<changeLan.length; i++){
		if(changeLan[i]){
			if(changeLan[i].ATYPE == 1){
				document.getElementById(changeLan[i].TID).innerText = dictRes[resType][changeLan[i].RID];
			}else if(changeLan[i].ATYPE == 2){
				document.getElementById(changeLan[i].TID).setAttribute("placeholder",dictRes[resType][changeLan[i].RID]);
			}
		}
	}
}

