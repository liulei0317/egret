module game {
    export class Mock {

        private allCards = {
            normalCard: [],
            huaCard: []
        }

        private cardValueList =
        {
            Character: [1, 2, 3, 4, 5, 6, 7, 8, 9],//万 一万~九万
            Bamboo: [11, 12, 13, 14, 15, 16, 17, 18, 19], //条 一条~九条
            Dot: [21, 22, 23, 24, 25, 26, 27, 28, 29], //筒 一筒~九筒
            Flower: [51, 53, 55, 57, 61, 63, 65, 67],//花色 春、夏、秋、冬、梅、兰、竹、菊
            Wind: [31, 33, 35, 37],//风牌 东、南、西、北
            Dragon: [41, 43, 45] //箭牌 	中、发、白
        }
        private playerSet = {}
        private gameStatus = GameConst.GAME_STATUS_TYPE.playing
        private playerNum = 4
        private isPlayBack = true
        private testChairId = 1

        private constructor() {

        }
        private static instance: Mock
        public static getInstance() {
            if (Mock.instance == null) {
                Mock.instance = new Mock()
            }
            return Mock.instance
        }

        public initMockData() {
            this.initUserData()
            this.initRoomData()
            this.initAllCards()
            this.initAllPlayers()
        }

        private initAllPlayers() {
            //var  myChairId = math.random(1, maxPlayerNum)
            var myChairId = 1
            GlobalData.gameData.setMyChairId(myChairId)

            //var  discardChairId = (myChairId)%maxPlayerNum + 3
            //GlobalData.GameData:setDiscardChairId(discardChairId)
            GlobalData.gameData.setDiscardChairId(myChairId)
            this.testChairId = myChairId
            //var  bankerId = math.random(1, maxPlayerNum)
            var bankerId = GameConst.ME_DIR
            //printInfo("bankerId",bankerId)
            for (var i = 0; i < this.playerNum; i++) {
                var chairId = i + 1
                var dir = GlobalData.gameData.changeChairIdToClientId(i)
                //for i = 1,2 do
                var pp = new game.PlayerInfo()
                var gender = Utils.getRandom(1, 3)

                if (chairId == myChairId) {
                    pp.setIP(GlobalData.userData.getIP())
                    pp.setHeadIMGUrl(GlobalData.userData.getHeadIMGUrl())
                    pp.setGender(GlobalData.userData.getGender())
                    pp.setUserId(GlobalData.userData.getUserId())
                    pp.setUserName(GlobalData.userData.getUserName())
                } else {
                    pp.setIP("192.168.1." + chairId)
                    pp.setHeadIMGUrl(Constants.DEFAULT_HEAD_IMG_URL)
                    pp.setGender(gender)
                    pp.setUserId(111 + chairId)
                    //pp.setUserName("测试玩家"+i)
                    pp.setUserName("1234456" + chairId)
                    //pp.setUserName("¿─│♥❣♂♀☿Ⓐ✍✉☣☤✘☒♛▼♫⌘☪")
                }

                pp.setScore(GlobalData.gameData.getRoomInfo().getRoomScore())
                pp.setChairId(chairId)
                pp.setStatus(GameConst.PLAYER_STATUS.PLAYING)
                var playerCardData = new game.PlayerCardData()
                pp.setCardData(playerCardData)
                ////////////////碰杠牌////////////////////-
                playerCardData.setPongKongCards(this.getPongKongCards())
                ////////////////碰杠牌////////////////////-
                //-
                ////////////////手牌////////////////////-
                var pkNum = playerCardData.getPongKongNum()
                playerCardData.setPlayerHandCards(this.getHandCards(pkNum, dir, GlobalData.gameData.getDiscardChairId() == chairId))
                ////////////////手牌////////////////////-

                ////////////////花牌////////////////////-
                playerCardData.setPlayerHuaCards(this.getHuaCards(dir))
                ////////////////花牌////////////////////-

                ////////////////打出牌////////////////////-
                playerCardData.setPlayerOutCards(this.getOutCards(dir))
                //////////////////打出牌////////////////////-
                this.playerSet[pp.getChairId()] = pp
            }
        }

        public use(msgDomain:MsgDomain)
        {
            var area = msgDomain.area
            var cmd = msgDomain.cmd
            var mockData = null
            var mockArea = area
            var mockCmd = cmd

             if( area == MsgConstant.GAME)
             {
                  if (cmd == MsgConstant.CMD_DISCARD) 
                  {
                    mockCmd = MsgConstant.CMD_DRAW
                    mockData = {
                        chairId : GlobalData.gameData.getMyChairId(),
                        tileIds : [1],
                        tingInfos : this.getTingTintData()
                    }
                    //  mockData = {
                    //       tingInfos : this.getTingTintData()
                    // }
                    // this.sendMockData(MsgConstant.GAME,MsgConstant.draw_card,sendData)
                  }
             }

              if( mockData != null){
                  this.sendMockData(mockArea,mockCmd,mockData)
              }
        }
        
        private getPongKongCards() {
            var pongKongNum = 4
            var pongKongCards = []
            for (var i = 0; i < pongKongNum; i++) {
                var pid = GameConst.PLAY_DIR.left

                if (i == 0) {
                    pid = GameConst.PLAY_DIR.down
                }
                else if (i == 1) {
                    pid = GameConst.PLAY_DIR.up
                }
                var parmas = { type: GameConst.GAIN_TYPE.PongKong, provideClientId: pid, value: [27] }
                var tempPongKongData = new PongKongData(parmas)
                //table.insert(pongKongCards, tempPongKongData)
                pongKongCards.push(tempPongKongData)
            }
            return pongKongCards
        }



        private getOutCards(dir) {
            var outCardNum = 15
            var outCards = []
            // if dir == PLAY_DIR.left then
            //     outCards = {1}
            // else
            for (var j = 0; j < outCardNum; j++) {
                var _v = this.allCards.normalCard.pop()
                if (_v == null) {
                    LogUtils.info("")
                }
                outCards.push(_v)
            }
            // end
            return outCards
        }

        private getHuaCards(dir) {
            var huaPaiNum = 5
            var huaCards = []
            for (var j = 0; j < huaPaiNum; j++) {
                if (this.allCards.huaCard.length == 0)
                    break
                var _v = this.allCards.huaCard.pop()
                huaCards.push(_v)
            }
            return huaCards
        }

        private getHandCards(pkNum, dir, isBanker) {
            //printInfo("getHandCards")

            var handCardNum = 14 - pkNum * 3

            var handCards = []
            // var  testCard = {1,3,4,4,4,5,5,5,5,6,7,8,53}
            // if dir == ME_DIR then
            //     for j = 1,handCardNum do
            //         table.insert(handCards, testCard[j])
            //     end
            // else
            for (var j = 0; j < handCardNum; j++) {
                if (dir == GameConst.ME_DIR || this.isPlayBack) {
                    var _v = this.allCards.normalCard.pop()
                    //printInfo("_v",_v)
                    handCards.push(1)
                } else {
                    handCards.push(0)
                }

            }
            // handCards = testCard
            // end
            handCards.sort((a, b): number => {
                return a - b;
            })


            if (isBanker) {
                if (dir == GameConst.ME_DIR || this.isPlayBack) {
                    var _v = this.allCards.normalCard.pop()
                    handCards.push(_v)
                }
                else {
                    handCards.push(0)
                }
            }

            return handCards
        }


        private initAllCards() {
            LogUtils.info("initAllCards")
            for (var i = 0; i < this.cardValueList.Character.length; i++) {
                for (var j = 0; j < 4; j++) {
                    this.allCards.normalCard.push(this.cardValueList.Character[i])
                }
            }

            for (var i = 0; i < this.cardValueList.Bamboo.length; i++) {
                for (var j = 0; j < 4; j++) {
                    this.allCards.normalCard.push(this.cardValueList.Bamboo[i])
                }
            }

            for (var i = 0; i < this.cardValueList.Dot.length; i++) {
                for (var j = 0; j < 4; j++) {
                    this.allCards.normalCard.push(this.cardValueList.Dot[i])
                }
            }

            for (var i = 0; i < this.cardValueList.Flower.length; i++) {
                this.allCards.huaCard.push(this.cardValueList.Flower[i])
            }

            for (var i = 0; i < this.cardValueList.Wind.length; i++) {
                for (var j = 0; j < 4; j++) {
                    this.allCards.normalCard.push(this.cardValueList.Wind[i])
                }
            }

            for (var i = 0; i < this.cardValueList.Dragon.length; i++) {
                for (var j = 0; j < 4; j++) {
                    this.allCards.huaCard.push(this.cardValueList.Dragon[i])
                }
            }
            this.Shuffle()
        }

        private Shuffle() {
            var normalCardLen = this.allCards.normalCard.length
            for (var i = 0; i < normalCardLen; i++) {
                var randomPos = Utils.getRandom(i, normalCardLen)
                var value = this.allCards.normalCard[randomPos]
                this.allCards.normalCard[randomPos] = this.allCards.normalCard[i]
                this.allCards.normalCard[i] = value
            }

            var huaCardLen = this.allCards.huaCard.length
            for (var i = 0; i < huaCardLen; i++) {
                var randomPos = Utils.getRandom(i, huaCardLen)
                var value = this.allCards.huaCard[randomPos]
                var value = this.allCards.huaCard[randomPos]
                this.allCards.huaCard[randomPos] = this.allCards.huaCard[i]
                this.allCards.huaCard[i] = value
            }
        }

        private initRoomData() {
            var msgRoom = {
                roomNumber: 888888,
                roomType: Constants.ROOM_TYPE.jinYuanZi,
                roomScore: 100,
                turnMode: Constants.ROOM_TIME_MODE.ba,
                turnNumber: 8,
                payMode: Constants.ROOM_PAY_MODE.creator,
                huaZa: true,
                faFen: true,
                jieZhuangBi: true,
                roomId: 1,
                masterUserId: GlobalData.userData.getUserId()
            }
            GlobalData.gameData.getRoomInfo().parse(msgRoom)
        }

        private initUserData() {
            var userData =
                {
                    roomNumber: 0,
                    user: {
                        userId: 1,
                        ip: "11.11.11.11",
                        gender: Constants.GENDER.man,
                        nickName: "测试玩家",
                        headImgUrl: Constants.DEFAULT_HEAD_IMG_URL,
                    }
                }
            GlobalData.userData.parse(userData)
            GlobalData.userData.setDiamondNum(123456)
            GlobalData.userData.setGoldNum(123456)
        }





        public getMockGameData() {
            var allUserInfo = this.getAllUserInfos()
            var msgUserGamesData = []

            //var  PlayerCard = require("app.data.PlayerCard")
            for (var i = 0; i < this.playerNum; i++) {

                LogUtils.info("mock reconnect msgUserGames i " + i)
                var chairId = i + 1
                var msgUserGame = {
                    msgUserData: allUserInfo[chairId],
                    jiaTileId: 0,
                    hasTing: false,
                    discardTileIds: this.playerSet[chairId].getCardData().getPlayerOutCards(),
                    flowerIds: this.playerSet[chairId].getCardData().getPlayerHuaCards(),
                    userTileIds: this.playerSet[chairId].getCardData().getPlayerHandCards(),
                    gainTileInfos: []
                }

                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)

                var pongKongCards = this.playerSet[chairId].getCardData().getPongKongCards()

                for (var j = 0; j < pongKongCards.length; j++) {
                    var ttt_data = pongKongCards[j]
                    var gainTileInfo = {
                        discardChairId: GlobalData.gameData.changeClientIdToChairId(ttt_data.getProvideClientId()),
                        gainType: ttt_data.getType(),
                        tileIds: ttt_data.getValue(),
                    }
                    msgUserGame.gainTileInfos.push(gainTileInfo)
                }
                msgUserGamesData.push(msgUserGame)
            }

            var roomInfo = GlobalData.gameData.getRoomInfo()
            var mockData = {
                //牌桌信息
                bankerChairId: this.testChairId,
                biXiaHu: true,
                biXiaHuDesc: "比下胡原因描述比下胡原因描述比下胡原因描述比下胡原因描述比下胡原因描述比下胡原因描述",
                curTurnNum: 1,
                curTurnDirection: 1,
                curChairId: GlobalData.gameData.getDiscardChairId(),
                lastDiscardChairId: 4,
                lastDiscardTileId: 1,
                stackTileNum: 81,
                playerNum: this.playerNum,
                msgRoomGaming:
                {
                    msgRoom:
                    {
                        roomNumber: roomInfo.getRoomNum(),
                        roomType: roomInfo.getRoomType(),
                        roomScore: roomInfo.getRoomScore(),
                        turnMode: roomInfo.getTurnMode(),
                        turnNumber: roomInfo.getTurnNumber(),
                        payMode: roomInfo.getPayMode(),
                        huaZa: roomInfo.isHuaZa(),
                        faFen: roomInfo.isFaFen(),
                        jieZhuangBi: roomInfo.isJieZhuangBi(),
                        roomId: roomInfo.getRoomId(),
                        masterUserId: roomInfo.getMasterUserId()
                    },
                    roomStatus: this.gameStatus
                },
                msgUserGames: msgUserGamesData,

            }
            return mockData
        }

        private getAllUserInfos() {
            var userInfos = []
            for (var i = 0; i < this.playerNum; i++) {
                var chairId = i + 1
                var tempData = this.playerSet[chairId]
                var userInfo = {
                    chairId: tempData.getChairId(),
                    userStatus: tempData.getStatus(),
                    score: 100,
                    faScore: 0,
                    waiBaoScore: 0,
                    msgUser: this.getUserBaseInfo(chairId)
                }
                userInfos[userInfo.chairId] = userInfo
            }
            return userInfos
        }

        private getUserBaseInfo(i) {
            var tempData = this.playerSet[i]
            var msgUser = {
                ip: tempData.getIP(),
                userId: tempData.getUserId(),
                gender: tempData.getGender(),
                headImgUrl: tempData.getHeadIMGUrl(),
                nickName: tempData.getUserName(),

            }
            return msgUser
        }

        private sendMockData(mockArea, mockCmd, mockData) {
            var finalMockData =
                {
                    code: MsgResultStatus.SUCCESS,
                    area: mockArea,
                    cmd: mockCmd,
                    data: mockData
                }
            var jsonStr = JSON.stringify(finalMockData);
            // LogUtils.info("send数据：" + jsonStr);
            var base64 = Base64Utils.encode(jsonStr + "\n");
            SocketManager.getInstance().onReceiveMessageEvent(base64)
        }

        public sendMockGameSettleData() {
            var mockData = this.getOverData()
            this.sendMockData(MsgConstant.GAME, MsgConstant.CMD_XJS_DATA, mockData)
        }

        private getOverData() {
            var mockData =
                {
                    bankerChairId: GlobalData.gameData.getMyChairId(),
                    baoPai: true,
                    baoPaiChairId: 4,
                    liuJuType: 2,
                    roomStatus: GameConst.GAME_STATUS_TYPE.over,
                    winType: 2,
                    time: new Date().getTime(),
                    winPlayerNum: 0,
                    xJSUserInfos: null,
                }

            var playerGameData =
                [
                    {
                        curScore: 210,
                        faScore: 90,
                        score: 400,
                        superPointType: 0,
                        userChairId: 1,
                        waiBao: true,
                        waibaoScore: 100,
                        win: true,
                        msgUser: null,
                        heapInfos:
                        [
                            {
                                gain: false,
                                tileIds:
                                [
                                    27, 27
                                ]
                            },
                            {
                                gain: false,
                                tileIds:
                                [
                                    28, 28
                                ]
                            },
                            {
                                gain: false,
                                tileIds:
                                [
                                    29, 29
                                ]
                            },
                            {
                                gain: false,
                                tileIds:
                                [
                                    29, 29
                                ]
                            },
                            {
                                gain: false,
                                tileIds:
                                [
                                    29, 29
                                ]
                            },
                            {
                                gain: false,
                                tileIds:
                                [
                                    29, 29
                                ]
                            },
                            {
                                gain: false,
                                tileIds:
                                [
                                    29, 29
                                ]
                            }

                        ],
                        winTypeInfos:
                        [
                            {
                                desc: "+10",
                                name: "成牌",
                                score: 10,
                                winPointType: 0
                            },
                            {
                                desc: "+10",
                                name: "成牌",
                                score: 10,
                                winPointType: 0
                            },
                            {
                                desc: "+10",
                                name: "成牌",
                                score: 10,
                                winPointType: 0
                            }
                        ]
                    },
                    {
                        curScore: 0,
                        faScore: -30,
                        score: 0,
                        superPointType: 0,
                        userChairId: 4,
                        waiBao: false,
                        waibaoScore: 0,
                        win: false,
                        msgUser: null,
                        heapInfos:
                        [
                            {
                                gain: true,
                                direction: 1,
                                tileIds:
                                [
                                    27, 27, 27
                                ]
                            },
                            {
                                gain: true,
                                direction: 1,
                                tileIds:
                                [
                                    28, 28, 28, 28
                                ]
                            },
                            {
                                gain: true,
                                direction: 1,
                                tileIds:
                                [
                                    29, 29, 29
                                ]
                            },
                            {
                                gain: true,
                                direction: 1,
                                tileIds:
                                [
                                    29, 29, 29
                                ]
                            },
                            {
                                gain: false,
                                tileIds:
                                [
                                    1
                                ]
                            },
                            {
                                gain: false,
                                tileIds:
                                [
                                    3
                                ]
                            }

                        ],
                        winTypeInfos:
                        [
                            {
                                desc: "+10",
                                name: "成牌",
                                score: 10,
                                winPointType: 0
                            },
                            {
                                desc: "+10",
                                name: "成牌",
                                score: 10,
                                winPointType: 0
                            },
                            {
                                desc: "+10",
                                name: "成牌",
                                score: 10,
                                winPointType: 0
                            }
                        ]

                    },
                    {
                        curScore: 0,
                        faScore: -30,
                        score: 0,
                        superPointType: 0,
                        userChairId: 2,
                        waiBao: false,
                        waibaoScore: 0,
                        win: false,
                        msgUser: null,
                        heapInfos:
                        [
                            {
                                gain: false,
                                tileIds:
                                [
                                    27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 29, 31, 31
                                ]
                            }
                        ]
                    }
                ]

            for (var i = 0; i < playerGameData.length; i++) {
                var chairId = playerGameData[i].userChairId
                playerGameData[i].msgUser = this.getUserBaseInfo(chairId)
            }

            mockData.xJSUserInfos = playerGameData
            return mockData
        }


        private getTingTintData() {
            var tingData = []
            for (var i = 1; i < 5; i++) {
                var tingUnitData = {
                    tileId: 1,
                    tingInfos: null,
                }
                tingUnitData.tileId = i
                var tingInfos = []
                for (var j = 0; j < 2; j++) {
                    var tingInfo = {
                        tileId: 1,
                        num: 1
                    }
                    tingInfo.tileId = i
                    tingInfo.num = i
                    tingInfos.push(tingInfo)
                }
                tingUnitData.tingInfos = tingInfos
                tingData.push(tingUnitData)
            }
            return tingData
        }

        public mockJiaPai()
        {
            var mockData = 
            {
                chairId :1,
                jiaTileId : 1,
            }
            this.sendMockData(MsgConstant.GAME, MsgConstant.CMD_JIA, mockData)
        }



    }
}