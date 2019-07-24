class GameOverUserItem extends game.EComponent {

    private Image_bg: eui.Image
    private Image_baomi: eui.Image
    private Image_homer: eui.Image
    private Image_myself: eui.Image
    private Image_head: eui.Image

    private Image_type: eui.Image

    private Image_applyQuit: eui.Image

    private Image_flag_record: eui.Image
    private btn: EButton


    private Text_userName: eui.Label
    private Text_userId: eui.Label
    private Text_score: eui.Label
    private Text_score_wb: eui.Label
    private Text_count: eui.Label
    private allData: any;
    private data: any;
    private roomInfo: any;

    private orderNumner: number;
    public constructor() {
        super();
        this.skinName = "resource/skins/game/panel/GameOverUserItemSkin.exml";
    }
    public onCreateViewComplete() {
        super.onCreateViewComplete()
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_SIGN_HASVIEW), this.signHasViewCallBack, this)

        this.addTapEvent(this.btn, () => {
            let requestDomain = game.DomainUtils.getRequestDomain(game.MsgConstant.HALL, game.MsgConstant.CMD_SIGN_HASVIEW,
                {
                    roomId: this.roomInfo.roomId,
                    userId: this.data.userId,
                    index: this.data.index,
                    clubId: this.roomInfo.clubId
                });
            game.SocketManager.getInstance().send(requestDomain)
        })
    }
    private signHasViewCallBack(event: egret.Event) {
        let msgDomain: game.MsgDomain = event.data;
        if (msgDomain.code == game.CmdResultType.SUCCESS) {
            if (this.data == null) return
            let data = msgDomain.data
            let index = data.index
            let roomId = data.roomId
            if (index == this.data.index) {
                if (roomId != this.roomInfo.roomId)
                    return
                let hasView = data.hasView
                let hasAllView = data.hasAllView
                this.flagRecord(hasView)
                game.EAppFacade.getInstance().sendNotification(game.GameCmd.MODIFY_HAS_VIEW_STATUS, { roomId: roomId, hasAllView: hasAllView })
            }
        }
    }
    public setData(order, data, allOverData) {
        this.orderNumner = order
        this.data = data;
        this.allData = allOverData
        this.roomInfo = allOverData.msgRoom
        if (this.data != null)
            this.updateUI();
    }
    public clean() {
        super.clean()
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_SIGN_HASVIEW), this.signHasViewCallBack, this)
    }
    private flagRecord(hasView) {
        if (!this.allData.canSignHasView) {
            this.btn.visible = false
            this.Image_flag_record.visible = false
        }
        else {
            this.btn.visible = true
            this.Image_flag_record.visible = !hasView
        }
    }
    public updateUI_() {
        this.flagRecord(this.data.hasView)
        this.Image_applyQuit.visible = false
        this.Image_type.visible = false
        this.Image_applyQuit.source = "gameOver_json.over_djs_dismiss_" + this.orderNumner + "_png"
        if (this.data.dismissStatus == 1) {
            this.Image_applyQuit.visible = true
            this.Image_type.visible = true
            this.Image_type.source = "gameOver_json.over_img_nj_settle_dissolve_agree_png"
        }
        else if (this.data.dismissStatus == 2) {
            this.Image_applyQuit.visible = true
            this.Image_type.visible = true
            this.Image_type.source = "gameOver_json.over_img_nj_settle_dissolver_png"
        }
        this.Image_bg.source = "btn_nj_settle_rankbg_" + this.orderNumner + "_png"
        this.Image_baomi.visible = this.data.baoMi
        this.Image_homer.visible = this.data.master
        this.Image_myself.visible = this.data.userId == GlobalData.userData.getUserId()
        game.ResManager.loadWebImage(this.data.headImgUrl, (texture: egret.Texture): void => {
            this.Image_head.texture = texture
            this.Image_head.addEventListener(eui.UIEvent.COMPLETE, () => {
                this.Image_head.texture = texture;
            }, this)
        }, this)
        this.Text_userName.text = this.data.userName
        this.Text_userId.text = "ID:" + this.data.userId

        if (this.data.score > 0) {
            this.Text_score.text = "+" + this.data.score
            this.Text_score.textColor = Utils.RGBA2Color(255, 197, 0);
        } else {
            this.Text_score.text = this.data.score
            this.Text_score.textColor = Utils.RGBA2Color(136, 180, 243);
        }

        if (this.data.waibaoFen > 0) {
            this.Text_score_wb.text = "+" + this.data.waibaoFen
            this.Text_score_wb.textColor = Utils.RGBA2Color(255, 197, 0);
        } else {
            this.Text_score_wb.text = this.data.waibaoFen
            this.Text_score_wb.textColor = Utils.RGBA2Color(136, 180, 243);
        }
        if (this.data.showCalNum != null && this.data.showCalNum) {
            this.Text_count.visible = true;
            if (this.data.calNum > 0) {
                this.Text_count.text = "+" + this.data.calNum
                this.Text_count.textColor = Utils.RGBA2Color(255, 197, 0);
            } else {
                this.Text_count.text = this.data.calNum
                this.Text_count.textColor = Utils.RGBA2Color(136, 180, 243);
            }
        } else {
            this.Text_count.visible = false;
        }
    }
}
window["GameOverUserItem"] = GameOverUserItem