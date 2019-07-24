// TypeScript file
module game
{
    export class Broadcast extends EComponent
    {
        private labelScroller:eui.Scroller;
        private isWaiting = false
        private moveX = 0
        private scrollerGroup :eui.Group
        private curLabel:eui.Label;
        private curIndex = 1
        private curMsg;
        public constructor()
        {
            super();
            this.skinName = "resource/skins/common/Broadcast.exml";
        }

        public onCreateViewComplete()
        {
            this.initData();
            this.x = (GameConfig.ScreenW - this.width)/2
            this.y = 120
            this.scrollerGroup = new eui.Group();
            this.scrollerGroup.width = this.labelScroller.width
            this.scrollerGroup.height = this.labelScroller.height;
            this.labelScroller.viewport = this.scrollerGroup
            
        }

        private initData()
        {
            
        }

        public show()
        {
            if (this.isWaiting)
            {
                return
            }

            if (SceneManager.getInstance().curScene.getIndex() != Constants.SCENE_INDEX.MAIN)
            {
                this.visible = false;
                return
            }

            var msgNum = GlobalData.msgQueue.length
            if (msgNum <= 0)
            {
                 this.visible = false
                return
            }

            if (this.curIndex >= msgNum)
            {
                this.curIndex = 0
            }
            this.isWaiting = true
            this.visible = true
            this.curMsg = GlobalData.msgQueue[this.curIndex]
            this.curLabel = new eui.Label(this.curMsg.msg);
            this.curLabel.fontFamily = "fzzy"
            this.curLabel.size = 25
            this.scrollerGroup.addChild(this.curLabel)

            var startX =  this.labelScroller.width
            this.curLabel.x = startX
            this.curLabel.y = this.curLabel.height - this.labelScroller.height/2 
            var moveDisHorizontal = startX + this.curLabel.width

            var self = this
            var tween = egret.Tween.get(this.curLabel,{ loop: false })
            tween.to({ x: startX-moveDisHorizontal}, moveDisHorizontal*10)
            tween.call(function () {
                if (self.curMsg.needRunTimes != null && self.curMsg.needRunTimes != "undefined")
                {
                    if (self.curMsg.needRunTimes > 0)
                    {
                        self.curMsg.needRunTimes = self.curMsg.needRunTimes - 1
                        if (self.curMsg.needRunTimes == 0) 
                        {
                            GlobalData.msgQueue.splice(self.curIndex,1)
                        }
                        else
                        {
                            self.curIndex = self.curIndex + 1
                        }
                    }
                }
                else
                {
                    self.curIndex = self.curIndex + 1
                }
                self.isWaiting = false
                self.curLabel.parent.removeChild(self.curLabel)
                self.curLabel = null
                self.show()
            })
        }

        public removeBroadcast()
        {

        }

        public savePosition()
        {
        }


    public addMsg(data:any)
    {
        this.clearAllData()
        for (var i = 0; i < data.length;i++)
        {
            var tempData = data[i]
            var runTimes = tempData.runTimes
            if (runTimes > 0)
            {
                tempData.needRunTimes = tempData.runTimes
            }
            GlobalData.msgQueue.push(tempData)
        }
    }

    public clearAllData()
    {
        GlobalData.msgQueue = []
        if (this.curLabel)
        {
            egret.Tween.removeTweens(this.curLabel)
            this.curLabel.parent.removeChild(this.curLabel)
            this.curLabel = null
        }
        this.isWaiting = false
        this.curIndex = 1
    }

    }

}