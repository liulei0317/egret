module game {
    export class OutCardEffect extends game.EComponent {
        private face: eui.Image;
        private back: eui.Image;

        private value: number;
        private dir:number;
        public constructor(dir:number,value: number) {
            super();
            this.dir = dir
            this.value = value
            this.skinName = "resource/skins/game/card/OutCardEffectSkin.exml"
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.back.source = GameUtils.getCardBack("2dmj_card_me_stand_1{0}_png")
            this.face.source = Utils.format("2dmj_cardnum_mahjong_{0}_png", Utils.getNumberFormatStr(this.value))
            // var seqAction = cc.Sequence:create(
            // cc.DelayTime:create(0.3),
            // cc.FadeOut:create(0.1),
            // cc.Hide:create()
            // )

            this.x = GameConst.CARD_DATA.EFFECT_OUT_CARD[this.dir].x - this.width/2;
            this.y = GameConst.CARD_DATA.EFFECT_OUT_CARD[this.dir].y- this.height/2;
            var tw = egret.Tween.get(this)
            tw.wait(300)
            tw.to({alpha:0},100)
            tw.call(():void=>{
                this.parent.removeChild(this)
            })
        }

    }
}