module game {
	export class EComponent extends eui.Component{

		private eventMap_: any[] = [];
        private isSelfViewComplete = false;
        private isChildrenCreated = false;
        public isViewCreated = false;
		public constructor() {
			super();
            
			this.addEventListener(eui.UIEvent.COMPLETE,this.onSelfViewComplete,this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.clean,this);
		}

        protected childrenCreated():void{
			this.isChildrenCreated = true;
            if(this.isSelfViewComplete){
                this.onCreateViewComplete();
            }
		}

        private onSelfViewComplete():void{
			this.isSelfViewComplete = true;
            if(this.isChildrenCreated){
                this.onCreateViewComplete();
            }
		}	


		public onCreateViewComplete():void{
			this.isViewCreated = true;
		}	

		public updateUI(){
			if(this.isViewCreated){
                this.updateUI_();
			}
		}	
		protected updateUI_(){

		}                

		public addTapEvent(btn:egret.DisplayObject,event:Function){
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP,event,this);
			var element: any = { obj: btn,event: event };
            this.eventMap_.push(element);			
		}

		private removeTapEvent() 
        {
            for(var i = 0;i < this.eventMap_.length;i++)
            {
                var event: any = this.eventMap_[i];
                var obj = event.obj;
                var fun = event.event;
                obj.removeEventListener(egret.TouchEvent.TOUCH_TAP,fun,this);
            }
        }		

        //从舞台移除
        public clean()
        {
            this.removeTapEvent();
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.clean,this);
        }
	}
}