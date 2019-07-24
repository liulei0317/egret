module game
{
    export class ShareOverResultItem extends game.EComponent
    {
        private Text_userName:eui.Label
        private Text_score:eui.Label
        private Text_wbScore:eui.Label

        private Image_head:eui.Image
        private Image_homer:eui.Image

        private itemData:any

        public constructor(data:any)
        {
            super();
            this.itemData = data

            this.skinName = "resource/skins/common/ShareOverResultItemSkin.exml"
        }


        private loadHeadImg()
        {
             game.ResManager.loadWebImage(this.itemData.headImgUrl,(texture:egret.Texture):void=>{
                this.Image_head.texture = texture
                EAppFacade.getInstance().sendNotification(GameCmd.SHARE_VIEW_HEAD_DOWNLOAD_COMPLETE)
            },this)
        }

        public onCreateViewComplete(): void {
            super.onCreateViewComplete();
            this.updateUI();
        }

        public setData(itemData) {
            this.itemData = itemData;
            this.updateUI();
        }

        public updateUI_() {
            this.Text_userName.text = this.itemData.userName
            if(this.itemData.score >=0)
            {
                this.Text_score.text = "+"+ this.itemData.score
                this.Text_score.textColor = Utils.RGBA2Color(114,90,63);
            }else
            {
                this.Text_score.text = this.itemData.score
                this.Text_score.textColor = Utils.RGBA2Color(136,180,243);
            }

            if(this.itemData.waibaoFen >=0)
            {
                this.Text_wbScore.text = "+"+ this.itemData.waibaoFen
                this.Text_wbScore.textColor = Utils.RGBA2Color(114,90,63);
            }else
            {
                this.Text_wbScore.text = this.itemData.waibaoFen
                this.Text_wbScore.textColor = Utils.RGBA2Color(136,180,243);
            }
           
            this.Image_homer.visible = this.itemData.master

            this.loadHeadImg()
        }
    }
}