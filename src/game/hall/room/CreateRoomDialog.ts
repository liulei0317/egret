module game {
	export class CreateRoomDialog extends EDialog {
		private btnClose: EButton;
		private btnCreate: EButton;
		private labelDiamond: eui.Label;
		private panelMahjong: CreateRoomMahjong;

		private clubId: string = null;
		public constructor(clubId) {
			super(Constants.UI_PANEL_DATA_SET.create_room.index);
			this.clubId = clubId;
			this.skinName = "resource/skins/hall/room/createRoomDialogSkin.exml";
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose, this.close);
			this.addTapEvent(this.btnCreate, this.clickCreateRoom);
			this.panelMahjong.setClubId(this.clubId);

			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CREATE_ROOM), this.createRoomCallBack, this);
			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_createTemplate), this.addRuleCallBack, this);
			EAppFacade.getInstance().registerCommand(GameCmd.DIAMOND_NUMBER_CHANGE, this.diamondChange, this);
			this.updateUI();
		}

		protected updateUI_() {
			this.labelDiamond.text = "" + GlobalData.userData.getDiamondNum();
		}

		private clickCreateRoom() {
			var roomJson = this.panelMahjong.getAdjustRoomInfo();

			// var diamondCosts = game.CreateRoomCost.getDiamondCostNums();
			// var diamondCost = game.CreateRoomCost.getDiamondCostNum(diamondCosts,roomJson.roomType,roomJson.payMode,roomJson.turnMode,roomJson.turnNumber);

			// if(roomJson.clubId != null && roomJson.clubId.length>0 && roomJson.payMode == Constants.ROOM_PAY_MODE.AA){

			// }else{
			// 	if(GlobalData.userData.getDiamondNum()<diamondCost){
			// 		CommonView.showToast("创建房间钻石不够了");
			// 		return;
			// 	}
			// }
			if (this.clubId) {
				ClubRuleService.getInstance().addRule(this.clubId, roomJson);
			} else {
				RoomService.getInstance().createRoom(roomJson);
			}
		}

		private createRoomCallBack(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				this.panelMahjong.saveLocalRoomInfo();
				// this.updateUI();
				this.close();
			} else {
				if (msgDomain.errorCode == MsgConstant.ERROR_diamondNoEnough) {
					CommonView.showToast("创建房间钻石不够了");
				}
			}
		}

		private addRuleCallBack(event: egret.Event) {
			var msgDomain: MsgDomain = event.data;
			if (msgDomain.code == CmdResultType.SUCCESS) {
				// this.panelMahjong.saveLocalRoomInfo();
				// this.updateUI();
				this.close();
			} else {
				if (msgDomain.errorCode == MsgConstant.ERROR_template_top_limit) {
					CommonView.showToast("房间规则已达到上限，不能再增加");
				}
			}
		}

		private diamondChange() {
			var diamond = GlobalData.userData.getDiamondNum();
			this.labelDiamond.text = "" + diamond;
		}

		public clean() {
			EAppFacade.getInstance().removeCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CREATE_ROOM), this.createRoomCallBack, this);
			EAppFacade.getInstance().removeCommand(GameCmd.DIAMOND_NUMBER_CHANGE, this.diamondChange, this);

			super.clean();
		}

	}
}