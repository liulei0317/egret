/**
 *
 * @author 
 *
 */
class Test_uploadBase64 extends egret.Sprite{
    private icon: egret.TextField;
    
    public constructor() {
    	super();
    	
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
    }
    private onAdded2stage(e): void {
        console.log('Test imgUpload added2stage!');

        this.createGameScene();
    }
	
	/**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        // var stageW: number = this.stage.stageWidth;
        // var stageH: number = this.stage.stageHeight;
        // this.icon = jbP2.DispUtil.createTouchTf(10,10,100,20,"start");
        // this.addChild(this.icon);
        // this.icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.doSelect,this);
    }
    private doSelect(evt: egret.TouchEvent): void {
        if(isWeixin())
            selectImageWX(this.selectedHandler,this);
        else
            selectImage(this.selectedHandler,this);
    }
    private selectedHandler(thisRef: any,imgURL: string,file: Blob): void {
        //alert("img selected"+imgURL);
        RES.getResByUrl(imgURL,thisRef.compFunc,thisRef,RES.ResourceItem.TYPE_IMAGE);
        //getImageData(file,thisRef.bytesHandler,thisRef);
    }
    private bytesHandler(thisRef: any,imgBytes: ArrayBuffer): void {
        console.log("大图数据:" + imgBytes);
    }
    private compFunc(texture: egret.Texture): void {
        //alert("compFunc"+texture);
        var imgReview: egret.Bitmap = new egret.Bitmap(texture);
        imgReview.touchEnabled = true;
        imgReview.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.removeImgReview,this);
        this.addChild(imgReview);
        
        this.uploadImgByTexture(texture);
    }
    private removeImgReview(evt: egret.TouchEvent): void {
        var imgReview: egret.Bitmap = evt.currentTarget;
        this.removeChild(imgReview);
    } 
	
	/**
     * 根据texture获得base64数据上传给服务器
     * @param texture
     */
    private uploadImgByTexture(texture: egret.Texture) {
        console.log('texture.wid:' + texture.textureWidth + ",hei:" + texture.textureHeight);
        
        //---------------------------------------------------------------------------------------------------------------------------------------
        //第二个参数就是你所希望截取的区域了，默认为texture整个大小
        //var base64Str = texture.toDataURL("image/png",new egret.Rectangle(0,0,texture.textureWidth,texture.textureHeight));
        var base64Str = texture.toDataURL("image/jpeg");//使用默认texture尺寸
        
        //测试正则表达式替换,只是为了测试-------------------------------------------------------------
        //var subStr = base64Str.substr(0,50);
        //var subStr = 'data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD';
        //var replStr = subStr.replace(/^data:image\/\w+;base64,/,"");
        //console.log('subStr:' + subStr);
        //console.log('replStr:' + replStr);
        //base64Str = base64Str.replace(/^data:image\/\w+;base64,/,"");//测试前端直接过滤字符
        //-----------------------------------------------------------------------------------------
        
        this.uploadData(base64Str);
        //---------------------------------------------------------------------------------------------------------------------------------------
    }


    /**
     * 把base64上传给服务器
     * @param base64Str 图片的base64数据
     */
    private uploadData(base64Str) {
      
        //格式 key0=value0&key1=value1,多个变量用&连接
        var httpVarsStr = "name=jarbowPic&imgData=" + base64Str;

        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://localhost:4000/egretUpload",egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        request.send(httpVarsStr);//发送post参数
        request.addEventListener(egret.Event.COMPLETE,this.onDataComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
    }

    private onDataComplete(event: egret.Event) {
        var request = <egret.HttpRequest>event.currentTarget;
        var response: string = String(request.response);
        console.log("onDataComplete data : " + response);//
    }
    private onPostIOError(event: egret.IOErrorEvent): void {
        console.log("post error : " + event);
    }
    private onPostProgress(event: egret.ProgressEvent): void {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
}
