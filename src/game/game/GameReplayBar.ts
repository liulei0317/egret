module game {
    export class GameReplayBar extends game.EComponent {
        private Button_roomInfo: EButton
        private Button_back: EButton
        private Button_pause: EButton
        private Button_play: EButton
        private Button_speed: EButton
        private Button_quit: EButton

        private Text_speed: eui.Label

        private Group_rules: eui.Group
        private Text_roomRulesDesc: eui.Label


        private replayData = null
        private overData = null
        private curReplayIdx = 0
        private replaySchedulerId = null
        private curDuration = 0
        private speedDuration = 0
        private curDurationIndex = 0
        private uiActionFinished = true
        private _isPause = false
        private _isOver = false
        private _speed = 1

        private gs: GameScene
        private params:any
        private quitToSceneIndex: number = -1

        public constructor(gs, params: any) {
            super();
            this.gs = gs
            this.params = params
            if (params != null && params.curSceneIndex) {
                this.quitToSceneIndex = params.curSceneIndex
            } else {
                this.quitToSceneIndex = Constants.SCENE_INDEX.MAIN
            }
            this.skinName = "resource/skins/game/gameReplayerBarSkin.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.init();
            this.initData(this.params)
        }

        private init()
        {
            this.initUI()
            this.replayData = null
            this.curReplayIdx = 0
            this.replaySchedulerId = null
            this.curDuration = 0
            this.speedDuration = 0
            this.curDurationIndex = 0
            this.uiActionFinished = true
            this._isPause = false
            this._isOver = false
            this.hideRoomInfo()
            this.setSpeed(1)
        }

        public startReplayer() {
            if (this.replayData == null) {
                return
            }
            this.replaySchedulerId = setInterval((): void => {
                this.update()
            }, 100)
        }

        private update() {
            if (this.isPause() || this._isOver) {
                return
            }
            this.curDuration = this.curDuration + 100
            if (this.curDuration < this.speedDuration) {
                return
            }

            if (!this.uiActionFinished) {
                return
            }

            if (this.curReplayIdx >= this.replayData.length) {
                this._isOver = true
                CommonView.showToast(Strings.replayOver)
                LogUtils.info("回放结束")
                this.stopScheduler()
                this.playOver()
                return
            }

            var _replayData = this.replayData[this.curReplayIdx]
            this.uiActionFinished = false
            LogUtils.info("replayer running")
            this.sendReplayUnitData(_replayData, false)
            this.curReplayIdx = this.curReplayIdx + 1
            this.updateNextDuration(this.curReplayIdx)
            this.curDuration = 0
        }

        public initData(data) {
            var startGameData = data.startData
            this.overData = data.overData
            GameDataService.getInstance().realParseStartGame(startGameData)
            this.replayData = data.processData

            EAppFacade.getInstance().registerCommand(GameCmd.REPLAYER_ACTION_FINISH, this.oneStepFinishFinish, this)
            this.updateNextDuration(1)
            this.updateUI()
        }

        private oneStepFinishFinish() {
            this.setUIActionsFinished(true)
        }

        private setUIActionsFinished(value) {
            this.uiActionFinished = value
        }




        private initUI() {
            this.Button_roomInfo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showRoomInfo, this)
            this.Button_roomInfo.addEventListener(egret.TouchEvent.TOUCH_END, this.hideRoomInfo, this)
            this.Button_roomInfo.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.hideRoomInfo, this)
            this.Button_roomInfo.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.hideRoomInfo, this)

            this.addTapEvent(this.Button_back, this.backEvent.bind(this))
            this.addTapEvent(this.Button_play, this.play.bind(this))
            this.addTapEvent(this.Button_pause, this.pause.bind(this))
            this.addTapEvent(this.Button_speed, this.addSpeedEvent.bind(this))
            this.addTapEvent(this.Button_quit, this.quitEvent.bind(this))

            this.updatePlayBtn()
        }

        private quitEvent() {
            DialogManager.getInstance().popUp2(Strings.quitReplayerInfo, (): void => {
                // SceneSkip.skipToScene(this.quitToSceneIndex)
                SceneManager.getInstance().popScene()
            }, (): void => {
                this.setPause(true)
            })
        }

        private addSpeedEvent() {
            var speed = this._speed % 4 + 1
            this.setSpeed(speed)
        }

        private setSpeed(value) {
            this._speed = value
            this.updateSpeed()
            this.updateCurDuration()
        }

        private updateCurDuration() {
            this.updateNextDuration(this.curDurationIndex)
        }

        private updateSpeed() {
            this.Text_speed.text = "x" + this._speed
        }

        private play() {
            this.setPause(false)
        }

        private pause() {
            this.setPause(true)
        }

        private updatePlayBtn() {
            if (this.isPause()) {
                this.Button_pause.visible = false
                this.Button_play.visible = true
            }
            else {
                this.Button_pause.visible = true
                this.Button_play.visible = false
            }
        }

        private showRoomInfo() {
            this.Group_rules.visible = true
        }

        private hideRoomInfo() {
            this.Group_rules.visible = false
        }

        private backEvent() {
            if (this._isOver) {
                CommonView.showToast(Strings.replayOver)
            }

            if (this.curReplayIdx <= 0) {
                return
            }
            this.uiActionFinished = true
            this.setPause(true)
            this.curDuration = 0
            this.gs.getCardLayer().clearAllScheduler()
            this.curReplayIdx = this.curReplayIdx - 1
            var _replayData = this.replayData[this.curReplayIdx]
            this.updateNextDuration(this.curReplayIdx)
            this.sendReplayUnitData(_replayData, true)
        }

        private sendReplayUnitData(replayData, isBack) {
            var dataType = replayData.replayType
            var data = replayData.jsonData
            var curChairId = 0
            if (dataType == GameConst.REPLAY_TYPE.DISCARD) {
                var chairId = data.chairId
                curChairId = chairId
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var cardValue = data.tileId
                var cmd = GameCmd.DISCARD
                if (isBack) {
                    cmd = GameCmd.DISCARD_BACK
                    LogUtils.info("replayer 出牌回退")
                }
                else {
                    LogUtils.info("replayer 出牌")
                }
                Utils.sendGameEvent(cmd, { chairId: chairId, cardValue: cardValue })
            }
            else if (dataType == GameConst.REPLAY_TYPE.DRAW) {
                var chairId = data.chairId
                curChairId = chairId
                var cardValues = data.tileIds
                GlobalData.gameData.changeDirArrow(chairId)
                var cmd = GameCmd.DRAW_CARD
                if (isBack) {
                    LogUtils.info("replayer 抓牌回退")
                    cmd = GameCmd.DRAW_CARD_BACK
                }
                else {
                    LogUtils.info("replayer 抓牌")
                }
                Utils.sendGameEvent(cmd, { chairId: chairId, cardValues: cardValues })
                var leftCardNum = data.stackTileNum
                Utils.sendGameEvent(GameCmd.LEFT_CARD_NUM_CHANGED, { leftCardNum: leftCardNum })
            }
            else if (dataType == GameConst.REPLAY_TYPE.PONG) {
                var chairId = data.operationChairId
                curChairId = chairId
                var gainTileInfo = data.gainTileInfo
                var providerChairId = gainTileInfo.discardChairId
                var providerClientId = GlobalData.gameData.changeChairIdToClientId(providerChairId)
                var params = { type: gainTileInfo.gainType, provideClientId: providerClientId, value: gainTileInfo.tileIds[1] }
                var pongKongData = new game.PongKongData(params)
                GlobalData.gameData.changeDirArrow(chairId)
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var cmd = GameCmd.OPERATE_PONG
                if (isBack) {
                    cmd = GameCmd.OPERATE_PONG_BACK
                    LogUtils.info("replayer 碰牌回退")
                }
                else {
                    LogUtils.info("replayer 碰牌")
                }
                Utils.sendGameEvent(cmd, { clientId: clientId, pongData: pongKongData })
                if (clientId == GameConst.ME_DIR) {
                    Utils.sendGameEvent(GameCmd.OPERATE_BACK)
                }
            }
            else if (dataType == GameConst.REPLAY_TYPE.KONG) {
                var chairId = data.operationChairId
                curChairId = chairId
                var gainTileInfo = data.gainTileInfo
                var providerChairId = gainTileInfo.discardChairId
                var providerClientId = GlobalData.gameData.changeChairIdToClientId(providerChairId)

                var params = { type: gainTileInfo.gainType, provideClientId: providerClientId, value: gainTileInfo.tileIds[1] }
                var pongKongData = new game.PongKongData(params)
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var cmd = GameCmd.OPERATE_KONG
                if (isBack) {
                    cmd = GameCmd.OPERATE_KONG_BACK
                    LogUtils.info("replayer 杠牌回退")
                }
                else {
                    LogUtils.info("replayer 杠牌")
                }
                Utils.sendGameEvent(cmd, { clientId: clientId, kongData: pongKongData })
                if (clientId == GameConst.ME_DIR) {
                    Utils.sendGameEvent(GameCmd.OPERATE_BACK)
                }
            }
            else if (dataType == GameConst.REPLAY_TYPE.FAFEN) {
                var faFenUserInfos = data.faFenUserInfos
                for (var i = 0; i < faFenUserInfos.lenght; i++) {
                    var tempData = faFenUserInfos[i]
                    var chairId = tempData.chairId
                    var score = tempData.score
                    GlobalData.gameData.getPlayer(chairId).setScore(score)
                }
                var cmd = GameCmd.PLAYER_SCORE_FAFEN
                if (isBack) {
                    cmd = GameCmd.PLAYER_SCORE_FAFEN_BACK
                    LogUtils.info("replayer 罚分回退")
                }
                else {
                    LogUtils.info("replayer 罚分")
                }
                Utils.sendGameEvent(cmd, data)
            }
            else if (dataType == GameConst.REPLAY_TYPE.JIAPAI) {
                var chairId = data.chairId
                curChairId = chairId
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var cmd = GameCmd.PLAYER_BEGIN_JIA_PAI
                if (isBack) {
                    cmd = GameCmd.PLAYER_CANCEL_JIA_PAI
                    LogUtils.info("replayer 架牌回退")
                }
                else {
                    LogUtils.info("replayer 架牌")
                }
                Utils.sendGameEvent(cmd, { clientId: clientId, value: data.jiaTileId })
            }
            else if (dataType == GameConst.REPLAY_TYPE.CANCELJIPAI) {
                var chairId = data.chairId
                curChairId = chairId
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var cmd = GameCmd.PLAYER_CANCEL_JIA_PAI
                if (isBack) {
                    cmd = GameCmd.PLAYER_BEGIN_JIA_PAI
                    LogUtils.info("replayer 取消架牌回退")
                }
                else {
                    LogUtils.info("replayer 取消架牌")
                }
                Utils.sendGameEvent(cmd, { clientId: clientId, value: data.jiaTileId })
            }
            else if (dataType == GameConst.REPLAY_TYPE.TING) {
                var chairId = data.chairId
                var cmd = GameCmd.OPERATE_READY
                if (isBack) {
                    cmd = GameCmd.OPERATE_READY_BACK
                    LogUtils.info("replayer 听牌回退")
                }
                else {
                    LogUtils.info("replayer 听牌")
                }
                Utils.sendGameEvent(cmd, { chairId: chairId })
            }
            else if (dataType == GameConst.REPLAY_TYPE.OPERATE) {
                var cmd = GameCmd.OPERATE
                if (isBack) {
                    cmd = GameCmd.OPERATE_BACK
                    LogUtils.info("replayer 操作展示回退")
                }
                else {
                    LogUtils.info("replayer 操作展示")
                }
                Utils.sendGameEvent(cmd,data)
            }
            else if (dataType == GameConst.REPLAY_TYPE.PASS) {
                if (!isBack) {
                    LogUtils.info("replayer 过")
                    var chairId = data.chairId
                    Utils.sendGameEvent(GameCmd.OPERATE_PASS, { clientId: GlobalData.gameData.changeChairIdToClientId(chairId) })
                }
            }else if (dataType == GameConst.REPLAY_TYPE.PLAY_STATUS )
            {
                var chairId = data.chairId
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                var curOnline = data.curOnline
                var status = GameConst.PLAYER_STATUS.LEAVE
                if (!isBack)
                {
                    
                    if (curOnline)
                    {
                        LogUtils.info("replayer 玩家回来")
                        status = GameConst.PLAYER_STATUS.PLAYING
                    }
                    else
                    {
                        LogUtils.info("replayer 玩家离开")
                        status = GameConst.PLAYER_STATUS.LEAVE
                    }
                }
                else
                {
                    if (curOnline)
                    {
                        LogUtils.info("replayer 玩家离开")
                        status = GameConst.PLAYER_STATUS.LEAVE
                    }
                    else
                    {
                        LogUtils.info("replayer 玩家回来")
                        status = GameConst.PLAYER_STATUS.PLAYING
                    }
                }
                Utils.sendGameEvent(GameCmd.PLAYER_STATUS_CHANGED,{
                    clientId : clientId,
                    status : status
                })
            }
            else if (dataType == GameConst.REPLAY_TYPE.AUTO_HOST)
            {
                var hostStatus = data.hostStatus
                var sendData = null
                var sendCMD = null
                if (!isBack)
                {
                    if (hostStatus == 1) 
                    {
                        LogUtils.info("replayer 开始托管")
                        sendData = GameDataService.getInstance().parseStartAutoOfDelay(data)
                        sendCMD = GameCmd.START_AUTO_OF_DEALY
                    }
                    else
                    {
                        LogUtils.info("replayer 取消托管")
                        sendData = GameDataService.getInstance().parseCancelAutoOfDelay(data)
                        sendCMD = GameCmd.CANCEL_AUTO_OF_DEALY
                    }
                }
                else
                {
                    if (hostStatus == 1)
                    {
                        LogUtils.info("replayer 取消托管")
                        sendData = GameDataService.getInstance().parseCancelAutoOfDelay(data)
                        sendCMD = GameCmd.CANCEL_AUTO_OF_DEALY
                    }
                    else
                    {
                        LogUtils.info("replayer 开始托管")
                        sendData = GameDataService.getInstance().parseStartAutoOfDelay(data)
                        sendCMD = GameCmd.START_AUTO_OF_DEALY
                    }
                }
                Utils.sendGameEvent(sendCMD,sendData)
            }
            else if (dataType == GameConst.REPLAY_TYPE.OPERATE_CLICK) 
            {
                var sendCMD = null
                if(!isBack)
                {
                    LogUtils.info("replayer 回放点击操作")
                    sendCMD =GameCmd.REPLAY_OPERATE_CLICK
                }
                else
                {
                    LogUtils.info("replayer 回放点击操作回退")
                    sendCMD = GameCmd.REPLAY_OPERATE_CLICK_BACK
                }
                 Utils.sendGameEvent( sendCMD,data)
            }
            if (isBack) {
                if (curChairId != 0 && GlobalData.gameData.curDirArrow() != curChairId) {
                    GlobalData.gameData.changeDirArrow(curChairId)
                }
                //检查上一个数据是否为打牌

                var checkDiscardIndex = this.curReplayIdx - 1
                if (checkDiscardIndex > 0) {
                    var checkData = this.replayData[checkDiscardIndex]
                    var type = checkData.replayType
                    var checkUnitData = checkData.jsonData
                    if (type == GameConst.REPLAY_TYPE.DISCARD) {
                        var chairId = checkUnitData.chairId
                        var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                        var cardValue = checkUnitData.tileId
                        LogUtils.info("刷新打牌箭头 clientId " + clientId)
                        Utils.sendGameEvent(GameCmd.UPDATE_DISCARD_ARROW, { clientId: clientId, value: cardValue })
                    }
                }
            }
        }

        private updateNextDuration(index) {
            this.curDurationIndex = index
            var totalDuration = 0
            if (index == 0 || index >= this.replayData.length) {
                totalDuration = 1.5
            }
            else {
                var type = this.replayData[index].replayType
                if (type == GameConst.REPLAY_TYPE.DRAW)
                    totalDuration = 1
                else if (type == GameConst.REPLAY_TYPE.DISCARD) {
                    totalDuration = 2
                }
                else if (type == GameConst.REPLAY_TYPE.PONG) {
                    totalDuration = 1
                }
                else if (type == GameConst.REPLAY_TYPE.KONG) {
                    totalDuration = 1
                }
                else if (type == GameConst.REPLAY_TYPE.FAFEN) {
                    totalDuration = 0.5
                }
                else if (type == GameConst.REPLAY_TYPE.JIAPAI) {
                    totalDuration = 0.5
                }
                else if (type == GameConst.REPLAY_TYPE.CANCELJIPAI) {
                    totalDuration = 0.5
                }
                else if (type == GameConst.REPLAY_TYPE.TING) {
                    totalDuration = 0.5
                }
                else if (type == GameConst.REPLAY_TYPE.OPERATE) {
                    totalDuration = 1
                }
                else if (type == GameConst.REPLAY_TYPE.PASS) {
                    totalDuration = 1
                } 
                else if (type == GameConst.REPLAY_TYPE.PLAY_STATUS) {
                    totalDuration = 0.1
                }
                else if (type == GameConst.REPLAY_TYPE.AUTO_HOST){
                    totalDuration = 0.1
                }
                else if (type == GameConst.REPLAY_TYPE.OPERATE_CLICK){
                    totalDuration = 0.5
                }
                this.speedDuration = totalDuration*1000 / this._speed
            }
        }

        public isPause() {
            return this._isPause
        }

        private setPause(value) {
            this._isPause = value
            this.updatePlayBtn()
        }

        private stopScheduler() {
            if (this.replaySchedulerId != null) {
                clearInterval(this.replaySchedulerId)
                this.replaySchedulerId = null
            }
        }

        private playOver() {
            GameDataService.getInstance().realParseXjsData(this.overData)
            Utils.sendGameEvent(GameCmd.OPERATE_BACK)

        }

        public updateUI_() {
            this.Text_roomRulesDesc.text = GlobalData.gameData.getRoomInfo().getShareRoomInfo()
        }

        public release() {
            this.stopScheduler()
            EAppFacade.getInstance().removeCommand(GameCmd.REPLAYER_ACTION_FINISH, this.oneStepFinishFinish, this)
            this.parent.removeChild(this)
        }
    }
}