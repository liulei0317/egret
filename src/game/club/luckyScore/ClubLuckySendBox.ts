module game {
	export class ClubLuckySendBox extends EDialog {
		private data
		private btn_save: EButton
		private btn_close: EButton
		private imgHead: eui.Image
		private lbName: eui.Label
		private lbID: eui.Label
		private editSearch: eui.EditableText
		private Button_plus: EButton
		private Button_minus: EButton
		private Button_help: EButton
		private sendNumber: string
		public constructor(data) {
			super(null, false)
			this.skinName = "resource/skins/club/luckyScore/ClubLuckySendBox.exml"
			this.data = data
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.editSearch.restrict = "0-9\\-\\+"
			this.editSearch.text = ""
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_blessmember), this.getBlessMerberBack, this)
			EAppFacade.getInstance().registerCommand("SEND_NUMER", this.getSendNumber, this)
			this.addTapEvent(this.Button_plus, () => {
				let dialog = new ClubLuckModifyNumBox(true)
				DialogManager.getInstance().show(dialog)
			})
			this.addTapEvent(this.Button_minus, () => {
				let dialog = new ClubLuckModifyNumBox(false)
				DialogManager.getInstance().show(dialog)
			})
			this.addTapEvent(this.Button_help, () => {
				var p: egret.Point = this.Button_help.parent.localToGlobal(this.Button_help.x, this.Button_help.y)
				var x = p.x
				var y = p.y
				TipsUtils.showTips(2, x + 20, y + 40, "点击+-号可以对成员体力进行增减操作。", 280)
			})
			this.addTapEvent(this.btn_close, () => { this.close() })
			this.addTapEvent(this.btn_save, () => {
				if (this.editSearch.text.length == 0) {
					CommonView.showToast("请输入赠送数字")
					return
				}
				let str: number = Number(this.editSearch.text)

				if (isNaN(str)) {
					CommonView.showToast("请检查输入内容")
					return
				}
				if (Math.abs(str) > 99999) {
					DialogManager.getInstance().popUp1("99999代表满满的祝福，你送的祝福太多了吧")
					// CommonView.showToast("99999代表满满的祝福，你送的祝福太多了吧")
					return
				}
				let info = "是否确认赠加" + Math.abs(str) + "体力给玩家" + this.data.nickName + "?"
				if (str < 0) {
					info = "是否确认让玩家" + this.data.nickName + "减少" + Math.abs(str) + "体力?"
				}
				DialogManager.getInstance().popUp2(info, () => {
					var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_blessmember,
						{
							clubId: this.data.clubId,
							toMemberId: this.data.userId,
							blessNum: str
						}
					)
					SocketManager.getInstance().send(requestDomain)
				})
			})
			this.updateUI()
		}
		private getBlessMerberBack(evt: egret.Event) {
			let msgDomain: MsgDomain = evt.data
			if (msgDomain.code == CmdResultType.SUCCESS) {
				EAppFacade.getInstance().sendNotification(GameCmd.CLUB_REFRESH_BLESS_INFO_LIST, evt.data.data)
				CommonView.showToast("修改成功！")
				this.close()
			}
		}
		private getSendNumber(event: egret.Event) {
			this.sendNumber = event.data
			this.editSearch.text = this.sendNumber
		}
		protected updateUI_() {
			this.lbName.text = "昵称：" + this.data.nickName
			this.lbID.text = "ID：" + this.data.userId
			ResManager.loadWebImage(this.data.iconName, (texture: egret.Texture): void => {
				this.imgHead.texture = texture
				this.imgHead.addEventListener(eui.UIEvent.COMPLETE, () => {
					this.imgHead.texture = texture
				}, this)
			}, this)

		}
		public clean() {
			super.clean()
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_blessmember), this.getBlessMerberBack, this)
			EAppFacade.getInstance().removeCommand("SEND_NUMER", this.getSendNumber, this)

		}
	}
}