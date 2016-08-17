contract xtalk06{
	struct UserObj{//用户对象定义
		bytes32 addr; //登陆地址
		bytes32 pwd; //登陆密码
		uint money; //用户余额
		uint msgtotal; //可用消息条数
		string[] contList; //联系人列表
	}
	
	struct AdminObj{//系统管理员定义
		bytes32 addr; //登陆地址
		bytes32 pwd;  //登陆密码
		string pubaddr;  //对外公共
		string info;//软件介绍
		uint totalUser;  //系统总的注册用户
		uint rate;  //与外部绑定的电子货币的固定汇率
		uint msgrate;  //一个代币购买的消息数目
	}
	
	//合约拥有者，销毁用
	address owner;
	
	//各种占位符
	string EMPTYSTR; 
	string USERADDR;  
	
	//管理员定义
	AdminObj admin;

	//多重通用数据字典
	mapping(string => mapping(string => uint)) uintDB;
	
	//用户数据库
	mapping(string => UserObj) userDB;
	
	//消息数据库
	mapping(string => string[]) msgDB;
	
	//构造函数，初始化管理员信息和服务版本介绍和各项数据占位符
	function xtalk06() {
		owner = msg.sender;
		
		//初始化系统管理对象
		admin.addr = sha3("ADMIN0123456789ADMIN");
		admin.pwd = sha3("19830811");
		admin.pubaddr = "0x8082b9FcaA59603fe634F48168641B3Df715d850";
		admin.info = "contract for xtalk v0.6.0 by yangxi www.ethcloud.net 2016.05.27";
		
		admin.totalUser = 0;
		admin.rate = 1000;
		admin.msgrate = 10;
		
		//各种占位符
		EMPTYSTR = ""; 
		USERADDR = "USERADDR";
	}
	
	//合约销毁函数
	function kill(){
		if(msg.sender == owner) suicide(owner);
	}
	
	//检查指定信息是否有效
	function chkInfo(string addr, string pwd, uint chkType) returns(uint){
		//1 验证用户地址是否注册
		if(chkType == 1){
			return uintDB[USERADDR][addr];
		}
		
		//2 验证管理员信息
		if(chkType == 2){
			return (sha3(addr) != admin.addr || sha3(pwd) != admin.pwd) ? 0 : 1;
		}
		
		//3 用户信息验证
		if(chkType == 3){
			return (uintDB[USERADDR][addr] != 1 || sha3(pwd) != userDB[addr].pwd) ? 0 : 1;
		}
		
		//未知验证类型
		return 9;
	}
	
	//得到管理员指定的字符串信息
	function getAdminStr(string addr, string pwd, uint dataType, uint idx) returns(string){
		//验证管理员信息
		string retStr = EMPTYSTR;
		if(sha3(addr) != admin.addr || sha3(pwd) != admin.pwd) return retStr;
		
		//得到公开电子币账户地址
		if(dataType == 1) retStr = admin.pubaddr;
		
		//得到软件版本信息
		if(dataType == 2) retStr = admin.info;
		
		//返回指定结果
		return retStr;
	}
	
	//设置管理员指定的字符串信息
	function setAdminStr(string addr, string pwd, uint dataType, string value, uint idx){
		//验证管理员信息
		if(sha3(addr) != admin.addr || sha3(pwd) != admin.pwd) return;
		
		//设置公开电子币账户地址
		if(dataType == 1) admin.pubaddr = value;
		
		//设置管理员密码
		if(dataType == 2) admin.pwd = sha3(value);
	}
	
	//得到管理员指定的整数信息
	function getAdminUint(string addr, string pwd, uint dataType) returns(uint){
		//验证管理员信息
		uint retUint = 0;
		if(sha3(addr) != admin.addr || sha3(pwd) != admin.pwd) return retUint;
		
		//得到系统注册用户数
		if(dataType == 1) retUint = admin.totalUser;
		
		//得到当前电子币汇率
		if(dataType == 2) retUint = admin.rate;
		
		//得到当前每代币购买消息数
		if(dataType == 3) retUint = admin.msgrate;

		//返回指定结果
		return retUint;
	}
	
	//设置管理员指定的整数信息
	function setAdminUint(string addr, string pwd, uint dataType, uint value){
		//验证管理员信息
		if(sha3(addr) != admin.addr || sha3(pwd) != admin.pwd) return;
		
		//设置当前电子币汇率
		if(dataType == 1) admin.rate = value;
		
		//得到当前每代币购买消息数
		if(dataType == 2) admin.msgrate = value;
	}
	
	//注册新用户
	function addUser(string addr, string pwd){
		//检查该用户地址是否已经注册
		if(uintDB[USERADDR][addr] == 1) return;
		
		//设置地址占位符哈希映射原始地址
		uintDB[USERADDR][addr] = 1;
		
		//添加用户用户总数
		admin.totalUser += 1;
		
		//添加用户信息
		UserObj user = userDB[addr];
		user.addr = sha3(addr);
		user.pwd = sha3(pwd);
		user.money = 0;
		user.msgtotal = 20;
	}
	
	//得到用户字符串信息
	function getUserStr(string addr, string pwd, uint dataType, uint idx, string channelID) returns(string) {
		//检查用户是否注册 、用户名密码是否正确
		string retStr = EMPTYSTR;
		if(uintDB[USERADDR][addr] != 1 || sha3(pwd) != userDB[addr].pwd) return retStr;
		
		//得到指定联系人
		if(dataType == 1){
			//数据是否超出索引
			if(userDB[addr].contList.length == 0 || idx < 0 ||
		       idx >= userDB[addr].contList.length) return retStr;
		       
		    retStr = userDB[addr].contList[idx];
		}
		
		//得到指定消息通道指定消息
		if(dataType == 2){
			if(msgDB[channelID].length == 0 || 
			   idx < 0 || idx >= msgDB[channelID].length) return retStr;
		   	
		   	retStr = msgDB[channelID][idx];
		}
		
		//返回指定结果
		return retStr;
	}
	
	//设置用户字符串信息
	function setUserStr(string addr, string pwd, uint dataType, string val1, uint val2) {
		//检查用户是否注册，用户名密码是否正确
		if(uintDB[USERADDR][addr] != 1 || sha3(pwd) != userDB[addr].pwd) return;
		   
		//设置用户密码
		if(dataType == 1) userDB[addr].pwd = sha3(val1);
		
		//删除指定通道指定消息
		if(dataType == 2) {
			//消息通道是否有效、消息队列是否有效、索引是否有效
			if(msgDB[val1].length == 0 || val2 < 0 || val2 >= msgDB[val1].length) return;
			
			//清空消息内容
			msgDB[val1][val2] = EMPTYSTR;
		}
	}
	
	//得到用户整数信息
	function getUserUint(string addr, string pwd, uint dataType, string channelID) returns(uint) {
		//检查用户是否注册，用户名密码是否正确
		uint retUint = 0;
		if(uintDB[USERADDR][addr] != 1 || sha3(pwd) != userDB[addr].pwd) return retUint;
		
		//得到用户余额
		if(dataType == 1) retUint = userDB[addr].money;
		
		//得到可用消息数目
		if(dataType == 2) retUint = userDB[addr].msgtotal;
		
		//联系人总数
		if(dataType == 3) retUint = userDB[addr].contList.length;
		
		//得到指定消息通道消息总数
		if(dataType == 4) retUint = msgDB[channelID].length;
		
		//返回指定结果
		return retUint;
	}
	
	//管理员充值
	function inCharge(string aaddr, string apwd, string uaddr, uint money)  {
		//管理员验证, 用户地址是否有效, 交易ID是否存在
		if(sha3(aaddr) != admin.addr || sha3(apwd) != admin.pwd ||
		   uintDB[USERADDR][uaddr] != 1) return;
		
		//增加用户余额
		userDB[uaddr].money += money;
	}
	
	//用户购买消息
	function addMsgTotal(string addr, string pwd, uint money) {
		//用户验证、余额验证、交易验证
		if(uintDB[USERADDR][addr] != 1 || sha3(pwd) != userDB[addr].pwd || 
		   userDB[addr].money < money) return;
		   
		//减少用户余额
		userDB[addr].money -= money;
		
		//增加可用消息数目
		userDB[addr].msgtotal += money * admin.msgrate;
	}
	
	//用户转账
	function sendMoney(string addrfrom, string pwdfrom, string addrto, uint money) {
		//用户验证、目标地址验证、余额验证
		if(uintDB[USERADDR][addrfrom] != 1 || sha3(pwdfrom) != userDB[addrfrom].pwd || 
		   uintDB[USERADDR][addrto] != 1 || userDB[addrfrom].money < money) return;
		   
		//减少用户余额
		userDB[addrfrom].money -= money;
		
		//增加目标账号余额
		userDB[addrto].money += money;
	}
	
	//向指定用户发送消息
	function sendMsg(string addr, string pwd, string target, string channelID, string msg){
		//用户验证、余额验证、目标地址验证、消息验证
		if(uintDB[USERADDR][addr] != 1 || sha3(pwd) != userDB[addr].pwd || 
		   userDB[addr].msgtotal < 1 || uintDB[USERADDR][target] != 1) return;
		   
		//检查双方联系人是否已经存在
		bool flagfrom = false;
		bool flagto = false;
		uint idx=0;
		for(idx=0; idx<userDB[addr].contList.length; idx++){
			if(sha3(userDB[addr].contList[idx]) == sha3(target)){
				flagfrom = true;
				break;
			}
		}
		
		for(idx=0; idx<userDB[target].contList.length; idx++){
			if(sha3(userDB[target].contList[idx]) == sha3(addr)){
				flagto = true;
				break;
			}
		}
		
		//如果没添加，添加新联系人并设置有新消息
		if(!flagfrom){
			userDB[addr].contList.push(target);
		}
		
		if(!flagto){
			userDB[target].contList.push(addr);
		}
		
		//消息发送条数扣费
		userDB[addr].msgtotal -= 1;
		
		//向消息通道添加消息
		msgDB[channelID].push(msg);
	}
	
	//删除消息通道
	function delChannel(string addr, string pwd, string target, string channelID){
		//用户验证、目标地址验证、通道验证
		if(uintDB[USERADDR][addr] != 1 || sha3(pwd) != userDB[addr].pwd || 
		   uintDB[USERADDR][target] != 1) return;
		   
		//删除发送方联系人
		uint idx=0;
		for(idx=0; idx<userDB[addr].contList.length; idx++){
			if(sha3(userDB[addr].contList[idx]) == sha3(target)){
				userDB[addr].contList[idx] = EMPTYSTR;
				break;
			}
		}
		
		for(idx=0; idx<userDB[target].contList.length; idx++){
			if(sha3(userDB[target].contList[idx]) == sha3(addr)){
				userDB[target].contList[idx] = EMPTYSTR;
				break;
			}
		}
		
		//情况消息队列和占位符号
		delete msgDB[channelID];
	}
}
