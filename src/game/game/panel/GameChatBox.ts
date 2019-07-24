module game
{
    export class GameChatBox extends EDialog
    {
        private listLeft:EScroller
        private listRight:EScroller

        private leftListData:any
        private rightListData:any

        public constructor()
        {
            super(Constants.UI_PANEL_DATA_SET.chatBox.index);
            this.skinName = "resource/skins/game/panel/GameChatBoxSkin.exml"
        }


        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.init()
            this.updateUI()
        }

        public onEventHandler(evt:egret.Event)
        {
            super.onEventHandler(evt);
            if(this.eventId == GameCmd.CLOSE_CHAT_BOX_PANEL)
            {
                this.close()
            }
        }

        protected updateUI_() {
            this.listLeft.clearContent();
            this.leftListData = []
            for(var i = 0;i < GameConst.CHAT_EMOTION_NAME.length;i++)
            {   
                var index = Math.floor(i/3)
                if(this.leftListData[index] == null )
                {
                    this.leftListData[index] = []
                }
                this.leftListData[index].push({index:i,emotionName:GameConst.CHAT_EMOTION_NAME[i]})
            }
            
            this.listLeft.setScrollerContent(this.leftListData);
            this.listRight.clearContent();
            var textData = Strings.chatText
            if (GameConst.sound_type == GameConst.SOUND_TYPE_ENUM.standard) 
            {
                textData  = Strings.chatText_standard
            }
            this.rightListData = []
            for(var i = 0;i < textData.length;i++)
            {
                 this.rightListData.push({index:i,text:textData[i]})
            }
            this.listRight.setScrollerContent(this.rightListData);
        }

        private init() {
            this.initLeftScroller()
            this.initRightScroller()
        }

        

        private initLeftScroller() {
            this.listLeft.setElementViewInfo(114, 0);
            this.listLeft.setElementCreateFunction(this.createLeftElement.bind(this));
            this.listLeft.setElementUpdateDataFun(this.updateLeftElement.bind(this));
            this.listLeft.setElementUpdateUIFun(this.updateLeftElementUI.bind(this));
        }

        private createLeftElement(data) {

            var item = new game.GameChatEmotionItem(data);
            return item;
        }

        private updateLeftElement(item: game.GameChatEmotionItem, data: any) {
            item.setData(data);
        }

        private updateLeftElementUI(item: game.GameChatEmotionItem) {
            item.updateUI();
        }

        private initRightScroller() {
            this.listRight.setElementViewInfo(60, 0);
            this.listRight.setElementCreateFunction(this.createRightElement.bind(this));
            this.listRight.setElementUpdateDataFun(this.updateRightElement.bind(this));
            this.listRight.setElementUpdateUIFun(this.updateRightElementUI.bind(this));
        }

        private createRightElement(data) {

            var item = new game.GameChatTextItem(data);
            return item;
        }

        private updateRightElement(item: game.GameChatTextItem, data: any) {
            item.setData(data);
        }

        private updateRightElementUI(item: game.GameChatTextItem) {
            item.updateUI();
        }

        public static sendChatMsg(type,msgId)
        {
            var curGameData = GlobalData.getCurGameData()
            if (curGameData.canSendChatMsg())
            {
                if (curGameData.getGameStatus() != GameConst.GAME_STATUS_TYPE.allOver)
                {
                    curGameData.updateSendChatTime()
                    game.SocketManager.getInstance().sendMsg(game.MsgConstant.GAME,game.MsgConstant.CMD_SEND_MSG,{ type : type, msgId : msgId})
                }
                Utils.sendPanelEvent(game.GameCmd.CLOSE_CHAT_BOX_PANEL)
            }
            else
            {
                game.CommonView.showToast(Strings.tooShortTime)
            }
        }

    }
}