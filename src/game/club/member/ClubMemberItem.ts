module game {
	export class ClubMemberItem extends EComponent {
		private imgHead: eui.Image;
		private labelMemberName: eui.Label;
		private labelMemberID: eui.Label;
		private imgMemberType: eui.Image;

		private labelStatus: eui.Label;
		private labelTodayNum: eui.Label;
		private labelTotalNum: eui.Label;
		private btnSetting: EButton;
		private imgWatcher: eui.Image;
		private imgGameStatus: eui.Image;

		private clubData: ClubData;
		private clubMemberData: ClubMemberData;
		public constructor(clubData: ClubData, clubMemberData) {
			super();
			this.clubData = clubData;
			this.clubMemberData = clubMemberData;
			this.skinName = "resource/skins/club/member/clubMemberItemSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnSetting, this.clickMemberManage);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_SET_MEMBER), this.setMemberCallback, this);
			this.updateUI();
		}

		public setData(clubData: ClubData, data: any) {
			this.clubData = clubData;
			this.clubMemberData = data;
			this.updateUI();
		}

		protected updateUI_() {
			if (this.clubMemberData != null) {
				var self = this;
				self.imgHead.visible = false
				ResManager.loadWebImage(this.clubMemberData.headImgUrl, function (texture: any,url) {
					if(url != this.clubMemberData.headImgUrl)
					{
						console.log("url 不一样")
						return
					}
					self.imgHead.visible = true
					self.imgHead.texture = texture;
					// self.imgHead.addEventListener(eui.UIEvent.COMPLETE, () => {
					// 	self.imgHead.texture = texture;
					// }, this)
				}, this)
				this.labelMemberName.text = this.clubMemberData.memberName;
				this.labelMemberID.text = "ID:" + this.clubMemberData.memberId;
				this.imgMemberType.visible = true;
				if (this.clubMemberData.memberType == ClubConst.MemberType.MONITOR) {
					this.imgMemberType.source = "img_club_member_position_1_png";
					// }else if(this.clubMemberData.memberType == ClubConst.MemberType.MONITOR2){
					// 	this.imgMemberType.source = "img_club_member_position_3_png";					
					// }else if(this.clubMemberData.memberType == ClubConst.MemberType.ADMIN){
					// 	this.imgMemberType.source = "img_club_member_position_2_png";
				} else {
					this.imgMemberType.visible = false;
				}
				this.labelStatus.text = this.clubMemberData.hasOnline ? "在线" : "离线";
				this.labelStatus.textColor = this.clubMemberData.hasOnline ? 0x2DCE40 : 0x9D4E08;

				this.labelTodayNum.text = this.clubMemberData.todayAchieveNum + "局";
				this.labelTotalNum.text = this.clubMemberData.achieveNum + "局";

				var hasDefaultPermission = ClubService.getInstance().checkDefaultRight(this.clubData.permissions);

				this.labelTotalNum.visible = hasDefaultPermission;

				// var hasRight = ClubService.getInstance().isMonitor(this.clubData.memberType,this.clubMemberData.memberType,ClubConst.RightType.MemberSetting);
				this.btnSetting.visible = hasDefaultPermission && this.clubMemberData.memberType != ClubConst.MemberType.MONITOR;

				this.imgWatcher.visible = this.clubMemberData.watcher;
				this.imgGameStatus.visible = this.clubMemberData.forbidGame;
			}
		}

		private clickMemberManage() {
			var dialog = new clubMemberManageDialog(this.clubData, this.clubMemberData);
			DialogManager.getInstance().show(dialog, game.EDialog.show_ani_type_null);

		}

		private setMemberCallback(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				var clubMemberData: ClubMemberData = msgDomain.data;
				if (this.clubMemberData.memberId == clubMemberData.memberId) {
					this.clubMemberData = clubMemberData;
					this.updateUI();
				}
			}
		}

		public clean() {
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_SET_MEMBER), this.setMemberCallback, this);
			super.clean();
		}
	}
}