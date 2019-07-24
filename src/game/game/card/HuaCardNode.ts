module game {
    export class HuaCardNode extends BaseCardNode {
        private params: any
        private face: eui.Image;
        private back: eui.Image;

        public constructor(params) {
            super(params.dir, params.cardValue, params.idx);
            this.params = params
            this.skinName = params.nodePath
        }

        public onCreateViewComplete(): void {
            super.onCreateViewComplete();
            var p = this.getPosition(this.dir, this.idx)
            this.x = p.x;
            this.y = p.y;
            this.resetSize(this.dir, this.params.idx)
            this.resetLocalZorder()
            this.changeCardBack()
        }

        private getPosition(dir, idx) {
            var mode_card_data = GameConst.CARD_DATA
            var offScaleOffy = 0
            var offScaleOffx = 0
            var offScale = 0
            if (GameUtils.is3dMode()) {
                mode_card_data = GameConst.CARD_3D_DATA
                offScale = GameConst.CARD_3D_DATA.HUA_CARD[dir].offScale
                offScaleOffx = GameConst.CARD_3D_DATA.HUA_CARD[dir].offScaleOffx
                offScaleOffy = GameConst.CARD_3D_DATA.HUA_CARD[dir].offScaleOffy
            }
            else {
                mode_card_data = GameConst.CARD_DATA
            }
            var perCardXOff = mode_card_data.HUA_CARD[dir].offx
            var perCardYOff = mode_card_data.HUA_CARD[dir].offy
            var px = perCardXOff * idx
            var py = perCardYOff * idx
            if (idx > 0) {
                py = py + idx * (idx - 1) * offScaleOffy / 2
                px = px + idx * (idx - 1) * offScaleOffx / 2
            }

            var startX = GameConst.GAME_ALL_CARD_NODE_POSITION.HUA_CARD[dir].x
            var startY = GameConst.GAME_ALL_CARD_NODE_POSITION.HUA_CARD[dir].y
            if (GameUtils.is3dMode() )
            {
                startX = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.HUA_CARD[dir].x
                startY = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.HUA_CARD[dir].y
            }
            return { x: px + startX - this.width/2, y: py + startY - this.height/2}
        }

        private changeCardFace()
        {
            //printInfo("创建花牌 %d",cardValue)
            if( this._value == 0 ){
                //printError("花牌数据错误 value:%s",self.cardValue)
                return
            }
            var cardFaceImgName = this.getCardFaceImgName(this._value)
            this.face.source = cardFaceImgName
        }

        private changeCardBack() {
            var cardBackName = ""
            if (GameUtils.is3dMode()) {
                var oriBackName = ""
                if (this.dir == GameConst.PLAY_DIR.right) {
                    oriBackName = "3d_left_showcard_1{0}_png"
                }
                else if (this.dir == GameConst.PLAY_DIR.left) {
                    oriBackName = "3d_left_showcard_1{0}_png"
                }
                else if (this.dir == GameConst.PLAY_DIR.up) {
                    var imgIdx = 1
                    if (this.idx <= 5)
                        imgIdx = this.idx
                    else
                        imgIdx = Math.max(1, 10 - this.idx + 1)

                    oriBackName = "3d_me_showcard_flower_" + imgIdx + "{0}_png"
                }
                else if (this.dir == GameConst.PLAY_DIR.down) {
                    var imgIdx = 1
                    if (this.idx <= 5)
                        imgIdx = this.idx
                    else
                        imgIdx = Math.max(1, 10 - this.idx + 1)

                    oriBackName = "3d_me_showcard_flower_" + imgIdx + "{0}_png"
                }
                cardBackName = GameUtils.getCardBack(oriBackName)
            }
            else {
                var oriBackName = ""
                if (this.dir == GameConst.PLAY_DIR.right)
                    oriBackName = "2dmj_card_side_face{0}_png"
                else if (this.dir == GameConst.PLAY_DIR.left)
                    oriBackName = "2dmj_card_side_face{0}_png"
                else if (this.dir == GameConst.PLAY_DIR.up)
                    oriBackName = "2dmj_card_top_face{0}_png"
                else if (this.dir == GameConst.PLAY_DIR.down)
                    oriBackName = "2dmj_card_top_face{0}_png"
                cardBackName = GameUtils.getCardBack(oriBackName)
            }
            this.back.source = cardBackName
        }

        public setCardValue(value) {
            super.setCardValue(value)
            this.changeCardFace()
            if(GameUtils.is3dMode() && (this.dir == GameConst.PLAY_DIR.up || this.dir == GameConst.PLAY_DIR.down)&& this.face != null)
            {
                var card_face_idx = this.idx + 5
                if(this.dir == GameConst.PLAY_DIR.up)
                {
                    card_face_idx = 20 - card_face_idx
                }
                this.face.rotation = 0
                this.face.skewX = GameConst.card_face_data_3d_up_down[card_face_idx]
                if(this.dir == GameConst.PLAY_DIR.up)
                {
                    this.face.rotation = 180
                }
            }
        }


        public resetSize(dir, idx) {
            if (!GameUtils.is3dMode()) {
                return
            }
            var mode_card_data = GameConst.CARD_DATA
            var offScale = 0
            if (GameUtils.is3dMode()) {
                mode_card_data = GameConst.CARD_3D_DATA
                offScale = GameConst.CARD_3D_DATA.HUA_CARD[dir].offScale
            }

            var scaleRatio = 1
            if (dir == GameConst.PLAY_DIR.right) {
                this.skewX = -3
                scaleRatio = Math.min(1, 1 + idx * offScale)
            }
            else if (dir == GameConst.PLAY_DIR.left) {
                scaleRatio = Math.min(1, 1 + (10 - idx) * offScale)
                this.skewX = 3
            }
            else if (dir == GameConst.PLAY_DIR.up) {
                scaleRatio = offScale
            }
            this.scaleX = this.scaleY = scaleRatio
        }

        private resetLocalZorder() {
            var dir = this.dir
            var index = this.idx
            if (dir == GameConst.PLAY_DIR.right) {
                this.parent.setChildIndex(this, 0)
            }
            else if (GameUtils.is3dMode() && (dir == GameConst.PLAY_DIR.down || dir == GameConst.PLAY_DIR.up)) {
                if (index >= 5) {
                    this.parent.setChildIndex(this, 0)
                }
            }
        }


    }
}