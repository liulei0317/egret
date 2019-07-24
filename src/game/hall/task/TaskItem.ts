module game {
	export class TaskItem extends EComponent{
		
		private itemIcon:eui.Image;
		private labelItemNum:eui.Label;
		private btnInfo:EButton;
		private labelTaskTitle:eui.Label;
		private labelProgress:eui.Label;
		private imgProgress:eui.Image;

		private btnProgressing:EButton;
		private btnGoDo:EButton;
		private btnGet:EButton;
		private btnGeted:EButton;

		private taskData:TaskData;
	
		public constructor(taskData) {
			super();
			this.taskData = taskData;
			this.skinName = "resource/skins/hall/task/taskItemSkin.exml";
		}	

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnGet,this.clickGetReward);

			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_GET_TASK_REWARD), this.getTaskRewardBack, this);
			

			this.updateUI();
		}	

		public setData(taskData:any){
			this.taskData = taskData;
			this.updateUI();
		}

		public clickGetReward(){
			TaskService.getInstance().getTaskReward(this.taskData.goalType,this.taskData.id);
		}

		private getTaskRewardBack(event: egret.Event) {	
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				var jsonData = msgDomain.data;
				if(jsonData.id == this.taskData.id)
				{
					this.taskData = jsonData;
					this.updateUI();
				}
				
			}
		}		

		

		protected updateUI_(){
			this.btnProgressing.visible = false;
			this.btnGoDo.visible = false;
			this.btnGet.visible = false;
			this.btnGeted.visible = false;
			if(this.taskData!=null){
				this.labelTaskTitle.text = this.taskData.goalDesc;
				
				var rewardType = this.taskData.rewardType;
				this.itemIcon.source = ConstantUtils.getItemIconName(rewardType);
				var rewardNum = this.taskData.rewardNum;
				if(rewardType == Constants.Item_Type.RMB){
					rewardNum = rewardNum/100;
					this.labelItemNum.text = "¥"+rewardNum;
				}else{
					this.labelItemNum.text = rewardNum+"";
				}
				var takeStatus = this.taskData.takeStatus;
				//0-未完成 1-已完成 2-已领取
				if(takeStatus == 0){
					this.btnProgressing.visible = true;
				}else if(takeStatus == 1){
					this.btnGet.visible = true;
				}else if(takeStatus == 2){
					this.btnGeted.visible = true;
				
				}
				
				var curEventNum = Math.min(this.taskData.curEventNum,this.taskData.eventNum);
				this.labelProgress.text = curEventNum+"/"+this.taskData.eventNum;
				
				if(this.taskData.eventTypeDesc && this.taskData.eventTypeDesc.trim().length>0){
					this.btnInfo.visible = true;
					this.labelTaskTitle.x = 159;
				}else{
					this.btnInfo.visible = false;
					this.labelTaskTitle.x = 117;
				}

				var w = this.imgProgress.width;
				var h = this.imgProgress.height;
				this.imgProgress.mask = new egret.Rectangle(0,0,w*curEventNum/this.taskData.eventNum,h);
			}
		}	

		public clean(){
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_GET_TASK_REWARD), this.getTaskRewardBack, this);
			super.clean();
		}		
 			
	}
}