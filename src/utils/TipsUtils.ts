module game {
	export class TipsUtils {
		public constructor() {
		}

/**
         * x,y:弹出的x,y
         * info:显示内容
         * maxWidth:内容最大宽度
         * direct 内容的位置 1.上 2.下 3.左 4.右 
         */
    	public static showTips(direct:number,x:number,y:number,info:string,maxWidth:number = 120,size:number = 20)
    	{
        	var group = new eui.Group();
            
            Main.instance.toastLayer.addChild(group);
            group.touchThrough = true;
            group.touchChildren = false;
        	var rect = new eui.Rect(GameConfig.ScreenW,GameConfig.ScreenH);
            rect.touchEnabled = false;
            rect.alpha = 0;
            group.addChild(rect);
    	    var view = new game.TipsView();
            group.addChild(view);
            view.setInfo(info,maxWidth,size);
            view.setPopPosition(direct,x,y);
            
            
            // view.scaleX = 0.1;
            // view.scaleY = 0.1;
            // var tween: egret.Tween = egret.Tween.get(view);
            // tween.to({scaleX:1,scaleY:1},100);
            
            group.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                // var tween: egret.Tween = egret.Tween.get(view);
                // tween.to({ scaleX: 0.1,scaleY: 0.1 },100).call(function()
                // {
                //     if(group.parent)
                //     {
                //         group.parent.removeChild(group);
                //     }
                // });
                    group.parent.removeChild(group);
                },this);
                
    	}	

        // //获取html文本
        // private getTextFlow(str:string): egret.ITextElement[] {
        //     var styleParser = new game.EHtmlTextParser();
        //     return styleParser.parser(str);
        // }        	
	}
}