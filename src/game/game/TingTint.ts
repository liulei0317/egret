module game {
    export class TingTint extends EComponent {

        private Image_bg: eui.Image

        private startX = 193
        private cardW = 109
        private cardGap = 10
        private originalWidth = 0
        private originalHeight = 0
        private curWidth = 0
        private curHeight = 0
        private cardNodeList: TingTintCard[] = []
        public constructor() {
            super();
            this.skinName = "resource/skins/game/gameTingTintSkin.exml"
            this.init()
        }

        public on() {
            super.onCreateViewComplete();
            this.init();
        }

        private init() {
            this.startX = 145
            this.cardW = 109
            this.cardGap = 10
            this.originalWidth = this.width
            this.originalHeight = this.height
            this.curWidth = this.originalWidth
            this.curHeight = this.originalHeight
            this.cardNodeList = []
        }

        public initData(data, px) {
            this.curWidth = this.originalWidth

            for (var i = 0; i < this.cardNodeList.length; i++) {
                this.cardNodeList[i].visible = false
            }

            var len = data.length
            var offx = this.cardW + this.cardGap

            for (var i = 0; i < len; i++) {
                var tempData = data[i]
                var cardNode = this.cardNodeList[i]
                if (cardNode == null) {
                    cardNode = new TingTintCard()
                    this.cardNodeList.push(cardNode)
                    this.addChild(cardNode)
                }
                else {
                    cardNode.visible = true
                }
                cardNode.setData(tempData)
                cardNode.x = this.startX + i  * offx
                cardNode.y = 23
                this.curWidth = this.curWidth + offx
            }

            this.Image_bg.width = this.curWidth
            this.Image_bg.height = this.curHeight

            var x = px - 75
            if (x < 10) {
                x = 10
            }


            if (x + this.curWidth > GameConfig.ScreenW - 10) {
                x = GameConfig.ScreenW - 10 - this.curWidth
            }
            this.x = x
            this.y = 400
        }


    }
}