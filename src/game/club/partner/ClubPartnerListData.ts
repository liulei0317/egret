module game {
	export class ClubPartnerListData {
		public idx: number
		public type: number
		public name: string
		public id: number
		public isSelected: boolean = false
		public parse(jsonData) {
			this.idx = jsonData.idx
			this.type = jsonData.type
			this.name = jsonData.name
			this.id = jsonData.id
			this.isSelected = jsonData.isSelected
		}
	}
}