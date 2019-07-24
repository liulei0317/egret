module game
{
    export class Toast extends EComponent
    {
        private Text_msg:eui.Label;

        public constructor()
        {
            super();
            this.skinName = "resource/skins/common/ToastSkin.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.x = GameConfig.ScreenW/2 - this.width/2;
            this.y = -this.height;
        }
        

        public showText(info:string)
        {
            this.Text_msg.text = info;
            this.x = GameConfig.ScreenW/2 - this.width/2;
            var tw  = egret.Tween.get(this);
            tw.to({y:0},300,egret.Ease.getPowOut(3))
            tw.wait(1500)
            tw.to({y:-this.height},300,egret.Ease.getPowIn(3))
            tw.call(():void=>{
                this.parent.removeChild(this)
            })
        }

    }
}