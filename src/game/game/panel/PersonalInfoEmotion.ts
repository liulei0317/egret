module game
{
    export class PersonalInfoEmotion extends EComponent
    {
        private Image_emotion:eui.Image;
        private Text_gold:eui.Label

        private Image_bg:eui.Image;
        private index:number

        public constructor(index:number)
        {
            super();
            this.index = index;
            this.skinName = "resource/skins/game/panel/personalInfoPointEmotion.exml";
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.init();
        }

        private init()
        {
            this.Image_emotion.source = "img_personal_item_"+(this.index) +"_png";
            this.Text_gold.text = ""+ GameConst.POINT_EMOTION_PRICE[this.index - 1]
        }

        public getIndex()
        {
            return this.index
        }

        public setSelected(value)
        {
            // if(value)
            // {
            //     this.Image_bg.source = "bg_personal_item_2_png"
            // }else
            // {
            //     this.Image_bg.source = "bg_personal_item_1_png"
            // }
        }
    }
}