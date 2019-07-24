module game {
	export class ClubLuckyListGeneralItemBySelect extends EComponent {
		private clubData: ClubData
		private listData: ClubPartnerMemberListData
		private modifyAnyoneSwitch: boolean
		private groupData: ClubPartnerListData[]
		private obj: ClubPartnerBox
		//UI
		private headImage: eui.Image
		private Text_name: eui.Label
		private Text_ID: eui.Label
		private Image_admin_icon: eui.Image
		private Text_bless_num: eui.Label
		private Text_group_name: eui.Label
		private Button_setting: EButton
		private Button_settingBelong: EButton
		private CheckBox_selected: ERadioButton
		private selected: EButton
		public constructor(
			clubData: ClubData,
			partnerMemberListData: ClubPartnerMemberListData,
			groupData: ClubPartnerListData[],
			modifyAnyoneSwitch: boolean) {
			super()
			this.clubData = clubData
			this.listData = partnerMemberListData
			this.modifyAnyoneSwitch = modifyAnyoneSwitch
			this.groupData = groupData
			this.skinName = "resource/skins/club/partner/clubLuckyListGeneralItemBySelect.exml"
		}
		public onCreateViewComplete(): void {
			super.onCreateViewComplete()
			this.CheckBox_selected.setText("")
			this.addTapEvent(this.selected, () => {
				this.listData.isSelected = !this.listData.isSelected
				if (this.listData.isSelected)
					this.obj.selectedCount++
				else
					this.obj.selectedCount--
				if (this.obj.selectedCount > 10) {
					DialogManager.getInstance().popUp1("最多可以选择10名玩家")
					this.obj.selectedCount--
					this.listData.isSelected = false
				}
				this.CheckBox_selected.setSelected(this.listData.isSelected)
			})
			this.addTapEvent(this.Button_settingBelong, this.clickBtnSetBelong)
			this.addTapEvent(this.Button_setting, this.clickBtnSetting)
			this.updateUI()
		}
		public setData(clubData: ClubData, data: ClubPartnerMemberListData) {
			this.clubData = clubData
			this.listData = data
			this.updateUI()
		}
		public setObj(ojb: ClubPartnerBox) {
			this.obj = ojb
		}
		private clickBtnSetting() {
			if (this.modifyAnyoneSwitch) {
				let data = {
					clubId: this.clubData.clubId,
					member:
					[
						{
							nickName: this.listData.nickName,
							id: this.listData.memberId,
							blessNum: this.listData.blessNum
						}
					],
					curGroup: {
						groupId: this.listData.groupId,
						groupName: this.listData.groupName
					},
					group: this.groupData,
					modifyAnyoneSwitch: this.modifyAnyoneSwitch
				}
				let dialog = new ClubSetBelongToBox(data)
				DialogManager.getInstance().show(dialog)
			}
			else {
				if (this.listData.userType == 0) {
					let data = {
						clubId: this.clubData.clubId,
						member:
						[
							{
								nickName: this.listData.nickName,
								id: this.listData.memberId,
								blessNum: this.listData.blessNum,
								headImgUrl: this.listData.iconName
							}
						],
						curGroup: {
							groupId: this.listData.groupId,
							groupName: this.listData.groupName
						},
						group: this.groupData,
						modifyAnyoneSwitch: this.modifyAnyoneSwitch
					}
					let dialog = new ClubSetManagerAndGroupBox(data)
					DialogManager.getInstance().show(dialog)
				}
				else if (this.listData.userType == 1) {
					let data = {
						clubId: this.clubData.clubId,
						member:
						[
							{
								nickName: this.listData.nickName,
								id: this.listData.memberId,
								blessNum: this.listData.blessNum,
								headImgUrl: this.listData.iconName
							}
						],
						curGroup: {
							groupId: this.listData.groupId,
							groupName: this.listData.groupName
						}
					}
					let dialog = new ClubCancelManagerBox(data)
					DialogManager.getInstance().show(dialog)
				}
			}
		}
		private clickBtnSetBelong() {
			let data = {
				clubId: this.clubData.clubId,
				member:
				[
					{
						nickName: this.listData.nickName,
						id: this.listData.memberId,
						blessNum: this.listData.blessNum
					}
				],
				curGroup: {
					groupId: this.listData.groupId,
					groupName: this.listData.groupName
				},
				group: this.groupData,
				modifyAnyoneSwitch: this.modifyAnyoneSwitch
			}
			let dialog = new ClubSetBelongToBox(data)
			DialogManager.getInstance().show(dialog)
		}
		protected updateUI_() {
			this.CheckBox_selected.setSelected(this.listData.isSelected)
			GameUtils.sub(this.Text_name, this.listData.nickName, 114)
			ResManager.loadWebImage(this.listData.iconName, (texture: any, imgUrl: any) => {
				if (this.listData.iconName != imgUrl) {
					return
				}
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
			if (this.listData.groupId == 0) {
				this.Button_settingBelong.visible = true
				this.Button_setting.visible = false
			}
			else {
				this.Button_settingBelong.visible = false
				this.Button_setting.visible = true
			}
		}
		public clean() {
			super.clean()
		}
	}
}