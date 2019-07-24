module game {
    export class ClubLuckMemeberListData {
        public iconName: string
        public clubId: number
        public nickName: string
        public memberId: number
        public blessNum: number
        public hasOnline: boolean
        public parse(jsonData) {
            console.log(jsonData)
            this.iconName = jsonData.iconName
            this.clubId = jsonData.clubId
            this.nickName = jsonData.nickName
            this.memberId = jsonData.memberId
            this.blessNum = jsonData.blessNum
            this.hasOnline = jsonData.hasOnline
        }
    }
}