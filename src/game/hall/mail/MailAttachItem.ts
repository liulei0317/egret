module game {
	export class MailAttachItem extends EComponent{
		
		private labelNum:eui.Label;
		private imgIcon:eui.Image;

		private mailAttachData:any;
		public constructor(mailAttachData) {
			super();
			this.mailAttachData = mailAttachData;
			this.skinName = "resource/skins/hall/mail/mailAttachItemSkin.exml";
		}	

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.updateUI();
		}	


		protected updateUI_(){
			if(this.mailAttachData!=null){
				this.labelNum.text = "x"+this.mailAttachData.itemNum;
				this.imgIcon.source = ConstantUtils.getItemIconName(this.mailAttachData.itemType);
			}
		}	

		public clean(){
			
			super.clean();
		}		
 			
	}
}