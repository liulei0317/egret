module game {
	export class BindPhoneBox extends EDialog {
		private m_bPhoneNum
		private input: eui.Group
		private change: eui.Group
		private phoneNumber: eui.Label
		private input_phoneNumber: eui.EditableText
		private input_code: eui.EditableText
		private btn_getCode: eui.Button
		private btn_confirm: eui.Button
		private btn_changeBind: eui.Button
		private btn_close: eui.Button
		private timer: eui.Label
		private timerTrigger: egret.Timer
		private currentTime: number = 60
		public constructor(phoneNumber) {
			super(Constants.UI_PANEL_DATA_SET.bindPhoneBox.index);
			this.m_bPhoneNum = phoneNumber
			this.skinName = "resource/skins/hall/BindPhoneBox.exml"
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.input_phoneNumber.restrict = "0-9"
			this.input_phoneNumber.maxChars = 11
			this.input.visible = typeof (this.m_bPhoneNum) == "undefined" || this.m_bPhoneNum == null
			this.change.visible = !(typeof (this.m_bPhoneNum) == "undefined") && this.m_bPhoneNum != null
			if (typeof (this.m_bPhoneNum) != "undefined") {
				let num: string = this.m_bPhoneNum
				let len = num.length
				let hidePhoneNumber = num.substr(0, 3) + "*****" + num.substr(len - 3, 3)
				this.phoneNumber.text = "手机号：" + hidePhoneNumber
			}
			this.addTapEvent(this.btn_getCode, this.onGetCodeClicked)
			this.addTapEvent(this.btn_confirm, this.onConfirmClicked)
			this.addTapEvent(this.btn_changeBind, this.onChangeBindClicked)
			this.addTapEvent(this.btn_close, () => {
				EAppFacade.getInstance().removeCommand("panel", this.onEventHandler, this)
				DialogManager.getInstance().close(this);
			})
		}
		private onGetCodeClicked(): void {
			let text: String = this.input_phoneNumber.text
			if (text.length == 0) {
				CommonView.showToast("请输入手机号")
				return
			}
			SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_USER_GETBINDSMSCODE, {
				phoneNumber: text,
			})
		}
		private onConfirmClicked(): void {
			let text: String = this.input_phoneNumber.text
			if (text.length == 0) {
				CommonView.showToast("请输入手机号")
				return
			}
			let text2: String = this.input_code.text
			if (text2.length == 0) {
				CommonView.showToast("请输入验证码")
				return
			}
			SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_USER_BINDPHONENUMBER, {
				phoneNumber: text,
				code: text2
			})
		}
		private onChangeBindClicked(): void {
			this.m_bPhoneNum = null
			this.input.visible = typeof (this.m_bPhoneNum) == "undefined" || this.m_bPhoneNum == null
			this.change.visible = !(typeof (this.m_bPhoneNum) == "undefined") && this.m_bPhoneNum != null
		}
		protected onEventHandler(evt: egret.Event) {
			super.onEventHandler(evt);
			if (this.eventId == GameCmd.USER_BINDPHONENUMBER) {
				CommonView.showToast("绑定成功")
				GlobalData.userData.setPhoneNumber(evt.data.data.phoneNumber)
				EAppFacade.getInstance().removeCommand("panel", this.onEventHandler, this)
				DialogManager.getInstance().close(this);
			}
			else if (this.eventId == GameCmd.USER_GETBINDSMSCODE) {
				this.btn_getCode.enabled = false
				this.timer.text = "60"
				this.timerTrigger = new egret.Timer(1000, 0)
				this.timerTrigger.addEventListener(egret.TimerEvent.TIMER, () => {
					this.currentTime--
					this.timer.text = "" + this.currentTime
					if (this.currentTime <= 0) {
						this.btn_getCode.enabled = true
						this.timer.text = ""
						this.timerTrigger.stop()
					}
				}, this);
				//开始计时
				this.timerTrigger.start();
			}
		}
	}
}