module game {
	export class ActivityItem extends EComponent {

		private tab1: EToggleButton;
		private labelTab1: eui.Label;


		private activityItemData: ActivityItemData;

		public constructor(activityItemData: any) {
			super();
			this.activityItemData = activityItemData;
			this.skinName = "resource/skins/hall/activity/activityItemSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();

			// game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_GET_TASK_REWARD), this.getTaskRewardBack, this);
			this.addTapEvent(this.tab1, this.clickItem);

			this.updateUI();
		}

		public setData(activityItemData: any) {
			this.activityItemData = activityItemData;
			this.updateUI();
		}
		private clickItem() {
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_activity_ITEM, this.activityItemData);
		}


		// private getTaskRewardBack(event: egret.Event) {	
		// 	var msgDomain: game.MsgDomain = event.data;
		// 	if (msgDomain.code == game.CmdResultType.SUCCESS) {
		// 		var jsonData = msgDomain.data;
		// 		this.taskData = jsonData;
		// 		this.updateUI();
		// 	}
		// }		



		protected updateUI_() {
			if (this.activityItemData != null) {
				this.tab1.selected = this.activityItemData.selected;
				this.labelTab1.text = this.activityItemData.title;
				if (!this.tab1.selected) {
					this.labelTab1.strokeColor = 0xF4D6A3
					this.labelTab1.textColor = 0x805D31
				} else {
					this.labelTab1.strokeColor = 0xBB5D41
					this.labelTab1.textColor = 0xFFFFFF
				}
				// var num = this.shopItemData.itemTotalNum;
				// var numstr = num>10000?(num/10000+"万"):(num+"");
				// this.labelItemName.text = this.shopItemData.itemName+numstr;
				// this.labelItemPrice.text = "¥"+(this.shopItemData.price/100);


			}
		}

		public clean() {

			super.clean();
		}

	}
}