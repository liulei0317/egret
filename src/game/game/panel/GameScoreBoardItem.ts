class GameScoreBoardItem extends game.EComponent
{
    private Text_order:eui.Label
    private score1:GameScoreBoardScoreUnit
    private score2:GameScoreBoardScoreUnit
    private score3:GameScoreBoardScoreUnit
    private score4:GameScoreBoardScoreUnit

    private scoreSet:GameScoreBoardScoreUnit[]

    private itemData:any
    public constructor(data)
    {
        super();
        this.itemData = data
        this.skinName = "resource/skins/game/panel/gameScoreBoardItem.exml"
    }

    public onCreateViewComplete(): void {
            super.onCreateViewComplete();
            this.scoreSet = [this.score1,this.score2,this.score3,this.score4]
            for(var key in this.scoreSet)
            {
                this.scoreSet[parseInt(key)].visible =false
            }
            this.updateUI();
        }

    public setData(itemData) {
        this.itemData = itemData;
        this.updateUI();
    }

    public updateUI_() {
        this.Text_order.text = this.itemData.order
        for(var key in this.itemData.infos)
        {
            var index = parseInt(key)
            var tempData = this.itemData.infos[index]
            this.scoreSet[index].visible = true
            this.scoreSet[index].setData(tempData.score,tempData.waibaoScore)
        }

    }
}