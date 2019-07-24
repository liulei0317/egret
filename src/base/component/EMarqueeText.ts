class EMarqueeText extends eui.Group {
    private scrollSpeed: number = 30;
    private label: eui.Label;
    private _timer: egret.Timer;
    private text: string = "";
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onSelfViewComplete, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clean, this);

    }

    protected childrenCreated(): void {
        // this.isChildrenCreated = true;
        // if(this.isSelfViewComplete){
        //     this.onCreateViewComplete();
        // }
        this.init();
    }

    private onSelfViewComplete(): void {
        // this.isSelfViewComplete = true;
        // if(this.isChildrenCreated){
        //     this.onCreateViewComplete();
        // }
        console.log("ffff");
    }


    private init() {
        this.touchEnabled = true;
        this.label = new eui.Label();
        this.label.x = 0;
        this.label.y = 0;
        this.label.touchEnabled = false;
        this.addChild(this.label);
        this.mask = new egret.Rectangle(0, 0, this.width, this.height);
    }


    public start(text) {
        console.log("marquee text == "+text);
        this.text = text;
        this.label.text = this.text;
        if (this._timer == null) {
            this._timer = new egret.Timer(this.scrollSpeed);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        }
        if (this._timer.running) {
            this._timer.stop();
        }
        
        if (this.label.width > this.width) {
            this.resetX();
            this._timer.start();
        }else{
            this.label.x = (this.width - this.label.width)/2;
        }

    }

    public setTextSize(size: number) {
        this.label.size = size;
    }

    public setTextColor(color: number) {
        this.label.textColor = color;
    }

    private resetX() {
        this.label.x = this.width + 20;
    }

    private update() {
        this.label.x = this.label.x - 2;
        if (this.label.x + this.label.width < 0) {
            this.resetX();
        }
    }

    //从舞台移除
    public clean() {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clean, this);
        if (this._timer != null) {
            this._timer.stop();
            this._timer = null;
        }
        this.removeChild(this.label);
        this.label = null;
    }

}
window["EMarqueeText"] = EMarqueeText