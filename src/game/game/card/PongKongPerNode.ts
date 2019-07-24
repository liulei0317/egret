module game
{
    export class PongKongPerNode extends game.EComponent
    {
        private back:eui.Image;
        private face:eui.Image;
        
        private value:number;
        public constructor(value:number,p)
        {
            super();
            this.value = value
            this.x = p.x
            this.y = p.y
            this.skinName = "resource/skins/game/card/PongKongPerNodeSkin.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            var faceImgName = this.getCardFaceImgName(this.value)
            LogUtils.info("faceImgName " + faceImgName)
            this.face.source = faceImgName
            this.back.source = GameUtils.getCardBack("2dmj_card_me_face_2{0}_png")
        }

        protected getCardFaceImgName(value)
        {
            var imgName = Utils.format("2dmj_cardnum_mahjong_{0}_png",Utils.getNumberFormatStr(value))
            LogUtils.info(Utils.format("imgName {0}",imgName))
            return GameUtils.getCardFace(imgName)
        }
        
    }
}