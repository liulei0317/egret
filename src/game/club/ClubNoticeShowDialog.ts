module game {
	export class ClubNoticeShowDialog extends EDialog{
		
		private editNotice:eui.EditableText;
		private btnClose:EButton;
		private btnOK:EButton;
		private btnPublish:EButton;

		private clubId:string;
		private notice:string;
		private canEdit:boolean = false;
		public constructor(clubId:string,notice:string,canEdit:boolean) {
			super(null,false);
			this.clubId = clubId;
			this.notice = notice;
			this.canEdit = canEdit;
			this.skinName = "resource/skins/club/clubNoticeShowSkin.exml";
		}

		public onCreateViewComplete():void{
            super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.btnOK,this.clickOK);
			this.addTapEvent(this.btnPublish,this.clickPublish);
			this.editNotice.touchEnabled = this.canEdit;
			this.editNotice.text = this.notice;
			this.btnOK.visible = !this.canEdit;
			this.btnClose.visible = this.canEdit;
			this.btnPublish.visible = this.canEdit;

			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_SENDNOTICE),this.publishNoticeCallback,this);
		}	

		private clickOK(){
			this.close();
		}

		private clickPublish(){
			var content = this.editNotice.text.trim();
			ClubService.getInstance().publishNotice(this.clubId,content);
		}

		private publishNoticeCallback(event:egret.Event){
            var msgDomain:MsgDomain = event.data;
            if(msgDomain.code == CmdResultType.SUCCESS){
				CommonView.showToast("发布公告成功");
				this.close();
			}		

		}

		public clean(){
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_SENDNOTICE),this.publishNoticeCallback,this);
			super.clean();
		}
	}
}