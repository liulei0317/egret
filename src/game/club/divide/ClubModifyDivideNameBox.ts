module game {
	export class ClubModifyDivideNameBox extends EDialog {
		private btnClose: EButton
		private btnSave: EButton
		private editSearch: eui.EditableText
		private divideGroupData = []
		private clubData: ClubData
		private gourpData = null
		public constructor(data, clubData) {
			super(null, false);
			this.clubData = clubData
			this.gourpData = data
			this.skinName = "resource/skins/club/divide/ClubModifyDivideNameBox.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose, () => { this.close() })
			this.addTapEvent(this.btnSave, () => {
				let name = this.editSearch.text.trim()
				if (name.length == 0) {
					CommonView.showToast("请输入新名称")
					return
				}
				if (name.length > 6) {
					DialogManager.getInstance().popUp1("名称最多6个字")
					return
				}
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_Divide_updateDivideName,
					{
						clubId: this.clubData.clubId,
						divideId: this.gourpData.divideId,
						divideName: name
					});
				SocketManager.getInstance().send(requestDomain);
			})
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_Divide_updateDivideName), this.modifyDivide, this)

			this.updateUI();
		}
		private modifyDivide(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.close()
				EAppFacade.getInstance().sendNotification(GameCmd.CLUB_MODIFY_DIVIDE_GROUP_NAME, msgDomain.data)
			}
		}
		protected updateUI_() {

		}
		public clean() {
			super.clean()
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_Divide_updateDivideName), this.modifyDivide, this)
		}
	}
}