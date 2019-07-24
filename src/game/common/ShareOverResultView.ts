module game
{
    export class ShareOverResultView extends game.EDialog
    {
        private Text_roomNumber:eui.Label
        private Text_roomType:eui.Label
        private userList:EScroller

        private data:any

        private curCompleteHeadNum:number= 0
        private hasAdd:boolean = false;
        public constructor(data:any)
        {
            super(Constants.UI_PANEL_DATA_SET.shareOverBox.index);
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.onCreationComplete,this);
            this.data = data
            this.skinName = "resource/skins/common/ShareOverResultViewSkin.exml"
            // this.addEventListener(eui.UIEvent.ADDED_TO_STAGE,this.addToStage,this);
        }

        private onCreationComplete()
        {
             this.hasAdd = true;
             this.showShare();
        }

        // private addToStage()
        // {
        //     this.hasAdd = true;
        //     this.showShare();
        // }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.initScroller()
            this.updateUI();
            
            EAppFacade.getInstance().registerCommand(GameCmd.SHARE_VIEW_HEAD_DOWNLOAD_COMPLETE,this.headDownloadCompeteEvent,this)
            // this.addEventListener(eui.UIEvent.COMPLETE,this.loadCompleteEvent.bind(this),this)
            EAppFacade.getInstance().registerCommand(game.GameCmd.onResume,this.onResume,this)
        }

        private onResume(){
            this.close();
        }

        // private loadCompleteEvent()
        // {
        //    this.showShare()
        // }

        private headDownloadCompeteEvent()
        {
            this.curCompleteHeadNum = this.curCompleteHeadNum + 1
            this.showShare()
        }

        private showShare()
        {
             var loadCompelte = RES.isGroupLoaded("shareResult")
            if(!loadCompelte)
            {
                RES.loadGroup("shareResult")
            }
            if(this.hasAdd && loadCompelte && this.curCompleteHeadNum == this.data.userInfoList.length)
            {
                // CommonView.hideWaiting();
                EAppFacade.getInstance().removeCommand(GameCmd.SHARE_VIEW_HEAD_DOWNLOAD_COMPLETE,this.headDownloadCompeteEvent,this)
                // console.log("w:"+ GameConfig.windowWidth)
                // console.log("h:"+ GameConfig.windowHeight)
                egret.setTimeout(this.callShare.bind(this),this,100)
                
            }
        }

        private async callShare()
        {
            var result  = await platform.share("没有硝烟的雀坛，留下你不败的神话！","",123,GameConfig.windowWidth,GameConfig.windowHeight)
            console.log(result)  
        }

        private initScroller() {
            this.userList.setElementViewInfo(87, 0);
            this.userList.setElementCreateFunction(this.createElement.bind(this));
            this.userList.setElementUpdateDataFun(this.updateElement.bind(this));
            this.userList.setElementUpdateUIFun(this.updateElementUI.bind(this));
        }

        private createElement(data) {

            var item = new game.ShareOverResultItem(data);
            return item;
        }

        private updateElement(item: game.ShareOverResultItem, data: any) {
            item.setData(data);
        }

        private updateElementUI(item: game.ShareOverResultItem) {
            item.updateUI();
        }

        public updateUI_()
        {
            this.userList.clearContent();
            this.userList.setScrollerContent(this.data.userInfoList);

            this.Text_roomNumber.text = "房间号 "+this.data.msgRoom.roomNumber
            if (this.data.msgRoom.roomType == Constants.ROOM_TYPE.jinYuanZi)
            {
                this.Text_roomType.text = "进园子"
            }else if (this.data.msgRoom.roomType == Constants.ROOM_TYPE.changKaiTou)
            {
                this.Text_roomType.text = "敞开头"
            }
            
        }

        public clean()
        {
            EAppFacade.getInstance().removeCommand(GameCmd.SHARE_VIEW_HEAD_DOWNLOAD_COMPLETE,this.headDownloadCompeteEvent,this)
            // this.removeEventListener(eui.UIEvent.COMPLETE,this.loadCompleteEvent.bind(this),this)
            EAppFacade.getInstance().removeCommand(game.GameCmd.onResume,this.onResume,this)
            super.clean()
        }


    }
}