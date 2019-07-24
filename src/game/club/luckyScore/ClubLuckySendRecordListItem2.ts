module game {
	export class ClubLuckySendRecordListItem2 extends game.EComponent {
		private data
		private Text_time: eui.Label
		private Text_type: eui.Label
		private Text_changedValue: eui.Label
		private Text_limitValue: eui.Label
		private Text_operator: eui.Label
		public constructor(data) {
			super()
			this.data = data
			this.skinName = "resource/skins/club/luckyScore/ClubLuckySendRecordListItem2.exml"
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.addTapEvent(this, () => {
				let roomId = this.data.operId
				let source = this.data.source
				if (typeof (roomId) != "undefined" && roomId != null) {
					switch (source) {
						case 2:
						case 3:
						case 4:
						case 6:
							let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_Combat_REPLAY_data, { roomId: roomId })
							SocketManager.getInstance().send(requestDomain)
							break;
					}
				}
			})
			this.updateUI()
		}
		public setData(data: any) {
			this.data = data
			this.updateUI()
		}
		protected updateUI_() {
			this.Text_time.text = DateUtils.dateFormat1(this.data.createTime, true, false)
			this.Text_limitValue.text = this.data.curBlessNum
			if (this.data.changeNum > 0)
				this.Text_changedValue.text = "+" + this.data.changeNum
			else
				this.Text_changedValue.text = "" + this.data.changeNum

			this.Text_type.text = this.data.operTypeInfo
			if (this.data.source == 2 || this.data.source == 3 || this.data.source == 4 || this.data.source == 6) {
				this.Text_operator.text = "房间号：" + this.data.operName
			}
			else {
				this.Text_operator.text = this.data.operName
			}
		}
		public clean() {
			super.clean()
		}
	}
}