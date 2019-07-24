module game {
	export class ClubLuckySendRecordDateItem extends game.EComponent {
		// private clubData: game.ClubData;
		// private imgHead: eui.Image;
		// private lbName: eui.Label;
		// private lbID: eui.Label;
		// private lbBless: eui.Label;
		// private lbIsOnline: eui.Label;
		// private btnModify: EButton;
		// private listData: any;
		private tab: EToggleButton;

		private lbDate: eui.Label
		private data: any
		public constructor(dateData) {
			super();
			// this.clubData = clubData
			// this.listData = blessRecordData
			this.data = dateData
			this.skinName = "resource/skins/club/luckyScore/ClubLuckySendRecordDateItem.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.tab, this.clickItem);
			this.lbDate.touchEnabled = false
			this.updateUI();
		}
		public setData(dateData: any) {
			// this.clubData = clubData;
			// this.listData = data;
			this.updateUI();
		}
		private clickItem() {
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_CLUB_MODIFY_BLESS_RECORDS_ITEM, this.data);
		}
		protected updateUI_() {
			this.lbDate.text = this.data.days
			this.tab.selected = this.data.selected
			if (!this.tab.selected) {
				this.lbDate.strokeColor = 0xF4D6A3
				this.lbDate.textColor = 0x805D31
				this.lbDate.stroke = 0
			} else {
				this.lbDate.strokeColor = 0xBB5D41
				this.lbDate.textColor = 0xFFFFFF
				this.lbDate.stroke = 2
			}
		}
		public clean() {
			super.clean();
		}
	}
}