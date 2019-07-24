class GameScoreBoardScoreUnit extends game.EComponent
{
    private Text_score:eui.Label;
    private Text_score_wb:eui.Label;
    private Group_wb:eui.Group;

    private score:number;
    private score_wb:number ;
    public constructor()
    {
        super();
        this.skinName = "resource/skins/game/panel/gameScoreBoardScoreUnit.exml"
    }

    public setData(score:number,score_wb:number = 0)
    {
        this.score = score;
        this.score_wb = score_wb;
        
        this.updateUI();
    }

    public updateUI_()
    {
        if(this.score > 0)
        {
            this.Text_score.textColor = Utils.RGBA2Color(255, 94, 0)
            this.Text_score.text = "+" + this.score;
        }else
        {
            this.Text_score.textColor = Utils.RGBA2Color(51, 102, 174)
            this.Text_score.text = "" + this.score;
        }
       
        if(this.score_wb == null || this.score_wb == 0)
        {
            this.Group_wb.visible = false;
        }else
        {
            this.Group_wb.visible = true;
            if(this.score_wb > 0)
            {
                // this.Text_score_wb.textColor = Utils.RGBA2Color(255, 94, 0)
                this.Text_score_wb.text = "+" + this.score_wb;
            }else
            {
                // this.Text_score_wb.textColor = Utils.RGBA2Color(51, 102, 174)
                this.Text_score_wb.text = "" + this.score_wb;
            }
        }
    }


}

window["GameScoreBoardScoreUnit"] = GameScoreBoardScoreUnit