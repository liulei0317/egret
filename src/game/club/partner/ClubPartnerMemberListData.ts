module game {
	export class ClubPartnerMemberListData {
		public blessNum: number
		public canModifyPower: boolean
		public clubId: number
		public groupId: number
		public groupName: string
		public iconName: string
		public memberId: number
		public nickName: string
		public userType: number
		public isSelected: boolean = false
		public parse(jsonData) {
			this.blessNum = jsonData.blessNum
			this.canModifyPower = jsonData.canModifyPower
			this.clubId = jsonData.clubId
			this.groupId = jsonData.groupId
			this.groupName = jsonData.groupName
			this.iconName = jsonData.iconName
			this.memberId = jsonData.memberId
			this.nickName = jsonData.nickName
			this.userType = jsonData.userType
		}
	}
}