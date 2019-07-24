module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameHttpManager {
    	
        public static uuuid;
    	
		public constructor() {
		}

        public static checkAppUpdate() 
        {
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_checkAppUpdate);
            var data: any = this.getBaseData();
            GameHttpManager.request(url,data,GameHttpManager.checkAppUpdateCallBack);
        }

        private static checkAppUpdateCallBack(data)
        {
            if(data.code == CmdResultType.SUCCESS)
            {
                var clientConfigs = data.data.clientConfigs
                GlobalData.initClientConfigInfo(clientConfigs)
            }
        }

        public static getCombatList(callback:Function) 
        {
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_checkAppUpdate);
            var data: any = this.getBaseData();
            GameHttpManager.request(url,data,callback);
        }

         public static getStoreList(callback:Function) 
        {
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_getStoreList);
            var data: any = this.getBaseData();
            data.diamondGroupId = "2";
            data.goldGroupId = "10002";
            GameHttpManager.request(url,data,callback);
        }  


        public static getCombatReplayData(roomId:number,callback:Function) 
        {
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_getCombatReplayData);
            var data: any = this.getBaseData();
            data.roomId = roomId;
            GameHttpManager.request(url,data,callback);
        }    

        public static getUnionId(jscode:string,encryptedData,iv,callback:Function)
        {
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_getUnionIdFromJsCode);
             var data: any = this.getBaseData();
            data.jscode = jscode;
            data.encryptedData = encryptedData;
            data.iv = iv;
            GameHttpManager.request(url,data,callback);
        }

        public static feeback(userId,type,content,telPhone,callback:Function)
        {
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_Feedback);
            var data: any = this.getBaseData();
            data.userId = userId;
            data.type = type;
            data.content = content;
            data.telPhone = telPhone;
            GameHttpManager.request(url,data,callback);
        }    

        public static getItemInfosNew(diamondGroupId,goldGroupId,callback:Function){
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_getItemInfosNew);
            var data: any = this.getBaseData();
            data.diamondGroupId = diamondGroupId;
            data.goldGroupId = goldGroupId;
            GameHttpManager.request(url,data,callback);
        }

        public static getActivityList(callback:Function){
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_getActivityList);
            var data: any = this.getBaseData();
            // data.diamondGroupId = diamondGroupId;
            // data.goldGroupId = goldGroupId;
            GameHttpManager.request(url,data,callback);
        }     

        public static getDiamondRecord(userId,callback:Function){
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_getDiamondRecord);
            var data: any = this.getBaseData();
            data.userId = userId;
            // data.goldGroupId = goldGroupId;
            GameHttpManager.request(url,data,callback);
        }     

        public static getGoldRecord(userId:number,callback:Function){
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_getGoldRecord);
            var data: any = this.getBaseData();
            data.userId = userId;
            // data.goldGroupId = goldGroupId;
            GameHttpManager.request(url,data,callback);
        }                             
        public static getLoginSmsCode(phoneNumber: string, callback:Function){
            var url = GameHttpConst.getFullUrl(GameHttpConst.url_getLoginSmsCode);
            var data: any = this.getBaseData();
            data.phoneNumber = phoneNumber;
            GameHttpManager.request(url, data, callback);
        }                             

        private static getBaseData(sign = null){
            var data: any = {};
            data.versionName = GameConfig.version;
            data.platform = "H5";
            data.time = EAppFacade.getInstance().getNowTime();

            var md: md5 = new md5();
            if(sign == null)
            {
                sign = GameHttpConst.HTTP_APP_SECRET_new
            }
            var newSign = md.hex_md5(data.time+"_" + sign);

            data.newSign = newSign;
            return data;
        }               

        public static request(url,data:any,callBack,sign = null)
        {
            var baseData = this.getBaseData(sign)
            for(var key in data)
            {
                baseData[key] = data[key]
            }
            var s = JSON.stringify(baseData);
            GameHttpRequest.request(url,s,callBack,sign);
        }
        
	}
}
