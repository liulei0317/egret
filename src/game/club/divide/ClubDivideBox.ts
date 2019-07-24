module game {
	export class ClubDivideBox extends EDialog {
		private clubData: ClubData
		private btnAddGroup: EButton
		private btnDelGroup: EButton
		private btnModifyName: EButton
		private btnAddMember: EButton
		private btn_close: EButton
		private scrollerLeft: EScroller
		private scrollerRight: EScroller
		private leftDataList = []
		private rightDataList = []
		private selecedData = null
		public constructor(data) {
			super(null, false);
			this.skinName = "resource/skins/club/divide/ClubDivideBox.exml";
			this.clubData = data
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btn_close, () => { this.close() })
			this.initScroller()
			EAppFacade.getInstance().registerCommand(GameCmd.CLICK_CLUB_DIVIDE_TAB_ITEM, this.clickTabItem, this)
			EAppFacade.getInstance().registerCommand(GameCmd.CLUB_REMOVE_DIVIDE_MEMBER, this.removeMember, this)
			EAppFacade.getInstance().registerCommand(GameCmd.CLUB_ADD_DIVIDE_GROUP, this.addGroup, this)
			EAppFacade.getInstance().registerCommand(GameCmd.CLUB_MODIFY_DIVIDE_GROUP_NAME, this.modifyGroupName, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_removeDivide), this.removeGroup, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_getDivides), this.getDivides, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_getDivideMembers), this.getDividesMembers, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_addDivideMember), this.addDivideMember, this)
			//添加隔离组
			this.addTapEvent(this.btnAddGroup, () => {
				let dialog = new ClubAddDivideTabBox(this.selecedData, this.clubData)
				DialogManager.getInstance().show(dialog)
			})
			//删除隔离组
			this.addTapEvent(this.btnDelGroup, () => {
				DialogManager.getInstance().popUp2("确定要删除当前分组么？", () => {
					let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_Divide_removeDivide,
						{
							clubId: this.clubData.clubId,
							divideId: this.selecedData.divideId
						});
					SocketManager.getInstance().send(requestDomain);
				})
			})
			//修改组名称
			this.addTapEvent(this.btnModifyName, () => {
				let dialog = new ClubModifyDivideNameBox(this.selecedData, this.clubData)
				DialogManager.getInstance().show(dialog)
			})
			//添加组成员
			this.addTapEvent(this.btnAddMember, () => {
				let dialog = new ClubAddDivideMemberBox(this.selecedData, this.clubData)
				DialogManager.getInstance().show(dialog)
			})
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_Divide_getDivides,
				{
					clubId: this.clubData.clubId,
				});
			SocketManager.getInstance().send(requestDomain);
			this.updateUI();
		}
		private removeGroup(event: egret.Event) {
			let msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				CommonView.showToast("删除隔离组成功")
				if (this.leftDataList == null) {
					return
				}
				for (let key in this.leftDataList) {
					if (this.leftDataList[key].divideId == msgDomain.data.divideId) {
						this.leftDataList.splice(Number(key), 1)
						if (this.leftDataList.length > 0) {
							this.selecedData = this.leftDataList[0]
							this.selecedData.selected = true
							let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_Divide_getDivideMembers,
								{
									clubId: this.clubData.clubId,
									divideId: this.selecedData.divideId
								});
							SocketManager.getInstance().send(requestDomain);
						}
						break
					}
				}
				// this.scrollerLeft.clearContent()
				// this.scrollerLeft.setScrollerContent(this.leftDataList)
				this.scrollerLeft.updateUI()
				if (this.leftDataList.length == 0) {
					this.btnAddMember.visible = this.btnDelGroup.visible = this.btnModifyName.visible = false
				}
			}
		}
		private modifyGroupName(event: egret.Event) {
			let data = event.data
			CommonView.showToast("修改成功")
			if (this.leftDataList == null) {
				return
			}
			for (let key in this.leftDataList) {
				if (this.leftDataList[key].divideId == data.divideId) {
					this.leftDataList[key].divideName = data.divideName
					break
				}
			}
			this.scrollerLeft.updateUI()
		}
		private addGroup(event: egret.Event) {
			let data = event.data
			CommonView.showToast("新增成功")
			if (this.leftDataList == null) {
				this.leftDataList = []
			}
			this.leftDataList.push(data)
			if (this.leftDataList.length == 1) {
				this.selecedData = this.leftDataList[0]
				this.selecedData.selected = true
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_Divide_getDivideMembers,
					{
						clubId: this.clubData.clubId,
						divideId: this.selecedData.divideId
					});
				SocketManager.getInstance().send(requestDomain);
			}
			this.scrollerLeft.updateUI()
			if (this.leftDataList.length > 0) {
				this.btnAddMember.visible = this.btnDelGroup.visible = this.btnModifyName.visible = true
			}
		}
		private removeMember(event: egret.Event) {
			let data = event.data
			CommonView.showToast("移除成功")
			if (data.clubId != this.clubData.clubId || data.divideId != this.selecedData.divideId || this.rightDataList.length == 0)
				return
			for (let key in this.rightDataList) {
				if (this.rightDataList[key].memberId == data.memberId) {
					this.rightDataList.splice(Number(key), 1)
				}
			}
			this.scrollerRight.clearContent()
			this.scrollerRight.setScrollerContent(this.rightDataList)
		}
		private clickTabItem(event: egret.Event) {
			let data = event.data
			this.selecedData = data
			for (let i = 0; i < this.leftDataList.length; i++) {
				this.leftDataList[i].selected = (this.leftDataList[i] == this.selecedData)
			}
			this.scrollerLeft.updateUI()
			let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_Divide_getDivideMembers,
				{
					clubId: this.clubData.clubId,
					divideId: this.selecedData.divideId
				});
			SocketManager.getInstance().send(requestDomain);
		}
		private addDivideMember(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.rightDataList.push(msgDomain.data)
				this.scrollerRight.updateUI()
				CommonView.showToast("添加成功")
			}
		}
		private getDivides(event: egret.Event) {
			let msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				let list = msgDomain.data.divideList
				for (let key in list) {
					if (key == "0") {
						list[key].selected = true
						this.selecedData = list[key]
						let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_Divide_getDivideMembers,
							{
								clubId: this.clubData.clubId,
								divideId: list[key].divideId
							});
						SocketManager.getInstance().send(requestDomain);
					}
					else {
						list[key].selected = false
					}
				}
				this.leftDataList = list
				this.scrollerLeft.clearContent()
				this.scrollerLeft.setScrollerContent(this.leftDataList)
				if (this.leftDataList.length == 0) {
					this.btnAddMember.visible = this.btnDelGroup.visible = this.btnModifyName.visible = false
				}
			}
		}
		private getDividesMembers(event: egret.Event) {
			let msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				let list = msgDomain.data.memberList
				this.rightDataList = list
				this.scrollerRight.clearContent()
				this.scrollerRight.setScrollerContent(this.rightDataList)
			}
		}
		private initScroller() {
			this.scrollerLeft.setElementViewInfo(72, 6);
			this.scrollerLeft.setElementCreateFunction(this.createTabElement.bind(this));
			this.scrollerLeft.setElementUpdateDataFun(this.updateTabElement.bind(this));
			this.scrollerLeft.setElementUpdateUIFun(this.updateTabElementUI.bind(this));
			this.scrollerLeft.setScrollerContent(this.leftDataList);

			this.scrollerRight.setElementViewInfo(108, 6);
			this.scrollerRight.setElementCreateFunction(this.createRecordsListElement.bind(this));
			this.scrollerRight.setElementUpdateDataFun(this.updateRecordsListElement.bind(this));
			this.scrollerRight.setElementUpdateUIFun(this.updateRecordsListElementUI.bind(this));
			this.scrollerRight.setScrollerContent(this.rightDataList);
		}
		private createTabElement(data) {
			var item = new ClubDivideGroupItem(data);
			return item;
		}
		private updateTabElement(item: ClubDivideGroupItem, data: any) {
			item.setData(data);
		}
		private updateTabElementUI(item: ClubDivideGroupItem) {
			item.updateUI();
		}
		private createRecordsListElement(data) {
			var item = new ClubDivideMemberItem(this.selecedData, data);
			return item;
		}
		private updateRecordsListElement(item: ClubDivideMemberItem, data: any) {
			item.setData(data);
		}
		private updateRecordsListElementUI(item: ClubDivideMemberItem) {
			item.updateUI();
		}
		protected updateUI_() {

		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.CLICK_CLUB_DIVIDE_TAB_ITEM, this.clickTabItem, this)
			EAppFacade.getInstance().removeCommand(GameCmd.CLUB_REMOVE_DIVIDE_MEMBER, this.removeMember, this)
			EAppFacade.getInstance().removeCommand(GameCmd.CLUB_ADD_DIVIDE_GROUP, this.addGroup, this)
			EAppFacade.getInstance().removeCommand(GameCmd.CLUB_MODIFY_DIVIDE_GROUP_NAME, this.modifyGroupName, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_removeDivide), this.removeGroup, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_getDivides), this.getDivides, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_getDivideMembers), this.getDividesMembers, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_Divide_addDivideMember), this.addDivideMember, this)
		}
	}
}