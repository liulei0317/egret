module game
{
    export class RoomInfoBox extends game.EDialog
    {   
        private Button_rules:EButton
        private Button_close:EButton
        
        private Text_roomNumber:eui.Label
        private Text_turnNumber:eui.Label
        private Text_payMode:eui.Label
        private Text_roomType:eui.Label
        private Text_rules:eui.Label
        private Text_bixiahu:eui.Label

        private Text_payModeTitle:eui.Label
        public constructor()
        {
            super(Constants.UI_PANEL_DATA_SET.roomInfoBox.index);
            this.skinName = "resource/skins/game/panel/RoomInfoBoxSkin.exml";
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.init();
            this.updateUI();
        }

        private init()
        {
            if(GlobalData.clientConfigs.showCreateRoom == "0" && GameConfig.platform == GameConfig.PLATFORM_SET.weChat)
            {
                this.Text_payModeTitle.visible = false
                this.Text_payMode.visible = false
            }

            this.addTapEvent(this.Button_close,this.close)
            this.addTapEvent(this.Button_rules,this.showRulesBox)
        }

        private showRulesBox()
        {
            var ruleDialog = new game.RuleDialog();
            game.DialogManager.getInstance().show(ruleDialog);
        }

        public updateUI_()
        {
            var roomInfo = GlobalData.gameData.getRoomInfo()
            this.Text_roomNumber.text = "" + roomInfo.getRoomNum();
            this.Text_turnNumber.text = roomInfo.getTurnNumber() + roomInfo.getTurnModeDesc();
            this.Text_payMode.text = roomInfo.getPayModeDesc() 
            this.Text_roomType.text = roomInfo.getRoomTypeDesc() 
            this.Text_rules.text = roomInfo.getRulesDesc() 
            this.Text_bixiahu.text = "庄家连庄，接庄比，流局，包牌，大胡（清一色，混一色，对对胡，全球独钓，七对，杠后开花，天胡，地胡、压绝、无花果）、花杠、罚分、一炮多响"
        }
    }
}