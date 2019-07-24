module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class ResManager {
		public constructor() {
		}
        
        public static createBitmap(name:string):egret.Bitmap
        { 
            var result: egret.Bitmap = new egret.Bitmap();
            var texture: egret.Texture = RES.getRes(name);
            result.texture = texture;
            return result;
        }

		public static loadWebImage(imgUrl:string,callback:Function,thisObject:any,retryNum=5){
			egret.ImageLoader.crossOrigin = "anonymous";
			var imageLoader:egret.ImageLoader = new egret.ImageLoader();
            
            // imageLoader.crossOrigin = "anonymous";
			imageLoader.addEventListener(egret.Event.COMPLETE,
			function(event:egret.Event){
                if(retryNum<5){
                    LogUtils.info("重试成功  "+retryNum);
                }
				var imageLoader = <egret.ImageLoader>event.currentTarget;
				let texture = new egret.Texture();
                if(imageLoader.data!=null){
                    texture._setBitmapData(imageLoader.data);
                    callback.call(thisObject,texture,imgUrl);
                }else{
                    LogUtils.info("加载图片失败...");
                }
			},this);
            imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,function(){
                LogUtils.info("加载图片错误...");
                if(retryNum != undefined && retryNum>0){
                    LogUtils.info("重试次数  "+retryNum);
                    ResManager.loadWebImage(imgUrl,callback,thisObject,retryNum-1);
                }
                
            },this);
			imageLoader.load(imgUrl);

			// var bitmap:egret.Bitmap = new egret.Bitmap(texture);
		}


		








	// 	private test2(){
    //    RES.getResByUrl(str2, (event): void => {
    //         var bd = new egret.Bitmap();
    //         bd.texture = <egret.Texture>event;
    //         bd.width = 300;
    //         bd.height = 300;
    //         bd.smoothing = false;
    //         this.addChild(bd);
    //     }, this, RES.ResourceItem.TYPE_IMAGE);

    //     let encodeUrl2 = encodeURIComponent("http://www.baidu.com?word=1334");
    //     var str3: string = `http://wx.heymore.com/heimao/servers/erweima/2.php?str=${encodeUrl2}`;
    //     RES.getResByUrl(str3, (event): void => {
    //         var bd = new egret.Bitmap();
    //         bd.texture = <egret.Texture>event;
    //         bd.width = 300;
    //         bd.height = 300;
    //         bd.smoothing = false;
    //         bd.x = 300;
    //         this.addChild(bd);
    //     }, this, RES.ResourceItem.TYPE_IMAGE);

    //     let imgLoader = new egret.ImageLoader();
    //     imgLoader.addEventListener(egret.Event.COMPLETE, (event): void => {
    //         var bd = new egret.Bitmap();
    //         bd.bitmapData = event.target.data;
    //         bd.width = 300;
    //         bd.height = 300;
    //         bd.x = 10;
    //         bd.y = 400;
    //         bd.smoothing = false;
    //         this.addChild(bd);
    //     }, null);


    //     imgLoader.load("http://wx.qlogo.cn/mmopen/PiajxSqBRaEKUCqbDAh5wqMTvrbg7NlB3yloJh0tJDQxZicyTXBWHhiaicRSgnvpSicaN2pB3ArFge70P6MOr9qKggA/0");
			
	// 	}		
	}
    
}
