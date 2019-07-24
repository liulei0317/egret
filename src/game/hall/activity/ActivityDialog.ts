module game {
	export class ActivityDialog extends EDialog {

		private btnClose: EButton;

		private scrollerTables: EScroller;

		private imgTab1: eui.Image;
		private imgTab2: eui.Image;

		private groupText: eui.Group;
		private labelContentTitle: eui.Label;
		private labelContent: eui.Label;

		private imgContent: eui.Image;
		private labelEmpty: eui.Label;
		private contentRect: eui.Rect

		// private dataList:ActivityItemData[];
		private noticeList: ActivityItemData[] = [];
		private activityList: ActivityItemData[] = [];
		private curDataList: ActivityItemData[] = [];

		private showType = 1;
		private selectItemData: ActivityItemData;


		public constructor(showType) {
			super(Constants.UI_PANEL_DATA_SET.gameActivity.index);
			this.showType = showType;
			this.skinName = "resource/skins/hall/activity/gameActivitySkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose, this.close);


			EAppFacade.getInstance().registerCommand(GameCmd.CLICK_activity_ITEM, this.clickActivityItem, this);
			this.addTapEvent(this.imgTab1, this.changeTab1);
			this.addTapEvent(this.imgTab2, this.changeTab2);

			this.initScroller();
			this.getContentList();

			this.changeTab1()
		}

		private initScroller() {
			// this.scrollerTables.setScrollerHeight(434);
			this.scrollerTables.setElementViewInfo(58, 10);
			this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
			this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
			this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
		}

		private getContentList() {
			GameHttpManager.getActivityList(this.getContentListBack.bind(this));
		}

		protected updateUI_() {
			var showNotice = (this.showType == 0);
			this.imgTab1.alpha = showNotice ? 1 : 0;
			this.imgTab2.alpha = !showNotice ? 1 : 0;
			if (this.curDataList) {
				this.scrollerTables.setScrollerContent(this.curDataList);
			}
			if (this.selectItemData) {
				this.contentRect.visible = true
				this.labelEmpty.text = ""
				if (this.selectItemData.contentDetailType == 0) {//图片
					this.groupText.visible = false;
					this.imgContent.visible = true;

					var self = this;
					game.ResManager.loadWebImage(this.selectItemData.content, function (texture: any) {
						self.imgContent.texture = texture;
						self.imgContent.addEventListener(eui.UIEvent.COMPLETE, () => {
							self.imgContent.texture = texture;
						}, this)
					}, this);

				} else {	//1为文字
					this.groupText.visible = true;
					this.imgContent.visible = false;
					this.labelContentTitle.text = this.selectItemData.contentTitle;
					this.labelContent.text = this.selectItemData.content;
				}
			}
			else {
				this.labelContentTitle.text = ""
				this.contentRect.visible = false
				this.labelContent.text = ""
				this.labelEmpty.text = this.showType == 0 ? "暂无公告消息哦~" : "暂无活动哦~"
			}
		}

		private clickActivityItem(event: egret.Event) {
			this.selectItemData = event.data;
			this.updateCurTabItems();
			this.updateUI();
		}

		private updateCurTabItems() {
			var len = this.curDataList.length;
			for (var i = 0; i < len; i++) {
				this.curDataList[i].selected = (this.curDataList[i] == this.selectItemData)
			}
		}

		private getContentListBack(event: egret.Event) {
			this.labelEmpty
			var data: any = event;
			var msgDomain: MsgDomain = data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				var msgData = msgDomain.data;
				var datalist = msgData.contentItems;
				this.noticeList = [];
				this.activityList = [];
				for (var key in datalist) {
					var data_ = datalist[key];
					var activityItemData = new ActivityItemData(data_);
					if (activityItemData.contentType == 0) {
						this.noticeList.push(activityItemData);
					} else {
						this.activityList.push(activityItemData);
					}
				}
				this.changeTab(this.showType);
				// this.updateUI();
			}
		}

		private changeTab1() {
			this.changeTab(0);
		}
		private changeTab2() {
			this.changeTab(1);
		}

		private changeTab(showType) {
			this.showType = showType;
			if (showType == 0) {
				this.curDataList = this.noticeList;
			} else {
				this.curDataList = this.activityList;
			}
			this.selectItemData = null
			if (this.curDataList.length > 0) {
				this.selectItemData = this.curDataList[0];
				this.updateCurTabItems();
			}
			this.updateUI();
		}


		private createElement(data) {
			var item = new game.ActivityItem(data);
			return item;
		}

		private updateElement(item: game.ActivityItem, data: any) {
			item.setData(data);
			// console.info("roomData == "+item.toString());
		}

		private updateElementUI(item: game.ActivityItem) {
			item.updateUI();
		}

		public clean() {
			EAppFacade.getInstance().removeCommand(GameCmd.CLICK_activity_ITEM, this.clickActivityItem, this);
			super.clean();
		}

	}
}