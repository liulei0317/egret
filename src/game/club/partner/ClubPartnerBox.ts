module game {
	export class ClubPartnerBox extends EDialog {
		private clubData: game.ClubData
		private scrollerTables: EScroller
		private leftScroller: EScroller
		private btn_close: EButton
		private btnModifyRecord: EButton
		private editSearch: eui.EditableText
		private btnSearch: EButton
		private Text_desc: eui.Label
		private Button_batch_of_belonging: EButton
		private Button_add_partnerGroup: EButton
		private Button_delete_partnerGroup: EButton
		private Button_modify_name: EButton

		private Group_memberTitle_admin: eui.Group
		private Group_memberTitle_unSet: eui.Group
		private Group_unset_luckyTitle: eui.Group
		private Group_admin_luckyTitle: eui.Group
		private btnSort_unSet: EButton
		private btnSort_admin: EButton
		private imgArrow_unSet: eui.Image
		private imgArrow_admin: eui.Image

		private isOrderDown: boolean = true
		private tableListData: ClubPartnerListData[] = []
		private onlyGourpData: ClubPartnerListData[] = []
		private memberListData: ClubPartnerMemberListData[] = []
		private modifyAnyoneSwitch: boolean = false
		private hasBlessManager: boolean = false
		private tabClickIdx: number = 0
		private curChoicePartnerGroupId: number = -1
		private curChoicePartnerGroupName: string = ""
		private isSearch: boolean = false
		private SearchString: string = ""
		public selectedCount: number = 0
		public constructor(clubData, superBlessSwitch) {
			super(null, false)
			this.skinName = "resource/skins/club/partner/clubPartnerBox.exml"
			this.clubData = clubData
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			EAppFacade.getInstance().registerCommand(GameCmd.CLUB_REFRESH_BLESS_INFO_LIST, this.refreshList, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_LIST), this.getGroupList, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_MEMBER_LIST), this.getGroupMemberList, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_ADD), this.addGroupCallBack, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_DEL), this.deleteGroupCallBack, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_MODIFYGROUPNAME), this.modifyGroupNameCallBack, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_BATCH_SETTING), this.batchSettingCallBack, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_MEMBER_DEL), this.batchSettingCallBack, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_SET_MANAGER), this.batchSettingCallBack, this)

			this.Group_unset_luckyTitle.visible = this.clubData.superBlessSwitch
			this.Group_admin_luckyTitle.visible = this.clubData.superBlessSwitch
			//获取合伙组列表请求
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_LIST, {
				clubId: this.clubData.clubId,
				fromType: 1
			})
			SocketManager.getInstance().send(requestDomain)

			this.addTapEvent(this.btn_close, () => { this.close() })
			this.addTapEvent(this.btnSort_unSet, this.onSortClick)
			this.addTapEvent(this.btnSort_admin, this.onSortClick)
			this.addTapEvent(this.btnSearch, () => {
				let memberId = this.editSearch.text.trim()
				this.isSearch = true
				this.SearchString = memberId
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_MEMBER_LIST, {
					groupId: this.curChoicePartnerGroupId,
					fromType: 1,
					clubId: this.clubData.clubId,
					patternContent: memberId
				})
				SocketManager.getInstance().send(requestDomain)
			})
			this.addTapEvent(this.Button_batch_of_belonging, () => {
				if (this.selectedCount == 0) {
					DialogManager.getInstance().popUp1("请先选择玩家")
					return
				}
				let members = []
				for (let i = 0; i < this.memberListData.length; i++) {
					let element = this.memberListData[i]
					let data = { nickName: "", id: 0, blessNum: 0 }
					if (element.isSelected) {
						data.nickName = element.nickName
						data.id = element.memberId
						data.blessNum = element.blessNum
						members.push(data)
					}
				}

				let data = {
					clubId: this.clubData.clubId,
					member: members,
					curGroup: {
						groupId: 1,
						groupName: ""
					},
					group: this.onlyGourpData,
					modifyAnyoneSwitch: this.modifyAnyoneSwitch
				}
				if (this.curChoicePartnerGroupId == -1) {
					//未设置玩家的数据
					data.curGroup.groupName = ""
					data.curGroup.groupId = -1
				}
				else {
					//某一分组玩家数据
					data.curGroup.groupName = this.curChoicePartnerGroupName
					data.curGroup.groupId = this.curChoicePartnerGroupId
				}
				let dialog = new ClubSetBelongToBox(data)
				DialogManager.getInstance().show(dialog)
			})
			this.addTapEvent(this.Button_add_partnerGroup, () => {
				let dialog = DialogManager.getInstance().show(new ClubAddGroupBox(this.clubData.clubId))
			})
			this.addTapEvent(this.Button_delete_partnerGroup, () => {
				DialogManager.getInstance().popUp2("您确认删除当前合伙组吗？", () => {
					let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_DEL, {
						groupId: this.curChoicePartnerGroupId,
						clubId: this.clubData.clubId,
					})
					SocketManager.getInstance().send(requestDomain)
				})
			})
			this.addTapEvent(this.Button_modify_name, () => {
				let dialog = DialogManager.getInstance().show(new ClubModifyGroupNameBox(this.clubData.clubId, this.curChoicePartnerGroupId, this.curChoicePartnerGroupName))
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
				this.selectedCount = 0
				let data = msgDomain.data
				for (var key in data.groupMemberList) {
					let newData = new ClubPartnerMemberListData()
					newData.parse(data.groupMemberList[key])
					this.memberListData.push(newData)
				}
				this.isOrderDown = true
				this.updateSort()
				if (data.groupId == -2)
					this.tabTo(null)
				this.scrollerTables.clearContent()
				this.scrollerTables.setScrollerContent(this.memberListData)
			}
			else {

			}
		}
		private getGroupList(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.onlyGourpData = []
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
								idx: 0, type: 1, name: "未设置", id: -999, isSelected: (this.tabClickIdx == 0)
							})
					} else {
						this.tableListData.push(new ClubPartnerListData())
						this.tableListData[0].parse(
							{ idx: 0, type: 0, name: "管理员", id: -999, isSelected: (this.tabClickIdx == 0) }
						)
						this.tableListData.push(new ClubPartnerListData())
						this.tableListData[1].parse(
							{ idx: 1, type: 1, name: "未设置", id: -999, isSelected: (this.tabClickIdx == 1) }
						)
					}
				}
				for (let i = 0; i < data.oppartners.length; i++) {
					let element = data.oppartners[i]
					let newData = new ClubPartnerListData()
					newData.parse(
						{
							idx: this.tableListData.length, type: 2, name: element.nickName, id: element.id, isSelected: (this.tabClickIdx == this.tableListData.length)
						})
					this.tableListData.push(newData)
					this.onlyGourpData.push(newData)
				}
				this.leftScroller.setScrollerContent(this.tableListData)
				this.tabTo(this.tableListData[this.tabClickIdx])
			}
		}
		private addGroupCallBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				//获取合伙组列表请求
				CommonView.showToast("添加成功")
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_LIST, {
					clubId: this.clubData.clubId,
					fromType: 1
				})
				SocketManager.getInstance().send(requestDomain)
			}
		}
		private deleteGroupCallBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.tabClickIdx--
				//获取合伙组列表请求
				CommonView.showToast("删除成功")
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_LIST, {
					clubId: this.clubData.clubId,
					fromType: 1
				})
				SocketManager.getInstance().send(requestDomain)
			}
		}
		private modifyGroupNameCallBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				//获取合伙组列表请求
				CommonView.showToast("修改成功")
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_LIST, {
					clubId: this.clubData.clubId,
					fromType: 1
				})
				SocketManager.getInstance().send(requestDomain)
			}
		}
		private batchSettingCallBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				let data
				if (this.isSearch) {
					data = {
						clubId: this.clubData.clubId,
						groupId: this.curChoicePartnerGroupId,
						fromType: 1,
						patternContent: this.SearchString
					}
				}
				else {
					data = {
						clubId: this.clubData.clubId,
						groupId: this.curChoicePartnerGroupId,
						fromType: 1
					}
				}
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_MEMBER_LIST, data)
				SocketManager.getInstance().send(requestDomain)
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
			this.scrollerTables.updateUI()
		}
		private initScroller() {
			// this.scrollerTables.setElementViewInfo(94, 6)
			// this.scrollerTables.setElementCreateFunction(this.createElement.bind(this))
			// this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this))
			// this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this))

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
			var item = new ClubLuckyListGeneralItem2(this.clubData, data)
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
				let img
				if (this.Group_memberTitle_admin.visible)
					img = this.imgArrow_admin
				else
					img = this.imgArrow_unSet
				img.rotation = this.isOrderDown ? 0 : 180
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
				this.Button_batch_of_belonging.visible = false
				this.leftScroller.clearContent()
				this.leftScroller.setScrollerContent(this.tableListData)
				this.Group_memberTitle_unSet.visible = true
				this.Group_memberTitle_admin.visible = false
				this.scrollerTables.setElementViewInfo(94, 6)
				this.scrollerTables.setElementCreateFunction((data: ClubPartnerMemberListData) => {
					let item = new ClubLuckyListGeneralItemBySelect(this.clubData, data, this.onlyGourpData, this.modifyAnyoneSwitch)
					item.setObj(this)
					return item
				})
				this.scrollerTables.setElementUpdateDataFun((item: ClubLuckyListGeneralItemBySelect, data: ClubPartnerMemberListData) => {
					item.setData(this.clubData, data)
				})
				this.scrollerTables.setElementUpdateUIFun((item: ClubLuckyListGeneralItemBySelect) => {
					item.updateUI()
				})
				return
			}
			this.isSearch = false
			this.SearchString = ""
			switch (data.type) {
				case 0:
					//设置为管理员的数据
					this.curChoicePartnerGroupId = -1
					groupId = -1
					//按钮显示隐藏
					this.Button_add_partnerGroup.visible = true
					this.Button_delete_partnerGroup.visible = false
					this.Button_batch_of_belonging.visible = false
					this.Button_modify_name.visible = false
					//////////////////////////////
					this.scrollerTables.setElementViewInfo(94, 6)
					this.scrollerTables.setElementCreateFunction((data: ClubPartnerMemberListData) => {
						let item = new ClubLuckyListGeneralItem2(this.clubData, data)
						return item
					})
					this.scrollerTables.setElementUpdateDataFun((item: ClubLuckyListGeneralItem2, data: ClubPartnerMemberListData) => {
						item.setData(this.clubData, data)
					})
					this.scrollerTables.setElementUpdateUIFun((item: ClubLuckyListGeneralItem2) => {
						item.updateUI()
					})
					this.Group_memberTitle_unSet.visible = false
					this.Group_memberTitle_admin.visible = true
					break
				case 1:
					//设置为未设置的数据
					this.curChoicePartnerGroupId = 0
					groupId = 0
					//按钮显示隐藏
					this.Button_add_partnerGroup.visible = true
					this.Button_delete_partnerGroup.visible = false
					this.Button_batch_of_belonging.visible = true
					this.Button_modify_name.visible = false
					//////////////////////////////
					this.scrollerTables.setElementViewInfo(94, 6)
					this.scrollerTables.setElementCreateFunction((data: ClubPartnerMemberListData) => {
						let item = new ClubLuckyListGeneralItemBySelect(this.clubData, data, this.onlyGourpData, this.modifyAnyoneSwitch)
						item.setObj(this)
						return item
					})
					this.scrollerTables.setElementUpdateDataFun((item: ClubLuckyListGeneralItemBySelect, data: ClubPartnerMemberListData) => {
						item.setData(this.clubData, data)
					})
					this.scrollerTables.setElementUpdateUIFun((item: ClubLuckyListGeneralItemBySelect) => {
						item.updateUI()
					})
					this.Group_memberTitle_unSet.visible = true
					this.Group_memberTitle_admin.visible = false
					break
				default:
					//设置为合伙组的数据
					groupId = data.id
					this.curChoicePartnerGroupId = groupId
					this.curChoicePartnerGroupName = data.name
					//按钮显示隐藏
					this.Button_add_partnerGroup.visible = false
					this.Button_delete_partnerGroup.visible = true
					this.Button_batch_of_belonging.visible = true
					this.Button_modify_name.visible = true
					//////////////////////////////
					this.scrollerTables.setElementViewInfo(94, 6)
					this.scrollerTables.setElementCreateFunction((data: ClubPartnerMemberListData) => {
						let item = new ClubLuckyListGeneralItemBySelect(this.clubData, data, this.onlyGourpData, this.modifyAnyoneSwitch)
						item.setObj(this)
						return item
					})
					this.scrollerTables.setElementUpdateDataFun((item: ClubLuckyListGeneralItemBySelect, data: ClubPartnerMemberListData) => {
						item.setData(this.clubData, data)
					})
					this.scrollerTables.setElementUpdateUIFun((item: ClubLuckyListGeneralItemBySelect) => {
						item.updateUI()
					})
					this.Group_memberTitle_unSet.visible = true
					this.Group_memberTitle_admin.visible = false
					break
			}
			//获取合伙组成员列表请求
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_MEMBER_LIST, {
				clubId: this.clubData.clubId,
				groupId: groupId,
				fromType: 1
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
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_ADD), this.addGroupCallBack, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_DEL), this.deleteGroupCallBack, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_MODIFYGROUPNAME), this.modifyGroupNameCallBack, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_BATCH_SETTING), this.batchSettingCallBack, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_MEMBER_DEL), this.batchSettingCallBack, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_SET_MANAGER), this.batchSettingCallBack, this)
			super.clean()
		}
	}
}