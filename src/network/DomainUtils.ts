module game {
	export class DomainUtils {
		public constructor() {
		}

		public static getRequestDomain(areaType:number,cmdType:number,data:Object):MsgDomain{
			var request = new MsgDomain();
			request.area = areaType;
			request.cmd = cmdType;
			request.data = data;
			return request;
		}		

		public static getSuccessResponseDomain(areaType:number, cmdType:number,data:Object):MsgDomain{
			var request = new MsgDomain();
			request.area = areaType;
			request.cmd = cmdType;
			request.data = data;

			request.code = MsgResultStatus.SUCCESS;
			return request;
		}

		public static getFailedResponseDomain(areaType:number, cmdType:number,errorCode:number,msg:string,data:Object):MsgDomain{
			var request = new MsgDomain();
			request.area = areaType;
			request.cmd = cmdType;
			request.data = data;

			request.code = MsgResultStatus.FAILED;
			request.errorCode = errorCode;
			request.msg = msg;
			return request;
		}
	}
}