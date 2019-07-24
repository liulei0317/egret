module game {
	export class ClubService {
		private static instance: ClubService;


		private constructor() {
		}

		public static getInstance() {
			if (ClubService.instance == null) {
				ClubService.instance = new ClubService();
			}
			return ClubService.instance;
		}
		public getMyBlessNumber(_clubId) {
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_myblessnum, { clubId: _clubId });
			SocketManager.getInstance().send(requestDomain);
		}
		public getMemberBlessList(_clubId) {
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_memberblesslist, { clubId: _clubId });
			SocketManager.getInstance().send(requestDomain);
		}
		public getClubList() {
			// var element: any = { daiKai: false};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_LIST, null);
			SocketManager.getInstance().send(requestDomain);
		}
		public joinClub(clubId, applyDesc) {
			var element: any = { clubId: clubId, applyDesc: applyDesc };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_JOIN, element);
			SocketManager.getInstance().send(requestDomain);
		}
		public getClubRoomList(clubId) {
			var element: any = { clubId: clubId };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_ROOMINFOLIST, element);
			SocketManager.getInstance().send(requestDomain);
		}
		public getClubMemberList(clubId, patternType, patternContent) {
			var element: any = { clubId: clubId, patternType: patternType, patternContent: patternContent };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_MEMBERLIST, element);
			SocketManager.getInstance().send(requestDomain);
		}
		public getClubApplyJoins(clubId) {
			var element: any = { clubId: clubId };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_WAITCHECK_MEMBERLIST, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public setPushNotice(clubId, hashPush) {
			var element: any = { clubId: clubId, hashPush: hashPush };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_SET_HASPUSH, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public getClubErrorCodeInfo(errorCode: number) {
			if (errorCode == MsgConstant.ERROR_club_hasPassed_member) {
				return "你已加入俱乐部，不需要重复申请!";
			} else if (errorCode == MsgConstant.ERROR_club_IsNotFund) {
				return "输入的俱乐部ID不存在!";
			} else if (errorCode == MsgConstant.ERROR_club_hasUnCheck_member) {
				return "你已提交过申请了，不需要重复申请!";
			} else {
				return "申请失败!";
			}
		}

		public forceCancelRoom(roomNumber) {
			var element: any = { roomNumber: roomNumber };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_forceCancelRoom, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public checkMemberJoin(clubId, memberId, checkStatus) {
			var element: any = { clubId: clubId, memberId: memberId, checkStatus: checkStatus };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_MEMBER_CHECK, element);
			SocketManager.getInstance().send(requestDomain);
		}


		public autoCreateTableSwitch(clubId, hasAutoCreate) {
			var element: any = { clubId: clubId, hasAutoCreate: hasAutoCreate };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_ROOM_AUTOCREATE, element);
			SocketManager.getInstance().send(requestDomain);

		}

		public publishNotice(clubId, pubContent) {
			var element: any = { clubId: clubId, pubContent: pubContent };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_SENDNOTICE, element);
			SocketManager.getInstance().send(requestDomain);

		}

		public setMemberType(clubId, memberId, memberType) {
			var element: any = { clubId: clubId, memberId: memberId, memberType: memberType };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_SET_MEMBER, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public kickMember(clubId, memberId) {
			var element: any = { clubId: clubId, memberId: memberId };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_REMOVEMEMBER, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public createClub(gameId, name, monitorMobile, applyDesc) {
			var element: any = { gameId: gameId, name: name, monitorMobile: monitorMobile, applyDesc: applyDesc };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_CREATE, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public getClubSettingInfo(clubId) {
			var element: any = { clubId: clubId };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_getSettingInfo, element);
			SocketManager.getInstance().send(requestDomain);
		}
		public clubSetting(clubSettingInfo: ClubSettingInfo) {
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_setting, clubSettingInfo);
			SocketManager.getInstance().send(requestDomain);
		}

		public forbidGame(clubId, memberId) {
			var element: any = { clubId: clubId, memberId: memberId, forbidGame: true };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_forbid_game, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public allowGame(clubId, memberId) {
			var element: any = { clubId: clubId, memberId: memberId, forbidGame: false };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_forbid_game, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public getManagerList(clubId) {
			var element: any = { clubId: clubId };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_all_manager, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public setWatcher(clubId, memberId) {
			var element: any = { clubId: clubId, memberId: memberId, watcher: true };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_setWatcher, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public updateCustomInfo(sendData) {
			var element: any = sendData;
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_updateTemplate, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public getRoomProgressInfo(clubId, roomId) {
			var element: any = { clubId: clubId, roomId: roomId };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_roominfo_progress, element);
			SocketManager.getInstance().send(requestDomain);
		}


		public checkRight(permissions: any, permissionType): boolean {
			if (permissions == null || permissions == "undefine") {
				return false;
			}
			var permission = permissions[permissionType];
			if (permission == 1) {
				return true;
			} else {
				return false;
			}
		}

		public checkDefaultRight(permissions: any): boolean {
			var len = ClubConst.PermissionTypes.length;
			for (var i: number = 0; i < len; i++) {
				var b = this.checkRight(permissions, ClubConst.PermissionTypes[i]);
				if (b) {
					return b;
				}
			}
			return false;
		}

		public isMonitor(memberType) {
			if (memberType == ClubConst.MemberType.MONITOR) {
				return true;
			} else {
				return false;
			}
		}



	}
}