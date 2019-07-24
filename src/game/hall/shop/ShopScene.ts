module game {
	export class ShopScene extends EDialog {

		private btnClose: EButton;

		private tab1: EToggleButton;
		private tab2: EToggleButton;

		private labelTab1: eui.Label;
		private labelTab2: eui.Label;

		private item1: ShopItem;
		private item2: ShopItem;
		private item3: ShopItem;
		private item4: ShopItem;
		private item5: ShopItem;
		private item6: ShopItem;

		private btnDiamond1: EButton;
		private btnDiamond2: EButton;
		private btnDiamond3: EButton;
		private btnDiamond4: EButton;
		private btnDiamond5: EButton;
		private btnDiamond6: EButton;

		private btnGold1: EButton;
		private btnGold2: EButton;
		private btnGold3: EButton;
		private btnGold4: EButton;
		private btnGold5: EButton;
		private btnGold6: EButton;

		private labelDiamond: eui.Label
		private labelGold: eui.Label
		private selectTabIndex: number = 1;

		private diamondList: ShopItemData[];
		private goldList: ShopItemData[];
		public constructor(type) {
			super(null, false);
			this.selectTabIndex = type || 1
			this.skinName = "resource/skins/hall/shop/shopSceneSkin.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose, this.goHallScene);
			this.addTapEvent(this.tab1, this.selectTab1);
			this.addTapEvent(this.tab2, this.selectTab2);
			this.labelDiamond.text = "" + GlobalData.userData.getDiamondNum()
			this.labelGold.text = "" + GlobalData.userData.getGoldNum()
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_DIAMOND_CHANGE), this.refreshDiamondNumber, this)
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_GOLD_CHANGE), this.refreshGoldNumber, this)
			// game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_GET_TASK_LIST), this.getTaskListBack, this);
			this.addItemsEvent();
			this.selectTabIndex == 1 ? this.selectTab1() : this.selectTab2()
			// this.initScroller();
			this.getItemInfos();

		}
		private refreshDiamondNumber(event: egret.Event) {
			let msgDomain: MsgDomain = event.data
			if (msgDomain.code == CmdResultType.SUCCESS) {
				let data = msgDomain.data
				let diamond = data.diamond
				this.labelDiamond.text = "" + diamond
			}
		}
		private refreshGoldNumber(event: egret.Event) {
			let msgDomain: MsgDomain = event.data
			if (msgDomain.code == CmdResultType.SUCCESS) {
				let data = msgDomain.data
				let gold = data.gold
				this.labelGold.text = "" + gold
			}
		}
		protected updateUI_() {
			this.tab1.selected = false;
			this.tab2.selected = false;
			// this.labelTab1.textColor = 0x874208;
			// this.labelTab2.textColor = 0x874208;   
			// this.labelTab1.stroke = 0;
			// this.labelTab2.stroke = 0;
			if (this.selectTabIndex == 1) {
				// this.labelTab1.textColor = 0xFFFFFF;
				this.tab1.selected = true;
				// this.labelTab1.stroke = 2;
				// this.updateItemBtns(true);
				this.updateItems(true, this.diamondList);
			} else if (this.selectTabIndex == 2) {
				// this.labelTab2.textColor = 0xFFFFFF;
				this.tab2.selected = true;
				// this.labelTab2.stroke = 2;
				// this.updateItemBtns(false);
				this.updateItems(false, this.goldList);

			}

		}

		private addItemsEvent() {
			var diamondItemBtns = this.getDiamondItems();
			var diamondLen = diamondItemBtns.length;
			for (var i: number = 0; i < diamondLen; i++) {
				this.addTapEvent(diamondItemBtns[i], this.clickBuy);
			}

			var goldItemBtns = this.getGoldItems();
			var goldLen = goldItemBtns.length;
			for (var i: number = 0; i < goldLen; i++) {
				this.addTapEvent(goldItemBtns[i], this.clickBuy);
			}
		}

		private clickBuy(event: eui.UIEvent) {
			var btn: EButton = event.currentTarget;
			var index = (this.selectTabIndex == 1) ? this.getItemBtnIndex(true, btn) : this.getItemBtnIndex(false, btn);
			var shopItemData: ShopItemData = null;
			if (this.selectTabIndex == 1) {
				shopItemData = this.diamondList[index];
				CommonView.showToast("购买" + shopItemData.itemTotalNum + shopItemData.itemName);
				//创建订单
			} else {
				shopItemData = this.goldList[index];
				CommonView.showToast("购买" + shopItemData.itemTotalNum + shopItemData.itemName);
			}
			if (shopItemData != null) {
				this.createOrder(shopItemData)
			}
		}

		private createOrder(shopItemData: ShopItemData) {
			CommonView.showWaiting()
			var url = GameHttpConst.getFullUrl(GameHttpConst.url_createOrder)
			var data =
				{
					userId: GlobalData.userData.getUserId(),
					itemId: shopItemData.itemId,
					fromApp: false,
					checkVersion: true
				}
			GameHttpManager.request(url, data, this.createOrderCallBack.bind(this))
		}

		private createOrderCallBack(data: any) {
			CommonView.hideWaiting()
			var msgDomain: MsgDomain = data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				var msgData = msgDomain.data;
				var tradeId = 0
				if (msgData.orderId != null) {
					tradeId = msgData.orderId
				}
				var payUrl = GameHttpConst.url_pay_h5 + "?order=" + tradeId
				console.log("payUrl " + payUrl)
				window.open(payUrl)
			} else {
				var errorCode = msgDomain.errorCode
				if (errorCode == MsgConstant.ERROR_WEB_need_bind_proxy) {
					DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.shopBindProxyBox.index)
				}
			}
		}

		private getDiamondItems(): EButton[] {
			return [this.btnDiamond1, this.btnDiamond2, this.btnDiamond3, this.btnDiamond4, this.btnDiamond5, this.btnDiamond6];
		}

		private getGoldItems(): EButton[] {
			return [this.btnGold1, this.btnGold2, this.btnGold3, this.btnGold4, this.btnGold5, this.btnGold6];
		}

		private getItemBtnIndex(isDiamond, btn: EButton) {
			var itemBtns = isDiamond ? this.getDiamondItems() : this.getGoldItems();
			var len = itemBtns.length;
			for (var i: number = 0; i < len; i++) {
				if (btn == itemBtns[i]) {
					return i;
				}
			}
		}



		private updateItemBtns(showDiamond) {
			this.btnDiamond1.visible = showDiamond;
			this.btnDiamond2.visible = showDiamond;
			this.btnDiamond3.visible = showDiamond;
			this.btnDiamond4.visible = showDiamond;
			this.btnDiamond5.visible = showDiamond;
			this.btnDiamond6.visible = showDiamond;

			this.btnGold1.visible = !showDiamond;
			this.btnGold2.visible = !showDiamond;
			this.btnGold3.visible = !showDiamond;
			this.btnGold4.visible = !showDiamond;
			this.btnGold5.visible = !showDiamond;
			this.btnGold6.visible = !showDiamond;
		}


		private updateItems(isDiamond, itemDatas: ShopItemData[]) {
			var items: ShopItem[] = [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6];
			var diamondItemBtns = this.getDiamondItems();
			var goldItemBtns = this.getGoldItems();
			var itemLen = items.length;
			var len = itemDatas == null ? 0 : itemDatas.length;
			for (var i: number = 0; i < itemLen; i++) {
				if (i < len) {
					items[i].visible = true;
					items[i].setData(itemDatas[i]);

					diamondItemBtns[i].visible = true;
					goldItemBtns[i].visible = true;
				} else {
					items[i].visible = false;
					diamondItemBtns[i].visible = false;
					goldItemBtns[i].visible = false;
				}
				if (i < len) {
					diamondItemBtns[i].visible = isDiamond;
					goldItemBtns[i].visible = !isDiamond;
				} else {
					diamondItemBtns[i].visible = false;
					goldItemBtns[i].visible = false;
				}
			}
		}


		private getItemInfos() {
			GameHttpManager.getItemInfosNew(1, 10002, this.getItemInfosBack.bind(this));
		}

		private getItemInfosBack(event: egret.Event) {
			var data: any = event;
			var msgDomain: game.MsgDomain = data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				var jsonData = msgDomain.data;
				var diamondList = jsonData.diamonds;
				var goldList = jsonData.golds;

				this.diamondList = [];
				this.goldList = [];
				for (var key in diamondList) {
					var temp = diamondList[key];
					var shopItemData = new game.ShopItemData(temp);
					this.diamondList.push(shopItemData);
				}
				for (var key in goldList) {
					var temp = goldList[key];
					var shopItemData = new game.ShopItemData(temp);
					this.goldList.push(shopItemData);
				}

				this.updateUI();
			}
		}



		private selectTab1() {
			this.selectTabIndex = 1;
			this.updateUI();
		}


		private selectTab2() {
			this.selectTabIndex = 2;
			this.updateUI();
		}

		private goHallScene() {
			this.close()
		}

		public clean() {
			// game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_GET_TASK_LIST), this.getTaskListBack, this);
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_DIAMOND_CHANGE), this.refreshDiamondNumber, this)
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_USER_GOLD_CHANGE), this.refreshGoldNumber, this)
			super.clean();
		}

	}
}