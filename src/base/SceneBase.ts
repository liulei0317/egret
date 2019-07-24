module game {
	export class SceneBase extends EComponent {
		private sceneIndex: number
		public constructor(index: number) {
			super();
			this.sceneIndex = index;
			EAppFacade.getInstance().registerCommand(Constants.EVENT_STAGE_VIEW_SIZE_CHANGED, this.onSizeChanged, this)
			EAppFacade.getInstance().registerCommand(GameCmd.onPause,this.onPause,this)
			EAppFacade.getInstance().registerCommand(GameCmd.onResume,this.onResume,this)
		}

		public onSizeChanged() {
			console.log("SceneBase onSizeChanged ")
		}

		public onShow() {

		}

		public onClose() {

		}

		public onPause() {

		}

		public onResume() {

		}

		public getIndex() {
			return this.sceneIndex
		}

		public clean() {
			EAppFacade.getInstance().removeCommand(Constants.EVENT_STAGE_VIEW_SIZE_CHANGED, this.onSizeChanged, this)
			EAppFacade.getInstance().removeCommand(GameCmd.onPause,this.onPause,this)
			EAppFacade.getInstance().removeCommand(GameCmd.onResume,this.onResume,this)
			super.clean();
		}


	}
}