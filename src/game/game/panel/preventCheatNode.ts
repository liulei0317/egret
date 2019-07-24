class preventCheatNode extends game.EComponent
{
    private Text_userName:eui.Label
    private Image_head:eui.Image

    private data:any;
    public constructor()
    {
        super();
        this.skinName = "resource/skins/game/panel/preventCheatNodeSkin.exml"
    }

    public setData(data)
    {
        this.data = data
        this.updateUI();
    }

    public updateUI_()
    {
        this.Text_userName.text = this.data.nickName
        game.ResManager.loadWebImage(this.data.headImgUrl,(texture:egret.Texture):void=>
        {
                this.Image_head.texture = texture
                this.Image_head.addEventListener(eui.UIEvent.COMPLETE,()=>{
						this.Image_head.texture = texture;
					},this)
        },this)
    }
}

window["preventCheatNode"] = preventCheatNode