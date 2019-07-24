module game {
	export class ClubRoomProgressDialog extends EDialog{
		private scrollerTables: EScroller;
		private btnClose:EButton;
		private btnCancelRoom:EButton;

		private labelRoomNumber:eui.Label;
		private labelTurnNum:eui.Label;
		private labelRoomType:eui.Label;
		private labelTotalTime:eui.Label;

		private clubId:string;
		private roomId:number;

		private roomProgressInfo:any;
		private msgUserDataList:any;
		
		public constructor(clubId:string,roomId:number) {
			super(null,false);
			this.clubId = clubId;
			this.roomId = roomId;
			this.skinName = "resource/skins/club/room/ClubRoomProgressDialogSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);
			this.addTapEvent(this.btnCancelRoom,this.clickCancelRoom);
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_roominfo_progress), this.getRoomProgressInfoBack, this);
			this.initScroller();

			this.getRoomProgressInfo();
		}

		private initScroller() {
			// this.scrollerTables.setScrollerHeight(434);
			this.scrollerTables.setElementViewInfo(47, 10);
			this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
			this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
			this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
		}	

		protected updateUI_(){
			this.labelRoomNumber.text = "房间号:"+this.roomProgressInfo.roomNumber;

			var progress = "进度:";
			var turnMode = this.roomProgressInfo.turnMode;
			var curTurnNum = this.roomProgressInfo.curTurnNum;
			var turnNumber = this.roomProgressInfo.turnNumber;
			var curTurnDirection = this.roomProgressInfo.curTurnDirection;
			var curTurnDirection = this.roomProgressInfo.curTurnDirection;
			if(turnMode == Constants.ROOM_TIME_MODE.ba){
				progress+=Utils.format("{0}/{1}把",curTurnNum,turnNumber);
			}else{
				progress+=Utils.format("{0} {1}/{2}圈",GameConst.DIRECT_DESC[curTurnDirection],curTurnNum,turnNumber);
			}

			var roomType = this.roomProgressInfo.roomType;
			this.labelTurnNum.text = progress;
			this.labelRoomType.text = "类型:"+ConstantUtils.getRoomTypeName(roomType);
			this.labelTotalTime.text = "进行时间:"+DateUtils.dateDesc(this.roomProgressInfo.durationTime);

			this.scrollerTables.setScrollerContent(this.msgUserDataList, false);
		}




		private createElement(data) {
			var item = new game.ClubRoomProgressItem(data);
			return item;
		}

		private updateElement(item: game.ClubRoomProgressItem, data: any) {
			item.setData(data);
			// console.info("roomData == "+item.toString());
		}

		private updateElementUI(item: game.ClubRoomProgressItem) {
			item.updateUI();
		}

		private getRoomProgressInfo() {
			game.ClubService.getInstance().getRoomProgressInfo(this.clubId,this.roomId);
		}

		private getRoomProgressInfoBack(event: egret.Event) {	
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				var jsonData = msgDomain.data;
				this.roomProgressInfo = jsonData.roomProgressInfo;

				this.msgUserDataList = jsonData.roomProgressInfo.msgUserDatas;
				this.updateUI();
			}
		}

		private clickCancelRoom(){
			this.close();
			var dialog = new ClubCancelRoomConfirmDialog(this.roomProgressInfo.roomNumber);
			DialogManager.getInstance().show(dialog);		
		}

		

		public clean(){
		
			game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_roominfo_progress), this.getRoomProgressInfoBack, this);

			super.clean();
		}
	}
}