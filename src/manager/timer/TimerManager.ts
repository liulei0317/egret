  /**
    * 初始化mvc controller
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    */
module game {

    export class TimerManager{
        private timer: egret.Timer;
        private static instance:TimerManager;
		public constructor()
        {
            this.timer = new egret.Timer(100,0);
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		}
		
		public static getInstance(){
    		if(!TimerManager.instance){
    		    TimerManager.instance = new TimerManager();
    		}
		    return TimerManager.instance;
		}
		
        private onTimer() {
            TimerItemManager.getInstance().onTimer();
            // TimerSyncRes.getInstance().onTimer();
            // TimerResUpdate.getInstance().onTimer();
            // NewGuideManager.getInstance().onTimer();
            // TimerSyncCaptain.getInstance().onTimer();
        }
        
        public start(){
            // User.getInstance().gameVO.doUpgradeQueue();
            // User.getInstance().beautyVO.parseBeautyData();
            // TrumpetManager.getInstance().startLoop();
            this.timer.start();
        }
        public stop(){
            this.timer.stop();
        }
		
	}
}