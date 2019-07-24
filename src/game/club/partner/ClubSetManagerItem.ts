module game {
	export class ClubSetManagerItem extends EComponent {
		private data
		private Button_setManager: EButton
		private headImage: eui.Image
		private Text_name: eui.Label
		private Text_ID: eui.Label
		public constructor() {
			super()
			this.skinName = "resource/skins/club/partner/clubSetManagerItem.exml"
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.addTapEvent(this.Button_setManager, () => {
				let requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_OPPART_SET_MANAGER, {
					clubId: this.data.clubId,
					groupId: this.data.groupId,
					memberId: this.data.member.id,
					userType: 1,
				})
				SocketManager.getInstance().send(requestDomain)
			})
		}
		public setData(data) {
			this.data = data
			this.updateUI()
		}
		protected updateUI_() {
			ResManager.loadWebImage(this.data.member.headImgUrl, (texture: any) => {
				this.headImage.texture = texture;
				this.headImage.addEventListener(eui.UIEvent.COMPLETE, () => {
					this.headImage.texture = texture;
				}, this)
			}, this)
			GameUtils.sub(this.Text_name, this.data.member.nickName, 114)
			this.Text_ID.text = "ID:" + this.data.member.id
		}
		public clean() {
			super.clean()
		}
	}
}