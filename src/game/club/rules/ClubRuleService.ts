module game {
	export class ClubRuleService {
		private static intstance: ClubRuleService = null;
		private constructor() {

		}

		public static getInstance() {
			if (ClubRuleService.intstance == null) {
				ClubRuleService.intstance = new ClubRuleService();
			}
			return ClubRuleService.intstance;
		}

		public deleteClubRule(clubId, templateId) {
			var obj: any = {};
			obj.clubId = clubId;
			obj.templateId = templateId;
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_deleteTemplate, obj);
			SocketManager.getInstance().send(requestDomain);
		}

		public getClubRuleList(clubId) {
			var element: any = { clubId: clubId };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_queryTemplates, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public addRule(clubId, roomJson) {
			var element: any = { msgRoom: roomJson };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_createTemplate, element);
			SocketManager.getInstance().send(requestDomain);
		}

		public createRoomCallBack(msgDomain: MsgDomain) {
			if (msgDomain.code == CmdResultType.SUCCESS) {

				var data = msgDomain.data

				var fromClub = data.fromClub
				if (fromClub == null || !fromClub) {
					if (data.diamond != null) {
						GlobalData.userData.setDiamondNum(data.diamond)
					}

					if (Constants.ROOM_PAY_MODE.other == data.msgRoom.payMode) //判断是否是代开房间
					{
						var _diamondNumber = data.useDiamond
						var _roomInfo = data.msgRoom
						// var data = {roomInfo = _roomInfo, costNum = _diamondNumber}
						// PopBoxManager.showPopBox(UI_PANEL_DATA_SET.daikaiMsgBox.index, data)
						// ProtocalSender:sendData(PROTOCOL_AREA.HALL,PROTOCOL_CMD.get_daikairecord_details)
						return
					}
					var sendData = { roomNumber: data.msgRoom.roomNumber }
					SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_JOIN_ROOM, sendData);
				}
				else {
					// var view:EDialog = DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.create_room.index)
					// if (view != null) {
					// 	view.close();
					// }
				}

			} else {
				var errorCode = msgDomain.errorCode
				if (errorCode == MsgConstant.ERROR_diamondNoEnough) {
					DialogManager.getInstance().popUp2(Strings.noRoomCard, function () {
						let dialog = new ShopScene(1)
						DialogManager.getInstance().show(dialog)
					})
				} else if (errorCode == MsgConstant.ERROR_creamRoom_paramError) {
					DialogManager.getInstance().popUp1(Strings.createRoomParamsError)
				} else if (errorCode == MsgConstant.ERROR_creamRoom_inRoom) {
					var data = msgDomain.data
					var gameId = data.gameId
					var toastInfo = Utils.format(Strings.hasInRoomWhenCreateRoom, "麻将")
					DialogManager.getInstance().popUp1(toastInfo)
				}
			}
		}

		public joinRoomCallBack(msgDomain: MsgDomain) {
			if (msgDomain.code == CmdResultType.SUCCESS) {
				var data = msgDomain.data
				if (data.diamond != null) {
					GlobalData.userData.setDiamondNum(data.diamond)
				}
				var roomStatus = data.roomStatus
				GlobalData.gameData.setGameStatus(roomStatus)
				GlobalData.gameData.getRoomInfo().parse(data.msgRoom)

				var doCheat = false
				if (data.doCheat != null) {
					doCheat = data.doCheat
				}
				if (doCheat) {
					GlobalData.gameData.setCheatStatus(doCheat)
				}

				var kickOfflineTime = data.kickLeftTime
				if (kickOfflineTime != null) {
					GlobalData.gameData.setKickOfflineTime(Math.floor(kickOfflineTime / 1000))
				}
				var userInfos = data.userInfos
				GlobalData.gameData.clearPlayerData()
				for (var i = 0; i < userInfos.length; i++) {
					var chairId = userInfos[i].chairId
					var playerData = GlobalData.gameData.getPlayer(chairId)
					if (playerData == null) {
						playerData = new PlayerInfo()
						GlobalData.gameData.addPlayer(chairId, playerData)
					}
					playerData.parse(userInfos[i])
					if (playerData.getUserId() == GlobalData.userData.getUserId()) {
						GlobalData.gameData.setMyChairId(chairId)
						LogUtils.info("我的椅子id " + chairId)
					}
				}

				if (GlobalData.gameData.getGameStatus() == GameConst.GAME_STATUS_TYPE.ready && GlobalData.isReconnecting) {
					GlobalData.setReconnecting(false)
				}
				Utils.sendGameEvent(GameCmd.GAME_STATUS_CHANGED)
				if (SceneManager.getInstance().curScene.getIndex() != Constants.SCENE_INDEX.GAME) {
					SceneSkip.skipToGameScene()
				}
			} else {
				var errorCode = msgDomain.errorCode
				if (errorCode == MsgConstant.ERROR_join_ROOM_USERMAX) {
					DialogManager.getInstance().popUp1(Strings.roomPlayerFull)
				} else if (errorCode == MsgConstant.ERROR_join_inOtherRoom) {
					DialogManager.getInstance().popUp1(Strings.hasInRoomWhenJoinRoom)
				} else if (errorCode == MsgConstant.ERROR_joinRoom_roomId_error) {
					DialogManager.getInstance().popUp1(Strings.roomNumberNotExist)
				} else if (errorCode == MsgConstant.ERROR_diamondNoEnough) {
					DialogManager.getInstance().popUp2(Strings.noRoomCard, function () {
						let dialog = new ShopScene(1)
						DialogManager.getInstance().show(dialog)
					})
				}
			}

		}


		public cancelRoom() {
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CANCEL_ROOM, null);
			SocketManager.getInstance().send(requestDomain);
		}

		public cancelDaiKaiRoom(roomId) {
			var obj: any = { roomId: roomId };
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CANCEL_DAIKAI_ROOM, obj);
			SocketManager.getInstance().send(requestDomain);
		}

		public joinRoom(roomNumber) {
			var obj: any = { roomNumber: roomNumber };
			var location = GlobalData.userData.getLocation();
			if (location.longitude != 0 || location.latitude != 0) {
				obj.gpsLocation = location
			}
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_JOIN_ROOM, obj);
			SocketManager.getInstance().send(requestDomain);
		}
	}
}