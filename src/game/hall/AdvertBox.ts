module game
{
    export class AdvertBox extends EDialog
    {
        private Group_advert:eui.Group
        private Text_wx:eui.Label
        private Button_copy:eui.Label
        private Group_public:eui.Group
        private Text_public_name:eui.Label
        private Button_copy_public:eui.Label

        private Button_close:EButton
        private params:any
        public constructor(params:any)
        {
            super(Constants.UI_PANEL_DATA_SET.advert.index);
            this.params = params
            this.skinName = "resource/skins/hall/advertBoxSkin.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.tab(this.params.type)
            this.addTapEvent(this.Button_close,this.close.bind(this))
        }

        private tab(type)
        {
            this.Group_advert.visible = false
            this.Group_public.visible = false
             if(type == 1)
            {
                this.Group_advert.visible = true
                this.Text_wx.text = GlobalData.clientConfigs.investment_info
                this.addTapEvent(this.Button_copy,this.copyInvestment.bind(this))
            }else if(type == 2)
            {
                this.Group_public.visible = true
                this.Text_public_name.text = GlobalData.clientConfigs.weixin_mp_name
                this.addTapEvent(this.Button_copy_public,this.copyPublic.bind(this))
            }
        }

        private copyInvestment()
        {
            Utils.copyToClipboard(this.Text_wx.text)
        }

        private copyPublic()
        {
             Utils.copyToClipboard(this.Text_public_name.text)
        }
    }
}