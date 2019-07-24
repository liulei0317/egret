module game
{
    export class AbandomWinConfirmBox extends EDialog
    {
        private Button_cancel:EButton
        private Button_win:EButton
        private params:any
        public constructor(params:any)
        {
            super(Constants.UI_PANEL_DATA_SET.discardWinConfirmBox.index,false);
            this.params = params
            this.skinName = "resource/skins/game/panel/AbandomWinConfirm.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.addTapEvent(this.Button_cancel,this.cancelEvent.bind(this))
            this.addTapEvent(this.Button_win,this.winEvent.bind(this))
            this.updateUI();
        }

        private cancelEvent()
        {
            if(this.params != null && this.params.cancelFun)
            {
                this.params.cancelFun()
            }
            this.close()
        }

        private winEvent()
        {
            if(this.params != null && this.params.confirmFunc)
            {
                this.params.confirmFunc()
            }
            this.close()
        }
    }
}