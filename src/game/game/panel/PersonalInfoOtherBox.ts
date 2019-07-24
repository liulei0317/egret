module game {
    export class PersonalInfoOtherBox extends EDialog {
        private Image_head: eui.Image
        private Image_gender: eui.Image
        private Text_userName: eui.Label
        private Text_userId: eui.Label
        private Text_ip: eui.Label
        private Text_location: eui.Label
        private Button_record: EButton
        private emotionGroup: eui.Group
        private btnClose: EButton

        private params: PlayerInfo;
        public constructor(params: PlayerInfo) {
            super();
            this.params = params
            this.skinName = "resource/skins/game/panel/personInfoOtherSkin.exml";
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.init();
            this.updateUI();
        }

        public onEventHandler(evt: egret.Event) {
            super.onEventHandler(evt);
            if (this.eventId == GameCmd.UPDATE_PLAYER_POSITION) {
                if (this.params == null) {
                    return
                }
                var chairId = this.params.getChairId()
                var playerInfo
                var curGameData = GlobalData.getCurGameData()

                playerInfo = curGameData.getPlayer(chairId)
                if (playerInfo != null) {
                    var address = playerInfo.getDetailAddress()
                    this.updateAddress(address)
                }
            }

        }

        private init() {
            for (var i = 0; i < 8; i++) {
                var emotion = new PersonalInfoEmotion(i + 1);
                var x = 135 * (i % 5)
                var y = 122 * Math.floor(i / 5)
                emotion.x = x;
                emotion.y = y;
                this.emotionGroup.addChild(emotion)

                emotion.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this)
                emotion.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this)
                emotion.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchCancel, this)
                emotion.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCancel, this)
            }
            this.addTapEvent(this.btnClose,this.close)
        }

        private touchBegin(e: egret.TouchEvent) {
            var target: PersonalInfoEmotion = e.currentTarget
            var index = target.getIndex()
            target.setSelected(true)
        }

        private touchCancel(e: egret.TouchEvent) {
            var target: PersonalInfoEmotion = e.currentTarget
            target.setSelected(false)
        }

        private touchEnd(e: egret.TouchEvent) {
            var target: PersonalInfoEmotion = e.currentTarget
            var index = target.getIndex()
            target.setSelected(false)
            var sendSuccess = false
            if (SceneManager.getInstance().isInGame()) {
                sendSuccess = this.sendData(index)
            }
            if (sendSuccess) {
                this.close()
            }
        }

        private sendData(idx) {
            var itemPrice = GameConst.POINT_EMOTION_PRICE[idx - 1]
            if (itemPrice > GlobalData.userData.getGoldNum()) {
                CommonView.showToast(Strings.goldNotEnough)
                return false
            }

            if(GameConst.forbid_emotion)
            {
                DialogManager.getInstance().popUp1("您已屏蔽道具功能，可在右上角设置里重新启用。")
                return false
            }

            if (GlobalData.gameData.getGameStatus() != GameConst.GAME_STATUS_TYPE.allOver) {
                SocketManager.getInstance().sendMsg(MsgConstant.GAME, MsgConstant.CMD_SEND_MSG_ANI, { toChairId: this.params.getChairId(), msgId: idx })
            }
            return true
        }

        public updateUI_() {
            this.Text_userName.text = this.params.getUserName();
            this.Text_userId.text = "ID:" + this.params.getUserId();
            this.Text_ip.text = "IP:" + this.params.getIP();
            var isMan = this.params.getGender() == Constants.GENDER.man
            if (isMan) {
                this.Image_gender.source = "item_male_png";
            }
            else {
                this.Image_gender.source = "item_female_png";
            }
            var locationInfo = this.params.getDetailAddress()
            this.updateAddress(locationInfo);
            ResManager.loadWebImage(this.params.getHeadIMGUrl(), (texture: egret.Texture): void => {
                this.Image_head.texture = texture
                this.Image_head.addEventListener(eui.UIEvent.COMPLETE,()=>{
						this.Image_head.texture = texture;
					},this)
            }, this)
        }

        private updateAddress(locationInfo) {
            if (locationInfo == null || locationInfo.length == 0) {
                locationInfo = "无法获取定位"
            }
            this.Text_location.text = locationInfo;
        }


    }
}