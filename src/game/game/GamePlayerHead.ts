class GamePlayerHead extends game.EComponent {
        private headGroup: eui.Group;

        private Image_mask:eui.Image;
        private headImg: eui.Image;
        private Text_leave: eui.Label;
        private Text_autoDelay: eui.Label;
        private bankImg: eui.Image;
        private nameLabel: eui.Label;

        private scoreGroup: eui.Group;
        private scoreLabel: eui.Label;

        private huaGroup: eui.Group;
        private huaLabel: eui.Label;

        private readyImg: eui.Image;
        private tingImg: eui.Image;
        private jyzImg: eui.Image;

        private dir: number;
        private playerInfo: game.PlayerInfo

        private jiapaiGroup:eui.Group;
        private jiaPaiBack:eui.Image;
        private jiaPaiFace:eui.Image;
        private jiaPaiValue:number;

        private leaveStatus:boolean = false;

        public constructor() {
            super();
            this.skinName = "resource/skins/game/gamePlayerHeadSkin.exml"
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.init()
        }

        private init() {
            this.headGroup.visible = true;
            this.Text_leave.visible = false;
            this.Text_autoDelay.visible = false;
            this.bankImg.visible = false;
            this.scoreGroup.visible = false;
            this.huaGroup.visible = false;
            this.readyImg.visible = false;
            this.tingImg.visible = false;
            this.jyzImg.visible = false;
            this.jiapaiGroup.visible = false
            this.Image_mask.visible = false
            if(!GlobalData.gameData.isPlayBack())
            {
                this.addTapEvent(this.huaGroup,this.clickHuaEvet)
                this.addTapEvent(this.headGroup,this.clickHeadEvent)
            }
            

        }

        private clickHeadEvent()
        {
             var hideUserInfo = GlobalData.gameData.getRoomInfo().needHideGameUserInfo()

            if (this.playerInfo.getUserId() != GlobalData.userData.getUserId())
            {
                if (!hideUserInfo)
                {
                    game.DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.personInfoOther.index,this.playerInfo)
                }
            }
            else
            {
                game.DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.personInfo.index,GlobalData.userData)
            }
        }

        private clickHuaEvet()
        {
            var flowerCardVisible = GlobalData.gameData.getFlowerCardVisible()
            GlobalData.gameData.setFlowerCardVisible(!flowerCardVisible)
            Utils.sendGameEvent(game.GameCmd.FLOWER_VISIBLE)
        }

        public setDir(dir) {
            this.dir = dir;
            if (this.dir == GameConst.PLAY_DIR.right) {
                this.tingImg.x = 170
                this.readyImg.x = 0
                this.jyzImg.x = 10
                this.jiapaiGroup.x = 16
            }
            else {
                if (this.dir != GameConst.PLAY_DIR.up)
                {
                    this.readyImg.x = 186
                }else
                {
                    this.readyImg.x = 0
                }
                this.tingImg.x = 62
                this.jyzImg.x = 170
                this.jiapaiGroup.x = 176
            }
        }

        public resetPosition(x:number,y:number)
        { 
            this.x = x - this.width/2
            this.y = y - this.height/2
        }
        
        public setData(playerInfo: game.PlayerInfo) {
            this.playerInfo = playerInfo
            this.updateUI();
        }

        protected updateUI_() {
            super.updateUI_()
            var gameStatus = GlobalData.gameData.getGameStatus();
            this.updateGameStatus(gameStatus)
            var playerStatus = this.playerInfo.getStatus()
            this.updateStatus(playerStatus)
            this.updateScore(this.playerInfo.getScore())
            this.updateAutoStatus()
            
            var ting = false
            if (this.playerInfo.getCardData() != null)
            {
                ting = this.playerInfo.getCardData().isTing()
            }
            this.updateTingStatus(ting)

            var isBanker= this.playerInfo.isBanker()
            this.bankImg.visible = isBanker

            var playerName = this.playerInfo.getUserName()
            this.nameLabel.text = playerName

            var imgUrl = this.playerInfo.getHeadIMGUrl()
            game.ResManager.loadWebImage(imgUrl,(texture:egret.Texture):void=>{
                this.headImg.texture = texture;
                 this.headImg.addEventListener(eui.UIEvent.COMPLETE,()=>{
						this.headImg.texture = texture;
					},this)
            },this)
        }

        public updateGameStatus(gameStatus)
        {
            if (gameStatus == GameConst.GAME_STATUS_TYPE.ready) {
                this.scoreGroup.visible = false
                this.huaGroup.visible = false
            }
            else if (gameStatus == GameConst.GAME_STATUS_TYPE.playing) {
                this.scoreGroup.visible = true
                this.huaGroup.visible = true
            }
            else if (gameStatus == GameConst.GAME_STATUS_TYPE.waiting) {
                this.huaGroup.visible = false
            }
        }

        public updateTingStatus(visible)
        {
             this.tingImg.visible = visible
        }

        public updateAutoStatus()
        {
             var autoStatus = GlobalData.gameData.isAutoDelay(this.dir)
            this.Text_autoDelay.visible = autoStatus
            this.Image_mask.visible = autoStatus || this.leaveStatus
        }

        public updateScore(score: number) {
            if (GlobalData.gameData.getGameStatus() != GameConst.GAME_STATUS_TYPE.ready && score == 0 && GlobalData.gameData.getRoomInfo().getRoomType() == Constants.ROOM_TYPE.jinYuanZi)
            {
                if (!this.jyzImg.visible)
                {
                    this.jyzImg.visible = true
                    this.jyzImg.scaleX = 7
                    this.jyzImg.scaleY = 7
                   this.jyzImg.alpha = 0
                   var tw = egret.Tween.get(this.jyzImg)
                   tw.to({scaleX:1,scaleY:1,alpha : 1},400,egret.Ease.getPowIn(3))
                }
            }
            else
            {
                this.jyzImg.visible = false
            }
            this.scoreLabel.text = "" + score
        }

        public updateStatus(status) {
            this.readyImg.visible = false
            this.Text_leave.visible = false
            this.Image_mask.visible = false
            this.leaveStatus = (status == GameConst.PLAYER_STATUS.OFFLINE || status == GameConst.PLAYER_STATUS.LEAVE)
            Utils.removeGrayEffect(this.headImg)
            if (status == GameConst.PLAYER_STATUS.NULL) {
                this.visible = false
            }
            else if (this.leaveStatus) {
                Utils.addGrayEffect(this.headImg)
                this.Text_leave.visible = true
            }
            this.updateAutoStatus()
            if (this.playerInfo != null) {
                var readyStatus = this.playerInfo.getReadyStatus()
                if (readyStatus == 1 && GlobalData.gameData.getGameStatus() != GameConst.GAME_STATUS_TYPE.playing) {
                    this.readyImg.visible = true
                }
            }
        }

        public updateHuaNum(num)
        {
            var color = Utils.RGBA2Color(231,83,83,255)
            if (num >= 4)
            {
                color = Utils.RGBA2Color(72,191,11,255)
            }
            this.huaLabel.textColor = color
            this.huaLabel.text = "x"+num
        }


        public setJiapaiData(value)
        {
            this.jiaPaiValue = value
            this.jiapaiGroup.visible = true
            this.changeCardFace()
        }

        public cancelJiapaiData()
        {
            this.jiapaiGroup.visible = false
        }

        public changeCardBack()
        {
            this.jiaPaiBack.source = GameUtils.getCardBack("2dmj_card_top_face{0}_png")
        }

        public changeCardFace()
        {
            this.jiaPaiFace.source = Utils.format("2dmj_cardnum_mahjong_{0}_png", Utils.getNumberFormatStr(this.jiaPaiValue))
        }
        
    }

    window["GamePlayerHead"] = GamePlayerHead