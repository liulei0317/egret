module game
{
    export class ConfirmBox extends game.EDialog
    {
        private Text_info:eui.Label
        private Button_Ok:EButton;
        private Button_cancel:EButton

        private params:any
        public constructor(params)
        {
            super(null,false);
            this.params = params;
            this.skinName = "resource/skins/common/ConfirmBoxSkin.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            var boxType = this.params.type //1, 只有一个确定    2： 有一个确定和一个取消
            var confirmFunc = this.params.confirmFunc
            var cancelFun = this.params.cancelFun

            if (boxType == 1)
            {
                this.Button_cancel.visible = false
                this.Button_Ok.x = (GameConfig.ScreenW - this.Button_Ok.width)/2    //居中
            }
            this.addTapEvent(this.Button_Ok,this.clickConfirmEvent)
            this.addTapEvent(this.Button_cancel,this.clickCancelEvent)

            // this.name = this.params.info
            this.Text_info.text = this.params.info
        }

        private clickConfirmEvent()
        {
            var confirmFunc = this.params.confirmFunc
            if (confirmFunc != null)
            {
                confirmFunc.call()
            }
            this.close()

        }

        private clickCancelEvent()
        {
            var cancelFun = this.params.cancelFun
            if(cancelFun != null)
            {
                cancelFun.call()
            }

            this.close()
        }



        public getDialogUUID()
        {
            return new md5().hex_md5(this.params.info);
        }

        public close()
        {

            super.close();
        }

    }
}