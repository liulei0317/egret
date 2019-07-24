class GameCenterNode extends GameCenterBaseNode
{
    private center_line_1: eui.Image;
    private center_line_2: eui.Image;
    private center_line_3: eui.Image;
    private center_line_4: eui.Image;
    private lineNode: eui.Image[]
    public constructor()
    {
        super("resource/skins/game/gameCenterNodeSkin.exml");
    }
    protected initCenterNode() {
        super.initCenterNode()
        this.lineNode = [this.center_line_1, this.center_line_2, this.center_line_3, this.center_line_4]
    }

    protected updateCenterNode() {
        super.updateCenterNode()
        if (this.status == GameConst.GAME_STATUS_TYPE.waiting) {
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                this.lineNode[i].visible = true
            }
        }
    }

    public updateDirArrow(clientId) {
        super.updateDirArrow(clientId)
        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            this.lineNode[i].visible = i != clientId
        }
    }

    protected playEffect(clientId:number)
    {
        this.gs.getEffectLayer().playDirArrow(clientId, this.center_dir_effect)
    }



    protected updateDir() {
        super.updateDir()
        var eastChairId = GlobalData.gameData.getEastChairId()
        var eastClientId = GlobalData.gameData.changeChairIdToClientId(eastChairId)

        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            var direct = ((i - eastClientId) + GameConst.maxPlayerNum) % GameConst.maxPlayerNum + 1
            var darkFengName = "feng" + direct + "_png"
            var fengName = "nowFeng" + direct + "_png"
            this.fengNode[i].source = fengName
            this.darkFengNode[i].source = darkFengName
            this.darkFengNode[i].visible = true
        }
    }

}
window["GameCenterNode"] = GameCenterNode