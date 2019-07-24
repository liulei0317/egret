module game {
	export class ConnectService {
		private static port:number = 9001;
		private static server_url:string = Constants.server_url_current;
		private static instance:ConnectService;

		private timer:egret.Timer;
		
		// private connectHandler_:Function;
		private status:number = ConnectConst.ConnectStatus.Wait;
		private timerRunning:boolean = false;
		private constructor() {
		}

		public static getInstance(){
			if(ConnectService.instance == null){
				ConnectService.instance = new ConnectService();
			}
			return ConnectService.instance;
		}

		public connect(force:boolean){
			// this.connectHandler_ = connectHandler_;
			this.udpateStatus(ConnectConst.ConnectStatus.Connecting);
			game.SocketManager.getInstance().connect(ConnectService.server_url, ConnectService.port,this.connectHandler.bind(this),game.DispatchHandler.getInstance().dispatch,force);
		}

		public close(){
			game.SocketManager.getInstance().close();
		}

		private udpateStatus(status){
			this.status = status;
			EAppFacade.getInstance().sendNotification(GameCmd.SOCKET_STATUS_CHANGE,{status:this.status});
			LogUtils.info("连接状态变化="+this.status);
		}

		private connectHandler(data:any){
			var status = data.status;
			this.udpateStatus(status);
			if(status == ConnectConst.ConnectStatus.Connected){
				HeartBeatService.getInstance();	//这个用来初始化心跳服务
				UserInfoService.getInstance().autoLogin();
			}


			// if(this.connectHandler_!=null){
			// 	this.connectHandler_.call(null,data);
			// }
			
		}

		public getStatus(){
			return this.status;
		}

		public startTimer(){
			if(this.timerRunning)
			{
				return;
			}
			this.timerRunning = true;
			if(this.timer == null){
				this.timer = new egret.Timer(1000,0);
				this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
			}
			this.timer.start();
		}

		public stopTimer(){
			this.timer.stop();
			this.timerRunning = false;
		}

		private onTimer(){
			var status = this.status;
			if(status == ConnectConst.ConnectStatus.Connected){
				HeartBeatService.getInstance().sendHeartCmd();
			}else if(status == ConnectConst.ConnectStatus.ConnectClose && !GameConfig.localVersion){
				HeartBeatService.getInstance().reConnect();
			}
		}




	}
}