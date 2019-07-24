module game {
	export class ClubAddGroupBox extends EDialog {
		private clubId: string
		private btnClose: EButton
		private btn: EButton
		private editSearch: eui.EditableText
		public constructor(clubId) {
			super(null, false)
			this.skinName = "resource/skins/club/partner/clubAddGroupBox.exml"
			this.clubId = clubId
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_ADD), this.addGroupCallBack, this)

			this.addTapEvent(this.btnClose, () => {
				this.close()
			})
			this.addTapEvent(this.btn, () => {
				let name = this.editSearch.text.trim()
				if (name.length == 0) {
					DialogManager.getInstance().popUp1("合伙组名称不能为空")
					return
				}
				if (Utils.getCharLen(name) > 12) {
					DialogManager.getInstance().popUp1("合伙组名称最多6个字")
					return
				}
				let ishasSpec = Utils.isHasSpecialWord(name)
				if (ishasSpec) {
					DialogManager.getInstance().popUp1("合伙组名称不能含有特殊字符")
					return
				}
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_GROUP_ADD, {
					clubId: this.clubId,
					groupName: name,
				})
				SocketManager.getInstance().send(requestDomain)
			})
		}
		private addGroupCallBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.close()
			}
		}
		protected updateUI_() {

		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_GROUP_ADD), this.addGroupCallBack, this)
		}
	}
}