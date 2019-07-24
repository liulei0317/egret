module game {
	export class ClubSetManagerAndGroupBox extends EDialog {
		private clubId: string
		private groupId: number
		private btn_close: EButton
		private ClubSetManagerItem: ClubSetManagerItem
		private scroller: EScroller
		private Text_curGroup_name: eui.Label
		private data
		public constructor(data) {
			super(null, false)
			this.skinName = "resource/skins/club/partner/clubSetManagerAndGroupBox.exml"
			this.data = data
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_SET_MANAGER), this.setManagerCallBack, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_BATCH_SETTING), this.batchSettingCallBack, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_MEMBER_DEL), this.batchSettingCallBack, this)

			this.addTapEvent(this.btn_close, () => {
				this.close()
			})
			this.ClubSetManagerItem.setData({
				member: this.data.member[0],
				groupId: this.data.curGroup.groupId,
				clubId: this.data.clubId
			})
			this.scroller.setElementViewInfo(80, 4)
			this.scroller.setElementCreateFunction(this.createElement.bind(this))
			this.scroller.setElementUpdateDataFun(this.updateElement.bind(this))
			this.scroller.setElementUpdateUIFun(this.updateElementUI.bind(this))
			this.scroller.setScrollerContent(this.data.group)
			this.updateUI()
		}
		private setManagerCallBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				CommonView.showToast("设置管理员成功")
				this.close()
			}
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
			this.Text_curGroup_name.text = this.data.curGroup.groupName
		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_SET_MANAGER), this.setManagerCallBack, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_BATCH_SETTING), this.batchSettingCallBack, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_MEMBER_DEL), this.batchSettingCallBack, this)
		}
	}
}