module game
{
    export class GameScoreEffect extends EComponent
    {
        private scoreNumber:number

        private Text_score:eui.Label
        public constructor(scoreNumber:number)
        {
            super();
            this.scoreNumber = scoreNumber
            this.skinName = "resource/skins/game/gameScoreEffectSkin.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            if(this.scoreNumber > 0)
            {
                this.Text_score.text = "+"+this.scoreNumber
                this.Text_score.textColor = 0xFFB20E
            }else
            {
                this.Text_score.text = ""+ this.scoreNumber
                this.Text_score.textColor = 0x7998c0
            }
            var tw = egret.Tween.get(this)
            tw.to({x:this.x + 20,y:this.y - 20},1000)
            tw.to({alpha:0},300)
            tw.call(():void=>{
                this.parent.removeChild(this)
            })
        }


    }

}