module game {
	/**
	 *
	 * @author 
	 *
	 */
    export class GameHttpConst {
        private static HTTP_PORT = 8080
        private static BASE_URL_PRODUCTION = "http://127.0.0.1:8080/web/";
        private static BASE_URL_TEST = "http://192.168.1.42:8080/web/";
        private static BASE_URL_ONLINE = Constants.server_url_current;

        private static HTTP_URL_HTTP = Utils.format("http://{0}:8080/web/", GameHttpConst.BASE_URL_ONLINE);
        private static HTTP_URL_HTTPS = Utils.format("https://{0}:8080/web/", GameHttpConst.BASE_URL_ONLINE);
        private static HTTP_URL_TEST = "http://47.98.237.192:8080/web/";
        private static HTTP_URL_RELEASE = "http://47.98.237.192:8080/web/";
        private static HTTP_URL_Tang = "http://192.168.1.125:8080/web/";

        private static HTTP_URL = GameHttpConst.HTTP_URL_HTTP;
        public static HTTP_APP_SECRET = "0ac1cab3409a1bd6fefe315b04710138";

        public static HTTP_APP_SECRET_new = "7306165e6d0b5f44b07b2c5d63fefc1b";
        public static SIGNKEY_SOCIAL = "0fc548c301f16da4f396dac8bc9304d4"

        public static inviteToClubURL = "http://agent.qixigame.com/nanjing/wx/apply-club"

        public static url_checkAppUpdate = "checkAppUpdate";

        public static url_getStoreList = "getItemInfosNew";
        public static url_getCombatReplayData = "game/getCombatReplayData";
        public static url_getUnionIdFromJsCode = "user/getUnionIdFromJsCode";

        public static url_Feedback = "user/feedback/add";

        public static url_getItemInfosNew = "getItemInfosNew";
        public static url_getActivityList = "content/contentList";

        public static url_getDiamondRecord = "diamond/record";
        public static url_getGoldRecord = "gold/record";
        public static url_createOrder = "order/createOrder"
        public static url_getLoginSmsCode = "user/getLoginSmsCode";

        public static url_pay_h5 = "http://agent.qixigame.com/nanjing/h5/do-pay"
        public static url_upload_head_img_in_app = "http://agent.qixigame.com/nanjing/gamecontact/upload-head"
        public static url_get_head_img_data = "http://agent.qixigame.com/nanjing/gamecontact/get-head-img"
        public static url_delete_head_img = "http://agent.qixigame.com/nanjing/gamecontact/del-head-img"


        public constructor() {
        }

        public static HTTP_STATUS_SUCCESS = 1;

        public static getFullUrl(url: string) {
            return GameHttpConst.HTTP_URL + url;
        }

        /**
         * 
         * 100=分区数据异常
        101=参数错误
        102=该账户已被暂停使用;请联系管理员;
        103=请求异常,请重试;
        104=昵称重复
        105=只允许输入中文,数字,字母
        106=您输入的昵称有敏感词
        110=钻石不足
        111=积攒数不足
        
        
        
        120=操作失败
        121=对方好友数量已达到上限;
        122=您的好友数量已达到上限;
        
        130=您的PK次数不足;
        131=您已领取昨日奖励;
        
        140=免费次数已用完
         * */

        public static getErrString(errorCode) {
            var str = "";
            switch (errorCode) {
                case 102:
                    str = "该账户已被暂停使用;请联系管理员";
                    break;
                case 104:
                    str = "昵称重复";
                    break;
                case 105:
                    str = "只允许输入中文,字母";
                    break;
                case 106:
                    str = "您输入的昵称有敏感词";
                    break;
                case 110:
                    str = "钻石不足";
                    break;
                case 111:
                    str = "积攒数不足";
                    break;
                case 121:
                    str = "对方好友数量已达到上限";
                    break;
                case 122:
                    str = "您的好友数量已达到上限";
                    break;
                case 130:
                    str = "您的PK次数不足";
                    break;
                case 140:
                    str = "免费次数已用完";
                    break;
                case 150:
                    str = "您不能领取";
                    break;
                case 112:
                    str = "体力不足";
                    break;
                case 113:
                    str = "没有可使用次数";
                    break;
                case 160:
                    str = "不存在的激活码";
                    break;
                case 161:
                    str = "已使用过的激活码";
                    break;
                case 162:
                    str = "激活码已过期";
                    break;
                case 163:
                    str = "钥匙数量不足";
                    break;
                case 164:
                    str = "不能挑战自己";
                    break;
            }
            return str;
        }
    }
}
