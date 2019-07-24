module game {
	export class ClubRuleEditDialog extends EDialog {
		private scrollerTables: EScroller
		private btnOK: EButton
		private btnClose: EButton
		private tips: EButton
		private editName: eui.EditableText
		private editCalNum: eui.EditableText
		private editSZMK: eui.EditableText
		private editZDJS: eui.EditableText
		private radio1: ERadioButton
		private radio2: ERadioButton
		private radio3: ERadioButton
		private TLMK: ERadioButton
		private XZJS: ERadioButton
		private FCMTX: ERadioButton
		private rectColor1: eui.Rect
		private rectColor2: eui.Rect
		private rectColor3: eui.Rect


		private clubRuleData: ClubRuleData
		private clubRuleDataList: game.ClubRuleData[]


		public constructor(clubRuleData: ClubRuleData) {
			super(null, false)
			this.clubRuleData = clubRuleData.clone()
			this.skinName = "resource/skins/club/rules/ClubRuleEditDialogSkin.exml"
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.addTapEvent(this.btnClose, this.close)
			this.addTapEvent(this.btnOK, this.clickOK)

			this.addTapEvent(this.rectColor1, this.clickRadio1)
			this.addTapEvent(this.rectColor2, this.clickRadio2)
			this.addTapEvent(this.rectColor3, this.clickRadio3)

			this.addTapEvent(this.TLMK, this.clickTLMK)
			this.addTapEvent(this.XZJS, this.clickXZJS)
			this.addTapEvent(this.FCMTX, this.clickFCMTX)
			this.addTapEvent(this.FCMTX, this.clickFCMTX)
			this.addTapEvent(this.tips, () => {
				// var p: egret.Point = this.tips.localToGlobal(this.tips.x, this.tips.y)
				// var x = p.x - GlobalData.deltaX
				TipsUtils.showTips(2, this.tips.x + 100, this.tips.y, "成员累计游戏时间超过5小时，将会弹出健康游戏提醒。", 280)
			})
			this.editCalNum.inputType = egret.TextFieldInputType.TEL
			this.editCalNum.restrict = `0-9`

			this.editSZMK.inputType = egret.TextFieldInputType.TEL
			this.editSZMK.restrict = `0-9`

			this.editZDJS.inputType = egret.TextFieldInputType.TEL
			this.editZDJS.restrict = `0-9`
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_templateChange), this.templateChanage, this)

			this.radio1.setText("")
			this.radio2.setText("")
			this.radio3.setText("")

			this.TLMK.setText("体力门槛")
			this.TLMK.setFontSize(27)
			this.TLMK.setFontFamily("fzch")
			this.TLMK.setFontColor(0x805D31)

			this.XZJS.setText("每日限制局数")
			this.XZJS.setFontSize(27)
			this.XZJS.setFontFamily("fzch")
			this.XZJS.setFontColor(0x805D31)

			this.FCMTX.setText("防沉迷提醒")
			this.FCMTX.setFontSize(27)
			this.FCMTX.setFontFamily("fzch")
			this.FCMTX.setFontColor(0x805D31)

			this.editSZMK.text = "" + typeof (this.clubRuleData.roomJson.minBlessNum) == "undefined" ? 1 : this.clubRuleData.roomJson.minBlessNum
			this.editZDJS.text = "" + typeof (this.clubRuleData.roomJson.limitTurnNum) == "undefined" ? 20 : this.clubRuleData.roomJson.limitTurnNum
			this.editCalNum.text = "" + this.clubRuleData.getCalNum()
			this.editName.text = this.clubRuleData.getTemplateName()

			this.updateUI()
		}


		protected updateUI_() {
			this.radio1.setSelected(false)
			this.radio2.setSelected(false)
			this.radio3.setSelected(false)
			let colorIndex = this.clubRuleData.getTemplateColor()
			if (colorIndex == 2) {
				this.radio2.setSelected(true)
			} else if (colorIndex == 3) {
				this.radio3.setSelected(true)
			} else {
				this.radio1.setSelected(true)
			}
			this.TLMK.setSelected(this.clubRuleData.roomJson.blessSwitch || false)
			this.XZJS.setSelected(this.clubRuleData.roomJson.limitTurnSwitch || false)
			this.FCMTX.setSelected(this.clubRuleData.roomJson.limitTip || false)
		}

		private clickOK() {
			var clubId = this.clubRuleData.getClubID()
			var templateId = this.clubRuleData.getTemplateID()

			var templateName = this.editName.text.trim()
			if (templateName.length <= 0 || templateName.length > 6) {
				CommonView.showToast(Utils.format("标题长度应该是{0}-{1}之间", 1, 6))
				return
			}

			var templateColor = this.clubRuleData.getTemplateColor()


			var calNum = this.editCalNum.text.trim()
			var min = 0
			var max = 1000
			if (!Utils.checkInputNumber(calNum, min, max)) {
				CommonView.showToast(Utils.format("记分应该是{0}-{1}之间", min, max))
				return
			}
			let data = {
				clubId: clubId,
				templateId: templateId,
				templateName: templateName,
				templateColor: templateColor,
				calNum: calNum,
				blessSwitch: this.clubRuleData.roomJson.blessSwitch,
				minBlessNum: parseInt(this.editSZMK.text.trim()),
				limitTip: this.clubRuleData.roomJson.limitTip,
				limitTurnNum: parseInt(this.editZDJS.text.trim()),
				limitTurnSwitch: this.clubRuleData.roomJson.limitTurnSwitch
			}
			ClubService.getInstance().updateCustomInfo(data)
		}

		private templateChanage(event: egret.Event) {
			if (event.data != null) {
				var msgDomain: game.MsgDomain = event.data
				if (msgDomain.code == game.CmdResultType.SUCCESS) {
					CommonView.showToast("修改成功")
					this.close()
				}
			}
		}

		private clickRadio1() {
			this.clubRuleData.setTemplateColor(1)
			this.updateUI()
		}
		private clickRadio2() {
			this.clubRuleData.setTemplateColor(2)
			this.updateUI()
		}
		private clickRadio3() {
			this.clubRuleData.setTemplateColor(3)
			this.updateUI()
		}
		private clickTLMK() {
			this.clubRuleData.roomJson.blessSwitch = !this.clubRuleData.roomJson.blessSwitch
			this.updateUI()
		}
		private clickXZJS() {
			this.clubRuleData.roomJson.limitTurnSwitch = !this.clubRuleData.roomJson.limitTurnSwitch
			this.updateUI()
		}
		private clickFCMTX() {
			this.clubRuleData.roomJson.limitTip = !this.clubRuleData.roomJson.limitTip
			this.updateUI()
		}
		public clean() {
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_templateChange), this.templateChanage, this)
			super.clean()
		}
	}
}