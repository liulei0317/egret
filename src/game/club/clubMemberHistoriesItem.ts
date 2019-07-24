module game {
	export class clubMemberHistoriesItem extends game.EComponent {
		private clubData: game.ClubData;
		private info: eui.Label
		private logData = null
		public constructor(clubData: ClubData, data: any) {
			super()
			this.clubData = clubData
			this.logData = data
			this.skinName = "resource/skins/club/clubMemberHistoriesItem.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.updateUI()
		}
		public setData(clubData: ClubData, data: any) {
			this.clubData = clubData
			this.logData = data
			this.updateUI();
		}
		protected updateUI_() {
			if (this.logData) {
				this.info.text = "" + DateUtils.dateFormat(this.logData.recordTime) + " " + this.logData.info
			}
		}
		public clean() {
			super.clean()
		}
	}
}