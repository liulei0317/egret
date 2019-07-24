module game {
    export class EDialog extends EComponent {
        public static show_ani_type_null: number = 0;
        public static show_ani_type_ZoomIn: number = 1;
        public static show_ani_type_MoveDown: number = 2;
        public static show_ani_type_MoveFromLeft: number = 3;
        // public static show_ani_type_ZoomOut:number = 4;

        private needShow: boolean;
        private animationType: number = 0;
        private callback: Function;

        private dialogUUID: string;
        public needMask: boolean = true;

        private bgRect: eui.Rect;


        protected eventMsg: any;
        protected eventId: string;
        protected eventData: any;

        private maskClickable: boolean = true
        private maskAlpha: number = 0
        public constructor(dialogUUID?: string, maskClickable: boolean = true, maskAlpha: number = 0.6) {
            super();
            if (dialogUUID == undefined || dialogUUID == null) {
                this.dialogUUID = UUID.generateUUID();
            } else {
                this.dialogUUID = dialogUUID;
            }
            this.maskClickable = maskClickable;
            this.maskAlpha = maskAlpha
        }

        public onCreateViewComplete(): void {
            super.onCreateViewComplete();
            if (this.needMask) {
                this.addBgRect();
            }
            if (this.needShow) {
                this.needShow = false;
                this.show(this.animationType, this.callback);
            }
            EAppFacade.getInstance().registerCommand("panel", this.onEventHandler, this)
        }

        protected onEventHandler(evt: egret.Event) {
            this.eventMsg = evt.data
            this.eventId = this.eventMsg.cmd
            this.eventData = this.eventMsg.data
        }

        private addBgRect() {
            if (this.bgRect == null) {
                this.bgRect = new eui.Rect();
                this.bgRect.fillColor = 0x000000;
                this.bgRect.alpha = this.maskAlpha;
                // this.bgRect.width = GameConfig.ScreenW;
                // this.bgRect.height = GameConfig.ScreenH;
                var clientWidth = 1560;
                var clientHeight = GameConfig.windowHeight_h5 + GlobalData.deltaY * 2;
                this.bgRect.width = clientWidth;
                this.bgRect.height = clientHeight;
                this.bgRect.x = (GameConfig.ScreenW - clientWidth) / 2
                this.bgRect.y = (GameConfig.ScreenH - clientHeight) / 2
                this.addChildAt(this.bgRect, 0);
            }
            if (this.maskClickable) {
                this.addTapEvent(this.bgRect, this.close)
            }
        }

        public show(animationType: number, callback?: Function) {
            if (!this.isViewCreated) {
                this.needShow = true;
                this.animationType = animationType;
                this.callback = callback;
                return;
            }

            var _type = animationType;

            // this.bPlayShow = true;
            // this.groupContent.touchEnabled = false;
            // var callback = function() 
            // {
            //     dialog.onShowEnd();
            //     // thisObj.groupContent.touchEnabled = false;
            // }
            switch (_type) {
                case EDialog.show_ani_type_null:
                    var dialog = this;
                    dialog.anchorOffsetX = dialog.width * 0.5;
                    dialog.anchorOffsetY = dialog.height * 0.5;
                    dialog.x = 0.5 * GameConfig.ScreenW;
                    dialog.y = 0.5 * GameConfig.ScreenH;
                    break;
                case EDialog.show_ani_type_ZoomIn:
                    this.playAnimationZoomIn();
                    break;
                case EDialog.show_ani_type_MoveDown:
                    this.playMoveDown();
                    break;
                case EDialog.show_ani_type_MoveFromLeft:
                    this.playMoveFromLeft();
                    break;
                // case EDialog.show_ani_type_ZoomOut:
                //     this.playZoomOut();
                // break;
                // case 5:
                //     this.playAniamtionJump(callback);
                //     break;
            }
        }

        private playAnimationZoomIn() {
            var dialog = this;
            var zoomDuration = 300;
            dialog.scaleX = 0;
            dialog.scaleY = 0;
            dialog.anchorOffsetX = dialog.width * 0.5;
            dialog.anchorOffsetY = dialog.height * 0.5;
            dialog.x = 0.5 * GameConfig.ScreenW;
            dialog.y = 0.5 * GameConfig.ScreenH;
            var tween: egret.Tween = egret.Tween.get(dialog);
            tween.to({ scaleX: 1, scaleY: 1 }, zoomDuration, egret.Ease.quadIn);
            // tween.wait(200);
            // tween.call(callback);
        }

        private playAnimationExitJump(callback: Function) {
            // var tween = egret.Tween.get(this.groupContent);
            // var durationJump = 500;
            // tween.to({ y: utils.GameUtils.getScreenHeight()},
            //     durationJump,egret.Ease.getPowIn(3));
            // tween.call(callback);
        }

        private playAniamtionJump(callback: Function) {
            var dialog = this;
            dialog.anchorOffsetX = dialog.width * 0.5;
            dialog.anchorOffsetY = dialog.height * 0.5;
            var offsetY = -30;
            var durationJump = 400;
            var durationSwing = 20;
            // this.groupContent.y = utils.GameUtils.getScreenHeight();

            var tween: egret.Tween = egret.Tween.get(dialog);
            tween.to({ y: 0 + offsetY }, durationJump + durationSwing);
            tween.to({ y: 0 - offsetY }, 2 * durationSwing);
            tween.to({ y: 0 }, durationSwing);
            tween.call(callback);
        }

        private playAnimationDrop() {
            var dialog = this;
            dialog.anchorOffsetX = dialog.width * 0.5;
            dialog.anchorOffsetY = dialog.height * 0.5;
            var dropDuration = 500;
            var upDuration = 50;
            var downDuration = 50;
            var disY = 30;
            var endY = 0;
            var jumpY = endY - disY;
            // this.groupContent.y = - utils.GameUtils.getScreenHeight();
            var tween: egret.Tween = egret.Tween.get(dialog);
            tween.to({ y: endY }, dropDuration, egret.Ease.quadIn);
            tween.to({ y: jumpY }, upDuration, egret.Ease.quadOut);
            tween.to({ y: endY }, downDuration, egret.Ease.quadIn);
            // tween.wait(200);
            // tween.call(callback);
        }

        private playMoveDown() {
            var dialog = this;
            var dropDuration = 200;
            dialog.anchorOffsetX = dialog.width * 0.5;
            dialog.anchorOffsetY = dialog.height * 0.5;

            dialog.x = 0.5 * GameConfig.ScreenW;
            dialog.y = -0.5 * GameConfig.ScreenH;

            var tween: egret.Tween = egret.Tween.get(dialog);
            tween.to({ y: 0.5 * GameConfig.ScreenH }, dropDuration, egret.Ease.getPowIn(2));
            // tween.wait(200);
            // tween.call(callback);
        }

        private playMoveFromLeft() {
            var dialog = this;
            var dropDuration = 200;
            dialog.anchorOffsetX = dialog.width * 0.5;
            dialog.anchorOffsetY = dialog.height * 0.5;

            dialog.x = -0.5 * GameConfig.ScreenW;
            dialog.y = 0.5 * GameConfig.ScreenH;

            var tween: egret.Tween = egret.Tween.get(dialog);
            tween.to({ x: 0.5 * GameConfig.ScreenW }, dropDuration, egret.Ease.getPowIn(2));
        }


        public onShowEnd() {

        }

        public getDialogUUID() {
            return this.dialogUUID
        }

        public clean()
        {
            this.close();
            super.clean();
        }

        public close() {
            EAppFacade.getInstance().removeCommand("panel", this.onEventHandler, this)
            DialogManager.getInstance().close(this);
        }
    }
}