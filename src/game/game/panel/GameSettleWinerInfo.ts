class GameSettleWinerInfo extends game.EComponent
{
    private Image_head:eui.Image
    private Image_homer:eui.Image
    private Image_myself:eui.Image
    private Image_banker:eui.Image
    private Text_userName:eui.Label

    private FanList:EScroller

    private fanListData:any[]

    private data:any;
    private bankerChairId:number;


    public constructor()
    {
        super();
        this.skinName = "resource/skins/game/panel/GameSettleWinerInfoSkin.exml"
    }


    public onCreateViewComplete()
    {
        super.onCreateViewComplete();
        this.initScroller()
    }
    
    private initScroller() {
            this.FanList.setElementViewInfo(33, 2);
            this.FanList.setElementCreateFunction(this.createElement.bind(this));
            this.FanList.setElementUpdateDataFun(this.updateElement.bind(this));
            this.FanList.setElementUpdateUIFun(this.updateElementUI.bind(this));
        }

        private createElement(data) {

            var item = new game.GameSettleFanItem(data);
            return item;
        }

        private updateElement(item: game.GameSettleFanItem, data: any) {
            item.setData(data);
        }

        private updateElementUI(item: game.GameSettleFanItem) {
            item.updateUI();
        }

    public setData(data:any,bankerChairId:any)
    {
        this.data = data
        this.bankerChairId = bankerChairId
        this.fanListData = []
        if(this.data.winTypeInfos != null)
        {
            for(var i = 0;i < this.data.winTypeInfos.length;i++)
            {
                var arrIndex = Math.floor(i/3)
                if( this.fanListData[arrIndex] == null)
                {
                    this.fanListData[arrIndex] = []
                }
                var tempData = this.data.winTypeInfos[i]
                var desc = tempData.name+" "+tempData.desc
                this.fanListData[arrIndex].push(desc)
            }
        }
        this.updateUI();
    }

    public updateUI_()
    {
        game.ResManager.loadWebImage(this.data.msgUser.headImgUrl,(texture:egret.Texture):void=>{
            this.Image_head.texture = texture
            this.Image_head.addEventListener(eui.UIEvent.COMPLETE,()=>{
						this.Image_head.texture = texture;
					},this)
        },this)

        this.Image_myself.visible = GlobalData.userData.getUserId() == this.data.msgUser.userId
        this.Image_homer.visible = false
        this.Image_banker.visible = this.bankerChairId == this.data.userChairId
        this.Text_userName.text = this.data.msgUser.nickName

        this.FanList.clearContent();
        this.FanList.setScrollerContent(this.fanListData);
    }


}
window["GameSettleWinerInfo"] = GameSettleWinerInfo