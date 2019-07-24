module game {
	export class SceneManager {
		private static instance:SceneManager = null;

		public curScene:SceneBase = null;

		private sceneMap: SceneBase[] = [];
		private constructor() {
			
		}

		public static getInstance():SceneManager{
			if(SceneManager.instance == null){
				SceneManager.instance = new SceneManager();
			}
			return SceneManager.instance;
		}

		public skipToScene(scene:SceneBase,pushScene:boolean = false){
			if(pushScene)
			{
				this.pushScene(scene)
			}else
			{
				this.replaceCurScene(scene)
			}
		}

		private replaceCurScene(scene:SceneBase)
		{
			DialogManager.getInstance().clearAllConfirmDialog()
			if(this.curScene!=null){
				Main.instance.sceneLayer.removeChild(this.curScene);
				this.curScene.onClose();
				this.curScene = null;
			}
			this.setCurScene(scene)
		}

		private setCurScene(scene:SceneBase)
		{
			this.curScene = scene;
			Main.instance.sceneLayer.addChild(this.curScene);
			this.curScene.onShow();
		}

		public pushScene(scene:SceneBase)
		{
			DialogManager.getInstance().clearAllConfirmDialog()
			if(this.curScene != null)
			{
				this.sceneMap.push(this.curScene)
			}
			this.setCurScene(scene)
		}

		public popScene()
		{
			if(this.curScene!=null){
				Main.instance.sceneLayer.removeChild(this.curScene);
				this.curScene.onClose();
				this.curScene = null;
			}
			this.curScene = this.sceneMap.pop()
			this.curScene.onShow()
		}

		public isInGame()
		{
			if(this.curScene instanceof GameScene)
			{
				return true;
			}
			return false;
		}

		public getCurScene():SceneBase
		{
			return this.curScene
		}
	}
}