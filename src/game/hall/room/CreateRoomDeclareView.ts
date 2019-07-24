module game {
	export class CreateRoomDeclareView extends EDialog {
		private btnClose: EButton;
		public constructor() {
			super(null, false);
			this.skinName = "resource/skins/hall/room/createRoomDeclareView.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose, () => {
				DataStorage.writeLocalData(DataStorageConst.DATA_KEY_DECLARE_CREATE_ROOM, "true");
				this.close()
			});
			this.updateUI();
		}

		protected updateUI_() {
		}

		public clean() {
			super.clean();
		}

	}
}