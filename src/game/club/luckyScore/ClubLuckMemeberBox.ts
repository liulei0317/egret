module game {
	export class ClubLuckMemeberBox extends EDialog {
		private clubData: game.ClubData
		private scrollerTables: EScroller
		private leftScroller: EScroller
		private btn_close: EButton
		private btnSort0: EButton
		private btnModifyRecord: EButton
		private imgArrow0: eui.Image
		private editSearch: eui.EditableText
		private btnSearch: EButton
		private Text_desc: eui.Label
		// private memberListData: ClubLuckMemeberListData[] = []
		private isOrderDown: boolean = true

		private tableListData: ClubPartnerListData[] = []
		private memberListData: ClubPartnerMemberListData[] = []
		private modifyAnyoneSwitch: boolean = false
		private hasBlessManager: boolean = false
		private tabClickIdx: number = 0
		private curChoicePartnerGroupId: number = -1
		private curChoicePartnerGroupName: string = ""
		private isSearch: boolean = false
		private SearchString: string = ""
		private isShowOtherBelssNum: boolean
		public constructor(clubData, isShowOtherBelssNum) {
			super(null, false)
			this.skinName = "resource/skins/club/luckyScore/ClubLuckMemeberBox.exml"
			this.clubData = clubData
			this.isShowOtherBelssNum = isShowOtherBelssNum
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			EAppFacade.getInstance().registerCommand(GameCmd.CLUB_REFRESH_BLESS_INFO_LIST, this.refreshList, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_LIST), this.getGroupList, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_MEMBER_LIST), this.getGroupMemberList, this)
			//获取合伙组列表请求
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_LIST, {
				clubId: this.clubData.clubId,
				fromType: 0
			})
			SocketManager.getInstance().send(requestDomain)

			this.addTapEvent(this.btn_close, () => { this.close() })
			this.addTapEvent(this.btnSort0, this.onSortClick)
			this.addTapEvent(this.btnSearch, () => {
				let memberId = this.editSearch.text.trim()
				this.isSearch = true
				this.SearchString = memberId
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_MEMBER_LIST, {
					groupId: this.curChoicePartnerGroupId,
					fromType: 0,
					clubId: this.clubData.clubId,
					patternContent: memberId
				})
				SocketManager.getInstance().send(requestDomain)
			})
			this.addTapEvent(this.btnModifyRecord, () => {
				let dialog = new ClubLuckySendRecordBox(this.clubData, this.curChoicePartnerGroupId)
				DialogManager.getInstance().show(dialog)
			})
			this.initScroller()
		}
		private onSortClick() {
			console.log("列表排序")
			this.isOrderDown = !this.isOrderDown
			this.updateSort()
			this.scrollerTables.updateUI()
			// this.scrollerTables.setScrollerContent(this.memberListData)
		}
		private getGroupMemberList(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.memberListData = []
				let data = msgDomain.data
				for (var key in data.groupMemberList) {
					let newData = new ClubPartnerMemberListData()
					newData.parse(data.groupMemberList[key])
					this.memberListData.push(newData)
				}
				this.isOrderDown = true
				this.updateSort()
				this.scrollerTables.clearContent()
				this.scrollerTables.setScrollerContent(this.memberListData)
				if (data.groupId == -2)
					this.tabTo(null)
			}
			else {

			}
		}
		private getGroupList(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.tableListData = []
				let data = msgDomain.data
				this.modifyAnyoneSwitch = data.isMonitorMode
				this.hasBlessManager = data.hasBlessManager
				if (this.modifyAnyoneSwitch)
					this.Text_desc.text = "当前为会长管理模式"
				else
					this.Text_desc.text = "当前为合伙人管理模式"
				if (this.hasBlessManager) {
					if (this.modifyAnyoneSwitch) {
						this.tableListData.push(new ClubPartnerListData())
						this.tableListData[0].parse(
							{
								idx: 0, type: 1, name: "未设置", id: -999, isSelected: true
							})
					} else {
						this.tableListData.push(new ClubPartnerListData())
						this.tableListData[0].parse(
							{ idx: 0, type: 0, name: "管理员", id: -999, isSelected: true }
						)
						this.tableListData.push(new ClubPartnerListData())
						this.tableListData[1].parse(
							{ idx: 1, type: 1, name: "未设置", id: -999, isSelected: false }
						)
					}
				}
				for (let i = 0; i < data.oppartners.length; i++) {
					let element = data.oppartners[i]
					let newData = new ClubPartnerListData()
					newData.parse(
						{
							idx: this.tableListData.length, type: 2, name: element.nickName, id: element.id, isSelected: false
						})
					this.tableListData.push(newData)
				}
				this.leftScroller.setScrollerContent(this.tableListData)
				this.tabTo(this.tableListData[this.tabClickIdx])
			}
		}
		private refreshList(event: egret.Event) {
			let data = event.data
			let unitData = data.blessRecord
			let operData = data.operBlessRecord
			let curData = this.memberListData
			let found1 = false
			let found2 = false
			for (let key in this.memberListData) {
				if (this.memberListData[key].memberId == unitData.memberId) {
					this.memberListData[key].blessNum = unitData.blessNum
					found1 = true
				}
				else if (this.memberListData[key].memberId == operData.memberId) {
					this.memberListData[key].blessNum = operData.blessNum
					found2 = true
				}
				if (found1 && found2)
					break
			}
			// this.updateSort()
			if (typeof (operData) != "undefined" && operData != null && !this.isShowOtherBelssNum) {
				this.clubData.blessNum = operData.blessNum
				EAppFacade.getInstance().sendNotification(GameCmd.CLUB_UPDATE_BLESS_VALUE, this.clubData)
			}
			this.scrollerTables.updateUI()
		}
		private initScroller() {
			this.scrollerTables.setElementViewInfo(94, 6)
			this.scrollerTables.setElementCreateFunction(this.createElement.bind(this))
			this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this))
			this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this))

			this.leftScroller.setElementViewInfo(76, 6)
			this.leftScroller.setElementCreateFunction(this.createLeftElement.bind(this))
			this.leftScroller.setElementUpdateDataFun(this.updateLeftElement.bind(this))
			this.leftScroller.setElementUpdateUIFun(this.updateLeftElementUI.bind(this))

		}
		private createLeftElement(data: ClubPartnerListData) {
			var item = new ClubPartnerNameItem(this.clubData, data, (idx) => {
				this.tabClickIdx = idx
				for (let i = 0; i < this.tableListData.length; i++) {
					if (this.tabClickIdx == i)
						this.tableListData[i].isSelected = true
					else
						this.tableListData[i].isSelected = false
				}
				this.leftScroller.updateUI()
				this.tabTo(this.tableListData[this.tabClickIdx])
			})
			return item
		}
		private updateLeftElement(item: ClubPartnerNameItem, data: ClubPartnerListData) {
			item.setData(this.clubData, data)
		}
		private updateLeftElementUI(item: ClubPartnerNameItem) {
			item.updateUI()
		}
		private createElement(data: ClubPartnerMemberListData) {
			var item = new ClubLuckyListGeneralItem(this.clubData, data)
			return item
		}
		private updateElement(item: ClubLuckyListGeneralItem, data: ClubPartnerMemberListData) {
			item.setData(this.clubData, data)
		}
		private updateElementUI(item: ClubLuckyListGeneralItem) {
			item.updateUI()
		}
		private updateSort() {
			if (this.memberListData.length > 0) {
				this.imgArrow0.rotation = this.isOrderDown ? 0 : 180
				this.memberListData.sort((a: ClubPartnerMemberListData, b: ClubPartnerMemberListData) => {
					if ((a.userType == 1 && b.userType != 1) || (a.userType != 1 && b.userType == 1)) {
						if (a.userType == 1)
							return -1
						if (b.userType == 1)
							return 1
					}
					else if (a.blessNum != b.blessNum) {
						if (a.blessNum > b.blessNum) {
							return this.isOrderDown ? -1 : 1
						}
						if (a.blessNum < b.blessNum) {
							return this.isOrderDown ? 1 : -1
						}
					}
					else {
						if (a.memberId > b.memberId) {
							return 1
						}
						if (a.memberId < b.memberId) {
							return -1
						}
					}
					return 0
				})
			}
		}
		private tabTo(data) {
			let groupId
			if (data == null) {
				this.tabClickIdx = -1
				for (let i = 0; i < this.tableListData.length; i++) {
					this.tableListData[i].isSelected = false
				}
				this.leftScroller.clearContent()
				this.leftScroller.setScrollerContent(this.tableListData)
				return
			}
			this.isSearch = false
			this.SearchString = ""
			switch (data.type) {
				case 0:
					//设置为管理员的数据
					this.curChoicePartnerGroupId = -1
					groupId = -1
					break
				case 1:
					//设置为未设置的数据
					this.curChoicePartnerGroupId = 0
					groupId = 0
					break
				default:
					//设置为合伙组的数据
					groupId = data.id
					this.curChoicePartnerGroupId = groupId
					this.curChoicePartnerGroupName = data.nickName
					break
			}
			this.scrollerTables.clearContent()
			//获取合伙组成员列表请求
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_MEMBER_LIST, {
				clubId: this.clubData.clubId,
				groupId: groupId,
				fromType: 0
			})
			SocketManager.getInstance().send(requestDomain)
		}
		protected updateUI_() {
			if (this.clubData) {
				this.updateSort()
				this.scrollerTables.clearContent()
				this.scrollerTables.setScrollerContent(this.memberListData)
			}
		}
		public clean() {
			EAppFacade.getInstance().removeCommand(GameCmd.CLUB_REFRESH_BLESS_INFO_LIST, this.refreshList, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_LIST), this.getGroupList, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_MEMBER_LIST), this.getGroupMemberList, this)
			super.clean()
		}
	}
}