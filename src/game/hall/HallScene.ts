module game {
	export class HallScene extends SceneBase {
		private btnClub: EButton;
		private btnCreateRoom: EButton;
		private btnJoinRoom: EButton;
		private btnZhanJi: EButton;
		private btnStore: EButton;
		private btnActive: EButton;
		private btnTask: EButton;
		private imgTaskTip: eui.Image;
		private btnWanFa: EButton;

		private btnSetting: EButton;
		private btnMail: EButton;
		private imgMailTip: eui.Image;
		private labelDiamond: eui.Label;
		private labelGold: eui.Label;
		private labelNickName: eui.Label;
		private labelUserId: eui.Label;
		private imgPerson: eui.Image;

		private Group_head: eui.Group

		private btnBuyDiamond: EButton
		private btnBuyGold: EButton

		private Button_share: EButton

		private Button_agent: EButton
		private Button_public: EButton
		private Image_hot: eui.Image

		private groupGold: eui.Group
		public constructor() {
			super(Constants.SCENE_INDEX.MAIN);
			this.skinName = "resource/skins/hall/hallSceneSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClub, this.clickClub);
			this.addTapEvent(this.btnCreateRoom, this.clickCreateRoom);
			this.addTapEvent(this.btnJoinRoom, this.clickJoinRoom);
			this.addTapEvent(this.btnZhanJi, this.clickZhanji);
			this.addTapEvent(this.btnStore, this.clickStore);
			this.addTapEvent(this.btnWanFa, this.clickWanFa);
			this.addTapEvent(this.btnTask, this.clickTask);
			this.addTapEvent(this.btnActive, this.clickActive);


			this.addTapEvent(this.btnSetting, this.clickSetting);
			this.addTapEvent(this.btnMail, this.clickMail);

			this.addTapEvent(this.Group_head, this.showPersonInfoEvent)

			this.addTapEvent(this.btnBuyDiamond, this.showDiamondShopBox)
			this.addTapEvent(this.btnBuyGold, this.showGoldShopBox)

			this.addTapEvent(this.Button_share, this.showShareBoxEvent)

			if (GlobalData.clientConfigs.showCreateRoom == "0" && GameConfig.platform == GameConfig.PLATFORM_SET.weChat) {
			// if (GlobalData.clientConfigs.showCreateRoom == "0") {
				this.Button_agent.visible = false;
				this.Button_public.visible = false;
				// this.Image_hot.visible = false;
			} else {
				this.addTapEvent(this.Button_agent, this.showAdvertAgent.bind(this))
				this.addTapEvent(this.Button_public, this.showAdvertPublic.bind(this))
			}

			this.updateUI();
			this.checkAutoInGame()
			EAppFacade.getInstance().registerCommand(GameCmd.DIAMOND_NUMBER_CHANGE, this.updateDiamondNum, this);
			EAppFacade.getInstance().registerCommand(GameCmd.GOLD_NUMBER_CHANGE, this.updateGoldNum, this);
			EAppFacade.getInstance().registerCommand(GameCmd.UPDATE_MAIL_TIP, this.updateMailTip, this);
			EAppFacade.getInstance().registerCommand(GameCmd.UPDATE_TASK_TIP, this.updateTaskTip, this);

			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_Activity_ShowType), this.getActivityShowTypeBack, this);
			if (!game.GlobalService.getInstance().activityHasShow) {
				game.GlobalService.getInstance().activityHasShow = true;
				ActivityService.getInstance().getActivityShowType();
			}
			this.createStaticAnimation()
			CommonView.showBroadcast()
			SoundService.getInstance().playMusic("bg_mp3");
		}

		public onShow()
		{
			super.onShow();
			CommonView.showBroadcast();
		}

		private createStaticAnimation() {
			//金币
			let dbdata = RES.getRes("golen_ske_json");
			let texturedata = RES.getRes("golen_tex_json");
			let texture = RES.getRes("golen_tex_png");
			let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
			if (egretFactory.getDragonBonesData("golden") == null) {
				egretFactory.parseDragonBonesData(dbdata);
				egretFactory.parseTextureAtlasData(texturedata, texture);
			}
			let arm: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay("golden");
			arm.x = 770
			arm.scaleX = 1.2
			arm.scaleY = 1.2
			arm.y = 39
			arm.animation.play()
			this.addChild(arm)
			//钻石
			dbdata = RES.getRes("diamond_ske_json");
			texturedata = RES.getRes("diamond_tex_json");
			texture = RES.getRes("diamond_tex_png");
			egretFactory = dragonBones.EgretFactory.factory;
			if (egretFactory.getDragonBonesData("diamond") == null) {
				egretFactory.parseDragonBonesData(dbdata);
				egretFactory.parseTextureAtlasData(texturedata, texture);
			}
			arm = egretFactory.buildArmatureDisplay("diamond");
			arm.x = 516
			arm.scaleX = 1.2
			arm.scaleY = 1.2
			arm.y = 39
			arm.animation.play()
			this.addChild(arm)

		}
		private showDiamondShopBox() {
			let dialog = new ShopScene(1)
			game.DialogManager.getInstance().show(dialog)
		}

		private showGoldShopBox() {
			let dialog = new ShopScene(2)
			game.DialogManager.getInstance().show(dialog)
		}

		private async showShareBoxEvent() {
			// DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.wechatShare.index)
			platform.shareWithImg("新华网出品，南京名嘴秦岭、查老倾情献声，邀您来组局了！", "index.html", "https://res.qixiyx.cn/file/share.jpg", "key1=1&key2=2")
		}

		private showAdvertAgent() {
			DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.advert.index, { type: 1 })
		}

		private showAdvertPublic() {
			DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.advert.index, { type: 2 })
		}

		private showPersonInfoEvent() {
			DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.personInfo.index, GlobalData.userData)
		}

		private updateDiamondNum() {
			this.labelDiamond.text = "" + GlobalData.userData.getDiamondNum();
		}

		private updateGoldNum() {
			this.labelGold.text = "" + GlobalData.userData.getGoldNum();
		}
		private updateMailTip() {
			this.imgMailTip.visible = GlobalService.getInstance().mailTip;
		}

		private updateTaskTip() {
			this.imgTaskTip.visible = GlobalService.getInstance().hasTaskTip();
		}

		private checkAutoInGame() {
			var roomNumber = GlobalData.userData.getRoomNumber()
			if (roomNumber != 0) {
				var data = { roomNumber: roomNumber }
				SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_JOIN_ROOM, data)
			}
			else if (GlobalData.platformRoomNumber != 0) {
				var data = { roomNumber: GlobalData.platformRoomNumber }
				SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_JOIN_ROOM, data)
			}
			GlobalData.userData.setRoomNumber(0)
			GlobalData.platformRoomNumber = 0
		}

		protected updateUI_() {
			var userBaseInfo = UserInfoService.getInstance().getUserInfo();
			this.updateDiamondNum();
			this.updateGoldNum()
			this.labelNickName.text = userBaseInfo.getUserName();
			this.labelUserId.text = "ID:" + userBaseInfo.getUserId();
			this.headLoadComplete()
			this.updateMailTip();



		}

		private headLoadComplete() {
			var imageUrl = GlobalData.userData.getHeadIMGUrl();
			ResManager.loadWebImage(imageUrl, (texture: any): void => {
				this.imgPerson.texture = texture;
				this.imgPerson.addEventListener(eui.UIEvent.COMPLETE, () => {
					this.imgPerson.texture = texture;
				}, this)
			}, this)
		}

		private clickClub() {
			if (GameConfig.platform == GameConfig.PLATFORM_SET.H5) {
				SceneSkip.skipToClubScene();
			} else {
				if (GlobalData.clientConfigs.showClubRoom == "0") {
					DialogManager.getInstance().popUp1("更多功能下载app体验");
				} else {
					SceneSkip.skipToClubScene();
				}
			}

		}

		private clickCreateRoom() {
			// SocketManager.getInstance().sendMsg(MsgConstant.HALL,MsgConstant.CMD_REPLAY,{ replayId : 202,gameId : Constants.GAME_ID_SET.nanjing })
			if (GlobalData.clientConfigs.showCreateRoom == "0" && GameConfig.platform == GameConfig.PLATFORM_SET.weChat) {
				var roomInfo: any = {};
				roomInfo.roomType = Constants.ROOM_TYPE.jinYuanZi;
				roomInfo.roomScore = 100;
				roomInfo.turnMode = 0;//房间把数类型 0.把 1.圈
				roomInfo.turnNumber = 8;//
				roomInfo.payMode = Constants.ROOM_PAY_MODE.AA;//支付模式 1.房主付费 2.AA付
				roomInfo.huaZa = true;//是否花砸
				roomInfo.faFen = true;//是否罚分
				roomInfo.jieZhuangBi = true;//是否接庄比
				roomInfo.calNum = 0;
				roomInfo.autoHost = true;
				roomInfo.baoMi = false;
				roomInfo.free = true;
				RoomService.getInstance().createRoom(roomInfo);
			} else {
				let hasShowDeclare = DataStorage.readLocalData(DataStorageConst.DATA_KEY_DECLARE_CREATE_ROOM);
				var createRoomDialog = new CreateRoomDialog(null);
				DialogManager.getInstance().show(createRoomDialog, EDialog.show_ani_type_null);
				if (hasShowDeclare == "" || hasShowDeclare == "undefined" || hasShowDeclare != "true") {
					let dialog = new CreateRoomDeclareView();
					DialogManager.getInstance().show(dialog);
				}
			}
			// var callback: Function = function(data) {
			// 	var msgDomain = MsgDomain.toBean(data);

			// 	LogUtils.info("data=="+data);
			// 	LogUtils.info("msgDomain=="+msgDomain);

			// }			
			// GameHttpManager.checkAppUpdate(callback);
		}

		private clickJoinRoom() {
			var joinRoomDialog = new JoinRoomDialog();
			DialogManager.getInstance().show(joinRoomDialog, EDialog.show_ani_type_null);
		}

		private clickZhanji() {
			var zhanjiDialog = new ZhanJiDialog();
			DialogManager.getInstance().show(zhanjiDialog, EDialog.show_ani_type_null);
		}

		private clickStore() {
			let dialog = new ShopScene(null)
			game.DialogManager.getInstance().show(dialog)
		}

		private clickWanFa() {
			var ruleDialog = new RuleDialog();
			DialogManager.getInstance().show(ruleDialog, EDialog.show_ani_type_null);
		}

		private clickTask() {
			var taskDialog = new TaskDialog();
			DialogManager.getInstance().show(taskDialog, EDialog.show_ani_type_null);
		}

		private clickActive() {
			let activeDialog = new ActivityDialog(game.GlobalService.getInstance().activityShowType);
			DialogManager.getInstance().show(activeDialog, EDialog.show_ani_type_null);
		}

		private clickSetting() {
			var settingDialog = new SettingDialog();
			DialogManager.getInstance().show(settingDialog, EDialog.show_ani_type_null);
		}

		private clickMail() {
			var dialog = new MailDialog();
			DialogManager.getInstance().show(dialog);
		}

		private getActivityShowTypeBack(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {

				var jsonData = msgDomain.data;
				var showType = jsonData.showType;
				game.GlobalService.getInstance().activityShowType = showType;
				if (showType > 0) {
					var dialog = new ActivityDialog(showType);
					DialogManager.getInstance().show(dialog);
				}

			}
		}

		public clean() {
			CommonView.hideBroadcast()
			EAppFacade.getInstance().removeCommand(GameCmd.DIAMOND_NUMBER_CHANGE, this.updateDiamondNum, this);
			EAppFacade.getInstance().removeCommand(GameCmd.GOLD_NUMBER_CHANGE, this.updateGoldNum, this);
			EAppFacade.getInstance().removeCommand(GameCmd.UPDATE_MAIL_TIP, this.updateMailTip, this);
			EAppFacade.getInstance().removeCommand(GameCmd.UPDATE_TASK_TIP, this.updateTaskTip, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_Activity_ShowType), this.getActivityShowTypeBack, this);
			super.clean();
		}

	}
}