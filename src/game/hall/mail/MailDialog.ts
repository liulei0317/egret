module game {
	export class MailDialog extends EDialog{

		private btnClose:EButton;

		private scrollerTables:EScroller;

		private labelMailTitle:eui.Label;
		private labelMailTime:eui.Label;
		private labelMailContent:eui.Label;
		private btnGet:EButton;
		private labelHasGeted:eui.Label;

		private selectTabIndex:number = 1;

		private labelNoSelected:eui.Label;
		private groupMailDetail:eui.Group;
		private groupAttach:eui.Group;
		private groupAttachItems:eui.Group;

		private mailList:MailData[];
		private selectItemData:MailData;

		public constructor() {
			super();
			this.skinName = "resource/skins/hall/mail/mailDialogSkin.exml";
		}


		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.btnGet,this.getMailAttach);
			
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_EMAIL_LIST), this.getMailListBack, this);
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_DRAW_EMAIL_ATTACH), this.getMailAttachBack, this);
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_VIEW_EMAIL), this.viewMailBack, this);
			
			EAppFacade.getInstance().registerCommand(GameCmd.CLICK_MAIL_ITEM,this.clickMailItem,this);

			this.initScroller();

			this.getMailList();	
		}

		protected updateUI_(){
			this.groupMailDetail.visible = false;
			this.labelNoSelected.visible = false;
			if(this.mailList && this.mailList.length>0){
				this.scrollerTables.setScrollerContent(this.mailList, false);       
				var itemData = this.selectItemData;
				if(this.selectItemData){
					this.groupMailDetail.visible = true;
					this.labelMailTitle.text = this.selectItemData.emailTitle;
					this.labelMailTime.text = this.selectItemData.validSec;
					this.labelMailContent.text = this.selectItemData.emailContent;

					var attachs = this.selectItemData.getAttachItems();
					if(attachs && attachs.length>0){
						this.btnGet.visible = (itemData.attachStatus == 0);
						this.labelHasGeted.visible = !this.btnGet.visible;
						this.groupAttach.visible = true;
						this.groupAttachItems.removeChildren();
						var len = attachs.length;
						for(var i:number = 0;i<len;i++){
							var attach = new MailAttachItem(attachs[i]);
							attach.x = attach.width*i+(i*10);
							this.groupAttachItems.addChild(attach);
						}
					}else{
						this.groupAttach.visible = false;
					}
				}else{
					this.labelNoSelected.visible = true;
					this.labelNoSelected.text = "请选择一封邮件";
				}
			}else{
				this.labelNoSelected.text = "暂无任何邮件哦~";
				this.labelNoSelected.visible = true;
			}
        }		

		private initScroller() {
			// this.scrollerTables.setScrollerHeight(434);
			this.scrollerTables.setElementViewInfo(104, 8);
			this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
			this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
			this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
		}	


		private createElement(data) {
			var item = new game.MailItem(data);
			return item;
		}

		private updateElement(item: game.MailItem, data: any) {
			item.setData(data);
			// console.info("roomData == "+item.toString());
		}

		private updateElementUI(item: game.MailItem) {
			item.updateUI();
		}	

		private getMailList(){
			MailService.getInstance().getMailList();
		}	

		private getMailListBack(event: egret.Event) {	
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				var jsonData = msgDomain.data;
				var emailInfos = jsonData.emailInfos;
				var needTip = jsonData.needTip;
				this.mailList = [];
				for (var key in emailInfos) {
					var temp = emailInfos[key];
					var mailData = new game.MailData(temp);
					this.mailList.push(mailData);
				}

				this.updateUI();
			}
		}		

 							

		private clickMailItem(event:egret.Event){
			this.selectItemData = event.data;
			this.selectItemData.emailStatus = 1;	//变成已查看
			this.updateCurTabItems();
			this.updateUI();
		}	

		private updateCurTabItems(){
			var len = this.mailList.length;
				for(var i=0;i<len;i++){
					this.mailList[i].selected = (this.mailList[i] == this.selectItemData)
				}
		}		

		private getMailAttach(){
			if(this.selectItemData){
				MailService.getInstance().getMailAttach(this.selectItemData.emailId);
			}
		}		

		private getMailAttachBack(event:egret.Event){
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				var jsonData = msgDomain.data;
				var needTip = jsonData.needTip;
				GlobalService.getInstance().setMailTip(needTip);
				var emailId = jsonData.emailId;
				var attachInfos = jsonData.attachInfos;
				this.updateMailAttachInfo(emailId,attachInfos);
				this.updateUI();
				CommonView.showToast("领取成功");
			}
		}

		private updateMailAttachInfo(emailId,attachInfos){
			var len = this.mailList.length;
			for(var i:number = 0;i<len;i++){
				if(this.mailList[i].emailId == emailId){
					this.mailList[i].attachInfos =attachInfos;
					this.mailList[i].attachStatus = 1;
					break;
				}
			}
		}

		private viewMailBack(event:egret.Event){
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				var jsonData = msgDomain.data;
				var needTip = jsonData.needTip;
				GlobalService.getInstance().setMailTip(needTip);
			}
		}		

		

		public clean(){
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_EMAIL_LIST), this.getMailListBack, this);
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_DRAW_EMAIL_ATTACH), this.getMailAttachBack, this);
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_VIEW_EMAIL), this.viewMailBack, this);
			EAppFacade.getInstance().removeCommand(GameCmd.CLICK_MAIL_ITEM,this.clickMailItem,this);			
			super.clean();
		}

	}
}