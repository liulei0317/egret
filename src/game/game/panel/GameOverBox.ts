module game {
    export class GameOverBox extends game.EDialog {
        private Button_back: EButton
        private User1: GameOverUserItem
        private User2: GameOverUserItem
        private User3: GameOverUserItem
        private User4: GameOverUserItem

        private UserSet: GameOverUserItem[]
        private Text_club: eui.Label
        private Text_roomNumber: eui.Label
        private Text_turnNumber: eui.Label
        private Text_data: eui.Label
        private Text_liujuType: eui.Label
        private Image_roomType: eui.Image;
        private text_roomType: eui.Label
        private Image_qrcode: eui.Rect;

        private Button_direct2App: eui.Group
        private Button_share2All: EButton;
        private Button_share2Friend: EButton;
        private title_jifen: eui.Label;
        private Button_copyRecord: EButton;
        private Button_saveImage: EButton;
        private Button_saveUrl: EButton;
        private Text_fufen: eui.Label
        private params: any
        public constructor(params: any = null) {
            super(Constants.UI_PANEL_DATA_SET.gameOverBox.index, false)
            this.params = params
            this.skinName = "resource/skins/game/panel/GameOverResultSkin.exml"
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.UserSet = [this.User1, this.User2, this.User3, this.User4]
            EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_BLESS_SCORE_ONLY), this.getMyBlessCallBack, this);
            this.addTapEvent(this.Button_back, this.backEvent)
            this.addTapEvent(this.Button_copyRecord, this.clickedCopyInfo)
            this.addTapEvent(this.Button_saveImage, this.clickedSaveImage)
            this.addTapEvent(this.Button_saveUrl, this.clickedCopyURL)
            // this.addTapEvent(this.Button_share2All, this.share2AllEvent.bind(this))
            // this.addTapEvent(this.Button_share2Friend, this.share2FriendEvent.bind(this))
            this.updateUI();
        }
        private needShowLuckScore(): boolean {
            return (this.params == null || !this.params.isFromReplay) && GlobalData.gameData.getRoomInfo().isClubRoom() && typeof (GlobalData.gameData.getAllOverData().showCalNum) != "undefined" && GlobalData.gameData.getAllOverData().showCalNum != null &&
                GlobalData.gameData.getRoomInfo().isBlessSwitch();
        }
        private clickedCopyInfo() {
            let allOverData = GlobalData.gameData.getAllOverData()
            let roomInfo: string = "【{0}】{1}\n\n"
            let clubName: string = allOverData.clubName
            let totalUserInfo: string = ""
            let roomType = (allOverData.msgRoom.roomType == Constants.ROOM_TYPE.jinYuanZi ? "进园子" : "敞开头")
            let showCalNum = allOverData.showCalNum
            for (let i = 0; i < allOverData.userInfoList.length; i++) {
                let info = allOverData.userInfoList[i]
                let waibaoFen = info.waibaoFen
                let userInfoText: string = ""
                if (typeof (waibaoFen) != "undefined" && waibaoFen != null) {
                    if (showCalNum) {
                        userInfoText = Utils.format("{0}(ID{1}):\n分数【{2}】外包【{3}】\n记分【{4}】\n", info.userName, info.userId, info.score, info.waibaoFen, info.calNum)
                    }
                    else {
                        userInfoText = Utils.format("{0}(ID{1}):\n分数【{2}】外包【{3}】\n", info.userName, info.userId, info.score, info.waibaoFen)
                    }
                }
                else {
                    if (showCalNum) {
                        userInfoText = Utils.format("{0}(ID{1}):\n分数【{2}】\n记分【{4}】\n", info.userName, info.userID, info.score, info.calNum)
                    }
                    else {
                        userInfoText = Utils.format("{0}(ID{1}):\n分数【{2}】\n", info.userName, info.userID, info.score)
                    }
                }
                totalUserInfo = totalUserInfo + userInfoText
                if (i < allOverData.userInfoList.length - 1)
                    totalUserInfo = totalUserInfo + "--------------------------\n"
            }
            roomInfo = Utils.format(roomInfo, roomType, allOverData.msgRoom.roomNumber)
            let copyInfo: string = ""
            if (typeof (clubName) != "undefined" && clubName != null)
                copyInfo = Utils.format("{0}{1}\n{2} {3}", roomInfo, totalUserInfo, clubName, DateUtils.dateFormat1(allOverData.time, false))
            else
                copyInfo = Utils.format("{0}{1}\n{2}", roomInfo, totalUserInfo, DateUtils.dateFormat1(allOverData.time, false))
            // console.log(copyInfo)
            Utils.copyToClipboard(copyInfo)
        }
        private clickedSaveImage() {
            this.Text_fufen.visible = false
            Utils.captureScreen().then((re) => {
                this.Text_fufen.visible = this.needShowLuckScore()
            })
        }
        private clickedCopyURL() {
            let copyUrl = GlobalData.getSettleInfoUrl(GlobalData.gameData.getAllOverData().msgRoom.roomId)
            Utils.copyToClipboard(copyUrl)
        }
        private share2FriendEvent() {
            // CommonView.showWaiting();
            // let loadCompelte = RES.isGroupLoaded("shareResult")
            // if(!loadCompelte)
            // {
            //     await RES.loadGroup("shareResult")
            // }
            let shareOverResult = new ShareOverResultView(GlobalData.gameData.getAllOverData())
            DialogManager.getInstance().show(shareOverResult)
            // CommonView.hideWaiting();
        }

        private share2AllEvent() {

        }

        public updateUI_() {
            this.Text_fufen.visible = false
            if (this.needShowLuckScore()) {
                let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_BLESS_SCORE_ONLY,
                    { clubId: GlobalData.gameData.getRoomInfo().getClubID() })
                SocketManager.getInstance().send(requestDomain)
            }
            this.Button_direct2App.visible = false;

            let allOverData = GlobalData.gameData.getAllOverData()
            let url = GlobalData.getSettleInfoUrl(GlobalData.gameData.getAllOverData().msgRoom.roomId)
            GameUtils.createQrcode(this.Image_qrcode, url)

            if (allOverData.clubName != null) {
                this.Text_club.visible = true
                this.Text_club.text = "俱乐部名称：" + allOverData.clubName
            } else {
                this.Text_club.visible = false
            }

            this.Text_roomNumber.text = "房间号：" + allOverData.msgRoom.roomNumber
            this.Text_data.text = DateUtils.dateFormat(allOverData.time)
            if (allOverData.msgRoom.roomType == Constants.ROOM_TYPE.jinYuanZi) {
                this.text_roomType.text = "进园子"
            } else if (allOverData.msgRoom.roomType == Constants.ROOM_TYPE.changKaiTou) {
                this.text_roomType.text = "敞开头"
            }

            if (allOverData.msgRoom.turnMode == Constants.ROOM_TIME_MODE.ba) {
                this.Text_turnNumber.text = Utils.format("把数：{0}/{1}", allOverData.curTurnNum, allOverData.msgRoom.turnNumber)
            }
            else if (allOverData.msgRoom.turnMode == Constants.ROOM_TIME_MODE.quan) {
                if (allOverData.curTurnDirection == null) {
                    this.Text_turnNumber.text = Utils.format("圈数:{0}/{0}", allOverData.curTurnNum, allOverData.msgRoom.turnNumber)
                }
                else {
                    this.Text_turnNumber.text = Utils.format("圈数:{1}/{2} {0}", GameConst.DIRECT_DESC[allOverData.curTurnDirection], allOverData.curTurnNum, allOverData.msgRoom.turnNumber)
                }
            }
            let userInfoList = allOverData.userInfoList
            this.title_jifen.visible = allOverData.showCalNum
            for (let i = 0; i < this.UserSet.length; i++) {
                if (i >= userInfoList.length) {
                    this.UserSet[i].visible = false;
                    this.UserSet[i].setData(i + 1, null, allOverData)
                }
                else {
                    if (allOverData.showCalNum) {
                        userInfoList[i].showCalNum = true
                    }
                    else {
                        userInfoList[i].showCalNum = false
                    }
                    this.UserSet[i].visible = true;
                    userInfoList[i].index = (i + 1)
                    this.UserSet[i].setData(i + 1, userInfoList[i], allOverData)
                }
            }
            if (allOverData.liuJuType == 3) {
                this.Text_liujuType.text = "协商解散"
            }
            else if (allOverData.liuJuType == 4) {
                this.Text_liujuType.text = "超时解散"
            }
            else if (allOverData.liuJuType == 5) {
                this.Text_liujuType.text = "会长解散"
            }
            else {
                this.Text_liujuType.text = ""
            }
        }
        private getMyBlessCallBack(event: egret.Event) {
            let msgDomain: game.MsgDomain = event.data
            if (msgDomain.code == game.CmdResultType.SUCCESS) {
                let data = msgDomain.data
                if (data.clubId == GlobalData.gameData.getRoomInfo().getClubID()) {
                    this.Text_fufen.visible = true
                    this.Text_fufen.text = "我的体力：" + data.blessNum
                }
            }
        }
        private backEvent() {
            if (this.params != null && this.params.isFromReplay) {
                this.close()
                return
            }
            this.close()
            if (GlobalData.gameData.getRoomInfo().isClubRoom()) {
                SceneSkip.skipToClubScene()
            }
            else {
                SceneSkip.skipToHallScene()
            }
        }
        public clean() {
            super.clean()
            EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_BLESS_SCORE_ONLY), this.getMyBlessCallBack, this);

        }
    }
}