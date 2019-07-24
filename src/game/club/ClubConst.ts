module ClubConst {
    export var MemberType =
        {
            MONITOR: 0,    //会长
            ADMIN: 1,      //管理员
            MEMBER: 2,      //普通成员
            MONITOR2: 3      //副会长
        };

    export var PermissionType =
        {
            Key_roomRules: "roomRules",      //房间规则设置
            Key_memberManager: "memberManage",   //成员管理
            Key_editNotice: "editNotice",    //编辑公告
            Key_cancelRoom: "cancelRoom",    //解散房间
            Key_divideManage: "divideManage",    //隔离组管理
            key_record: "calManage",  //结算管理
            Key_blessManage: "blessManage",  //福分管理
            Key_operLog: "operLog",  //操作日志  
            Key_oppartber: "oppartber", //合伙组
        };
    export var PermissionTypes = [
        PermissionType.Key_roomRules,
        PermissionType.Key_memberManager,
        PermissionType.Key_editNotice,
        PermissionType.Key_cancelRoom,
        PermissionType.Key_divideManage,
        PermissionType.key_record,
        PermissionType.Key_blessManage,
        PermissionType.Key_operLog,
        PermissionType.Key_oppartber
    ];
    export var MemberCheckStatus =
        {
            UNCHECK: 0,    //未审核
            PASSED: 1,     //通过审核
            UNPASS: 2,      //未通过审核
            THROW: 3      //剔除/退出
        };
    export var RightType =
        {
            EditNotice: 1,        //编辑公告
            CreateRoom: 2,        //创建房间
            MemberSetting: 3,    //成员设置
            SetMonitor2: 4,     //设为副会长
            SetManager: 5,      //设为管理员
            KickMember: 6,      //剔除玩家

        };
}