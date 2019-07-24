module game {
	export class ClubLuckySendRecordBox extends EDialog {
		private clubData: game.ClubData
		private lbTotalAdd: eui.Label
		private lbTotalSub: eui.Label
		private scrollerTab: EScroller
		private scrollerDesc: EScroller
		private btn_close: EButton
		private dateDataList = []
		private recordsListData = []
		private selecedData = null
		private blessTotalAdd: number = 0
		private blessTotalSub: number = 0
		private groupId: number
		public constructor(clubData, groupId) {
			super(null, false)
			this.skinName = "resource/skins/club/luckyScore/ClubLuckySendRecordBox.exml"
			this.clubData = clubData
			this.groupId = groupId
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			let tempList = DateUtils.getRangeDate(-7, "more", ["", "月", "号"])
			for (let i = 0; i < tempList.length; i++) {
				let element = tempList[i]
				let data = { selected: false, days: element, daysAgo: i }
				if (i == 0) {
					data.selected = true
					let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_blessrecord,
						{
							clubId: this.clubData.clubId,
							daysAgo: data.daysAgo,
							unGrant: false,
							groupId: this.groupId
						})
					SocketManager.getInstance().send(requestDomain)
				}
				this.dateDataList.push(data)
			}
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.CLICK_CLUB_MODIFY_BLESS_RECORDS_ITEM, this.click_item, this)
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_blessrecord), this.getBlessRecords, this)

			this.addTapEvent(this.btn_close, () => { this.close() })
			this.initScroller()
		}
		private click_item(event: egret.Event) {
			let data = event.data
			this.selecedData = data
			for (let i = 0; i < this.dateDataList.length; i++) {
				this.dateDataList[i].selected = (this.dateDataList[i] == this.selecedData)
			}
			// this.updateUI()
			this.scrollerTab.updateUI()
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_blessrecord,
				{
					clubId: this.clubData.clubId,
					daysAgo: data.daysAgo,
					unGrant: false,
					groupId: this.groupId
				})
			SocketManager.getInstance().send(requestDomain)
		}
		private getBlessRecords(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				let data = msgDomain.data.blessRecords
				this.recordsListData = data
				this.blessTotalAdd = 0
				this.blessTotalSub = 0
				for (let i = 0; i < this.recordsListData.length; i++) {
					if (this.recordsListData[i].blessNum > 0) {
						this.blessTotalAdd += this.recordsListData[i].blessNum
					}
					else if (this.recordsListData[i].blessNum < 0) {
						this.blessTotalSub += this.recordsListData[i].blessNum
					}
				}
				this.blessTotalSub = Math.abs(this.blessTotalSub)
				this.updateUI()
			}
		}
		private initScroller() {
			this.scrollerTab.setElementViewInfo(64, 4)
			this.scrollerTab.setElementCreateFunction(this.createTabElement.bind(this))
			this.scrollerTab.setElementUpdateDataFun(this.updateTabElement.bind(this))
			this.scrollerTab.setElementUpdateUIFun(this.updateTabElementUI.bind(this))
			this.scrollerTab.setScrollerContent(this.dateDataList)

			this.scrollerDesc.setElementViewInfo(60, 4)
			this.scrollerDesc.setElementCreateFunction(this.createRecordsListElement.bind(this))
			this.scrollerDesc.setElementUpdateDataFun(this.updateRecordsListElement.bind(this))
			this.scrollerDesc.setElementUpdateUIFun(this.updateRecordsListElementUI.bind(this))
			this.scrollerDesc.setScrollerContent(this.recordsListData)
		}
		private createTabElement(data) {
			var item = new game.ClubLuckySendRecordDateItem(data)
			return item
		}
		private updateTabElement(item: game.ClubLuckySendRecordDateItem, data: any) {
			item.setData(data)
		}
		private updateTabElementUI(item: game.ClubLuckySendRecordDateItem) {
			item.updateUI()
		}
		private createRecordsListElement(data) {
			var item = new game.ClubLuckySendRecordListItem(data)
			return item
		}
		private updateRecordsListElement(item: game.ClubLuckySendRecordListItem, data: any) {
			item.setData(data)
		}
		private updateRecordsListElementUI(item: game.ClubLuckySendRecordListItem) {
			item.updateUI()
		}
		protected updateUI_() {
			this.scrollerDesc.clearContent()
			this.scrollerDesc.setScrollerContent(this.recordsListData)
			this.lbTotalAdd.text = "累计增加：" + this.blessTotalAdd
			this.lbTotalSub.text = "累计减少：" + this.blessTotalSub
		}
		public clean() {
			super.clean()
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.CLICK_CLUB_MODIFY_BLESS_RECORDS_ITEM, this.click_item, this)
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_blessrecord), this.getBlessRecords, this)
		}
	}
}