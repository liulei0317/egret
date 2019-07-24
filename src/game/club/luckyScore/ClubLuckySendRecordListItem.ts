module game {
	export class ClubLuckySendRecordListItem extends game.EComponent {
		private data
		private Text_time: eui.Label
		private Text_type: eui.Label
		private Text_changedValue: eui.Label
		private Text_limitValue: eui.Label
		private Text_operator: eui.Label
		public constructor(data) {
			super()
			this.data = data
			this.skinName = "resource/skins/club/luckyScore/ClubLuckySendRecordListItem.exml"
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.updateUI()
		}
		public setData(data: any) {
			this.data = data
			this.updateUI()
		}
		protected updateUI_() {
			this.Text_time.text = DateUtils.dateFormat1(this.data.createTime, true, true)
			this.Text_limitValue.text = this.data.curBlessNum
			if (this.data.blessNum > 0)
				this.Text_changedValue.text = "+" + this.data.blessNum
			else
				this.Text_changedValue.text = "" + this.data.blessNum
			GameUtils.sub(this.Text_type, this.data.fromUserName, 144)
			let fromUserName = this.Text_type.text
			GameUtils.sub(this.Text_type, this.data.toUserName, 144)
			let toUserName = this.Text_type.text

			this.Text_type.text = toUserName + "(" + this.data.toUserId + ")"
			this.Text_operator.text = fromUserName
		}
		public clean() {
			super.clean()
		}
	}
}