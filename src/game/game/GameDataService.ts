module game {
    export class GameDataService {

        private static instance: GameDataService;

        public isGameOverTimeOut: boolean = false
        private constructor() {

        }

        public static getInstance(): GameDataService {
            if (GameDataService.instance == null) {
                GameDataService.instance = new GameDataService();
            }
            return GameDataService.instance;
        }


        public gameReconect(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                GlobalData.gameData.parse(msgDomain.data)
                Utils.sendGameEvent(GameCmd.GAME_STATUS_CHANGED)
            }
        }

        public startGame(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                this.realParseStartGame(msgDomain.data)
            }

        }

        public realParseStartGame(data) {
            GlobalData.gameData.setNeedPlayStartStatus(true)
            GlobalData.gameData.parse(data)
            Utils.sendGameEvent(GameCmd.GAME_STATUS_CHANGED)
        }

        public drawCard(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var chairId = data.chairId
                LogUtils.info("parseDrawCard chairId " + chairId)
                GlobalData.gameData.changeDirArrow(chairId)
                GlobalData.gameData.setDiscardChairId(chairId)

                var huaNum = data.flowerNum
                LogUtils.info("HuaNum " + huaNum)
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var cardData = GlobalData.gameData.getCardData(clientId)
                if (huaNum != null && cardData != null) {
                    cardData.setHuaNum(huaNum)
                }
                var sendData = { chairId: chairId, cardValues: data.tileIds }
                if (GlobalData.gameData.isFirstDrawCard()) {
                    GlobalData.gameData.setFirstDrawCardData(sendData)
                }

                Utils.sendGameEvent(GameCmd.DRAW_CARD, sendData)
                var leftCardNum = data.stackTileNum
                GlobalData.gameData.setLeftCardNum(leftCardNum)
                var leftFlowerNum = data.stackFlowerNum
                GlobalData.gameData.setLeftFlowerNum(leftFlowerNum)
                Utils.sendGameEvent(GameCmd.LEFT_CARD_NUM_CHANGED, { leftCardNum: leftCardNum, leftFlowerNum: leftFlowerNum })
                var tingInfos = data.tingInfos
                GlobalData.gameData.setTingPaiInfo(tingInfos)
            }

        }

        public otherDiscard(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var sendData = { cardValue: data.tileId, chairId: data.chairId }
                Utils.sendGameEvent(GameCmd.DISCARD, sendData)
            }
        }

        public playerStatusChanged(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var userId = data.userId
                var chairId = data.chairId
                var status = data.userStatus
                var readyStatus = data.readyStatus
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var playerInfo = GlobalData.gameData.getPlayer(chairId)
                if (playerInfo == null) {
                    LogUtils.error("玩家状态改变出错，玩家信息为空")
                    return
                }
                else if (playerInfo.getUserId() != userId) {
                    LogUtils.error("移除玩家头像出错，头像id：" + playerInfo.getUserId() + "和用户id: " + userId + " 不匹配")
                }
                playerInfo.setStatus(status)
                playerInfo.setReadyStatus(readyStatus)
                var sendData = {
                    clientId: clientId,
                    status: status
                }
                Utils.sendGameEvent(GameCmd.PLAYER_STATUS_CHANGED, sendData)
            }
        }

        public faFenOperation(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var faFenUserInfos = data.faFenUserInfos
                for (var i = 0; i < faFenUserInfos.length; i++) {
                    var tempData = faFenUserInfos[i]
                    var chairId = tempData.chairId
                    var score = tempData.score
                    GlobalData.gameData.getPlayer(chairId).setScore(score)
                }
                Utils.sendGameEvent(GameCmd.PLAYER_SCORE_FAFEN, data)
            }
        }

        public operationCome(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                if (data.operateDatas != null) 
                {
                    GlobalData.gameData.setOperateData(data.operateDatas)
                }
                else
                {
                    GlobalData.gameData.setOperateTypes(data.operateTypes)
                }
                Utils.sendGameEvent(GameCmd.OPERATE)
            }
        }

        public pong(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var chairId = data.operationChairId
                var gainTileInfo = data.gainTileInfo
                var providerChairId = gainTileInfo.discardChairId
                var providerClientId = GlobalData.gameData.changeChairIdToClientId(providerChairId)
                var pongDataParams = { type: gainTileInfo.gainType, provideClientId: providerClientId, value: gainTileInfo.tileIds[1] }
                var pongData = new PongKongData(pongDataParams)
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                GlobalData.gameData.changeDirArrow(chairId)
                GlobalData.gameData.setDiscardChairId(chairId)

                var tingInfos = data.tingInfos
                GlobalData.gameData.setTingPaiInfo(tingInfos)

                var sendData = { clientId: clientId, pongData: pongData }
                Utils.sendGameEvent(GameCmd.OPERATE_PONG, sendData)
            }
        }

        public kong(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var chairId = data.operationChairId
                var gainTileInfo = data.gainTileInfo
                var providerChairId = gainTileInfo.discardChairId
                var providerClientId = GlobalData.gameData.changeChairIdToClientId(providerChairId)
                var kongDataParams = { type: gainTileInfo.gainType, provideClientId: providerClientId, value: gainTileInfo.tileIds[1] }
                var kongData = new PongKongData(kongDataParams)
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var sendData = { clientId: clientId, kongData: kongData }
                Utils.sendGameEvent(GameCmd.OPERATE_KONG, sendData)
            }
        }

        public ready(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var chairId = data.chairId
                GlobalData.gameData.getPlayer(chairId).getCardData().setTing(true)
                var sendData = { chairId: chairId }
                Utils.sendGameEvent(GameCmd.OPERATE_READY, sendData)
            }
        }

        public discard(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var tingInfos = data.tingInfos
                if (tingInfos != null && tingInfos.length > 0) {
                    GlobalData.gameData.setMyTingInfo(tingInfos)
                    Utils.sendGameEvent(GameCmd.GET_MY_TING_INFO, { tingValue: true })
                }
                else {
                    Utils.sendGameEvent(GameCmd.GET_MY_TING_INFO, { tingValue: false })
                }
            }
        }

        public pass(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                Utils.sendGameEvent(GameCmd.OPERATE_PASS, { clientId: GameConst.ME_DIR })
            }
        }

        public autoPass(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                Utils.sendGameEvent(GameCmd.OPERATE_PASS, { clientId: GameConst.ME_DIR })
            }
        }

        public xjsData(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                this.realParseXjsData(data)
            }
        }

        public realParseXjsData(data) {
            this.isGameOverTimeOut = false
            GlobalData.gameData.setAllOverData(null)
            GlobalData.gameData.setOverData(data)
            var status = data.roomStatus
            GlobalData.gameData.setGameStatus(status)
            Utils.sendGameEvent(GameCmd.GAME_STATUS_CHANGED)
            Utils.sendGameEvent(GameCmd.GameSettleInfo_1)
        }

        public djsData(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                GlobalData.gameData.setAllOverData(data)
                if (this.isGameOverTimeOut) {
                    Utils.sendGameEvent(GameCmd.GameSettleInfo_over)
                }
            }
        }

        public dissolveRoom(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                GlobalData.gameData.setApplyQuitInfo(data)
                Utils.sendGameEvent(GameCmd.APPLY_QUIT_INFO)
            }
        }

        public cancelRoom(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var diamond = data.diamond
                var cancelType = data.cancelType
                GlobalData.userData.setDiamondNum(diamond)
                Utils.sendGameEvent(GameCmd.DISSOLVE_ROOM, { dissolveType: cancelType })
            }
        }

        public playerLeaveRoom(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var diamond = data.diamond
                GlobalData.userData.setDiamondNum(diamond)
                Utils.sendGameEvent(GameCmd.PLAYER_LEAVE)
            }
        }

        public otherPlayerLeaveRoom(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var userId = data.userId
                var chairId = data.chairId
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var playerInfo = GlobalData.gameData.getPlayer(chairId)
                if (playerInfo == null) {
                    LogUtils.error("移除玩家头像出错，玩家信息为空")
                }

                else if (playerInfo.getUserId() != userId) {
                    LogUtils.error("移除玩家头像出错，头像id：" + playerInfo.getUserId() + " 和用户id: " + userId + " 不匹配")
                }
                GlobalData.gameData.removePlayer(chairId)
                var sendData = {
                    clientId: clientId
                }
                Utils.sendGameEvent(GameCmd.OTHER_PLAYER_LEAVE, sendData)
            }
        }

        public otherPlayerJoinRoom(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var playerData = new PlayerInfo()
                playerData.parse(data)
                var chairId = playerData.getChairId()
                GlobalData.gameData.addPlayer(chairId, playerData)
                Utils.sendGameEvent(GameCmd.OTHER_PLAYER_IN, playerData)
            }
        }

        public preventCheatInfo(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                GlobalData.gameData.setNeedCheckCheat(true)
                GlobalData.gameData.setPreventCheatInfo(data)
                Utils.sendGameEvent(GameCmd.PREVENT_CHEAT_INFO)
            }
        }

        public autoDiscard(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                GlobalData.gameData.setAutoDiscardInfo(data)
                Utils.sendGameEvent(GameCmd.AUTO_DISCARD_INFO, data)
            }
        }

        public startAutoOfDelay(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                this.parseStartAutoOfDelay(msgDomain.data)
                Utils.sendGameEvent(GameCmd.START_AUTO_OF_DEALY)
            }
        }

        public parseStartAutoOfDelay(data)
        {
            var chairId = data.chairId
            var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
            var playerInfo = GlobalData.gameData.getPlayer(chairId)
            if (playerInfo != null) {
                playerInfo.setAutoDiscardOfDelay(true)
            }
            var sendData = { clientId: clientId }
            return sendData
        }

        public cancelAutoOfDelay(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                this.parseCancelAutoOfDelay(msgDomain.data)
                Utils.sendGameEvent(GameCmd.CANCEL_AUTO_OF_DEALY)
            }
        }

        public parseCancelAutoOfDelay(data)
        {
            var chairId = data.chairId
            var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
            var playerInfo = GlobalData.gameData.getPlayer(chairId)
            if (playerInfo != null) {
                playerInfo.setAutoDiscardOfDelay(false)
            }
            var sendData = { clientId: clientId }
            return sendData
        }

        public noticeKickLeftTime(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var leftTime = data.kickLeftTime
                GlobalData.gameData.setKickOfflineTime(Math.floor(leftTime / 1000))
                Utils.sendGameEvent(GameCmd.NOTICE_KICK_LEFT_TIME)
            }
        }

        public cancelKickLeftTime(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                GlobalData.gameData.setKickOfflineTime(0)
                Utils.sendGameEvent(GameCmd.CANCEL_KICK_LEFT_TIME)
            }
        }

        public startAutoDiscardTimer(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                GlobalData.gameData.setAutoDelayTimeNum(Math.floor(data.leftTime / 1000))
                Utils.sendGameEvent(GameCmd.AUTO_DISCARD_TIME, data)
            }
        }

        public parseCanAutoHost(msgDomain: MsgDomain)
        {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                GlobalData.gameData.setCanAutoHost(data.canAutoHost)
                Utils.sendGameEvent(GameCmd.AUTO_DISCARD_TIME_STATUS_CHANGED)
            }
        }

        public myAgainstData(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                GlobalData.gameData.setAutoDelayTimeNum(Math.floor(data.leftTime / 1000))
                Utils.sendPanelEvent(GameCmd.PLAY_SINGLE_MESSAGE, data)
            }
        }

        public totalAgainstData(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                Utils.sendPanelEvent(GameCmd.PLAY_TOTAL_MESSAGE, data)
            }
        }

        public rejectChangePlayerNum(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                Utils.sendGameEvent(GameCmd.CHANGE_PLAYER_NUM_REJECT, data)
            }
        }

        public agreeChangePlayerNum(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                GlobalData.gameData.setChangePlayerNumInfo(data)
                Utils.sendGameEvent(GameCmd.CHANGE_PLAYER_NUM_INFO)
            }
        }

        public cancelChangePlayerNum(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                Utils.sendGameEvent(GameCmd.CHANGE_PLAYER_NUM_CANCEL)
            }
        }

        public parseScoreBoardData(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                Utils.sendPanelEvent(GameCmd.UPDATE_GAEMSCORE_BOARD, data)
            }
        }

        public parseChatData(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                if (data.type == GameConst.CHAT_MSG_TYPE.VOICE) {
                    // sendData = data
                    // sendErea = EVENT_LISTNENER_GVOICE
                    // sendCMD = EVENT_LISTNENER_INDEX.GAMESCENE.CHAT_MSG
                }
                else {
                    Utils.sendGameEvent(GameCmd.CHAT_MSG, data)
                }
            }
        }

        public parseReplayData(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                data.playBack = true
                data.curSceneIndex = SceneManager.getInstance().curScene.getIndex()
                SceneSkip.skipToGameScene(data,true)
            }

        }

        public parseDiamond(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var diamond = data.diamond
                GlobalData.userData.setDiamondNum(diamond)
            }
        }

        public parseGold(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var gold = data.gold
                GlobalData.userData.setGoldNum(gold)
            }
        }

        public parsePointEmotion(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {
                var data = msgDomain.data

                Utils.sendGameEvent(GameCmd.POINT_EMOTION, data)
            } else {
                var errorCode = msgDomain.errorCode
                if (errorCode == MsgConstant.ERROR_Gold_not_enough) {
                    CommonView.showToast(Strings.goldNotEnough)
                }
            }
        }

        public parseReconnect(msgDomain: MsgDomain) {
            if (msgDomain.code == MsgResultStatus.SUCCESS) {

            } else {
                var errorCode = msgDomain.errorCode
                if (errorCode == MsgConstant.ERROR_room_over) {
                    var data = msgDomain.data
                    if (data != null) {
                        var gameStatus = data.roomStatus
                        var toastInfo = ""
                        if (gameStatus == 4) {
                            toastInfo = Strings.dismissRoom_gameOver
                        }
                        else if (gameStatus == 5) {
                            toastInfo = Strings.dismissRoom_master
                        }
                        else if (gameStatus == 6) {
                            toastInfo = Strings.dismissRoom_xieshang
                        }
                        else if (gameStatus == 7) {
                            toastInfo = Strings.dismissRoom_timeOut
                        }

                        else if (gameStatus == 1) {
                            toastInfo = Strings.dismissRoom_leave
                        }
                        else {
                            toastInfo = Strings.dismissRoom_other
                        }
                    }
                    else {
                        toastInfo = Strings.dismissRoom_other
                    }

                    var confirmCallBack = function () {
                        if (SceneManager.getInstance().isInGame()) {
                            if (GlobalData.gameData.getRoomInfo().isClubRoom()) {
                                SceneSkip.skipToClubScene()
                            }
                            else {
                                SceneSkip.skipToHallScene()
                            }
                        }
                    }

                    DialogManager.getInstance().popUp1(toastInfo, confirmCallBack)
                }
            }
        }

        public beginJiapai(msgDomain: MsgDomain)
        {
            if (msgDomain.code = MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var chairId = data.chairId
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                Utils.sendGameEvent(GameCmd.PLAYER_BEGIN_JIA_PAI,{ clientId : clientId, value : data.jiaTileId })
            } 
        }

        public cancelJiapai(msgDomain: MsgDomain)
        {
            if (msgDomain.code = MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var chairId = data.chairId
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                Utils.sendGameEvent(GameCmd.PLAYER_CANCEL_JIA_PAI,{ clientId : clientId})
            } 
        }

        public parseAddress(msgDomain: MsgDomain)
        {
            if (msgDomain.code = MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                var chairId = data.chairId
                var address = data.detailAddress
                var playerInfo = GlobalData.gameData.getPlayer(chairId)
                if (playerInfo != null)
                {
                    playerInfo.setDetailAddress(address)
                }
                Utils.sendPanelEvent(GameCmd.UPDATE_PLAYER_POSITION)
            } 
        }

        public forceUpdateHuaCards(msgDomain: MsgDomain)
        {
            if (msgDomain.code = MsgResultStatus.SUCCESS) {
                var data = msgDomain.data
                Utils.sendGameEvent(GameCmd.UPDATE_HUA,data)
            }
        }
    }
}