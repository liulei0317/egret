class ZhanJiUI extends game.EComponent {
    private list: EScroller;
    private combatDataList: game.CombatData[];
    public fromClub: boolean = false;
    public constructor() {
        super();
        this.skinName = "resource/skins/hall/zhanji/zhanJiUISkin.exml";
    }

    public onCreateViewComplete(): void {
        super.onCreateViewComplete();
        this.initScroller();

        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_ZHANJI_LIST), this.getCombatListBack, this);
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_ZHANJI_LIST), this.getCombatListBack, this);
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_Combat_REPLAY_data), this.getCombatReplayDataCallback, this)
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.MODIFY_HAS_VIEW_STATUS, this.modifyHasViewData, this)

    }


    private getCombatReplayDataCallback(event: egret.Event) {
        game.CommonView.hideWaiting()
        var msgDomain: game.MsgDomain = event.data;
        if (msgDomain.code == game.CmdResultType.SUCCESS) {
            var data = msgDomain.data;
            //显示大结算界面
            GlobalData.gameData.setAllOverData(data)
            game.DialogManager.getInstance().showPopBox(Constants.UI_PANEL_DATA_SET.gameOverBox.index, { isFromReplay: true })
        }
    }

    public getCombatList() {
        game.ZhanjiService.getInstance().getCombatList();
    }

    public getCombatList_Club(clubId) {
        game.ZhanjiService.getInstance().getCombatList_Club(clubId);
    }
    private getCombatListBack(event: egret.Event) {
        var msgDomain: game.MsgDomain = event.data;
        if (msgDomain.code == game.CmdResultType.SUCCESS) {
            this.combatDataList = [];
            var jsonData = msgDomain.data;
            for (var key in jsonData) {
                var itemData = jsonData[key];
                var combatData = new game.CombatData();
                combatData.parse(itemData);
                this.combatDataList.push(combatData);
            }
            this.updateUI();
            game.EAppFacade.getInstance().sendNotification(game.GameCmd.ZHANJI_HAS, this.combatDataList.length > 0);
        }

    }
    private modifyHasViewData(event: egret.Event) {
        let data = event.data;
        if (data.roomId == null || this.combatDataList == null || this.combatDataList.length == 0)
            return
        for (let i = 0; i < this.combatDataList.length; i++) {
            let element = this.combatDataList[i]
            if (element.roomId == data.roomId) {
                if (data.hasAllView != null) {
                    element.hasView = data.hasAllView
                }
                else {
                    element.hasView = true
                }
                break;
            }
        }
        this.updateUI()
    }
    private initScroller() {
        this.list.setElementViewInfo(152, 8);
        this.list.setElementCreateFunction(this.createElement.bind(this));
        this.list.setElementUpdateDataFun(this.updateElement.bind(this));
        this.list.setElementUpdateUIFun(this.updateElementUI.bind(this));
    }

    private createElement(data) {

        var item = new game.CombatItem(data, this.fromClub);
        return item;
    }

    private updateElement(item: game.CombatItem, data: any) {
        item.setData(data, this.fromClub);
    }

    private updateElementUI(item: game.CombatItem) {
        item.updateUI();
    }

    protected updateUI_() {
        this.list.clearContent();
        this.list.setScrollerContent(this.combatDataList);
    }

    public clean() {
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_ZHANJI_LIST), this.getCombatListBack, this);
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_ZHANJI_LIST), this.getCombatListBack, this);
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_Combat_REPLAY_data), this.getCombatReplayDataCallback, this)
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.MODIFY_HAS_VIEW_STATUS, this.modifyHasViewData, this)

        super.clean();
    }
}
window["ZhanJiUI"] = ZhanJiUI