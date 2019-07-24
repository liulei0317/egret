module game {
	export class GameScene extends SceneBase {
		// private btnTest1:eui.Label;
		private Image_bg: eui.Image
		private Image_frame: eui.Image;

		private CardGroup: eui.Group;
		private cardLayer: GameCardLayer;
		private touchErea: eui.Rect;
		// private touchScreenErea:eui.Rect;
		private gameCenter:GameCenterNode
		private gameCenter3d:GameCenter3dNode
		private curGameCenter:GameCenterBaseNode
		private gameUILayer: GameUILayer;
		private effectLayer: eui.Group;

		private gameEffect: game.GameEffect;

		private Replayer: game.GameReplayBar;

		private needReconnectBeforeGameStart = false
		private lastForegroundTime = 0;

		private testBtn: eui.Button;
		private timeIndex = -1;
		private params: any
		public constructor(params) {
			super(Constants.SCENE_INDEX.GAME);
			this.params = params
			this.initData()
			this.skinName = "resource/skins/game/gameSceneSkin.exml";
		}

		public onCreateViewComplete(): void {
			// this.addTapEvent(this.btnTest1,this.test);
			if (GameConfig.localVersion) {
				var mock = Mock.getInstance()
				mock.initMockData();
				var gameData = mock.getMockGameData()
				GlobalData.gameData.parse(gameData)
			}

			this.initTouch()
			this.changeCenterNode()
			this.gameEffect = new GameEffect(this.effectLayer)
			this.cardLayer = new GameCardLayer(this, this.touchErea, this.CardGroup)
			this.gameUILayer.setGameScene(this)
			this.gameCenter.setGameScene(this)
			this.gameCenter3d.setGameScene(this)
			this.changeBg()
			this.setBgFrameVisible()

			if (GlobalData.gameData.isPlayBack()) {
				this.Replayer = new GameReplayBar(this, this.params)
				this.Replayer.x = (GameConfig.ScreenW - this.Replayer.width)/2
				this.Replayer.y = GameConfig.ScreenH - 200 - this.Replayer.height
				Main.instance.toastLayer.addChild(this.Replayer)
			}
			this.test()

			EAppFacade.getInstance().registerCommand("gameScene", this.onEventHandler, this)

			this.checkCheatInfo()
			this.checkGameStatus()

			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_LOGIN),this.userloginComplete,this);
		}

		public onSizeChanged()
		{
			this.gameUILayer.onSizeChanged()
		}

		private userloginComplete()
		{
			if (GlobalData.gameData.getGameStatus() != GameConst.GAME_STATUS_TYPE.allOver && ! GlobalData.gameData.isPlayBack())
			{
				var needStartGame = true
				var overBox = DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.GameSettle_auto1.index)
				if(overBox  != null)
				{
					needStartGame = false
				}
				if (needStartGame)
				{
					this.cardLayer.clearAllScheduler()
				}
				SocketManager.getInstance().sendMsg(MsgConstant.GAME,MsgConstant.CMD_USER_RECONNECTION,{needStartGame : needStartGame,roomId : GlobalData.gameData.getRoomInfo().getRoomId()})
			}
		}
			
		

		private initData() {
			GameConst.card_back_index = parseInt(DataStorage.readLocalData(LocalStorage.setting.Card_back_index, "0"))
			GameConst.card_face_index = parseInt(DataStorage.readLocalData(LocalStorage.setting.Card_face_index, "0"))
			GameConst.game_bg_index = parseInt(DataStorage.readLocalData(LocalStorage.setting.Game_bg_index, "0"))
			GameConst.sound_type = parseInt(DataStorage.readLocalData(LocalStorage.setting.Sound_type, "" + GameConst.SOUND_TYPE_ENUM.nanjing))
			GameConst.card_mode_index = parseInt(DataStorage.readLocalData(LocalStorage.setting.View_mode, "" + GameConst.CARD_MODE.mode_2d))
			GameConst.forbid_voice = parseInt(DataStorage.readLocalData(LocalStorage.setting.forbid_voice, "" + 0)) == 1
			GameConst.forbid_emotion = parseInt(DataStorage.readLocalData(LocalStorage.setting.forbid_emotion, "" + 0)) == 1
			var clickCardType = parseInt(DataStorage.readLocalData(LocalStorage.setting.GameDoubleClickType, "" + GameConst.CLICK_CARD_TYPE.doubleClick))
			GlobalData.gameData.setClickType(clickCardType)
			var flowerCardVisible = parseInt(DataStorage.readLocalData(LocalStorage.setting.Flower_card_Visible, "" + 1)) == 1
			GlobalData.gameData.setFlowerCardVisible(flowerCardVisible)
			if (this.params != null) {
				var playBack = false
				if (this.params.playBack) {
					playBack = this.params.playBack
				}
				GlobalData.gameData.setPlayBack(playBack)
			}
		}

		private checkGameStatus() {
			LogUtils.info("checkGameStatus " + GlobalData.gameData.getGameStatus())
			this.setStatus(GlobalData.gameData.getGameStatus())
			this.showApplyQuit()
			this.showChangePlayerNum()
		}

		private showChangePlayerNum() {
			var info = GlobalData.gameData.getChangePlayerNumInfo()
			//printInfo("showApplyQuit info %s",info)
			var changePlayerNumBox: ChangePlayerNumBox = DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.changePlayerNumBox.index);
			if (info == null) {
				Utils.sendPanelEvent(GameCmd.CLOSE_CHANGE_PLAYERNUM_PANEL)
				return
			}
			if (changePlayerNumBox == null) {
				DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.changePlayerNumBox.index, info)
			}
			else {
				changePlayerNumBox.setData(info)
			}
		}

		private showApplyQuit() {
			var info = GlobalData.gameData.getApplyQuitInfo()
			var applyQuitBox: EDialog = DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.applyQuit.index)
			if (info == null) {
				if (applyQuitBox != null) {
					applyQuitBox.close();
				}
				return
			}
			// var applyQuitBox = DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.applyQuit.index)
			if (applyQuitBox == null) {
				DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.applyQuit.index, info)
			}
			else {
				var a: any = applyQuitBox;
				a.setData(info)
			}
		}

		private onEventHandler(evt: egret.Event) {
			var rsvMsg = evt.data
			var eventId = rsvMsg.cmd
			var data = rsvMsg.data
			if (eventId == GameCmd.GAME_STATUS_CHANGED) {
				this.statusChanged();
			}
			else if (eventId == GameCmd.PREVENT_CHEAT_INFO) {
				var preventCheatBox: EDialog = DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.preventCheat.index)
				if (preventCheatBox != null) {
					preventCheatBox.close();
				}
				GlobalData.gameData.setCheatStatus(true)
				DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.checkCheat.index)
			} else if (eventId == GameCmd.CHECK_CHEAT_STATUS) {
				this.checkCheatStatus()
			} else if (eventId == GameCmd.GameSettleInfo_1) {
				this.timeIndex = setTimeout(function(){
					var overBox = DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.GameSettle_auto1.index)
					if(overBox  != null)
					{
						DialogManager.getInstance().close(overBox)
					}
					var overData = GlobalData.gameData.getOverData()
					DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.GameSettle_auto1.index, overData)
					this.timeIndex = -1;	
				},1000)
			} else if (eventId == GameCmd.GameSettleInfo_over) {
				DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.gameOverBox.index)
			} else if (eventId == GameCmd.APPLY_QUIT_INFO) {
				this.showApplyQuit()
			} else if (eventId == GameCmd.APPLY_QUIT_REJECT) {
				var rejectUserName = data.rejectUserName
				CommonView.showToast(Utils.format("玩家[{0}]不同意退出", rejectUserName))
				var applyQuitBox: EDialog = DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.applyQuit.index)
				if (applyQuitBox != null) {
					applyQuitBox.close();
				}
			} else if (eventId == GameCmd.DISSOLVE_ROOM) {
				if (data != null) {
					var dissolveType = data.dissolveType
					var info = null
					if (dissolveType == GameConst.DissolveRoomType.TIMEOUT)
						info = Strings.dismissRoom_timeOut
					else if (dissolveType == GameConst.DissolveRoomType.DAIKAI)
						info = Strings.dismissRoom_daikai
					else if (dissolveType == GameConst.DissolveRoomType.MASTER) {
						if (!GlobalData.gameData.isMeCreator()) {
							info = Strings.dismissRoom_master
						}
					}
					if (info != null) {
						DialogManager.getInstance().popUp1(info, function () {
							if (GlobalData.gameData.getRoomInfo().isClubRoom()) {
								SceneSkip.skipToClubScene()
							}
							else {
								SceneSkip.skipToHallScene()
							}
						})
					}
					else {
						if (GlobalData.gameData.getRoomInfo().isClubRoom()) {
							SceneSkip.skipToClubScene()
						}
						else {
							SceneSkip.skipToHallScene()
						}
					}
				}
				else {
					if (GlobalData.gameData.getRoomInfo().isClubRoom()) {
						SceneSkip.skipToClubScene()
					}
					else {
						SceneSkip.skipToHallScene()
					}
				}
			} else if (eventId == GameCmd.CHANGE_PLAYER_NUM_INFO) {
				this.showChangePlayerNum()
			}
			else if (eventId == GameCmd.CHANGE_PLAYER_NUM_REJECT) {
				var rejectUserName = data.rejectUserName
				CommonView.showToast(Utils.format("玩家[{0}]不同意", rejectUserName))
				Utils.sendPanelEvent(GameCmd.CLOSE_CHANGE_PLAYERNUM_PANEL)
			}
			else if (eventId == GameCmd.CHANGE_PLAYER_NUM_CANCEL) {
				Utils.sendPanelEvent(GameCmd.CLOSE_CHANGE_PLAYERNUM_PANEL)
			} else if (eventId == GameCmd.CHANGE_GAME_BG) {
				this.changeBg()
			} else if (eventId == GameCmd.CHANGE_GAME_BG_FRAME) {
				this.setBgFrameVisible()
			} else if(eventId == GameCmd.CHANGE_VIEW_MODE)
			{
				this.changeViewMode()
			}

			this.cardLayer.onEventHandler(evt)
			this.gameUILayer.onEventHandler(evt)
			this.curGameCenter.onEventHandler(evt)
		}

		private changeViewMode()
		{
			this.changeCenterNode()
			this.gameUILayer.changeViewMode()
			this.setBgFrameVisible()
			this.changeBg()
			game.ConnectService.getInstance().connect(true);
		}

		private changeCenterNode()
		{
			this.gameCenter3d.visible = false
			this.gameCenter.visible = false
			if (GameUtils.is3dMode())
			{
				this.curGameCenter = this.gameCenter3d
			}
			else
			{
				this.curGameCenter = this.gameCenter
			}
			this.curGameCenter.visible = true
		}

		private setBgFrameVisible() {
			var frameVisisetBgFrameVisibleble = DataStorage.readLocalData(LocalStorage.setting.Game_bg_frame, "0")
			this.Image_frame.visible = frameVisisetBgFrameVisibleble == "1"
		}

		private changeBg() {

			var biXiahu = GlobalData.gameData.isBiXiaHu()
			if (GameUtils.is3dMode())
			{
				if ((GlobalData.gameData.getRoomInfo().getBxhColorSwitch()) && biXiahu && GlobalData.gameData.getGameStatus() == GameConst.GAME_STATUS_TYPE.playing)
					this.Image_bg.source = "img_GameUI_BgNEW_3d_bixiahu_png"
				else
				{
					if (GameConst.game_bg_index == 0 )
					{
						this.Image_bg.source = "img_GameUI_BgNEW_3d_png"
					}
					else
					{
						this.Image_bg.source = Utils.format("img_GameUI_BgNEW_3d_{0}_png",GameConst.game_bg_index)
					}
				}
			}	
			else
			{
				if ((GlobalData.gameData.getRoomInfo().getBxhColorSwitch()) && biXiahu && GlobalData.gameData.getGameStatus() == GameConst.GAME_STATUS_TYPE.playing)
				{
					this.Image_bg.source = "img_GameUI_BgNEW_bixiahu_png"
				}
				else
				{
					if (GameConst.game_bg_index == 0)
					{
						this.Image_bg.source = "img_GameUI_BgNEW_png"
					}
					else
					{
						this.Image_bg.source = Utils.format("img_GameUI_BgNEW_{0}_png",GameConst.game_bg_index)
					}
				}
			}
		}

		private statusChanged() {
			var gameStatus = GlobalData.gameData.getGameStatus()
			LogUtils.info("游戏状态改变 " + gameStatus)
			this.setStatus(gameStatus)
		}

		private setStatus(gameStatus) {
			if (gameStatus == GameConst.GAME_STATUS_TYPE.playing && GlobalData.gameData.isNeedPlayStartStatus()) {
				if (GlobalData.gameData.isNeedCheckCheat()) {
					return
				}
				this.needReconnectBeforeGameStart = true
				var curMilliseconds = new Date().getTime()
				if (curMilliseconds - this.lastForegroundTime <= 500) {
					this.needReconnectBeforeGameStart = false
					// SocketManager:reconnect()
					this.lastForegroundTime = 0
				}
				else {
					gameStatus = GameConst.GAME_STATUS_TYPE.before_playing
					this.getEffectLayer().playShaiZi((): void => {
						this.gameUILayer.setStatus(GameConst.GAME_STATUS_TYPE.playing)
						this.cardLayer.setStatus(GameConst.GAME_STATUS_TYPE.playing, true)
						this.curGameCenter.setStatus(GameConst.GAME_STATUS_TYPE.playing)

						if (GlobalData.gameData.isPlayBack() && this.Replayer) {
							this.Replayer.startReplayer()
						}
					})
				}
			}

			GlobalData.gameData.setNeedPlayStartStatus(false)
			this.gameUILayer.setStatus(gameStatus)
			this.cardLayer.setStatus(gameStatus)
			this.curGameCenter.setStatus(gameStatus)

			if (gameStatus == GameConst.GAME_STATUS_TYPE.before_playing || gameStatus == GameConst.GAME_STATUS_TYPE.playing) {
				GlobalData.gameData.setCheatStatus(false)
			}
			this.checkCheatStatus()
		}

		private checkCheatInfo() {
			if (!GlobalData.gameData.isNeedCheckCheat()) {
				return
			}
			GlobalData.gameData.setCheatStatus(true)
			DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.checkCheat.index)
		}

		private checkCheatStatus() {
			var isCheatStatus = GlobalData.gameData.isCheatStatus()
			if (isCheatStatus)
			//弹出防作弊检查或者防作弊界面时不显示
			{
				if (DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.checkCheat.index) == null && DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.preventCheat.index) == null) {
					DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.preventCheatStatusBox.index)
				}
			}
			else {
				var cheatStatusBox: EDialog = DialogManager.getInstance().getBox(Constants.UI_PANEL_DATA_SET.preventCheatStatusBox.index)
				if (cheatStatusBox != null) {
					cheatStatusBox.close();
				}
			}
		}

		private test() {
			if (GameConfig.localVersion) {
				this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.testFunc, this)
			} else {
				this.testBtn.visible = false
			}

		}

		private testFunc() {
			// var parmas = { type: GameConst.GAIN_TYPE.PongKong, provideClientId: GameConst.ME_DIR, value: 1 }
			// var pongKongData = new PongKongData(parmas)
			// for (var i = 0; i < 4; i++) {
			// 	// this.cardLayer.pong(i,pongKongData)
			// 	// this.cardLayer.kong(i, pongKongData)
			// 	this.getEffectLayer().showScoreEffect(i, -1000)
			// }
			// SocketManager.getInstance().sendMsg(MsgConstant.GAME,MsgConstant.CMD_IGNORE_CHEAT)
			// this.gameEffect.playBuHua(GameConst.ME_DIR, 1)
			// this.gameEffect.playChuchongEffect(GameConst.ME_DIR)
			// this.gameEffect.playWin(GameConst.PLAY_DIR.left,GameConst.ACTION_WIN_ACTINDEX.dihu)
			// this.gameEffect.playChatMsg(GameConst.PLAY_DIR.down,GameConst.CHAT_MSG_TYPE.TEXT,1)
			// this.gameEffect.playChatMsg(GameConst.PLAY_DIR.up,GameConst.CHAT_MSG_TYPE.TEXT,2)
			// this.gameEffect.playChatMsg(GameConst.PLAY_DIR.left,GameConst.CHAT_MSG_TYPE.TEXT,3)
			// this.gameEffect.playChatMsg(GameConst.PLAY_DIR.right,GameConst.CHAT_MSG_TYPE.TEXT,4)

			// CommonView.showToast(Strings.activityOver)
			// Mock.getInstance().sendMockGameSettleData()
			Mock.getInstance().mockJiaPai()

			// this.gameEffect.playPointEmotion(1,0,4)
		}


		private initTouch() {
			if (GlobalData.gameData.isPlayBack()) {
				return;
			}
			// this.touchScreenErea.addEventListener(egret.TouchEvent.TOUCH_END,this.resetClickEvent,this)

		}

		public resetClickEvent() {
			if (this.gameUILayer != null) {
				this.gameUILayer.setMoreInfo(false)
			}

			if (this.cardLayer != null) {
				this.cardLayer.clearSelectCard()
			}

		}

		public getEffectLayer() {
			return this.gameEffect;
		}

		public getCardLayer() {
			return this.cardLayer;
		}

		public getGameUILayer() {
			return this.gameUILayer;
		}

		public getGameCenter() {
			return this.curGameCenter;
		}

		public getReplayer() {
			return this.Replayer
		}

		public onPause(){
			super.onPause()
			if( GlobalData.gameData.getGameStatus() != GameConst.GAME_STATUS_TYPE.allOver ){
				game.SocketManager.getInstance().sendMsg(game.MsgConstant.GAME, game.MsgConstant.CMD_APP_Background)
			}
		}


		public onResume(){
			super.onResume()
			// lastForegroundTime = os.time()
			// //lastBackgroundDuration = os.time() - lastBackGroundTime
			// //ProtocalSender:sendMyStatusChanged(PLAYER_STATUS.SIT)
			// let gameStatus = GlobalData.GameData:getGameStatus()
			// let outcardNum = 0
			// if( self.cardLayer ){
			// 	outcardNum = self.cardLayer:getDiscardNum(ME_DIR)
			// }
			// printInfo("gameStatus %s", gameStatus)
			// if( device.platform != "windows" && needReconnectBeforeGameStart && (gameStatus == GAME_STATUS_TYPE.before_playing || (gameStatus == GAME_STATUS_TYPE.playing && outcardNum == 0)) && os.time() - GlobalData.lastHeartTime <= 15 ){
			// 	SocketManager:reconnect()
			// }
			// needReconnectBeforeGameStart = false

			//ProtocalSender:sendMyStatusChanged(PLAYER_STATUS.SIT)
			if( GlobalData.gameData.getGameStatus() != GameConst.GAME_STATUS_TYPE.allOver ){
				// ProtocalSender:sendData(PROTOCOL_AREA.GAME, PROTOCOL_CMD.app_will_enter_foreground)
				game.SocketManager.getInstance().sendMsg(game.MsgConstant.GAME, game.MsgConstant.CMD_APP_Foreground)
			
			}

		}


		public clean() {
			super.clean();
			EAppFacade.getInstance().removeCommand("gameScene", this.onEventHandler, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_LOGIN),this.userloginComplete,this);
			this.gameUILayer.release()
			this.cardLayer.release()
			this.gameCenter.release()
			this.gameCenter3d.release()
			GlobalData.gameData.clearData()
			GlobalData.gameData.setPlayBack(false)
			if (this.Replayer != null) {
				this.Replayer.release()
				this.Replayer = null
			}
			this.lastForegroundTime = 0
			this.needReconnectBeforeGameStart = false
			if(this.timeIndex != -1)
			{
				clearTimeout(this.timeIndex);
			}
			
		}

	}
}