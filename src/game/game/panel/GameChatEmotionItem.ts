module game
{
    export class GameChatEmotionItem extends EComponent
    {
        private emotion1:GameChatEmotion
        private emotion2:GameChatEmotion
        private emotion3:GameChatEmotion
        private emotionSet:GameChatEmotion[]

        private itemData:any
        public constructor(itemData)
        {
            super();
            this.itemData = itemData
            this.skinName = "resource/skins/game/panel/GameChatBoxEmotionItemSkin.exml"
            
        }

        public onCreateViewComplete(): void {
            super.onCreateViewComplete();
            this.emotionSet = [this.emotion1,this.emotion2,this.emotion3]
            for(var i = 0;i < this.emotionSet.length;i++)
            {
                this.emotionSet[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBeginEvent,this)
                this.emotionSet[i].addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchEndEvent,this)
                this.emotionSet[i].addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndEvent,this)
                this.emotionSet[i].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEndEvent,this)
                this.emotionSet[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendMsg,this)
            }
            this.updateUI();
        }

        private sendMsg(e:egret.TouchEvent)
        {
            var curTarget = e.currentTarget
            if(curTarget instanceof GameChatEmotion)
            {
                curTarget.sendMsg()
            }
        }

        private touchBeginEvent(e:egret.TouchEvent)
        {
            var curTarget = e.currentTarget
            if(curTarget instanceof GameChatEmotion)
            {
                curTarget.setSelected(true)
            }
        }

        private touchEndEvent(e:egret.TouchEvent)
        {
            var curTarget = e.currentTarget
            if(curTarget instanceof GameChatEmotion)
            {
                curTarget.setSelected(false)
            }
        }


        public setData(itemData) {
            this.itemData = itemData;
            this.updateUI();
        }

        public updateUI_() {
            for(var i = 0;i < this.emotionSet.length;i++)
            {
                var tempData = this.itemData[i]
                if(tempData == null)
                {
                    this.emotionSet[i].visible = false;
                }else
                {
                    this.emotionSet[i].setData(tempData)
                }
            }
        }

    }
}