module game {
	export class MailItem extends EComponent{
		
		private labelTitle:eui.Label;
		private labelTime:eui.Label;
		private imgStatus:eui.Image;
		private rect:eui.Rect;
		private imgBg:eui.Image;

		private mailData:MailData;
	
		public constructor(mailData) {
			super();
			this.mailData = mailData;
			this.skinName = "resource/skins/hall/mail/mailItemSkin.exml";
		}	

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.rect,this.clickItem);
			this.updateUI();
		}	

		public setData(mailData:any){
			this.mailData = mailData;
			this.updateUI();
		}


		protected updateUI_(){
			if(this.mailData!=null){
				this.labelTitle.text = this.mailData.emailTypeName;
				this.labelTime.text = DateUtils.dateFormat1(this.mailData.createTime,false);
				this.imgBg.source = this.mailData.selected?"bg_mail_selected_png":"bg_mail_png";
				var emailStatus = this.mailData.emailStatus;
				var attachStatus = this.mailData.attachStatus;
				this.imgStatus.visible = false;
				if(this.mailData.attachInfos){
					if(emailStatus == 0){
						this.imgStatus.visible = true;
						this.imgStatus.source = "img_not-read_png";
					}else{
						if(attachStatus == 0){
							this.imgStatus.visible = true;
							this.imgStatus.source = "img_not-receive_png";
						}
					}
				}else{
					if(emailStatus == 0){
						this.imgStatus.visible = true;
						this.imgStatus.source = "img_not-read_png";
					}else{
						this.imgStatus.visible = false;
					}
				}
				
			}
		}	

		private clickItem(){
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_MAIL_ITEM,this.mailData);
			MailService.getInstance().viewMail(this.mailData.emailId);
		}		

		public clean(){
			
			super.clean();
		}		
 			
	}
}