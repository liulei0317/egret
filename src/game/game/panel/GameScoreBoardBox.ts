module game
{
    export class GameScoreBoardBox extends EDialog
    {
        private Button_close:EButton
        private itemList:EScroller;

        private PlayerName1:eui.Label;
        private PlayerName2:eui.Label;
        private PlayerName3:eui.Label;
        private PlayerName4:eui.Label;
        private PlayerNameSet:eui.Label[];

        private totalScore1:GameScoreBoardScoreUnit
        private totalScore2:GameScoreBoardScoreUnit
        private totalScore3:GameScoreBoardScoreUnit
        private totalScore4:GameScoreBoardScoreUnit
        private totalScoreSet:GameScoreBoardScoreUnit[]

        private itemListData:any;

        private scoreBoardData:any

        public constructor()
        {
            super(Constants.UI_PANEL_DATA_SET.GameScoreBoard.index, false);
            this.skinName = "resource/skins/game/panel/gameScoreBoard.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.addTapEvent(this.Button_close,this.close.bind(this));
            this.initUI();
            this.initScroller()

            SocketManager.getInstance().sendMsg(MsgConstant.GAME,MsgConstant.CMD_GET_SCORECARD_INFOS)
        }

        protected onEventHandler(evt:egret.Event)
        {
            super.onEventHandler(evt)
            if(this.eventId == GameCmd.UPDATE_GAEMSCORE_BOARD)
            {
                this.scoreBoardData = this.eventData;
                this.itemListData = []
                if (this.scoreBoardData.length > 0)
                {
                    for(var i = 0;i < this.scoreBoardData[0].scoreInfos.length;i++)
                    {
                        if (this.itemListData[i] == null)
                        {
                            this.itemListData[i] = {}
                        }
                        this.itemListData[i].order = (i + 1)
                        
                        for(var j = 0;j < this.scoreBoardData.length;j++)
                        {
                            var scoreInfos = this.scoreBoardData[j].scoreInfos
                            if (this.itemListData[i].infos == null)
                            {
                                this.itemListData[i].infos = []
                            }
                            if(this.itemListData[i].infos[j] == null)
                            {
                                this.itemListData[i].infos[j] = {}
                            }
                            this.itemListData[i].infos[j].score = scoreInfos[i].score
                            this.itemListData[i].infos[j].waibaoScore = scoreInfos[i].waibaoScore
                        }
                    }
                }
                


                // for(var i = 0;i < this.scoreBoardData.length;i++)
                // {
                //     if (this.itemListData[i] == null)
                //     {
                //         this.itemListData[i] = []
                //     }
                //     var scoreInfos = this.scoreBoardData[i].scoreInfos
                //     for(var j = 0;j < scoreInfos.length;j++)
                //     {
                //         if (this.itemListData[i][j] == null)
                //         {
                //             this.itemListData[i][j] = {}
                //         }
                //         this.itemListData[i][j].score = scoreInfos[j].score
                //         this.itemListData[i][j].waibaoScore = scoreInfos[j].waibaoScore
                //     }
                    
                // }
                this.updateUI()

            }
        }

        private initUI()
        {
            this.PlayerNameSet = [this.PlayerName1,this.PlayerName2,this.PlayerName3,this.PlayerName4 ]
            for(var key in this.PlayerNameSet)
            {
                this.PlayerNameSet[key].visible =  false
            }

            this.totalScoreSet = [this.totalScore1,this.totalScore2,this.totalScore3,this.totalScore4 ]
            for(var key in this.totalScoreSet)
            {
                this.totalScoreSet[key].visible =  false
            }
        }

        protected updateUI_() {
            for(var key in this.scoreBoardData)
            {
                var tempData = this.scoreBoardData[key]
                this.PlayerNameSet[key].visible = true
                this.totalScoreSet[key].visible = true
                this.PlayerNameSet[key].text = tempData.nickNames
                this.totalScoreSet[key].setData(tempData.totalScores,tempData.waibaoTotalScores)
            }

            this.itemList.clearContent();
            this.itemList.setScrollerContent(this.itemListData);
        }


         private initScroller() {
            this.itemList.setElementViewInfo(72, 0);
            this.itemList.setElementCreateFunction(this.createElement.bind(this));
            this.itemList.setElementUpdateDataFun(this.updateElement.bind(this));
            this.itemList.setElementUpdateUIFun(this.updateElementUI.bind(this));
        }

        private createElement(data) {

            var item = new GameScoreBoardItem(data);
            return item;
        }

        private updateElement(item: GameScoreBoardItem, data: any) {
            item.setData(data);
        }

        private updateElementUI(item: GameScoreBoardItem) {
            item.updateUI();
        }
    }
}