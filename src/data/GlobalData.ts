module GlobalData {
    export var gameData: game.GameData = new game.GameData();
    export var userData: game.UserInfo = new game.UserInfo();

    export var platformRoomNumber: number = 0;//应用外获取到的房间号
    export var isReconnecting = false;//是否正在断线重连
    export var firstInGame = false;//首次进游戏
    export var onlightFlag = false;//屏幕常亮标记

    export var curGameID = Constants.GAME_ID_SET.nanjing;

    export var deltaX = 0;
    export var deltaY = 0;

    export var msgQueue = [];
    export var clientConfigs =
        {
            customer_info: "qhuaimj",//客服联系方式
            weixin_mp_name: "情怀南京麻将",//微信公众号名称
            investment_info: "qhuaimj",//招商联系方式信息
            functionInfos: null,
            red_bag_customer_info: "qhuaimj",//红包领取客服
            red_bag_appeal_info: "qhuaimj",//红包问题申诉联系人
            worldcup: "1",//世界杯活动
            showCreateRoom: "1",//关闭创建房间
            showClubRoom: "0",//关闭俱乐部
            combatUrlNew: "",//地址
            sharedUrl: "",
            sharedJoinRoomUrl: ""
        }


    export function initClientConfigInfo(data) {
        if (data == null) {
            return
        }
        for (var i = 0; i < data.length; i++) {
            var key = data[i].infoKey
            var value = data[i].infoValue
            GlobalData.clientConfigs[key] = value
        }
    }

    export function setReconnecting(value) {
        GlobalData.isReconnecting = value
        // commonView.stopWaiting()
        // if (!value)
        // {
        //     SocketManager:startHeartAttack()
        // }
    }

    export function getCurGameData() {
        return GlobalData.gameData
    }

    export function getMiniGameName(gameId) {
        var gameName = "麻将"
        if (gameId == Constants.MINI_GAME_ID_SET.biji)
            gameName = "比鸡"
        else if (gameId == Constants.MINI_GAME_ID_SET.zhuandan)
            gameName = "转蛋"
        else if (gameId == Constants.MINI_GAME_ID_SET.fightThree)
            gameName = "拼三张"
        return gameName
    }
    export function getSettleInfoUrl(roomId) {
        if (typeof (roomId) == "undefined" ||
            typeof (GlobalData.clientConfigs.combatUrlNew) == "undefined" ||
            roomId == null ||
            GlobalData.clientConfigs.combatUrlNew == null) {
            return ""
        }
        return Utils.format("{0}{1}.html?roomId={2}", GlobalData.clientConfigs.combatUrlNew, roomId, roomId)
    }
    export function getShareUrlWithShareCode(): string {
        let shareUrl = ""
        let found = GlobalData.clientConfigs.sharedUrl.indexOf("?")
        if (found != -1) {
            // shareUrl = string.format(http.sharedUrl.."&inviteCode=%s", GlobalData.UserData:getUserId())
            shareUrl = Utils.format("{0}&inviteCode={1}", GlobalData.clientConfigs.sharedUrl, GlobalData.userData.getUserId())
        }
        else {
            shareUrl = Utils.format("{0}?inviteCode={1}", GlobalData.clientConfigs.sharedUrl, GlobalData.userData.getUserId())
        }
        return shareUrl
    }
    export function getShareJoinRoomUrlWithShareCode(roomNum): string {
        let shareUrl = ""
        let found = GlobalData.clientConfigs.sharedUrl.indexOf("?")
        if (found != -1) {
            // shareUrl = string.format(http.sharedUrl.."&inviteCode=%s", GlobalData.UserData:getUserId())
            shareUrl = Utils.format("{0}&id={1}&inviteCode={2}", GlobalData.clientConfigs.sharedJoinRoomUrl, roomNum, GlobalData.userData.getUserId())
        }
        else {
            shareUrl = Utils.format("{0}?id={1}&inviteCode={2}", GlobalData.clientConfigs.sharedJoinRoomUrl, roomNum, GlobalData.userData.getUserId())
        }
        return shareUrl
    }
    export function getInviteToClubUrlWithShareCode(clubId): string {
        let shareUrl = Utils.format("{0}?clubId={1}", game.GameHttpConst.inviteToClubURL, clubId)
        return shareUrl

    }
}