class GameUILayer extends game.EComponent {
    private Btn_Ready: EButton;
    private Btn_Kong: EButton;
    private Btn_Pong: EButton;
    private Btn_Pass: EButton;
    private Btn_Win: EButton;
    private operateBtns: EButton[]
    private OperateGroup: eui.Group;
    private tingPosX: number

    private headLeft: GamePlayerHead;
    private headRight: GamePlayerHead;
    private headDown: GamePlayerHead;
    private headTop: GamePlayerHead;

    private headGroup: GamePlayerHead[]

    private RoomNumberNode: eui.Group


    private Button_chat: EButton;
    private Button_voice: EButton;
    private Button_tint: EButton;

    private tingTint: game.TingTint;
    private tinyMask: eui.Rect

    private autoDelayNode: eui.Group;
    private cancelAutoBtn: EButton;



    private ChangePlayerNumGroup: eui.Group;
    private ChangePlayerNumBtn: EButton;
    private needCheckPlayerNum: boolean = false
    private systemTimeSchedulerId: number = null
    private otherSystemInfoSchedulerId: number = null

    private Node_auto_host: eui.Group;

    private inviteNode: eui.Group
    private Button_dismissRoom: EButton
    private Button_weChat: EButton
    private Text_RoomNumber: eui.Label;
    private Text_rules: eui.Label
    private Text_roomType: eui.Label

    private isMoreInfoOpen = false
    private moreInfoNode: eui.Group
    private Image_moreInfo_bg: eui.Image
    private Button_more: EButton
    private Button_setting: EButton
    private Button_help: EButton
    private Button_applyQuit: EButton

    private Button_quit: EButton
    private Button_refresh: EButton

    private Button_bxh: EButton
    private Text_autoDiscard: eui.Image;
    private roomNumberLabel: eui.Label;

    private Button_scoreBoard: EButton;
    private systemInfoNode: eui.Group
    private Text_time: eui.Label
    private Image_singnal: eui.Image
    private batteryProgressBar: eui.ProgressBar

    private otherTimeGroup: eui.Group
    private Text_otherTime: eui.Label

    private status: number;
    private gs: game.GameScene;

    private allScheduler: any[]

    private tempDataBeforeGameStart: any[]

    private kickOfflineTime: number = 0
    private schedulerKickOfflineId: number = 0
    private tempDataType =
    {
        FAFEN: 1
    }

    private timer: egret.Timer

    private replayerOperateNodes: GameReplayOperateTint[];

    public constructor() {
        super();
        this.skinName = "resource/skins/game/gameUISkin.exml"
    }

    public onCreateViewComplete() {
        super.onCreateViewComplete();
        this.init()
    }

    public onSizeChanged() {
        game.FixUIManager.getInstance().setBoarderNode(this.systemInfoNode)
        game.FixUIManager.getInstance().setBoarderNode(this.Button_quit)
        game.FixUIManager.getInstance().setBoarderNode(this.Button_bxh)
        game.FixUIManager.getInstance().setBoarderNode(this.Text_autoDiscard)
        game.FixUIManager.getInstance().setBoarderNode(this.Button_scoreBoard)
        game.FixUIManager.getInstance().setBoarderNode(this.roomNumberLabel)
        game.FixUIManager.getInstance().setBoarderNode(this.moreInfoNode)
        game.FixUIManager.getInstance().setBoarderNode(this.Button_refresh)
        if (GameUtils.is3dMode()) {
            game.FixUIManager.getInstance().setBoarderNode(this.Button_chat)
            game.FixUIManager.getInstance().setBoarderNode(this.Button_voice)
            game.FixUIManager.getInstance().setBoarderNode(this.Button_tint)
        }
        this.resetPlayerHeadPosition()
        this.checkPlayerNum()
    }

    private init() {
        this.initData()
        this.Text_RoomNumber.text = "" + GlobalData.gameData.getRoomInfo().getRoomNum()
        this.initHeadNode()
        this.initOperateNode()
        this.initInviteNode()
        this.initTingTint()
        this.initDelayAuto()
        this.initMoreInfo()
        this.initBackBtn()
        this.initOtherUI()
        this.initSystemInfo()
        this.initOtherTime()
        this.changeCardBack()
        this.resetUIPosition()
        this.onSizeChanged()
    }

    private initOtherTime() {
        this.Node_auto_host.visible = false
    }

    private initSystemInfo() {
        if (GlobalData.gameData.isPlayBack()) {
            this.systemInfoNode.visible = false
        }
        this.systemInfoNode.visible = false
        // this.batteryProgressBar.labelDisplay.visible = false
        this.systemTimeSchedulerId = setInterval((): void => {
            this.updateSystemTime()
        }, 30000
        )

        this.otherSystemInfoSchedulerId = setInterval((): void => {
            this.updateOtherSystemInfo()
        }, 15000
        )

    }

