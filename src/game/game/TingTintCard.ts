module game
{
    export class TingTintCard extends EComponent
    {
        private Text_num:eui.Label
        private face:eui.Image
        private back:eui.Image
        public constructor()
        {
            super();
            this.skinName = "resource/skins/game/gameTingTintCardSkin.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete()
           
        }

        public setData(data:any)
        {
            this.back.source = GameUtils.getCardBack("2dmj_card_me_stand_1{0}_png")
            this.face.source = Utils.format("2dmj_cardnum_mahjong_{0}_png", Utils.getNumberFormatStr(data.tileId))
            this.Text_num.text = data.num
        }


    }
}