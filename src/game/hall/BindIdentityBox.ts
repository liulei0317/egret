module game {
	export class BindIdentityBox extends EDialog {
		private m_IdNumber
		private input: eui.Group
		private disable: eui.Group

		private input_name: eui.EditableText
		private input_id: eui.EditableText

		private btn_confirm: eui.Button
		private btn_close: eui.Button

		public constructor(idNumber) {
			super(Constants.UI_PANEL_DATA_SET.BindIdentityBox.index);
			this.m_IdNumber = idNumber
			this.skinName = "resource/skins/hall/BindIdentityBox.exml"
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.input_id.maxChars = 18
			this.input.visible = this.m_IdNumber == ""
			this.disable.visible = this.m_IdNumber != ""
			// if (typeof (this.m_IdNumber) != "undefined") {
			// 	let num: string = this.m_IdNumber
			// 	let len = num.length
			// 	let hidePhoneNumber = num.substr(0, 3) + "*****" + num.substr(len - 3, 3)
			// 	this.phoneNumber.text = "手机号：" + hidePhoneNumber
			// }
			this.addTapEvent(this.btn_confirm, this.onConfirmClicked)
			this.addTapEvent(this.btn_close, () => {
				EAppFacade.getInstance().removeCommand("panel", this.onEventHandler, this)
				DialogManager.getInstance().close(this);
			})
		}
		private onConfirmClicked(): void {
			let text: String = this.input_name.text
			if (text.length == 0) {
				CommonView.showToast("请输入您的姓名")
				return
			}
			let text2: String = this.input_id.text
			if (text2.length == 0) {
				CommonView.showToast("请输入18位身份证号码")
				return
			}
			SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_USER_BINDIDENTITY, {
				userName: text,
				idCardNo: text2
			})
		}
		protected onEventHandler(evt: egret.Event) {
			super.onEventHandler(evt);
			if (this.eventId == GameCmd.USER_BIND_ID) {
				CommonView.showToast("绑定成功")
				GlobalData.userData.setIdentityCardNumber(evt.data.data.idCardNo)
				EAppFacade.getInstance().removeCommand("panel", this.onEventHandler, this)
				DialogManager.getInstance().close(this);
			}
			// else if (this.eventId == GameCmd.USER_GETBINDSMSCODE) {
			// 	this.btn_getCode.enabled = false
			// 	this.timer.text = "60"
			// 	this.timerTrigger = new egret.Timer(1000, 0)
			// 	this.timerTrigger.addEventListener(egret.TimerEvent.TIMER, () => {
			// 		this.currentTime--
			// 		this.timer.text = "" + this.currentTime
			// 		if (this.currentTime <= 0) {
			// 			this.btn_getCode.enabled = true
			// 			this.timer.text = ""
			// 			this.timerTrigger.stop()
			// 		}
			// 	}, this);
			// 	//开始计时
			// 	this.timerTrigger.start();
			// }
		}
	}
}