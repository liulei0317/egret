module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class TimerItem {
        public static TimerType = 
        {
            once:1,
            perSec:2
        }

        public static TimerStatus = 
        {
            start:1,
            process:2,
            end:0
        }
        public itemCmd: string;
        public startTime: number = 0;
        public needTime: number = 0;
        public leftTime:number;
        public timerType:number; 
        public status = 0;
        public constructor(needTime: number,timerType:number) {
            this.itemCmd = UUID.generateUUID();
            this.timerType = timerType;
            this.needTime = needTime;
            
        }   
        
        public start(){
            var nowTime = EAppFacade.getInstance().getNowTime();
            this.status = TimerItem.TimerStatus.start;
            this.startTime = nowTime;
            this.updateLeftTime(nowTime);
        }

        public update(nowTime: number) {
            this.status = TimerItem.TimerStatus.process;
            this.updateLeftTime(nowTime);
        }    
        private updateLeftTime(nowTime: number){
            this.leftTime = this.needTime - (nowTime - this.startTime);
            if(this.leftTime<0){
                this.leftTime = 0;
                this.status = TimerItem.TimerStatus.end;
            }
        }    
	}
}
