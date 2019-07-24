module game
{
    export class GameChatText extends game.EComponent
    {
        private Image_bg:eui.Image
        private Text_info:eui.Label

        private info:string
        private dir:number
        public constructor(dir:number,info:string)
        {
            super();
            this.dir = dir
            this.info = info
            this.skinName = "resource/skins/game/gameChatTextSkin.exml"
        }


        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.Text_info.text = this.info
            var w = this.Text_info.width
            this.Image_bg.width = w

            var x = GameConst.ACTION_POSITION.CHAT_MSG.TEXT[this.dir].x - this.width/2
            var y = GameConst.ACTION_POSITION.CHAT_MSG.TEXT[this.dir].y - this.height/2

            this.x = x;
            this.y = y

            var tw = egret.Tween.get(this)
            tw.wait(2000)
            tw.call(():void=>{
                this.parent.removeChild(this)
            })
        }
    }
}