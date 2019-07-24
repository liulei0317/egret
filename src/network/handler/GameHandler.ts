module game {
	export class GameHandler extends BaseHandler{
		public constructor() {
			super();
		}

		public handle(msgDomain) {
			super.handle(msgDomain);
			var cmd: number = msgDomain.cmd;
			switch (cmd) {
				case MsgConstant.CMD_DEAL:
					GameDataService.getInstance().startGame(msgDomain);
					break;
				case MsgConstant.CMD_UPDATE_BOARD_INFO:
					if (GlobalData.isReconnecting) {
						GlobalData.setReconnecting(false)
					}
					GameDataService.getInstance().gameReconect(msgDomain);
					Utils.sendGameEvent(GameCmd.GAME_STATUS_CHANGED)
					break;
				case MsgConstant.CMD_USER_RECONNECTION:
					GlobalData.setReconnecting(false)
					GameDataService.getInstance().parseReconnect(msgDomain)
					break;
				case MsgConstant.CMD_DRAW:
					GameDataService.getInstance().drawCard(msgDomain)
					break;
				case MsgConstant.CMD_DISCARD_OTHER:
					GameDataService.getInstance().otherDiscard(msgDomain)
					break;
				case MsgConstant.CMD_USER_STATUS_CHANGE:
					GameDataService.getInstance().playerStatusChanged(msgDomain)
					break;
				case MsgConstant.CMD_FAFEN:
					GameDataService.getInstance().faFenOperation(msgDomain)
					break;
				case MsgConstant.CMD_OPERATE_TIP:
					GameDataService.getInstance().operationCome(msgDomain)
					break;
				case MsgConstant.CMD_PONG:
					GameDataService.getInstance().pong(msgDomain)
					break;
				case MsgConstant.CMD_KONG:
					GameDataService.getInstance().kong(msgDomain)
					break;
				case MsgConstant.CMD_READY:
					GameDataService.getInstance().ready(msgDomain)
					break;
				case MsgConstant.CMD_DISCARD:
					GameDataService.getInstance().discard(msgDomain)
					break;
				case MsgConstant.CMD_PASS:
					GameDataService.getInstance().pass(msgDomain)
					break;
				case MsgConstant.CMD_AUTO_PASS:
					GameDataService.getInstance().autoPass(msgDomain)
					break;
				case MsgConstant.CMD_READY_FOR_NEXT:
					Utils.sendPanelEvent(GameCmd.CLOSE_GAME_SETTLE_PANEL)
					break;
				case MsgConstant.CMD_XJS_DATA:
					GameDataService.getInstance().xjsData(msgDomain)
					break;
				case MsgConstant.CMD_CHEAT:
					GameDataService.getInstance().preventCheatInfo(msgDomain)
					break;
				case MsgConstant.CMD_IGNORE_CHEAT:
					Utils.sendPanelEvent(GameCmd.CLOSE_CHEAT_INFO_BOX)
					break;
				case MsgConstant.CMD_CHEAT_LEAVE:
					GlobalData.gameData.setCheatStatus(false)
					GlobalData.gameData.setNeedCheckCheat(false)
					GlobalData.gameData.setPreventCheatInfo(null)
					Utils.sendPanelEvent(GameCmd.CLOSE_CHEAT_INFO_BOX)
					break;
				case MsgConstant.CMD_AUTO_DISCARD:
					GameDataService.getInstance().autoDiscard(msgDomain)
					break;
				case MsgConstant.CMD_Notice_AutoHost_start:
					GameDataService.getInstance().startAutoOfDelay(msgDomain)
					break;
				case MsgConstant.CMD_Notice_AutoHost_cancel:
					GameDataService.getInstance().cancelAutoOfDelay(msgDomain)
					break;
				case MsgConstant.CMD_Notice_AutoHost_Timer_start:
					GameDataService.getInstance().startAutoDiscardTimer(msgDomain)
					break;
				case MsgConstant.cmd_notice_autohost_status:
					GameDataService.getInstance().parseCanAutoHost(msgDomain)
				case MsgConstant.CMD_GET_SCORECARD_INFOS:
					GameDataService.getInstance().parseScoreBoardData(msgDomain)
					break;
				case MsgConstant.CMD_DJS_DATA:
					GameDataService.getInstance().djsData(msgDomain)
					break;
				case MsgConstant.CMD_SEND_MSG:
					GameDataService.getInstance().parseChatData(msgDomain);
					break;
				case MsgConstant.CMD_SEND_MSG_ANI:
					GameDataService.getInstance().parsePointEmotion(msgDomain);
					break
				case MsgConstant.CMD_JIA:
					GameDataService.getInstance().beginJiapai(msgDomain);
					break;
				case MsgConstant.CMD_CANEL_JIA:
					GameDataService.getInstance().cancelJiapai(msgDomain);
					break;
				case MsgConstant.CMD_SYNC_POSITION:
					GameDataService.getInstance().parseAddress(msgDomain);
					break;
				case MsgConstant.CMD_getFlowerIds:
					GameDataService.getInstance().forceUpdateHuaCards(msgDomain);
					break;
				default:
					EAppFacade.getInstance().sendNotification(GameCmd.getCmdFromNet(cmd), msgDomain);
					break;					




			}

		}
	}
}