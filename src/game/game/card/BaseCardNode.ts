module game
{
    export class BaseCardNode extends EComponent
    {
        protected dir:number;
        protected _value:number;
        protected idx:number
        public constructor(dir,value,idx)
        {
            super();
            this.dir = dir;
            this._value = value
            this.idx = idx
        }

         public onCreateViewComplete(): void {
            this.setCardValue(this._value)
         }

         public setCardValue(value)
         {
             this._value = value
         }

        public getDir()
        {
            return this.dir;
        }

        public getCardValue() {
            return this._value;
        }

        protected getCardFaceImgName(value)
        {
            var imgName = Utils.format("2dmj_cardnum_mahjong_{0}_png",Utils.getNumberFormatStr(value))
            LogUtils.info(Utils.format("imgName {0}",imgName))
            return GameUtils.getCardFace(imgName)
        }
    }
}