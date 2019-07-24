module game
{
    export class GameSettleFanItem extends EComponent
    {
        private Group_fan1:eui.Group
        private Group_fan2:eui.Group
        private Group_fan3:eui.Group
        private Group_fanSet:eui.Group[]

        private Text_fan1:eui.Label;
        private Text_fan2:eui.Label;
        private Text_fan3:eui.Label;
        private Text_fanSet:eui.Label[];

        private data:any
        public constructor(data:any)
        {
            super();
            this.data = data
            this.skinName = "resource/skins/game/panel/GameSettleWinnerFanItemSkin.exml"
        }

        public onCreateViewComplete(): void {
            super.onCreateViewComplete();
            this.Text_fanSet = [this.Text_fan1,this.Text_fan2,this.Text_fan3]
            this.Group_fanSet = [this.Group_fan1,this.Group_fan2,this.Group_fan3]
            this.updateUI();
        }

        public setData(itemData) {
            this.data = itemData;
            this.updateUI();
        }

        public updateUI_() {
            for(var i = 0;i< this.Group_fanSet.length;i++)
            {
                if(this.data[i] == null)
                {
                    this.Group_fanSet[i].visible = false;
                }else
                {
                    this.Group_fanSet[i].visible = true;
                    this.Text_fanSet[i].text = this.data[i];
                }
            }
        }

    }
}