class GameChatEmotion extends game.EComponent
{
    
    private Image_bg:eui.Image
    private Image_emotion:eui.Image

    private data:any
    public constructor()
    {
        super();
        this.skinName = "resource/skins/game/panel/GameChatBoxEmotionSkin.exml"
    }

    public setData(data)
    {
        this.data = data
        this.setSelected(false)
        this.updateUI();
    }

    public updateUI_()
    {
        this.Image_emotion.source = this.data.emotionName+"_png"
    }

    public setSelected(value)
    {
        this.Image_bg.visible = value
    }

    public sendMsg()
    {
        game.LogUtils.info("发送表情" + this.data.index)
        game.GameChatBox.sendChatMsg(GameConst.CHAT_MSG_TYPE.EMOTION,this.data.index + 1)
        
    }


}

window["GameChatEmotion"] = GameChatEmotion