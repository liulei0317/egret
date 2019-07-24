class GameSettleUserInfo extends game.EComponent {
    private Image_head: eui.Image;
    private Image_myself: eui.Image;
    private Image_homer: eui.Image;
    private Image_banker: eui.Image;
    private Text_userName: eui.Label;
    private Text_score: eui.Label;
    private Text_fafen: eui.Label;
    private Text_wb: eui.Label;
    private Image_yipaoduoxiang: eui.Image;
    private Image_sanbao: eui.Image;
    private Image_genhu: eui.Image;

    private data: any;
    private bankerChairId: number
    private sanbao: boolean;
    private doublekill: boolean;
    private genhu: boolean;

    private cardGroup:eui.Group

    public constructor() {
        super();
        this.skinName = "resource/skins/game/panel/GameSette_UserInfoSkin.exml"
    }

    public setData(data, params: any) {
        this.data = data;
        this.bankerChairId = params.bankerChairId
        this.sanbao = params.sanbao
        this.doublekill = params.doublekill
        this.genhu = params.genhu
        this.updateUI();
    }

    public updateUI_() {
        game.ResManager.loadWebImage(this.data.msgUser.headImgUrl, (texture: egret.Texture): void => {
            this.Image_head.texture = texture
            this.Image_head.addEventListener(eui.UIEvent.COMPLETE,()=>{
						this.Image_head.texture = texture;
					},this)
        }, this)

        this.Image_myself.visible = GlobalData.userData.getUserId() == this.data.msgUser.userId
        this.Image_homer.visible = false
        this.Image_banker.visible = this.bankerChairId == this.data.userChairId
        this.Text_userName.text = this.data.msgUser.nickName
        if (this.data.curScore > 0) {
            this.Text_score.text = "+" + this.data.curScore
            this.Text_score.textColor = Utils.RGBA2Color(255, 197, 0)
        } else {
            this.Text_score.text = this.data.curScore
            this.Text_score.textColor = Utils.RGBA2Color(136, 180, 243)
        }

        if (this.data.faScore > 0) {
            this.Text_fafen.text = "+" + this.data.faScore
            this.Text_fafen.textColor = Utils.RGBA2Color(255, 197, 0)
        } else {
            this.Text_fafen.text = this.data.faScore
            this.Text_fafen.textColor = Utils.RGBA2Color(136, 180, 243)
        }

        if (this.data.waibaoScore > 0) {
            this.Text_wb.text = "+" + this.data.waibaoScore
            this.Text_wb.textColor = Utils.RGBA2Color(255, 197, 0)
        } else {
            this.Text_wb.text =  this.data.waibaoScore
            this.Text_wb.textColor = Utils.RGBA2Color(136, 180, 243)
        }


        this.Image_sanbao.visible = this.sanbao
        this.Image_yipaoduoxiang.visible = this.doublekill
        this.Image_genhu.visible = this.genhu


        this.showCard(this.data.heapInfos)
    }

    private showCard(cardInfo)
    {
        // majongs.direction = data.xJSUserInfos[i].heapInfos[x].direction
        // majongs.gain = data.xJSUserInfos[i].heapInfos[x].gain
        // majongs.values = data.xJSUserInfos[i].heapInfos[x].tileIds

        if (cardInfo == null )
        {
            return
        }
        var temp_p = 0
        var pongKongAndHandGapIndex = 0
        var startX = 0
        var curX = 0
        var scale = 0.60
        this.cardGroup.scaleX = scale
        this.cardGroup.scaleY = scale
        var needGap = false
        for (var i = 0; i < cardInfo.length;i++) 
        {
            var tempCardInfo = cardInfo[i]

            var gain = tempCardInfo.gain
            if (gain)
            {
                var type = GameConst.GAIN_TYPE.PONG
                if (tempCardInfo.tileIds.length == 4)
                {
                    if(tempCardInfo.direction == 0)
                    {
                        type = GameConst.GAIN_TYPE.ConcealedKong
                    }else
                    {
                        type = GameConst.GAIN_TYPE.Exposed
                    }
                }
                var params = {type : type,provideClientId : tempCardInfo.direction,value : tempCardInfo.tileIds[0]}
                var pongKongData = new game.PongKongData(params)
                var nodePath = Constants.UI_GAME_CSB_PATH + GameConst.CARD_DATA.PONG_KONG_CARD[GameConst.ME_DIR].path
                var w = 240
                if(tempCardInfo.direction == GameConst.ME_DIR || tempCardInfo.direction == GameConst.PLAY_DIR.up)
                {
                    w = 230
                    curX = curX-10
                }

                if(tempCardInfo.direction == GameConst.PLAY_DIR.right)
                {
                    w = 240
                    curX = curX-10
                }else if(tempCardInfo.direction == GameConst.PLAY_DIR.left)
                {
                    w = 230
                }
                var p = {x:curX,y:0}
                var pongKongNode = new game.PongKongCardNode(nodePath,pongKongData,GameConst.ME_DIR,0,p)
                this.cardGroup.addChild(pongKongNode)
                curX = curX + w 
                curX = curX + 5
                needGap = true
            }else
            {
                for (var j = 0;j < tempCardInfo.tileIds.length;j++)
                {
                    var nodePath = Constants.UI_GAME_CSB_PATH + GameConst.CARD_DATA.OUT_CARD[GameConst.ME_DIR].path
                    if(needGap)
                    {
                        needGap = false
                        curX = curX + 10
                    }
                    var p = {x:curX,y:0}
                    var handCard = new game.PongKongPerNode(tempCardInfo.tileIds[j],p );
                    this.cardGroup.addChild(handCard)
                    curX = curX + 74
                }
                curX = curX + 5

               
                
            }

        }
    }


}

window["GameSettleUserInfo"] = GameSettleUserInfo