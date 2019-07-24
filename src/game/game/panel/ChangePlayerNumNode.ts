module game
{
    export class ChangePlayerNumNode extends EComponent
    {
        private Text_userName:eui.Label;
        private Image_selected:eui.Image;
        private Image_head:eui.Image;
        
        private data:any;
        public constructor()
        {
            super();
            this.skinName = "resource/skins/game/panel/changePlayerNumInfoNode.exml";
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.init();
        }

        private init()
        {
            this.Image_selected.visible = false;
        }

        public setData(data:any)
        {
            this.data = data;
            this.updateUI_();
        }

        public updateUI_()
        {
            var _tempData = this.data
            var chairId =_tempData.chairId
            var playerName = _tempData.userName
            this.Text_userName.text = playerName

            var headImgUrl = _tempData.headImgUrl
            ResManager.loadWebImage(headImgUrl,(texture:egret.Texture):void=>{
                this.Image_head.texture = texture
                this.Image_head.addEventListener(eui.UIEvent.COMPLETE,()=>{
						this.Image_head.texture = texture;
					},this)
            },this)
            var isAgree = _tempData.agree
            var status = GameConst.CHANGE_PALYER_NUM_STATUS.unchosen
            if (isAgree)
            {
                status = GameConst.CHANGE_PALYER_NUM_STATUS.agree
            }

            if (status == GameConst.CHANGE_PALYER_NUM_STATUS.unchosen || status == GameConst.CHANGE_PALYER_NUM_STATUS.reject)
            {
                this.Image_selected.visible = false
            }
            else if( status == GameConst.CHANGE_PALYER_NUM_STATUS.apply || status == GameConst.CHANGE_PALYER_NUM_STATUS.agree )
            {
                this.Image_selected.visible = true
            }
        }

    }
}