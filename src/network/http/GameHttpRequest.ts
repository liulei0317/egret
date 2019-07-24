module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameHttpRequest {

        public static platformUID = "333";          //386
        public static uid = "381";

        public static serverId = "1";
        public static channel = "777";
        public static channel_child = "21";

        public static isShare: boolean = false;
        public static shareuid = "";
        public static shareserverId = "";
        
        public static index:number = 0;
    	
		public constructor() {
		}
        public static request(url: string,data: string,callBack?: Function,sign = null) 
        {
            GameHttpRequest.sendPostRequest(url,data,callBack,sign);
        }

        private static getSign(dataStr:string,sign = null)
        {
            var md: md5 = new md5();
            if(sign == null)
            {
                sign = GameHttpConst.HTTP_APP_SECRET
            }
            return md.hex_md5(dataStr + sign);
        }
    	
        private static handleServerResult(data: any,callback?: Function) 
        {
            
            LogUtils.info("data==="+data);
            if(data) 
            {
                var json = JSON.parse(data);
                callback.call(callback,json);
//                 if(data.data)
//                 {
//                     data.data = strDecode(data.data);
// //                    console.log("decode=" + data.data);
//                 }
                
//                 var bValid: boolean = GameHttpRequest.checkSign(data.data,data.sign);
//                 if(!bValid)
//                 {
//                     console.error("sign本地验证错误");
//                     return;
//                 }
//                 var status = data.status;
//                 switch(status) 
//                 {
//                     case -2://已登录
//                         CommonView.hideWaiting();
//                         alert("你的账号在别处登陆，你被挤下线!");
// //                        window.location.href = document.referrer;
// //                        parent.location.href = document.referrer;
//                         window.location.reload();
//                         break;
//                     case 0://失败
//                         console.error("请求错误代码：" + data.errorCode);
//                         var errStr = GameHttpConst.getErrString(data.errorCode);
//                         if(errStr.length > 0)
//                         {
//                             ToastManager.show(errStr);
//                         }
//                         if(callback) callback.call(this,data);
//                         break;
//                     case -1://sign err
//                     case 1://正常
//                         if(callback) callback.call(this,data);
//                         break;
//                 }
            }
        }


        private static sendPostRequest(url: string,data: any,callBack?: Function,sign = null) {
            var sign_str = GameHttpRequest.getSign(data,sign);

            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;

            request.setRequestHeader("sign",sign_str);
            request.setRequestHeader("Content-Type","text/plain");



            //请求成功
            request.addEventListener(egret.Event.COMPLETE,function(event: egret.Event)
            {
                var request = <egret.HttpRequest>event.currentTarget;
                
                if(request!=null && request.response!=null){
                    var responseData = request.response;
                    // egret.log("post data : ",responseData);
                    GameHttpRequest.handleServerResult(responseData,callBack);
                }else{
                    CommonView.hideWaiting()
                    LogUtils.error("http 请求未知错误！")
                }

                
            },this);

            //请求IO ERROR
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,function(event:egret.IOErrorEvent)
            {
                CommonView.hideWaiting()
                LogUtils.error("http 请求错误："+event);
            },this);      

            //请求进度变化
            request.addEventListener(egret.ProgressEvent.PROGRESS,function(event:egret.ProgressEvent)
            {
                // egret.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
            },this);  

            request.open(url,egret.HttpMethod.POST);
            request.send(data);                      

        }
 
	}
}
