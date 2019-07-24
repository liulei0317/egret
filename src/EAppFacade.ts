/**
  * 初始化mvc controller
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class EAppFacade {
        private commandList: Function;
        // private map: HashMap;
        private static instance: EAppFacade;
        private serverTimeDelta: number = 0;

        private eventDispatcher: egret.EventDispatcher;
        public constructor() {
            // this.map = new HashMap();
            this.eventDispatcher = new egret.EventDispatcher();
        }

        public static getInstance() {
            if (!EAppFacade.instance) {
                EAppFacade.instance = new EAppFacade();
            }
            return EAppFacade.instance;
        }

        public sendNotification(command: string, data: any = null) {
            this.notificationAll(command, data);
        }
        //,thisObject: any
        // private registerCommand_(command: string,fun: Function,thisObject: any){
        //     var functionMap: HashMap = null;
        //     var funKey = this.getFunctionKey(fun,thisObject);
        //     if(!this.map.containsKey(command)){
        //         functionMap = new HashMap();

        //         functionMap.put(funKey,new valueObject(fun,thisObject));
        //         this.map.put(command,functionMap);
        //     }else{
        //         functionMap = this.map.get(command);
        //         if(!functionMap.containsKey(funKey)){
        //             functionMap.put(funKey,new valueObject(fun,thisObject));
        //         }
        //     }
        // }
        public registerCommand(command: string, fun: Function, thisObject: any) {
            this.eventDispatcher.addEventListener(command, fun, thisObject);
        }

        public removeCommand(command: string, fun: Function, thisObject: any) {
            this.eventDispatcher.removeEventListener(command, fun, thisObject);
        }

        private notificationAll(command: string, data: any): void {
            this.eventDispatcher.dispatchEvent(new egret.Event(command, false, false, data));

            // if(this.map.containsKey(command)) {
            //     var functionMap: HashMap = this.map.get(command);

            //     var values: valueObject[] = functionMap.values();
            //     var len = 0;
            //     if(values){
            //         len = values.length;
            //     }
            //     for(var i:number = 0;i<len;i++){
            //         var fun:Function = values[i].fun;
            //         var thisObject: any = values[i].thisObject;
            //         if(thisObject){
            //             fun.call(thisObject,data,"");
            //         }
            //     }
            // }
        }

        /**
         * 单位：ms
         */
        public getNowTime() {
            return new Date().getTime() + this.serverTimeDelta;
        }

        public updateServerTime(serverTime: number) {
            this.serverTimeDelta = serverTime - new Date().getTime();
        }

        public needUpdateServerTime()
        {
            return this.serverTimeDelta == 0
        }

        public startUp() {

        }
    }

    class valueObject {
        fun: Function;
        thisObject: any;
        public constructor(fun: Function, thisObject: any) {
            this.fun = fun;
            this.thisObject = thisObject;
        }
    }
}