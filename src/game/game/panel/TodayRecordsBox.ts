module game {
    export class TodayRecordsBox extends EDialog {
        private Button_close: EButton;
        private emptyGroup: eui.Group;
        private recordList: EScroller;

        private Text_allGameDraw: eui.Label
        private Text_mvpTimes: eui.Label
        private Text_allGameFail: eui.Label
        private Text_allGameWin: eui.Label
        private Text_allGameTotal: eui.Label

        private listData: any
        private totalData: any
        public constructor() {
            super();
            this.skinName = "resource/skins/game/panel/todayRecords.exml"
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.init()
            SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_PERSON_TOTAL_AGAINS)
        }

        protected onEventHandler(evt: egret.Event) {
            super.onEventHandler(evt);
            if (this.eventId == GameCmd.PLAY_TOTAL_MESSAGE) {
                var data = this.eventData
                if (data.length <= 0) {
                    this.emptyGroup.visible = true
                    return
                }
                else {
                    this.emptyGroup.visible = false
                    this.listData = data.userAgainsRecord
                    this.totalData = data.totalAgainsRecord
                    this.updateUI();
                }
            }
        }

        protected updateUI_() {
            this.recordList.clearContent();
            this.recordList.setScrollerContent(this.listData);

            this.Text_allGameDraw.text = this.totalData.gameDraw
            this.Text_mvpTimes.text = this.totalData.winHome
            this.Text_allGameFail.text = this.totalData.gameFail
            this.Text_allGameWin.text = this.totalData.gameWin
            this.Text_allGameTotal.text = this.totalData.gameTotal
        }

        private init() {
            this.addTapEvent(this.Button_close, this.close.bind(this));
            this.initScroller()
        }

        private initScroller() {
            this.recordList.setElementViewInfo(60, 2);
            this.recordList.setElementCreateFunction(this.createElement.bind(this));
            this.recordList.setElementUpdateDataFun(this.updateElement.bind(this));
            this.recordList.setElementUpdateUIFun(this.updateElementUI.bind(this));
        }

        private createElement(data) {

            var item = new game.TodayRecordsItem(data);
            return item;
        }

        private updateElement(item: game.TodayRecordsItem, data: any) {
            item.setData(data);
        }

        private updateElementUI(item: game.TodayRecordsItem) {
            item.updateUI();
        }
    }

}