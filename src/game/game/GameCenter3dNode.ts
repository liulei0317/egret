class GameCenter3dNode extends GameCenterBaseNode
{
    private center_line_1: eui.Image;
    private center_line_2: eui.Image;
    private center_line_3: eui.Image;
    private center_line_4: eui.Image;
    public constructor()
    {
        super("resource/skins/game/gameCenterNode3dSkin.exml");
    }
    protected initCenterNode() {
        super.initCenterNode()
    }

    protected updateCenterNode() {
        super.updateCenterNode()
    }

    public updateDirArrow(clientId) {
        super.updateDirArrow(clientId)
    }

    protected playEffect(clientId:number)
    {
        this.gs.getEffectLayer().play3dDirArrow(clientId, this.center_dir_effect)
    }



    protected updateDir() {
        super.updateDir()
        var eastChairId = GlobalData.gameData.getEastChairId()
        var eastClientId = GlobalData.gameData.changeChairIdToClientId(eastChairId)

        for (var i = 0; i < GameConst.maxPlayerNum; i++) {
            var direct = ((i - eastClientId) + GameConst.maxPlayerNum) % GameConst.maxPlayerNum + 1
            var darkFengName = "3d_feng" + direct + "_png"
            var fengName = "3d_nowFeng" + direct + "_png"
            this.fengNode[i].source = fengName
            this.darkFengNode[i].source = darkFengName
            this.darkFengNode[i].visible = true
        }
    }

}
window["GameCenter3dNode"] = GameCenter3dNode