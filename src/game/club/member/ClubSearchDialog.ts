module game {
	export class ClubSearchDialog extends EDialog{
		private btnIDFind:EButton;
		private btnTypeFind:EButton;
		private btnClose:EButton;
		private editSearch:eui.EditableText;

		private radioAll:ERadioButton;
		private radioForbidGame:ERadioButton;

		private clubData:ClubData;

		private patternType:number = 0;
		
		public constructor(clubData:ClubData) {
			super(null,false);
			this.clubData = clubData;
			this.skinName = "resource/skins/club/member/ClubSearchDialogSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.btnIDFind,this.searchMemberID);
			this.addTapEvent(this.btnTypeFind,this.searchMemberType);

			this.addTapEvent(this.radioAll,this.clickRadioAll);
			this.addTapEvent(this.radioForbidGame,this.clickRadioForbidGame);

			this.addTapEvent(this.editSearch,this.resetSearch);
			

			this.radioAll.setText("全体成员");
			this.radioAll.setFontFamily("fzch");
			this.radioAll.setFontSize(30);
			this.radioForbidGame.setText("禁止参与游戏");	
			this.radioForbidGame.setFontFamily("fzch");
			this.radioForbidGame.setFontSize(30);

			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_MEMBERLIST), this.getClubMemberListBack, this);

			this.updateUI();
		}

		protected updateUI_(){
			var isAll = false;
			if(this.patternType == 0){
				isAll = true;
			}
			this.radioAll.setSelected(isAll);
			this.radioForbidGame.setSelected(!isAll);
		}		

		private searchMemberID(){
			var patternContent = this.editSearch.text.trim();
			var obj = {clubData:this.clubData,patternType:0,patternContent:patternContent};
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_CLUB_Members,obj);
		}

		private searchMemberType(){
			var patternContent = this.editSearch.text.trim();
			var obj = {clubData:this.clubData,patternType:this.patternType,patternContent:""};
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_CLUB_Members,obj);
		}		

		private getClubMemberListBack(event: egret.Event) {	
			var self = this;
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				self.close();
			}
		}


		private clickRadioAll(){
			this.patternType = 0;
			this.updateUI();
		}		

		private clickRadioForbidGame(){
			this.patternType = 1;
			this.updateUI();
		}	

		private resetSearch(){
			this.editSearch.text = "";
		}					

		public clean(){
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_MEMBERLIST), this.getClubMemberListBack, this);
			super.clean();
		}
	}
}