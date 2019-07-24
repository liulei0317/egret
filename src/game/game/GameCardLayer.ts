module game {
    export class GameCardLayer {
        private gs: GameScene;
        private touchErea: eui.Rect;

        private tingTint: TingTint = null
        // private CardGroupSet:eui.Group[]
        private cardGroup: eui.Group
        private DownCardGroup: eui.Group;
        private LeftCardGroup: eui.Group;
        private UpCardGroup: eui.Group;
        private RightCardGroup: eui.Group;

        private HandCardGroupSet: eui.Group[]
        private OutCardGroupSet: eui.Group[]
        private PongKongCardGroupSet: eui.Group[]
        private HuaCardGroupSet: eui.Group[]

        private handCardNode: any[];
        private pongKongNode: any[];
        private huaCardNode: any[];
        private outCardNode: any[];

        private status: number = -1;

        /**
         * 触摸事件监听变量 
         */
        private clickedIndex = -1;
        private selectIndex = -1;
        private moveIndex = -1;
        private canMove = false;
        private beginStartX = 0;
        private beginStartY = 0;

        private flagValue = 0
        private flagSet = []
        private _isBuHuaing = false
        private _needClearCardWhenStatusIsOver = false
        private playerCardNode = {}
        private allScheduler: any[]

        private tempDataType =
        {
            DRAW_CARD: 1,
            AUTO_DISCARD_TILE: 2,
            DISCARD_OTHER: 3
        }


        public constructor(parent: GameScene, touchErea: eui.Rect, cardGroup: eui.Group) {

            this.gs = parent;
            this.cardGroup = cardGroup
            this.touchErea = touchErea;
            this.init();
        }

        private init() {
            this.status = GameConst.GAME_STATUS_TYPE.ready
            if (this.tingTint == null) {
                this.tingTint = new TingTint()
                this.tingTint.visible = false
                this.gs.addChild(this.tingTint)
            }
            this.initData()
            this.setFlowerCardVisible()
            this.initTouchEvent();
        }

        private initData() {
            this.handCardNode = []
            this.pongKongNode = []
            this.huaCardNode = []
            this.outCardNode = []

            this.RightCardGroup = new eui.Group();
            this.cardGroup.addChild(this.RightCardGroup)
            this.UpCardGroup = new eui.Group();
            this.cardGroup.addChild(this.UpCardGroup)
            this.LeftCardGroup = new eui.Group();
            this.cardGroup.addChild(this.LeftCardGroup)
            this.DownCardGroup = new eui.Group();
            this.cardGroup.addChild(this.DownCardGroup)
            this.HandCardGroupSet = []
            this.HuaCardGroupSet = []
            this.PongKongCardGroupSet = []
            this.OutCardGroupSet = []


            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                this.handCardNode[i] = []
                this.pongKongNode[i] = []
                this.huaCardNode[i] = []
                this.outCardNode[i] = []
                this.HandCardGroupSet[i] = new eui.Group();
                this.HuaCardGroupSet[i] = new eui.Group();
                this.PongKongCardGroupSet[i] = new eui.Group();
                this.OutCardGroupSet[i] = new eui.Group();
                var tempAddGroup: eui.Group = null
                if (i == GameConst.ME_DIR) {
                    tempAddGroup = this.DownCardGroup
                } else if (i == GameConst.PLAY_DIR.left) {
                    tempAddGroup = this.LeftCardGroup
                } else if (i == GameConst.PLAY_DIR.right) {
                    tempAddGroup = this.RightCardGroup
                } else if (i == GameConst.PLAY_DIR.up) {
                    tempAddGroup = this.UpCardGroup
                }
                tempAddGroup.addChild(this.HuaCardGroupSet[i])
                tempAddGroup.addChild(this.OutCardGroupSet[i])
                tempAddGroup.addChild(this.PongKongCardGroupSet[i])
                
                if (i == GameConst.PLAY_DIR.right) {
                    tempAddGroup.addChildAt(this.HandCardGroupSet[i], 1)
                } else {
                    tempAddGroup.addChild(this.HandCardGroupSet[i])
                }

            }
            this.flagValue = 0
            this.flagSet = []
            this._isBuHuaing = false
            this._needClearCardWhenStatusIsOver = false
            this.playerCardNode = {}
            this.allScheduler = []


            // this.status = GameConst.GAME_STATUS_TYPE.playing
            // this.showPlayerCard(false)
        }

        public onEventHandler(evt: egret.Event) {
            var rsvMsg = evt.data
            var eventId = rsvMsg.cmd
            var data = rsvMsg.data
            if (eventId == GameCmd.OPERATE_PONG || eventId == GameCmd.OPERATE_PONG_BACK) {
                var clientId = data.clientId
                var pongData = data.pongData
            } //

            if (eventId == GameCmd.OPERATE_PONG) //
            {
                this.pong(clientId, pongData)
            }
            else if (eventId == GameCmd.OPERATE_PONG_BACK) //
            {
                this.pongBack(clientId, pongData)
            }

            else if (eventId == GameCmd.OPERATE_KONG || eventId == GameCmd.OPERATE_KONG_BACK) //
            {
                var clientId = data.clientId
                var kongData = data.kongData
                if (eventId == GameCmd.OPERATE_KONG) //
                {
                    this.kong(clientId, kongData)
                }
                else if (eventId == GameCmd.OPERATE_KONG_BACK) //
                {
                    this.kongBack(clientId, kongData)
                }
            }
            else if (eventId == GameCmd.DRAW_CARD || eventId == GameCmd.DRAW_CARD_BACK) //
            {
                GlobalData.gameData.clearFirstDrawCardData()

                var chairId = data.chairId
                var values = data.cardValues
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                if (this.status != GameConst.GAME_STATUS_TYPE.playing) //
                {
                    GlobalData.gameData.addTempDataBeforeGameStart({ type: this.tempDataType.DRAW_CARD, data: data })
                }
                else {
                    if (eventId == GameCmd.DRAW_CARD) //
                    {
                        this.drawCard(clientId, values)
                    }
                    else if (eventId == GameCmd.DRAW_CARD_BACK) //
                    {
                        this.drawBackCard(clientId, values)
                    }
                }
            }
            else if (eventId == GameCmd.DISCARD || eventId == GameCmd.DISCARD_BACK) //
            {
                var chairId = data.chairId
                var value = data.cardValue
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)

                if (this.status != GameConst.GAME_STATUS_TYPE.playing)//
                    GlobalData.gameData.addTempDataBeforeGameStart({ type: this.tempDataType.DISCARD_OTHER, data: data })
                else {
                    if (GlobalData.gameData.isPlayBack()) //
                    {
                        if (eventId == GameCmd.DISCARD) //
                        {
                            var index = this.getHandCardIdxByValue(clientId, value)
                            this.discard(clientId, index)
                        }
                        else if (eventId == GameCmd.DISCARD_BACK) //
                        {
                            this.discardBack(clientId, value)
                        }
                    }

                    else {
                        this.otherDiscard(clientId, value)
                    }
                }
            }
            else if (eventId == GameCmd.UPDATE_DISCARD_ARROW) //
            {
                var clientId = data.clientId
                this.playDiscardArrow(clientId)
            }
            else if (eventId == GameCmd.UPDATE_HUA) //
            {
                this.updateHuaCards(GameConst.ME_DIR, data)
            }
            else if (eventId == GameCmd.AUTO_DISCARD_INFO) //
            {
                GlobalData.gameData.clearAutoDiscardInfo()
                this.clearAllScheduler()
                if (this.status != GameConst.GAME_STATUS_TYPE.playing) //
                {
                    LogUtils.info("~~~~~~~~~~~~~~~~增加 自动打牌数据")
                    GlobalData.gameData.addTempDataBeforeGameStart({ type: this.tempDataType.AUTO_DISCARD_TILE, data: data })
                }
                else {
                    var tileId = data.tileId
                    this.autoDelayDiscard(tileId)
                }
            }
            else if (eventId == GameCmd.CHANGE_CARD_BACK) //
            {
                this.changeCardBack()
            }
            else if (eventId == GameCmd.FLOWER_VISIBLE) //

            {
                this.setFlowerCardVisible()
            }
            else if(eventId == GameCmd.CHANGE_CARD_FACE)
            {
               this.changeCardFace()
            }
        }

        public setStatus(status, isStart: boolean = false) {
            this.status = status;
            if (this.status == GameConst.GAME_STATUS_TYPE.ready) {
                this.clearAllCard()
            } else if (this.status == GameConst.GAME_STATUS_TYPE.before_playing) {
                this.clearAllCard()
            } else if (this.status == GameConst.GAME_STATUS_TYPE.playing) {
                if (!isStart) {
                    this.setTouchEnable(true)
                }
                else
                    this.addSchedulerFunc((): void => { this.setTouchEnable(true) }, 1000)
                this.showPlayerCard(isStart)
                this.excuteTempDataWhenGameBegin()
            }
            else if (this.status == GameConst.GAME_STATUS_TYPE.waiting) {
                this.clearAllCard()
                this.gs.getEffectLayer().hideCurDiscardArrow()
            }
            else if (this.status == GameConst.GAME_STATUS_TYPE.over || this.status == GameConst.GAME_STATUS_TYPE.allOver) {
                GlobalData.gameData.clearTempDataBeforeGameStart()
                this.clearSelectCard()
            }
        }


        private changeCardFace()
        {
           for(let i = 0;i < this.handCardNode.length;i++){
                for(let j = 0;j < this.handCardNode[i].length;j++){
                    let card = this.handCardNode[i][j]
                    card.changeCardFace()
                }
            }

            for(let i = 0;i < this.huaCardNode.length;i++){
                for(let j = 0;j < this.huaCardNode[i].length;j++){
                    let card = this.huaCardNode[i][j]
                    card.changeCardFace()
                }

            }

            for(let i = 0;i < this.outCardNode.length;i++){
                for(let j = 0;j < this.outCardNode[i].length;j++){
                    let card = this.outCardNode[i][j]
                    card.changeCardFace()
                }
            }

            for(let i = 0;i < this.pongKongNode.length;i++){
                for(let j = 0;j < this.pongKongNode[i].length;j++){
                    let card = this.pongKongNode[i][j]
                    card.changeCardFace()
                }
            }
        }

        private changeCardBack() {
            //修改手牌
            for (var i = 0; i < this.handCardNode.length; i++) {
                for (var j = 0; j < this.handCardNode[i].length; j++) {
                    var card = this.handCardNode[i][j]
                    card.changeCardBack()
                }
            }

            //修改花牌
            for (var i = 0; i < this.huaCardNode.length; i++) {
                for (var j = 0; j < this.huaCardNode[i].length; j++) {
                    var card = this.huaCardNode[i][j]
                    card.changeCardBack()
                }
            }

            //修改打出牌
            for (var i = 0; i < this.outCardNode.length; i++) {
                for (var j = 0; j < this.outCardNode[i].length; j++) {
                    var card = this.outCardNode[i][j]
                    card.changeCardBack()
                }
            }
            //修改碰杠牌
            for (var i = 0; i < this.pongKongNode.length; i++) {
                {
                    for (var j = 0; j < this.pongKongNode[i].length; j++) {
                        var card = this.pongKongNode[i][j]
                        card.changeCardBack()
                    }
                }
            }
        }

        private playDiscardArrow(dir) {
            var lastDiscardCard: egret.DisplayObject = this.getLastOutCard(dir)
            if (lastDiscardCard != null) {
                var arrowPosition = lastDiscardCard.localToGlobal(lastDiscardCard.width / 2, lastDiscardCard.height / 2)
                arrowPosition.x = arrowPosition.x - GlobalData.deltaX;
                arrowPosition.y = arrowPosition.y - GlobalData.deltaY;
                this.gs.getEffectLayer().playCurDiscardArrow(arrowPosition)
            }

        }

        private excuteTempDataWhenGameBegin() {
            var tempDataBeforeGameStart = GlobalData.gameData.getTempDataBeforeGameStart()
            for (var i = 0; i < tempDataBeforeGameStart.length; i++) {
                var tempData = tempDataBeforeGameStart[i]
                var type = tempData.type
                var data = tempData.data
                if (type == this.tempDataType.DRAW_CARD) {
                    var chairId = data.chairId
                    var values = data.cardValues
                    var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                    this.drawCard(clientId, values)
                }
                else if (type == this.tempDataType.AUTO_DISCARD_TILE) {
                    this.clearAllScheduler()
                    var tileId = data.tileId
                    this.autoDelayDiscard(tileId, true)
                }
                else if (type == this.tempDataType.DISCARD_OTHER) {
                    var chairId = data.chairId
                    var value = data.cardValue
                    var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                    this.otherDiscard(clientId, value)
                }
            }
            GlobalData.gameData.clearTempDataBeforeGameStart()

            var firstDrawCardData = GlobalData.gameData.getFirstDrawCardData()
            if (firstDrawCardData != null) {
                var chairId = firstDrawCardData.chairId
                var values = firstDrawCardData.cardValues
                var clientId = GlobalData.gameData.changeChairIdToClientId(chairId)
                this.drawCard(clientId, values)
                GlobalData.gameData.clearFirstDrawCardData()
            }

            var tingInfo = GlobalData.gameData.getAutoDiscardInfo()
            if (tingInfo != null) {
                this.clearAllScheduler()
                var tileId = tingInfo.tileId
                this.autoDelayDiscard(tileId, true)
                GlobalData.gameData.clearAutoDiscardInfo()
            }
        }

        private setTouchEnable(value) {
            if (GlobalData.gameData.isPlayBack()) {
                return
            }
            this.touchErea.touchEnabled = value
        }

        private showPlayerCard(isStart: boolean) {
            this.clearAllScheduler()
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                var clientId = GlobalData.gameData.changeIndexToClientId(i)
                if(clientId != -1)
                {
                    this.initPongKongNode(clientId)
                    this.initOutCard(clientId)
                    this.initHuaCard(clientId, isStart)
                    this.initHandCard(clientId)
                }
            }

            var lastDiscardChairId = GlobalData.gameData.getLastDiscarChairId()
            if (lastDiscardChairId != 0) {
                var lastDiscardClientId = GlobalData.gameData.changeChairIdToClientId(lastDiscardChairId)
                var lastDiscardCardValue = GlobalData.gameData.getLastDiscardValue()
                var lastDiscardCard = this.getLastOutCard(lastDiscardClientId)
                LogUtils.info("lastDiscardClientId " + lastDiscardClientId)
                LogUtils.info("lastDiscardCardValue " + lastDiscardCardValue)
                if (lastDiscardCard != null) {
                    LogUtils.info("cur lastDiscardCardValue " + lastDiscardCard.getCardValue())
                }

                if (lastDiscardCard && lastDiscardCardValue == lastDiscardCard.getCardValue()) {
                    this.playDiscardArrow(lastDiscardClientId)
                }
            }

            this.gs.getGameUILayer().checkMyTingInfoBtn()
        }

        private initPongKongNode(dir) {
            this.clearPongKongCard(dir)
            var cardData = GlobalData.gameData.getCardData(dir)
            if (cardData == null) {
                LogUtils.error("initPongKongNode cardData is null dir " + dir)
                return
            }
            var playerPongKongCardsData = cardData.getPongKongCards()
            var len = playerPongKongCardsData.length
            for (var i = 0; i < len; i++) {
                this.createPongKongNode(dir, playerPongKongCardsData[i], i)
            }
        }

        private createPongKongNode(dir, data, idx, delay: number = 0) {
            var nodePath =  GameConst.CARD_DATA.PONG_KONG_CARD[dir].path
            if (GameUtils.is3dMode()) 
            {
                nodePath = GameConst.CARD_3D_DATA.PONG_KONG_CARD[dir].path
            }
            if (dir == GameConst.PLAY_DIR.down || dir == GameConst.PLAY_DIR.up)
            {
                 nodePath = Utils.format(nodePath,idx + 1)
            }
            var pengKongNode = new game.PongKongCardNode(Constants.UI_GAME_CSB_PATH + nodePath, data, dir, idx)
            if (delay > 0) {
                pengKongNode.visible = false
                this.addSchedulerFunc((): void => {
                    game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
                    pengKongNode.visible = true
                }, delay)
            }
            else {
                game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
            }

            var zOrderIndex = -1
            if (dir == GameConst.PLAY_DIR.right) {
                zOrderIndex = 0
            }
            if (zOrderIndex == -1) {
                this.PongKongCardGroupSet[dir].addChild(pengKongNode)
            } else {
                this.PongKongCardGroupSet[dir].addChildAt(pengKongNode, 0)
            }
            this.pongKongNode[dir].push(pengKongNode)
        }

        private initOutCard(dir) {
            this.clearOutCard(dir)
            var cardData = GlobalData.gameData.getCardData(dir)
            if (cardData == null) {
                return
            }
            var playerOutCardsValue = cardData.getPlayerOutCards()
            LogUtils.info(playerOutCardsValue.toString())
            var len = playerOutCardsValue.length
            for (var i = 0; i < len; i++) {
                this.createOutCard(dir, playerOutCardsValue[i], i)
            }
        }

        private createOutCard(dir, value, index) {
            var nodePath = this.getOutCardCsbPath(dir,index)
            var card: game.OutCardNode = new game.OutCardNode(Constants.UI_GAME_CSB_PATH + nodePath, value, dir, index)
            var zOrderIndex = -1
            if (dir == GameConst.PLAY_DIR.up || dir == GameConst.PLAY_DIR.right) {
                zOrderIndex = 0
                if (index >= 20) {
                    zOrderIndex = 20
                }
            }
            if (zOrderIndex == -1) {
                this.OutCardGroupSet[dir].addChild(card)
            } else {
                this.OutCardGroupSet[dir].addChildAt(card, zOrderIndex)
            }
            this.outCardNode[dir].push(card)
        }

        private initHuaCard(dir, isStart) {
            var cardData = GlobalData.gameData.getCardData(dir)
            if (cardData == null) {
                return
            }
            var playerHuaCardsValue = cardData.getPlayerHuaCards()
            var len = playerHuaCardsValue.length

            var initHuaFunc = (): void => {
                this.clearHuaCard(dir)
                for (var i = 0; i < len; i++) {
                    this.createHuaCard(dir, playerHuaCardsValue[i], i)
                }
            }

            if (dir == GameConst.ME_DIR && len > 0 && isStart) {
                this.addSchedulerFunc((): void => {
                    this.gs.getEffectLayer().playBuHua(GameConst.ME_DIR, 1)
                    initHuaFunc()
                }, 500)
            }
            else {
                initHuaFunc()
            }
        }




