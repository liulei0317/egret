module game {
	export class ShopItem extends EComponent{
	
		private labelItemName:eui.Label;
		private labelItemPrice:eui.Label;


		private shopItemData:ShopItemData;
	
		public constructor() {
			super();
			this.skinName = "resource/skins/hall/shop/shopItemSkin.exml";
		}	

		public onCreateViewComplete():void{
			super.onCreateViewComplete();

			// game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_GET_TASK_REWARD), this.getTaskRewardBack, this);
			

			this.updateUI();
		}	

		public setData(shopItemData:any){
			this.shopItemData = shopItemData;
			this.updateUI();
		}


		// private getTaskRewardBack(event: egret.Event) {	
		// 	var msgDomain: game.MsgDomain = event.data;
		// 	if (msgDomain.code == game.CmdResultType.SUCCESS) {
		// 		var jsonData = msgDomain.data;
		// 		this.taskData = jsonData;
		// 		this.updateUI();
		// 	}
		// }		

		

		protected updateUI_(){
			if(this.shopItemData!=null){
				var num = this.shopItemData.itemTotalNum;
				var numstr = num>10000?(num/10000+"万"):(num+"");
				this.labelItemName.text = this.shopItemData.itemName+numstr;
				this.labelItemPrice.text = "¥"+(this.shopItemData.price/100);
				

			}
		}	

		public clean(){
			
			super.clean();
		}		
 			
	}
}