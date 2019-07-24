class ClubMembersUI extends game.EComponent {
    private scrollerTables: EScroller;
    private labelTotalNumTitle: eui.Label;
    private clubMemberDataList: game.ClubMemberData[];
    private clubMemberDataListAll: game.ClubMemberData[];

    private clubData: game.ClubData;
    public constructor() {
        super();
        this.skinName = "resource/skins/club/member/clubMembersUISkin.exml";
    }

    public onCreateViewComplete(): void {
        super.onCreateViewComplete();

        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_MEMBERLIST), this.getClubMemberListBack, this);
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.CLICK_CLUB_Members, this.getClubMemberList, this);
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_REMOVEMEMBER), this.kickMemberCallback, this);

        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_SET_MEMBER), this.operCallback, this);
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_forbid_game), this.operCallback, this);
        game.EAppFacade.getInstance().registerCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_setWatcher), this.operSetWatcherCallback, this);

        this.initScroller();


    }

    protected updateUI_() {
        if (this.clubData) {
            var hasDefaultPermission = game.ClubService.getInstance().checkDefaultRight(this.clubData.permissions);
            this.labelTotalNumTitle.visible = hasDefaultPermission;
            // this.scrollerTables.clearContent();
            this.scrollerTables.setScrollerContent(this.clubMemberDataList);
        }
    }

    private initScroller() {
        this.scrollerTables.setElementViewInfo(104, 8);
        this.scrollerTables.setElementCreateFunction(this.createElement.bind(this));
        this.scrollerTables.setElementUpdateDataFun(this.updateElement.bind(this));
        this.scrollerTables.setElementUpdateUIFun(this.updateElementUI.bind(this));
    }


    private createElement(data) {

        var item = new game.ClubMemberItem(this.clubData, data);
        return item;
    }

    private updateElement(item: game.ClubMemberItem, data: any) {
        item.setData(this.clubData, data);
    }

    private updateElementUI(item: game.ClubMemberItem) {
        item.updateUI();
    }

    private getClubMemberList(event: egret.Event) {
        if (event.data != null) {
            var data = event.data;
            this.clubData = data.clubData;
            var patternType = data.patternType;
            var patternContent = data.patternContent;
            game.ClubService.getInstance().getClubMemberList(this.clubData.clubId, patternType, patternContent);
        }
    }

    private getClubMemberListBack(event: egret.Event) {
        var msgDomain: game.MsgDomain = event.data;
        if (msgDomain.code == game.CmdResultType.SUCCESS) {
            this.clubMemberDataList = [];
            this.clubMemberDataListAll = [];
            var jsonData = msgDomain.data;
            var clubMemberList = jsonData.clubMemberList;
            for (var key in clubMemberList) {
                var itemData = clubMemberList[key];
                var clubMemberData = new game.ClubMemberData();
                clubMemberData.parse(itemData);
                this.clubMemberDataList.push(clubMemberData);
                this.clubMemberDataListAll.push(clubMemberData);
            }
            this.updateUI();
        }
    }

    private operCallback(event: egret.Event) {
        var msgDomain: game.MsgDomain = event.data;
        if (msgDomain.code == game.CmdResultType.SUCCESS) {
            var clubMemberData: game.ClubMemberData = msgDomain.data;
            this.updateMemberData(clubMemberData);
            this.updateUI();
        }
    }
    private kickMemberCallback(event: egret.Event) {
        let msgDomain: game.MsgDomain = event.data;
        if (msgDomain.code == game.CmdResultType.SUCCESS) {
            for (let key in this.clubMemberDataListAll) {
                if (this.clubMemberDataListAll[key].memberId == msgDomain.data.memberId) {
                    this.clubMemberDataListAll.splice(Number(key), 1)
                    break;
                }
            }
            for (let key in this.clubMemberDataList) {
                if (this.clubMemberDataList[key].memberId == msgDomain.data.memberId) {
                    this.clubMemberDataList.splice(Number(key), 1)
                    break;
                }
            }
            this.scrollerTables.updateUI()
        }
    }
    private operSetWatcherCallback(event: egret.Event) {
        this.clearWatcherStatus();
        this.operCallback(event);
    }

    private updateMemberData(clubMemberData: game.ClubMemberData): boolean {
        var len = 0;
        if (this.clubMemberDataList != null) {
            len = this.clubMemberDataList.length;
        }
        for (var i = 0; i < len; i++) {
            if (this.clubMemberDataList[i].memberId == clubMemberData.memberId) {
                this.clubMemberDataList[i] = clubMemberData;
                return true;
            }
        }
        return false;
    }

    private clearWatcherStatus() {
        var len = 0;
        if (this.clubMemberDataList != null) {
            len = this.clubMemberDataList.length;
        }
        for (var i = 0; i < len; i++) {
            this.clubMemberDataList[i].watcher = false;
        }
    }

    public filterMember(key: string) {
        var clubMemberDataList = [];
        var len = this.clubMemberDataListAll.length;
        for (var i = 0; i < len; i++) {
            var memberData: game.ClubMemberData = this.clubMemberDataListAll[i];
            if ((memberData.memberId + "").indexOf(key) >= 0 || memberData.memberName.indexOf(key) >= 0) {
                clubMemberDataList.push(memberData);
            }
        }
        if (clubMemberDataList.length == 0) {
            game.CommonView.showToast("未找到对应的玩家");
        } else {
            this.clubMemberDataList = clubMemberDataList;
            this.updateUI();
        }

    }

    public clean() {
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_REMOVEMEMBER), this.kickMemberCallback, this);
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_MEMBERLIST), this.getClubMemberListBack, this);
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.CLICK_CLUB_Members, this.getClubMemberList, this);
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_SET_MEMBER), this.operCallback, this);
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_forbid_game), this.operCallback, this);
        game.EAppFacade.getInstance().removeCommand(game.GameCmd.getCmdFromNet(game.MsgConstant.CMD_CLUB_setWatcher), this.operCallback, this);
        super.clean();
    }

}
window["ClubMembersUI"] = ClubMembersUI