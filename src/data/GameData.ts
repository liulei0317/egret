module game {
    export class GameData {
        //玩家信息集合
        private playerSet: PlayerInfo[] = null;

        //游戏当前状态
        private gameStatus = GameConst.GAME_STATUS_TYPE.ready

        //当前出牌类型
        private clickCardType = 1
        private flowerCardVisible: boolean = true

        private roomInfo: game.RoomInfo = new game.RoomInfo()

        private myChairId = 2

        private biXiaHu = false

        private biXiaHuDesc = null

        private curTurnNum = 0 // 当前圈or把数

        private eastChairId = 1 // 东边的椅子id

        private curTurnDirection = 1 //当前指向

        private curDiscardChairId = 0 //当前打牌玩家索引

        private lastDiscardChairId = 0   //上一个打牌的玩家

        private lastDiscardCardValue = 0 // 上一个玩家打出来的牌值

        private leftCardNum = 0 // 剩余牌数
        private leftFlowerNum = 0 // 剩余花数

        private needPlayStartEffect = false

        private operateTypes: number[] = [] // 我可以操作[碰 杠 胡等]的类型数据

        private lastSendChatMsgTime = 0

        private bankerChairId = 0 //当前庄家id

        private _isPlayBack: boolean = false;

        private curArrowDirChairId = 0

        private _isFirstDrawCard = true
        private firstDrawCardData = null

        private needCheckCheat = false
        private preventCheatInfo = null
        private tingPaiData = null
        private myTingInfos = null

        private playerNum = GameConst.maxPlayerNum
        private _isCheatStatus = false

        private autoDelayTimeNum = -1
        private canAutoHost = true

        private tempDataBeforeGameStart = []
        private kickOfflineTime = 0

        private autoDiscardData = null

        private changePlayerNumInfo = null
        private applyQuitInfo = null

        private overData:any;
        private allOverData:any

        private operateData:any[];

        public constructor() {
            this.playerSet = [];
        }

        public getOverData()
        {
            return this.overData;
        }

        public setOverData(data)
        {
            this.overData = data
            var winType = data.winType
            var winClientId = []
            var actionIndex = []
            for(var i = 0;i <  data.xJSUserInfos.length;i++)
            {
                var tempUserInfo = data.xJSUserInfos[i]
                var chairId = tempUserInfo.userChairId
                var readyStatus = tempUserInfo.readyStatus
                var playerInfo = this.getPlayer(chairId)
                if (playerInfo != null)
                {
                    var totalScore = tempUserInfo.score
                    playerInfo.setScore(totalScore)
                    playerInfo.setReadyStatus(readyStatus)
                }
                
                var clientId = this.changeChairIdToClientId(chairId)
                Utils.sendGameEvent(GameCmd.PLAYER_SCORE_NUM_CHANGED,{clientId : clientId,score : totalScore})

                var priority = 100
                var tempActionIndex = ""
                if ( tempUserInfo.winTypeInfos  != null )
                {
                    for (var y = 0; y < tempUserInfo.winTypeInfos.length;y ++) 
                    {
                        var fanDetails = {}
                        var winPointType = tempUserInfo.winTypeInfos[y].winPointType
                        if (winPointType == GameConst.specialHuType.GODHU && priority > winPointType)
                        {
                            tempActionIndex = GameConst.ACTION_WIN_ACTINDEX.tianhu
                            priority = winPointType
                        }
                        else if (winPointType == GameConst.specialHuType.SECONDHU && priority > winPointType) 
                        {
                             tempActionIndex = GameConst.ACTION_WIN_ACTINDEX.dihu
                            priority = winPointType
                        }
                        else if ((winPointType == GameConst.specialHuType.BIGSTICKBLOOM || tempUserInfo.superPointType == GameConst.specialHuType.STICKBLOOM) && priority > winPointType)
                        {
                            tempActionIndex = GameConst.ACTION_WIN_ACTINDEX.gangkai
                            priority = winPointType
                        }
                    }
                }
                var win = tempUserInfo.win

                if (win) 
                {
                     winClientId.push(clientId)
                    if (tempActionIndex == "")
                    {
                        if (winType == 1 )
                        {
                             actionIndex.push(GameConst.ACTION_WIN_ACTINDEX.zimo)
                        }
                        else
                        {
                             actionIndex.push(GameConst.ACTION_WIN_ACTINDEX.hu)
                        }
                    }
                    else
                    {
                        actionIndex.push(tempActionIndex)
                    }
                }
            }

            var chuchongIndex = 0
            var winPlayerNum = data.winPlayerNum
            if (data.dianPaoChairId && data.dianPaoChairId > 0)
            {
                 chuchongIndex = this.changeChairIdToClientId(data.dianPaoChairId)
            }
            if (winPlayerNum > 0)
            {
                Utils.sendGameEvent(GameCmd.WIN_OVER, {clientId : winClientId,actionIndex : actionIndex,chuchongIndex : chuchongIndex })
            }

        }

        public setAllOverData(data)
        {
            this.allOverData = data
        }

        public getAllOverData()
        {
            return this.allOverData;
        }


        public setKickOfflineTime(time) {
            this.kickOfflineTime = time
        }

        public getKickOfflineTime() {
            return this.kickOfflineTime
        }

        public getTempDataBeforeGameStart() {
            return this.tempDataBeforeGameStart
        }

        public addTempDataBeforeGameStart(data) {
            this.tempDataBeforeGameStart.push(data)
        }

        public clearTempDataBeforeGameStart() {
            this.tempDataBeforeGameStart = []
        }

        public setAutoDelayTimeNum(value) {
            this.autoDelayTimeNum = value
        }

        public getAutoDelayTimeNum() {
            return this.autoDelayTimeNum
        }

        public clearAutoDelayTimeNum() {
            this.autoDelayTimeNum = 0
        }

        public setCanAutoHost(value){
            this.canAutoHost = value
        }

        public getCanAutoHost(){
            return this.canAutoHost
        }

        public isAutoDelay(clientId) {
            var result = false
            var playerInfo = this.getPlayerByClientId(clientId)
            if (playerInfo != null) {
                result = playerInfo.isAutoDiscardOfDelay()
            }
            return result
        }

        public setAutoDiscardInfo(data) {
            this.autoDiscardData = data
        }

        public getAutoDiscardInfo() {
            return this.autoDiscardData
        }

        public clearAutoDiscardInfo() {
            this.autoDiscardData = null
        }

        public getPlayerNum() {
            return this.playerNum
        }

        public setPlayerNum(value) {
            this.playerNum = value
        }

        public setCheatStatus(value) {
            this._isCheatStatus = value
        }

        public isCheatStatus() {
            return this._isCheatStatus
        }

        public getPreventInfo() {
            return this.preventCheatInfo
        }

        public setPreventCheatInfo(data) {
            this.preventCheatInfo = data
        }

        public isNeedCheckCheat() {
            return this.needCheckCheat
        }

        public setNeedCheckCheat(value) {
            this.needCheckCheat = value
        }

        public setMyTingInfo(infos) {
            if (infos != null && infos.length > 0)
                this.myTingInfos = infos
            else
                this.myTingInfos = null
        }

        public getMyTingInfo() {
            return this.myTingInfos
        }

        public getTingInfo(cardValue) {
            if (!this.hasTingPaiInfo()) {
                return
            }

            var tingInfo = null
            for (var i = 0; i < this.tingPaiData.length; i++) {
                var tempData = this.tingPaiData[i]
                if (tempData.tileId == cardValue) {
                    tingInfo = tempData.tingInfos
                    break
                }

            }
            return tingInfo
        }

        public hasTingPaiInfo() {
            return this.tingPaiData != null && this.tingPaiData.length > 0
        }

        public clearTingPaiInfo() {
            this.tingPaiData = null
        }

        public setTingPaiInfo(tingPaiData) {
            this.tingPaiData = tingPaiData
        }

        public getTingPaiInfo() {
            return this.tingPaiData
        }


        public isFirstDrawCard() {
            return this._isFirstDrawCard
        }

        public clearFirstDrawCardData() {
            this.firstDrawCardData = null
        }

        public setFirstDrawCardData(data) {
            this._isFirstDrawCard = false
            this.firstDrawCardData = data
        }

        public getFirstDrawCardData() {
            return this.firstDrawCardData
        }

        public setPlayBack(value) {
            this._isPlayBack = value
        }

        public isPlayBack() {
            return this._isPlayBack
        }

        public getBankerChairId() {
            return this.bankerChairId
        }

        public updateSendChatTime() {
            this.lastSendChatMsgTime = new Date().getTime();
        }

        public canSendChatMsg() {
            return new Date().getTime() - this.lastSendChatMsgTime > 1000
        }

        public getCurTurnDirection() {
            return this.curTurnDirection
        }


        public getChangePlayerNumInfo() {
            return this.changePlayerNumInfo
        }

        public setChangePlayerNumInfo(info) {
            this.changePlayerNumInfo = info
        }

        public setApplyQuitInfo(info) {
            this.applyQuitInfo = info
        }

        public getApplyQuitInfo() {
            return this.applyQuitInfo
        }

        public getLastDiscarChairId() {
            return this.lastDiscardChairId
        }

        public getLastDiscardValue() {
            return this.lastDiscardCardValue
        }

        public setEastChairId(value) {
            this.eastChairId = value
        }

        public getEastChairId() {
            return this.eastChairId
        }

        public changeDirArrow(chairId) {
            this.curArrowDirChairId = chairId
            var clientId = this.changeChairIdToClientId(chairId)
            Utils.sendGameEvent(GameCmd.DIR_ARROW_CHANGE, {clientId : clientId})
        }

        public curDirArrow() {
            return this.curArrowDirChairId
        }

        public getDiscardChairId() {
            return this.curDiscardChairId
        }

        public setDiscardChairId(chairId) {
            this.curDiscardChairId = chairId
        }

        public setNeedPlayStartStatus(value) {
            this.needPlayStartEffect = value
        }

        public isNeedPlayStartStatus() {
            return this.needPlayStartEffect
        }

        public setLeftCardNum(number) {
            this.leftCardNum = number
        }

        public getLeftCardNum() {
            return this.leftCardNum
        }

        public getLeftFlowerNum() {
            return this.leftFlowerNum
        }

        public setLeftFlowerNum(number) {
            this.leftFlowerNum = number
        }

        public isBiXiaHu() {
            return this.biXiaHu
        }

        public getBiXiaHuDesc() {
            return this.biXiaHuDesc
        }

        public getCurTurnNumber() {
            return this.curTurnNum
        }

        public setMyChairId(myChairId) {
            LogUtils.info("我的椅子id " + myChairId)
            this.myChairId = myChairId
        }

        public getMyChairId() {
            return this.myChairId
        }

        public getClickCardType() {
            return this.clickCardType
        }

        public setClickType(clickType) {
            if (this.clickCardType != clickType) {
                DataStorage.writeLocalData(LocalStorage.setting.GameDoubleClickType,"" + clickType)
            }
            this.clickCardType = clickType
        }

        public setFlowerCardVisible(value) {
            if(value)
            {
                DataStorage.writeLocalData(LocalStorage.setting.Flower_card_Visible,"" + 1)
            }else
            {
                DataStorage.writeLocalData(LocalStorage.setting.Flower_card_Visible,"" + 0)
            }
            this.flowerCardVisible = value
        }


        public getFlowerCardVisible() {
            return this.flowerCardVisible
        }

        public isMeCreator() {
            return this.roomInfo.getMasterUserId() == GlobalData.userData.getUserId()
        }

        public getRoomInfo() {
            return this.roomInfo
        }

        public resetOperateTypes() {
            this.operateTypes = []
        }

        public setOperateTypes(opTypes) {
            this.operateTypes = opTypes
        }

        public getOperateTypes() {
            return this.operateTypes
        }


        public setOperateData(data)
        {
            this.operateData = data
            var operateTypes =[]
            if (this.operateData != null &&  this.operateData.length > 0)
            {
                for (var i = 0; i < this.operateData.length; i++)
                {
                    operateTypes.push(this.operateData[i].operateType)
                }
            }
            this.setOperateTypes(operateTypes)
        }

        public getKongOperateData()
        {
            var result = null
            if (this.operateData == null || this.operateData.length == 0) 
            {
                return result
            }
            for (var i = 1; i < this.operateData.length;i++) 
            {
                var tempData = this.operateData[i]
                if (tempData.operateType == GameConst.OPERATE_TYPE.kong)
                {
                    result = tempData.operateOneDataList
                    break;
                }
            }
            return result;
        }

        public needOperate() {
            var len = this.operateTypes.length
            return len > 0
        }

        public getPlayerByClientId(clientId) {
            var chairId = this.changeClientIdToChairId(clientId)
            return this.getPlayer(chairId)
        }

        //将下标索引转成对应的N人的clientId
        // 4人麻将不变 3人麻将 将3变成4
        public changeIndexToClientId(index):any {
            var resultIndex = this.changeClientIdToChairId(index)
            let playerInfo = this.playerSet[resultIndex]
            if( playerInfo == null ){
                return -1
            }
            LogUtils.info("changeIndexToClientId index" + index + " ->resultIndex" + resultIndex)
            return index
        }

        public changeChairIdToClientId(chairId):any {
            var clientId = ((chairId - this.myChairId) + GameConst.maxPlayerNum )  % GameConst.maxPlayerNum
            LogUtils.info("changeChairIdToClientId chairId" + chairId + " ->clientId" + clientId)
            return clientId
        }

        public changeClientIdToChairId(clientId):any {
            if (clientId < 0 || clientId >= GameConst.maxPlayerNum) {
                return 0
            }
            // if (this.playerNum != GameConst.maxPlayerNum) {
            //     if (this.playerNum == 3) // 三人麻将将左边的玩家强行转到对面
            //     {
            //         if (clientId == 3) {
            //             clientId = 2
            //         }
            //     }
            // }
            // var aa = ((clientId + this.myChairId - 1)+ this.playerNum) % this.playerNum
            var c_id = ((clientId + this.myChairId - 1)+ GameConst.maxPlayerNum) % GameConst.maxPlayerNum + 1
            // LogUtils.info("changeClientIdToChairId clientId " + clientId + " ->chairId " + c_id)
            return c_id
        }

        public getHeadImgName(url) {
            var msgToStr = url
            var md5 = new md5()
            var imgName = md5.sumhexa(msgToStr)
            return "headImage_" + imgName + ".png"
        }

        public getPlayerHeadImgPathByUserID(url) {
            // //printInfo("url:%s",url)
            // var  imgName = this.getHeadImgName(url)
            // //printInfo("imgName:%s",imgName)
            // var  path = cc.FileUtils:getInstance():getWritablePath()+imgName
            // return path
        }

        public getPlayerSet() {
            return this.playerSet
        }

        public addPlayer(chairId, player) {
            LogUtils.info("addPlayer chairId " + chairId)
            this.playerSet[chairId] = player
        }

        public getPlayer(chairId) {
            if (chairId < 1 || chairId > GameConst.maxPlayerNum)
                return
            return this.playerSet[chairId]
        }

        public getPlayerInfoByClientId(clientId) {
            var chairId = this.changeClientIdToChairId(clientId)
            return this.getPlayer(chairId)
        }

        public getCardData(clientId)
        {
            var playerInfo = this.getPlayerInfoByClientId(clientId)
            if(playerInfo == null)
            {
                return null;
            }
            return playerInfo.getCardData()
        }

        public getCurPlayerNum() {
            var playerNum = 0
            for (var i = 1; i <= GameConst.maxPlayerNum; i++) {
                if (this.playerSet[i] != null) {
                    playerNum = playerNum + 1
                }
            }
            return playerNum
        }

        public removePlayer(chairId) {
            this.playerSet[chairId] = null
        }

        public setGameStatus(status) {
            LogUtils.info("setGameStatus " + status)
            this.gameStatus = status
        }

        public getGameStatus() {
            return this.gameStatus
        }


        //是否轮到我出牌
        public isMyOutCardTurn() {
            // LogUtils.info("curDiscardChairId " + this.curDiscardChairId + ",myChairId " + this.myChairId)
            return this.curDiscardChairId == this.myChairId
        }

        public resetRoomSet() {

        }

        public parse(data) {
            this.clearFirstDrawCardData()
            LogUtils.info("GameData:parse")
            //牌桌信息
            this.biXiaHu = data.biXiaHu
            this.biXiaHuDesc = data.biXiaHuDesc
            this.curTurnNum = data.curTurnNum
            this.curTurnDirection = data.curTurnDirection
            this.curDiscardChairId = data.curChairId
            this.lastDiscardChairId = data.lastDiscardChairId
            this.lastDiscardCardValue = data.lastDiscardTileId
            this.bankerChairId = data.bankerChairId

            
            LogUtils.info("curTurnDirection "+this.curTurnDirection)
            LogUtils.info("curDiscardChairId "+this.curDiscardChairId)
            LogUtils.info("lastDiscardChairId "+this.lastDiscardChairId)
            LogUtils.info("lastDiscardCardValue "+this.lastDiscardCardValue)
            //
            //if this.curDiscardChairId == this.lastDiscardChairId then
            //    this.curDiscardChairId = 0
            //end
            let canAutoHost = data.canAutoHost
            this.setCanAutoHost(canAutoHost)
            this.leftCardNum = data.stackTileNum
            this.leftFlowerNum = data.stackFlowerNum


            //房间信息
            var  msgRoomGaming = data.msgRoomGaming
            var  msgRoom = msgRoomGaming.msgRoom
            this.roomInfo.parse(msgRoom)

            this.playerNum = this.roomInfo.getMaxPlayerNum()
            LogUtils.info("this.playerNum " + this.playerNum)
            var  gs = msgRoomGaming.roomStatus
            this.setGameStatus(gs)

            //所有玩家信息
            var  msgUserGames = data.msgUserGames

            //确认我的椅子id
            var  myChairId = 1
            for (var i = 0; i < this.playerNum;i ++ )
            {
                var  msgUserGame = msgUserGames[i]
                var  msgUserData = msgUserGame.msgUserData // 玩家信息
                var  userId = msgUserData.msgUser.userId
                if (userId == GlobalData.userData.getUserId())
                {
                    var  chairId = msgUserData.chairId
                    myChairId = chairId
                    break
                }
            }

            this.setMyChairId(myChairId)
            this.clearPlayerData()
            this.clearLastGameData()
            for (var i = 0;i < this.playerNum; i++)
            {
                var  msgUserGame = msgUserGames[i]
                LogUtils.info("msgUserGame i == "+i)
                var  msgUserData = msgUserGame.msgUserData // 玩家信息
                var  chaird = msgUserData.chairId
                var  tempPlayer =  this.getPlayer(chaird)
                if (tempPlayer == null)
                {
                     tempPlayer = new game.PlayerInfo()
                    this.addPlayer(chaird,tempPlayer)
                }
                tempPlayer.parse(msgUserData)

                if (chaird == myChairId)
                {
                     var  tingInfos = msgUserGame.tingInfos
                    this.setMyTingInfo(tingInfos)
                }

                if (gs == GameConst.GAME_STATUS_TYPE.playing)
                {

                    var  hasTing = msgUserGame.hasTing
                    var  jiapaiId = msgUserGame.jiaTileId

                    var  discardTileIds = msgUserGame.discardTileIds // 打牌信息
                    var  flowerIds = msgUserGame.flowerIds // 花牌信息
                    var  gainTileInfos = msgUserGame.gainTileInfos // 碰杠吃信息
                    var  handCards = msgUserGame.userTileIds // 手牌信息
                    var waiBaoStatus = msgUserGame.waiBaoStatus // 外包信息

                    var  pongKongCards = []
                    for (var j = 0;j < gainTileInfos.length;j++)
                    {
                        var  t_data = gainTileInfos[j]
                        var  provideChairId = t_data.discardChairId
                        var  provideClientId = GlobalData.gameData.changeChairIdToClientId(provideChairId)
                        var  type = t_data.gainType
                        var params = {type : type,provideClientId : provideClientId,value : t_data.tileIds[0],waiBaoStatus : waiBaoStatus}
                        var  tempPongKongData = new PongKongData(params)
                        //table.insert(pongKongCards, tempPongKongData)
                        pongKongCards.push(tempPongKongData)
                    }

                    var  playerCardData = new game.PlayerCardData()
                    playerCardData.setTing(hasTing)
                    playerCardData.setJiaPaiValue(jiapaiId)
                    playerCardData.setPlayerHuaCards(flowerIds)
                    playerCardData.setPlayerOutCards(discardTileIds)
                    playerCardData.setPlayerHandCards(handCards)
                    playerCardData.setPongKongCards(pongKongCards)
                    //碰杠吃未解析
                    tempPlayer.setCardData(playerCardData)
                }
            }

            var  tingInfos = data.tingInfos 
            this.setTingPaiInfo(tingInfos)
            LogUtils.info("gameData init Complete")
        }

        public clearPlayerData() {
            this.playerSet = []
        }

        public clearLastGameData() {
            this.myTingInfos = null
            this.clearAutoDiscardInfo()
            this.clearAutoDelayTimeNum()
            this.clearTempDataBeforeGameStart()
            this.resetOperateTypes()
        }

        public clearData() {
            this.clearPlayerData()
            this.clearLastGameData()
            this.roomInfo.clearData()
            GlobalData.userData.clearRoomNumber()
            this.setCheatStatus(false)
            this.playerNum = GameConst.maxPlayerNum
            this.bankerChairId = 0 //清除庄家id
            this.applyQuitInfo = null
            this.changePlayerNumInfo = null
            this._isFirstDrawCard = true
            this.needCheckCheat = false
            this.preventCheatInfo = null
        }
    }
}