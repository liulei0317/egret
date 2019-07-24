module game {
	export class ClubAddDivideMemberBox extends EDialog {
		private btn_close: EButton
		private btnSearch: EButton
		private lbInfo: eui.Label
		private editSearch: eui.EditableText
		private myScroller: EScroller
		private clubData: ClubData
		private groupData = null
		private memberListData = null
		public constructor(data, clubData) {
			super(null, false);
			this.clubData = clubData
			this.groupData = data
			this.skinName = "resource/skins/club/divide/ClubAddDivideMemberBox.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btn_close, () => { this.close() })
			this.addTapEvent(this.btnSearch, () => {
				let str = this.editSearch.text.trim()
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_divide_all_member_list,
					{
						clubId: this.clubData.clubId,
						patternContent: str,
						divideId: this.groupData.divideId,
					});
				SocketManager.getInstance().send(requestDomain);
			})
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_divide_all_member_list), this.getDivideMemberList, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_addDivideMember), this.addDivideMember, this)
			this.myScroller.setElementViewInfo(124, 6)
			this.myScroller.setElementCreateFunction(this.createElement.bind(this))
			this.myScroller.setElementUpdateDataFun(this.updateElement.bind(this))
			this.myScroller.setElementUpdateUIFun(this.updateElementUI.bind(this))
			this.updateUI();
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_divide_all_member_list,
				{
					clubId: this.clubData.clubId,
					divideId: this.groupData.divideId,
				});
			SocketManager.getInstance().send(requestDomain);
		}
		private createElement(data) {
			var item = new ClubAddDivideMemberBoxItem(this.groupData, data);
			return item;
		}

		private updateElement(item: ClubAddDivideMemberBoxItem, data: any) {
			item.setData(data);
		}

		private updateElementUI(item: ClubAddDivideMemberBoxItem) {
			item.updateUI();
		}
		private getDivideMemberList(event: egret.Event) {
			let msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				this.memberListData = msgDomain.data.memberList
				this.myScroller.clearContent()
				this.myScroller.setScrollerContent(this.memberListData)
			}
		}
		private addDivideMember(event: egret.Event) {
			let msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				for (let key in this.memberListData) {
					if (this.memberListData[key].memberId == msgDomain.data.memberId) {
						this.memberListData[key].hasDivided = true
						break
					}
				}
				this.myScroller.updateUI()
			}
		}
		protected updateUI_() {
			this.lbInfo.text = "添加成员至" + this.groupData.divideName
		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_divide_all_member_list), this.getDivideMemberList, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_addDivideMember), this.addDivideMember, this)
		}
	}
}