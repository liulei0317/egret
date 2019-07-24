module game {
	export class ClubWatcherDialog extends EDialog{
		private scrollerTables: EScroller;
		private btnClose:EButton;

		private clubId:string;
		private clubWatcherDataList: game.ClubWatcherData[];
		
		public constructor(clubId:string) {
			super(null,false);
			this.clubId = clubId;
			this.skinName = "resource/skins/club/watcher/clubWatcherDialogSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);

			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_all_manager), this.getClubManagerListBack, this);
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_setWatcher), this.operCallback, this);
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_setWatcher),this.operCallback,this);

			this.initScroller();

			this.getClubManagerList();
		}

		private initScroller() {
			// this.scrollerTables.setScrollerHeight(434);
			this.scrollerTables.setElementViewInfo(124, 8);
			this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
			this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
			this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
		}	

		protected updateUI_(){
			this.scrollerTables.setScrollerContent(this.clubWatcherDataList, false);
		}


		private createElement(data) {
			var item = new game.ClubWatcherItem(this.clubId,data);
			return item;
		}

		private updateElement(item: game.ClubWatcherItem, data: any) {
			item.setData(data);
			// console.info("roomData == "+item.toString());
		}

		private updateElementUI(item: game.ClubWatcherItem) {
			item.updateUI();
		}

		private getClubManagerList() {
			game.ClubService.getInstance().getManagerList(this.clubId);
		}

		private getClubManagerListBack(event: egret.Event) {	
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				this.clubWatcherDataList = [];
				var jsonData = msgDomain.data;
				var ruleList = jsonData.managerList;
				for (var key in ruleList) {
					var temp = ruleList[key];
					var clubWatcherData = new game.ClubWatcherData();
					clubWatcherData.parse(temp);
					this.clubWatcherDataList.push(clubWatcherData);
				}
				this.updateUI();
			}
		}

		private addRule(){
			var dialog = new CreateRoomDialog(this.clubId);
			DialogManager.getInstance().show(dialog);			
		}		

		private operCallback(event:egret.Event){
			var msgDomain:game.MsgDomain = event.data;
			if(msgDomain.code == game.CmdResultType.SUCCESS){
				var clubMemberData:game.ClubMemberData = msgDomain.data;
				this.updateData(clubMemberData);
				this.updateUI();
			}        
		}		

		private updateData(clubWatcherData:game.ClubWatcherData):boolean{
			var len = 0;
			if(this.clubWatcherDataList!=null){
				len = this.clubWatcherDataList.length;
			}
			for(var i=0;i<len;i++){
				if(this.clubWatcherDataList[i].memberId == clubWatcherData.memberId){
					this.clubWatcherDataList[i] = clubWatcherData;
					// return true;
				}else{
					this.clubWatcherDataList[i].watcher = false;
				}
			}
			return false;
    	}  		

		public clean(){
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_all_manager), this.getClubManagerListBack, this);
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_setWatcher), this.operCallback, this);
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_setWatcher),this.operCallback,this);

			super.clean();
		}
	}
}