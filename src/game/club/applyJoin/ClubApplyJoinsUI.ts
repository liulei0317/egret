class ClubApplyJoinsUI extends game.EComponent {
    private scrollerTables: EScroller;
    private clubMemberDataList: game.ClubApplyJoinData[];

    private clubData: game.ClubData;
    public constructor() {
        super();
        this.skinName = "resource/skins/club/applyJoin/clubApplyJoinsUISkin.exml";
    }

    public onCreateViewComplete(): void {
        super.onCreateViewComplete();

        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_WAITCHECK_MEMBERLIST), this.getClubApplyJoinsBack, this);
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.CLICK_CLUB_ApplyJoins, this.getClubApplyJoins, this);
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_MEMBER_CHECK), this.checkMemberStatus, this);
        this.initScroller();


    }

    protected updateUI_() {
        this.scrollerTables.clearContent();
        this.scrollerTables.setScrollerContent(this.clubMemberDataList);
    }

    private initScroller() {
        this.scrollerTables.setElementViewInfo(148, 8);
        this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
        this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
        this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
    }


    private createElement(data) {

        var item = new game.ClubApplyJoinItem(this.clubData, data);
        return item;
    }

    private updateElement(item: game.ClubApplyJoinItem, data: any) {
        item.setData(this.clubData, data);
    }

    private updateElementUI(item: game.ClubApplyJoinItem) {
        item.updateUI();
    }

    private getClubApplyJoins(event: egret.Event) {
        if (event.data != null) {
            this.clubData = event.data;
            game.ClubService.getInstance().getClubApplyJoins(event.data.clubId);
        }
    }

    private getClubApplyJoinsBack(event: egret.Event) {
        var msgDomain: game.MsgDomain = event.data;
        if (msgDomain.code == game.CmdResultType.SUCCESS) {
            this.clubMemberDataList = [];
            var jsonData = msgDomain.data;
            var applyJoinList = jsonData.clubMembers;
            for (var key in applyJoinList) {
                var itemData = applyJoinList[key];
                var clubApplyJoinData = new game.ClubApplyJoinData();
                clubApplyJoinData.parse(itemData);
                this.clubMemberDataList.push(clubApplyJoinData);
            }
            game.EAppFacade.getInstance().sendNotification(game.GameCmd.CLICK_CLUB_UpdateRedTip, { isShow: this.clubMemberDataList.length > 0 });
            this.updateUI();
        }
    }

    private checkMemberStatus(event: egret.Event) {
        var msgDomain: game.MsgDomain = event.data;
        if (msgDomain.code == game.CmdResultType.SUCCESS) {
            let id = this.clubData.clubId
            game.ClubService.getInstance().getClubApplyJoins(id);
            game.CommonView.showToast("处理申请操作成功")
        }
    }

    public clean() {
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_WAITCHECK_MEMBERLIST), this.getClubApplyJoinsBack, this);
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.CLICK_CLUB_ApplyJoins, this.getClubApplyJoins, this);
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_MEMBER_CHECK), this.checkMemberStatus, this);
        super.clean();
    }
}
window["ClubApplyJoinsUI"] = ClubApplyJoinsUI