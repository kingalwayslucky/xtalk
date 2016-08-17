/**
 * 返回键
 */
//首页返回键处理
//处理逻辑：1秒内，连续两次按返回键，则退出应用；
var firstback = null;
mui.back = function() {
	//首次按键，提示‘再按一次退出应用’
	if (!firstback) {
		firstback = new Date().getTime();
		mui.toast(dictRes[resType]["allPage023"]);
		setTimeout(function() {
			first = null;
		}, 1000);
	} else {
		if (new Date().getTime() - firstback < 1000) {
			plus.runtime.quit();
		} else {
			firstback = new Date().getTime();
			mui.toast(dictRes[resType]["allPage023"]);
			setTimeout(function() {
				first = null;
			}, 1000);
		}
	}
};