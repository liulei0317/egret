class UploadImg extends game.EComponent
{
    private btnDelete:EButton;
    private labelTxt:eui.Label;

    private addGroup:eui.Group;
    private imgUpload:eui.Image;
    private imgDefault:eui.Image;

    private imgUrl:string;
    private imgId:string;
    private imgData:any;
    private showDelete:boolean = false;

    public constructor()
    {
        super();
        this.skinName = "resource/skins/game/other/uploadImgSkin.exml"
    }

    public onCreateViewComplete()
    {
        super.onCreateViewComplete();
        this.addTapEvent(this.imgUpload,this.clickImgUpload);
        this.addTapEvent(this.imgDefault,this.clickImg);
        this.addTapEvent(this.btnDelete,this.clickDelete);
        this.updateUI();
    }

    public setData(data:any)
    {
        this.imgData = data
        if(data == null)
        {
            this.imgUrl = null;
            this.imgId = null;
        }else
        {
            this.imgUrl = this.imgData.img_url;
            this.imgId = this.imgData.img_id;
        }
        this.updateUI();
    }

    public updateUI_()
    {
        var hasImage = false;
        if(this.imgUrl && this.imgUrl.length>0){
            hasImage = true;
        }
        this.imgDefault.visible = hasImage;
        this.btnDelete.visible = this.showDelete;
        this.addGroup.visible = !hasImage;

        if(hasImage){
            var self = this;
            game.ResManager.loadWebImage(this.imgUrl, function (texture: any) {
            self.imgDefault.texture = texture;
            self.imgDefault.addEventListener(eui.UIEvent.COMPLETE,()=>{
                    self.imgDefault.texture = texture;
                },this)
            }, this);                
        }
    }

    private clickImgUpload(evt: egret.TouchEvent){
        this.doSelect(evt)
    }

    private clickImg(){
        this.showDelete = !this.showDelete
        this.updateUI();
    }        
    private clickDelete(evt: egret.TouchEvent){
        this.removeImgReview(evt);
    }


    private doSelect(evt: egret.TouchEvent): void {
        // if(isWeixin())
        // {
        //     alert("selectImageWX")
        //     selectImageWX(this.selectedHandler,this);
        // }
        // else
        // {
            // alert("selectImage")
            selectImage(this.selectedHandler,this);
        // }
    }
    private selectedHandler(thisRef: any,imgURL: string,file: Blob): void {
        //alert("img selected"+imgURL);
        RES.getResByUrl(imgURL,thisRef.compFunc,thisRef,RES.ResourceItem.TYPE_IMAGE);
        getImageData(file,thisRef.bytesHandler,thisRef);
    }
    private bytesHandler(thisRef: any,imgBytes: ArrayBuffer): void {
        console.log("大图数据:" + imgBytes);
        //上传图片
        thisRef.updateLoadImg(imgBytes);
    }
    private compFunc(texture: egret.Texture): void {
        this.addGroup.visible = false;
        this.imgDefault.visible = true;
        this.imgDefault.texture = texture;
    }

    private removeImgReview(evt: egret.TouchEvent): void 
    {
        game.DialogManager.getInstance().popUp2("确认要删除么?",this.deleteImgHandler.bind(this));
    }

    private deleteImgHandler()
    {
        game.GameHttpManager.request(game.GameHttpConst.url_delete_head_img,{
                user_id : GlobalData.userData.getUserId(),
                img_id : this.imgId
            },this.deleteImgHandlerCallBack.bind(this),game.GameHttpConst.SIGNKEY_SOCIAL)
        
    }

    private deleteImgHandlerCallBack(data)
    {
        if (data.status == game.CmdResultType.SUCCESS) {
            game.CommonView.showToast("删除成功")
            this.showDelete = false
            this.setData(null)
        }
    }


    private updateLoadImg(imgBytes: ArrayBuffer)
    {
        var self = this;
        var curSign = game.GameHttpConst.SIGNKEY_SOCIAL
        var md: game.md5 = new game.md5();
        var signSercet = md.hex_md5(GlobalData.userData.getUserId()+curSign);

        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;

        request.setRequestHeader("sign",signSercet);
        request.setRequestHeader("Content-Type","text/plain");
        request.setRequestHeader("user-id","" +GlobalData.userData.getUserId());
        request.setRequestHeader("ext","png")
        
        //请求成功
        request.addEventListener(egret.Event.COMPLETE,function(event: egret.Event)
        {
            var request = <egret.HttpRequest>event.currentTarget;
            if(request!=null && request.response!=null){
                var responseData = request.response;
                var jsonData = JSON.parse(responseData)
                self.imgId = jsonData.img_id
                self.imgUrl = jsonData.img_url
            }else{
            }
        },this);

        //请求IO ERROR
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,function(event:egret.IOErrorEvent)
        {

        },this);      

        //请求进度变化
        request.addEventListener(egret.ProgressEvent.PROGRESS,function(event:egret.ProgressEvent)
        {
            egret.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        },this);  

        request.open(game.GameHttpConst.url_upload_head_img_in_app,egret.HttpMethod.POST);
        request.send(imgBytes);   
    }
}

window["UploadImg"] = UploadImg