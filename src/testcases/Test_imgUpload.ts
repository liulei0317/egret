/**
 * 测试图片上传
 * @author 
 *
 */
class Test_imgUpload extends egret.Sprite{
    private icon:egret.TextField;
    
	public constructor() {
    	super();
    	
    	this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded2stage,this);
	}
	private onAdded2stage(e):void{
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
        // this.icon = jbP2.DispUtil.createTouchTf( 10,10,100,20,"start");
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
        getImageData(file,thisRef.bytesHandler,thisRef);
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
    }
    private removeImgReview(evt: egret.TouchEvent): void {
        var imgReview: egret.Bitmap = evt.currentTarget;
        this.removeChild(imgReview);
    } 
    
    
}
