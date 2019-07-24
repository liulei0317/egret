module game {
	export class MsgConstant {
		public static HALL = 0;
		public static GAME = 1;

		public static VERSION_ID: number = 2;
		public static VERSION_NAME: string = "2.0";

		public static ERROR_need_relogin = 99999;                 //需要重新登陆
		public static ERROR_illegal_operation = 99998;            //非法操作
		public static ERROR_forbid_login = 99997;             //已封号，禁止登陆
		public static ERROR_creamRoom_inRoom = 10001;             //已经在房间里
		public static ERROR_diamondNoEnough = 10002;    //钻石不够
		public static ERROR_creamRoom_paramError = 10003;         //创建房间参数错误
		public static ERROR_room_over = 10004;                    //房间已结束
		public static ERROR_joinRoom_roomId_error = 10005;         //房间号不存在
		public static ERROR_join_inOtherRoom = 10006;             //加入房间时，已经在其他房间里了
		public static ERROR_join_ROOM_USERMAX = 10007;             //加入房间时，已经在其他房间里了

		public static ERROR_cancelDaiKai_gaming = 10008;             //游戏已经开始了
		public static ERROR_hasNot_roomNumber = 10009;    //未获取到房间号
		public static ERROR_unionId_null = 10010;    //unionId为空
		public static ERROR_daiKai_maxLimit = 10011;    //代开上限
		public static ERROR_Lack_userInfo = 10012;    //缺少用户信息
		public static ERROR_game_no_open = 10013;     // 游戏未开启

		public static ERROR_replaycode_no_exist = 10014;     //回放码不存在

		public static ERROR_DataFormatIllegal = 10020;    // 数据不合法
		public static ERROR_SaveEmailFail = 10021;    // 保存邮件失败

		public static ERROR_playerNum3_low_version = 10101;  //三人麻将申请，有人版本号太低
		public static ERROR_playerNum3_repeatApply = 10102;  //重复申请3人房

		public static ERROR_Gold_not_enough = 10201;  //金币不足
		public static ERROR_creamRoom_inRoom_new = 10211;             //已经在房间里

		public static ERROR_content_already_end = 10301;  // 活动已经结束

		public static ERROR_redBag_valid_invite_not_enouth = 10401;  // 有效邀请用户不足
		public static ERROR_redBag_valid_jus_not_enouth = 10402;  // 有效局数不足

		public static ERROR_club_hasPassed_member = 10501;  // 俱乐部成员已加入
		public static ERROR_club_hasUnCheck_member = 10502;  // 俱乐部成员未审核
		public static ERROR_club_memberTypeCanNotOperate = 10503;  // 俱乐部成员类别不能操作
		public static ERROR_club_canNotRemoveSelf = 10504;  // 俱乐部管理员不能剔除自己
		public static ERROR_club_monitorCanNotQuit = 10505;  // 俱乐部会长不能退出俱乐部
		public static ERROR_club_userIsNotInClub = 10506;  // 当前玩家未加入俱乐部
		public static ERROR_club_MemberHasChecked = 10507;  // 当前玩家申请加入俱乐部已审核
		public static ERROR_club_UserIdIsNotDaiLi = 10508;  // 当前玩家非代理
		public static ERROR_club_IsNotFund = 10509;  // 俱乐部id不存在
		public static ERROR_club_userIsNotFund = 10510;  // 这个用户不是游戏用户
		public static ERROR_club_roomMax = 10511;  // 俱乐部房间达到上限
		public static ERROR_club_template_exist = 10512;  // 模板已存在
		public static ERROR_club_black_list = 10513;  // 俱乐部黑名单成员
		public static ERROR_admin_not_black = 10514;  //管理员以上级别不能被禁止游戏
		public static ERROR_club_merge = 10515;  //俱乐部合并失败
		public static ERROR_watcher_not_normal = 10516;  //值班人不能是普通成员
		public static ERROR_template_top_limit = 10517;  //模板数量达到上限

		public static ERROR_invite_bind_no_proxy = 10601;  // 不是代理
		public static ERROR_invite_bind_has_proxy = 10602;  // 已经绑定过了

		public static ERROR_need_refresh_board = 10701;  // 需要刷新牌局


		public static ERROR_combat_data_invalid = 10801;  // 大结算数据失效

		public static ERROR_creamRoom_startscore_error = 10901;     // 南京创建房间初始分数不对
		public static ERROR_creamRoom_ckt_maxScore_error = 10902;     // 南京创建房间单把上限分数不对

		public static ERROR_redPacket_hasDraw = 11001;     // 红包已被领取
		//俱乐部隔离组
		public static ERROR_club_divide_memberExist = 11101;     // 成员已存在
		public static ERROR_club_divide_memberNoExist = 11102;     // 成员不存在
		//    public static final int ERROR_club_divide_name_tolong = 11103;     // 隔离组名称太长


		public static ERROR_bless_not_enough = 11010;  // 福分不足
		public static ERROR_gold_not_enough = 11011;  //  会长金币不足
		public static ERROR_bless_score_limit = 11012;  //  最低福分限制
		public static ERROR_club_bless_isnot_member = 11013;  //不是当前俱乐部成员

		//短信相关
		public static ERROR_sms_send_time_too_short = 11201;     // 发送短信间隔太短
		public static ERROR_sms_code_expired = 11202;     // 发送短信间隔太短
		public static ERROR_sms_code_wrong = 11203;     // 验证码错误
		public static ERROR_sms_phoneNumber_hasBind = 11204;     // 手机号已绑定其他账号
		public static ERROR_sms_phoneNumber_unBind = 11205;     // 手机号未绑定账号
		//后台错误码
		public static ERROR_params_illegal_error = 20000;  //非法参数
		public static ERROR_wheel_not_modify = 20001;  // 已完成的转盘信息不可修改
		public static ERROR_wheel_only_rate = 20002;  // 进行中的转盘只能修改概率
		public static ERROR_room_not_gameing = 20003;  // 该房间未开始游戏，暂不需要解散

		public static ERROR_user_realUser_name_error = 20101;  //名称错误
		public static ERROR_user_realUser_idCardNo_error = 20102;  //身份证ID错误
		public static ERROR_belss_has_zero_del = 20200;  //体力值为零才能删除
		public static ERROR_belss_has_zero_set = 20201;  //体力值为零设置归属
		public static ERROR_not_set_group_manager = 20202;  //当前模式下不允许设置管理员
		public static ERROR_not_modify_self_bless = 20203;  //你不可以修改自己的体力
		public static ERROR_manager_not_by_set = 20204;     //管理员不能被设置归属
		public static ERROR_manager_power_no_enough = 20205; //管理员自身体力值不够

		//大厅信息
		public static CMD_CREATE_ROOM = 101;          //创建房间
		public static CMD_JOIN_ROOM = 102;          //加入房间
		public static CMD_LEAVE_ROOM = 103;         //离开房间
		public static CMD_CANCEL_ROOM = 104;         //解散房间
		public static CMD_DISMISS_ROOM = 105;         //提前解散房间（协商解散）
		public static CMD_REJECT_DISMISS_ROOM = 106;         //拒绝解散房间
		public static CMD_SYSTEM_DISMISS_ROOM = 107;         //系统解散房间
		public static CMD_CANCEL_DAIKAI_ROOM = 108;         //解散代开房间
		public static CMD_CANCEL_TIMEOUT_ROOM = 109;         //解散超时房间
		public static CMD_CLICK_CREATE_ROOM = 110;         //点击创建房间
		public static CMD_CANCEL_DAIKAI_ROOM_BACK = 131;           //解散代开房间返回
		public static CMD_CHEAT = 132;           //玩家作弊
		public static CMD_IGNORE_CHEAT = 133;           //玩家忽略作弊
		public static CMD_CHEAT_LEAVE = 134;           //作弊提示时，离开房间
		public static CMD_SYNC_POSITION = 135;           //同步位置详情
		public static CMD_CLIENT_QUERY_ROOMNUMBER = 136;           //客户端查询房间号

		public static CMD_switch_player_num = 151;           //切换玩家数
		public static CMD_switch_reject = 152;           //拒绝切换玩家数
		public static CMD_switch_cancel = 153;           //取消切换玩家数

		public static CMD_getCanUseNumber = 160;           //得到可用的房间号

		public static CMD_OTHER_JOIN_ROOM = 112;          //其他玩家加入房间
		public static CMD_OTHER_LEAVE_ROOM = 113;          //其他玩家离开房间

		//用户信息
		public static CMD_USER_LOGIN = 201;         //用户登陆
		public static CMD_USER_InviteCode = 202;         //用户邀请码
		public static CMD_USER_Change_Status = 203;         //改变用户状态，封号或解封
		public static CMD_USER_GETBINDSMSCODE = 220;         //获取绑定验证码
		public static CMD_USER_getLoginSmsCode = 221;         //获取登陆验证码
		public static CMD_USER_BINDPHONENUMBER = 222;         //绑定手机号
		public static CMD_USER_phoneNumber_login = 223;          //手机号登陆

		public static CMD_USER_BINDIDENTITY = 230;         //绑定身份证


		//邮件信息
		public static CMD_EMAIL_LIST = 401;         //获取邮件列表
		public static CMD_SEND_EMAIL = 402;         //发送邮件
		public static CMD_SAVE_EMAIL = 403;         //保存存邮件
		public static CMD_VIEW_EMAIL = 404;         //查看邮件
		public static CMD_DRAW_EMAIL_ATTACH = 405;         //领取邮件附件
		public static CMD_EMAIL_TIP = 406;          // 新邮件或还有未操作邮件提示



		//聊天
		public static CMD_SEND_MSG = 501;         //发送语音
		public static CMD_SEND_CHAT = 502;         //发送闲话
		public static CMD_SEND_FACE = 503;         //发送表情
		public static CMD_SEND_MSG_ANI = 504;         //发送相动动画

		//战绩
		public static CMD_ZHANJI_LIST = 601;         //战绩列表
		public static CMD_ZHANJI_DES_LIST = 602;         //战绩每局列表
		public static CMD_DAIKAI_LIST = 603;         //代开列表
		//    public static  CMD_ZHANJI_SAVE =              603;         //战绩保存
		//    public static  CMD_ZHANJI_DES_SAVE =          604;         //战绩每局保存
		public static CMD_CLUB_ZHANJI_LIST = 605;          //俱乐部战绩列表(历史记录)
		public static CMD_REPLAY = 610;         //回放
		public static CMD_Combat_REPLAY_data = 611;         //大结算回放
		public static CMD_SIGN_HASVIEW = 614;  //标志已查看状态

		public static CMD_PERSON_AGAINS = 620;         //个人今日、昨日的对战数据
		public static CMD_PERSON_TOTAL_AGAINS = 621;         //个人对战的历史数据和总数据

		public static CMD_get_clientConfigs = 701;         //获取客户端配置信息
		public static CMD_record_errorInfo = 702;         //上传客户端错误

		//通告或活动
		public static CMD_CONTENT_LIST = 801;         ////通告或活动列表
		public static CMD_ADDORUPDATE_CONTENT = 802;         ////添加或修改通告或活动
		public static CMD_CONTENT_DETAIL = 803;         ////通告或活动详情
		public static CMD_CONTENT_DELETE = 804;         ////通告或活动删除
		public static CMD_CONTENT_SHOW_TYPE = 805;         ////通告或活动优先展示
		public static CMD_Activity_ShowType = 806;         //公告、活动显示方式


		//转盘抽奖
		public static CMD_DRAW_LOTTERY_INITDATA = 850;         //首次进入初始化抽奖数据
		public static CMD_DRAW_LOTTERY_OPER = 851;         //抽奖操作
		public static CMD_DRAW_LOTTERY_RECORDS = 852;         //抽奖记录
		public static CMD_DRAW_LOTTERY_TAKED = 853;         //更新奖品状态
		public static CMD_DRAW_LOTTERY_ONERECORD = 854;        //获取单个抽奖记录
		public static CMD_DRAW_LOTTERY_TIMES = 855;        //可抽奖次数



		public static CMD_GET_TASK_LIST = 901;        // 获取任务列表
		public static CMD_GET_TASK_REWARD = 902;        // 领取任务奖励
		public static CMD_TASK_TIP = 903;        // 任务完成状态提示
		public static CMD_SHARE_SUCCESS = 904;        // 分享成功
		public static CMD_HTTP_ADD_NEW_TASK = 905;        // 添加新的任务
		public static CMD_HTTP_CHANGE_TASK_STATUS = 906;    // 改变任务状态
		public static CMD_HTTP_DEL_ALL_TASK = 907;    // 删除所有任务

		// 积分版
		public static CMD_GET_SCORECARD_INFOS = 920; // 获取计分板信息


		//麻将游戏中信息
		public static CMD_HEAR_THROB = 1000;             //心跳
		public static CMD_DISCARD = 1001;             //用户出牌
		public static CMD_PONG = 1002;             //用户碰牌
		public static CMD_KONG = 1003;             //用户扛牌
		public static CMD_CHOW = 1004;             //用户吃牌
		public static CMD_WIN = 1005;             //胡
		public static CMD_READY = 1006;             //听牌
		public static CMD_PASS = 1007;             //过
		public static CMD_FAFEN = 1008;             //罚分
		public static CMD_getFlowerIds = 1011;                 //刷新花


		public static CMD_DRAW = 1012;             //用户摸牌
		public static CMD_JIA = 1014;             //用户架牌
		public static CMD_CANEL_JIA = 1015;             //用户取消架牌

		public static CMD_DEAL = 1021;             //系统首次发牌
		public static CMD_UPDATE_BOARD_INFO = 1022;             //更新整个牌桌数据
		public static CMD_USER_RECONNECTION = 1023;             //用户重连
		public static CMD_USER_STATUS_CHANGE = 1031;       //用户状态改变
		public static CMD_READY_FOR_NEXT = 1032;       //继续下把
		public static CMD_BACK_HALL = 1033;         //返回到大厅
		public static CMD_BACK_GAME = 1034;         //返回到游戏
		public static CMD_APP_Background = 1035;         //APP进入后台
		public static CMD_APP_Foreground = 1036;         //APP返回前台


		public static CMD_DISCARD_OTHER = 1101;             //其他用户出牌
		public static CMD_PONG_OTHER = 1102;             //其他用户出牌
		public static CMD_OPERATE_TIP = 1201;             //操作提示

		public static CMD_XJS_DATA = 1301;             //小结算数据
		public static CMD_DJS_DATA = 1401;             //大结算数据

		public static CMD_AUTO_DISCARD = 1501;             //自动出牌
		public static CMD_AUTO_PASS = 1502;                //自动过

		public static CMD_Notice_AutoHost_start = 1511;                //通知托管开始
		public static CMD_Notice_AutoHost_cancel = 1512;                //通知托管开始取消

		public static CMD_Notice_AutoHost_Timer_start = 1513;                //通知托管计时开始
		public static cmd_notice_autohost_status = 1514;//  通知托管状态改变
		public static CMD_Notice_kick_lefttime = 1601;                //通知房间踢人剩余时间
		public static CMD_Notice_cancel_kick = 1602;                //取消房间踢人

		//http cmd
		public static ERROR_WEB_BODY_NULL = 8000;             //body为空
		public static ERROR_WEB_UNKNOWN_ERROR = 8001;             //未知错误
		public static ERROR_WEB_BODY_ERROR = 8002;             //body数据错误
		public static ERROR_WEB_need_bind_proxy = 8003;             // 需要绑定代理

		public static CMD_CREATE_ORDER = 2001;             //创建订单
		public static CMD_ORDER_FINISH = 2002;             //订单成功
		public static CMD_QUERY_ORDER_STATUS = 2003;             //订单状态
		public static CMD_GET_ITEL_INFOS = 2004;             //获得商品列表




		public static CMD_GRANT_ITEM = 3000;             //道具变化
		public static CMD_USER_DIAMOND_CHANGE = 3001;             //钻石变化
		public static CMD_PROXY_GRANT_ITEM = 3002;             //代理发放道具

		public static CMD_USER_GOLD_CHANGE = 3101;             //金币变化

		public static CMD_checkHotUpdate = 4001;             //检查热更新
		public static CMD_checkAppUpdate = 4002;             //检查App更新

		public static CMD_getAllScrollMsg = 5001;             //获取所有滚动消息
		public static CMD_AddScrollMsg = 5002;             //增加滚动消息
		public static CMD_deleteScrollMsg = 5003;             //删除滚动消息
		public static CMD_getSingleScrollMsg = 5004;             //获取单条滚动消息
		public static CMD_updateScrollMsgStatus = 5005;             //修改滚动消息状态


		public static CMD_getUserInviteInfos = 6001;             //获得邀请用户列表信息
		public static CMD_getTotalInviteInfos = 6002;             //获得邀请用户列表信息
		public static CMD_getInviteInfos = 6003;             //获得邀请用户奖励列表和本周累计奖励
		public static CMD_Invite_draw_user_reward = 6004;             //领取用户奖励
		public static CMD_Invite_draw_total_reward = 6005;             //领取累计奖励
		public static CMD_Invite_bind_proxy = 6006;             //用户手动绑定代理


		public static CMD_Invite_getUserInviteInfos = 6021;             // 获取邀请信息
		public static CMD_Invite_applyDrawInviteReward = 6022;             // 申请领取邀请奖励
		public static CMD_Invite_getUserInviteHistory = 6023;             // 获取邀请历史记录
		public static CMD_Invite_sendUserInviteReward = 6024;             // 发放邀请奖励

		public static CMD_getHallShareCfgs = 6031;               // 获取大厅分享配置文件
		public static CMD_addHallShareCfgs = 6032;               // 增加大厅分享配置文件
		public static CMD_getAllHallShareCfgs = 6033;               // 获取所有大厅分享配置文件
		public static CMD_delHallShareCfgById = 6034;               // 删除大厅分享配置文件


		public static CMD_httpSendMail = 7001;               // 发送邮件


		public static CMD_SELF_CHECK_DEAL = 80001;       //检查是否要发牌

		public static mail_valid_sec = 15 * 24 * 60 * 60; // 邮件有效秒数

		public static show_type = 1; // 展示类别 0 无要求1.活动优先  2.公告优先


		//游戏发给大厅
		public static CMD_COMMON_gold_change = 90001001;          //金币变动
		public static CMD_COMMON_diamond_change = 90001002;          //钻石变动
		public static CMD_COMMON_start_game_backDiamond = 90001003;          //开始游戏返回钻石
		public static CMD_COMMON_close_room = 90002001;          //游戏结束，关闭房间

		//大厅发给游戏，数据同步
		public static CMD_COMMON_create_room = 10001001;          //创建房间，存储房间信息到数据

		public static CMD_COMMON_check_startGame = 10002001;          //创建房间，存储房间信息到数据
		public static CMD_COMMON_liujiu_over = 10002002;          //流局


		//俱乐部功能
		public static CMD_CLUB_CREATE = 9001;             //俱乐部创建
		public static CMD_CLUB_CHECK = 9002;             //俱乐部审核 (web)
		public static CMD_CLUB_ALLLIST = 9003;             //俱乐部列表  （web）包含审核 未审核
		public static CMD_CLUB_JOIN = 9004;             //玩家申请加入俱乐部
		public static CMD_CLUB_MEMBER_CHECK = 9005;             //会长审核玩家 审核状态 0：未审核，1：通过审核 2.未通过审核
		public static CMD_CLUB_MEMBERLIST = 9006;             //俱乐部玩家列表 （查询）
		public static CMD_CLUB_SET_MEMBER = 9007;             //会长设置成员类别 0.会长 1.管理员 2.普通玩家
		public static CMD_CLUB_BACK = 9008;             //退出俱乐部
		public static CMD_CLUB_ROOMINFOLIST = 9009;             //俱乐部房间列表
		public static CMD_CLUB_ROMEINFHIS = 9010;             //俱乐部历史记录列表
		public static CMD_CLUB_LIST = 9011;             //俱乐部列表  （tcp）
		public static CMD_CLUB_SET_HASPUSH = 9012;             //设置俱乐部成员是否在线
		public static CMD_CLUB_WAITCHECK_MEMBERLIST = 9013;             //俱乐部会长待审核玩家列表 （查询）
		public static CMD_CLUB_SENDNOTICE = 9014;             //俱乐部会长发布公告
		public static CMD_CLUB_REMOVEMEMBER = 9015;             //俱乐部会长剔除玩家
		public static CMD_CLUB_NOTICE = 9016;             //推送俱乐部公告
		public static CMD_CLUB_ROOMINFO_CHANGE = 9017;             //俱乐部房间变动信息
		public static CMD_CLUB_MEMBER_CHANGE = 9018;             //俱乐部成员变动信息
		public static CMD_CLUB_ROOM_AUTOCREATE = 9019;       //俱乐部自动创建开关
		public static CMD_CLUB_ONE = 9020;       //获取单个俱乐部信息
		public static CMD_CLUB_get_inviteMember_info = 9021;       //获取俱乐部邀请成员信息
		public static CMD_CLUB_medify_club_info = 9022;           //修改俱乐部信息
		public static CMD_CLUB_set_hasPopNotice = 9023;           //设置不需要弹框
		public static CMD_CLUB_get_hasPopNotice = 9024;           //获取是否需要弹框
		public static CMD_CLUB_setting = 9025;           //俱乐部设置
		public static CMD_CLUB_getSettingInfo = 9026;           //获得俱乐部配置设置		
		public static CMD_CLUB_forbid_game = 9027;            //禁止/解禁游戏
		public static CMD_CLUB_roominfo_progress = 9028;      //房间进度信息
		public static CMD_CLUB_apply_quit = 9029;             //成员申请退出俱乐部
		public static CMD_CLUB_check_apply_quit = 9030;       //审核成员申请退出		

		public static CMD_CLUB_forceCancelRoom = 9031;           //会长强制解散房间
		public static CMD_CLUB_transferManager = 9032;           //转让会长
		public static CMD_CLUB_BIND_ALL_MEMBER = 9033;             //系统自动绑定所有俱乐部成员
		public static CMD_CLUB_BIND_ONE_MEMBER = 9034;             //系统自动绑定一个成员给代理

		public static CMD_CLUB_update_free_time = 9035;             //更新免钻期
		public static CMD_CLUB_query_free_time = 9036;              //查询免钻期
		public static CMD_CLUB_del_proxy_club = 9037;              //删除代理俱乐部
		public static CMD_CLUB_get_template_names = 9038;          //俱乐部模板名称列表


		public static CMD_CLUB_updateTemplate = 9040;         //修改房间模板
		public static CMD_CLUB_createTemplate = 9041;         //创建房间模板
		public static CMD_CLUB_deleteTemplate = 9042;         //删除房间模板
		public static CMD_CLUB_queryTemplates = 9043;         //查询房间模板列表
		public static CMD_CLUB_createRoomByTemplateId = 9044;  //通过房间模板创建房间
		public static CMD_CLUB_joinRoomByTemplateId = 9045;    //通过房间模板加入房间
		public static CMD_CLUB_templateChange = 9046;    //房间模板变动推送
		public static CMD_CLUB_merge = 9047;    //合并俱乐部
		public static CMD_CLUB_setWatcher = 9048;    //设置值班人
		public static CMD_CLUB_medify_templateNum = 9049;           //修改俱乐部模板数量
		public static CMD_CLUB_all_manager = 9050;           //获取俱乐部管理员以上成员
		public static CMD_CLUB_modify_memberInfo = 9051;      //设置俱乐部成员信息
		public static CMD_CLUB_memberblesslist = 9060;         //成员福分列表
		public static CMD_CLUB_blessmember = 9061;         //祝福成员
		public static CMD_CLUB_blessrecord = 9062;         //祝福记录
		public static CMD_CLUB_blesschangerecord = 9063;         //福分变动记录
		public static CMD_CLUB_blessshopsetting = 9064;         //福分商城设置
		public static CMD_CLUB_blessshoplist = 9065;    //福分商城列表
		public static CMD_CLUB_shopexchange = 9066;    //商城兑换金币
		public static CMD_CLUB_grantexchangegold = 9067;    //发放兑换的金币
		public static CMD_CLUB_exchangerecord = 9068;    //福分商城兑换记录
		public static CMD_CLUB_tryluck = 9069;    //试试手气
		public static CMD_CLUB_myblessnum = 9070;       //我的福分
		public static CMD_CLUB_exchangeratequery = 9071;       //福分兑换率查询
		public static CMD_CLUB_bless_change_notice = 9073;       //体力变动通知
		public static CMD_CLUB_BLESS_SCORE_ONLY = 9074;       //只查我的福分
		public static CMD_CLUB_BATCH_MODIFY_BLESSNUM = 9075;       //批量修改福分数量
		public static CMD_CLUB_MY_RECORD_DATA = 9076;       //我的战绩记录
		public static CMD_CLUB_set_permission = 9101;       //设置成员权限
		public static CMD_CLUB_get_permission = 9102;       //获取成员权限
		public static CMD_CLUB_notice_new_combat = 9111;       //新的结算通知
		public static CMD_CLUB_get_operLog = 9112;       //操作日志
		public static CMD_OPPART_GROUP_ADD = 9200;//新增合伙组
		public static CMD_OPPART_GROUP_DEL = 9201;//删除合伙组
		public static CMD_OPPART_GROUP_LIST = 9202;//合伙组列表
		public static CMD_OPPART_GROUP_BATCH_SETTING = 9203;//批量设置所属合伙组
		public static CMD_OPPART_GROUP_MEMBER_LIST = 9206;//合伙组成员列表
		public static CMD_OPPART_GROUP_MEMBER_DEL = 9207; //删除合伙组成员
		public static CMD_OPPART_SET_MANAGER = 9208; //设置/删除，合伙组管理员
		public static CMD_OPPART_MAMAGER_RIGHT = 9209;//体力管理权限
		public static CMD_OPPART_MODIFYGROUPNAME = 9210; //改合伙组名称
		//俱乐部隔离组
		public static CMD_CLUB_Divide_addDivide = 10001;      //增加隔离组
		public static CMD_CLUB_Divide_removeDivide = 10002;      //移除隔离组
		public static CMD_CLUB_Divide_updateDivideName = 10003;      //修改隔离组名称
		public static CMD_CLUB_Divide_addDivideMember = 10004;      //增加隔离组成员
		public static CMD_CLUB_Divide_removeDivideMember = 10005;      //移除隔离组成员

		public static CMD_CLUB_Divide_getDivideMembers = 10006;      //获取隔离组成员
		public static CMD_CLUB_Divide_getDivides = 10007;      //获取隔离组		
		public static CMD_CLUB_divide_all_member_list = 10008;      //获取俱乐部所有成员列表

		public constructor() {
		}
	}
}