    private updateSystemTime() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var minStr = "" + min
        if (min < 10) {
            minStr = "0" + min
        }
        this.Text_time.text = Utils.format("{0}:{1}", hour, minStr)
    }

    private async updateOtherSystemInfo() {
        if (GameConfig.platform != GameConfig.PLATFORM_SET.weChat) {
            return
        }
        var systemInfo = await platform.getSystemInfo()

        var battery = systemInfo.batteryLevel //电量，范围 1 - 100
        if (battery != undefined) {
            this.updateBattery(battery)
        }

        var wifiSignal = systemInfo.wifiSignal //wifi 信号强度，范围 0 - 4
        if (wifiSignal != undefined) {
            this.updateSingalLevel(wifiSignal)
        }
    }
    private initOtherUI() {
        this.Button_bxh.visible = false
        this.Text_autoDiscard.visible = false
        this.addTapEvent(this.ChangePlayerNumBtn, this.changePlayerNumEvent)
        this.checkPlayerNum()
        this.Button_voice.visible = false

        this.addTapEvent(this.Button_chat, this.showChatBox)
        this.addTapEvent(this.Button_bxh, this.showBxhDes)
        if (GlobalData.gameData.isPlayBack()) {
            this.Button_chat.visible = false
        }

        this.addTapEvent(this.Button_scoreBoard, this.showScoreBoardBox)

        this.addTapEvent(this.Button_tint, this.showMyTingInfoView)

        this.addTapEvent(this.Button_refresh, (): void => {
            game.CommonView.showWaiting()
            game.ConnectService.getInstance().connect(true);
        })

        if (GlobalData.gameData.isPlayBack()) {
            this.Button_refresh.visible = false
        }
    }

    private showScoreBoardBox() {
        game.DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.GameScoreBoard.index);
    }

    private showBxhDes() {
        game.DialogManager.getInstance().popUp1(GlobalData.gameData.getBiXiaHuDesc())
    }

    private showChatBox() {
        game.DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.chatBox.index)
    }

    private changePlayerNumEvent() {
        game.DialogManager.getInstance().popUp2(Strings.applyThreePlayer, function () {
            game.SocketManager.getInstance().sendMsg(game.MsgConstant.HALL, game.MsgConstant.CMD_switch_player_num)
        })
    }

    private initBackBtn() {
        this.addTapEvent(this.Button_quit, this.backEvent)
    }

    private initMoreInfo() {
        this.setPopBtnStatus(1)
        if (GlobalData.gameData.isPlayBack()) {
            this.moreInfoNode.visible = false
            this.Button_more.visible = false
        }
        this.setMoreInfo(false)
        this.addTapEvent(this.Button_setting, this.showSetting)
        this.addTapEvent(this.Button_more, (): void => {
            // Utils.fullScreen();
            this.setMoreInfo(!this.isMoreInfoOpen)
        })

        this.addTapEvent(this.Button_applyQuit, this.applyQuitEvent)
        this.addTapEvent(this.Button_help, this.showHelp)
    }

    private showHelp() {
        this.setMoreInfo(false)
        game.DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.roomInfoBox.index)
    }

    private backEvent() {
        var isDaikaiRoom = (GlobalData.gameData.getRoomInfo().getPayMode() == Constants.ROOM_PAY_MODE.other)
        if (GlobalData.gameData.getGameStatus() == GameConst.GAME_STATUS_TYPE.ready) {
            var funcRealBack = function () {
                if (GlobalData.gameData.getGameStatus() != GameConst.GAME_STATUS_TYPE.ready) {
                    return
                }

                if (GlobalData.gameData.isMeCreator() && !isDaikaiRoom && !GlobalData.gameData.getRoomInfo().isClubRoom())    //房主
                {
                    game.SocketManager.getInstance().sendMsg(game.MsgConstant.HALL, game.MsgConstant.CMD_CANCEL_ROOM)
                }
                else //非房主
                {
                    game.SocketManager.getInstance().sendMsg(game.MsgConstant.HALL, game.MsgConstant.CMD_LEAVE_ROOM)
                }
            }

            var info = null
            if (GlobalData.gameData.isMeCreator() && !isDaikaiRoom && !GlobalData.gameData.getRoomInfo().isClubRoom())  //房主
            {
                info = Strings.dismissRoom
                if (GlobalData.clientConfigs.showCreateRoom == "0" && GameConfig.platform == GameConfig.PLATFORM_SET.weChat) {
                    info = "是否确认解散房间?";
                }
            }
            else {
                info = Strings.exitRoom
            }
            game.DialogManager.getInstance().popUp2(info, funcRealBack)
        }
        else {
            game.SocketManager.getInstance().sendMsg(game.MsgConstant.HALL, game.MsgConstant.CMD_DISMISS_ROOM)
        }
    }

    private applyQuitEvent() {
        this.setMoreInfo(false)
        this.backEvent()
    }

    private showSetting() {
        game.LogUtils.info("设置框")
        game.DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.gameSetting.index)
    }

    private initInviteNode() {
        this.addTapEvent(this.Button_weChat, this.share)
        this.addTapEvent(this.Button_dismissRoom, this.dissolveRoom)
    }

    private setPopBtnStatus(status) {
        var open = status == 2
        // this.Image_moreInfo_bg.visible = open
        this.Button_setting.visible = open
        this.Button_help.visible = open
    }

    private dissolveRoom() {
        game.LogUtils.info("解散房间")
        var confirmCallBack = function () {
            game.SocketManager.getInstance().sendMsg(game.MsgConstant.HALL, game.MsgConstant.CMD_CANCEL_ROOM)
        }
        var popStr = Strings.dismissRoom
        if (GlobalData.clientConfigs.showCreateRoom == "0" && GameConfig.platform == GameConfig.PLATFORM_SET.weChat) {
            popStr = "是否确认解散房间?";
        }
        game.DialogManager.getInstance().popUp2(popStr, confirmCallBack)
    }

    private share() {
        if (GlobalData.gameData.getRoomInfo().isClubRoom()) {
            let roomNumber = GlobalData.gameData.getRoomInfo().getRoomNum()
            Utils.copyToClipboard(GlobalData.getShareJoinRoomUrlWithShareCode(roomNumber))
            game.DialogManager.getInstance().popUp2("复制成功，是否打开微信粘贴？", () => {
                Utils.callWxApp()
            })
        }
        else {
            let roomNumber = GlobalData.gameData.getRoomInfo().getRoomNum()
            Utils.copyToClipboard(GlobalData.getShareJoinRoomUrlWithShareCode(roomNumber))
            game.DialogManager.getInstance().popUp2("复制成功，是否打开微信粘贴？", () => {
                Utils.callWxApp()
            })
        }
    }
    private initDelayAuto() {
        this.autoDelayNode.visible = false
        this.addTapEvent(this.cancelAutoBtn, function () {
            game.SocketManager.getInstance().sendMsg(game.MsgConstant.GAME, game.MsgConstant.CMD_Notice_AutoHost_cancel)
        })
    }
    private initTingTint() {
        if (this.tingTint == null && (!GlobalData.gameData.isPlayBack())) {
            this.tinyMask = new eui.Rect();
            this.tinyMask.alpha = 0
            this.tinyMask.width = 1280;
            this.tinyMask.height = 720
            this.addChild(this.tinyMask)
            this.addTapEvent(this.tinyMask, (): void => {
                this.hideMyTingInfoView()
            })
            this.tingTint = new game.TingTint()
            this.addChild(this.tingTint)
            this.hideMyTingInfoView()
        }
    }

    private initHeadNode() {
        this.headGroup = [this.headDown, this.headRight, this.headTop, this.headLeft]
        for (var i = 0; i < this.headGroup.length; i++) {
            // var point = this.headGroup[i].localToGlobal(this.headGroup[i].width / 2, this.headGroup[i].height / 2, )
            // GameConst.PLAYER_HEAD_POSITION[i].x = point.x
            // GameConst.PLAYER_HEAD_POSITION[i].y = point.y
            // this.headGroup[i].init()
            this.headGroup[i].setDir(i)
        }
        this.resetPlayerHeadPosition()
    }


    private resetPlayerHeadPosition() {
        GameConst.PLAYER_HEAD_POSITION = []
        if (GameUtils.is3dMode()) {
            for (var i = 0; i < GameConst.PLAYER_HEAD_POSITION_DATA[GameConst.CARD_MODE.mode_3d].length; i++) {
                if (i != GameConst.PLAY_DIR.up) {
                    var x = GameConst.PLAYER_HEAD_POSITION_DATA[GameConst.CARD_MODE.mode_3d][i].x
                    var y = GameConst.PLAYER_HEAD_POSITION_DATA[GameConst.CARD_MODE.mode_3d][i].y
                    GameConst.PLAYER_HEAD_POSITION[i] = game.FixUIManager.getInstance().convertBoarderPos(x, y)
                }
                else {
                    GameConst.PLAYER_HEAD_POSITION[i] = GameConst.PLAYER_HEAD_POSITION_DATA[GameConst.CARD_MODE.mode_3d][i]
                }
            }
        }
        else {
            for (var i = 0; i < GameConst.PLAYER_HEAD_POSITION_DATA[GameConst.CARD_MODE.mode_2d].length; i++) {
                if (i != GameConst.PLAY_DIR.up) {
                    var x = GameConst.PLAYER_HEAD_POSITION_DATA[GameConst.CARD_MODE.mode_2d][i].x
                    var y = GameConst.PLAYER_HEAD_POSITION_DATA[GameConst.CARD_MODE.mode_2d][i].y
                    GameConst.PLAYER_HEAD_POSITION[i] = game.FixUIManager.getInstance().convertBoarderPos(x, y)
                }
                else {
                    GameConst.PLAYER_HEAD_POSITION[i] = GameConst.PLAYER_HEAD_POSITION_DATA[GameConst.CARD_MODE.mode_2d][i]
                }
            }
        }

        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            var tempHead = this.headGroup[i]
            var p = GameConst.PLAYER_HEAD_POSITION[i]
            tempHead.resetPosition(p.x, p.y)
        }
    }

    private updatePlayerHead() {
        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            this.headGroup[i].visible = false
        }

        game.LogUtils.info("initPlayerHead")
        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            var clientId = GlobalData.gameData.changeIndexToClientId(i)
            if (clientId != -1) {
                game.LogUtils.info("getPlayerInfo clientId " + clientId)
                var playerInfo = GlobalData.gameData.getPlayerByClientId(clientId)
                if (playerInfo == null) {
                    this.headGroup[clientId].visible = false
                }
                else {
                    this.headGroup[clientId].visible = true
                    this.headGroup[clientId].setData(playerInfo)
                    this.headGroup[clientId].updateGameStatus(this.status)
                    if (playerInfo.getCardData() != null) {
                        var jiapaiValue = playerInfo.getCardData().getJiaPaiValue()
                        if (jiapaiValue != 0) {
                            this.headGroup[i].setJiapaiData(jiapaiValue)
                        } else {
                            this.headGroup[i].cancelJiapaiData()
                        }
                    }

                }
            }

        }

        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            var clientId = GlobalData.gameData.changeIndexToClientId(i)
            if (clientId != -1) {
                this.headGroup[clientId].updateGameStatus(this.status)
            }

        }

        if (this.status == GameConst.GAME_STATUS_TYPE.playing) {
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                var clientId = GlobalData.gameData.changeIndexToClientId(i)
                if (clientId != -1) {
                    this.headGroup[clientId].updateHuaNum(this.gs.getCardLayer().getHuaNum(clientId))
                }
            }
        }
        else if (this.status == GameConst.GAME_STATUS_TYPE.over || this.status == GameConst.GAME_STATUS_TYPE.allOver) {
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                this.headGroup[i].updateTingStatus(false)
                this.headGroup[i].cancelJiapaiData()
            }
        }
    }


    private initData() {
        this.status = GameConst.GAME_STATUS_TYPE.ready
        this.needCheckPlayerNum = true
        this.systemTimeSchedulerId = null
        this.allScheduler = []
        this.tempDataBeforeGameStart = []
        this.replayerOperateNodes = []
    }

    public onEventHandler(evt: egret.Event) {
        var rsvMsg = evt.data
        var eventId = rsvMsg.cmd
        var data = rsvMsg.data
        if (eventId == game.GameCmd.OPERATE || eventId == game.GameCmd.OPERATE_BACK) {
            if (eventId == game.GameCmd.OPERATE) {
                var canShowOperate = true
                if (this.status == GameConst.GAME_STATUS_TYPE.playing && this.gs.getCardLayer().isBuhuaing()) {
                    canShowOperate = false
                }
                if (canShowOperate) {
                    if (GlobalData.gameData.isPlayBack()) {
                        for (var i = 0; i < data.length; i++) {
                            var temp = data[i]
                            var chairId = temp.chairId
                            var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                            this.replayerOperateNodes[clientId].setData(temp.operateTypes)
                            this.replayerOperateNodes[clientId].visible = true
                        }
                    }
                    else {
                        this.operateCome()
                    }
                }
                // Utils.sendGameEvent(game.GameCmd.REPLAYER_ACTION_FINISH, 1)
                game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
            }
            else if (eventId == game.GameCmd.OPERATE_BACK) {
                if (GlobalData.gameData.isPlayBack()) {
                    for (var i = 0; i < this.replayerOperateNodes.length; i++) {
                        this.replayerOperateNodes[i].visible = false
                    }
                }
                else {
                    this.OperateGroup.visible = false
                }
            }
        }
        else if (eventId == game.GameCmd.OTHER_PLAYER_IN) {
            var playerInfo = data
            var chairID = playerInfo.getChairId()
            var clientId = GlobalData.gameData.changeChairIdToClientId(chairID)
            game.LogUtils.info("加入玩家的clientId " + clientId)
            this.headGroup[clientId].visible = true
            this.headGroup[clientId].setData(playerInfo)
            this.checkPlayerNum()
        }
        else if (eventId == game.GameCmd.PLAYER_LEAVE) {
            if (GlobalData.gameData.getRoomInfo().isClubRoom()) {
                game.SceneSkip.skipToClubScene()
            }
            else {
                game.SceneSkip.skipToHallScene()
            }
        }
        else if (eventId == game.GameCmd.OTHER_PLAYER_LEAVE) {
            var clientId = data.clientId
            this.headGroup[clientId].updateStatus(GameConst.PLAYER_STATUS.NULL)
            this.checkPlayerNum()
        }
        else if (eventId == game.GameCmd.PLAYER_STATUS_CHANGED) {
            var clientId = data.clientId
            var status = data.status
            this.headGroup[clientId].updateStatus(status)
            game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
        }
        else if (eventId == game.GameCmd.PLAYER_HUA_NUM_CHANGED) {
            var clientId = data.clientId
            var num = data.huaNum
            this.headGroup[clientId].updateHuaNum(num)
        }
        else if (eventId == game.GameCmd.PLAYER_SCORE_FAFEN || eventId == game.GameCmd.PLAYER_SCORE_FAFEN_BACK) {
            if (eventId == game.GameCmd.PLAYER_SCORE_FAFEN) {
                if (this.status == GameConst.GAME_STATUS_TYPE.before_playing) {
                    this.tempDataBeforeGameStart.push({ type: this.tempDataType.FAFEN, data: data })
                }
                else {
                    this.playFaFenEffect(data)
                }
            }
            else if (eventId == game.GameCmd.PLAYER_SCORE_FAFEN_BACK) {
                this.playFaFenEffectBack(data)
            }
        }

        else if (eventId == game.GameCmd.PLAYER_SCORE_NUM_CHANGED) {
            game.LogUtils.info("玩家分数改变")
            var clientId = data.clientId
            var num = data.score
            this.headGroup[clientId].updateScore(num)
        }

        else if (eventId == game.GameCmd.OPERATE_PONG) {
            var clientId = data.clientId
            this.gs.getEffectLayer().playPong(clientId)
            if (clientId == GameConst.ME_DIR) {
                this.Button_tint.visible = false
                this.hideMyTingInfoView()
            }
        }
        else if (eventId == game.GameCmd.OPERATE_KONG) {
            var clientId = data.clientId
            this.gs.getEffectLayer().playKong(clientId)
            if (clientId == GameConst.ME_DIR) {
                this.Button_tint.visible = false
                this.hideMyTingInfoView()
            }
        }
        else if (eventId == game.GameCmd.OPERATE_READY || eventId == game.GameCmd.OPERATE_READY_BACK) {
            var chairId = data.chairId
            var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
            if (eventId == game.GameCmd.OPERATE_READY) {
                this.headGroup[clientId].updateTingStatus(true)
                game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
            }
            else if (eventId == game.GameCmd.OPERATE_READY_BACK) {
                this.headGroup[clientId].updateTingStatus(false)
            }
        }
        else if (eventId == game.GameCmd.OPERATE_PASS) {
            var clientId = data.clientId
            if (GlobalData.gameData.isPlayBack()) {
                this.gs.getEffectLayer().playPass(clientId)
                game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
            } else if (clientId == GameConst.ME_DIR) {
                this.OperateGroup.visible = false
                GlobalData.gameData.resetOperateTypes()
            }
        }
        else if (eventId == game.GameCmd.BATTERY_CHANGED) {
            var batteryPercent = data.battery
            this.updateBattery(batteryPercent)
        }
        else if (eventId == game.GameCmd.APP_NET_SINGAL_CHANGED) {
            var sinalLevel = data.singalLevel
            this.updateSingalLevel(sinalLevel)
        }
        else if (eventId == game.GameCmd.WIN_OVER) {
            var clientId = data.clientId
            var actionIndex = data.actionIndex
            for (var i = 0; i < clientId.length; i++) {
                this.gs.getEffectLayer().playWin(clientId[i], actionIndex[i])
            }

            var chuchongIndex = data.chuchongIndex
            if (chuchongIndex != null && chuchongIndex > 0) {
                this.gs.getEffectLayer().playChuchongEffect(chuchongIndex)
            }
        }
        else if (eventId == game.GameCmd.PLAYER_BEGIN_JIA_PAI) {
            var clientId = data.clientId
            var cardValue = data.value
            this.startJiaPai(clientId, cardValue)
        }
        else if (eventId == game.GameCmd.PLAYER_CANCEL_JIA_PAI) {
            var clientId = data.clientId
            this.cancelJiapai(clientId)
        }
        else if (eventId == game.GameCmd.CHAT_MSG) {
            var chairId = data.chairId
            var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
            var type = data.type
            var msgId = parseInt(data.msgId) - 1
            this.gs.getEffectLayer().playChatMsg(clientId, type, msgId)
        }
        else if (eventId == game.GameCmd.START_PLAY_VOICE) {
            var clientId = data.clientId
            this.gs.getEffectLayer().playVoiceEffect(clientId)
        }
        else if (eventId == game.GameCmd.VOICE_OVER) {
            this.gs.getEffectLayer().stopVoiceEffect()
        }
        else if (eventId == game.GameCmd.POINT_EMOTION) {
            if (GameConst.forbid_emotion) {
                return
            }
            var chairId = data.chairId
            var toChairId = data.toChairId
            var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
            var toClientId = GlobalData.gameData.changeChairIdToClientId(toChairId)
            var msgId = parseInt(data.msgId)
            this.gs.getEffectLayer().playPointEmotion(clientId, toClientId, msgId)
        }
        else if (eventId == game.GameCmd.GET_MY_TING_INFO) {
            var tingValue = data.tingValue
            this.Button_tint.visible = tingValue
        }
        else if (eventId == game.GameCmd.DRAW_CARD) {
            var chairId = data.chairId
            if (chairId == GlobalData.gameData.getMyChairId()) {
                this.Button_tint.visible = false
                this.hideMyTingInfoView()
            }
        }
        else if (eventId == game.GameCmd.START_AUTO_OF_DEALY || eventId == game.GameCmd.CANCEL_AUTO_OF_DEALY) {
            this.updateAutoDelay()
            game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
        }
        else if (eventId == game.GameCmd.AUTO_DISCARD_TIME_STATUS_CHANGED) {
            this.changeAutoHostStatus()
        }
        else if (eventId == game.GameCmd.NOTICE_KICK_LEFT_TIME) {
            this.updateOtherTime()
        }
        else if (eventId == game.GameCmd.CANCEL_KICK_LEFT_TIME) {
            this.updateOtherTime()
        }
        else if (eventId == game.GameCmd.CHANGE_CARD_BACK) {
            this.changeCardBack()
        } else if (eventId == game.GameCmd.UPDATE_AUTODISCARD_Text_Visible) {
            var visible = data.visible
            this.Text_autoDiscard.visible = visible
        }
        else if (eventId == game.GameCmd.REPLAY_OPERATE_CLICK || eventId == game.GameCmd.REPLAY_OPERATE_CLICK_BACK) {
            if (eventId == game.GameCmd.REPLAY_OPERATE_CLICK) {
                var chairId = data.chairId
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                this.replayerOperateNodes[clientId].runClickFunc(data.operateType)
            }
            else {
                game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
            }
        } else if (eventId == game.GameCmd.CHANGE_CARD_FACE) {
            this.changeCardFace()
        }
    }

    private resetClock(leftTime: number = -1, autoDiscard: boolean = false) {

    }

    private changeAutoHostStatus() {
        this.updateOtherTime()
    }

    public resetUIPosition() {
        if (GameUtils.is3dMode()) {
            this.Button_chat.x = 1019
            this.Button_chat.y = 498
            this.Button_voice.x = 1107
            this.Button_voice.y = 498
            this.Button_tint.x = 1198
            this.Button_tint.y = 498
        }
        else {
            this.Button_chat.x = 1199
            this.Button_chat.y = 392
            this.Button_voice.x = 1199
            this.Button_voice.y = 474
            this.Button_tint.x = 1199
            this.Button_tint.y = 554
            game.FixUIManager.getInstance().addPosData(this.Button_chat.hashCode, { x: this.Button_chat.x, y: this.Button_chat.y })
            game.FixUIManager.getInstance().addPosData(this.Button_voice.hashCode, { x: this.Button_voice.x, y: this.Button_voice.y })
            game.FixUIManager.getInstance().addPosData(this.Button_tint.hashCode, { x: this.Button_tint.x, y: this.Button_tint.y })
        }
    }

    public changeViewMode() {
        this.resetUIPosition()
        this.resetPlayerHeadPosition()
    }

    private changeCardFace() {
        for (let i = 0; i < this.headGroup.length; i++) {
            let playerHead = this.headGroup[i]
            playerHead.changeCardFace()
        }
    }

    private changeCardBack() {
        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            this.headGroup[i].changeCardBack()
        }
    }

    private updateOtherTime() {
        this.stopOtherTimer()
        this.otherTimeGroup.visible = false
        this.Node_auto_host.visible = false
        if (this.status == GameConst.GAME_STATUS_TYPE.ready || this.status == GameConst.GAME_STATUS_TYPE.waiting) {
            this.startKickOfflineTimer()
        } else if (this.status == GameConst.GAME_STATUS_TYPE.playing) {
            this.showAutoHost()
        }
    }

    private showAutoHost() {
        let canAutoHost = GlobalData.gameData.getCanAutoHost()
        if (!canAutoHost && !GlobalData.gameData.isPlayBack()) {
            this.Node_auto_host.visible = true
        } else {
            this.Node_auto_host.visible = false
        }
    }

    private stopOtherTimer() {
        if (this.schedulerKickOfflineId != 0) {
            clearInterval(this.schedulerKickOfflineId)
            this.schedulerKickOfflineId = 0
        }
    }

    private startKickOfflineTimer() {
        this.kickOfflineTime = GlobalData.gameData.getKickOfflineTime()
        if (this.kickOfflineTime > 0) {
            this.otherTimeGroup.visible = true
            this.Text_otherTime.textFlow = this.getKickOfflineTimeInfo(this.kickOfflineTime)
            this.schedulerKickOfflineId = setInterval((): void => {
                this.kickOfflineTime = Math.max(this.kickOfflineTime - 1, 0)
                this.Text_otherTime.textFlow = this.getKickOfflineTimeInfo(this.kickOfflineTime)
                if (this.kickOfflineTime <= 0) {
                    this.stopOtherTimer()
                }
            }, 1000)
        }
    }

    private getKickOfflineTimeInfo(leftTime): Array<egret.ITextElement> {
        return <Array<egret.ITextElement>>[
            { text: "系统将在", style: { "textColor": 0xededed } },
            { text: "" + leftTime, style: { "textColor": 0xff0000 } },
            { text: "秒后踢出离线玩家", style: { "textColor": 0xededed } },
        ];
    }




    private updateInviteNode() {
        if (this.status != GameConst.GAME_STATUS_TYPE.ready) {
            this.inviteNode.visible = false
        }

        else {
            this.inviteNode.visible = true
            this.Text_roomType.text = GlobalData.gameData.getRoomInfo().getRoomTypeDesc()
            this.Text_RoomNumber.text = "" + GlobalData.gameData.getRoomInfo().getRoomNum()
            var isDaikaiRoom = (GlobalData.gameData.getRoomInfo().getPayMode() == Constants.ROOM_PAY_MODE.other)
            this.Button_dismissRoom.visible = GlobalData.gameData.isMeCreator() && !isDaikaiRoom
            if (GlobalData.gameData.getRoomInfo().isClubRoom()) {
                this.Button_dismissRoom.visible = false
            }
            if (this.Button_dismissRoom.visible) {
                this.Button_dismissRoom.x = 0
                this.Button_weChat.x = 352
            }
            else {
                this.Button_weChat.x = 176
            }
            var rules = GlobalData.gameData.getRoomInfo().getGameUIRulesDesc()
            this.Text_rules.text = rules
        }
    }





    private updateAutoDelay() {
        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            if (this.status == GameConst.GAME_STATUS_TYPE.playing) {
                var isAutoDelay = GlobalData.gameData.isAutoDelay(i)
                this.headGroup[i].updateAutoStatus()
                if (i == GameConst.ME_DIR) {
                    this.autoDelayNode.visible = isAutoDelay
                }
            }
            else {
                this.autoDelayNode.visible = false
            }
        }
    }

    private cancelJiapai(dir) {
        this.headGroup[dir].cancelJiapaiData()
        game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
    }

    private startJiaPai(dir, cardValue) {
        this.headGroup[dir].setJiapaiData(cardValue)
        game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
    }


    private showMyTingInfoView() {
        var tingInfos = GlobalData.gameData.getMyTingInfo()
        if (this.tingTint != null) {
            this.tingTint.initData(tingInfos, 1280)
            this.tingTint.visible = true
        }

        if (this.tinyMask) {
            this.tinyMask.visible = true
            this.tinyMask.touchEnabled = true
        }
    }
    private hideMyTingInfoView() {
        if (this.tingTint != null) {
            this.tingTint.visible = false
        }
        if (this.tinyMask != null) {
            this.tinyMask.visible = false
            this.tinyMask.touchEnabled = false
        }

    }

    private updateSingalLevel(level) {
        if (level < 1) {
            level = 1
        }
        if (level > 4) {
            level = 4
        }
        this.Image_singnal.source = "system_wifi_" + level + "_png"
    }

    private updateBattery(percent) {
        // var batteryImgName = "system_power_4_png"
        // if (percent < 90 && percent >= 60 )
        // {
        //     batteryImgName = "system_power_3_png"
        // }else if (percent < 60 && percent >= 15 )
        // {
        //     batteryImgName = "system_power_2_png"
        // }
        // else if (percent < 15 )
        // {
        //     batteryImgName = "system_power_1_png"
        // }
        this.batteryProgressBar.value = percent
    }



    private playFaFenEffectBack(data) {
        var faFenType = data.faFenType
        var faFenUserInfos = data.faFenUserInfos
        if (faFenType == null || faFenUserInfos == null) {
            return
        }

        for (var i = 0; i < faFenUserInfos.length; i++) {
            var __data = faFenUserInfos[i]
            var chairId = __data.chairId
            var faFenScore = parseInt(__data.faScore)
            var score = parseInt(__data.score)
            var showScore = __data.score - faFenScore
            var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
            this.headGroup[clientId].updateScore(showScore)
        }
    }

    private playFaFenEffect(data) {
        var faFenType = data.faFenType
        var faFenUserInfos = data.faFenUserInfos

        if (faFenType == null || faFenUserInfos == null) {
            return
        }
        for (var i = 0; i < faFenUserInfos.length; i++) {
            var __data = faFenUserInfos[i]
            var chairId = __data.chairId
            var faFenScore = __data.faScore
            var score = __data.score
            var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
            this.gs.getEffectLayer().showScoreEffect(clientId, faFenScore)
            this.headGroup[clientId].updateScore(score)

            if (faFenType == GameConst.FaFenType.FLOWER_KONG && faFenScore > 0) {
                this.gs.getEffectLayer().playHuaKong(clientId)
            }

            if (faFenType == GameConst.FaFenType.DNXB && faFenScore > 0) {
                this.gs.getEffectLayer().playSiFeng(clientId)
            }

            if (GlobalData.gameData.isPlayBack()) {
                if (i == 0) {
                    this.addSchedulerFunc(function () {
                        game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
                    }, 0.5)
                }
            }
            else if (faFenScore > 0) {
                this.addSchedulerFunc(function () {
                    game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
                }, 0.5)
            }
        }
    }


    private checkPlayerNum() {
        var playerNum = GlobalData.gameData.getCurPlayerNum()
        var width = this.ChangePlayerNumGroup.width
        egret.Tween.removeTweens(this.ChangePlayerNumGroup)
        if (playerNum == 3 && GlobalData.gameData.getGameStatus() == GameConst.GAME_STATUS_TYPE.ready && this.needCheckPlayerNum) {
            var tw = egret.Tween.get(this.ChangePlayerNumGroup)
            tw.to({ x: game.FixUIManager.getInstance().convertX(0) }, 200)
        }
        else {
            this.ChangePlayerNumGroup.x = game.FixUIManager.getInstance().convertX(-width)
        }

        if (GlobalData.gameData.getGameStatus() == GameConst.GAME_STATUS_TYPE.playing) {
            this.needCheckPlayerNum = false
        }
    }

    public setGameScene(gs: game.GameScene) {
        this.gs = gs;
    }

    public setStatus(status) {
        this.status = status
        this.updatePlayerHead()
        this.updateInviteNode()
        this.updateOtherUI()
        this.updateOperateNode()
        this.updateBackBtn()
        this.updateMoreInfo()
        this.updateSystemInfo()
        this.excuteTempDataWhenGameBegin()
        this.checkPlayerNum()
        this.updateAutoDelay()
        this.updateOtherTime()
        if (this.status == GameConst.GAME_STATUS_TYPE.before_playing) {
            if (GlobalData.gameData.isBiXiaHu()) {
                this.gs.getEffectLayer().playBixihuaEffect()
            }
        }
    }

    private updateSystemInfo() {
        if (this.status == GameConst.GAME_STATUS_TYPE.ready) {
            this.systemInfoNode.x = 67
        }
        else {
            this.systemInfoNode.x = 5
        }
        this.updateSystemTime()
        this.updateOtherSystemInfo()
    }

    private excuteTempDataWhenGameBegin() {
        if (this.status != GameConst.GAME_STATUS_TYPE.playing) {
            return
        }
        for (var i = 0; i < this.tempDataBeforeGameStart.length; i++) {
            var tempData = this.tempDataBeforeGameStart[i]
            var type = tempData.type
            if (type == this.tempDataType.FAFEN) {
                this.playFaFenEffect(tempData.data)
            }
        }
        this.tempDataBeforeGameStart = []
    }

    private updateOperateNode() {
        if (this.status == GameConst.GAME_STATUS_TYPE.playing) {
            this.operateCome()
        }
        else {
            this.OperateGroup.visible = false
        }
    }



    private showJiaPai() {
        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            var clientId = GlobalData.gameData.changeIndexToClientId(i)
            if (clientId != -1) {
                var cardData = GlobalData.gameData.getCardData(clientId)
                if (cardData == null) {
                    game.LogUtils.error("initJiaPai cardData is null dir " + clientId)
                    return
                }
                else {
                    var jiaPaiValue = cardData.getJiaPaiValue()
                    game.LogUtils.info("jiaPaiValue " + jiaPaiValue)
                    if (jiaPaiValue != null && jiaPaiValue > 0) {
                        this.startJiaPai(clientId, jiaPaiValue)
                    }
                }
            }

        }
    }

    private checkTingStatus() {
        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            var cardData = GlobalData.gameData.getCardData(i)
            if (cardData == null) {
                game.LogUtils.error("initJiaPai cardData is null dir " + i)
                return
            }
            var isTing = cardData.isTing()
            game.LogUtils.info("isTing " + isTing)
            this.headGroup[i].updateTingStatus(isTing)
        }
    }


    public checkMyTingInfoBtn() {
        if (GlobalData.gameData.getMyTingInfo() != null) {
            var myHandCardNum = this.gs.getCardLayer().getHandCardsNum(GameConst.ME_DIR)
            var maxCardNum = this.gs.getCardLayer().getDrawCardIndex(GameConst.ME_DIR) + 1
            if (myHandCardNum != maxCardNum) {
                this.Button_tint.visible = true
            }
            else {
                this.Button_tint.visible = false
                this.hideMyTingInfoView()
            }
        }
    }

    private updateOtherUI() {
        //if GlobalData.gameData.isPlayBack() 
        this.roomNumberLabel.text = "房间号:" + GlobalData.gameData.getRoomInfo().getRoomNum()
        //end
        this.Button_tint.visible = false
        this.hideMyTingInfoView()

        if (this.status == GameConst.GAME_STATUS_TYPE.ready) {
            this.Button_bxh.visible = false
            this.Button_scoreBoard.visible = false
        }
        else if (this.status == GameConst.GAME_STATUS_TYPE.before_playing) {

        }

        else if (this.status == GameConst.GAME_STATUS_TYPE.playing) {
            if (!GlobalData.gameData.isPlayBack()) {
                this.Button_scoreBoard.visible = true
            }
            else {
                this.Button_scoreBoard.visible = false
            }
            this.Button_bxh.visible = GlobalData.gameData.isBiXiaHu()

            this.showJiaPai()
            this.checkTingStatus()

            this.checkMyTingInfoBtn()
        }
        else if (this.status == GameConst.GAME_STATUS_TYPE.waiting) {
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                this.headGroup[i].cancelJiapaiData()
            }
        }

    }

    private updateBackBtn() {
        if (this.status == GameConst.GAME_STATUS_TYPE.ready) {
            var meIsCreator = GlobalData.gameData.isMeCreator()
            var isDaikaiRoom = (GlobalData.gameData.getRoomInfo().getPayMode() == Constants.ROOM_PAY_MODE.other)
            game.LogUtils.info("是否俱乐部房间:" + GlobalData.gameData.getRoomInfo().isClubRoom())
            this.Button_quit.visible = true
        }
        else {
            this.Button_quit.visible = false
        }
    }


    private updateMoreInfo() {
        if (this.status != GameConst.GAME_STATUS_TYPE.ready) {
            this.Image_moreInfo_bg.height = 260
            this.Button_applyQuit.visible = this.isMoreInfoOpen
        }
        else {
            this.Image_moreInfo_bg.height = 200
            this.Button_applyQuit.visible = false
        }

        if (!this.isMoreInfoOpen) {
            this.Image_moreInfo_bg.height = 75
        }
    }

    private initOperateNode() {

        if (GlobalData.gameData.isPlayBack()) {
            for (var i = 0; i < 4; i++) {
                var p = GameConst.PLAYER_HEAD_POSITION[i]
                var data =
                    {
                        dir: i,
                        position: new egret.Point(p.x, p.y)
                    }
                var replayerOperateNode = new GameReplayOperateTint(data);
                replayerOperateNode.visible = false
                this.replayerOperateNodes[i] = replayerOperateNode
                this.addChild(replayerOperateNode)
            }
        }

        this.operateBtns = []
        this.operateBtns[GameConst.OPERATE_TYPE.pass - 1] = this.Btn_Pass
        this.operateBtns[GameConst.OPERATE_TYPE.ready - 1] = this.Btn_Ready
        this.operateBtns[GameConst.OPERATE_TYPE.win - 1] = this.Btn_Win
        this.operateBtns[GameConst.OPERATE_TYPE.kong - 1] = this.Btn_Kong
        this.operateBtns[GameConst.OPERATE_TYPE.pong - 1] = this.Btn_Pong

        this.tingPosX = this.Btn_Pass.x
        if (!GlobalData.gameData.isPlayBack()) {
            this.addTapEvent(this.Btn_Pong, this.sendPong);
            this.addTapEvent(this.Btn_Kong, this.sendKong);
            this.addTapEvent(this.Btn_Pass, this.clickPass);
            this.addTapEvent(this.Btn_Win, this.sendWin);
            this.addTapEvent(this.Btn_Ready, this.sendReady);
        }
        else {
            this.OperateGroup.touchChildren = false
        }
        this.OperateGroup.visible = false
    }


    public operateCome() {
        if (this.status != GameConst.GAME_STATUS_TYPE.playing) {
            return
        }
        game.LogUtils.info("operateCome")
        var operateTypes = GlobalData.gameData.getOperateTypes()
        var len = operateTypes.length
        var hasWinBtn = false
        for (var i = 0; i < 5; i++) {
            this.operateBtns[i].visible = false
        }
        if (len > 0) {
            this.gs.getGameCenter().updateDirArrow(GameConst.ME_DIR)
            game.LogUtils.info("玩家有操作")
            for (var i = 0; i < len; i++) {
                this.operateBtns[operateTypes[i] - 1].visible = true
                if (operateTypes[i] == GameConst.OPERATE_TYPE.win) {
                    hasWinBtn = true
                }
            }
            this.Btn_Pass.visible = true
            if (hasWinBtn) {
                this.Btn_Pass.x = this.tingPosX - 667
            }
            else {
                this.Btn_Pass.x = this.tingPosX
            }
            this.OperateGroup.visible = true
        }
    }


    private sendOperateType(cmd, operateType) {
        if (GlobalData.gameData.isAutoDelay(GameConst.ME_DIR)) {
            return
        }
        this.gs.getCardLayer().clearSelectCard()
        this.OperateGroup.visible = false
        game.LogUtils.info("operate type " + operateType)
        GlobalData.gameData.resetOperateTypes()
        game.SocketManager.getInstance().sendMsg(game.MsgConstant.GAME, cmd, { operateType: operateType })
    }

    private sendPong() {
        var cmd = game.MsgConstant.CMD_PONG
        var operateType = GameConst.OPERATE_TYPE.pong
        this.sendOperateType(cmd, operateType)
    }

    private sendKong() {
        var cmd = game.MsgConstant.CMD_KONG
        var operateType = GameConst.OPERATE_TYPE.kong
        this.sendOperateType(cmd, operateType)
    }

    private sendPass() {
        var cmd = game.MsgConstant.CMD_PASS
        var operateType = GameConst.OPERATE_TYPE.pass
        this.sendOperateType(cmd, operateType)
    }

    private sendWin() {
        var cmd = game.MsgConstant.CMD_WIN
        var operateType = GameConst.OPERATE_TYPE.win
        this.sendOperateType(cmd, operateType)
    }

    private clickPass() {
        if (this.isZiMo()) {
            var params =
                {
                    confirmFunc: this.sendWin.bind(this),
                    cancelFun: this.sendPass.bind(this)
                }
            game.DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.discardWinConfirmBox.index, params)
            return
        }
        this.sendPass()
    }

    private sendReady() {
        var cmd = game.MsgConstant.CMD_READY
        var operateType = GameConst.OPERATE_TYPE.win
        this.sendOperateType(cmd, operateType)
    }

    private isZiMo(): boolean {
        var operateTypes = GlobalData.gameData.getOperateTypes()
        var len = operateTypes.length
        var hasWinBtn = false
        for (var i = 0; i < len; i++) {
            if (operateTypes[i] == GameConst.OPERATE_TYPE.win) {
                hasWinBtn = true
                break;
            }
        }

        if (!hasWinBtn) {
            return false
        }

        var isMaxHandCardNumber = this.gs.getCardLayer().cardNumberIsMax(GameConst.ME_DIR)
        return isMaxHandCardNumber
    }


    public setMoreInfo(isOpen) {
        this.isMoreInfoOpen = isOpen
        if (isOpen) //展开
        {
            this.Button_setting.visible = true
            this.Button_help.visible = true
            // this.Image_moreInfo_bg.visible = true
            this.Button_applyQuit.visible = this.status != GameConst.GAME_STATUS_TYPE.ready
            this.Button_refresh.visible = false
        }
        else {
            this.Button_setting.visible = false
            this.Button_help.visible = false
            this.Button_applyQuit.visible = false
            if (!GlobalData.gameData.isPlayBack()) {
                this.Button_refresh.visible = true
            }
        }
        this.updateMoreInfo();
    }

    private addSchedulerFunc(callBack, duration) {
        // var schedulerId
        // schedulerId = scheduler.performWithDelayGlobal(function()
        //     this.allScheduler[tostring(schedulerId)] = nil
        //     callBack()
        // end,duration)
        // this.allScheduler[tostring(schedulerId)] = callBack
        // var schedulerId = TimerItemManager.getInstance().startTimer(TimerItem.TimerType.once,duration,():void=>
        // {
        //     this.allScheduler.remove(schedulerId)
        //     callBack()
        // });
        // this.allScheduler.put(schedulerId,callBack)
        var tw = egret.Tween.get(this);
        tw.wait(duration)
        tw.call(() => {
            this.allScheduler.splice(this.allScheduler.indexOf(callBack), 1)
            callBack()
        })
        this.allScheduler.push(callBack)
    }

    private clearAllScheduler() {
        egret.Tween.removeTweens(this)
        while (this.allScheduler.length > 0) {
            var func = this.allScheduler.pop();
            func.call(this)
        }
        this.allScheduler = []
        // for k,v in pairs(this.allScheduler)  do
        //     var func = v
        //     func()
        //     scheduler.unscheduleGlobal(tonumber(k))
        // end
        // this.allScheduler = {}
    }

    public release() {
        if (this.systemTimeSchedulerId != null) {
            clearInterval(this.systemTimeSchedulerId)
        }

        if (this.otherSystemInfoSchedulerId != null) {
            clearInterval(this.otherSystemInfoSchedulerId)
        }

        this.clearAllScheduler()
    }
}
window["GameUILayer"] = GameUILayer