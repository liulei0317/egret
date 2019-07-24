module game {
    export class PreventCheatStatusBox extends game.EDialog {

        public constructor() {
            super(Constants.UI_PANEL_DATA_SET.preventCheatStatusBox.index, false)
            this.skinName = "resource/skins/game/panel/PreventCheatStatusBox.exml"
        }


        protected onEventHandler(event) {
            super.onEventHandler(event)
            if (this.eventId == GameCmd.CLOSE_CHEAT_INFO_BOX || this.eventId == GameCmd.CLOSE_CHEAT_STATUS_BOX) {
                this.close()
            }
        }

    }
}