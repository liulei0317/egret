module game
{
    export class GameChatTextItem extends EComponent
    {
        private Text_info:eui.Label
        private Image_bg:eui.Image

        private itemData:any
        public constructor(itemData:any)
        {
            super();
            this.itemData = itemData
            this.skinName = "resource/skins/game/panel/GameChatTextItemSkin.exml"
            
        }

        public onCreateViewComplete(): void {
            super.onCreateViewComplete();
            this.setSelected(false)
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBeginEvent,this)
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchEndEvent,this)
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndEvent,this)
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEndEvent,this)
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendMsg,this)
            this.updateUI();
        }

        private sendMsg()
        {
            LogUtils.info("发送文字" + this.itemData.index)
            game.GameChatBox.sendChatMsg(GameConst.CHAT_MSG_TYPE.TEXT,this.itemData.index + 1)
        }

        private touchBeginEvent()
        {
            this.setSelected(true)
        }

        private touchEndEvent()
        {
            this.setSelected(false)
        }

        public setData(itemData) {
            this.itemData = itemData;
            this.updateUI();
        }

        public updateUI_() {
            this.Text_info.text = this.itemData.text
        }

        public setSelected(value)
        {
            this.Image_bg.visible = value
        }

    }
}