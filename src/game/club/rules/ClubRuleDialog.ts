module game {
	export class ClubRuleDialog extends EDialog{
		private scrollerTables: EScroller;
		private btnAdd:EButton;
		private btnClose:EButton;
		private labelNoRuleTip:eui.Label;

		private clubId:string;
		private clubRuleDataList: game.ClubRuleData[];
		
		public constructor(clubId:string) {
			super(null,false);
			this.clubId = clubId;
			this.skinName = "resource/skins/club/rules/clubRuleDialogSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.btnAdd,this.addRule);
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_queryTemplates), this.getClubTemplateListBack, this);
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_deleteTemplate), this.deleteTemplateBack, this);
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_templateChange), this.templateChanage, this);

			this.initScroller();

			this.getClubRuleList();
		}

		private initScroller() {
			// this.scrollerTables.setScrollerHeight(434);
			this.scrollerTables.setElementViewInfo(148, 10);
			this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
			this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
			this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
		}	

		protected updateUI_(){
			if(this.clubRuleDataList.length>0){
				this.labelNoRuleTip.visible = false;
			}else{
				this.labelNoRuleTip.visible = true;
			}
			this.scrollerTables.setScrollerContent(this.clubRuleDataList, false);
		}


		private createElement(data) {
			var item = new game.ClubRuleItem(data);
			return item;
		}

		private updateElement(item: game.ClubRuleItem, data: any) {
			item.setData(data);
			// console.info("roomData == "+item.toString());
		}

		private updateElementUI(item: game.ClubRuleItem) {
			item.updateUI();
		}

		private getClubRuleList() {
			game.ClubRuleService.getInstance().getClubRuleList(this.clubId);
		}

		private getClubTemplateListBack(event: egret.Event) {	
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.clubRuleDataList = [];
				var jsonData = msgDomain.data;
				var ruleList = jsonData.getTemplateInfos;
				for (var key in ruleList) {
					var temp = ruleList[key];
					var clubRoomData = new game.ClubRuleData(temp);
					this.clubRuleDataList.push(clubRoomData);
				}
				this.updateUI();
			}
		}

		private deleteTemplateBack(event:egret.Event){
			this.getClubRuleList();
		}

		private addRule(){
			var dialog = new CreateRoomDialog(this.clubId);
			DialogManager.getInstance().show(dialog);			
		}

		private templateChanage(event:egret.Event){
			if (event.data != null) {
				var msgDomain: game.MsgDomain = event.data;
				if (msgDomain.code == game.CmdResultType.SUCCESS) {

					var data = msgDomain.data;
					var templateId = data.templateId;
					var type = data.type;
					var roomJson = data.templateInfo;
					var clubRuleData = new ClubRuleData(roomJson);

					if (type == 1) {
						this.clubRuleDataList.push(clubRuleData);
						// this.scrollerTables.addItem(clubRuleData);
					} else if (type == 3) {
						var index = this.getClubRuleIndex(templateId);
						if (index != -1) {
							this.clubRuleDataList[index] = clubRuleData;
						}
					} else if (type == 2) {
						var index = this.getClubRuleIndex(templateId);
						if (index != -1) {
							this.clubRuleDataList.splice(index, 1);
						}
					}
					this.updateUI();
				}
			}
		}	

		private getClubRuleIndex(templateId) {
			var len = this.clubRuleDataList.length;
			for (var i = 0; i < len; i++) {
				var templateId_ = this.clubRuleDataList[i].getTemplateID();
				if (templateId_ == templateId) {
					return i;
				}
			}
			return -1;
		}			

		public clean(){
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_queryTemplates), this.getClubTemplateListBack, this);
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_deleteTemplate), this.deleteTemplateBack, this);
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_templateChange), this.templateChanage, this);

			super.clean();
		}
	}
}