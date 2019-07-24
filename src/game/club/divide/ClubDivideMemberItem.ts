module game {
	export class ClubDivideMemberItem extends game.EComponent {
		private diviData = null;
		private imgHead: eui.Image;
		private lbName: eui.Label;
		private lbID: eui.Label;
		private lbAdderName: eui.Label;
		private lbAddTime: eui.Label;
		private btnRemove: EButton;

		private data: any
		public constructor(diviData, data) {
			super();
			this.diviData = diviData
			this.data = data
			this.skinName = "resource/skins/club/divide/ClubDivideMemberItem.exml";
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete();
			game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_Divide_removeDivideMember), this.removeMemberBack, this)
			this.addTapEvent(this.btnRemove, () => {
				DialogManager.getInstance().popUp2("确定要移除玩家" + this.data.nickName + "么?", () => {
					let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_CLUB_Divide_removeDivideMember,
						{
							clubId: this.diviData.clubId,
							divideId: this.diviData.divideId,
							memberId: this.data.memberId
						});
					SocketManager.getInstance().send(requestDomain);
				})
			});
			// this.lbDate.touchEnabled = false
			this.updateUI();
		}
		public setData(data: any) {
			this.data = data
			this.updateUI();
		}
		private removeMemberBack(event: egret.Event) {
			let msgDomain: game.MsgDomain = event.data;
			if (msgDomain.code == game.CmdResultType.SUCCESS) {
				let data = msgDomain.data
				EAppFacade.getInstance().sendNotification(game.GameCmd.CLUB_REMOVE_DIVIDE_MEMBER, data)
			}
		}
		protected updateUI_() {
			ResManager.loadWebImage(this.data.headImgUrl, (texture: egret.Texture): void => {
				this.imgHead.texture = texture
				this.imgHead.addEventListener(eui.UIEvent.COMPLETE, () => {
					this.imgHead.texture = texture;
				}, this)
			}, this)
			//名字
			GameUtils.sub(this.lbName, this.data.nickName, 117)
			//UID
			this.lbID.text = "ID:" + this.data.memberId
			GameUtils.sub(this.lbAdderName, this.data.operatorName, 141)
			this.lbAddTime.text = DateUtils.dateFormat1(Number(this.data.recordTime), false)
		}
		public clean() {
			super.clean();
		}
	}
}