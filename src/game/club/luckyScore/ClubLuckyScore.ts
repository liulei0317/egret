class ClubLuckyScore extends game.EComponent {
	private scrollerTables: EScroller
	private clubData: game.ClubData
	private ClubBlessChangeRecordList: game.ClubBlessChangedRecordsData[] = []
	private OneClubBlessChangeRecordList: game.ClubBlessChangedRecordsData[] = []
	private curList: game.ClubBlessChangedRecordsData[] = []
	public constructor() {
		super()
		this.skinName = "resource/skins/club/luckyScore/ClubLuckyScore.exml"
	}
	public onCreateViewComplete(): void {
		super.onCreateViewComplete()
		game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_myblessnum), this.getMyBlessDataCallBack, this)
		game.EAppFacade.getInstance().registerCommand(game.GameCmd.CLICK_CLUB_Bless, this.getMyBless, this)
		game.EAppFacade.getInstance().registerCommand(game.GameCmd.CLUB_REFRESH_BLESS_LIST, this.updateList, this)
		game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_Combat_REPLAY_data), this.getCombatReplayDataCallback, this)
		this.initScroller()
	}
	private updateList(event: egret.Event) {
		if (event.data != null) {
			this.OneClubBlessChangeRecordList = []
			for (let key in event.data.blessChangeRecords) {
				let element = event.data.blessChangeRecords[key]
				let data = new game.ClubBlessChangedRecordsData()
				data.parse(element)
				this.OneClubBlessChangeRecordList.push(data)
			}
			this.curList = this.OneClubBlessChangeRecordList
			this.updateUI()
		}
	}
	private getMyBless(event: egret.Event) {
		if (event.data != null) {
			var data = event.data
			this.clubData = data
			game.ClubService.getInstance().getMyBlessNumber(this.clubData.clubId)
		}
	}
	private getMyBlessDataCallBack(event: egret.Event) {
		var msgDomain: game.MsgDomain = event.data
		if (msgDomain.code == game.CmdResultType.SUCCESS) {
			this.ClubBlessChangeRecordList = []
			this.clubData.blessNum = msgDomain.data.blessNum
			for (let key in msgDomain.data.blessChangeRecords) {
				let element = msgDomain.data.blessChangeRecords[key]
				let data = new game.ClubBlessChangedRecordsData()
				data.parse(element)
				this.ClubBlessChangeRecordList.push(data)
			}
			this.curList = this.ClubBlessChangeRecordList
			game.EAppFacade.getInstance().sendNotification(game.GameCmd.CLUB_UPDATE_BLESS_VALUE, this.clubData)
			this.updateUI()
		}
	}
	private getCombatReplayDataCallback(event: egret.Event) {
		game.CommonView.hideWaiting()
		var msgDomain: game.MsgDomain = event.data
		if (msgDomain.code == game.CmdResultType.SUCCESS) {
			var data = msgDomain.data
			//显示大结算界面
			GlobalData.gameData.setAllOverData(data)
			game.DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.gameOverBox.index, { isFromReplay: true })
		}
	}
	protected updateUI_() {
		if (this.clubData) {
			this.scrollerTables.clearContent()
			this.scrollerTables.setScrollerContent(this.curList)
		}
	}
	private initScroller() {
		this.scrollerTables.setElementViewInfo(60, 4)
		this.scrollerTables.setElementCreateFunction(this.createElement.bind(this))
		this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this))
		this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this))
	}
	private createElement(data) {
		var item = new game.ClubLuckySendRecordListItem2(data)
		return item
	}
	private updateElement(item: game.ClubLuckySendRecordListItem2, data: any) {
		item.setData(data)
	}
	private updateElementUI(item: game.ClubLuckySendRecordListItem2) {
		item.updateUI()
	}
	public clean() {
		game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_myblessnum), this.getMyBlessDataCallBack, this)
		game.EAppFacade.getInstance().removeCommand(game.GameCmd.CLICK_CLUB_Bless, this.getMyBless, this)
		game.EAppFacade.getInstance().removeCommand(game.GameCmd.CLUB_REFRESH_BLESS_LIST, this.updateList, this)
		game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_Combat_REPLAY_data), this.getCombatReplayDataCallback, this)
		super.clean()
	}
}