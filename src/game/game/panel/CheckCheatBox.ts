module game
{
    export class CheckCheatBox extends game.EDialog
    {
        private Image_rotate:eui.Image
        private Text_info:eui.Label
        public constructor()
        {
            super(Constants.UI_PANEL_DATA_SET.checkCheat.index,false);
            this.skinName = "resource/skins/game/panel/checkCheatBox.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete()
            Utils.sendPanelEvent(GameCmd.CLOSE_CHEAT_STATUS_BOX)
            this.Image_rotate.rotation = -45
            var tw = egret.Tween.get(this.Image_rotate)
            tw.to({rotation:675},2000)
            tw.call(():void=>{
                this.checkFinish()
            })
        }

        private checkFinish()
        {
            this.Text_info.text = "防作弊扫描检测完成"
            var tw = egret.Tween.get(this)
            tw.wait(1000)
            tw.call(this.finishFuc)
        }

        private finishFuc()
        {
            this.close()
            var curGameData = GlobalData.getCurGameData()
            curGameData.setNeedCheckCheat(false)
            var info = curGameData.getPreventInfo()
            //检测是否有作弊消息
            if (info != null)
            {
                //弹出防作弊框
                DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.preventCheat.index,info)
            }
            else
            {
                Utils.sendGameEvent(GameCmd.GAME_STATUS_CHANGED)
            }
        }

    }
}