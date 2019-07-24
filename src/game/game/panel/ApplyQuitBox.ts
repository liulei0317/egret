module game {
    export class ApplyQuitBox extends game.EDialog {
        private Button_agree: eui.Button;
        private Button_oppose: eui.Button;

        private Player1: eui.Group;
        private Player2: eui.Group;
        private Player3: eui.Group;
        private Player4: eui.Group;
        private PlayerNodeSet: eui.Group[];

        private Text_playerStatus_1: eui.Label
        private Text_playerStatus_2: eui.Label
        private Text_playerStatus_3: eui.Label
        private Text_playerStatus_4: eui.Label
        private playerStatus: eui.Label[]

        private Text_playerName_1: eui.Label
        private Text_playerName_2: eui.Label
        private Text_playerName_3: eui.Label
        private Text_playerName_4: eui.Label
        private playerNames: eui.Label[]

        private Text_time: eui.Label

        private data: any

        private leftSeconds: number = 0
        private timerId: string
        public constructor(params: any) {
            super(Constants.UI_PANEL_DATA_SET.applyQuit.index, false);
            this.data = params
            this.skinName = "resource/skins/game/panel/applyQuitRoom.exml"
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.init();
            this.addTapEvent(this.Button_oppose, this.opposeEvent)
            this.addTapEvent(this.Button_agree, this.agreeEvent)
            this.updateUI()
        }

        private init() {
            this.PlayerNodeSet = [this.Player1, this.Player2, this.Player3, this.Player4]
            this.playerStatus = [this.Text_playerStatus_1, this.Text_playerStatus_2, this.Text_playerStatus_3, this.Text_playerStatus_4]
            this.playerNames = [this.Text_playerName_1, this.Text_playerName_2, this.Text_playerName_3, this.Text_playerName_4]
        }

        public setData(data) {
            this.data = data
            this.updateUI();
        }

        private updateTimeLabel() {
            var timeStr = ""
            if (this.leftSeconds > 59) {
                var mins = Math.floor(this.leftSeconds / 60)
                var secs = this.leftSeconds % 60
                timeStr = mins + "分" + secs + "秒"
            }
            else {
                timeStr = this.leftSeconds + "秒"
            }
            this.Text_time.text = Utils.format("倒计时:{0}", timeStr)
        }

        private startTime() {
            this.stopTimer()
            this.timerId = TimerItemManager.getInstance().startTimer(TimerItem.TimerType.perSec, this.leftSeconds * 1000, this.timerEvent.bind(this), this)
        }

        private stopTimer()
        {
            if (this.timerId != null) {
                TimerItemManager.getInstance().stopTimer(this.timerId)
                this.timerId = null
            }
        }

        private timerEvent() {
            this.leftSeconds = Math.max(0, this.leftSeconds - 1)
            this.updateTimeLabel()
        }

        protected updateUI_() {
            var params = this.data
            this.leftSeconds = Math.floor(params.leftTime / 1000)
            this.updateTimeLabel()
            this.startTime()

            params.statusList.sort(function (a, b) {
                return a.chairId - b.chairId
            })

            var userInfo = params.statusList

            var agreeNum = 0
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                if (i >= userInfo.length) {
                    this.PlayerNodeSet[i].visible = false
                }
                else {
                    this.PlayerNodeSet[i].visible = true
                    var _tempData = userInfo[i]
                    var chairId = _tempData.chairId
                    var playerName = _tempData.userName
                    this.playerNames[i].text = playerName
                    var isAgree = _tempData.agree
                    var status = GameConst.APPLY_QUIT_STATUS.unchosen
                    if (isAgree) {
                        status = GameConst.APPLY_QUIT_STATUS.agree
                        agreeNum = agreeNum + 1
                    }
                    this.setStatus(i, chairId, status)
                }
            }

            if (agreeNum >= userInfo.length) {
                this.close()
            }
        }


        //status 1- 申请  2- 同意  3 - 拒绝
        private setStatus(index, chairId, status) {
            var curGameData = GlobalData.getCurGameData()

            if (chairId == curGameData.getMyChairId()) {
                if (status == GameConst.APPLY_QUIT_STATUS.apply || status == GameConst.APPLY_QUIT_STATUS.agree) {
                    this.Button_agree.enabled = false
                }
                else {
                    this.Button_agree.enabled = true
                }
            }

            var statusLabel = this.playerStatus[index]
            if (status == GameConst.APPLY_QUIT_STATUS.unchosen) {
                statusLabel.textColor = Utils.RGBA2Color(152, 19, 19)
                statusLabel.text = "未选择"
            } else if (status == GameConst.APPLY_QUIT_STATUS.apply || status == GameConst.APPLY_QUIT_STATUS.agree) {
                statusLabel.textColor = Utils.RGBA2Color(45, 206, 64)
                statusLabel.text = "同意"
            } else if (status == GameConst.APPLY_QUIT_STATUS.reject) {
                statusLabel.textColor = Utils.RGBA2Color(45, 206, 64)
                statusLabel.text = "不同意"
            }

        }


        protected onEventHandler(evt: egret.Event) {
            super.onEventHandler(evt)
            if (this.eventId == GameCmd.CLOSE_APPLY_QUIT_PANEL) {
                this.close()
            }
        }

        public agreeEvent() {
            SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_DISMISS_ROOM)
        }

        public opposeEvent() {
            SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_REJECT_DISMISS_ROOM)
        }

        public close() {
            this.stopTimer()
            super.close();
        }
    }
}