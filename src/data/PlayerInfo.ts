module game {
    export class PlayerInfo extends BaseUserInfo {
        private cardData: PlayerCardData = null
        private chairId = 0
        private status = null
        private score = 0
        private fanfen = 0
        private totalWaibao = 0
        private isRoomCreator = false
        private detailAddress = ""
        private userFill = 0
        private readyStatus = 0// 0未准备 1准备
        private autoDiscardOfDelay = false//自动托管


        public isAutoDiscardOfDelay() {
            return this.autoDiscardOfDelay
        }

        public setAutoDiscardOfDelay(value) {
            this.autoDiscardOfDelay = value
        }

        public setDetailAddress(value) {
            this.detailAddress = value
        }

        public getDetailAddress() {
            return this.detailAddress
        }

        public setScore(score) {
            this.score = score
        }

        public getScore() {
            return this.score
        }

        public setReadyStatus(status) {
            this.readyStatus = status
        }

        public getReadyStatus() {
            return this.readyStatus
        }

        public setStatus(status) {
            this.status = status
        }

        public getStatus() {
            return this.status
        }

        public setChairId(id) {
            this.chairId = id
        }

        public getChairId() {
            return this.chairId
        }

        public isBanker() {
            return this.chairId == GlobalData.gameData.getBankerChairId()
        }

        public parse(data) {
            var chairId = data.chairId
            this.setChairId(chairId)
            var status = data.userStatus
            this.setStatus(status)
            var readyStatus = data.readyStatus
            this.setReadyStatus(readyStatus)
            var msgUser = data.msgUser
            var ip = msgUser.ip
            this.setIP(ip)
            var userId = msgUser.userId
            this.setUserId(userId)
            var gender = msgUser.gender
            this.setGender(gender)
            var headImgUrl = msgUser.headImgUrl
            this.setHeadIMGUrl(headImgUrl)
            var nickName = msgUser.nickName
            this.setUserName(nickName)

            var detailAddress = data.detailAddress
            this.setDetailAddress(detailAddress)
            var score = data.score
            this.setScore(score)
            var faScore = data.faScore
            this.fanfen = faScore
            var waiBaoScore = data.waiBaoScore
            this.totalWaibao = waiBaoScore
            var autoHost = data.autoHost
            this.setAutoDiscardOfDelay(autoHost)
        }

        public setCardData(data) {
            this.cardData = data;
        }

        public getCardData() {
            return this.cardData
        }

        public clearCardData() {
            if (this.cardData != null) {
                this.cardData.clear()
            }
            this.cardData = null
        }
    }

}