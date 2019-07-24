module Constants {

    export var server_url_tang: string = "192.168.1.125";
    export var server_url_test: string = "47.98.237.192";
    export var server_url_online_test: string = "mina-nj.njchunuo.com";
    export var server_url_online: string = "nanjings.qixiyx.cn";
    export var server_url_current: string = Constants.server_url_online;


    export var BASE_PATH = "resource/"
    export var BASE_SKIN_PATH = BASE_PATH + "skins/"
    export var UI_GAME_CSB_PATH = BASE_SKIN_PATH + "game/"

    export var DEFAULT_HEAD_IMG_URL = "http://res.qixiyx.cn/admin/common/icon_132.png";

    export var EVENT_STAGE_VIEW_SIZE_CHANGED = "EVENT_STAGE_VIEW_SIZE_CHANGED"

    export var GENDER =
        {
            man: 1,
            female: 2
        }


    export var ROOM_TYPE =
        {
            jinYuanZi: 0,//进园子
            changKaiTou: 1 // 敞开头
        }

    export var ROOM_PAY_MODE =
        {
            creator: 1,//房主付费
            AA: 0,//AA付费
            other: 2 // 代开
        }


    export var ROOM_TIME_MODE =
        {
            ba: 0,//把
            quan: 1//圈
        }

    export var GAME_ID_SET =
        {
            nanjing: 1,
            jiangdu: 2,
            lianshui: 5,
            xinghua: 6
        }

    export var MINI_GAME_ID_SET =
        {
            mahjong: GAME_ID_SET.nanjing,
            fightThree: 101,
            zhuandan: 102,
            biji: 103,
        }

    export var Item_Type = {
        NULL: 0,
        DIAMOND: 1,          //钻石
        GOLD: 2,             //金币
        RMB: 3,              //红包
    }

    export var GOAL_TYPE = {
        NULL: 0,
        EVERY_DAY: 1,        //每日任务
        GROW_UP: 2,          //成长任务
    }



    export var SCENE_INDEX =
        {
            LOGIN: 1,
            MAIN: 2,
            GAME: 3,
            HOT_UPDATE: 4,
            ZDGAME: 5,
            HOT_UPDATE_MINI_GAME: 6,
            FIGHT_THREE: 7,
            CLUB: 8,
            BIJI: 9,
            WORLDCUP: 10,
            Shop: 11,
        }

    export var UI_PANEL_DATA_SET =
        {
            about: {
                index: "1",
                filePath: "aboutBox.csb"
            },
            create_room: {
                index: "2",
                filePath: "createRoomBox.csb"
            },
            join_room: {
                index: "3",
                filePath: "joinRoom.csb"
            },
            common_confirm_box: {
                index: "4",
                filePath: "confirmBox.csb"
            },
            email: {
                index: "5",
                filePath: "emailBox.csb"
            },
            personInfo: {
                index: "6",
                filePath: "personInfo.csb"
            },
            applyQuit: {
                index: "7",
                filePath: "applyQuitRoom.csb"
            },
            setting: {
                index: "8",
                filePath: "SetBox.csb"
            },
            wechatShare:
            {
                index: "9",
                filePath: "weiChatShareBox.csb"
            },
            rulesBox:
            {
                index: "10",
                filePath: "RulesBox.csb"
            },
            roomInfoBox:
            {
                index: "11",
                filePath: "RoomInfoBox.csb"
            },
            chatBox:
            {
                index: "12",
                filePath: "chat/chatUI.csb"
            },
            sendVoice:
            {
                index: "13",
                filePath: "voice/sendVoice.csb"
            },
            GameSettle_auto1:
            {
                index: "14",
                filePath: "gameScene/GameSettle_auto1.csb"
            },
            GameSettle_auto2:
            {
                index: "15",
                filePath: "gameScene/GameSettle_auto2.csb"
            },
            GameSettle_auto3:
            {
                index: "16",
                filePath: "gameScene/GameSettle_auto3.csb"
            },
            guide:
            {
                index: "17",
                filePath: "GuideView.csb"
            },
            proxyBox:
            {
                index: "18",
                filePath: "proxyBox.csb"
            },
            shop:
            {
                index: "19",
                filePath: "shop.csb"
            },
            updateGame:
            {
                index: "20",
                filePath: "updateGameBox.csb"
            },
            advert:
            {
                index: "21",
                filePath: "advertBox.csb"
            },
            daikaiRecords:
            {
                index: "22",
                filePath: "daikaiRecords.csb"
            },
            daikaiMsgBox:
            {
                index: "23",
                filePath: "daikaiNotify.csb"
            },
            zhanjiBox:
            {
                index: "24",
                filePath: "gameRecords.csb"
            },
            storePopBox:
            {
                index: "25",
                filePath: "storePopBox.csb"
            },
            personInfoOther:
            {
                index: "26",
                filePath: "personalInfoOther.csb"
            },
            preventCheat:
            {
                index: "27",
                filePath: "preventCheat.csb"
            },
            checkCheat:
            {
                index: "28",
                filePath: "checkCheatBox.csb"
            },
            gameActivity:
            {
                index: "29",
                filePath: "gameActivity.csb"
            },
            shareActivity: {
                index: "30",
                filePath: "ShareActivity.csb"
            },
            shareActivityIntro: {
                index: "31",
                filePath: "shareActivityIntro.csb"
            },
            changePlayerNumBox:
            {
                index: "32",
                filePath: "changePlayerNum.csb"
            },
            preventCheatStatusBox: {
                index: "33",
                filePath: "PreventCheatStatusBox.csb"
            },
            taskBox: {
                index: "34",
                filePath: "taskBox.csb"
            },
            todayRecords:
            {
                index: "35",
                filePath: "todayRecords.csb"
            },
            GameScoreBoard:
            {
                index: "36",
                filePath: "gameScene/gameScoreBoard.csb"
            },

            InviteBoxRedPacket:
            {
                index: "37",
                filePath: "InviteBoxRedPacket.csb"
            },
            TaskBoxRedPacket:
            {
                index: "38",
                filePath: "TaskBoxRedPacket.csb"
            },
            RedPacketBox:
            {
                index: "39",
                filePath: "RedPacketBox.csb"
            },
            turntableBox:
            {
                index: "40",
                filePath: "turntableBox.csb"
            },
            TurntableRecordBox:
            {
                index: "41",
                filePath: "TurntableRecord.csb"
            },
            TurntableNormalResultBox:
            {
                index: "42",
                filePath: "TurnTableNormalResult.csb"
            },
            TurntablePacket:
            {
                index: "43",
                filePath: "TurntablePacket.csb"
            },
            confirmShareRedPacketBox:
            {
                index: "44",
                filePath: "confirmShareRedPacketBox.csb"
            },
            downloadMiniGameView: {
                index: "45",
                filePath: "DownloadMiniGameView.csb"
            },
            LoginDeclare:
            {
                index: "46",
                filePath: "LoginDeclare.csb"
            },
            LoginDeclareSpe:
            {
                index: "47",
                filePath: "LoginDeclareSpe.csb"
            },
            createRoomDeclare:
            {
                index: "48",
                filePath: "CreateRoomDeclareView.csb"
            },
            clubCreateView: {
                index: "49",
                filePath: "club/clubCreateView.csb"
            },
            clubJoinView: {
                index: "50",
                filePath: "club/clubJoinView.csb"
            },
            clubCommonPopView: {
                index: "51",
                filePath: "club/clubCommonPopView.csb"
            },
            clubNoticePop: {
                index: "52",
                filePath: "club/clubNoticePop.csb"
            },
            clubRecordDetails: {
                index: "53",
                filePath: "club/clubRecordDetails.csb"
            },
            clubMemberHistories: {
                index: "54",
                filePath: "club/clubMemberHistories.csb"
            },
            clubCommonPopView2: {
                index: "55",
                filePath: "club/clubCommonPopView2.csb"
            },
            shopBindProxyBox:
            {
                index: "56",
                filePath: "ShopBindProxyBox.csb"
            },
            clubMgrDissRoomView:
            {
                index: "57",
                filePath: "club/clubMgrDissRoomView.csb"
            },
            clubCheckOthersReplayView:
            {
                index: "58",
                filePath: "club/clubCheckOthersReplayView.csb"
            },
            goBackGameView:
            {
                index: "59",
                filePath: "GoBackGameConfirm.csb"
            },
            gameSetting:
            {
                index: "60",
                filePath: "GameSettingBox.csb"
            },
            discardWinConfirmBox:
            {
                index: "61",
                filePath: "AbandomWinConfirm.csb"
            },
            gameOverBox:
            {
                index: "62",
                filePath: "AbandomWinConfirm.csb"
            },
            shareOverBox:
            {
                index: "63"
            },
            bindPhoneBox:
            {
                index: "64"
            },
            BindIdentityBox:
            {
                index: "65"
            }
        }
}