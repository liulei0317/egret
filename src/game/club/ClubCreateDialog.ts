module game {
	export class ClubCreateDialog extends EDialog{

		private gameType1:ERadioButton;
		private gameType2:ERadioButton;
		private gameType3:ERadioButton;

		private editClubName:eui.EditableText;
		private editPhoneNumber:eui.EditableText;
		private editInfo:eui.EditableText;

		private btnCreate:EButton;
		private btnClose:EButton;

		private gameType:number = GameConfig.gameID;	//0为麻将

		public constructor() {
			super(null,false);
			this.skinName = "resource/skins/club/createClubUI.exml";
		}

		public onCreateViewComplete():void{
            super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.btnCreate,this.clickCreate);
			this.editPhoneNumber.inputType = egret.TextFieldInputType.TEL;
			this.editPhoneNumber.restrict = '0-9';
			this.gameType1.setText("麻将");
			this.gameType1.setSelected(true);

			this.addTapEvent(this.gameType1,this.clickGameTypeMJ);

			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_CREATE),this.createClubCallback,this);
		}	

		protected updateUI_(){
			this.gameType1.setSelected(false);
			this.gameType2.setSelected(false);
			this.gameType3.setSelected(false);
			if(this.gameType == GameConfig.gameID){
				this.gameType1.setSelected(true);
			}
		}

		private clickCreate(){
			var clubName = this.editClubName.text.trim();
			var len = Utils.getCharLen(clubName);
			if(len>12 || len<0){
				CommonView.showToast("名称长度应该是1-6个文字");
				return;
			}
			var phoneNumber = this.editPhoneNumber.text.trim();
			var phoneNumberLen = Utils.getCharLen(phoneNumber);
			if(phoneNumberLen!=11 || !Utils.isNumbers(phoneNumber)){
				CommonView.showToast("手机号应该是11位的数字");
				return;
			}
		
			var info = this.editInfo.text.trim();
			if(info.trim().length<=0){
				CommonView.showToast("请填写你的申请说明信息");
				return;
			}

			ClubService.getInstance().createClub(this.gameType,clubName,phoneNumber,info);

		}

		private createClubCallback(event:egret.Event){
            var msgDomain:MsgDomain = event.data;
            if(msgDomain.code == CmdResultType.SUCCESS){
				CommonView.showToast("已成功发送申请，请等待审核");
				this.close();
				return;
			}else{
				if(msgDomain.errorCode == MsgConstant.ERROR_club_UserIdIsNotDaiLi){
					CommonView.showToast("需要先成为代理才可以创建俱乐部〜");
					return;
				}
			}

		}

		private clickGameTypeMJ(){
			this.gameType = GameConfig.gameID;
			this.updateUI();
		}		

		public clean(){
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_CREATE),this.createClubCallback,this);
			super.clean();
		}


		



	}
}