module game {
    export class PersonalInfoBox extends EDialog {
        private Text_diamond: eui.Label
        private Text_gold: eui.Label

        private Text_today_ratio: eui.Label
        private Text_yestoday_ratio: eui.Label
        private Text_yestodayNum: eui.Label
        private Text_todayNum: eui.Label

        private Image_head: eui.Image
        private Image_gender: eui.Image
        private Text_userName: eui.Label
        private Text_userId: eui.Label
        private Text_ip: eui.Label
        private Text_phone: eui.Label

        private Button_history: EButton
        private btnChargeRecord: EButton;
        private btnClose: EButton;
        private btn_bind_phone: EButton
        private btn_bind_identity: EButton

        private socialImg1:UploadImg;
        private socialImg2:UploadImg;


        private params: UserInfo

        private imgData:any
        public constructor(params: UserInfo) {
            super();
            this.params = params;
            this.skinName = "resource/skins/game/panel/personInfo.exml"
        }
        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.init();
            this.updateUI();
            this.addTapEvent(this.btnClose, this.close);
            this.addTapEvent(this.btnChargeRecord, this.getChargeRecord);
            this.addTapEvent(this.btn_bind_phone, this.btnBindPhoneClicked)
            this.addTapEvent(this.btn_bind_identity, this.btnBindIdClicked)
            SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_PERSON_AGAINS)
            EAppFacade.getInstance().registerCommand(GameCmd.DIAMOND_NUMBER_CHANGE, this.updateDiamondNum, this);
            EAppFacade.getInstance().registerCommand(GameCmd.GOLD_NUMBER_CHANGE, this.updateGoldNum, this);
            this.rqsData();
        }

        private rqsData()
        {
            GameHttpManager.request(GameHttpConst.url_get_head_img_data,{
                user_id : GlobalData.userData.getUserId()
            },this.rqsDataCallBack.bind(this),GameHttpConst.SIGNKEY_SOCIAL)
        }

        private rqsDataCallBack(data:any)
        {
            var msgDomain: MsgDomain = data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
                 var data = msgDomain.data
                 this.imgData = data
                 this.updateAllHeadImg()
            }
        }

        private updateAllHeadImg()
        {
            this.socialImg1.setData(this.imgData[0])
            this.socialImg2.setData(this.imgData[1])
        }

        private updateDiamondNum() {
            this.Text_diamond.text = "" + this.params.getDiamondNum()
        }

        private updateGoldNum() {
            this.Text_gold.text = "" + this.params.getGoldNum();
        }

        protected onEventHandler(evt: egret.Event) {
            super.onEventHandler(evt);
            if (this.eventId == GameCmd.PLAY_SINGLE_MESSAGE) {
                var data = this.eventData
                this.Text_yestodayNum.text = data.yesterday.gameTotal
                this.Text_yestoday_ratio.text = data.yesterday.successRate + "%"
                this.Text_todayNum.text = data.today.gameTotal
                this.Text_today_ratio.text = data.today.successRate + "%"
            }
        }

        private init() {
            this.addTapEvent(this.Button_history, this.showHistoryBox.bind(this))
        }

        private showHistoryBox() {
            DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.todayRecords.index)
        }

        public updateUI_() {
            this.updateDiamondNum();
            this.updateGoldNum();
            this.Text_userName.text = this.params.getUserName();
            this.Text_userId.text = "ID:" + this.params.getUserId();
            this.Text_ip.text = "IP:" + this.params.getIP();
            this.Text_phone.text = egret.Capabilities.os
            var isMan = this.params.getGender() == Constants.GENDER.man
            if (isMan) {
                this.Image_gender.source = "item_male_png";
            }
            else {
                this.Image_gender.source = "item_female_png";
            }
            ResManager.loadWebImage(this.params.getHeadIMGUrl(), (texture: egret.Texture): void => {
                this.Image_head.texture = texture
                this.Image_head.addEventListener(eui.UIEvent.COMPLETE, () => {
                    this.Image_head.texture = texture;
                }, this)
            }, this)
        }

        private getChargeRecord() {
            var dialog = new ChargeRecordDialog();
            DialogManager.getInstance().show(dialog);
        }
        private btnBindPhoneClicked(): void {
            var dialog = new BindPhoneBox(GlobalData.userData.getBindPhoneNumber())
            DialogManager.getInstance().show(dialog);
        }
        private btnBindIdClicked(): void {
            var dialog = new BindIdentityBox(GlobalData.userData.getIdentityCardNumber())
            DialogManager.getInstance().show(dialog);
        }
        public clean() {
            EAppFacade.getInstance().removeCommand(GameCmd.DIAMOND_NUMBER_CHANGE, this.updateDiamondNum, this);
            EAppFacade.getInstance().removeCommand(GameCmd.GOLD_NUMBER_CHANGE, this.updateGoldNum, this);
            super.clean();
        }

    }
}