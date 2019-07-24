module game {
    export class TodayRecordsItem extends game.EComponent {
        private Text_time: eui.Label
        private Text_today_num: eui.Label
        private Text_winNum: eui.Label
        private Text_lose: eui.Label
        private Text_draw: eui.Label
        private Text_winner: eui.Label

        private itemData: any;

        public constructor(itemData) {
            super();
            this.itemData = itemData;
            this.skinName = "resource/skins/game/panel/todayRecordsItem.exml";
        }

        public onCreateViewComplete(): void {
            super.onCreateViewComplete();
            this.updateUI();
        }

        public setData(itemData) {
            this.itemData = itemData;
            this.updateUI();
        }

        public updateUI_() {
            this.Text_time.text = this.itemData.playTime
            this.Text_today_num.text = this.itemData.gameTotal
            this.Text_winNum.text = this.itemData.gameWin
            this.Text_lose.text = this.itemData.gameFail
            this.Text_draw.text = this.itemData.gameDraw
            this.Text_winner.text = this.itemData.winHome
        }
    }
}