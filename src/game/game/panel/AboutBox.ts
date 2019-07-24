module game
{
    export class AboutBox extends EDialog
    {
        private Button_close:EButton
        private Text_info:eui.Label
        public constructor()
        {
            super(Constants.UI_PANEL_DATA_SET.about.index);
            this.skinName = "resource/skins/game/panel/AboutBoxSkin.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.addTapEvent(this.Button_close,this.close.bind(this))
            this.updateUI();
        }

        public updateUI_()
        {
            this.Text_info.text = "当前版本：" + GameConfig.version
        }
    }
}