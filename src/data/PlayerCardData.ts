module game {
    export class PlayerCardData {
        private handCards: number[] = [1,1,1,1,1,1,1,1,1,1,1,1,1]
        private outCards: number[] = []
        private pongKongCards = []
        private huaCards: number[] = []

        private jiapaiId = -1
        private _isTing = false
        private huaNum = 0
        private jiapaiValue: number = 0

        public isTing() {
            return this._isTing
        }

        public setTing(value) {
            this._isTing = value
        }

        public setJiaPaiValue(value) {
            this.jiapaiValue = value
        }

        public getJiaPaiValue() {
            return this.jiapaiValue
        }

        public setPongKongCards(pongKongCards) {
            this.pongKongCards = pongKongCards
        }

        public getPongKongCards() {
            return this.pongKongCards
        }

        public addPongKongData(data) {
            this.pongKongCards.push(data)
        }

        public getPongKongNum() {
            return this.pongKongCards.length
        }

        public getPongKongTotalCardNum() {
            return this.getPongKongNum() * 3
        }

        //当前抓的牌索引
        public getDrawCardIndex() {
            return GameConst.perPlayerTotalCardNum - this.getPongKongTotalCardNum()
        }

        public getDiscardNum() {
            return this.outCards.length
        }


        public getPlayerOutCards() {
            return this.outCards
        }

        public setPlayerOutCards(outCards) {
            this.outCards = outCards
        }

        public addOutCard(value) {
            this.outCards.push(value)
        }

        public removeOutCard(index) {
            this.outCards.splice(index,1)
        }

        public getOutCardNum() {
            return this.outCards.length
        }

        public setHuaNum(value) {
            this.huaNum = value
        }

        public getHuaNum() {
            return this.huaNum
        }

        public getPlayerHuaCards() {
            return this.huaCards
        }

        public setPlayerHuaCards(huaCards) {
            this.huaCards = huaCards
        }

        public removeHandsCard(index) {
            this.handCards.splice(index,1)
        }

        public getHandCardsNum() {
            return this.handCards.length
        }

        public setPlayerHandCards(handCards) {
            this.handCards = handCards
        }

        public getPlayerHandCards() {
            return this.handCards
        }

        public clear() {
            this.huaCards = []
            this.handCards = []
            this.outCards =[]
            this.pongKongCards = []
            this.jiapaiValue = 0
        }
    }
}

