module game {
	export class ClubModifyGroupNameBox extends EDialog {
		private clubId: string
		private groupId: number
		private btnClose: EButton
		private btn: EButton
		private editSearch: eui.EditableText
		private curGroupName: string = ""
		public constructor(clubId, groupId, curGroupName) {
			super(null, false)
			this.skinName = "resource/skins/club/partner/clubModifyGroupNameBox.exml"
			this.clubId = clubId
			this.groupId = groupId
			this.curGroupName = curGroupName
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_MODIFYGROUPNAME), this.modifyGroupNameCallBack, this)
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
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_MODIFYGROUPNAME, {
					clubId: this.clubId,
					groupId: this.groupId,
					groupName: name,
				})
				SocketManager.getInstance().send(requestDomain)
			})
			this.editSearch.text = this.curGroupName
		}
		private modifyGroupNameCallBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.close()
			}
		}
		protected updateUI_() {

		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_MODIFYGROUPNAME), this.modifyGroupNameCallBack, this)
		}
	}
}