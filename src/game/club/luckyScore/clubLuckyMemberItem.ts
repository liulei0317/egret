module game {
	export class clubLuckyMemberItem extends game.EComponent {
		private clubData: game.ClubData;
		private imgHead: eui.Image;
		private lbName: eui.Label;
		private lbID: eui.Label;
		private lbBless: eui.Label;
		private lbIsOnline: eui.Label;
		private btnModify: EButton;
		private listData: any;
		public constructor(clubData: ClubData, blessRecordData) {
			super();
			this.clubData = clubData
			this.listData = blessRecordData
			this.skinName = "resource/skins/club/luckyScore/clubLuckyMemberItem.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			this.addTapEvent(this.btnModify, () => {
				let dialog = new ClubLuckySendBox({
					clubId: this.clubData.clubId,
					userId: this.listData.memberId,
					nickName: this.listData.nickName,
					iconName: this.listData.iconName,
				});
				DialogManager.getInstance().show(dialog, game.EDialog.show_ani_type_null);
			})
			this.updateUI();
		}
		public setData(clubData: ClubData, data: any) {
			this.clubData = clubData;
			this.listData = data;
			this.updateUI();
		}
		protected updateUI_() {
			ResManager.loadWebImage(this.listData.iconName, (texture: egret.Texture): void => {
				this.imgHead.texture = texture
				this.imgHead.addEventListener(eui.UIEvent.COMPLETE, () => {
					this.imgHead.texture = texture;
				}, this)
			}, this)
			//名字
			GameUtils.sub(this.lbName, this.listData.nickName, 117)
			//UID
			this.lbID.text = "" + this.listData.memberId
			//体力
			this.lbBless.text = "" + this.listData.blessNum
			//在线状态
			if (this.listData.hasOnline) {
				this.lbIsOnline.text = "在线"
				this.lbIsOnline.textColor = 0x53C018
			} else {
				this.lbIsOnline.text = "离线"
				this.lbIsOnline.textColor = 0xE0361A
			}
		}
		public clean() {
			super.clean();
		}
	}
}