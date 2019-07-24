module game {
	export class GameCmd {

		public constructor() {
		}



		public static onResume: string = "onResume"
		public static onPause: string = "onPause"
		public static GAME_STATUS_CHANGED: string = "GAME_STATUS_CHANGED"
		public static DIR_ARROW_CHANGE: string = "DIR_ARROW_CHANGE"
		public static GOLD_NUMBER_CHANGE: string = "GOLD_NUMBER_CHANGE"
		public static DIAMOND_NUMBER_CHANGE: string = "DIAMOND_NUMBER_CHANGE"
		public static REPLAYER_ACTION_FINISH: string = "REPLAYER_ACTION_FINISH"
		public static PLAYER_HUA_NUM_CHANGED: string = "PLAYER_HUA_NUM_CHANGED"
		public static DRAW_CARD: string = "DRAW_CARD"
		public static DRAW_CARD_BACK: string = "DRAW_CARD_BACK"
		public static LEFT_CARD_NUM_CHANGED: string = "LEFT_CARD_NUM_CHANGED"
		public static OPERATE_PONG: string = "OPERATE_PONG"
		public static OPERATE_PONG_BACK: string = "OPERATE_PONG_BACK"
		public static OPERATE_KONG: string = "OPERATE_KONG"
		public static OPERATE_KONG_BACK: string = "OPERATE_KONG_BACK"
		public static DISCARD: string = "DISCARD"
		public static DISCARD_BACK: string = "DISCARD_BACK"
		public static UPDATE_DISCARD_ARROW: string = "UPDATE_DISCARD_ARROW"
		public static UPDATE_HUA: string = "UPDATE_HUA"
		public static AUTO_DISCARD_INFO: string = "AUTO_DISCARD_INFO"
		public static CHANGE_CARD_BACK: string = "CHANGE_CARD_BACK"
		public static CHANGE_CARD_FACE: string = "CHANGE_CARD_FACE"
		public static CHANGE_VIEW_MODE: string = "CHANGE_VIEW_MODE"
		public static AUTO_DISCARD_TIME_STATUS_CHANGED: string = "AUTO_DISCARD_TIME_STATUS_CHANGED"
		public static FLOWER_VISIBLE: string = "FLOWER_VISIBLE"
		public static PLAYER_STATUS_CHANGED: string = "PLAYER_STATUS_CHANGED"
		public static PLAYER_SCORE_FAFEN: string = "PLAYER_SCORE_FAFEN"
		public static PLAYER_SCORE_FAFEN_BACK: string = "PLAYER_SCORE_FAFEN_BACK"
		public static OPERATE: string = "OPERATE"
		public static OPERATE_BACK: string = "OPERATE_BACK"
		public static OPERATE_READY: string = "OPERATE_READY"
		public static OPERATE_READY_BACK: string = "OPERATE_READY_BACK"
		public static GET_MY_TING_INFO: string = "GET_MY_TING_INFO"
		public static OTHER_PLAYER_IN: string = "OTHER_PLAYER_IN"
		public static PLAYER_LEAVE: string = "PLAYER_LEAVE"
		public static OTHER_PLAYER_LEAVE: string = "OTHER_PLAYER_LEAVE"
		public static PLAYER_SCORE_NUM_CHANGED: string = "PLAYER_SCORE_NUM_CHANGED"
		public static OPERATE_PASS: string = "OPERATE_PASS"
		public static BATTERY_CHANGED: string = "BATTERY_CHANGED"
		public static APP_NET_SINGAL_CHANGED: string = "APP_NET_SINGAL_CHANGED"
		public static WIN_OVER: string = "WIN_OVER"
		public static PLAYER_BEGIN_JIA_PAI: string = "PLAYER_BEGIN_JIA_PAI"
		public static PLAYER_CANCEL_JIA_PAI: string = "PLAYER_CANCEL_JIA_PAI"
		public static CHAT_MSG: string = "CHAT_MSG"
		public static START_PLAY_VOICE: string = "START_PLAY_VOICE"
		public static VOICE_OVER: string = "VOICE_OVER"
		public static POINT_EMOTION: string = "POINT_EMOTION"
		public static START_AUTO_OF_DEALY: string = "START_AUTO_OF_DEALY"
		public static CANCEL_AUTO_OF_DEALY: string = "CANCEL_AUTO_OF_DEALY"
		public static AUTO_DISCARD_TIME: string = "AUTO_DISCARD_TIME"
		public static NOTICE_KICK_LEFT_TIME: string = "NOTICE_KICK_LEFT_TIME"
		public static CANCEL_KICK_LEFT_TIME: string = "CANCEL_KICK_LEFT_TIME"
		public static PREVENT_CHEAT_INFO: string = "PREVENT_CHEAT_INFO"
		public static CLOSE_APPLY_QUIT_PANEL: string = "CLOSE_APPLY_QUIT_PANEL"
		public static CLOSE_CHEAT_INFO_BOX: string = "CLOSE_CHEAT_INFO_BOX"
		public static CHECK_CHEAT_STATUS: string = "CHECK_CHEAT_STATUS"
		public static CLOSE_GAME_SETTLE_PANEL: string = "CLOSE_GAME_SETTLE_PANEL"
		public static GameSettleInfo_1: string = "GameSettleInfo_1"
		public static GameSettleInfo_over: string = "GameSettleInfo_over"
		public static APPLY_QUIT_INFO: string = "APPLY_QUIT_INFO"
		public static APPLY_QUIT_REJECT: string = "APPLY_QUIT_REJECT"
		public static DISSOLVE_ROOM: string = "DISSOLVE_ROOM"
		public static CLOSE_CHEAT_STATUS_BOX: string = "CLOSE_CHEAT_STATUS_BOX"
		public static PLAY_SINGLE_MESSAGE: string = "PLAY_SINGLE_MESSAGE"
		public static PLAY_TOTAL_MESSAGE: string = "PLAY_TOTAL_MESSAGE"
		public static CHANGE_PLAYER_NUM_REJECT: string = "CHANGE_PLAYER_NUM_REJECT"
		public static CHANGE_PLAYER_NUM_INFO: string = "CHANGE_PLAYER_NUM_INFO"
		public static CHANGE_PLAYER_NUM_CANCEL: string = "CHANGE_PLAYER_NUM_CANCEL"
		public static CLOSE_CHANGE_PLAYERNUM_PANEL: string = "CLOSE_CHANGE_PLAYERNUM_PANEL"
		public static UPDATE_GAEMSCORE_BOARD: string = "UPDATE_GAEMSCORE_BOARD"
		public static CHANGE_GAME_BG: string = "CHANGE_GAME_BG"
		public static CHANGE_GAME_BG_FRAME: string = "CHANGE_GAME_BG_FRAME"
		public static CLOSE_CHAT_BOX_PANEL: string = "CLOSE_CHAT_BOX_PANEL"
		public static UPDATE_PLAYER_POSITION: string = "UPDATE_PLAYER_POSITION"
		public static SHARE_VIEW_HEAD_DOWNLOAD_COMPLETE: string = "SHARE_VIEW_HEAD_DOWNLOAD_COMPLETE"
		public static UPDATE_AUTODISCARD_Text_Visible: string = "UPDATE_AUTODISCARD_Text_Visible"
		public static REPLAY_OPERATE_CLICK: string = "REPLAY_OPERATE_CLICK"
		public static REPLAY_OPERATE_CLICK_BACK: string = "REPLAY_OPERATE_CLICK_BACK"

		//绑定手机号
		public static USER_BINDPHONENUMBER: string = "USER_BINDPHONENUMBER"
		//获取验证码
		public static USER_GETBINDSMSCODE: string = "USER_GETBINDSMSCODE"
		//实名认证
		public static USER_BIND_ID: string = "USER_BIND_ID"

		//俱乐部
		public static CLICK_CLUB_ITEM: string = "clickClubItem";
		public static CLICK_CLUB_Rooms: string = "clickClubRooms";
		public static CLICK_CLUB_Members: string = "clickClubMembers";
		public static CLICK_CLUB_ApplyJoins: string = "clickApplyJoins";
		public static CLICK_CLUB_Bless: string = "clickClubBless";
		public static CLICK_CLUB_UpdateRedTip: string = "club_UpdateRedTip";
		public static CLICK_CLUB_MODIFY_BLESS_RECORDS_ITEM: string = "CLICK_CLUB_MODIFY_BLESS_RECORDS_ITEM";
		public static CLICK_CLUB_DIVIDE_TAB_ITEM: string = "CLICK_CLUB_DIVIDE_TAB_ITEM";


		public static CLUB_UPDATE_BLESS_VALUE: string = "CLUB_UPDATE_BLESS_VALUE";
		public static CLUB_REFRESH_BLESS_LIST: string = "CLUB_REFRESH_BLESS_LIST"
		public static CLUB_REFRESH_BLESS_INFO_LIST: string = "CLUB_REFRESH_BLESS_INFO_LIST"
		public static CLUB_REMOVE_DIVIDE_MEMBER: string = "CLUB_REMOVE_DIVIDE_MEMBER"
		public static CLUB_ADD_DIVIDE_GROUP: string = "CLUB_ADD_DIVIDE_GROUP"
		public static CLUB_MODIFY_DIVIDE_GROUP_NAME: string = "CLUB_MODIFY_DIVIDE_GROUP_NAME"

		//战绩
		public static ZHANJI_HAS: string = "ZHANJI_HAS";
		public static MODIFY_HAS_VIEW_STATUS: string = "MODIFY_HAS_VIEW_STATUS";

		//活动公告
		public static CLICK_activity_ITEM: string = "clickActivityItem";

		//邮件
		public static CLICK_MAIL_ITEM: string = "CLICK_MAIL_ITEM";
		public static UPDATE_MAIL_TIP: string = "UPDATE_MAIL_TIP";			//刷新邮件红点

		//任务
		public static UPDATE_TASK_TIP: string = "UPDATE_TASK_TIP";			//刷新任务红点

		//网络连接
		public static SOCKET_STATUS_CHANGE: string = "socketStatusChange";		//socket状态改变

		public static USER_LOGIN_SUCCESS: string = "user_login_success";		//用户登陆成功

		public static getCmdFromNet(cmd: number) {
			return cmd + "";
		}
	}
}