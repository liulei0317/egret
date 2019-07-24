module game {
	export class ClubLuckyListGeneralItem2 extends EComponent {
		private clubData: ClubData
		private listData: ClubPartnerMemberListData
		//UI
		private headImage: eui.Image
		private Text_name: eui.Label
		private Text_ID: eui.Label
		private Image_admin_icon: eui.Image
		private Text_bless_num: eui.Label
		private Text_group_name: eui.Label
		private Button_send: EButton
		public constructor(clubData: ClubData, partnerMemberListData: ClubPartnerMemberListData) {
			super()
			this.clubData = clubData
			this.listData = partnerMemberListData
			this.skinName = "resource/skins/club/partner/clubLuckyListGeneralItem2.exml"
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.updateUI()
		}
		public setData(clubData: ClubData, data: ClubPartnerMemberListData) {
			this.clubData = clubData
			this.listData = data
			this.updateUI()
		}
		protected updateUI_() {
			GameUtils.sub(this.Text_name, this.listData.nickName, 114)
			ResManager.loadWebImage(this.listData.iconName, (texture: any) => {
				this.headImage.texture = texture
				this.headImage.addEventListener(eui.UIEvent.COMPLETE, () => {
					this.headImage.texture = texture
				}, this)
			}, this)
			this.Text_ID.text = "ID:" + this.listData.memberId
			this.Image_admin_icon.visible = (this.listData.userType == 1)
			this.Text_group_name.text = (this.listData.groupName == "" ? "无" : this.listData.groupName)
			this.Text_bless_num.text = "" + this.listData.blessNum
			this.Text_bless_num.visible = this.clubData.superBlessSwitch
		}
		public clean() {
			super.clean()
		}
	}
}