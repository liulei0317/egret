module game {
	export class DialogManager {
		private static instance:DialogManager;
		private normalDialogMap: HashMap = new HashMap();
		private comfirmDialogMap: HashMap = new HashMap();
		private constructor() {
		}

		public static getInstance() {
			if (DialogManager.instance == null) {
				DialogManager.instance = new DialogManager();
			}
			return DialogManager.instance;
		}


		public show(dialog:EDialog,animationType: number = EDialog.show_ani_type_null){
			var hasExist = false
			var isConfirmDialogType = dialog instanceof ConfirmBox
			if(isConfirmDialogType)
			{
				hasExist = this.comfirmDialogMap.containsKey(dialog.getDialogUUID())
			}else
			{
				hasExist = this.normalDialogMap.containsKey(dialog.getDialogUUID())
			}
			if(hasExist)
			{
				return
			}
			if(isConfirmDialogType)
			{
				Main.instance.confirmDialogLayer.addChild(dialog)
				this.comfirmDialogMap.put(dialog.getDialogUUID(),dialog)
			}else
			{
				SceneManager.getInstance().getCurScene().addChild(dialog)
				this.normalDialogMap.put(dialog.getDialogUUID(),dialog)
			}
			dialog.show(animationType);	
		}


		public close(dialog:EDialog,AnimationType?: number){
            if(dialog.parent){
			    dialog.parent.removeChild(dialog);
				if (dialog instanceof ConfirmBox)
				{
					this.comfirmDialogMap.remove(dialog.getDialogUUID())
				}else
				{
					this.normalDialogMap.remove(dialog.getDialogUUID())
				}
                dialog = null;
            }
		}	

		public showPopBox(index,params:any = null)
		{
			var hasExist = this.normalDialogMap.containsKey(index) || this.comfirmDialogMap.containsKey(index)
			if(hasExist)
			{
				return
			}
			var dialog = null
			switch (index) {
				case Constants.UI_PANEL_DATA_SET.checkCheat.index:
					dialog = new CheckCheatBox()
					break;
				case Constants.UI_PANEL_DATA_SET.preventCheat.index:
					dialog = new PreventCheatBox(params);
					break;
				case Constants.UI_PANEL_DATA_SET.GameSettle_auto1.index:
					dialog = new GameSettleNormal(params);
					break;
				case Constants.UI_PANEL_DATA_SET.gameOverBox.index:
					dialog = new GameOverBox(params);
					break;
				case Constants.UI_PANEL_DATA_SET.applyQuit.index:
					dialog = new ApplyQuitBox(params)
					break;
				case Constants.UI_PANEL_DATA_SET.preventCheatStatusBox.index:
					dialog = new PreventCheatStatusBox()
					break;
				case Constants.UI_PANEL_DATA_SET.personInfoOther.index:
					dialog = new PersonalInfoOtherBox(params)
					break;
				case Constants.UI_PANEL_DATA_SET.todayRecords.index:
					dialog = new TodayRecordsBox();
					break;
				case Constants.UI_PANEL_DATA_SET.personInfo.index:
					dialog = new PersonalInfoBox(params);
					break;
				case Constants.UI_PANEL_DATA_SET.changePlayerNumBox.index:
					dialog = new ChangePlayerNumBox(params);
					break;
				case Constants.UI_PANEL_DATA_SET.GameScoreBoard.index:
					dialog = new GameScoreBoardBox();
					break;
				case Constants.UI_PANEL_DATA_SET.gameSetting.index:
					dialog = new GameSettingBox();
					break;
				case Constants.UI_PANEL_DATA_SET.roomInfoBox.index:
					dialog = new RoomInfoBox();
					break;
				case Constants.UI_PANEL_DATA_SET.chatBox.index:
					dialog = new GameChatBox();
					break;
				case Constants.UI_PANEL_DATA_SET.shop.index:
					dialog = new StoreBox(params);
					break;
				case Constants.UI_PANEL_DATA_SET.about.index:
					dialog = new AboutBox();
					break;
				case Constants.UI_PANEL_DATA_SET.wechatShare.index:
					dialog = new ShareBox();
					break;
				case Constants.UI_PANEL_DATA_SET.discardWinConfirmBox.index:
					dialog = new AbandomWinConfirmBox(params);
					break;
				case Constants.UI_PANEL_DATA_SET.advert.index:
					dialog = new AdvertBox(params);
					break;
			}

			if (dialog != null) {
				this.show(dialog)
			}
		}

		public popUp2(info: string, confirmCallBack: Function = null, cancelfirmCallBack: Function = null) {
			var params = {
				type: 2,
				info: info,
				confirmFunc: confirmCallBack,
				closeFun: cancelfirmCallBack
			}
			var dialog = new ConfirmBox(params)
			this.show(dialog)
		}


		public popUp1(info: string, confirmCallBack: Function = null) {
			var params = {
				type: 1,
				info: info,
				confirmFunc: confirmCallBack,
			}
			var dialog = new ConfirmBox(params)
			this.show(dialog)
		}

		public getBox(key)
		{
			var dialog = this.normalDialogMap.get(key)
			if (dialog == null)
			{
				dialog = this.comfirmDialogMap.get(key)
			}
			return dialog
		}

		public clearAllDialog()
		{
			this.clearAllNormalDialog()
			// Main.instance.sceneLayer.removeChildren()
			this.clearAllConfirmDialog()
			
		}

		public clearAllNormalDialog()
		{
			var key = this.normalDialogMap.keySet()
			for(var i = 0;i < key.length;i ++ )
			{
				var dialog = this.normalDialogMap.get(key[i])
				this.close(dialog)
			}
		}

		public clearAllConfirmDialog()
		{
			var key = this.comfirmDialogMap.keySet()
			for(var i = 0;i < key.length;i ++ )
			{
				var dialog = this.comfirmDialogMap.get(key[i])
				this.close(dialog)
			}
			Main.instance.confirmDialogLayer.removeChildren()
		}

	}
}