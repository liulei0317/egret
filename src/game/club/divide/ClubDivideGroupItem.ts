module game {
	export class ClubDivideGroupItem extends game.EComponent {
		private tab: EToggleButton;
		private lbName: eui.Label
		private data: any
		public constructor(data) {
			super();
			this.data = data
			this.skinName = "resource/skins/club/divide/ClubDivideGroupItem.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.lbName.touchEnabled = false
			this.addTapEvent(this.tab, this.clickItem);
			this.updateUI();
		}
		public setData(data: any) {
			this.data = data
			this.updateUI();
		}
		private clickItem() {
			EAppFacade.getInstance().sendNotification(GameCmd.CLICK_CLUB_DIVIDE_TAB_ITEM, this.data);
		}
		protected updateUI_() {
			this.lbName.text = this.data.divideName
			this.tab.selected = this.data.selected
			if (!this.tab.selected) {
				this.lbName.textColor = 0x805D31
			} else {
				this.lbName.textColor = 0xFFFFFF
			}
		}
		public clean() {
			super.clean();
		}
	}
}