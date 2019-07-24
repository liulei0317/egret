module game {
	export class ViewReplayDialog extends EDialog {


		private btnCancel: EButton;
		private btnOK: EButton;
		private input: eui.EditableText;

		public constructor() {
			super(null, false);
			this.skinName = "resource/skins/hall/zhanji/viewReplaySkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnCancel, this.close);
			this.addTapEvent(this.btnOK, this.clickOK);
			this.input.inputType = egret.TextFieldInputType.TEL;
			this.input.restrict = '0-9';

			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_REPLAY), this.replayCallback, this);
		}

		private clickOK() {
			CommonView.showWaiting();
			var replayId = this.input.text.trim();
			if (replayId.length <= 0) {
				CommonView.hideWaiting();
				CommonView.showToast("请输入回放码");
				return;
			}
			if (!Utils.isNumbers(replayId)) {
				CommonView.hideWaiting();
				CommonView.showToast("回放码应该为数字");
				return;
			}
			SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_REPLAY, { replayId: replayId, gameId: Constants.GAME_ID_SET.nanjing })
		}

		private replayCallback(event: egret.Event) {
			CommonView.hideWaiting();
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {

			} else {
				if (msgDomain.errorCode == MsgConstant.ERROR_replaycode_no_exist) {
					CommonView.showToast("回放码不存在");
				}
			}
		}


	}
}