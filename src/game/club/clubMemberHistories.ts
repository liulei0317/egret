module game {
	export class clubMemberHistories extends EDialog {
		private clubData: ClubData
		private Text_not_histories: eui.Label
		private btnClose: EButton
		private myScroller: EScroller
		private logListData: any[] = null
		public constructor(clubData) {
			super(null, false)
			this.skinName = "resource/skins/club/clubMemberHistories.exml";
			this.clubData = clubData
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.addTapEvent(this.btnClose, () => {
				this.close()
			})
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_get_operLog), this.getOperateLogBack, this);
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_get_operLog, { clubId: this.clubData.clubId });
			SocketManager.getInstance().send(requestDomain);
			this.initScroller()
		}
		private getOperateLogBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.logListData = []
				this.logListData = msgDomain.data.logList
				// this.memberListData = data.blessScoreList
				this.updateUI()
			}
		}
		protected updateUI_() {
			if (this.logListData.length == 0) {
				this.Text_not_histories.visible = true
			}
			else {
				this.Text_not_histories.visible = false
			}
			this.myScroller.setScrollerContent(this.logListData)
		}
		private initScroller() {
			this.myScroller.setElementViewInfo(76, 4);
			this.myScroller.setElementCreateFunction(this.createElement.bind(this));
			this.myScroller.setElementUpdateDataFun(this.updateElement.bind(this));
			this.myScroller.setElementUpdateUIFun(this.updateElementUI.bind(this));
		}
		private createElement(data) {
			var item = new clubMemberHistoriesItem(this.clubData, data);
			return item;
		}
		private updateElement(item: clubMemberHistoriesItem, data: any) {
			item.setData(this.clubData, data);
		}
		private updateElementUI(item: clubMemberHistoriesItem) {
			item.updateUI();
		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_get_operLog), this.getOperateLogBack, this);
		}
	}
}