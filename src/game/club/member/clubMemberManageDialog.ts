module game {
	export class clubMemberManageDialog extends EDialog {
		private group: eui.Group;

		private group1: eui.Group;
		private group2: eui.Group;
		private groupTab: eui.Group
		private labelTitle: eui.Label;
		private labelMemberType: eui.Label;
		private labelGameStatus: eui.Label;

		// private btnSetMonistor2:EButton;
		// private btnSetManager:EButton;
		// private btnSetMember:EButton;
		private Button_permission: EButton;
		private Button_forbid: EButton;
		private btnAllowGame: EButton;
		private btnForbidGame: EButton;

		private btnKickMember: EButton;

		private btnClose: EButton;
		private btnSave: EButton;

		private radioRoomRules: ERadioButton;
		private radioCancelRoom: ERadioButton;
		private radioEditNotice: ERadioButton;
		private radioMemberManager: ERadioButton;
		private radioRecordManager: ERadioButton;
		private radioOperLog: ERadioButton;
		private radioDivideManager: ERadioButton;
		private radioBlessManager: ERadioButton;
		private radioPartnerManager: ERadioButton;

		private clubData: ClubData;
		private clubMemberData: ClubMemberData;
		private tabState = 0;
		// private permissions;

		public constructor(clubData, clubMemberData) {
			super();
			this.clubData = clubData;
			this.clubMemberData = clubMemberData;
			// this.permissions = clubMemberData.permissions
			this.skinName = "resource/skins/club/member/clubMemberManageUISkin.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			if (this.clubData.memberType == ClubConst.MemberType.MONITOR) {
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_get_permission,
					{
						clubId: this.clubData.clubId,
						memberId: this.clubMemberData.memberId,
					});
				SocketManager.getInstance().send(requestDomain);
			}

			this.addTapEvent(this.btnClose, this.close);

			this.addTapEvent(this.btnAllowGame, this.clickAllowGame);
			this.addTapEvent(this.btnForbidGame, this.clickForbidGame);

			this.addTapEvent(this.btnKickMember, this.clickKickMember);
			this.addTapEvent(this.Button_forbid, () => {
				this.tabState = 0
				this.updateUI()
			})
			this.addTapEvent(this.Button_permission, () => {
				this.tabState = 1
				this.updateUI()
			})
			this.addTapEvent(this.btnSave, () => {
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_set_permission,
					{
						clubId: this.clubData.clubId,
						memberId: this.clubMemberData.memberId,
						permissions: this.clubMemberData.permissions
					});
				SocketManager.getInstance().send(requestDomain);
			})
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_SET_MEMBER), this.operCallback, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_forbid_game), this.operCallback, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_REMOVEMEMBER), this.kickMemberCallback, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_get_permission), this.getMemberPermission, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_set_permission), this.setMemberPermission, this)

			this.radioRoomRules.setText("房间规则");
			this.radioRoomRules.setFontFamily("fzzy");
			this.radioRoomRules.setFontColor(0x684A2F)
			this.radioRoomRules.setFontSize(26);
			this.radioRoomRules.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_roomRules] == 1)
			this.addTapEvent(this.radioRoomRules, () => {
				if (this.clubMemberData.permissions[ClubConst.PermissionType.Key_roomRules] == 1)
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_roomRules] = 0
				else
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_roomRules] = 1
				this.radioRoomRules.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_roomRules] == 1)
			})

			this.radioCancelRoom.setText("房间解散");
			this.radioCancelRoom.setFontFamily("fzzy");
			this.radioCancelRoom.setFontColor(0x684A2F)
			this.radioCancelRoom.setFontSize(26);
			this.radioCancelRoom.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_cancelRoom] == 1)
			this.addTapEvent(this.radioCancelRoom, () => {
				if (this.clubMemberData.permissions[ClubConst.PermissionType.Key_cancelRoom] == 1)
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_cancelRoom] = 0
				else
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_cancelRoom] = 1
				this.radioCancelRoom.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_cancelRoom] == 1)
			})

			this.radioEditNotice.setText("编辑公告");
			this.radioEditNotice.setFontFamily("fzzy");
			this.radioEditNotice.setFontColor(0x684A2F)
			this.radioEditNotice.setFontSize(26);
			this.radioEditNotice.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_editNotice] == 1)
			this.addTapEvent(this.radioEditNotice, () => {
				if (this.clubMemberData.permissions[ClubConst.PermissionType.Key_editNotice] == 1)
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_editNotice] = 0
				else
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_editNotice] = 1
				this.radioEditNotice.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_editNotice] == 1)
			})

			this.radioMemberManager.setText("成员管理");
			this.radioMemberManager.setFontFamily("fzzy");
			this.radioMemberManager.setFontColor(0x684A2F)
			this.radioMemberManager.setFontSize(26);
			this.radioMemberManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_memberManager] == 1)
			this.addTapEvent(this.radioMemberManager, () => {
				if (this.clubMemberData.permissions[ClubConst.PermissionType.Key_memberManager] == 1)
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_memberManager] = 0
				else
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_memberManager] = 1
				this.radioMemberManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_memberManager] == 1)
			})

			this.radioRecordManager.setText("记录管理");
			this.radioRecordManager.setFontFamily("fzzy");
			this.radioRecordManager.setFontColor(0x684A2F)
			this.radioRecordManager.setFontSize(26);
			this.radioRecordManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.key_record] == 1)
			this.addTapEvent(this.radioRecordManager, () => {
				if (this.clubMemberData.permissions[ClubConst.PermissionType.key_record] == 1)
					this.clubMemberData.permissions[ClubConst.PermissionType.key_record] = 0
				else
					this.clubMemberData.permissions[ClubConst.PermissionType.key_record] = 1
				this.radioRecordManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.key_record] == 1)
			})

			this.radioOperLog.setText("操作日志");
			this.radioOperLog.setFontFamily("fzzy");
			this.radioOperLog.setFontColor(0x684A2F)
			this.radioOperLog.setFontSize(26);
			this.radioOperLog.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_operLog] == 1)
			this.addTapEvent(this.radioOperLog, () => {
				if (this.clubMemberData.permissions[ClubConst.PermissionType.Key_operLog] == 1)
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_operLog] = 0
				else
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_operLog] = 1
				this.radioOperLog.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_operLog] == 1)
			})

			this.radioDivideManager.setText("隔离组管理");
			this.radioDivideManager.setFontFamily("fzzy");
			this.radioDivideManager.setFontColor(0x684A2F)
			this.radioDivideManager.setFontSize(26);
			this.radioDivideManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_divideManage] == 1)
			this.addTapEvent(this.radioDivideManager, () => {
				if (this.clubMemberData.permissions[ClubConst.PermissionType.Key_divideManage] == 1)
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_divideManage] = 0
				else
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_divideManage] = 1
				this.radioDivideManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_divideManage] == 1)
			})

			this.radioBlessManager.setText("体力管理");
			this.radioBlessManager.setFontFamily("fzzy");
			this.radioBlessManager.setFontColor(0x684A2F)
			this.radioBlessManager.setFontSize(26);
			this.radioBlessManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_blessManage] == 1)
			this.addTapEvent(this.radioBlessManager, () => {
				if (this.clubMemberData.permissions[ClubConst.PermissionType.Key_blessManage] == 1)
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_blessManage] = 0
				else
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_blessManage] = 1
				this.radioBlessManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_blessManage] == 1)
			})

			this.radioPartnerManager.visible = this.clubData.superBlessSwitch
			this.radioPartnerManager.setText("合伙组管理");
			this.radioPartnerManager.setFontFamily("fzzy");
			this.radioPartnerManager.setFontColor(0x684A2F)
			this.radioPartnerManager.setFontSize(26);
			this.radioPartnerManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_oppartber] == 1)
			this.addTapEvent(this.radioPartnerManager, () => {
				if (this.clubMemberData.permissions[ClubConst.PermissionType.Key_oppartber] == 1)
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_oppartber] = 0
				else
					this.clubMemberData.permissions[ClubConst.PermissionType.Key_oppartber] = 1
				this.radioPartnerManager.setSelected(this.clubMemberData.permissions[ClubConst.PermissionType.Key_oppartber] == 1)
			})
			this.updateUI();
		}

		public setContentPostion(p: egret.Point) {
			this.group.x = p.x - this.group.width - 10;
			this.group.y = p.y - 50;
		}

		protected updateUI_() {
			var isMonitor = (this.clubData.memberType == ClubConst.MemberType.MONITOR);
			this.groupTab.visible = isMonitor

			if (this.tabState == 0) {
				this.Button_forbid.alpha = 1
				this.Button_permission.alpha = 0
				this.group1.visible = true;
				this.group2.visible = false;
				this.labelTitle.text = "设置【" + this.clubMemberData.memberName + "】成员状态:";
			}
			else {
				this.Button_forbid.alpha = 0
				this.Button_permission.alpha = 1
				this.group1.visible = false;
				this.group2.visible = true;
				this.labelTitle.text = "设置【" + this.clubMemberData.memberName + "】成员拥有以下权限:";
			}

			var forbidGame = this.clubMemberData.forbidGame;
			this.labelGameStatus.text = forbidGame ? "禁止游戏" : "允许游戏";


			var hasMemberManager = ClubService.getInstance().checkRight(this.clubData.permissions, ClubConst.PermissionType.Key_memberManager);
			if (hasMemberManager) {
				this.btnAllowGame.enabled = forbidGame;
				this.btnForbidGame.enabled = !forbidGame;
			} else {
				this.btnAllowGame.enabled = false;
				this.btnForbidGame.enabled = false;
			}


		}
		private checkPermissions(permissionType: any): boolean {
			return ClubService.getInstance().checkRight(this.clubMemberData.permissions, permissionType);
		}
		// private clickSetMonitor2(){
		// 	var clubId = this.clubData.clubId;
		// 	var memberId = this.clubMemberData.memberId;
		// 	ClubService.getInstance().setMemberType(clubId,memberId,ClubConst.MemberType.MONITOR2);
		// }

		// private clickSetManager(){
		// 	var clubId = this.clubData.clubId;
		// 	var memberId = this.clubMemberData.memberId;
		// 	ClubService.getInstance().setMemberType(clubId,memberId,ClubConst.MemberType.ADMIN);
		// }

		// private clickSetMember(){
		// 	var clubId = this.clubData.clubId;
		// 	var memberId = this.clubMemberData.memberId;
		// 	ClubService.getInstance().setMemberType(clubId,memberId,ClubConst.MemberType.MEMBER);
		// }		

		private clickAllowGame() {
			var clubId = this.clubData.clubId;
			var memberId = this.clubMemberData.memberId;
			ClubService.getInstance().allowGame(clubId, memberId);
		}

		private clickForbidGame() {
			var clubId = this.clubData.clubId;
			var memberId = this.clubMemberData.memberId;
			ClubService.getInstance().forbidGame(clubId, memberId);
		}

		// private setMemberCallback(event:egret.Event){
		//     var msgDomain:MsgDomain = event.data;
		//     if(msgDomain.code == CmdResultType.SUCCESS){
		// 		this.close();
		//         CommonView.showToast("操作成功");
		// 	}        
		// }

		private operCallback(event: egret.Event) {
			var self = this;
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				CommonView.showToast("操作成功");
				self.clubMemberData = msgDomain.data;
				self.updateUI();
			}
		}

		private clickKickMember() {
			var clubId = this.clubData.clubId;
			var memberId = this.clubMemberData.memberId;
			ClubService.getInstance().kickMember(clubId, memberId);
		}

		private kickMemberCallback(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				this.close();
				CommonView.showToast("操作成功");
			}
		}
		private getMemberPermission(event: egret.Event) {
			let msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				this.clubMemberData.permissions = msgDomain.data.permissions || []
			}
		}
		private setMemberPermission(event: egret.Event) {
			let msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				CommonView.showToast("保存成功")
			}
		}
		public clean() {
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_SET_MEMBER), this.operCallback, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_forbid_game), this.operCallback, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_REMOVEMEMBER), this.kickMemberCallback, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_get_permission), this.getMemberPermission, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_set_permission), this.setMemberPermission, this)
			super.clean();
		}
	}
}