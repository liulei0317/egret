module game {

    export class RoomInfo {
        private roomNum:number = 0
        private roomType:number = Constants.ROOM_TYPE.jinYuanZi
        private roomScore:number = 2
        private turnMode:number = 3//房间把数类型 0.把 1.圈
        private turnNumber:number = 4//
        private payMode:number = 5//支付模式 1.房主付费 2.AA付
        private huaZa:boolean = false//是否花砸
        private faFen:boolean = false//是否罚分
        private jieZhuangBi:boolean = false//是否接庄比
        private roomId:number = 9
        private masterUserId:number = 10//房主id
        private turnModeDesc:string = null
        private payModeDesc:string = null
        private roomTypeDesc:string = null
        private maxPlayerNum:number = GameConst.maxPlayerNum
        private clubId:number = 0
        private calNum:number = 1
        private autoHost:boolean = false
        private autoType = 1 // 1超时托管 2超时解散
        private baoMi:boolean = false

        private clubName:string = null
        private openVoice:boolean = true

        private haiDiLaoYue:boolean = true
        private dismissSwitch:boolean = true           //是否可以协商解散
        private inviteSwitch:boolean = false             //俱乐部痕迹开关
        private changePlayerNumber:boolean = true       //改变玩家数量

        private autoMatch = false //自动匹配房间
        private hideRoomUserInfo = false //隐藏俱乐部房间列表玩家信息
        private hideGameUserInfo = false //隐藏游戏牌桌中玩家信息
        private blessSwitch = false //福分房
        private bxhColorSwitch = false
        private enTuiZiMode = false

        public getAutoType()
        {
            return this.autoType
        }

        public isEnTuiZiMode()
        {
            return this.enTuiZiMode
        }

        public isBlessSwitch()
        {
            return this.blessSwitch
        }

        public isAutoMatch()
        {
            return this.autoMatch
        }

        public getBxhColorSwitch()
        {
            return this.bxhColorSwitch
        }

        public needHideGameUserInfo()
        {
            if (GlobalData.gameData.isPlayBack())
            {
                return false
            }
            return this.isHideGameUserInfo()
        }

        public isHideGameUserInfo()
        {
            return this.hideGameUserInfo
        }

        public isHideRoomUserInfo()
        {
            return this.hideRoomUserInfo
        }

        public isDissmissEnabled()
        {
            return this.dismissSwitch
        }

        public getClubName()
        {
            return this.clubName
        }

        public getInviteSwitch()
        {
            if (this.inviteSwitch == null) 
            {
                this.inviteSwitch = false
            }
            return this.inviteSwitch
        }

        public canChangePlayerNum()
        {
            return this.changePlayerNumber
        }

        public getHaiDiLaoYue()
        {
            return this.haiDiLaoYue
        }

        public isVoiceEnabled()
        {
            return this.openVoice
        }

        public isBaomi() {
            return this.baoMi
        }

        public getCountNum() {
            var countNum = 0
            if (this.roomType == Constants.ROOM_TYPE.jinYuanZi) {
                countNum = this.calNum
            } else if (this.roomType == Constants.ROOM_TYPE.changKaiTou) {
                countNum = this.calNum / 10
            }
            return countNum
        }

        public getClubID() {
            return this.clubId
        }
        public isClubRoom() {
            if (this.clubId == 0)
                return false
            else
                return true
        }
        public getMaxPlayerNum() {
            return this.maxPlayerNum
        }

        public getRoomId() {
            return this.roomId
        }

        public isJieZhuangBi() {
            return this.jieZhuangBi
        }

        public isFaFen() {
            return this.faFen
        }

        public isHuaZa() {
            return this.huaZa
        }

        public getPayMode() {
            return this.payMode
        }

        public getPayModeDesc() {
            return this.payModeDesc
        }

        public getTurnMode() {
            return this.turnMode
        }

        public getTurnModeDesc() {
            return this.turnModeDesc
        }

        public getTurnNumber() {
            return this.turnNumber
        }

        public getMasterUserId() {
            return this.masterUserId
        }

        public getRoomType() {
            return this.roomType
        }

        public getRoomTypeDesc() {
            return this.roomTypeDesc
        }

        public getRoomNum() {
            return this.roomNum
        }

        public getRoomScore() {
            return this.roomScore
        }

        public parse(data: any) {
            this.maxPlayerNum = data.maxPlayerNum
            if (this.maxPlayerNum == null) {
                this.maxPlayerNum = GameConst.maxPlayerNum
            }
            this.roomNum = data.roomNumber
            this.roomType = data.roomType
            this.roomScore = data.roomScore
            this.turnMode = data.turnMode
            this.turnNumber = data.turnNumber
            this.payMode = data.payMode
            this.huaZa = data.huaZa
            this.faFen = data.faFen
            this.baoMi = data.baoMi
            this.jieZhuangBi = data.jieZhuangBi
            this.roomId = data.roomId
            this.masterUserId = data.masterUserId
            this.calNum = data.calNum
            this.clubId = data.clubId
            this.bxhColorSwitch = data.bxhColorSwitch
            if (this.clubId == null) {
                this.clubId = 0
            }

            this.autoHost = data.autoHost
            if (data.autoType != null)
            {
                this.autoType = data.autoType
            }

             if(data.clubName != null)
            {
                this.clubName = data.clubName
            }

            if (data.openVoice != null)
            {
                this.openVoice = data.openVoice
            }
  
            this.haiDiLaoYue = data.haiDiLaoYue
            this.dismissSwitch =  data.dismissSwitch
            this.inviteSwitch = data.inviteSwitch

            if (data.changePlayerNum != null)
            {
                this.changePlayerNumber = data.changePlayerNum
            }

            this.bxhColorSwitch = data.bxhColorSwitch
            this.autoMatch = data.autoMatch
            this.hideRoomUserInfo = data.hideRoomUserInfo
            this.hideGameUserInfo = data.hideGameUserInfo
            this.blessSwitch = data.blessSwitch
            this.enTuiZiMode = data.enTuiZiMode
            if (this.turnMode == Constants.ROOM_TIME_MODE.ba)
                this.turnModeDesc = "把"
            else
                this.turnModeDesc = "圈"
            if(GlobalData.clientConfigs.showCreateRoom == "0" && GameConfig.platform == GameConfig.PLATFORM_SET.weChat)
			{
				this.payModeDesc = "";
			}else
			{
                if (this.payMode == Constants.ROOM_PAY_MODE.AA) {
                    this.payModeDesc = "AA模式"
                }

                else if (this.payMode == Constants.ROOM_PAY_MODE.creator) {
                    this.payModeDesc = "房主模式"
                }

                else if (this.payMode == Constants.ROOM_PAY_MODE.other) {
                    if (this.isClubRoom())
                        this.payModeDesc = "会长模式 "
                    else
                        this.payModeDesc = "代开房间 "
                }
            }
            

            if (this.roomType == Constants.ROOM_TYPE.jinYuanZi) {
                this.roomTypeDesc = "进园子"
            } else if (this.roomType == Constants.ROOM_TYPE.changKaiTou) {
                this.roomTypeDesc = "敞开头"
            }
        }

        public getShareRoomInfo() {
            var sharedDes = ""
            var num = this.turnNumber
            var jushuTxt = "对局数:" + num + this.turnModeDesc
            var rules = this.getRulesDesc()
            var calStr = ""
            if (this.calNum > 0 )
            {
                calStr = " 记分:" + this.calNum + "/100分"
            }
            if (this.roomType == Constants.ROOM_TYPE.jinYuanZi) {
                sharedDes = this.roomTypeDesc + " " + this.payModeDesc + jushuTxt + calStr + " 携带积分: " + this.roomScore + "分 " + rules
            } else if (this.roomType == Constants.ROOM_TYPE.changKaiTou) {
                var text = ""
                if (this.roomScore == 0)
                    text = "无上限"
                else
                    text = this.roomScore + "分 "
                sharedDes = this.roomTypeDesc + " :" + this.payModeDesc + jushuTxt + calStr + " 单把上限: " + text + " " + rules
            }
            if (this.blessSwitch)
            {
                sharedDes = "防沉迷 "+sharedDes
            }
            LogUtils.info("微信分享内容 " + sharedDes)
            return sharedDes
        }


        public getRulesDesc() {
            var rules = ""
            LogUtils.info("getRulesDesc this.roomType " + this.roomType)
            if (this.roomType == Constants.ROOM_TYPE.jinYuanZi) {
                if (this.isHuaZa())
                    rules = "花砸2"
                else
                    rules = ""

                if (this.isJieZhuangBi()) {
                    if (rules.length > 0)
                        rules = rules + "、接庄比"
                    else
                        rules = "接庄比"
                }

                if (this.isFaFen()) {
                    if (rules.length > 0)
                        rules = rules + "、东南西北罚分"
                    else
                        rules = "东南西北罚分"
                }
            }
            else if (this.roomType == Constants.ROOM_TYPE.changKaiTou) {
                rules = "花砸2、接庄比、东南西北罚分"
            }

            if (this.autoHost) {
                var autoDesc = "超时托管"
                if (this.autoType == 2)
                {
                    autoDesc = "超时解散"
                }
                if (rules == "")
                {
                    rules = autoDesc
                }
                else
                {
                    rules = rules + Utils.format("、{0}",autoDesc)
                }
            }

            if (this.baoMi) {
                if (rules == "")
                    rules = "保米"
                else
                    rules = rules + "、保米"
            }

             if (this.haiDiLaoYue)
             {
                 if (rules == "")
                {
                    rules = "海底捞月"
                }
                else
                {
                    rules = rules + "、海底捞月"
                }
             }
            return rules
        }

        public getGameUIRulesDesc() {
            var rules = ""
            var rules = this.getRulesDesc()
            rules = rules.replace("、",",")
            if(this.blessSwitch) 
            {
                 rules = "防沉迷,"+rules
            }
            return this.payModeDesc + "," + this.turnNumber + this.turnModeDesc + "," + rules
        }

        public getTemplateMainInfo()
        {
            return "南京麻将"
        }

        public clearData() {
            this.roomNum = 0
        }


    }
}