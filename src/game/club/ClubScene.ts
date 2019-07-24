module game {
	export class ClubScene extends SceneBase {
		private scrollerClubList: EScroller;
		private btnBack: EButton;
		private btnInviteMember: EButton;
		private btnCreateClub: EButton;
		private btnJoinClub: EButton;
		private btnEditNotice: EButton;
		private btnApplyHistory: EButton;

		private Button_find_lucky_member_other: EButton
		private Button_lucky_member: EButton
		private Button_divide: EButton
		private Button_invite_member: EButton
		private Button_check_others_replay: EButton
		private Button_partner_group: EButton
		private Button_record_data: EButton
		private labelClubId: eui.Label;
		// private labelClubId1:eui.Label;

		private labelNotice: eui.Label;
		private marqueeNotice: EMarqueeText;

		private btnRooms: EToggleButton;
		private btnMembers: EToggleButton;
		private btnApplyJoins: EToggleButton;
		private btnCombatRecords: EToggleButton;
		private btnLuckyScore: EToggleButton;
		private imgApplyRedTip: eui.Image;

		private clubMembersUI: ClubMembersUI;
		private clubRoomUI: ClubRoomUI;
		private clubApplyJoinsUI: ClubApplyJoinsUI;
		private clubCombatRecordsUI: ClubCombatRecordsUI;
		private ClubLuckyScore: ClubLuckyScore;
		// private autoCreateRoom:ERadioButton;
		private btnCreateTable: EButton;

		private groupClubUI: eui.Group;
		private noClubUI: NoClubUI;

		// private groupClubIdMember:eui.Group;
		private groupClubIdAdmin: eui.Group;
		private groupRecords: eui.Group
		private btnSetting: EButton;
		private groupCreateRoom: eui.Group;
		private groupSearch: eui.Group;
		// private editSearch:eui.EditableText;
		// private btnResetSearch:EButton;
		private btnSearch: EButton;

		private btnSetWatcher: EButton;

		private labelWatchInfo: eui.Label;

		private groupLuckyScore: eui.Group
		private Text_lucky_score_num: eui.Label


		private clubDataList: ClubData[];
		private selectedClubData: ClubData = null;
		private rightTablePosY = [0, 108, 216, 324, 432]
		private isShowOtherBelssNum: boolean = false
		public constructor() {
			super(Constants.SCENE_INDEX.CLUB);
			this.skinName = "resource/skins/club/clubSceneSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.labelWatchInfo.touchEnabled = false
			this.groupClubUI.visible = false
			this.noClubUI.visible = false
			this.addTapEvent(this.btnBack, this.clickBack);
			this.addTapEvent(this.btnInviteMember, this.clickInviteMember);
			this.addTapEvent(this.btnCreateClub, this.clickCreateClub);
			this.addTapEvent(this.btnJoinClub, this.clickJoinClub);
			this.addTapEvent(this.btnEditNotice, this.clickEditNotice)

			this.addTapEvent(this.btnRooms, this.clickRooms);
			this.addTapEvent(this.btnMembers, this.clickMembers);
			this.addTapEvent(this.btnApplyJoins, this.clickApplyJoins);
			this.addTapEvent(this.btnApplyHistory, this.clickLog);
			this.addTapEvent(this.btnCombatRecords, this.clickCombatRecords);
			this.addTapEvent(this.btnLuckyScore, this.clickLuckScore);
			// this.addTapEvent(this.autoCreateRoom,this.clickAutoCreate);
			this.addTapEvent(this.marqueeNotice, this.showNotice);
			this.addTapEvent(this.btnCreateTable, this.createRoom);
			// this.addTapEvent(this.btnResetSearch,this.resetSearch);
			this.addTapEvent(this.btnSearch, this.searchMember);

			this.addTapEvent(this.btnSetting, this.clickSetting);

			this.addTapEvent(this.btnSetWatcher, this.clickSetWatcher);
			this.addTapEvent(this.Button_divide, this.clickDivide)
			this.addTapEvent(this.Button_invite_member, () => {
				Utils.copyToClipboard(GlobalData.getInviteToClubUrlWithShareCode(this.selectedClubData.clubId))
				DialogManager.getInstance().popUp2("复制成功，是否打开微信粘贴？", () => {
					Utils.callWxApp()
				})
			})
			this.addTapEvent(this.Button_find_lucky_member_other, () => {
				var dialog = new ClubFindOtherMemeberLucky(this.getSelectedClubData());
				DialogManager.getInstance().show(dialog);
			})
			this.addTapEvent(this.Button_lucky_member, () => {
				var dialog = new ClubLuckMemeberBox(this.getSelectedClubData(), this.isShowOtherBelssNum);
				DialogManager.getInstance().show(dialog);
			})
			this.addTapEvent(this.Button_check_others_replay, () => {
				var dialog = new ViewReplayDialog();
				DialogManager.getInstance().show(dialog);
			})
			this.addTapEvent(this.Button_partner_group, () => {
				let dialog = new ClubPartnerBox(this.getSelectedClubData(), this.getSelectedClubData().superBlessSwitch)
				DialogManager.getInstance().show(dialog);
			})
			this.addTapEvent(this.Button_record_data, () => {
				let dialog = new ClubMyRecordDataBox(this.getSelectedClubData())
				DialogManager.getInstance().show(dialog)
			})
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_LIST), this.getClubListBack, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_ROOM_AUTOCREATE), this.getSwitchAutoTableBack, this);
			EAppFacade.getInstance().registerCommand(GameCmd.CLICK_CLUB_ITEM, this.clickClubItem, this);
			EAppFacade.getInstance().registerCommand(GameCmd.CLICK_CLUB_UpdateRedTip, this.updateRedTip, this);
			EAppFacade.getInstance().registerCommand(GameCmd.CLUB_UPDATE_BLESS_VALUE, this.updateBlessValue, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_NOTICE), this.updateNotice, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_setWatcher), this.watcherChange, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_myblessnum), this.getMyBlessNumb, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_MAMAGER_RIGHT), this.getOppartMgr, this);
			EAppFacade.getInstance().registerCommand(GameCmd.CLUB_REFRESH_BLESS_LIST, this.updateList, this);

			// EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_SET_HASPUSH),this.getClubListBack,this);

			this.marqueeNotice.setTextColor(0xF2EFC9);
			this.marqueeNotice.setTextSize(24);

			this.initScroller();

			this.getClubList();
		}

		protected updateUI_() {
			var selectClubData = this.getSelectedClubData();
			// selectClubData = null;
			// this.autoCreateRoom.setText("自动续房");
			// this.groupClubIdAdmin.visible = false;
			// this.groupClubIdMember.visible = true;

			if (selectClubData != null) {
				// this.labelWatchInfo.text = selectClubData.watcherName;
				GameUtils.sub(this.labelWatchInfo, selectClubData.watcherName, 140)
				var b = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_memberManager);
				this.btnApplyJoins.visible = b;
				this.btnCombatRecords.visible = true;
				this.imgApplyRedTip.visible = selectClubData.hasShowRedTip;
				this.updateClubItems();

				var hasRoomRules = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_roomRules);
				this.btnCreateTable.visible = hasRoomRules;
				this.btnSetting.visible = hasRoomRules;
				// this.autoCreateRoom.visible = isMonitor;
				// this.autoCreateRoom.setSelected(selectClubData.hasAutoCreate);
				//成员管理 
				this.btnSetWatcher.visible = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_memberManager);
				this.labelNotice.text = selectClubData.noticeContent;
				this.marqueeNotice.start(selectClubData.noticeContent);
				//日志
				this.btnApplyHistory.visible = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_operLog)
				var hasEditNotice = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_editNotice);
				this.Button_lucky_member.visible = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_blessManage);
				this.Button_find_lucky_member_other.visible = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_blessManage);
				this.btnEditNotice.visible = hasEditNotice;
				this.noClubUI.visible = false;
				this.groupClubUI.visible = true;
				this.btnLuckyScore.visible = selectClubData.superBlessSwitch
				// var isManager = ClubService.getInstance().isManager(selectClubData.memberType);

				// this.groupClubIdAdmin.visible = isManager;
				// this.groupClubIdMember.visible = !isManager;
			} else {
				this.btnCreateTable.visible = false;
				// this.autoCreateRoom.visible = false;
				this.noClubUI.visible = true;
				this.groupClubUI.visible = false;
			}
		}

		private updateClubList() {
			this.scrollerClubList.clearContent();
			this.scrollerClubList.setScrollerContent(this.clubDataList);
			var selectClubData = this.getSelectedClubData();
			if (typeof (selectClubData) != "undefined" && selectClubData != null) {
				this.Button_partner_group.visible = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_oppartber)
				var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_MAMAGER_RIGHT, { clubId: selectClubData.clubId })
				SocketManager.getInstance().send(requestDomain)
			}
		}

		private initScroller() {
			// this.scrollerClubList.setScrollerHeight(463);
			this.scrollerClubList.setElementViewInfo(72, 10);
			this.scrollerClubList.setElementCreateFunction(this.createElement.bind(this));
			this.scrollerClubList.setElementUpdateDataFun(this.updateElement.bind(this));
			this.scrollerClubList.setElementUpdateUIFun(this.updateElementUI.bind(this));
		}

		private registerPushNotice() {

		}


		private createElement(data) {
			LogUtils.info("createElement====" + data);
			var item = new ClubItem(data);
			return item;
		}

		private updateElement(item: ClubItem, data: any) {
			item.setData(data);
		}

		private updateElementUI(item: ClubItem) {
			item.updateUI();
		}

		private clickClubItem(event: egret.Event) {
			if (this.selectedClubData != null) {
				ClubService.getInstance().setPushNotice(this.selectedClubData.clubId, false);
			}
			this.setSelectedClubData(event.data);

			this.updateClubItems();
			this.updateUI();
			this.clickRooms();
			this.Button_partner_group.visible = ClubService.getInstance().checkRight(this.selectedClubData.permissions, ClubConst.PermissionType.Key_oppartber);
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_MAMAGER_RIGHT, { clubId: this.selectedClubData.clubId });
			SocketManager.getInstance().send(requestDomain);
		}

		private updateClubItems() {
			var len = this.clubDataList.length;
			for (var i = 0; i < len; i++) {
				this.clubDataList[i].selected = (this.clubDataList[i] == this.selectedClubData)
			}
			this.scrollerClubList.updateUI();
		}

		private getClubList() {
			ClubService.getInstance().getClubList();
		}

		private getClubListBack(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				this.clubDataList = [];
				var jsonData = msgDomain.data;
				for (var key in jsonData) {
					var itemData = jsonData[key];
					var clubData = new ClubData();
					clubData.parse(itemData);
					if (clubData.gameId == Constants.GAME_ID_SET.nanjing) {
						this.clubDataList.push(clubData);
					}
				}
				this.updateClubList();
				this.updateUI();
				LogUtils.info("this.clubDataList===" + this.clubDataList.length);
				this.clickRooms();
			}
		}

		private clickBack() {
			SceneSkip.skipToHallScene();
		}
		private clickCreateClub() {
			var dialog = new ClubCreateDialog();
			DialogManager.getInstance().show(dialog, EDialog.show_ani_type_null);
		}
		private clickJoinClub() {
			var dialog = new JoinClubDialog();
			DialogManager.getInstance().show(dialog, EDialog.show_ani_type_null);
		}
		private clickInviteMember() {

		}
		private clickEditNotice() {
			if (this.selectedClubData != null) {
				var dialog = new ClubNoticeShowDialog(this.selectedClubData.clubId, this.selectedClubData.noticeContent, true);
				DialogManager.getInstance().show(dialog);
			}
		}

		private clickRooms() {
			this.updateClubMenus(this.btnRooms);
			this.updateClubMenuViews(this.clubRoomUI);
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_CLUB_Rooms, this.getSelectedClubData());
		}

		private clickMembers() {
			this.updateClubMenus(this.btnMembers);
			this.updateClubMenuViews(this.clubMembersUI);
			var obj = { clubData: this.getSelectedClubData(), patternType: 0, patternContent: "" };
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_CLUB_Members, obj);
		}

		private clickApplyJoins() {
			this.updateClubMenus(this.btnApplyJoins);
			this.updateClubMenuViews(this.clubApplyJoinsUI);
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_CLUB_ApplyJoins, this.getSelectedClubData());

		}
		private clickCombatRecords() {
			this.updateClubMenus(this.btnCombatRecords);
			this.updateClubMenuViews(this.clubCombatRecordsUI);
			this.clubCombatRecordsUI.setData(this.getSelectedClubData().clubId);
		}
		private clickLog() {
			let dialog = new clubMemberHistories(this.getSelectedClubData());
			DialogManager.getInstance().show(dialog)
		}
		private clickLuckScore() {
			this.updateClubMenus(this.btnLuckyScore);
			this.updateClubMenuViews(this.ClubLuckyScore)
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_CLUB_Bless, this.getSelectedClubData());
		}
		private clickDivide() {
			let dialog = new ClubDivideBox(this.getSelectedClubData());
			DialogManager.getInstance().show(dialog)
		}
		private updateLuckyScoreGroup(isVisible: boolean) {

			this.groupLuckyScore.visible = isVisible
			// if (isVisible) {
			// 	this.Text_lucky_score_num.text = "我的体力："
			// }
		}
		private updateBlessValue(event: egret.Event) {
			this.setSelectedClubData(event.data)
			this.Text_lucky_score_num.size = 36
			this.Text_lucky_score_num.text = "我的体力：" + event.data.blessNum
			this.isShowOtherBelssNum = false
		}
		private updateClubMenus(btn) {
			var menus = [this.btnRooms, this.btnMembers, this.btnApplyJoins, this.btnCombatRecords, this.btnLuckyScore];

			var len = menus.length;
			let idx = 0
			for (var i = 0; i < len; i++) {
				menus[i].selected = (menus[i] == btn)
				if (menus[i].visible == true) {
					menus[i].y = this.rightTablePosY[idx]
					idx++
				}
			}
			this.groupCreateRoom.visible = (this.btnRooms == btn);

			this.groupSearch.visible = false;
			this.Button_divide.visible = false
			this.Button_invite_member.visible = false
			var isMemberTab = (this.btnMembers == btn);
			if (isMemberTab) {
				var selectClubData = this.getSelectedClubData();
				var hasMemberManager = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_memberManager);
				this.Button_invite_member.visible = hasMemberManager
				this.groupSearch.visible = hasMemberManager;
				this.Button_divide.visible = ClubService.getInstance().checkRight(selectClubData.permissions, ClubConst.PermissionType.Key_divideManage)
			}
			if (this.btnLuckyScore == btn) {
				this.groupClubIdAdmin.visible = false
				this.updateLuckyScoreGroup(true)
			}
			else {
				this.groupClubIdAdmin.visible = true
				this.updateLuckyScoreGroup(false)
			}
			if (this.btnCombatRecords == btn) {
				this.groupRecords.visible = true
				this.Button_check_others_replay.visible = ClubService.getInstance().checkRight(this.getSelectedClubData().permissions, ClubConst.PermissionType.key_record)
			}
			else {
				this.groupRecords.visible = false
			}
			this.scrollerClubList.updateUI();
		}

		private updateClubMenuViews(view) {
			var menus = [this.clubRoomUI, this.clubMembersUI, this.clubApplyJoinsUI, this.clubCombatRecordsUI, this.ClubLuckyScore];

			var len = menus.length;
			for (var i = 0; i < len; i++) {
				menus[i].visible = (menus[i] == view)
			}
			this.scrollerClubList.updateUI();
		}

		private getSelectedClubData() {
			if (this.selectedClubData == null) {
				if (this.clubDataList.length > 0) {
					this.setSelectedClubData(this.clubDataList[0]);
				}
			}
			return this.selectedClubData;
		}

		private setSelectedClubData(clubData) {
			this.selectedClubData = clubData;
			this.labelClubId.text = "俱乐部ID：" + this.selectedClubData.clubId;
			// this.labelClubId1.text = this.selectedClubData.clubId;
		}


		// private clickAutoCreate(){
		// 	var b = this.autoCreateRoom.isSelected();
		// 	ClubService.getInstance().autoCreateTableSwitch(this.selectedClubData.clubId,b);
		// }

		private getSwitchAutoTableBack(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				var b: any = msgDomain.data;
				// this.autoCreateRoom.setSelected(b);
			}
		}

		private showNotice() {
			if (this.selectedClubData != null) {
				var dialog = new ClubNoticeShowDialog(this.selectedClubData.clubId, this.selectedClubData.noticeContent, false);
				DialogManager.getInstance().show(dialog);
			}
		}

		private createRoom() {
			if (this.selectedClubData != null) {
				// var dialog = new CreateRoomDialog(this.selectedClubData.clubId);
				// DialogManager.getInstance().show(dialog);

				var dialog = new ClubRuleDialog(this.selectedClubData.clubId);
				DialogManager.getInstance().show(dialog, EDialog.show_ani_type_null);
			}
		}



		private searchMember() {
			// var key = this.editSearch.text.trim();
			// this.clubMembersUI.filterMember(key);
			if (this.selectedClubData != null) {
				var dialog = new ClubSearchDialog(this.getSelectedClubData());
				DialogManager.getInstance().show(dialog, EDialog.show_ani_type_null);
			}
		}

		private updateNotice(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				var data: any = msgDomain.data;
				this.selectedClubData.noticeContent = data.pubContent;
				this.marqueeNotice.start(this.selectedClubData.noticeContent);
			}

		}

		private updateRedTip(event: egret.Event) {
			if (event.data != null) {
				var json: any = event.data;
				if (this.selectedClubData != null) {
					this.selectedClubData.hasShowRedTip = json.isShow;
					this.scrollerClubList.updateUI();
					this.imgApplyRedTip.visible = this.selectedClubData.hasShowRedTip;
				}
			}
		}

		private clickSetting() {
			if (this.selectedClubData != null) {
				var dialog = new ClubSettingDialog(this.selectedClubData.clubId);
				DialogManager.getInstance().show(dialog);
			}
		}

		private clickSetWatcher() {
			if (this.selectedClubData != null) {
				var dialog = new ClubWatcherDialog(this.selectedClubData.clubId);
				DialogManager.getInstance().show(dialog);
			}
		}

		private watcherChange(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				var clubMemberData: ClubMemberData = msgDomain.data;
				// this.labelWatchInfo.text = clubMemberData.memberName;
				GameUtils.sub(this.labelWatchInfo, clubMemberData.memberName, 140)
			}
		}
		private getMyBlessNumb(event: egret.Event) {

		}
		private updateList(event: egret.Event) {
			if (event.data != null) {
				if (event.data.isViewOtherMember) {
					this.Text_lucky_score_num.size = 32
					let name = event.data.userName
					GameUtils.sub(this.Text_lucky_score_num, name, 200)
					name = this.Text_lucky_score_num.text
					this.Text_lucky_score_num.text = Utils.format("{0}的体力：{1}", name, event.data.userBlessNum)
					this.isShowOtherBelssNum = true
				}
				else {
					this.Text_lucky_score_num.size = 36
					this.Text_lucky_score_num.text = "我的体力：" + event.data.userBlessNum
					this.isShowOtherBelssNum = false
				}
			}
		}
		private getOppartMgr(event: egret.Event) {
			let msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				if (this.btnLuckyScore.selected) {
					if (msgDomain.data.modifyAnyoneSwitch) {
						if (ClubService.getInstance().checkRight(this.getSelectedClubData().permissions, ClubConst.PermissionType.Key_blessManage))
							this.Button_lucky_member.visible = true
						else
							this.Button_lucky_member.visible = false
					}
					else {
						if (ClubService.getInstance().checkRight(this.getSelectedClubData().permissions, ClubConst.PermissionType.Key_blessManage)
							|| msgDomain.data.groupManager)
							this.Button_lucky_member.visible = true
						else
							this.Button_lucky_member.visible = false
					}
				}
			}
		}
		public clean() {
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_LIST), this.getClubListBack, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_ROOM_AUTOCREATE), this.getSwitchAutoTableBack, this);
			EAppFacade.getInstance().removeCommand(GameCmd.CLICK_CLUB_ITEM, this.clickClubItem, this);
			EAppFacade.getInstance().removeCommand(GameCmd.CLICK_CLUB_UpdateRedTip, this.updateRedTip, this);
			EAppFacade.getInstance().removeCommand(GameCmd.CLUB_UPDATE_BLESS_VALUE, this.updateBlessValue, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_NOTICE), this.updateNotice, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_setWatcher), this.watcherChange, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_myblessnum), this.getMyBlessNumb, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_MAMAGER_RIGHT), this.getOppartMgr, this);
			EAppFacade.getInstance().removeCommand(GameCmd.CLUB_REFRESH_BLESS_LIST, this.updateList, this);

			if (this.selectedClubData != null) {
				ClubService.getInstance().setPushNotice(this.selectedClubData.clubId, false);
			}
			super.clean();
		}

	}
}