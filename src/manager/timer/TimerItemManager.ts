  /**
    * 初始化mvc controller
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    */
module game {

    export class TimerItemManager{
        private static instance: TimerItemManager;
        
        private static UPDATE_TIME = 1000;
        private lastTime = 0;
        
        private items: HashMap;
		public constructor(){
            this.items = new HashMap();
            this.initData();
		}
		
		public initData(){
    		var nowTime = EAppFacade.getInstance().getNowTime();
		}
		
        public static getInstance() {
            if(!TimerItemManager.instance) {
                TimerItemManager.instance = new TimerItemManager();
            }
            return TimerItemManager.instance;
        }
        
        public onTimer(){
            var nowTime: number = EAppFacade.getInstance().getNowTime();
            if(nowTime - this.lastTime >= TimerItemManager.UPDATE_TIME){
                game.EAppFacade.getInstance().sendNotification(TimerType.ONE_SECOND,"");
                this.lastTime = nowTime;


                var values: any[] = this.items.values();
                var len: number = values.length;
                for(var i=len-1;i>=0;i--){
                    var item: TimerItem = values[i];
                    item.update(nowTime);
                    if(item.leftTime<=0){
                        game.EAppFacade.getInstance().sendNotification(item.itemCmd,item);
                        this.items.remove(item.itemCmd);
                    }else{
                        if (item.timerType == TimerItem.TimerType.perSec)
                        {
                            game.EAppFacade.getInstance().sendNotification(item.itemCmd,item);
                        }
                    }
                }                
            }
            

        }
        
        // public getItem(key:any){
        //     if(this.items.containsKey(key)){
        //         return this.items.get(key);
        //     }
        //     return null;
        // }
        public startTimer(timerType,duration,callBackFunc,obj):string
        {
            var timerItem = new TimerItem(duration,timerType);
			EAppFacade.getInstance().registerCommand(timerItem.itemCmd,callBackFunc,obj);
            this.items.put(timerItem.itemCmd,timerItem);
            timerItem.start();
            return timerItem.itemCmd;
        }

        public stopTimer(itemCmd:string,callFunc:boolean = false){
            var item = this.items.get(itemCmd)
            if(item == null)
            {
                return
            }
            this.items.remove(item.itemCmd);
            if (callFunc)
            {
                game.EAppFacade.getInstance().sendNotification(itemCmd,item);
            }
        }
	}
}