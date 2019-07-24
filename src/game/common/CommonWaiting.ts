// TypeScript file
module game
{
    export class CommonWaiting extends game.EComponent
    {
        private waiting:egret.tween.TweenGroup;
        private background: eui.Rect;
        public constructor()
        {
            super();
            this.skinName = "resource/skins/common/LoadingSkin.exml"
        }

        public onCreateViewComplete():void
        {
			super.onCreateViewComplete()
            this.background = new eui.Rect();
            this.background.fillColor = 0x000000;
            this.background.alpha = 0.5;
            // var clientWidth = GameConfig.windowWidth_h5;
            var clientWidth = 1560;
            var clientHeight = GameConfig.windowHeight_h5;
            this.background.width = clientWidth;
            this.background.height = clientHeight;
            this.background.x = (GameConfig.ScreenW - clientWidth)/2
            this.background.y = (GameConfig.ScreenH - clientHeight)/2
            this.addChildAt(this.background,0);
		}

        public show(parent:egret.DisplayObjectContainer):void
        {
            parent.addChild(this)
            this.playAnimation(this.waiting,true)
        }

        public hide():void
        {
            this.waiting.pause()
            if(this.parent != null)
            {
                this.parent.removeChild(this)
            }
        }

        private playAnimation(target:egret.tween.TweenGroup,isLoop:boolean):void
        {
            if(isLoop)
            {
                for(var key in target.items)
                {
                    target.items[key].props = {loop:true};
                }
            }
            target.play();
        }

    }
}
