module game {
	export class ClubPartnerNameItem extends EComponent {
		private clubData: ClubData
		private listData: ClubPartnerListData
		private callBack: Function
		//UI
		private tab: EToggleButton
		private group_unSet: eui.Group
		private group_admin: eui.Group
		private group_normal: eui.Group
		private admin_icon: eui.Image
		private unset_icon: eui.Image
		private Text_name: eui.Label
		private Text_admin: eui.Label
		private Text_unSet: eui.Label
		public constructor(clubData: ClubData, partnerListData: ClubPartnerListData, clickCallBack: Function) {
			super()
			this.clubData = clubData
			this.listData = partnerListData
			this.skinName = "resource/skins/club/partner/clubPartnerNameItem.exml"
			this.callBack = clickCallBack
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.addTapEvent(this.tab, () => {
				this.callBack(this.listData.idx)
			})
			this.updateUI()
		}
		public setData(clubData: ClubData, data: ClubPartnerListData) {
			this.clubData = clubData
			this.listData = data
			this.updateUI()
		}
		protected updateUI_() {
			this.tab.selected = this.listData.isSelected
			//根据类型选择显示哪个标签组
			let selectedColor = Utils.RGBA2Color(255, 255, 255)
			let selectedStrokeColor = Utils.RGBA2Color(144, 66, 22)
			let unSelectedColor = Utils.RGBA2Color(128, 93, 49)
			let unSelectedStrokeColor = Utils.RGBA2Color(244, 214, 163)
			let curSelectedColor = this.listData.isSelected ? selectedColor : unSelectedColor
			let curStrokeColor = this.listData.isSelected ? selectedStrokeColor : unSelectedStrokeColor
			switch (this.listData.type) {
				case 0:
					this.group_admin.visible = true
					this.group_unSet.visible = this.group_normal.visible = false
					this.admin_icon.source = this.listData.isSelected ? "img_admin1_png" : "img_admin2_png"
					this.Text_admin.textColor = curSelectedColor
					this.Text_admin.strokeColor = curStrokeColor
					break
				case 1:
					this.group_unSet.visible = true
					this.group_admin.visible = this.group_normal.visible = false
					this.unset_icon.source = this.listData.isSelected ? "img_set1_png" : "img_set_png"
					this.Text_unSet.textColor = curSelectedColor
					this.Text_unSet.strokeColor = curStrokeColor
					break
				default:
					this.group_normal.visible = true
					this.group_admin.visible = this.group_unSet.visible = false
					this.Text_name.text = this.listData.name
					this.Text_name.textColor = curSelectedColor
					this.Text_name.strokeColor = curStrokeColor
					break
			}
		}
		public clean() {
			super.clean()
		}
	}
}