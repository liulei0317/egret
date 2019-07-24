module game {
	export class HeartBeatService {
		private static instance:HeartBeatService;
		private canHeart:boolean = false;
		private lastHeartTime = 0;
		private lastSendTime:number = 0;
		private constructor() {
			EAppFacade.getInstance().registerCommand(GameCmd.SOCKET_STATUS_CHANGE,this.socketStatusChange,this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_HEAR_THROB),this.heartCmdCallback,this);
			EAppFacade.getInstance().registerCommand(GameCmd.USER_LOGIN_SUCCESS,this.userloginSuccessNotice,this);			
		}

		public static getInstance(){
			if(HeartBeatService.instance == null){
				HeartBeatService.instance = new HeartBeatService();
			}
			return HeartBeatService.instance;
		}

		public sendHeartCmd(){
			if(!this.canHeart){
				return;
			}
			var curTime = new Date().getTime();
			if(curTime-this.lastHeartTime>15*1000){
				LogUtils.info("heart timeout close socket.")
				ConnectService.getInstance().close();
			}else{
				if(curTime - this.lastSendTime >=5000){
					this.sendHeartCmd_();
					this.lastSendTime = curTime;
				}
			}
		}

		private sendHeartCmd_(){
			// var element: any = { clubId: clubId,hashPush:hashPush};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.GAME,MsgConstant.CMD_HEAR_THROB,null);
			SocketManager.getInstance().send(requestDomain);   
		}

		private heartCmdCallback(event: egret.Event) {
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.lastHeartTime = new Date().getTime();
			}

		}

		private userloginSuccessNotice(event: egret.Event) {
			ConnectService.getInstance().startTimer();
			this.startHeart();
		}

		private startHeart(){
			 this.lastHeartTime = new Date().getTime();
			 this.lastSendTime = 0;
			 this.canHeart = true;
		}

		public reConnect(){
			if(ConnectService.getInstance().getStatus() == ConnectConst.ConnectStatus.ConnectClose){
				CommonView.showWaiting();
				LogUtils.info("Socket 连接已断开，自动重连");
				ConnectService.getInstance().connect(true);
			}
		}

		private socketStatusChange(event: egret.Event) {
			if (event.data != null) {
				var status = event.data.status;
				if(status == ConnectConst.ConnectStatus.Connected){
					// CommonView.hideWaiting();
				}else if(status == ConnectConst.ConnectStatus.ConnectClose){
					this.canHeart = false;
				}
			}
		}


		public clean(){
			EAppFacade.getInstance().removeCommand(GameCmd.SOCKET_STATUS_CHANGE,this.socketStatusChange,this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_HEAR_THROB),this.heartCmdCallback,this);
			EAppFacade.getInstance().removeCommand(GameCmd.USER_LOGIN_SUCCESS,this.userloginSuccessNotice,this);
		}
	}
}