module game {
	export class ClubLuckModifyNumBox extends EDialog {
		private btn_close: EButton
		private btn_1: EButton
		private btn_2: EButton
		private btn_3: EButton
		private btn_4: EButton
		private btn_5: EButton
		private btn_6: EButton
		private btn_7: EButton
		private btn_8: EButton
		private btn_9: EButton
		private btn_0: EButton
		private buttons: EButton[] = []
		private btn_confirm: EButton
		private btn_minus: EButton
		private btn_plus: EButton
		private btn_point: EButton
		private btn_delete: EButton
		private numbers: string
		private number: eui.Label
		private isPlus: boolean
		private hasPoint: boolean = false
		public constructor(isPlus: boolean) {
			super(null, false)
			this.isPlus = isPlus
			this.skinName = "resource/skins/club/luckyScore/ClubLuckModifyNumBox.exml"
			this.buttons = [
				this.btn_0, this.btn_1, this.btn_2, this.btn_3, this.btn_4,
				this.btn_5, this.btn_6, this.btn_7, this.btn_8, this.btn_9
			]
		}
		private updateSymbol() {
			this.hasPoint = false
			this.btn_plus.visible = !this.isPlus
			this.btn_minus.visible = this.isPlus
		}
		private updateText() {
			this.number.text = this.numbers
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.numbers = this.isPlus ? "+" : "-"
			this.updateSymbol()
			this.updateText()
			this.addTapEvent(this.btn_plus, () => {
				this.isPlus = true
				this.numbers = "+"
				this.updateSymbol()
				this.updateText()
			})
			this.addTapEvent(this.btn_minus, () => {
				this.isPlus = false
				this.numbers = "-"
				this.updateSymbol()
				this.updateText()
			})
			this.addTapEvent(this.btn_delete, () => {
				if (this.numbers.length == 1)
					return
				let found = this.numbers.search(/\./)
				if (found != -1 && found == this.numbers.length - 1) {
					console.log("删除小数点")
					this.hasPoint = false
				}
				this.numbers = this.numbers.substring(0, this.numbers.length - 1)
				this.updateText()
			})
			this.addTapEvent(this.btn_point, () => {
				if (this.numbers.length == 1) {
					this.numbers += "0"
				}
				this.numbers += "."
				this.hasPoint = true
				// this.updateSymbol()
				this.updateText()
			})
			this.addTapEvent(this.btn_close, () => {
				this.close()
			})
			this.addTapEvent(this.btn_confirm, () => {
				EAppFacade.getInstance().sendNotification("SEND_NUMER", this.numbers)
				this.close()
			})
			for (let i = 0; i < this.buttons.length; i++) {
				this.addTapEvent(this.buttons[i], () => {
					let tmpStr = this.numbers + i.toString()
					if (this.hasPoint) {
						let arr = tmpStr.split(".")
						if (arr[1].length > 2) {
							DialogManager.getInstance().popUp1("小数点后只能输入两位数!")
							return
						}
					}
					else {
						if (Math.abs(parseInt(tmpStr)) > 99999) {
							DialogManager.getInstance().popUp1("最大只能输入到万位!")
							return
						}
					}
					this.numbers += i.toString()
					this.updateText()
				})
			}
		}
		protected updateUI_() {
		}
		public clean() {
			super.clean()
		}
	}
}