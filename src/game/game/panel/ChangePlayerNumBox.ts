module game {
    export class ChangePlayerNumBox extends EDialog {
        private Button_reject: EButton;
        private Button_agree: EButton;
        private Group_head: eui.Group;
        private Text_info: eui.Group;

        private params:any;
        public constructor(params) {
            super(Constants.UI_PANEL_DATA_SET.changePlayerNumBox.index,false);
            this.params = params
            this.skinName = "resource/skins/game/panel/changePlayerNum.exml";
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.addTapEvent(this.Button_reject, this.rejectEvent.bind(this))
            this.addTapEvent(this.Button_agree, this.agreeEvent.bind(this))

            if(GlobalData.clientConfigs.showCreateRoom == "0" && GameConfig.platform == GameConfig.PLATFORM_SET.weChat)
            {
                this.Text_info.visible = false;
            }
            this.updateUI();
        }

        protected onEventHandler(evt: egret.Event) {
            super.onEventHandler(evt);
            if (this.eventId == GameCmd.CLOSE_CHANGE_PLAYERNUM_PANEL) {
                this.close()
            }
        }

        public updateUI_()
        {
            var params = this.params
            
            var userInfo = params.statusList
            userInfo.sort(function (a, b) {
                return a.chairId - b.chairId
            }
            )
            var len = userInfo.length
            var agreeNum = 0
            for (var i = 0; i < len; i++) {
                var playerNumNode = <ChangePlayerNumNode>this.getChildByName("playHead"+i)
                if(playerNumNode == null)
                {
                    playerNumNode = new ChangePlayerNumNode()
                    playerNumNode.name = "playHead"+i
                    this.Group_head.addChild(playerNumNode)
                }
                var x = i * 207
                var y = 0
                playerNumNode.x = x
                playerNumNode.y = y
                var _tempData = userInfo[i]
                playerNumNode.setData(_tempData)
                var isAgree = _tempData.agree
                var status = GameConst.CHANGE_PALYER_NUM_STATUS.unchosen
                if (isAgree) {
                    agreeNum = agreeNum + 1
                    status = GameConst.CHANGE_PALYER_NUM_STATUS.agree
                }
                var chairId = _tempData.chairId
                if (chairId == GlobalData.gameData.getMyChairId()) {
                    if (status == GameConst.CHANGE_PALYER_NUM_STATUS.apply || status == GameConst.CHANGE_PALYER_NUM_STATUS.agree) {
                        this.Button_agree.enabled = false
                    }
                    else {
                        this.Button_agree.enabled = true
                    }
                }
            }
            if (agreeNum >= len) {
                this.close()
            }
        }

        public setData(params) {
            this.params = params;
            this.updateUI_();
        }


        private rejectEvent() {
            SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_switch_reject)
        }

        private agreeEvent() {
            SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_switch_player_num)
        }
    }
}