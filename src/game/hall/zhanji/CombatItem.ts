module game {
	export class CombatItem extends EComponent {
		private userItem1: CombatUserItem;
		private userItem2: CombatUserItem;
		private userItem3: CombatUserItem;
		private userItem4: CombatUserItem;
		private labelRoomType: eui.Label;
		private labelRoomNumber: eui.Label;
		private labelTurnInfo: eui.Label;
		private labelTime: eui.Label;
		private imgTemplateColor: eui.Image;


		private btnInfo: EButton;
		private btnView: EButton;
		private rectCombatData: eui.Rect;




		private combatData: CombatData;
		private fromClub: boolean = false;
		public constructor(combatData, fromClub) {
			super();
			this.skinName = "resource/skins/hall/zhanji/combatItemSkin.exml";
			this.combatData = combatData;
			this.fromClub = fromClub;
		}

		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnInfo, this.showGainList);
			this.addTapEvent(this.rectCombatData, this.getCombatReplayData);
			this.addTapEvent(this.btnView, this.getCombatReplayData);

			this.updateUI();
		}

		public setData(combatData, fromClub) {
			this.combatData = combatData;
			this.fromClub = fromClub;
			this.updateUI();
		}

		public updateUI() {
			if (this.isViewCreated && this.combatData != null) {
				this.labelRoomNumber.text = "房号:" + this.combatData.roomNumber;
				this.labelTurnInfo.text = "把数:" + this.combatData.curTurnNum + "/" + this.combatData.turnNumber;
				this.labelTime.text = DateUtils.dateFormat1(this.combatData.endTime, false);

				// this.labelRoomType.text = ConstantUtils.getRoomTypeName(this.combatData.roomType);
				this.labelRoomType.text = this.combatData.templateName;
				// this.imgTemplateColor.source = "img_color_room_"+this.combatData.getTemplateColor()+"_png";

				if (this.fromClub) {
					var hasView = this.combatData.hasView;
					this.btnInfo.visible = hasView;
					this.btnView.visible = !hasView;
				} else {
					this.btnInfo.visible = true;
					this.btnView.visible = false;
				}

				var userItems = [this.userItem1, this.userItem2, this.userItem3, this.userItem4];
				var len = userItems.length;
				var userlen = this.combatData.userList.length;
				for (var i = 0; i < len; i++) {
					if (i < userlen) {
						userItems[i].visible = true;
						if (this.combatData.calNum && this.combatData.calNum > 0)
							this.combatData.userList[i].showCalNum = true;
						userItems[i].setData(this.combatData.masterUserId, this.combatData.userList[i], this.fromClub);
					} else {
						userItems[i].visible = false;
					}
				}
			}
		}

		private getRulesInfo() {
			var s = "房号:" + this.combatData.roomNumber + "    ";
			s += ("把数:" + this.combatData.curTurnNum + "/" + this.combatData.turnNumber) + "    ";
			s += DateUtils.dateFormat(this.combatData.endTime);
			return s;
		}

		private showGainList() {
			var gainListDialog = new GainListDialog(this.combatData.roomId);
			DialogManager.getInstance().show(gainListDialog, EDialog.show_ani_type_null);
		}


		private getCombatReplayData() {
			CommonView.showWaiting()
			//hasView
			ZhanjiService.getInstance().getCombatReplayData(this.combatData.roomId, this.fromClub);
		}

	}
}