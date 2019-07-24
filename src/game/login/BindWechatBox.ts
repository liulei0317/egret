// TypeScript file
module game
{
    export class BindWeChatBox extends EDialog
    {

        private Button_copy:EButton
        private Text_info:eui.Label;
        private Button_open_wechat:EButton;
        private Button_close:EButton;

        public  constructor()
        {
            super(null,false);
            this.skinName = "resource/skins/login/bindWechatBox.exml"
        }

        public onCreateViewComplete(): void 
        {
            super.onCreateViewComplete();
            this.Text_info.text = Utils.format("您还没有绑定手机账号，请在公众号\n【{0}】或APP内绑定手机号账号",GlobalData.clientConfigs.weixin_mp_name)
            this.addTapEvent(this.Button_copy,this.copyEvent);
            this.addTapEvent(this.Button_open_wechat,this.callOpenWeChatApp);
            this.addTapEvent(this.Button_close,this.close);
        }

        private copyEvent()
        {
            Utils.copyToClipboard(GlobalData.clientConfigs.weixin_mp_name)
        }

        private callOpenWeChatApp()
        {
            Utils.callWxApp()
        }
    }


}