module game {
    export class ClubBlessChangedRecordsData {
        public changeNum: number
        public clubId: string
        public createTime: number
        public curBlessNum: number
        public id: number
        public nickName: string
        public operId: number
        public operName: string
        public operTypeInfo: string
        public roomId: number
        public roomNumber: string

        public source: number
        public userId: number
        public parse(jsonData) {
            console.log(jsonData)
            this.changeNum = jsonData.changeNum
            this.clubId = jsonData.clubId
            this.createTime = jsonData.createTime
            this.curBlessNum = jsonData.curBlessNum
            this.id = jsonData.id
            this.nickName = jsonData.nickName
            this.operId = jsonData.operId
            this.operName = jsonData.operName
            this.operTypeInfo = jsonData.operTypeInfo
            this.roomId = jsonData.roomId
            this.roomNumber = jsonData.roomNumber
            this.source = jsonData.source
            this.userId = jsonData.userId
        }
    }
}