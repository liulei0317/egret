module game {
	export class SceneSkip {
		public constructor() {
		}

		public static skipToGameScene(params?: any,pushScene:boolean = false) {
			var gameScene = new GameScene(params);
			SceneManager.getInstance().skipToScene(gameScene,pushScene);
		}

		public static skipToLoginScene(params?: any,pushScene:boolean = false) {
			var loginScene = new LoginScene();
			SceneManager.getInstance().skipToScene(loginScene,pushScene);
		}

		public static skipToHallScene(params?: any,pushScene:boolean = false) {
			var hallScene = new HallScene();
			SceneManager.getInstance().skipToScene(hallScene,pushScene);
		}

		public static skipToClubScene(params?: any,pushScene:boolean = false) {
			var clubScene = new ClubScene();
			SceneManager.getInstance().skipToScene(clubScene,pushScene);
		}

		public static skipToLoadinScene(params?: any,pushScene:boolean = false) {
			var loadingScene = new LoadingScene();
			SceneManager.getInstance().skipToScene(loadingScene,pushScene);
		}
		
		public static skipToShopScene(params?: any,pushScene:boolean = false) {
			// var shopScene = new game.ShopScene(params);
			// SceneManager.getInstance().skipToScene(shopScene,pushScene);
		}

		public static skipToScene(index: number,params?: any,pushScene:boolean = false) {
			switch (index) {
				case Constants.SCENE_INDEX.HOT_UPDATE:
					SceneSkip.skipToLoadinScene(params,pushScene)
					break;
				case Constants.SCENE_INDEX.GAME:
					SceneSkip.skipToGameScene(params,pushScene)
					break;
				case Constants.SCENE_INDEX.MAIN:
					SceneSkip.skipToHallScene(params,pushScene)
					break;
				case Constants.SCENE_INDEX.CLUB:
					SceneSkip.skipToClubScene(params,pushScene)
					break;
				case Constants.SCENE_INDEX.LOGIN:
					SceneSkip.skipToLoginScene(params,pushScene)
					break;
			}
		}


	}
}