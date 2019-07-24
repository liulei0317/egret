module game {
	export class ClubRoomItem extends EComponent {
		private labelRoomType: eui.Label;
		private labelRoomNumber: eui.Label;
		private labelRoomTurnNum: eui.Label;
		private labelPayMode: eui.Label;


		private btnRoomInfo: EButton;

		private userItem1: ClubRoomUserItem;
		private userItem2: ClubRoomUserItem;
		private userItem3: ClubRoomUserItem;
		private userItem4: ClubRoomUserItem;
		// private img3Person:eui.Image;

		private btnCancelRoom: EButton;
		private btnInvitePlayer: EButton;
		private labelGaming: eui.Label;
		private labelTurnNum: eui.Label;
		private rectJoinRoom: eui.Label;

		private imgTemplateColor: eui.Image;

		private clubData: ClubData;
		private clubRoomData: ClubRoomData;



		public constructor(clubData, clubRoomData) {
			super();
			this.clubData = clubData;
			this.clubRoomData = clubRoomData;
			this.skinName = "resource/skins/club/room/clubRoomItemSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnRoomInfo, this.clickRoomInfo);
			this.addTapEvent(this.btnCancelRoom, this.clickCancelRoom);
			this.addTapEvent(this.rectJoinRoom, this.clickJoinRoom);

			this.addTapEvent(this.labelGaming, this.clickRoomProgress);
			this.addTapEvent(this.labelTurnNum, this.clickRoomProgress);
			this.updateUI();
		}

		public setData(clubData, data: any) {
			this.clubData = clubData;
			this.clubRoomData = data;
			this.updateUI();
		}

		public clickRoomInfo() {
			var p: egret.Point = this.btnRoomInfo.localToGlobal(this.btnRoomInfo.x, this.btnRoomInfo.y);
			var x = p.x - GlobalData.deltaX;
			var y = p.y - GlobalData.deltaY;
			TipsUtils.showTips(1, x - 100, y - 51, this.getRulesInfo_(), 280);
		}

		protected updateUI_() {
			if (this.clubRoomData != null) {
				var roomInfos: any = this.clubRoomData.roomJson;
				this.labelRoomType.text = roomInfos.templateName;

				this.labelRoomNumber.text = "房号:" + roomInfos.roomNumber;
				this.labelRoomTurnNum.text = roomInfos.turnNumber + ConstantUtils.getTurnModeName(roomInfos.turnMode);
				this.labelPayMode.text = ConstantUtils.getPayModeName(roomInfos.payMode, true)

				// if(this.clubRoomData.gaming){
				// 	this.img3Person.visible = (this.clubRoomData.roomUsers.length<4);
				// 	this.userItem4.visible = !this.img3Person.visible;
				// }else{
				// 	this.img3Person.visible = false;
				// 	this.userItem4.visible = !this.img3Person.visible;
				// }
				var userItems = [this.userItem1, this.userItem2, this.userItem3, this.userItem4];
				var len = this.clubRoomData.roomUsers.length;
				for (var i = 0; i < userItems.length; i++) {
					var userData = null;
					if (i < len) {
						userData = this.clubRoomData.roomUsers[i];
					}
					userItems[i].setData(userData, this.clubData.permissions, this.clubRoomData.gaming);
				}
				var turnNumberInfo = this.getCurTurnNumberInfo();

				this.imgTemplateColor.source = "img_color_room_" + this.clubRoomData.getTemplateColor() + "_png"

				var canCancelRoom = ClubService.getInstance().checkRight(this.clubData.permissions, ClubConst.PermissionType.Key_cancelRoom);
				if (canCancelRoom) {
					// var a = 1;
					// if(a == 1){
					this.labelTurnNum.textFlow = Utils.TextUtils.getOutLineStr(turnNumberInfo);
					this.btnCancelRoom.visible = true;
					if (this.clubRoomData.gaming) {
						this.btnInvitePlayer.visible = false;
						this.labelGaming.visible = true;
						this.labelTurnNum.visible = true;
						this.labelGaming.y = 12;
						this.labelTurnNum.y = 41;
						this.labelGaming.textFlow = Utils.TextUtils.getOutLineStr("游戏中");
					} else {
						this.btnInvitePlayer.visible = true;
						this.btnInvitePlayer.y = 2;
						this.labelGaming.visible = false;
						this.labelTurnNum.visible = false;
					}

				} else {
					this.labelTurnNum.text = turnNumberInfo;
					this.btnCancelRoom.visible = false;
					if (this.clubRoomData.gaming) {
						this.btnInvitePlayer.visible = false;
						this.labelGaming.visible = true;
						this.labelTurnNum.visible = true;
						var addy = 40;
						this.labelGaming.y = addy + 0;
						this.labelTurnNum.y = addy + 29;
					} else {
						this.btnInvitePlayer.visible = true;
						this.btnInvitePlayer.y = 33;
						this.labelGaming.visible = false;
						this.labelTurnNum.visible = false;
					}
				}
			}
		}



		private getRulesInfo() {
			var roomInfos: any = this.clubRoomData.roomJson;
			var s = "房号:" + roomInfos.roomNumber + "    ";

			s += roomInfos.turnNumber + ConstantUtils.getTurnModeName(roomInfos.turnMode) + "    ";
			s += ConstantUtils.getPayModeName(roomInfos.payMode, true) + "    ";
			if (roomInfos.autoHost) {
				s += "超时托管" + "    ";
			}
			return s;
		}

		private getCurTurnNumberInfo() {
			var roomInfos: any = this.clubRoomData.roomJson;
			if (roomInfos.turnMode == Constants.ROOM_TIME_MODE.ba) {
				return Utils.format("{0}/{1}把", this.clubRoomData.curTurnNum, roomInfos.turnNumber);
			} else {
				return Utils.format("{0} {1}/{2}圈", GameConst.DIRECT_DESC[this.clubRoomData.curTurnDirection], this.clubRoomData.curTurnNum, roomInfos.turnNumber);
			}
		}

		private getRulesInfo_() {
			return game.RoomUtils.getRulesInfo(this.clubRoomData.roomJson);
		}


		private clickCancelRoom() {
			var roomInfos: any = this.clubRoomData.roomJson;
			if (this.clubRoomData.gaming) {
				var dialog = new ClubCancelRoomConfirmDialog(roomInfos.roomNumber);
				DialogManager.getInstance().show(dialog);
				// ClubService.getInstance().forceCancelRoom(roomInfos.roomNumber);
			} else {
				RoomService.getInstance().cancelDaiKaiRoom(roomInfos.roomId);
			}
		}

		private clickJoinRoom() {
			var roomInfo: any = this.clubRoomData.roomJson;
			RoomService.getInstance().joinRoom(roomInfo.roomNumber);
		}

		private clickRoomProgress() {
			var dialog = new ClubRoomProgressDialog(this.clubData.clubId, this.clubRoomData.roomJson.roomId);
			DialogManager.getInstance().show(dialog);
		}

		public toString() {
			if (this.clubRoomData) {
				return this.clubRoomData.roomJson.roomNumber;
				// var userNum = this.clubRoomData.roomUsers.length;
				// var s:string = "";
				// for(var i:number = 0;i<userNum;i++){
				// 	var user:ClubRoomUserData = this.clubRoomData.roomUsers[i];
				// 	if(s.length >0 ){
				// 		s+=",";
				// 	}
				// 	s+=user.nickName;

				// }
				// return s;
			} else {
				return "null";
			}
		}
	}
}