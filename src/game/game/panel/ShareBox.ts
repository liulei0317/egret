module game
{
    export class ShareBox extends game.EDialog
    {
        private Button_close:EButton
        private Button_share2friend:EButton
        private Button_share2Group:EButton
        public constructor()
        {
            super(Constants.UI_PANEL_DATA_SET.wechatShare.index);
            this.skinName = "resource/skins/game/panel/ShareBoxSkin.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.init();
        }

        private init()
        {
            this.addTapEvent(this.Button_close,this.close.bind(this));
            this.addTapEvent(this.Button_share2friend,this.share2FriendEvent.bind(this));
            this.addTapEvent(this.Button_share2Group,this.share2GroupEvent.bind(this));
        }

        private async share2FriendEvent()
        {
            var title = "测试"
            // platform.share(title,"index.html?id=123",123)
        }

        private share2GroupEvent()
        {
            
        }
    }
}