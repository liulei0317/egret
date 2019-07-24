module game {
	export class ClubSettingDialog extends EDialog {
		private btnClose: EButton;
		private offlineStartType0: ERadioButton;
		private offlineStartType1: ERadioButton;
		private offlineStartType2: ERadioButton;
		// private roomType0:ERadioButton;
		// private roomType1:ERadioButton;
		private radioAutoDisTime: ERadioButton;
		private radioAutoHostTime: ERadioButton;
		private radioNoHost: ERadioButton;

		// private radio2:ERadioButton;
		private editKickTime: eui.EditableText;
		private editAutoHostTime: eui.EditableText;
		// private editJYZStartScore:eui.EditableText;
		// private editCKTScore:eui.EditableText;
		// private groupJYZ:eui.Group;
		// private groupCKT:eui.Group;
		// private scoreLimit0:ERadioButton;
		// private scoreLimit1:ERadioButton;
		private imgSelectRoomType: eui.Image;
		private btnSave: EButton;
		private labelKickTip: eui.Label;
		private labelAutoHostTip: eui.Label;
		// private labelJYZ:eui.Label;
		// private labelCKT:eui.Label;

		private cbFangZuoBi: ERadioButton;
		private cbNeedGPS: ERadioButton;
		private cbVoice: ERadioButton;

		private cbHDLY: ERadioButton;
		private cbApplyDismiss: ERadioButton;
		private cbForbid3: ERadioButton;

		private cbAutoMatch: ERadioButton;
		private cbHideRoomUserInfo: ERadioButton;
		private cbHideGameUserInfo: ERadioButton;

		private clubId: string;
		private clubSettingInfo: ClubSettingInfo;
		public constructor(clubId: string) {
			super(null, false);
			this.clubId = clubId;
			this.skinName = "resource/skins/club/clubSettingSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.offlineStartType0.setText("有玩家离线不开局");
			this.offlineStartType1.setText("");
			this.offlineStartType2.setText("玩家离线也开局");

			this.radioAutoHostTime.setText("超时托管");
			this.radioAutoDisTime.setText("超时解散")
			this.radioNoHost.setText("关闭超时托管");

			this.addTapEvent(this.btnClose, this.close);

			this.editKickTime.inputType = egret.TextFieldInputType.TEL;
			this.editKickTime.restrict = `0-9`;

			this.editAutoHostTime.inputType = egret.TextFieldInputType.TEL;
			this.editAutoHostTime.restrict = `0-9`;

			// this.editJYZStartScore.inputType = egret.TextFieldInputType.TEL;
			// this.editJYZStartScore.restrict = `0-9`;	

			// this.editCKTScore.inputType = egret.TextFieldInputType.TEL;
			// this.editCKTScore.restrict = `0-9`;	




			this.addTapEvent(this.offlineStartType0, this.clickOfflineStartType0);
			this.addTapEvent(this.offlineStartType1, this.clickOfflineStartType1);
			this.addTapEvent(this.offlineStartType2, this.clickOfflineStartType2);

			this.addTapEvent(this.editKickTime, this.clickOfflineStartType1);
			this.addTapEvent(this.radioAutoHostTime, this.clickAutoHostTime);
			// this.addTapEvent(this.editAutoHostTime, this.clickAutoHostTime);
			this.addTapEvent(this.radioNoHost, this.clickNoHost);
			this.addTapEvent(this.radioAutoDisTime, this.clickAutoDisTime);



			// this.addTapEvent(this.roomType0,this.clickRoomType0);
			// this.addTapEvent(this.roomType1,this.clickRoomType1);

			// this.addTapEvent(this.scoreLimit0,this.clickScoreLimit0);
			// this.addTapEvent(this.scoreLimit1,this.clickScoreLimit1);
			// this.addTapEvent(this.editCKTScore,this.clickScoreLimit0);

			this.addTapEvent(this.btnSave, this.saveConfig);

			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_getSettingInfo), this.getSettingConfigInfoCallback, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_setting), this.saveConfigCallback, this);

			this.getSettingConfigInfo();
		}

		private getSettingConfigInfo() {
			ClubService.getInstance().getClubSettingInfo(this.clubId);
		}
		private getSettingConfigInfoCallback(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				var clubSettingInfo: ClubSettingInfo = msgDomain.data;
				this.clubSettingInfo = clubSettingInfo;
				LogUtils.info("---------");
				this.updateUI();
			}
		}
		private updateAutoSetRadio() {
			if (this.clubSettingInfo.autoHost) {
				if (this.clubSettingInfo.autoType == 1) {
					this.radioAutoHostTime.setSelected(true);
					this.radioAutoDisTime.setSelected(false);
				}
				else if (this.clubSettingInfo.autoType == 2) {
					this.radioAutoHostTime.setSelected(false);
					this.radioAutoDisTime.setSelected(true);
				}
				this.radioNoHost.setSelected(false);
			} else {
				this.radioNoHost.setSelected(true);
				this.radioAutoHostTime.setSelected(false);
				this.radioAutoDisTime.setSelected(false);
			}
		}
		protected updateUI_() {
			var clubSettingInfo = this.clubSettingInfo;

			this.labelKickTip.text = "（" + Math.floor(clubSettingInfo.configDefaultInfo.minKickTime / 1000) + "~" + Math.floor(clubSettingInfo.configDefaultInfo.maxKickTime / 1000) + "）秒后踢出离线玩家";
			this.labelAutoHostTip.text = "（" + Math.floor(clubSettingInfo.configDefaultInfo.minAutoHostTime / 1000) + "~" + Math.floor(clubSettingInfo.configDefaultInfo.maxAutoHostTime / 1000) + "）秒";
			// this.labelJYZ.text = "("+Math.floor(clubSettingInfo.configDefaultInfo.minStartScore)+"-"+Math.floor(clubSettingInfo.configDefaultInfo.maxStartScore)+")";
			// this.labelCKT.text = "("+Math.floor(clubSettingInfo.configDefaultInfo.minCtkScore)+"-"+Math.floor(clubSettingInfo.configDefaultInfo.maxCtkScore)+")";

			this.offlineStartType0.setSelected(false);
			this.offlineStartType1.setSelected(false);
			this.offlineStartType2.setSelected(false);
			if (this.clubSettingInfo.offlineStartType == 1) {
				this.offlineStartType1.setSelected(true);
				this.editKickTime.text = Math.floor(this.clubSettingInfo.offlineKickTime / 1000) + "";
			} else if (this.clubSettingInfo.offlineStartType == 2) {
				this.offlineStartType2.setSelected(true);
			} else {
				this.offlineStartType0.setSelected(true);
				this.editKickTime.text = Math.floor(this.clubSettingInfo.offlineKickTime / 1000) + "";
			}
			this.editAutoHostTime.text = Math.floor(clubSettingInfo.autoHostTime / 1000) + "";
			this.updateAutoSetRadio()
			this.cbFangZuoBi.setText("防作弊");
			this.cbNeedGPS.setText("入桌需开GPS");
			this.cbVoice.setText("语音聊天");

			this.cbHDLY.setText("海底捞月");
			this.cbApplyDismiss.setText("协商解散");
			this.cbForbid3.setText("禁止3人开局");

			this.cbAutoMatch.setText("自动匹配房间");
			this.cbHideRoomUserInfo.setText("隐藏房间列表玩家信息");
			this.cbHideGameUserInfo.setText("隐藏牌桌中玩家信息");

			this.cbFangZuoBi.setSelected(this.clubSettingInfo.checkCheat);
			this.cbNeedGPS.setSelected(this.clubSettingInfo.gps);
			this.cbVoice.setSelected(this.clubSettingInfo.openVoice);
			this.cbHDLY.setSelected(this.clubSettingInfo.haiDiLaoYue);
			this.cbApplyDismiss.setSelected(this.clubSettingInfo.dismissSwitch);
			this.cbForbid3.setSelected(!this.clubSettingInfo.changePlayerNum);
			this.cbAutoMatch.setSelected(this.clubSettingInfo.autoMatch);
			this.cbHideRoomUserInfo.setSelected(this.clubSettingInfo.hideRoomUserInfo);
			this.cbHideGameUserInfo.setSelected(this.clubSettingInfo.hideGameUserInfo);
		}




		private clickOfflineStartType0() {
			this.clubSettingInfo.offlineStartType = 0;
			this.updateUI();
		}
		private clickOfflineStartType1() {
			this.clubSettingInfo.offlineStartType = 1;
			this.updateUI();
		}
		private clickOfflineStartType2() {
			this.clubSettingInfo.offlineStartType = 2;
			this.updateUI();
		}

		private clickAutoHostTime() {
			this.clubSettingInfo.autoHost = true;
			this.clubSettingInfo.autoType = 1;
			this.updateAutoSetRadio()
		}
		private clickAutoDisTime() {
			this.clubSettingInfo.autoHost = true;
			this.clubSettingInfo.autoType = 2;
			this.updateAutoSetRadio()
		}
		private clickNoHost() {
			this.clubSettingInfo.autoHost = false;
			this.updateAutoSetRadio()
		}




		private saveConfig() {
			var clubSettingInfo = this.clubSettingInfo;
			if (clubSettingInfo.offlineStartType == 1) {
				var kickTimestring = this.editKickTime.text.trim();
				var min = Math.floor(clubSettingInfo.configDefaultInfo.minKickTime / 1000);
				var max = Math.floor(clubSettingInfo.configDefaultInfo.maxKickTime / 1000);
				if (!this.checkInputConfigInfo(kickTimestring, min, max)) {
					CommonView.showToast(Utils.format("时间应该是{0}-{1}之间", min, max));
					return;
				}
				clubSettingInfo.offlineKickTime = parseInt(kickTimestring) * 1000;
			}

			clubSettingInfo.autoHost = clubSettingInfo.autoHost;
			if (clubSettingInfo.autoHost) {
				var autoHostTimeString = this.editAutoHostTime.text.trim();
				var min = Math.floor(clubSettingInfo.configDefaultInfo.minAutoHostTime / 1000);
				var max = Math.floor(clubSettingInfo.configDefaultInfo.maxAutoHostTime / 1000);
				if (!this.checkInputConfigInfo(autoHostTimeString, min, max)) {
					CommonView.showToast(Utils.format("时间应该是{0}-{1}之间", min, max));
					return;
				}
				clubSettingInfo.autoHostTime = parseInt(autoHostTimeString) * 1000;
			}
			this.clubSettingInfo.checkCheat = this.cbFangZuoBi.isSelected();
			this.clubSettingInfo.gps = this.cbNeedGPS.isSelected();
			this.clubSettingInfo.openVoice = this.cbVoice.isSelected();
			this.clubSettingInfo.haiDiLaoYue = this.cbHDLY.isSelected();
			this.clubSettingInfo.dismissSwitch = this.cbApplyDismiss.isSelected();
			this.clubSettingInfo.changePlayerNum = !this.cbForbid3.isSelected();
			this.clubSettingInfo.autoMatch = this.cbAutoMatch.isSelected();
			this.clubSettingInfo.hideRoomUserInfo = this.cbHideRoomUserInfo.isSelected();
			this.clubSettingInfo.hideGameUserInfo = this.cbHideGameUserInfo.isSelected();


			// if(clubSettingInfo.roomType == Constants.ROOM_TYPE.jinYuanZi){
			// 	var startScoreString = this.editJYZStartScore.text.trim();
			// 	var min = Math.floor(clubSettingInfo.configDefaultInfo.minStartScore);
			// 	var max = Math.floor(clubSettingInfo.configDefaultInfo.maxStartScore);
			// 	if(!this.checkInputConfigInfo(startScoreString,min,max)){
			// 		CommonView.showToast(Utils.format("开始分数应该是{0}-{1}之间",min,max));
			// 		return;
			// 	}					
			// 	clubSettingInfo.startScore = parseInt(startScoreString);
			// }else{
			// 	if(clubSettingInfo.oneMaxScore > 0){
			// 		var cktScoreString = this.editCKTScore.text.trim();
			// 		var min = Math.floor(clubSettingInfo.configDefaultInfo.minCtkScore);
			// 		var max = Math.floor(clubSettingInfo.configDefaultInfo.maxCtkScore);
			// 		if(!this.checkInputConfigInfo(cktScoreString,min,max)){
			// 			CommonView.showToast(Utils.format("单把上限应该是{0}-{1}之间",min,max));
			// 			return;
			// 		}						
			// 		clubSettingInfo.oneMaxScore = parseInt(cktScoreString);
			// 	}
			// }
			ClubService.getInstance().clubSetting(clubSettingInfo);
		}

		private checkInputConfigInfo(str: string, min, max) {
			if (str.length == 0) {
				return false;
			}
			var a = parseInt(str);
			if (a >= min && a <= max) {
				return true;
			} else {
				return false;
			}
		}

		private saveConfigCallback(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				CommonView.showToast("俱乐部设置成功");
				this.close();
			} else {
				CommonView.showToast("俱乐部设置失败");
			}
		}


		public clean() {

			super.clean();
		}
	}
}