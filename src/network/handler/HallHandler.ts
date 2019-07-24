module game {
	export class HallHandler extends BaseHandler {
		public constructor() {
			super();
		}

		public handle(msgDomain: MsgDomain) {
			super.handle(msgDomain);
			// var hasHandle = true;
			var cmd: number = msgDomain.cmd;
			switch (cmd) {
				case MsgConstant.CMD_USER_LOGIN:
					// UserInfoService.getInstance().loginCallBack(msgDomain);
					EAppFacade.getInstance().sendNotification(GameCmd.getCmdFromNet(cmd), msgDomain);
					break;
				// case MsgConstant.CMD_ZHANJI_LIST:
				//     ObserverService.getInstance().handleCmd(msgDomain);
				//     break;	
				case MsgConstant.CMD_CREATE_ROOM:
					RoomService.getInstance().createRoomCallBack(msgDomain);
					EAppFacade.getInstance().sendNotification(GameCmd.getCmdFromNet(cmd), msgDomain);
					break;
				case MsgConstant.CMD_JOIN_ROOM:
					RoomService.getInstance().joinRoomCallBack(msgDomain);
					break;
				case MsgConstant.CMD_SYSTEM_DISMISS_ROOM:
					Utils.sendPanelEvent(GameCmd.CLOSE_APPLY_QUIT_PANEL)
					break
				case MsgConstant.CMD_DISMISS_ROOM:
					GameDataService.getInstance().dissolveRoom(msgDomain)
					break
				case MsgConstant.CMD_REJECT_DISMISS_ROOM:
					Utils.sendGameEvent(GameCmd.APPLY_QUIT_REJECT, msgDomain.data)
					break
				case MsgConstant.CMD_CANCEL_ROOM:
				case MsgConstant.CMD_CANCEL_DAIKAI_ROOM:
				case MsgConstant.CMD_CANCEL_TIMEOUT_ROOM:
					GameDataService.getInstance().cancelRoom(msgDomain)
					break;
				case MsgConstant.CMD_LEAVE_ROOM:
					GameDataService.getInstance().playerLeaveRoom(msgDomain)
					break;
				case MsgConstant.CMD_OTHER_LEAVE_ROOM:
					GameDataService.getInstance().otherPlayerLeaveRoom(msgDomain)
					break;
				case MsgConstant.CMD_OTHER_JOIN_ROOM:
					GameDataService.getInstance().otherPlayerJoinRoom(msgDomain)
					break;
				case MsgConstant.CMD_PERSON_AGAINS:
					GameDataService.getInstance().myAgainstData(msgDomain)
					break;
				case MsgConstant.CMD_PERSON_TOTAL_AGAINS:
					GameDataService.getInstance().totalAgainstData(msgDomain)
					break;
				case MsgConstant.CMD_switch_reject:
					GameDataService.getInstance().rejectChangePlayerNum(msgDomain)
					break;
				case MsgConstant.CMD_switch_player_num:
					GameDataService.getInstance().agreeChangePlayerNum(msgDomain)
					break;
				case MsgConstant.CMD_switch_cancel:
					GameDataService.getInstance().cancelChangePlayerNum(msgDomain)
					break;
				case MsgConstant.CMD_REPLAY:
					GameDataService.getInstance().parseReplayData(msgDomain);
					EAppFacade.getInstance().sendNotification(GameCmd.getCmdFromNet(cmd), msgDomain);
					break;
				case MsgConstant.CMD_USER_DIAMOND_CHANGE:
					GameDataService.getInstance().parseDiamond(msgDomain)
					EAppFacade.getInstance().sendNotification(GameCmd.getCmdFromNet(cmd), msgDomain);
					break;
				case MsgConstant.CMD_USER_GOLD_CHANGE:
					GameDataService.getInstance().parseGold(msgDomain)
					EAppFacade.getInstance().sendNotification(GameCmd.getCmdFromNet(cmd), msgDomain);
					break;
				case MsgConstant.CMD_Notice_kick_lefttime:
					GameDataService.getInstance().noticeKickLeftTime(msgDomain)
					break;
				case MsgConstant.CMD_Notice_cancel_kick:
					GameDataService.getInstance().cancelKickLeftTime(msgDomain)
					break;
				case MsgConstant.CMD_USER_BINDIDENTITY:
					if (msgDomain.code == MsgResultStatus.SUCCESS) {
						var data = msgDomain.data
						Utils.sendPanelEvent(GameCmd.USER_BIND_ID, data)
					}
					else {
						if (msgDomain.errorCode == MsgConstant.ERROR_user_realUser_name_error) {
							CommonView.showToast("请填写真实的姓名")
						}
						else if (msgDomain.errorCode == MsgConstant.ERROR_user_realUser_idCardNo_error) {
							CommonView.showToast("请填写真实的身份证号码")
						}
					}
					break;
				case MsgConstant.CMD_USER_GETBINDSMSCODE:
					if (msgDomain.code == MsgResultStatus.SUCCESS) {
						var data = msgDomain.data
						Utils.sendPanelEvent(GameCmd.USER_GETBINDSMSCODE, data)
					}
					else if (msgDomain.code == MsgResultStatus.FAILED) {
						CommonView.showToast("获取验证码失败")
					}
					break;
				case MsgConstant.CMD_USER_BINDPHONENUMBER:
					if (msgDomain.code == MsgResultStatus.SUCCESS) {
						var data = msgDomain.data
						Utils.sendPanelEvent(GameCmd.USER_BINDPHONENUMBER, data)
					}
					else if (msgDomain.code == MsgResultStatus.FAILED) {
						CommonView.showToast("验证码错误")
					}
					break;
				case MsgConstant.CMD_USER_BINDIDENTITY:
					if (msgDomain.code == MsgResultStatus.SUCCESS) {
						var data = msgDomain.data
						Utils.sendPanelEvent(GameCmd.PLAY_TOTAL_MESSAGE, data)
					}
					break;
				case MsgConstant.CMD_getAllScrollMsg:
					if (msgDomain.code == MsgResultStatus.SUCCESS) {
						var data = msgDomain.data
						CommonView.showBroadcast(data)
					}
					break;
				default:
					EAppFacade.getInstance().sendNotification(GameCmd.getCmdFromNet(cmd), msgDomain);
					// hasHandle = false;
					break;
			}
			// return hasHandle;		
		}

	}
}