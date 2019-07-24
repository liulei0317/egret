module game {
	export class ClubAddDivideMemberBoxItem extends game.EComponent {
		private diviData = null;
		private imgHead: eui.Image;
		private added: eui.Label;
		private lbName: eui.Label;
		private lbID: eui.Label;
		private btn_Add: EButton;

		private data: any
		public constructor(diviData, data) {
			super();
			this.diviData = diviData
			this.data = data
			this.skinName = "resource/skins/club/divide/ClubAddDivideMemberBoxItem.exml";
		}
		public onCreateViewComplete(): void {
			this.addTapEvent(this.btn_Add, () => {
				DialogManager.getInstance().popUp2("确定添加玩家" + this.data.memberName + "为隔离成员么？", () => {
					let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_Divide_addDivideMember,
						{
							clubId: this.diviData.clubId,
							divideId: this.diviData.divideId,
							memberId: this.data.memberId
						});
					SocketManager.getInstance().send(requestDomain);
				})
			})
			super.onCreateViewComplete();
			this.updateUI();
		}
		public setData(data: any) {
			this.data = data
			this.updateUI();
		}
		protected updateUI_() {
			this.added.visible = this.data.hasDivided
			this.btn_Add.visible = !this.data.hasDivided
			ResManager.loadWebImage(this.data.headImgUrl, (texture: egret.Texture): void => {
				this.imgHead.texture = texture
				this.imgHead.addEventListener(eui.UIEvent.COMPLETE, () => {
					this.imgHead.texture = texture;
				}, this)
			}, this)
			//名字
			GameUtils.sub(this.lbName, this.data.memberName, 178)
			//UID
			this.lbID.text = "ID:" + this.data.memberId
			// }
		}
		public clean() {
			super.clean();
		}
	}
}