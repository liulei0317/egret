module game {
	export class MsgDomain {
		public gameId:number;
		public userId:string;
		public version:string = MsgConstant.VERSION_NAME;  //协议版本号
		public versionId:number = MsgConstant.VERSION_ID;
		public timestamp:number ;
		public code:MsgResultStatus = MsgResultStatus.FAILED;        //消息码
		public errorCode:number = 0;   //错误码
		public msg:string;      //消息说明
		public cmd:number;         //命令
		public area:number;        //消息大类型
		public data:any;       //消息内容

		public constructor() {
			this.timestamp = EAppFacade.getInstance().getNowTime();
		}

		public static toBean(json:any):MsgDomain{
			var msgDomain = new MsgDomain();
			msgDomain.area = json.area;
			msgDomain.cmd = json.cmd;
			msgDomain.code = json.code;
			msgDomain.msg = json.msg;
			msgDomain.errorCode = json.errorCode;
			msgDomain.data = json.data;
			return msgDomain;
		}
		
	}

	export enum MsgResultStatus {
		FAILED,
    	SUCCESS
	}	
}