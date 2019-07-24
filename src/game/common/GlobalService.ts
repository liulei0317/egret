module game {
	export class GlobalService {

		public activityHasShow = false;
		public activityShowType = 0;
		public mailTip:boolean = false;

		private dayTaskTip:boolean = false;
		private growTaskTip:boolean = false;

		private static instance:GlobalService;


		private constructor() {
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_EMAIL_TIP), this.mailTipEvent, this);
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_TASK_TIP), this.taskTipEvent, this);

		}

		public static getInstance(){
			if(GlobalService.instance == null){
				GlobalService.instance = new GlobalService();
			}
			return GlobalService.instance;
		}

		public static init(){
			if(GlobalService.instance){
				GlobalService.getInstance().clean();
			}
			GlobalService.getInstance();
		}

		private mailTipEvent(event: egret.Event) {	
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				var jsonData = msgDomain.data;
				var mailTip = jsonData.needTip;
				this.setMailTip(mailTip);
			}
		}	

		public setMailTip(mailTip){
			this.mailTip = mailTip;
			EAppFacade.getInstance().sendNotification(GameCmd.UPDATE_MAIL_TIP)
		}

		private taskTipEvent(event: egret.Event) {	
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				var jsonData = msgDomain.data;
				var redPointTip_day = jsonData.redPointTip_day;
				var redPointTip_grow = jsonData.redPointTip_grow;
				this.setTaskTip(redPointTip_day,redPointTip_grow);
			}
		}	

		public setTaskTip(dayTaskTip,growTaskTip){
			this.dayTaskTip = dayTaskTip;
			this.growTaskTip = growTaskTip;
			EAppFacade.getInstance().sendNotification(GameCmd.UPDATE_TASK_TIP);
		}		

		public hasTaskTip(){
			return this.dayTaskTip || this.growTaskTip;
		}		
		public hasDayTaskTip(){
			return this.dayTaskTip;
		}	
		public hasGrowTaskTip(){
			return this.growTaskTip;
		}
		

		public clean(){
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_EMAIL_TIP), this.mailTipEvent, this);
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_TASK_TIP), this.taskTipEvent, this);
			GlobalService.instance = null;
		}


	}
}