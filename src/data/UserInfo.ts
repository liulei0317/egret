module game {
    export class UserInfo extends game.BaseUserInfo {
        private roomNumber = 0;
        private diamond = 0;
        private _isNewPlayer = true;
        private gold = 0;

        private longitude: number = 0;
        private latitude: number = 0;
        private bindPhoneNumber = ""
        private identityCardNumber = ""
        public parse(data) {
            this._isNewPlayer = data.regist
            if (data.roomNumber != null) {
                this.setRoomNumber(data.roomNumber)
            }
            var userData = data.user
            this.setUserId(userData.userId)
            this.setHeadIMGUrl(userData.headImgUrl)
            this.setGender(userData.gender)
            this.setUserName(userData.nickName)
            this.setIP(userData.ip)
            this.setPhoneNumber(data.phoneNumber)
            if (data.userRealInfo) {
                this.setIdentityCardNumber(data.userRealInfo.idCardNo)
            }
        }

        public isNewPlayer() {
            return this._isNewPlayer
        }

        public setNewPlayer(value) {
            this._isNewPlayer = value
        }

        public getRoomNumber() {
            return this.roomNumber
        }


        public setRoomNumber(value) {
            this.roomNumber = value
        }

        public getGoldNum() {
            return this.gold
        }

        public setGoldNum(number) {
            LogUtils.info("setGoldNum " + number)
            var needFreshGold = false
            if (this.gold != number) {
                LogUtils.info("gold changed " + number)
                needFreshGold = true
            }
            this.gold = number
            if (needFreshGold) {
                EAppFacade.getInstance().sendNotification(GameCmd.GOLD_NUMBER_CHANGE)
            }
        }
        public setDiamondNum(number) {
            LogUtils.info("setDiamondNum " + number)
            var needFreshDiamond = false
            if (this.diamond != number) {
                LogUtils.info("diamond changed " + number)
                needFreshDiamond = true
            }
            this.diamond = number
            if (needFreshDiamond) {
                EAppFacade.getInstance().sendNotification(GameCmd.DIAMOND_NUMBER_CHANGE)
            }
        }

        public getDiamondNum() {
            return this.diamond
        }


        public setLocation(longitude, latitude) {
            this.longitude = longitude
            this.latitude = latitude
        }

        public getLocation() {
            return { longitude: this.longitude, latitude: this.latitude }
        }
        public setIdentityCardNumber(value) {
            this.identityCardNumber = value
        }

        public getIdentityCardNumber() {
            return this.identityCardNumber
        }


        public setPhoneNumber(value) {
            this.bindPhoneNumber = value
        }

        public getBindPhoneNumber() {
            return this.bindPhoneNumber
        }
        public clearRoomNumber() {
            this.roomNumber = 0
        }


        public cleanUser() {
            this.setUserId(0);
        }
    }
}