private getOutCardCsbPath(dir,index)
{
    var card_mode_data = GameConst.CARD_DATA
    var isCurBe3dMode = GameUtils.is3dMode()
    if (isCurBe3dMode)
    {
        card_mode_data = GameConst.CARD_3D_DATA
    }

    var nodePath = card_mode_data.OUT_CARD[dir].path
    LogUtils.info("nodePath"+nodePath)
    return nodePath
}


        private initHandCard(dir) {
            this.clearHandCard(dir)
            var cardData = GlobalData.gameData.getCardData(dir)
            if (cardData == null) {
                return
            }
            var playerCardsValue = cardData.getPlayerHandCards()
            var len = playerCardsValue.length

            var needSortArr = []
            var lastCard
            var maxCardLen = cardData.getDrawCardIndex()
            if (len >= maxCardLen) {
                for (var i = 0; i < maxCardLen - 1; i++) {
                    needSortArr[i] = playerCardsValue[i]
                }
                lastCard = playerCardsValue[len - 1]
            } else {
                needSortArr = playerCardsValue
            }

            needSortArr.sort((a, b): number => {
                return a - b;
            })

            if (lastCard != null) {
                needSortArr.push(lastCard)
            }

            for (var i = 0; i < len; i++) {
                this.createHandCard(dir, needSortArr[i], i)
            }
            this.checkShowTingInfo()
        }

        public pongBack(dir, data) {
            var cardValue = data.getValue()
            var provideClientId = data.getProvideClientId()
            var pongKongNum = this.getPongKongNum(dir)
            var pongCard = this.pongKongNode[dir][pongKongNum - 1]
            if (pongCard.getCardValue() == cardValue) {
                this.pongKongNode[dir].splice(pongKongNum - 1, 1)
                this.PongKongCardGroupSet[dir].removeChild(pongCard)
                var handCardSet = this.handCardNode[dir]
                var sideCardIndex = this.getHandCardsNum(dir)
                var sideCard = handCardSet[sideCardIndex - 1]
                var insertIndex = this.calcCardInsertIndex(dir, sideCard.getCardValue())
                handCardSet.splice(sideCardIndex - 1, 1)
                handCardSet.splice(insertIndex, 0, sideCard)
                for (var i = 0; i < 2; i++) {
                    var insertIndex = this.calcCardInsertIndex(dir, cardValue)
                    this.createHandCard(dir, cardValue, insertIndex)
                }

                var len = this.getHandCardsNum(dir)
                for (var i = 0; i < len; i++) {
                    var tempCard = handCardSet[i]
                    if (dir == GameConst.PLAY_DIR.right) {
                        this.HandCardGroupSet[dir].addChildAt(tempCard, 0)
                    }
                    else if (dir == GameConst.PLAY_DIR.left) {
                        this.HandCardGroupSet[dir].addChild(tempCard)
                    }
                    tempCard.resetPosition(i, GameConst.HAND_CARD_ACTION_TYPE.MOVE_HORIZONTAL)
                }
            }
            var outNumIndex = this.getDiscardNum(provideClientId)
            this.createOutCard(provideClientId, cardValue, outNumIndex)
        }

        public pong(dir, data: PongKongData) {
            var needPongAction = (dir == GameConst.ME_DIR || GlobalData.gameData.isPlayBack())
            // var needPongAction = false
            //从手牌中移除碰的牌
            var value = data.getValue()
            var pongCardIndex = this.getPongCardIndex(dir, value)
            if (pongCardIndex != null) {
                var dirHandCardList = this.handCardNode[dir]
                for (var i = 0; i < 2; i++) {
                    var pongNode = dirHandCardList[pongCardIndex]
                    if (pongNode != null) {
                        if (needPongAction) {
                            var moveData = this.getUpOffData(dir)
                            var moveOffX = moveData.moveOffX
                            var moveOffY = moveData.moveOffY
                            var tw = egret.Tween.get(pongNode)
                            tw.to({ x: pongNode.x + moveOffX, y: pongNode.y + moveOffY }, 200)
                            tw.wait(200)
                            tw.call(function () {
                                this.parent.removeChild(this)
                                // this.HandCardGroupSet[dir].removeChild(pongNode)
                            })
                        }
                        else {
                            this.HandCardGroupSet[dir].removeChild(pongNode)
                        }
                        dirHandCardList.splice(pongCardIndex, 1)
                    }
                }
            }

            //显示碰的牌
            var pongKongNum = this.getPongKongNum(dir)
            if (needPongAction) {
                this.createPongKongNode(dir, data, pongKongNum, 400)
            }

            else {
                this.createPongKongNode(dir, data, pongKongNum)
            }

            //从打出的牌中移除碰的牌
            var provideClientId = data.getProvideClientId()
            this.removePongKongProvideCard(dir, provideClientId)

            //重置手牌位置
            this.resetAllHandCardPosition(dir)
            if( data.getStutre()){
                this.addTwoOrThreeCardFlag(dir)
            }else{
                this.clearTwoOrThreeCardFlag(dir)
            }
            this.checkShowTingInfo()
        }

        private addTwoOrThreeCardFlag(clientId){
            let ChariId = GlobalData.gameData.changeIndexToClientId(clientId)
            let pongKongCards = this.pongKongNode[ChariId]
            for(let j = 0;j < pongKongCards.length;j++){
                if( !pongKongCards[j].getData().getStutre() ){
                    pongKongCards[j].getData().setStutre(true)
                    pongKongCards[j].flagTwoOrThreeCard()
                }
            }

        }

        private clearTwoOrThreeCardFlag(clientId){
            let ChariId = GlobalData.gameData.changeIndexToClientId(clientId)
            if( ChariId != -1 ){
                let pongKongCards = this.pongKongNode[ChariId]
                for(let j = 0;j < pongKongCards.length;j++){
                    if( pongKongCards[j].getData().getStutre() ){
                        pongKongCards[j].getData().setStutre(false)
                        pongKongCards[j].ClearTwoOrThreeCard()
                    }
                }
            }

        }

        private updateHuaCards(dir, data) {
            var len = this.huaCardNode[dir].length
            for (var i = 0; i < len; i++) {
                this.HuaCardGroupSet[dir].removeChild(this.huaCardNode[dir][i])
            }
            this.huaCardNode[dir] = []
            for (var i = 0; i < data.length; i++) {
                var index = this.getHuaNum(dir)
                this.createHuaCard(dir, data[i], i)
            }
            var huaNum = this.huaCardNode[dir].length
            Utils.sendGameEvent(GameCmd.PLAYER_HUA_NUM_CHANGED, { clientId: dir, huaNum: huaNum })
        }


        private getUpOffData(dir) {
            var moveOffY = 0
            var moveOffX = 0
            if (GlobalData.gameData.isPlayBack()) {
                if (dir == GameConst.ME_DIR) {
                    moveOffY = -GameConst.CARD_SIZE.HAND_CARD[dir].height_playBack
                } else if (dir == GameConst.PLAY_DIR.up) {
                    moveOffY = GameConst.CARD_SIZE.HAND_CARD[dir].height_playBack
                } else if (dir == GameConst.PLAY_DIR.left) {
                    moveOffX = GameConst.CARD_SIZE.HAND_CARD[dir].width_playBack
                }

                else if (dir == GameConst.PLAY_DIR.right) {
                    moveOffX = -GameConst.CARD_SIZE.HAND_CARD[dir].width_playBack
                }
            }

            else {
                if (dir == GameConst.ME_DIR) {
                    moveOffY = -GameConst.CARD_SIZE.HAND_CARD[dir].height
                }
                else if (dir == GameConst.PLAY_DIR.up) {
                    moveOffY = GameConst.CARD_SIZE.HAND_CARD[dir].height
                }

                else if (dir == GameConst.PLAY_DIR.left) {
                    moveOffX = GameConst.CARD_SIZE.HAND_CARD[dir].width
                }

                else if (dir == GameConst.PLAY_DIR.right) {
                    moveOffX = -GameConst.CARD_SIZE.HAND_CARD[dir].width
                }
            }

            return { moveOffX: moveOffX, moveOffY: moveOffY };
        }


        private checkShowTingInfo() {
            if (GlobalData.gameData.isPlayBack()) {
                return
            }
            this.clearTingFlag()
            if (!GlobalData.gameData.hasTingPaiInfo()) {
                return
            }
            var handCards = this.handCardNode[GameConst.ME_DIR]
            var tingInfo = GlobalData.gameData.getTingPaiInfo()
            for (var i = 0; i < tingInfo.length; i++) {
                var tingCardValue = tingInfo[i].tileId
                for (var j = 0; j < handCards.length; j++) {
                    var cardValue = handCards[j].getCardValue()
                    if (cardValue == tingCardValue) {
                        handCards[j].setTingFlagVisible(true)
                    }
                }
            }
        }

        private setFlowerCardVisible() {
            var flowerCardVisible = GlobalData.gameData.getFlowerCardVisible()
            for (var i = 0; i < this.HuaCardGroupSet.length; i++) {
                this.HuaCardGroupSet[i].visible = flowerCardVisible
            }
        }

        private createHuaCard(dir, cardValue, index) {
            var nodePath = GameConst.CARD_DATA.HUA_CARD[dir].path
            var isCurBe3dMode =  GameUtils.is3dMode()
            if (isCurBe3dMode)
            {
                 nodePath = GameConst.CARD_3D_DATA.HUA_CARD[dir].path
            }
            else
            {
                nodePath = GameConst.CARD_DATA.HUA_CARD[dir].path
            }
            var params = { nodePath: Constants.UI_GAME_CSB_PATH + nodePath, cardValue: cardValue, dir: dir, idx: index }
            var card: HuaCardNode = new HuaCardNode(params)
            this.huaCardNode[dir].pu
            var zOrderIndex = -1
            if (dir == GameConst.PLAY_DIR.right) {
                zOrderIndex = 0
            }
            if (zOrderIndex == -1) {
                this.HuaCardGroupSet[dir].addChild(card)
            } else {
                this.HuaCardGroupSet[dir].addChildAt(card, zOrderIndex)
            }
            this.huaCardNode[dir].push(card)

            var huaNum = this.huaCardNode[dir].length
            Utils.sendGameEvent(GameCmd.PLAYER_HUA_NUM_CHANGED, { clientId: dir, huaNum: huaNum })
        }


        private createHandCard(dir: number, cardValue: number, index: number, actionType: number = -1) {
            var drawCardIndex = this.getDrawCardIndex(dir)
            var handCardNum = this.getHandCardsNum(dir)
            if (handCardNum >= drawCardIndex + 1) {
                return
            }

            if (cardValue == null) {
                LogUtils.error("数据错误")
            }

            var path = this.getHandCardCsbPath(dir,index)
            var params = { nodePath: Constants.UI_GAME_CSB_PATH + path, cardValue: cardValue, dir: dir, idx: index, actionType: actionType }
            var handCard = new HandCardNode(this, params);
            this.handCardNode[dir].push(handCard)
            var zOrderIndex = -1
            if (dir == GameConst.PLAY_DIR.right) {
                zOrderIndex = 0
            }
            if (zOrderIndex == -1) {
                this.HandCardGroupSet[dir].addChild(handCard)
            } else {
                this.HandCardGroupSet[dir].addChildAt(handCard, zOrderIndex)
            }

        }

        private getHandCardCsbPath(dir,index) {
           var path = ""
            if (GameUtils.is3dMode())
            {
                path = GameConst.CARD_3D_DATA.HAND_CARD[dir].path
                if (dir != GameConst.ME_DIR && GlobalData.gameData.isPlayBack())
                 {
                     path = GameConst.CARD_3D_DATA.HAND_CARD[dir].playBackPath
                    // if (dir == GameConst.PLAY_DIR.up)
                    // {
                    //     index = this.getPongKongTotalCardNum(dir) + index
                    //     var idx = Math.min(index,10)
                    //     path = Utils.format(path,idx)
                    // }
                 }
            }
            else
            {
                path = GameConst.CARD_DATA.HAND_CARD[dir].path
                if (dir != GameConst.ME_DIR && GlobalData.gameData.isPlayBack())
                {
                    path = GameConst.CARD_DATA.OUT_CARD[dir].path
                }
            }

            return path
        }

        private initTouchEvent() {
            this.clickedIndex = -1;
            var selectIndex = -1;
            var moveIndex = -1;
            var canMove = false;
            var beginStartX = 0;
            var beginStartY = 0;
            this.touchErea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchEventBegin, this);
            this.touchErea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEventMove, this);
            this.touchErea.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEventEnd, this);
            this.touchErea.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEventEnd, this);
            this.touchErea.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEventEnd, this);
        }

        private checkAutoDelay() {
            if (GlobalData.gameData.isAutoDelay(GameConst.ME_DIR)) {
                if (this.moveIndex != -1) //滑动
                {
                    //printInfo("滑动 结束")
                    var selCard = this.getHandCardByIdx(GameConst.ME_DIR, this.moveIndex)
                    if (selCard != null) {
                        selCard.resetPosition(this.moveIndex)
                        this.clearSelectCard()
                    }
                    this.moveIndex = -1
                }
                return true;
            }
            return false
        }


        private touchEventBegin(evt: egret.TouchEvent) {
            if (!this.isGestureDiscardEnable()) {
                return
            }
            if(this.checkAutoDelay())
            {
                return
            }
            var canDiscard = this.isMeGestureDiscard()
            if (canDiscard) {
                this.clickedIndex = -1
                this.moveIndex = -1
                this.canMove = false
                var startClickCardIndex = this.getTouchIndex(evt.stageX, evt.stageY)    //点击的是第几张牌，最后边第14张
                if (startClickCardIndex == -1) {
                    this.gs.resetClickEvent()
                    return
                }
                this.clickedIndex = startClickCardIndex
                this.beginStartX = evt.stageX
                this.beginStartY = evt.stageY
            } else {
                this.clickedIndex = this.getTouchIndex(evt.stageX, evt.stageY);
                if (this.clickedIndex == -1) {
                    this.gs.resetClickEvent();
                }
            }
            // LogUtils.info("touchEventBegin evt ");
            // LogUtils.info("stageX:" + evt.stageX + ",stageY:" + evt.stageY);

        }

        private touchEventMove(evt: egret.TouchEvent) {
            if (this.status != GameConst.GAME_STATUS_TYPE.playing) {
                return
            }
            if(this.checkAutoDelay())
            {
                return
            }
            var canDiscard = this.isMeGestureDiscard()
            if (!canDiscard) {
                return
            }
            // LogUtils.info("touchEventMove evt ");  
            // LogUtils.info("stageX:"+evt.stageX + ",stageY:" + evt.stageY);
            if (this.clickedIndex == -1) {
                return
            }

            var x = evt.stageX
            var y = evt.stageY
            if (!this.canMove) {
                var disx = this.beginStartX - x
                var disy = this.beginStartY - y
                if (Math.abs(disx) < 5 && Math.abs(disy) < 5) {
                    return
                }
                this.canMove = true
            }
            this.clearSelectCard()
            var tempSelectCard: game.HandCardNode = this.getHandCardByIdx(GameConst.ME_DIR, this.clickedIndex)
            if (tempSelectCard != null && tempSelectCard.canSelect()) {
                this.moveIndex = this.clickedIndex
                var orderIndex = this.HandCardGroupSet[GameConst.ME_DIR].getChildIndex(tempSelectCard)
                var handCardNum = this.getHandCardsNum(GameConst.ME_DIR)
                if (orderIndex < handCardNum) {
                    this.HandCardGroupSet[GameConst.ME_DIR].setChildIndex(tempSelectCard, handCardNum)
                }
                tempSelectCard.x = x - GameConst.CARD_SIZE.HAND_CARD[GameConst.ME_DIR].width / 2 - GlobalData.deltaX
                tempSelectCard.y = y - GameConst.CARD_SIZE.HAND_CARD[GameConst.ME_DIR].height / 2 - 30 - GlobalData.deltaY
                LogUtils.info("touchEventMove evt y:" + y);
            }
        }

        private touchEventEnd(evt: egret.TouchEvent) {
            if (!this.isGestureDiscardEnable()) {
                this.gs.resetClickEvent()
                return
            }
            if(this.checkAutoDelay())
            {
                return
            }
            // LogUtils.info("touchEventEnd evt ");  
            // LogUtils.info("stageX:"+evt.stageX + ",stageY:" + evt.stageY);
            var canDiscard = this.isMeGestureDiscard()
            if (canDiscard) {
                if (this.clickedIndex == -1) {
                    return
                }
                var x = evt.stageX
                var y = evt.stageY
                var endSelectIndex = this.getTouchIndex(x, y)

                if (this.moveIndex != -1)  //滑动
                {
                    var selCard = this.getHandCardByIdx(GameConst.ME_DIR, this.moveIndex)
                    this.HandCardGroupSet[GameConst.ME_DIR].setChildIndex(selCard, 0)
                    // selCard.set(0)
                    LogUtils.info("touchEventEnd evt y:" + y);
                    if (y < 570) {
                        this.discard(GameConst.ME_DIR, this.clickedIndex)
                    }
                    else {
                        selCard.resetPosition(this.moveIndex)
                        this.clearSelectCard()
                    }
                }  //printInfo("滑动 结束")

                //选中的牌位置处于打出范围
                else if (GlobalData.gameData.getClickCardType() == GameConst.CLICK_CARD_TYPE.click) //单击
                {
                    if (endSelectIndex == this.clickedIndex) {
                        this.discard(GameConst.ME_DIR, this.clickedIndex)
                    }
                }
                else if (GlobalData.gameData.getClickCardType() == GameConst.CLICK_CARD_TYPE.doubleClick) // 双击
                {
                    //选中的牌已经是二次选中
                    if (endSelectIndex != this.clickedIndex) {
                        return
                    }
                    var selectCard = this.getHandCardByIdx(GameConst.ME_DIR, this.clickedIndex)
                    if (selectCard == null) {
                        return
                    }
                    if (!selectCard.isSelected()) {
                        //printInfo("select card index ",this.clickedIndex)
                        this.setSelectCardIndex(this.clickedIndex)
                    } else {
                        this.discard(GameConst.ME_DIR, this.clickedIndex)
                    }
                }
            } else {
                var endClickedIndex = this.getTouchIndex(evt.stageX, evt.stageY)
                if (endClickedIndex != this.clickedIndex) {
                    return
                }
                this.setSelectCardIndex(this.clickedIndex)
                this.clickedIndex = -1
            }

        }

        private getTouchIndex(stageX: number, stageY: number) {
            var index = -1
            var len = this.handCardNode[GameConst.ME_DIR].length
            for (var i = 0; i < len; i++) {
                var tempCard = this.handCardNode[GameConst.ME_DIR][i]
                if (tempCard.hitTestPoint(stageX, stageY)) {
                    LogUtils.info("选中" + (i + 1) + "张");
                    index = i
                    break;
                }
            }
            return index
        }

        public setSelectCardIndex(index) {
            var tempCard: HandCardNode = this.getHandCardByIdx(GameConst.ME_DIR, index)
            if (this.selectIndex == index) {
                this.clearSelectCard()
                return
            }
            this.clearSelectCard()
            if (tempCard != null && tempCard.canSelect()) {
                tempCard.setSelect(true)
                this.flagSameValueCardForSelectedCard(tempCard.getCardValue())
                this.selectIndex = index

                var tingInfo = GlobalData.gameData.getTingInfo(tempCard.getCardValue())
                if (tingInfo != null) {
                    var tintPosition = tempCard.localToGlobal(0, 0)
                    this.tingTint.initData(tingInfo, tintPosition.x)
                    this.tingTint.visible = true
                }
            }

        }

        private calcCardInsertIndex(dir, value) {
            var handCardNum = this.getHandCardsNum(dir)
            var index = handCardNum + 1
            for (var i = 0; i < handCardNum; i++) {
                var tempCardValue = this.handCardNode[dir][i].getCardValue()
                if (value <= tempCardValue) {
                    index = i
                    break
                }
            }
            return index
        }

        private autoDelayDiscard(tileId, cancelReconnect: boolean = false) {
            var curHandCardNum = this.getHandCardsNum(GameConst.ME_DIR)
            var curMaxNum = this.getDrawCardIndex(GameConst.ME_DIR) + 1
            if (curMaxNum != curHandCardNum) {
                if (!cancelReconnect) {
                    //  SocketManager:reconnect()
                }
                return
            }
            var index = -1

            for (var i = curHandCardNum - 1; i >= 0; i--) {
                var cardValue = this.handCardNode[GameConst.ME_DIR][i].getCardValue()
                if (cardValue == tileId) {
                    index = i
                    break
                }
            }

            if (index != -1) {
                this.discard(GameConst.ME_DIR, index, true)
            }
            else {
                if (!cancelReconnect) {
                    // SocketManager:reconnect()
                }
            }
        }

        private discardBack(dir, value) {
            var outsideCardIndex = this.getDrawCardIndex(dir)
            this.createHandCard(dir, value, outsideCardIndex)
            var lastOutCard = this.getLastOutCard(dir)
            if (lastOutCard != null) {
                if (lastOutCard.getCardValue() != value) {
                    LogUtils.error("回退打牌 桌面上的牌值与打的牌值不相等")
                }
                var discardNum = this.getDiscardNum(dir)
                this.outCardNode[dir].splice(discardNum - 1, 1)
                this.OutCardGroupSet[dir].removeChild(lastOutCard)
            }
            else {
                LogUtils.error("回退打牌 桌面上的牌不存在")
            }
        }

        private discard(dir, index, fromServer: boolean = false) {
            // this.otherDiscard(GameConst.PLAY_DIR.left,1)
            // this.otherDiscard(GameConst.PLAY_DIR.right,1)
            // this.otherDiscard(GameConst.PLAY_DIR.up,1)
            LogUtils.info("出牌")
            var tempCard = this.getHandCardByIdx(dir, index)
            if (!this.checkCanDiscardCard(dir, index)) {
                tempCard.resetPosition(index)
                this.clearSelectCard()
                CommonView.showToast(Strings.outCardError)
                return
            }
            var tempCardValue = tempCard.getCardValue()
            SoundUtils.playEffectSoundNameBindPlayer(dir, tempCardValue)
            this.clearSelectCard()
            GlobalData.gameData.clearTingPaiInfo()
            this.clearTingFlag()
            var dirHandCardList = this.handCardNode[dir]
            //出牌
            var outsideCardIndex = this.getDrawCardIndex(dir)
            var outSideCard = dirHandCardList[outsideCardIndex]
            //移除打出的牌
            var node = dirHandCardList[index]
            this.HandCardGroupSet[dir].removeChild(node)
            //打出抓到的牌
            // this.gs.getEffectLayer().playDiscardEffect(dir, tempCardValue)
            dirHandCardList.splice(index, 1)

            if (outsideCardIndex == index) {

            }
            else {
                var startIndex: number, endIndex: number, cardInsertIndex: number
                if (outSideCard == null) {
                    startIndex = index
                    endIndex = dirHandCardList.length - 1
                }
                else {
                    cardInsertIndex = this.calcCardInsertIndex(dir, outSideCard.getCardValue())
                    dirHandCardList.splice(outsideCardIndex - 1, 1)
                    //printInfo("cardInsertIndex",cardInsertIndex)
                    dirHandCardList.splice(cardInsertIndex, 0, outSideCard)
                    // var lastArr = dirHandCardList.splice(cardInsertIndex, dirHandCardList.length - cardInsertIndex)
                    // dirHandCardList.push(outSideCard)
                    // for (var i = 0; i < lastArr.length; i++) {
                    //     dirHandCardList.push(lastArr[i])
                    // }

                    if (index <= cardInsertIndex) {
                        startIndex = index
                        endIndex = outsideCardIndex - 1
                    }
                    else {
                        startIndex = cardInsertIndex + 1
                        endIndex = outsideCardIndex - 1
                    }
                    if (dir == GameConst.PLAY_DIR.right) {
                        var totalLen = dirHandCardList.length
                        for (var i = 0; i < totalLen; i++) {
                            this.HandCardGroupSet[dir].setChildIndex(dirHandCardList[i], 0)
                        }
                    }
                    else if (dir == GameConst.PLAY_DIR.left) {
                        var totalLen = dirHandCardList.length
                        for (var i = 0; i < totalLen; i++) {
                            this.HandCardGroupSet[dir].setChildIndex(dirHandCardList[i], i)
                        }
                    }
                    if (cardInsertIndex == dirHandCardList.length - 1) {
                        outSideCard.resetPosition(cardInsertIndex, GameConst.HAND_CARD_ACTION_TYPE.MOVE_HORIZONTAL)
                    }
                    else {
                        outSideCard.resetPosition(cardInsertIndex, GameConst.HAND_CARD_ACTION_TYPE.INSERT_DRAW_CARD)
                    }
                }

                LogUtils.info("startIndex:" + startIndex)
                LogUtils.info("endIndex:" + endIndex)
                if (startIndex <= endIndex) {
                    for (var i = startIndex; i <= endIndex; i++) {
                        dirHandCardList[i].resetPosition(i, GameConst.HAND_CARD_ACTION_TYPE.MOVE_HORIZONTAL)
                    }
                }
            }
            this.addOutCard(dir, tempCardValue)
            game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
            if (!fromServer) {
                SocketManager.getInstance().sendMsg(MsgConstant.GAME, MsgConstant.CMD_DISCARD, { tileId: tempCardValue });
            }

            if (dir == GameConst.ME_DIR) {
                Utils.sendGameEvent(GameCmd.DIR_ARROW_CHANGE, { clientId: GlobalData.gameData.changeIndexToClientId(GameConst.ME_DIR % GameConst.maxPlayerNum) })

            }
            // this.drawCard(GameConst.ME_DIR, [9])
            // this.drawCard(GameConst.PLAY_DIR.left, [9])
            // this.drawCard(GameConst.PLAY_DIR.right, [9])
            // this.drawCard(GameConst.PLAY_DIR.up, [9])
        }

        private otherDiscard(dir, value) {
            SoundUtils.playEffectSoundNameBindPlayer(dir, value)
            var handCardNumAfterDiscard = GameConst.perPlayerTotalCardNum - this.getPongKongTotalCardNum(dir) - 1
            var outCard = this.getHandCardByIdx(dir, handCardNumAfterDiscard)
            if (outCard != null) {
                this.HandCardGroupSet[dir].removeChild(outCard)
                var dirHandCardList = this.handCardNode[dir]
                dirHandCardList.splice(handCardNumAfterDiscard, 1)
            }
            // this.gs.getEffectLayer().playDiscardEffect(dir, value)
            this.addOutCard(dir, value)
        }

        private drawBackCard(dir, values) {
            var len = values.length;
            if (len > 1) {
                var huaCardValueSet = []
                var huaCardSet = this.huaCardNode[dir]
                for (var i = 0; i < len - 1; i++) {
                    var huaLen = huaCardSet.length - 1
                    var huaCard = huaCardSet[huaLen]
                    huaCardSet.splice(huaLen, 1)
                    this.HuaCardGroupSet[dir].removeChild(huaCard)
                }
                var huaNum = huaCardSet.length
                Utils.sendGameEvent(GameCmd.PLAYER_HUA_NUM_CHANGED, { clientId: dir, huaNum: huaNum })
            }
            var value = values[len - 1]
            var outsideCardIndex = this.getDrawCardIndex(dir)
            var outsideCard = this.getHandCardByIdx(dir, outsideCardIndex)
            var handCardSet = this.handCardNode[dir]
            if (outsideCard.getCardValue() == value) {
                handCardSet.splice(outsideCardIndex, 1)
                this.HandCardGroupSet[dir].removeChild(outsideCard)
                return;
            }
            handCardSet.splice(outsideCardIndex, 1)
            var drawCardIndex = this.getHandCardIdxByValue(dir, value)
            var tempCard = handCardSet[drawCardIndex]
            handCardSet.splice(drawCardIndex, 1)
            this.HandCardGroupSet[dir].removeChild(tempCard)

            var insertIndex = this.calcCardInsertIndex(dir, outsideCard.getCardValue())
            handCardSet.splice(insertIndex, 0, outsideCard)
            var totalLen = handCardSet.length
            for (var i = 0; i < handCardSet.length; i++) {
                var resetCard = handCardSet[i]
                if (dir == GameConst.PLAY_DIR.right) {
                    this.HandCardGroupSet[dir].addChildAt(resetCard, 0)
                }
                else if (dir == GameConst.PLAY_DIR.left) {
                    this.HandCardGroupSet[dir].addChild(resetCard)
                }
                resetCard.resetPosition(i, GameConst.HAND_CARD_ACTION_TYPE.MOVE_HORIZONTAL)
            }
        }

        private drawCard(dir, values: number[]) {
            // this.drawValueSet = null
            var len = values.length
            var delayDuration = 0

            if (len > 1) {
                var huaCardValueSet = []
                for (var i = 0; i < len - 1; i++) {
                    huaCardValueSet.push(values[i])
                }
                var duration = this.drawManyHuaCard(dir, huaCardValueSet)
                delayDuration = delayDuration + duration
            }
            var index = this.getDrawCardIndex(dir)
            var type = GameConst.HAND_CARD_ACTION_TYPE.DRAW_CARD_ME
            if (dir != GameConst.ME_DIR) {
                type = GameConst.HAND_CARD_ACTION_TYPE.DRAW_CARD_OTHER
            }
            this.addSchedulerFunc((): void => {
                this.checkHuaNum(dir)
                this.createHandCard(dir, values[len - 1], index, type)
                this._isBuHuaing = false

                this.gs.getGameUILayer().operateCome()
                game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
                // printInfo("drawCard")
                if (dir == GameConst.ME_DIR) {
                    this.checkShowTingInfo()
                }
            }
                , delayDuration)
        }

        private checkHuaNum(dir) {
            if (GlobalData.gameData.isPlayBack() || dir != GameConst.ME_DIR) {
                return
            }
            var clientHuaNum = this.getHuaNum(dir)
            var serverHuaNum = GlobalData.gameData.getCardData(dir).getHuaNum()
            if (serverHuaNum && serverHuaNum != clientHuaNum) {
                var chairId = GlobalData.gameData.changeClientIdToChairId(dir)
                SocketManager.getInstance().sendMsg(MsgConstant.GAME, MsgConstant.CMD_getFlowerIds)
            }
        }

        private drawManyHuaCard(dir, values: number[]) {
            var delayDuration = 0
            var len = values.length
            var isAutoDiscard = GlobalData.gameData.isAutoDelay(GameConst.ME_DIR)
            if (len >= 1) {
                this._isBuHuaing = true
                var oneFlower = (len == 1)
                for (var i = 0; i < len; i++) {
                    if (!isAutoDiscard) {
                        delayDuration = delayDuration + 600
                    }
                    var value = values[i]
                    this.addSchedulerFunc((cardValue): void => {
                        if (oneFlower) {
                            this.drawHuaCard(dir, cardValue)
                        }
                        else {
                            this.drawHuaCard(dir, cardValue, 1)
                        }
                    }, delayDuration, [value])
                }
            }
            return delayDuration
        }

        private drawHuaCard(dir, value, index: number = -1) {
            if (index == -1) {
                this.gs.getEffectLayer().playBuHua(dir)
            }
            else {
                this.gs.getEffectLayer().playBuHua(dir, index)
            }

            var idx = this.getHuaNum(dir)
            this.createHuaCard(dir, value, idx)
        }

        private addOutCard(dir, value) {
            // printInfo("addOutCard")
            // printInfo("dir %d",dir)
            // printInfo("value %d",value)
            var index = this.getDiscardNum(dir)
            // printInfo("index %d",index)
            SoundService.getInstance().playAudio("cardTodesk_mp3")
            this.createOutCard(dir, value, index)
            this.playDiscardArrow(dir)
        }

        private flagSameValueCardForSelectedCard(cardValue) {
            this.flagValue = cardValue
            // var getOutCardMaskImgName = function (index) {
            //     var tempName = ""
            //     if (index == GameConst.ME_DIR) {
            //         tempName = "cover_me-dachu_png"
            //     }
            //     else if (index == GameConst.PLAY_DIR.left) {
            //         tempName = "cover_left-dachu_png"
            //     }
            //     else if (index == GameConst.PLAY_DIR.up) {
            //         tempName = "cover_me-dachu_png"
            //     }
            //     else if (index == GameConst.PLAY_DIR.right) {
            //         tempName = "cover_left-dachu_png"
            //     }
            //     return tempName
            // }

            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                var clientId = GlobalData.gameData.changeIndexToClientId(i)
                if(clientId != -1)
                {
                    var playerOutCards = this.outCardNode[clientId]
                    for (var j = 0; j < playerOutCards.length; j++) {
                        // var maskImgName = getOutCardMaskImgName(clientId)
                        if (playerOutCards[j].getCardValue() == cardValue) {
                            // var zhezhao = new eui.Image(maskImgName)
                            // zhezhao.x = 0;
                            // zhezhao.y = 0;
                            // playerOutCards[j].addChild(zhezhao)
                            // this.flagSet.push(zhezhao)
                            playerOutCards[j].flagSameValueCard()
                        }

                    }

                    var pongKongCards = this.pongKongNode[clientId]
                    for (var j = 0; j < pongKongCards.length; j++) {
                        // var maskImgName = getOutCardMaskImgName(clientId)
                        if (pongKongCards[j].getCardValue() == cardValue) {
                            var flagArr = pongKongCards[j].flagSameValueCard()
                            // for (var k = 0; k < flagArr.length; k++) {
                            //     this.flagSet.push(flagArr[k])
                            // }
                            
                        }

                    }
                }
                

            }

        }

        private clearSameValueCardFlag() {
            // for (var i = 0; i < this.flagSet.length; i++) {
            //     var falg = this.flagSet[i]
            //     falg.parent.removeChild(falg)
            // }
            // this.flagSet = []
            // this.flagValue = 0

            for (var i = 0; i < GameConst.maxPlayerNum; i++)
            {
                var clientId = GlobalData.gameData.changeIndexToClientId(i)
                if (clientId != -1)
                {
                    var playerOutCards = this.outCardNode[clientId]
                    for (var j = 0; j < playerOutCards.length;j ++)
                    {
                        playerOutCards[j].clearFlagSameValueCard()
                    }

                    var pongKongCards = this.pongKongNode[clientId]
                    for (var j = 0; j < pongKongCards.length; j++) 
                    {
                        pongKongCards[j].clearFlagSameValueCard()
                    }
                }
            }
        }

        private clearTingFlag() {
            var handCards = this.handCardNode[GameConst.ME_DIR]
            for (var j = 0; j < handCards.length; j++) {
                if (handCards[j] != null) {
                    handCards[j].setTingFlagVisible(false)
                }
            }
        }

        public clearSelectCard() {
            if (this.selectIndex != -1) {
                var sleCard = this.getHandCardByIdx(GameConst.ME_DIR, this.selectIndex)
                if (sleCard != null) {
                    sleCard.setSelect(false)
                }
            }
            this.selectIndex = -1
            this.clearSameValueCardFlag()
            if (this.tingTint != null) {
                this.tingTint.visible = false
            }
        }


        public checkCanDiscardCard(dir: number, index: number) {
            var result = true
            if (GlobalData.gameData.isPlayBack()) {
                result = true
            } else {
                if (GameConfig.gameID == Constants.GAME_ID_SET.nanjing && dir == GameConst.ME_DIR) {
                    var isTing = GlobalData.gameData.getPlayerByClientId(GameConst.ME_DIR).getCardData().isTing()
                    if (isTing && index != this.getDrawCardIndex(GameConst.ME_DIR)) {
                        result = false
                        //printInfo("听牌状态，无法出牌")
                    }
                }
            }
            return result
        }

        /**
         * 是否允许监听手势出牌
         */
        public isGestureDiscardEnable() {
            if (this.status != GameConst.GAME_STATUS_TYPE.playing || GlobalData.gameData.isPlayBack()) {
                return false
            }
            return true
        }

        public isMeGestureDiscard() {
            var isMyOut = GlobalData.gameData.isMyOutCardTurn()
            var isNeedOperate = GlobalData.gameData.needOperate()
            var cardNumIsMax = false
            if (isMyOut && !isNeedOperate) {
                cardNumIsMax = this.cardNumberIsMax(GameConst.ME_DIR)
            }
            return isMyOut && !isNeedOperate && cardNumIsMax
        }

        public cardNumberIsMax(dir) {
            var cardNumIsMax = false
            var curHandCardNum = this.getHandCardsNum(dir)
            var curMaxNum = this.getDrawCardIndex(dir) + 1
            // LogUtils.info("curHandCardNum" + curHandCardNum)
            // LogUtils.info("curMaxNum " + curMaxNum)
            if (curMaxNum == curHandCardNum) {
                cardNumIsMax = true
            }
            return cardNumIsMax
        }

        private resetAllHandCardPosition(dir) {
            var len = this.handCardNode[dir].length
            for (var i = 0; i < len; i++) {
                this.handCardNode[dir][i].resetPosition(i, GameConst.HAND_CARD_ACTION_TYPE.MOVE_HORIZONTAL)
            }
        }

        private removePongKongProvideCard(dir, provideClientId) {
            if (dir == provideClientId) {
                return
            }
            var outCardNum = this.getDiscardNum(provideClientId)
            var outCardIndex = outCardNum - 1
            var outCard = this.outCardNode[provideClientId][outCardIndex]
            if (outCard != null && this.flagValue == outCard.getCardValue()) {
                this.clearSameValueCardFlag()
                this.flagSameValueCardForSelectedCard(this.flagValue)
            }
            if (outCard != null) {
                this.OutCardGroupSet[provideClientId].removeChild(outCard)
            }
            this.outCardNode[provideClientId].splice(outCardIndex, 1)
        }

        private getPongKongNum(dir) {
            return this.pongKongNode[dir].length
        }

        private getPongCardIndex(dir, value) {
            if (dir != GameConst.ME_DIR && !GlobalData.gameData.isPlayBack()) {
                return 0
            }
            var handCardNum = this.getHandCardsNum(dir)
            var index
            for (var i = 0; i < handCardNum; i++) {
                if (this.handCardNode[dir][i].getCardValue() == value) {
                    index = i;
                    break;
                }
            }
            return index
        }

        private getHandCardByIdx(dir, idx): game.HandCardNode {
            var handCardArr = this.handCardNode[dir];
            var totalLen = handCardArr.length
            if (idx < 0 || idx > totalLen) {
                return
            }
            return handCardArr[idx]
        }

        private getHandCardIdxByValue(dir, value) {
            var idx = 0
            for (var i = 0; i < this.handCardNode[dir].length; i++) {
                var cardValue = this.handCardNode[dir][i].getCardValue()
                if (cardValue == value) {
                    idx = i
                    break
                }
            }
            return idx
        }

        private getLastOutCard(dir) {
            var discardNum = this.getDiscardNum(dir)
            if (discardNum > 0) {
                return this.outCardNode[dir][discardNum - 1]
            }
            return null
        }

        public getHandCardsNum(dir) {
            return this.handCardNode[dir].length
        }

        private getDiscardNum(dir) {
            return this.outCardNode[dir].length
        }

        public getDrawCardIndex(dir) {
            return GameConst.perPlayerTotalCardNum - this.getPongKongTotalCardNum(dir) - 1
        }

        public getPongKongTotalCardNum(dir) {
            return this.pongKongNode[dir].length * 3
        }

        private clearPongKongCard(dir) {
            this.PongKongCardGroupSet[dir].removeChildren()
            this.pongKongNode[dir] = [];
        }


        public getHuaNum(dir) {
            return this.huaCardNode[dir].length
        }

        private clearAllCard() {
            this.clearSameValueCardFlag()
            this.clearAllHandCard()
            this.clearAllPongKongCard()
            this.clearAllHuaCard()
            this.clearAllOutCard()
        }


        private clearAllHandCard() {
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                this.clearHandCard(i)
            }
        }

        private clearAllHuaCard() {
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                this.clearHuaCard(i)
            }
        }

        private clearAllPongKongCard() {
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                this.clearPongKongCard(i)
            }
        }

        private clearAllOutCard() {
            for (var i = 0; i < GameConst.maxPlayerNum; i++) {
                this.clearOutCard(i)
            }
        }

        private clearHuaCard(dir) {
            this.HuaCardGroupSet[dir].removeChildren()
            this.huaCardNode[dir] = [];
        }

        private clearHandCard(dir) {
            this.HandCardGroupSet[dir].removeChildren()
            this.handCardNode[dir] = [];

        }

        private clearOutCard(dir) {
            this.OutCardGroupSet[dir].removeChildren()
            this.outCardNode[dir] = [];
        }


        private addSchedulerFunc(callBack: Function, duration, data: any[] = null) {
            // var schedulerId
            // schedulerId = scheduler.performWithDelayGlobal(function()
            //     this.allScheduler[tostring(schedulerId)] = nil
            //     callBack()
            // end,duration)
            // this.allScheduler[tostring(schedulerId)] = callBack
            // var schedulerId = TimerItemManager.getInstance().startTimer(TimerItem.TimerType.once,duration,():void=>
            // {
            //     this.allScheduler.remove(schedulerId)
            //     callBack()
            // });
            // this.allScheduler.put(schedulerId,callBack)
            var tw = egret.Tween.get(this.cardGroup);
            tw.wait(duration)
            tw.call(() => {
                this.allScheduler.splice(this.allScheduler.indexOf(callBack), 1)
                callBack.call(this, data)
            })
            this.allScheduler.push(callBack)
        }

        public clearAllScheduler() {
            egret.Tween.removeTweens(this.cardGroup)
            while (this.allScheduler.length > 0) {
                var func = this.allScheduler.pop();
                func.call(this)
            }
            this.allScheduler = []
            // for k,v in pairs(this.allScheduler)  do
            //     local func = v
            //     func()
            //     scheduler.unscheduleGlobal(tonumber(k))
            // end
            // this.allScheduler = {}
        }

        private kongBack(dir, data) {
            var cardValue = data.getValue()
            var type = data.getType()
            var provideClientId = data.getProvideClientId()
            var kongIndex = this.findPongKongIndex(dir, cardValue)
            var kongNode = this.pongKongNode[dir][kongIndex]
            var handCardSet = this.handCardNode[dir]
            if (type == GameConst.GAIN_TYPE.ConcealedKong) {
                this.pongKongNode[dir].splice(kongIndex, 1)
                this.PongKongCardGroupSet[dir].removeChild(kongNode)
                for (var i = 0; i < 4; i++) {
                    var insertIndex = this.calcCardInsertIndex(dir, cardValue)
                    this.createHandCard(dir, cardValue, insertIndex)
                }
            }
            else if (type == GameConst.GAIN_TYPE.PongKong) {
                var data = kongNode.getData()
                data.setType(GameConst.GAIN_TYPE.PONG)
                kongNode.setData(data)
                var insertIndex = this.calcCardInsertIndex(dir, cardValue)
                this.createHandCard(dir, cardValue, insertIndex)

            }
            else if (type == GameConst.GAIN_TYPE.Exposed) {
                this.pongKongNode[dir].splice(kongIndex, 1)
                this.PongKongCardGroupSet[dir].removeChild(kongNode)
                for (var i = 0; i < 3; i++) {
                    var insertIndex = this.calcCardInsertIndex(dir, cardValue)
                    this.createHandCard(dir, cardValue, insertIndex)
                }
                var outNumIndex = this.getDiscardNum(provideClientId) + 1
                this.createOutCard(provideClientId, cardValue, outNumIndex)
            }

            var len = this.getHandCardsNum(dir)
            for (var i = 0; i < len; i++) {
                var tempCard = handCardSet[i]
                if (dir == GameConst.PLAY_DIR.right) {
                    this.HandCardGroupSet[dir].addChildAt(tempCard, 0)
                }
                else if (dir == GameConst.PLAY_DIR.left) {
                    this.HandCardGroupSet[dir].addChild(tempCard)
                }
                tempCard.resetPosition(i, GameConst.HAND_CARD_ACTION_TYPE.MOVE_HORIZONTAL)
            }
        }


        private findPongKongIndex(dir, value) {
            var idx = 0
            for (var i = 0; i < this.pongKongNode[dir].length; i++) {
                var pongkongNode = this.pongKongNode[dir][i]
                if (pongkongNode.getCardValue() == value) {
                    idx = i
                    break
                }
            }
            return idx
        }

        public kong(dir, data) {
            var needPongAction = (dir == GameConst.ME_DIR || GlobalData.gameData.isPlayBack())
            var value = data.getValue()

            var provideClientId = data.getProvideClientId()
            var type = data.getType()
            var isPongKong = false
            var pongKongCards: PongKongCardNode[] = this.pongKongNode[dir]
            var pongKongLen = this.getPongKongNum(dir)
            var pongIndex
            var pongProvideClientId
            for (var i = 0; i < pongKongLen; i++) {
                var t_value = pongKongCards[i].getData().getValue()
                var type = pongKongCards[i].getData().getType()
                // printInfo("type %s",type)
                // printInfo("value %s",value)
                // printInfo("t_value %s",t_value)
                if (type == GameConst.GAIN_TYPE.PONG && t_value == value) {
                    isPongKong = true
                    pongIndex = i
                    pongProvideClientId = pongKongCards[i].getData().getProvideClientId()
                    break
                }
            }
            var sideCardIndex = GameConst.perPlayerTotalCardNum - this.getPongKongTotalCardNum(dir)
            var needInsertSideCard = needPongAction
            if (sideCardIndex != this.getHandCardsNum(dir)) {
                needInsertSideCard = false
            }

            var kongCardIndexArr = this.getKongCardIndex(dir, value, provideClientId, isPongKong)

            for (var i = 0; i < kongCardIndexArr.length; i++) {
                if (i == sideCardIndex) {
                    needInsertSideCard = false
                    break;
                }
            }

            //移除杠牌
            var removeKongCardLen = kongCardIndexArr.length
            var dirHandCardList = this.handCardNode[dir]
            var removeNum = 0
            for (var i = 0; i < removeKongCardLen; i++) {
                var removeIndex = kongCardIndexArr[i] - removeNum
                var kongNode = dirHandCardList[removeIndex]
                if (needPongAction) {
                    var moveData = this.getUpOffData(dir)
                    var moveOffX = moveData.moveOffX
                    var moveOffY = moveData.moveOffY
                    var tw = egret.Tween.get(kongNode)
                    tw.to({ x: kongNode.x + moveOffX, y: kongNode.y + moveOffY }, 200)
                    tw.wait(200)
                    tw.call(function () {
                        this.parent.removeChild(this)
                    });
                }
                else {
                    this.HandCardGroupSet[dir].removeChild(kongNode)
                }
                dirHandCardList.splice(removeIndex, 1)
                removeNum = removeNum + 1
            }

            var sideCardInsertIndex = -1
            if (needInsertSideCard) {
                var sideIndex = dirHandCardList.length - 1
                var sideCard = dirHandCardList[sideIndex]
                sideCardInsertIndex = this.calcCardInsertIndex(dir, sideCard.getCardValue())
                dirHandCardList.splice(sideIndex, 1)
                dirHandCardList.splice(sideCardInsertIndex, 0, sideCard)
                var len = dirHandCardList.length
                for (var i = 0; i < len; i++) {
                    if (dir == GameConst.PLAY_DIR.right) {
                        this.HandCardGroupSet[dir].setChildIndex(dirHandCardList[i], 0)
                    }
                    else if (dir == GameConst.PLAY_DIR.left) {
                        this.HandCardGroupSet[dir].setChildIndex(dirHandCardList[i], i)
                    }
                }
            }
            var showKongCardDelay = 400

            if (dir != GameConst.ME_DIR) {
                showKongCardDelay = 200
            }

            if (isPongKong) {
                this.addSchedulerFunc((): void => {
                    data.setProvideClientId(pongProvideClientId)
                    this.pongKongNode[dir][pongIndex].setData(data)
                    game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
                }, showKongCardDelay)
            }
            else {
                this.createPongKongNode(dir, data, this.getPongKongNum(dir), showKongCardDelay)
            }

            if (type == GameConst.GAIN_TYPE.Exposed) {
                var provideClientId = data.getProvideClientId()
                this.removePongKongProvideCard(dir, provideClientId)
            }

            if( data.getStutre()){
                this.addTwoOrThreeCardFlag(dir)
            }else{
                this.clearTwoOrThreeCardFlag(dir)
            }

            this.addSchedulerFunc((): void => {
                var len = dirHandCardList.length
                for (var i = 0; i < len; i++) {
                    if (dirHandCardList[i] != null) {
                        if (i != sideCardInsertIndex) {
                            dirHandCardList[i].resetPosition(i, GameConst.HAND_CARD_ACTION_TYPE.MOVE_HORIZONTAL)
                        }
                        else {
                            dirHandCardList[i].resetPosition(i, GameConst.HAND_CARD_ACTION_TYPE.INSERT_DRAW_CARD)
                        }
                    }
                }
            }, 200)


            ////显示本家抓的牌
            //var kongResult = data:getKongResult()
            //this.drawCard(dir,kongResult)
        }


        private getKongCardIndex(dir, value, provideClientId, isPongKong) {
            var indexArr = []
            if (dir != GameConst.ME_DIR && !GlobalData.gameData.isPlayBack()) {
                var pongKongNum = this.getPongKongTotalCardNum(dir)
                var handCardNum = GameConst.perPlayerTotalCardNum - pongKongNum
                if (!isPongKong) {
                    handCardNum = handCardNum - 3
                }
                var curHandCardNum = this.getHandCardsNum(dir)
                var len = curHandCardNum - handCardNum
                for (var i = 0; i < len; i++) {
                    indexArr.push(i)
                }
            }
            else {
                var handCardNum: number = this.getHandCardsNum(dir)
                for (var i = 0; i < handCardNum; i++) {
                    if (this.handCardNode[dir][i].getCardValue() == value) {
                        indexArr.push(i)
                        if (indexArr.length >= 4) {
                            break
                        }
                    }
                }
            }
            return indexArr
        }

        public isBuhuaing() {
            return this._isBuHuaing
        }


        public release() {
            this.clearAllCard()
            this.clearAllScheduler()
            this.allScheduler = null
            this.tingTint = null
        }



    }


}