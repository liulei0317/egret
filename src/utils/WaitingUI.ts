/**
 *
 * @author 
 *
 */
module game {
    export class WaitingUI extends egret.Sprite {

        private static instance: WaitingUI;

        private static bShow: boolean = false;
        public constructor() {
            super();
            this.createView();
        }
        private icon: eui.Image;
        private background: egret.Shape;
        private createView() {
            this.width = GameConfig.ScreenW;
            this.height = GameConfig.ScreenH;
            this.touchEnabled = true;

            this.background = new egret.Shape();
            this.background.width = this.width;
            this.background.height = this.height;
            this.background.graphics.beginFill(0x000000,0.5);
            this.background.graphics.drawRect(0,0,this.width,this.height);
            this.background.graphics.endFill();
            this.addChild(this.background);

            this.icon = new eui.Image();
            this.icon.source = "common_json.waiting_png"
            this.icon.anchorOffsetX = 100 * 0.5;
            this.icon.anchorOffsetY = 100 * 0.5;
            this.icon.x = this.width / 2;
            this.icon.y = this.height / 2;
            this.addChild(this.icon);
        }

        private rotationLoop() {
            var duration = 2000;
            var self: WaitingUI = this;
            this.icon.rotation = 0;
            var tween: egret.Tween = egret.Tween.get(this.icon);
            tween.to({ rotation: 360 },duration);
            tween.call(function() {
                self.rotationLoop();
            });
        }

        private stopRotation() {
            egret.Tween.removeTweens(this.icon);
        }


        private static currentTimeout = -1;
        public static showWaiting(duration?: number,bVisible?: boolean,isDim?: boolean) {
            if(WaitingUI.bShow) return;
            WaitingUI.bShow = true;

            var _visible = true;
            if(bVisible != undefined) _visible = bVisible;

            if(_visible) {
                if(!WaitingUI.instance) {
                    WaitingUI.instance = new WaitingUI();
                }
                if(isDim) {
                    WaitingUI.instance.background.alpha = 1;
                } else {
                    WaitingUI.instance.background.alpha = 0;
                }
                var layer: egret.DisplayObjectContainer = Main.instance.confirmDialogLayer;
                layer.addChild(WaitingUI.instance);
                WaitingUI.instance.rotationLoop();
            }

            if(duration) {
                WaitingUI.currentTimeout = egret.setTimeout(function() {
                    CommonView.hideWaiting();
                    egret.clearTimeout(WaitingUI.currentTimeout);
                    WaitingUI.currentTimeout = -1;
                },this,duration);
            }
        }

        /**
         * bVisible是否显示等待UI并屏蔽点击
         * default:true*/
        public static show(bVisible?: boolean,isDim?: boolean) {
            LogUtils.info("waiting show");
            var isDim_temp = true;
            if(isDim != undefined) {
                isDim_temp = isDim;
            }
            WaitingUI.showWaiting(null,bVisible,isDim_temp);
        }

        public static isShowing() {
            return WaitingUI.bShow;
        }

        public static hide() {
            LogUtils.info("waiting hide");
            if(WaitingUI.currentTimeout != -1) {
                egret.clearTimeout(WaitingUI.currentTimeout);
                WaitingUI.currentTimeout = -1;
            }
            WaitingUI.bShow = false;
            if(WaitingUI.instance) {
                var layer: egret.DisplayObjectContainer = Main.instance.confirmDialogLayer;
                if(layer.contains(WaitingUI.instance)) {
                    WaitingUI.instance.stopRotation();
                    layer.removeChild(WaitingUI.instance);
                }
            }
        }
    }
}
