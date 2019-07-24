module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class ToastUtils {
		public constructor() {
		}

        private static defaultY: number = 80;
        private static defaultDuration: number = 1300;
		
        public static showByKey(key: string,y?: number) 
        {
            // var str = Language.getInstance().getText(key);
            ToastUtils.show(key,y);
        }
        
        public static show(str: string,y?: number)
        {
            ToastUtils.showToastString(str,y?y:ToastUtils.defaultY,ToastUtils.defaultDuration);
        }
        
        private static showToastString(str: string,y: number,duration: number) 
        {
            var layer: egret.DisplayObjectContainer= Main.instance.toastLayer;
            var content: ToastView = new ToastView(str);
            content.alpha = 0;
            content.anchorOffsetY = content.height*0.5;
            content.y = y;
            layer.addChild(content);
            var tween: egret.Tween = egret.Tween.get(content);
            
            tween.to({alpha:1}, 300);
            tween.wait(duration);
            tween.to({ alpha: 0 },500);
            tween.call(function() { 
                layer.removeChild(content);
                });
        }
	}

    class ToastView extends egret.Sprite 
    {
        private str: string;
        
        public constructor(str: string) 
        {
            super();
            this.str = str;
            this.init();
        }
        
        private init() 
        {
            this.touchEnabled = false;
            this.width = GameConfig.ScreenW;
            var imageBg: egret.Bitmap = ResManager.createBitmap("frame_tips_png");
            imageBg.anchorOffsetX = imageBg.width*0.5;
            imageBg.anchorOffsetY = imageBg.height*0.5;
            imageBg.x = this.width / 2;
            imageBg.y = 0;            
            imageBg.touchEnabled = false;
            imageBg.alpha = 1;
            this.width = imageBg.texture.textureWidth;
            this.height = imageBg.texture.textureHeight;
            this.addChild(imageBg);
            var label: egret.TextField = new egret.TextField();
            label.touchEnabled = false;
            label.bold = true;
            label.fontFamily = "fzch";
            label.text = this.str;
            label.size = 24;
            label.textColor = 0xFFF8ED
            label.anchorOffsetX = label.width*0.5;
            label.anchorOffsetY = label.height*0.5;
            
            label.x = this.width / 2;
            label.y = 0;
            this.addChild(label);
        }
        
    }	
}
