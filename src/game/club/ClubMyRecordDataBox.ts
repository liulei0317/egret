module game {
	export class ClubMyRecordDataItem extends EComponent {
		private data: any
		private Text_time: eui.Label
		private Text_total_num: eui.Label
		private Text_other_num: eui.Label
		public constructor(data: any) {
			super()
			this.skinName = "resource/skins/club/clubMyRecordDataItem.exml"
			this.data = data
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
			this.Text_total_num.text = this.data.totalNum
			this.Text_other_num.text = this.data.validNum
			this.Text_time.text = this.data.curDate
		}
		public clean() {
			super.clean()
		}
	}
}
module game {
	export class ClubMyRecordDataBox extends EDialog {
		private clubData: ClubData
		private btnClose: EButton
		private scroller: EScroller
		public constructor(data: ClubData) {
			super(null, false)
			this.skinName = "resource/skins/club/clubMyRecordDataBox.exml"
			this.clubData = data
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_MY_RECORD_DATA), this.getMyRecordList, this)
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_MY_RECORD_DATA, {
				clubId: this.clubData.clubId,
			})
			SocketManager.getInstance().send(requestDomain)
			this.addTapEvent(this.btnClose, () => {
				this.close()
			})
			this.scroller.setElementViewInfo(64, 4)
			this.scroller.setElementCreateFunction((data: any) => {
				let item = new ClubMyRecordDataItem(data)
				return item
			})
			this.scroller.setElementUpdateDataFun((item: any, data: any) => {
				item.setData(data)
			})
			this.scroller.setElementUpdateUIFun((item: any) => {
				item.updateUI()
			})
		}
		private getMyRecordList(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.scroller.setScrollerContent(msgDomain.data.clubAgainsRecords)
			}
		}
		protected updateUI_() {

		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_MY_RECORD_DATA), this.getMyRecordList, this)
		}
	}
}