module game {
	export class DispatchHandler {
		private static instance:DispatchHandler;
		private hallHandler:HallHandler;
		private gameHandler:GameHandler;
		
		private constructor() {
			this.hallHandler = new HallHandler();
			this.gameHandler = new GameHandler();

		}

		public static getInstance():DispatchHandler{
			if(DispatchHandler.instance==null){
				DispatchHandler.instance = new DispatchHandler();
			}
			return DispatchHandler.instance;
		}

		public dispatch(msg:string){
			// LogUtils.info("回调的消息："+msg);

			var curObject:DispatchHandler = DispatchHandler.getInstance();
			
			var json = JSON.parse(msg);
			var msgDomain = MsgDomain.toBean(json);
			
			var area = msgDomain.area;
			var cmd = msgDomain.cmd;
			if(EAppFacade.getInstance().needUpdateServerTime())
			{
				EAppFacade.getInstance().updateServerTime(msgDomain.timestamp)
			}
			if(area == MsgConstant.HALL){
				curObject.hallHandler.handle(msgDomain);
			}else if(area == MsgConstant.GAME){
				curObject.gameHandler.handle(msgDomain);
			}
		}
	}
}