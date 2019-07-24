module game {
    export class BaseUserInfo {
        private userId = 0;
        private userName = null;
        private headImgUrl = null;
        private gender = 1;
        private ip = null;
        private ageType = 0;

        public constructor() {
            var randomIndexForAgeType = Math.random() * 100
            if(randomIndexForAgeType < 10)
            {
                this.ageType = SoundCost.soundType.old
            }else
            {
                this.ageType = SoundCost.soundType.young
            }
        }


        public setAgeType(ageType) {
            this.ageType = ageType
        }


        public getAgeType() {
            return this.ageType
        }

        public getGender() {
            return this.gender
        }

        public setGender(gender) {
            if (gender != Constants.GENDER.female && gender != Constants.GENDER.man) {
                gender = Constants.GENDER.female
            }
            this.gender = gender
            if (gender == Constants.GENDER.female) {
                this.setAgeType(SoundCost.soundType.young)
            }
        }

        public setUserId(uid) {
            this.userId = uid
        }

        public getUserId() {
            return this.userId
        }

        public setUserName(userName) {
            this.userName = userName
        }

        public getUserName() {
            return this.userName
        }

        public setHeadIMGUrl(headImgUrl) {
            this.headImgUrl = headImgUrl
        }

        public getHeadIMGUrl() {
            return this.headImgUrl
        }

        public setIP(ip) {
            this.ip = ip
        }

        public getIP() {
            return this.ip
        }
    }
}