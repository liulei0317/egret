module LocalStorage {
    export var update:
        {
            lastHotUpdateAppVersion: "lastHotUpdateAppVersion"
        }

    export var createRoomSet =
        {
            RoomType: "RoomType",          //进园子，敞开头
            Score: "Score",                //结算分数
            PayMode: "PayMode",            //AA付费，房主付费
            DaiKai: "DaiKai",              //代开房间
            turnMode: "turnMode",      //按把计算， 按圈计算
            timeModeIndex: "timeModeIndex",                //把圈次数索引
            HuaZa2: "HuaZa2",              //花砸2
            DNXBFaFen: "DNXBFaFen",        //东南西北罚分
            JieZhuangBi: "JieZhuangBi",    //接庄比
            JieSuanLimit: "JieSuanLimit",   //结算上限
            countIndex: "countIndex",//计数索引
            autoDiscard: "autoDiscard",//超时自动打牌
            baoMi: "baomi",//保米
        }

    export var createRoomSetZhuanDan =
        {
            PayMode: "PayModeZD",            //AA付费，房主付费
            timeModeIndex: "zdTimeModeIndex",                //把圈次数索引
        }
    export var createRoomSetFightThree =
        {
            PayMode: "PayModeFT",                          //付费模式：AA,房主
            timeModeIndex: "timeModeIndexFT",              //把圈次数索引
            round: "round_FT",                             //轮数
            pot: "pot_FT",                                 //底分
            stuffyNum: "stuffyNum_FT",                     //必闷圈数
            playType: "playType_FT",                       //玩法模式 0.去掉2-5牌玩法 ;1.散牌235大于AAA ;2.散牌235大于豹子
            isShowPoker: "isShowPoker_FT"                  //结算是否显示手牌
        }

    export var createRoomSetBJ =
        {
            PayMode: "PayModeBJ",                          //付费模式：AA,房主
            timeModeIndex: "timeModeIndexBJ",              //把圈次数索引
            hasTwoWang: "hasTwoWang",
            canThrowTile: "canThrowTile",
            hasPierSort: "hasPierSort",
            hasFirstShunQing: "hasFirstShunQing",
            hasSanQing: "hasSanQing",
            multiple: "multiple"
        }


    export var setting =
        {
            GameDoubleClickType: "GameDoubleClickType",  //双击出牌
            GameMusicOn: "GameMusicOn",              //背景音乐
            GameEffectOn: "GameEffectOn",             //音效
            Card_back_index: "Card_back_index",//牌背
            Card_face_index: "Card_face_index",//牌面
            View_mode: "View_mode",//视图模式
            Game_bg_index: "Game_bg_index",//游戏背景
            forbid_emotion: "forbid_emotion",//禁止道具
            forbid_voice: "forbid_voice",//禁止语音
            Flower_card_Visible: "Flower_card_Visible",//隐藏花牌
            Game_bg_frame: "Game_bg_frame",//显示桌面框
            Sound_type : "Sound_type",//声音类型
        }

    export var account =
        {
            wxId: "wxUid",
            deviceId: "deviceUId",
            lastLoginId: "lastLoginId",
            lastLoginWxTime: "lastLoginWxTime",
            lastLoginVersion: "lastLoginVersionNumber",
            sexy: "gender",
            declare_login: "declare_login",
            declare_create_room: "declare_create_room",
            lastGameId: "lastGameId",
            sortByValue_BJ: "sortByValue_BJ"
        }
}