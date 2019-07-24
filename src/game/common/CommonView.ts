module game {
    export class CommonView {
        private static waiting: CommonWaiting
        public static broadcast:Broadcast;
        public static showWaiting() {
            if (CommonView.waiting == null) {
                CommonView.waiting = new CommonWaiting()
            }
            var layer: egret.DisplayObjectContainer = Main.instance.confirmDialogLayer;
            CommonView.waiting.show(layer);
        }


        public static hideWaiting() {
            if (CommonView.waiting == null) {
                return
            }
            CommonView.waiting.hide();
        }

        public static showToast(info: string) {
            var toastView = new Toast();
            // SceneManager.getInstance().curScene.addChild(toastView);
            Main.instance.toastLayer.addChild(toastView);
            toastView.showText(info);
        }


        public static showBroadcast(msg = null) {
            if (this.broadcast == null) {
                CommonView.broadcast = new Broadcast()
                CommonView.broadcast.visible = false
            }

            if (CommonView.broadcast.parent == null ){
                SceneManager.getInstance().curScene.addChild(CommonView.broadcast)
            }

            if (msg) {
                CommonView.broadcast.addMsg(msg)
            }

            if (SceneManager.getInstance().curScene.getIndex() == Constants.SCENE_INDEX.MAIN) {
                CommonView.broadcast.show()
            }
        }

        public static hideBroadcast()
        {
            if (CommonView.broadcast != null) {
                CommonView.broadcast.parent.removeChild(CommonView.broadcast)
                CommonView.broadcast = null
            }
        }

    }
}