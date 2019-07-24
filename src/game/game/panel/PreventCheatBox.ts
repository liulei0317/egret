module game {
    export class PreventCheatBox extends game.EDialog {

        private Button_quit: EButton
        private Button_continue: EButton
        private Button_dissolve: EButton

        private user1:preventCheatNode
        private user2:preventCheatNode
        private user3:preventCheatNode

        private userSet:preventCheatNode[]

        private params:any
        public constructor(params) {
            super(Constants.UI_PANEL_DATA_SET.preventCheat.index,false,0.3);
            this.params = params
            this.skinName = "resource/skins/game/panel/preventCheatSkin.exml"
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            Utils.sendPanelEvent(GameCmd.CLOSE_CHEAT_STATUS_BOX)
            this.addTapEvent(this.Button_quit, this.clickQuitEvent)
            this.addTapEvent(this.Button_continue, this.clickContinueEvent)
            this.addTapEvent(this.Button_dissolve, this.clickDissolveEvent)

            this.userSet = [this.user1,this.user2,this.user3]
            var gameData = GlobalData.getCurGameData()
            var isClubRoom = gameData.getRoomInfo().isClubRoom()

            var isDaikaiRoom = (gameData.getRoomInfo().getPayMode() == Constants.ROOM_PAY_MODE.other)
            var isMeCreator = gameData.isMeCreator()
            if (isMeCreator && !isDaikaiRoom && !isClubRoom) {
                this.Button_dissolve.visible = true
                this.Button_quit.visible = false
            }
            else {
                this.Button_dissolve.visible = false
                this.Button_quit.visible = true
            }

            this.updateUI();
        }

        public updateUI_()
        {
            var data = this.params
            var juliUserInfo = data.juliUserInfo
            for(var i = 0;i < this.userSet.length;i++)
            {
                 var playerInfo = juliUserInfo[i]
                 var playHead = this.userSet[i]
                 if (playerInfo != null)
                {
                    playHead.visible = true
                    playHead.setData(playerInfo)
                }
                else
                {
                    playHead.visible = false
                }
            }

             var len = juliUserInfo.length
            if (len == 2)
            {
                var pw = 144
                this.userSet[0].x = GameConfig.ScreenW/2 - pw/2 - 80
                this.userSet[1].x = GameConfig.ScreenW/2 - pw/2 + 80 
            }
        }

        protected onEventHandler(evt:egret.Event)
        {
            super.onEventHandler(evt)
            if (this.eventId == GameCmd.CLOSE_CHEAT_INFO_BOX)
            {
                this.close()
                Utils.sendGameEvent(GameCmd.CHECK_CHEAT_STATUS)
            }
        }

        private clickDissolveEvent() {
            var funcRealBack = function () {
                SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_CANCEL_ROOM)
            }
            var info = Strings.dismissRoom
            if(GlobalData.clientConfigs.showCreateRoom == "0" && GameConfig.platform == GameConfig.PLATFORM_SET.weChat)
            {
                info = "是否确认解散房间?";
            }
            DialogManager.getInstance().popUp2(info,funcRealBack)
        }

        private clickQuitEvent() {
            var funcRealBack = function () {
                SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_LEAVE_ROOM)
            }
            var info = Strings.exitRoom
            DialogManager.getInstance().popUp2(info, funcRealBack)
        }

        private clickContinueEvent() {
            SocketManager.getInstance().sendMsg(MsgConstant.GAME, MsgConstant.CMD_IGNORE_CHEAT)
        }

    }
}