
class ClubRoomUI extends game.EComponent {
	private scrollerTables: EScroller;

	private clubRoomDataList: game.ClubRoomData[];
	private clubData: game.ClubData;
	// private clubId:string;
	public constructor() {
		super();
		this.skinName = "resource/skins/club/room/clubRoomUISkin.exml";
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();

		game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_ROOMINFOLIST), this.getClubRoomListBack, this);
		game.EAppFacade.getInstance().registerCommand(game.GameCmd.CLICK_CLUB_Rooms, this.getClubRoomList, this);
		game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_ROOMINFO_CHANGE), this.roomInfoChange, this);
		game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_templateChange), this.templateChanage, this);
		this.initScroller();


	}

	protected updateUI_() {
		// this.scrollerTables.clearContent();
		this.sortRoomList();
		this.scrollerTables.setScrollerContent(this.clubRoomDataList, false);
	}

	private initScroller() {
		// this.scrollerTables.setScrollerHeight(434);
		this.scrollerTables.setElementViewInfo(152, 8);
		this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
		this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
		this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
	}


	private createElement(data) {

		var item = new game.ClubRoomItem(this.clubData, data);
		return item;
	}

	private updateElement(item: game.ClubRoomItem, data: any) {
		item.setData(this.clubData, data);
		console.info("roomData == "+item.toString());
	}

	private updateElementUI(item: game.ClubRoomItem) {
		item.updateUI();
	}

	private getClubRoomList(event: egret.Event) {
		if (event.data != null) {
			this.clubData = event.data;
			game.ClubService.getInstance().getClubRoomList(event.data.clubId);
		}
	}

	private getClubRoomListBack(event: egret.Event) {
		var msgDomain: game.MsgDomain = event.data;
		if (msgDomain.code == game.CmdResultType.SUCCESS) {
			this.clubRoomDataList = [];
			var jsonData = msgDomain.data;
			var roomList = jsonData.getBoardInfos;
			for (var key in roomList) {
				var itemData = roomList[key];
				var clubRoomData = new game.ClubRoomData();
				clubRoomData.parse(itemData);
				this.clubRoomDataList.push(clubRoomData);
			}
			game.ClubService.getInstance().setPushNotice(this.clubData.clubId, true);
			this.updateUI();
		}
	}

	/**
	 * 将一个规则下的游戏中房间与空闲房间分开
	 */
	private divideTemplateRoom(list){
		var idleList = [];
		var gameingList = [];
		var len = list.length;
		for(var i:number = 0;i<len;i++){
			var clubRoomData:game.ClubRoomData = list[i];
			if(clubRoomData.gaming || clubRoomData.getCreatePlayerNum() == clubRoomData.roomUsers.length){
				gameingList.push(clubRoomData);
			}else{
				idleList.push(clubRoomData);
			}
		}
		//将空闲的排序
		idleList.sort((a: game.ClubRoomData, b: game.ClubRoomData): number => {
			var aUserNumber = a.roomUsers.length
			var bUserNumber = b.roomUsers.length
			if (aUserNumber != bUserNumber) {
				return bUserNumber - aUserNumber
			}
			else {
				var aroomJson: any = a.roomJson
				var broomJson: any = b.roomJson
				return  aroomJson.roomId - broomJson.roomId ;
			}
		})		

		//将游戏中的排序
		gameingList.sort((a: game.ClubRoomData, b: game.ClubRoomData): number => {
			var aroomJson: any = a.roomJson
			var broomJson: any = b.roomJson
			return  aroomJson.roomId - broomJson.roomId ;
		})			

		return {idleList:idleList,gameingList:gameingList};
	}

	private sortRoomList() {
		var map = this.list2Map(this.clubRoomDataList);
		var templateIds = map.keySet();
		templateIds.sort();

		// this.clubRoomDataList.splice(0);
		
		var outList1 = [];
		var outList2 = [];
		var outList3 = [];
		var len = templateIds.length;
		for(var i:number=0;i<len;i++){
			var templateId = templateIds[i];
			var roomlist = map.get(templateId);

			var divideObj = this.divideTemplateRoom(roomlist);
			var idleList = divideObj.idleList;
			var gameingList = divideObj.gameingList;

			//将空闲列表中取出第一个房间，放到第1组中
			if(idleList.length>0){
				var first = idleList.shift();
				outList1.push(first);
			}
			//游戏中的放到第2组中
			outList2 = outList2.concat(gameingList);

			//把空闲中剩余的放到第3组中
			outList3 = outList3.concat(idleList);

			// outList = outList.concat(roomlist);
		}
		var outList = [];
		outList = outList.concat(outList1);
		outList = outList.concat(outList2);
		outList = outList.concat(outList3);
		this.clubRoomDataList = outList;

		// var deskListData = this.clubRoomDataList
		// deskListData.sort((a: game.ClubRoomData, b: game.ClubRoomData): number => {
		// 	var aUserNumber = a.roomUsers.length
		// 	var bUserNumber = b.roomUsers.length
		// 	if (aUserNumber != bUserNumber) {
		// 		return bUserNumber - aUserNumber
		// 	}
		// 	else {
		// 		var aroomJson: any = a.roomJson
		// 		var broomJson: any = b.roomJson
		// 		return  aroomJson.roomId - broomJson.roomId ;
		// 	}
		// })
		// //检查第一个是否满员
		// var firstData = deskListData[0]
		// if (firstData != null && (firstData.roomUsers.length == 4 || firstData.gaming)) {
		// 	deskListData.sort((a, b): number => {
		// 		var aUserNumber = a.roomUsers.length
		// 		var bUserNumber = b.roomUsers.length
		// 		return bUserNumber - aUserNumber 
		// 	})
		// 	var swapIndex = -1
		// 	for (var i = 0; i < deskListData.length; i++) {
		// 		var tempData = deskListData[i]
		// 		if (tempData != null && (tempData.roomUsers.length < 4 && !tempData.gaming)) {
		// 			swapIndex = i
		// 			break
		// 		}
		// 	}

		// 	if (swapIndex != -1) {
		// 		var tmpData = deskListData[swapIndex]
		// 		deskListData[swapIndex] = firstData
		// 		deskListData[0] = tmpData
		// 	}
		// }
	}


	private list2Map(list){
		var map = new game.HashMap();
		var deskListData = list;
		var templateIds = [];
		var len = deskListData.length;
		for(var i:number = 0;i<len;i++){
			var clubRoomData = deskListData[i];
			var templateId = clubRoomData.getTemplateId();
			var roomlist = [];
			if(map.containsKey(templateId)){
				roomlist = map.get(templateId);
			}else{
				roomlist = [];
				map.put(templateId,roomlist);
			}
			roomlist.push(clubRoomData);
		}
		return map;
	}

	// private sortRoomList() {
	// 	if (this.clubRoomDataList != null) {
	// 		this.clubRoomDataList.sort((a: game.ClubRoomData, b: game.ClubRoomData): number => {
	// 			var numA = (a.roomUsers.length > 0) ? 10000 : 0;
	// 			var numB = (b.roomUsers.length > 0) ? 10000 : 0;

	// 			numA += !a.gaming ? 1000 : 0;
	// 			numB += !b.gaming ? 1000 : 0;

	// 			numA += a.roomUsers.length * 100;
	// 			numB += b.roomUsers.length * 100;

	// 			if (numA < numB) {
	// 				return 1;
	// 			} else if (numA > numB) {
	// 				return -1;
	// 			} else {
	// 				// if(a.)
	// 				return 0;
	// 			}

	// 		})
	// 	}
	// }

	private roomInfoChange(event: egret.Event) {
		if (event.data != null) {
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {

				var data = msgDomain.data;
				var clubRoomInfo = new game.ClubRoomInfoChangeInfo();
				clubRoomInfo.parse(data);

				if (clubRoomInfo.type == 0) {
					this.clubRoomDataList.push(clubRoomInfo.clubRoomData);
					// this.scrollerTables.addItem(clubRoomInfo.clubRoomData);
				} else if (clubRoomInfo.type == 1) {
					var index = this.getClubRoomDataIndex(clubRoomInfo.roomId);
					if (index != -1) {
						this.clubRoomDataList[index] = clubRoomInfo.clubRoomData;
					}
				} else if (clubRoomInfo.type == 2) {
					var index = this.getClubRoomDataIndex(clubRoomInfo.roomId);
					if (index != -1) {
						this.clubRoomDataList.splice(index, 1);
					}
					// this.scrollerTables.removeItem();
				}
				this.updateUI();
			}
		}
	}

	private getClubRoomDataIndex(roomId) {
		var len = this.clubRoomDataList.length;
		for (var i = 0; i < len; i++) {
			var roomJson: any = this.clubRoomDataList[i].roomJson;
			if (roomJson.roomId == roomId) {
				return i;
			}
		}
		return -1;
	}

	private clickBack() {
		game.SceneSkip.skipToHallScene();
	}
	private clickCreateClub() {

	}
	private clickJoinClub() {
		var dialog = new game.JoinClubDialog();
		game.DialogManager.getInstance().show(dialog, game.EDialog.show_ani_type_null);
	}
	private clickInviteMember() {

	}
	private clickApplyRecord() {

	}
	private clickEditNotice() {

	}

	private templateChanage(event:egret.Event){
		if (event.data != null) {
			var msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {

				var data = msgDomain.data;
				var templateId = data.templateId;
				var type = data.type;
				var roomJson = data.templateInfo;
				var clubRuleData = new game.ClubRuleData(roomJson);

				if (type == 3) {
					var len = this.clubRoomDataList.length;
					for(var i:number = 0;i<len;i++){
						if(this.clubRoomDataList[i].roomJson.templateId == templateId){
							this.clubRoomDataList[i].updateTemplateInfo(clubRuleData);
						}
					}
					this.updateUI();
				}
				
			}
		}
	}		

	public clean() {
		game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_ROOMINFOLIST), this.getClubRoomListBack, this);
		game.EAppFacade.getInstance().removeCommand(game.GameCmd.CLICK_CLUB_Rooms, this.getClubRoomList, this);
		game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_ROOMINFO_CHANGE), this.roomInfoChange, this);
		game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_templateChange), this.templateChanage, this);

		super.clean();
	}

}

window["ClubRoomUI"] = ClubRoomUI