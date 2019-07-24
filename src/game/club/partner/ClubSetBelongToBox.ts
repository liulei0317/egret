module game {
	export class ClubSetBelongItem extends EComponent {
		private groupData
		private allData
		private sendMemberId = []
		private Button_removeGroup: EButton
		private Button_belongGroup: EButton
		private Text_groupName: eui.Label
		public constructor(groupData, allData) {
			super()
			this.groupData = groupData
			this.allData = allData
			this.skinName = "resource/skins/club/partner/clubSetBelongItem.exml"
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			for (let key in this.allData.member) {
				if (this.allData.member.hasOwnProperty(key)) {
					let element = this.allData.member[key]
					this.sendMemberId.push(element.id)
				}
			}
			this.addTapEvent(this.Button_belongGroup, () => {
				if (this.checkHasMembersBlessNumberNotZero()) {
					DialogManager.getInstance().popUp1("有成员体力值不为0,不可归属")
					return
				}
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_BATCH_SETTING, {
					clubId: this.allData.clubId,
					groupId: this.groupData.id,
					memberIds: this.sendMemberId,
				})
				SocketManager.getInstance().send(requestDomain)
			})
			this.addTapEvent(this.Button_removeGroup, () => {
				if (this.checkHasMembersBlessNumberNotZero()) {
					DialogManager.getInstance().popUp1("有成员体力值不为0,不可移除")
					return
				}
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_MEMBER_DEL, {
					clubId: this.allData.clubId,
					groupId: this.groupData.id,
					memberIds: this.sendMemberId,
				})
				SocketManager.getInstance().send(requestDomain)
			})
			this.updateUI()
		}
		private checkHasMembersBlessNumberNotZero(): boolean {
			let ret = false
			if (this.allData.modifyAnyoneSwitch) {
				return false
			}
			else {
				for (let i = 0; i < this.allData.member.length; i++) {
					let element = this.allData.member[i]
					if (element.blessNum != 0) {
						ret = true
						break
					}
				}
			}
			return ret
		}
		public setData(groupData, allData) {
			this.groupData = groupData
			this.allData = allData
			this.updateUI()
		}
		protected updateUI_() {
			this.Text_groupName.text = this.groupData.name
			if (this.groupData.id == this.allData.curGroup.groupId) {
				this.Button_belongGroup.visible = false
				this.Button_removeGroup.visible = true
			}
			else {
				this.Button_belongGroup.visible = true
				this.Button_removeGroup.visible = false
			}
		}
		public clean() {
			super.clean()
		}
	}
}
module game {
	export class ClubSetBelongToBox extends EDialog {
		private data: any
		private Text_setBelong: eui.Label
		private btn_close: EButton
		private scroller: EScroller
		public constructor(data) {
			super(null, false)
			this.skinName = "resource/skins/club/partner/clubSetBelongToBox.exml"
			this.data = data
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_BATCH_SETTING), this.batchSettingCallBack, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_MEMBER_DEL), this.batchSettingCallBack, this)
			this.addTapEvent(this.btn_close, () => {
				this.close()
			})
			if (this.data.member.length > 1)
				this.Text_setBelong.text = "设置 所有选中成员 的归属合伙组为"
			else if (this.data.member.length == 1)
				this.Text_setBelong.text = Utils.format("设置 {0} 的归属合伙组为", this.data.member[0].nickName)
			else
				this.Text_setBelong.visible = false
			this.scroller.setElementViewInfo(80, 4)
			this.scroller.setElementCreateFunction(this.createElement.bind(this))
			this.scroller.setElementUpdateDataFun(this.updateElement.bind(this))
			this.scroller.setElementUpdateUIFun(this.updateElementUI.bind(this))
			this.scroller.setScrollerContent(this.data.group)
		}
		private batchSettingCallBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				CommonView.showToast("变更成功")
				this.close()
			}
		}
		private createElement(data) {
			let item = new ClubSetBelongItem(data, this.data)
			return item
		}
		private updateElement(item, data) {
			item.setData(data, this.data)
			this.updateUI()
		}
		private updateElementUI(item) {
			item.updateUI()
		}
		protected updateUI_() {

		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_BATCH_SETTING), this.batchSettingCallBack, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_MEMBER_DEL), this.batchSettingCallBack, this)
		}
	}
}