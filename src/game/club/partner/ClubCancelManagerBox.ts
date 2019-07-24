module game {
	export class ClubCancelManagerBox extends EDialog {
		private btn_close: EButton
		private groupName: eui.Label
		private Image_head: eui.Image
		private Text_name: eui.Label
		private Text_id: eui.Label
		private Button_cancel: EButton
		private data
		public constructor(data) {
			super(null, false)
			this.skinName = "resource/skins/club/partner/clubCancelManagerBox.exml"
			this.data = data
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.addTapEvent(this.btn_close, () => {
				this.close()
			})
			this.addTapEvent(this.Button_cancel, () => {
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_SET_MANAGER, {
					clubId: this.data.clubId,
					groupId: this.data.curGroup.groupId,
					memberId: this.data.member[0].id,
					userType: 0,
				})
				SocketManager.getInstance().send(requestDomain)
			})
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_SET_MANAGER), this.setManagerCallBack, this)
			this.updateUI()
		}
		private setManagerCallBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				CommonView.showToast("取消管理员成功")
				this.close()
			}
		}
		protected updateUI_() {
			GameUtils.sub(this.Text_name, this.data.member[0].nickName, 114)
			this.groupName.text = this.data.curGroup.groupName
			this.Text_id.text = "ID:" + this.data.member[0].id
			ResManager.loadWebImage(this.data.member[0].headImgUrl, (texture: any, imgUrl: any) => {
				if (this.data.member[0].headImgUrl != imgUrl) {
					return
				}
				this.Image_head.texture = texture
				this.Image_head.addEventListener(eui.UIEvent.COMPLETE, () => {
					this.Image_head.texture = texture
				}, this)
			}, this)
		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_OPPART_SET_MANAGER), this.setManagerCallBack, this)
		}
	}
}