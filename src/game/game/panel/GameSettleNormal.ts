module game {
    export class GameSettleNormal extends game.EDialog {

        private Image_title: eui.Image
        private Image_huType: eui.Image
        private Text_date: eui.Label
        private Text_score: eui.Label
        private Text_replayId: eui.Label


        private Button_copyReplayId: EButton
        private Button_continue: EButton
        private Group_quick: eui.Group
        private Group_continue: eui.Group
        private Text_continue_countdown: eui.Label
        private Button_share: EButton
        private Button_quicklook: EButton
        private Text_quicklook_countdown: eui.Label

        private winnerInfo: GameSettleWinerInfo
        private UserInfo1: GameSettleUserInfo
        private UserInfo2: GameSettleUserInfo
        private UserInfo3: GameSettleUserInfo
        private UserInfo4: GameSettleUserInfo

        private Text_winner_score: eui.Label
        private Group_winner_score: eui.Group
        private Text_winner_fafen: eui.Label
        private Group_winner_fafen: eui.Group
        private Text_winner_wb: eui.Label
        private Group_winner_wb: eui.Group
        private Group_winner_card: eui.Group

        private UserInfoSet: GameSettleUserInfo[]

        private totalCountdownTimeNumber = 10;
        private curCountdownTime = 10;
        private tickScheduler: string
        private overData: any
        private Image_qrcode: eui.Rect
        private Text_clubName: eui.Label
        /**
         * -1 普通自摸 点胡
         * -2 流局
         * 0+ 大牌结算
         */
        private overType = -1

        private isWin: boolean = false;
        public constructor(data: any) {
            super(Constants.UI_PANEL_DATA_SET.GameSettle_auto1.index, false)
            this.overData = data
            this.overType = -1//--普通自摸 点胡
            this.isWin = false
            if (parseInt(data.winPlayerNum) == 0) {
                this.overType = -2 //流局
            } else {
                for (var i = 0; i < data.xJSUserInfos.length; i++) {
                    if (data.xJSUserInfos[i].msgUser.userId == GlobalData.userData.getUserId()) {
                        this.isWin = data.xJSUserInfos[i].win
                        if (data.xJSUserInfos[i].superPointType > 0 && data.xJSUserInfos[i].superPointType <= 15) {
                            this.overType = i // 1～4 大牌结算
                            break
                        }
                    }
                }
            }
            if (this.overType == -1) {
                this.skinName = "resource/skins/game/panel/GameSettle_auto1.exml"
            } else if (this.overType == -2) {
                this.skinName = "resource/skins/game/panel/GameSettle_auto2.exml"
            } else if (this.overType >= 0) {
                this.skinName = "resource/skins/game/panel/GameSettle_auto3.exml"
            }
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.init()
            this.updateUI();
        }

        private init() {
            this.UserInfoSet = [this.UserInfo1, this.UserInfo2, this.UserInfo3, this.UserInfo4]
            this.addTapEvent(this.Button_continue, this.continueEvent)
            this.addTapEvent(this.Button_quicklook, this.quickLookEvent)
            this.addTapEvent(this.Button_share, this.shareEvent)
            this.addTapEvent(this.Button_copyReplayId, this.copyReplayIdEvent.bind(this))
            this.curCountdownTime = this.totalCountdownTimeNumber
            let url = GlobalData.getShareUrlWithShareCode()
            GameUtils.createQrcode(this.Image_qrcode, url)
        }

        private copyReplayIdEvent() {
            console.log("拷贝回放码" + this.overData.replayId)
            Utils.copyToClipboard("" + this.overData.replayId)
            console.log("拷贝成功")
        }

        private timerEventHandler(event: egret.Event) {
            var item: TimerItem = event.data;
            this.curCountdownTime = Math.floor(item.leftTime / 1000)
            this.updateCountdownTime()
            if (this.curCountdownTime <= 0) {
                if (this.overData.roomStatus == GameConst.GAME_STATUS_TYPE.over) {
                    this.continueEvent()
                } else if (this.overData.roomStatus == GameConst.GAME_STATUS_TYPE.allOver) {
                    this.quickLookEvent()
                }
            }
        }

        private updateCountdownTime() {
            this.Text_continue_countdown.text = Utils.format("{0}", this.curCountdownTime)
            this.Text_quicklook_countdown.text = Utils.format("{0}", this.curCountdownTime)
        }


        public updateUI_() {
            this.updateCountdownTime()
            var data = this.overData
            if (GlobalData.gameData.isPlayBack()) {
                this.Group_quick.visible = false
                this.Group_continue.visible = false
            } else {
                this.startTimer()
                this.Group_quick.visible = false
                this.Group_continue.visible = false
                var curOverDataGameStatus = data.roomStatus
                if (curOverDataGameStatus == GameConst.GAME_STATUS_TYPE.over) {
                    this.Group_continue.visible = true
                } else if (curOverDataGameStatus == GameConst.GAME_STATUS_TYPE.allOver) {
                    this.Group_quick.visible = true
                }
            }
            var issuccess = this.isWin
            if (this.Image_huType != null) {
                var cardTypeIconName = ""
                if (this.overType == -1) {
                    if (issuccess) {
                        if (data.winType == 1) {
                            cardTypeIconName = "img_nj_settle_wordtitle_zimo_1_png"
                        } else if (data.winType == 2) {
                            cardTypeIconName = "img_nj_settle_wordtitle_dianhu_1_png"
                        } else if (data.winType == 3) {
                            cardTypeIconName = "img_nj_settle_wordtitle_qianggang_1_png"
                        }
                    } else {
                        if (data.winType == 1) {
                            cardTypeIconName = "img_nj_settle_wordtitle_zimo_2_png"
                        } else if (data.winType == 2) {
                            cardTypeIconName = "img_nj_settle_wordtitle_dianhu_2_png"
                        } else if (data.winType == 3) {
                            cardTypeIconName = "img_nj_settle_wordtitle_qianggang_2_png"
                        }
                    }
                } else if (this.overType == -2) {
                    cardTypeIconName = "img_nj_settle_wordtitle_liuju_png"
                }
                if (cardTypeIconName.length > 0) {
                    this.Image_huType.source = cardTypeIconName
                }
            }



            if (this.overType >= 0) {
                this.winnerInfo.setData(data.xJSUserInfos[0], data.bankerChairId)
                this.Image_title.source = Utils.format("img_nj_settle_wordtitle_{0}_png", data.xJSUserInfos[this.overType].superPointType)
                this.showWinnerCard(data.xJSUserInfos[0].heapInfos)
                this.showWinnerScore(data.xJSUserInfos[0])
            } else if (this.overType == -1) {
                this.showWinnerCard(data.xJSUserInfos[0].heapInfos)
                this.winnerInfo.setData(data.xJSUserInfos[0], data.bankerChairId)
                this.showWinnerScore(data.xJSUserInfos[0])
                for (var i = 1; i < this.UserInfoSet.length; i++) {
                    var index = i - 1
                    if (i >= data.xJSUserInfos.length) {
                        this.UserInfoSet[index].visible = false;
                    } else {
                        this.UserInfoSet[index].visible = true;
                        var params = this.getHeadFlagValue(index, data.xJSUserInfos[i].win)
                        this.UserInfoSet[index].setData(data.xJSUserInfos[i], params)
                    }
                }
            } else if (this.overType == -2) {
                var liujuType = data.liuJuType
                if (liujuType == 4) {
                    liujuType = 1
                }
                this.Image_title.source = Utils.format("img_nj_settle_liujutitle_{0}_png", liujuType)

                for (var i = 0; i < this.UserInfoSet.length; i++) {
                    if (i >= data.xJSUserInfos.length) {
                        this.UserInfoSet[i].visible = false;
                    } else {
                        this.UserInfoSet[i].visible = true;
                        var params = this.getHeadFlagValue(i, data.xJSUserInfos[i].win)
                        this.UserInfoSet[i].setData(data.xJSUserInfos[i], params)
                    }
                }
            }
            this.Text_date.text = DateUtils.dateFormat(data.time)
            this.Text_replayId.text = "" + data.replayId
            if (data.msgRoom != null && data.msgRoom.clubName != null) {
                this.Text_clubName.visible = true
                this.Text_clubName.text = Utils.format("俱乐部名称：{0}", data.msgRoom.clubName)
            } else {
                this.Text_clubName.visible = false
            }

        }


        private showWinnerCard(cardInfo) {
            // majongs.direction = data.xJSUserInfos[i].heapInfos[x].direction
            // majongs.gain = data.xJSUserInfos[i].heapInfos[x].gain
            // majongs.values = data.xJSUserInfos[i].heapInfos[x].tileIds

            if (cardInfo == null) {
                return
            }
            var temp_p = 0
            var pongKongAndHandGapIndex = 0
            var startX = 0
            var curX = 0
            var scale = 0.70
            this.Group_winner_card.scaleX = scale
            this.Group_winner_card.scaleY = scale
            var needGap = false
            for (var i = 0; i < cardInfo.length; i++) {
                var tempCardInfo = cardInfo[i]

                var gain = tempCardInfo.gain
                if (gain) {
                    var type = GameConst.GAIN_TYPE.PONG
                    if (tempCardInfo.tileIds.length == 4) {
                        if (tempCardInfo.direction == 0) {
                            type = GameConst.GAIN_TYPE.ConcealedKong
                        } else {
                            type = GameConst.GAIN_TYPE.Exposed
                        }
                    }
                    var params = { type: type, provideClientId: tempCardInfo.direction, value: tempCardInfo.tileIds[0] }
                    var pongKongData = new game.PongKongData(params)
                    var nodePath = Constants.UI_GAME_CSB_PATH + GameConst.CARD_DATA.PONG_KONG_CARD[GameConst.ME_DIR].path
                    var w = 240
                    if (tempCardInfo.direction == GameConst.ME_DIR || tempCardInfo.direction == GameConst.PLAY_DIR.up) {
                        w = 230
                        curX = curX - 10
                    }

                    if (tempCardInfo.direction == GameConst.PLAY_DIR.right) {
                        w = 240
                        curX = curX - 10
                    } else if (tempCardInfo.direction == GameConst.PLAY_DIR.left) {
                        w = 230
                    }
                    var p = { x: curX, y: 0 }
                    var pongKongNode = new game.PongKongCardNode(nodePath, pongKongData, GameConst.ME_DIR, 0, p)
                    this.Group_winner_card.addChild(pongKongNode)
                    curX = curX + w
                    curX = curX + 5
                    needGap = true
                } else {
                    for (var j = 0; j < tempCardInfo.tileIds.length; j++) {
                        var nodePath = Constants.UI_GAME_CSB_PATH + GameConst.CARD_DATA.OUT_CARD[GameConst.ME_DIR].path
                        if (needGap) {
                            needGap = false
                            curX = curX + 10
                        }
                        var p = { x: curX, y: 0 }
                        var handCard = new game.PongKongPerNode(tempCardInfo.tileIds[j], p);
                        this.Group_winner_card.addChild(handCard)
                        curX = curX + 74
                    }
                    curX = curX + 5
                }

            }
        }

        private showWinnerScore(userInfo) {
            this.Text_winner_score.text = "+" + userInfo.curScore
            var fafen = userInfo.faScore
            if (fafen != 0) {
                this.Group_winner_fafen.visible = true;
                if (userInfo.faScore > 0) {
                    this.Text_winner_fafen.text = "+" + userInfo.faScore
                } else {
                    this.Text_winner_fafen.text = "" + userInfo.faScore
                }
            } else {
                this.Group_winner_fafen.visible = false;
            }

            var wbScore = userInfo.waibaoScore
            if (wbScore != 0) {
                this.Group_winner_wb.visible = true;
                if (userInfo.waibaoScore > 0) {
                    this.Text_winner_wb.text = "+" + userInfo.waibaoScore
                } else {
                    this.Text_winner_wb.text = "" + userInfo.waibaoScore
                }

            } else {
                this.Group_winner_wb.visible = false;
            }

        }

        private getHeadFlagValue(index, win) {

            //跟胡判断
            var result =
                {
                    genhu: false,
                    sanbao: false,
                    doublekill: false,
                    bankerChairId: this.overData.bankerChairId
                }
            if (index != 1 && this.overData.winPlayerNum > 1 && win) {
                result.genhu = true
            }
            //三包
            var score = this.overData.xJSUserInfos[index].curScore
            if (index != 1 && score < 0 && this.overData.baoPai) {
                result.sanbao = true
            }
            //一炮多响
            if (index != 1 && this.overData.winPlayerNum > 1 && score < 0) {
                result.doublekill = true
            }

            return result
        }

        protected onEventHandler(evt: egret.Event) {
            super.onEventHandler(evt)
            if (this.eventId == GameCmd.CLOSE_GAME_SETTLE_PANEL) {
                this.close()
                if (GlobalData.gameData.getGameStatus() != GameConst.GAME_STATUS_TYPE.playing) {
                    GlobalData.gameData.setGameStatus(GameConst.GAME_STATUS_TYPE.waiting)
                    Utils.sendGameEvent(GameCmd.GAME_STATUS_CHANGED)
                }
            }
        }

        private quickLookEvent() {
            this.close()
            var overData = GlobalData.gameData.getAllOverData()
            if (overData != null) {
                GameDataService.getInstance().isGameOverTimeOut = true
                DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.gameOverBox.index)
            }

        }


        private continueEvent() {
            SocketManager.getInstance().sendMsg(MsgConstant.GAME, MsgConstant.CMD_READY_FOR_NEXT)
        }

        private shareEvent() {
            Utils.captureScreen()
        }

        private startTimer() {
            this.stopTimer()
            this.tickScheduler = game.TimerItemManager.getInstance().startTimer(game.TimerItem.TimerType.perSec, this.totalCountdownTimeNumber * 1000, this.timerEventHandler, this)
        }

        private stopTimer() {
            if (this.tickScheduler != null) {
                game.TimerItemManager.getInstance().stopTimer(this.tickScheduler)
                this.tickScheduler = null
            }
        }

        public close() {
            this.stopTimer()
            super.close();
        }
    }
}