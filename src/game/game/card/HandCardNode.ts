module game {
    export class HandCardNode extends BaseCardNode {
        private cardLayer: game.GameCardLayer;
        private params: any;
        private tingFlag: eui.Image;
        private face: eui.Image;
        private back: eui.Image;
        private _canSelect: boolean = true
        private _beSelected: boolean = false


        public constructor(cardLayer: game.GameCardLayer, params: any) {
            super(params.dir, params.cardValue, params.idx);
            this.cardLayer = cardLayer;
            this.params = params

            this.skinName = params.nodePath;
        }

        public onCreateViewComplete(): void {
            super.onCreateViewComplete();
            this.init()
            this.changeCardBack()
            this.resetPosition(this.idx, this.params.actionType,true)

            // if (GlobalData.gameData.isPlayBack()) {
            //     if (this.dir == GameConst.PLAY_DIR.left || this.dir == GameConst.PLAY_DIR.right) {
            //         this.scaleX = 0.9
            //         this.scaleY = 0.9
            //     }
            // }
        }


        public setCardValue(cardV) {
            super.setCardValue(cardV);
            this._value = cardV
            if (this._value == 0 && (this.dir == GameConst.ME_DIR || GlobalData.gameData.isPlayBack())) {
                LogUtils.error("手牌数据错误 value:" + this._value)
                return
            }
            if (this._value != 0 && (this.dir == GameConst.ME_DIR || GlobalData.gameData.isPlayBack())) {
                var faceImgName = this.getCardFaceImgName(this._value)
                // sprite:loadTexture(faceImgName,UI_TEX_TYPE_PLIST)
                this.face.source = faceImgName
            }

            if(GameUtils.is3dMode() && GlobalData.gameData.isPlayBack() && this.dir == GameConst.PLAY_DIR.up && this.face != null)
            {
                var card_face_idx = Math.min(15,this.idx + 1 + 5) + this.cardLayer.getPongKongTotalCardNum(this.dir)
                this.face.rotation = 0
                this.face.skewX = GameConst.card_face_data_3d_up_down[20 - card_face_idx]
                if(this.dir == GameConst.PLAY_DIR.up)
                {
                    this.face.rotation = 180
                }
            }
        }

        // private getCardFaceImgName(value) {
        //     var imgName = ""
        //     if (this.dir == GameConst.PLAY_DIR.down) {
        //         imgName = Utils.format("meHand_{0}_png", Utils.getNumberFormatStr(value))
        //     }
        //     else if (this.dir == GameConst.PLAY_DIR.left || this.dir == GameConst.PLAY_DIR.right) {
        //         if (GlobalData.gameData.isPlayBack()) {
        //             imgName = Utils.format("leftDachu_{0}_png", Utils.getNumberFormatStr(value))
        //         }
        //     }
        //     else if (this.dir == GameConst.PLAY_DIR.up) {
        //         if (GlobalData.gameData.isPlayBack()) {
        //             imgName = Utils.format("meDachu_{0}_png", Utils.getNumberFormatStr(value))
        //         }
        //     }
        //     // LogUtils.info("imgName " + imgName)
        //     return imgName
        // }

        public init() {
            this.setTingFlagVisible(false)
        }

        public setTingFlagVisible(value) {
            if (this.dir != GameConst.ME_DIR) {
                return
            }
            this.tingFlag.visible = value
        }

        private changeCardBack() {
            var cardBackName = ""
            if (GameUtils.is3dMode())
                if (GlobalData.gameData.isPlayBack()) {
                    if (this.dir == GameConst.PLAY_DIR.right) {
                        cardBackName = GameUtils.getCardBack("3d_left_pair_1{0}_png")
                    }
                    else if (this.dir == GameConst.PLAY_DIR.left) {
                        cardBackName = GameUtils.getCardBack("3d_left_pair_1{0}_png")
                    }
                    else if (this.dir == GameConst.PLAY_DIR.up) {
                        var imgIdx = 1
                        var temp_idx = this.cardLayer.getPongKongTotalCardNum(this.dir) + this.idx + 1
                        if (temp_idx <= 5) {
                            imgIdx = temp_idx
                        }
                        else {
                            imgIdx = Math.max(1, 10 - temp_idx + 1)
                        }
                        var scaleX = 1
                        cardBackName = GameUtils.getCardBack("3d_me_showcard_flower_" + imgIdx + "{0}_png")
                        LogUtils.info(Utils.format("dir {0} name: {1}",this.idx,cardBackName))
                        if(temp_idx < 5 )
                        {
                           scaleX = -1 
                        }
                        this.back.scaleX = scaleX
                    }
                    else if (this.dir == GameConst.PLAY_DIR.down) {
                        cardBackName = GameUtils.getCardBack("3d_me_hand{0}_png")
                    }
                }
                else {
                    if (this.dir == GameConst.PLAY_DIR.down) {
                        cardBackName = GameUtils.getCardBack("3d_me_hand{0}_png")
                    }
                    else if (this.dir == GameConst.PLAY_DIR.left) {
                        cardBackName = GameUtils.getCardBack("3d_left_hand_1{0}_png")
                    }
                    else if (this.dir == GameConst.PLAY_DIR.right) {
                        cardBackName = GameUtils.getCardBack("3d_left_hand_1{0}_png")
                    }
                    else if (this.dir == GameConst.PLAY_DIR.up) {
                        cardBackName = GameUtils.getCardBack("3d_up_hand{0}_png")
                    }
                }
            else {
                if (GlobalData.gameData.isPlayBack()) {
                    if (this.dir == GameConst.PLAY_DIR.right)
                        cardBackName = GameUtils.getCardBack("2dmj_card_side_face{0}_png")
                    else if (this.dir == GameConst.PLAY_DIR.left)
                        cardBackName = GameUtils.getCardBack("2dmj_card_side_face{0}_png")
                    else if (this.dir == GameConst.PLAY_DIR.up)
                        cardBackName = GameUtils.getCardBack("2dmj_card_top_face{0}_png")
                    else if (this.dir == GameConst.PLAY_DIR.down)
                        cardBackName = GameUtils.getCardBack("2dmj_card_me_stand_1{0}_png")
                }
                else {
                    if (this.dir == GameConst.PLAY_DIR.down)
                        cardBackName = GameUtils.getCardBack("2dmj_card_me_stand_1{0}_png")
                    else if (this.dir == GameConst.PLAY_DIR.left)
                        cardBackName = GameUtils.getCardBack("2dmj_card_side_stand{0}_png")
                    else if (this.dir == GameConst.PLAY_DIR.right)
                        cardBackName = GameUtils.getCardBack("2dmj_card_side_stand{0}_png")
                    else if (this.dir == GameConst.PLAY_DIR.up)
                        cardBackName = GameUtils.getCardBack("2dmj_card_top_stand{0}_png")
                }
            }
            this.back.source = cardBackName
        }

        public isSelected() {
            return this._beSelected
        }

        public setSelect(value) {
            this._beSelected = value;
            if (this._beSelected) {
                this.y = GameConst.GAME_ALL_CARD_NODE_POSITION.HAND_CARD[this.dir].y - this.height/2 - 30
            } else {
                this.y = GameConst.GAME_ALL_CARD_NODE_POSITION.HAND_CARD[this.dir].y - this.height/2
            }
        }

        public canSelect() {
            return this._canSelect;
        }

        private getHandCardPosition(dir: number, idx: number) {
            var mode_card_data = GameConst.CARD_DATA
            var offScaleOffy = 0
            var offScaleOffx = 0
            if (GameUtils.is3dMode()) {
                mode_card_data = GameConst.CARD_3D_DATA
                offScaleOffy = GameConst.CARD_3D_DATA.HAND_CARD[dir].offScaleOffy
                offScaleOffx = GameConst.CARD_3D_DATA.HAND_CARD[dir].offScaleOffx
            }
            var perCardXOff = mode_card_data.HAND_CARD[dir].offx
            var perCardYOff = mode_card_data.HAND_CARD[dir].offy
            var gapOffx = mode_card_data.HAND_CARD[dir].gapLastX
            var gapOffy = mode_card_data.HAND_CARD[dir].gapLastY
            if (GlobalData.gameData.isPlayBack()) {
                perCardXOff = mode_card_data.HAND_CARD[dir].playBackOffx
                perCardYOff = mode_card_data.HAND_CARD[dir].playBackOffy
                gapOffx = mode_card_data.HAND_CARD[dir].gapPlayBackLastX
                gapOffy = mode_card_data.HAND_CARD[dir].gapPlayBackLastY

                if (GameUtils.is3dMode()) {
                    offScaleOffy = GameConst.CARD_3D_DATA.HAND_CARD[dir].offPlayBackScaleOffy
                    offScaleOffx = GameConst.CARD_3D_DATA.HAND_CARD[dir].offPlayBackScaleOffx
                }
            }

            idx = this.cardLayer.getPongKongTotalCardNum(dir) + idx
            var totalXOff = perCardXOff * idx
            var totalYOff = perCardYOff * idx
            if (dir == GameConst.PLAY_DIR.left) {
                perCardYOff = perCardYOff + GameConst.perPlayerTotalCardNum * - offScaleOffy
                totalYOff = idx * perCardYOff
            }
            if (idx > 0) {
                totalYOff = totalYOff + idx * (idx - 2) * offScaleOffy / 2
                totalXOff = totalXOff + idx * (idx - 2) * offScaleOffx / 2
            }
            if (GameConst.perPlayerTotalCardNum == idx + 1) {
                totalXOff = totalXOff + gapOffx
                totalYOff = totalYOff + gapOffy
            }
            var startX = GameConst.GAME_ALL_CARD_NODE_POSITION.HAND_CARD[dir].x
            var startY = GameConst.GAME_ALL_CARD_NODE_POSITION.HAND_CARD[dir].y
            if (GameUtils.is3dMode())
            {
                startX = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.HAND_CARD[dir].x
                startY = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.HAND_CARD[dir].y
            }
            return { x: totalXOff + startX - this.width/2, y: totalYOff + startY - this.height/2}
        }

        private showSideCardEffect(value) {

        }



        public resetSize(dir, idx) {
            if (!GameUtils.is3dMode()) {
                return
            }
            var mode_card_data = GameConst.CARD_3D_DATA
            var offScale = mode_card_data.HAND_CARD[dir].offScale
            var orignalScale = 1
            if (GlobalData.gameData.isPlayBack()) {
                offScale = mode_card_data.HAND_CARD[dir].offPlayBackScale
                if (dir == GameConst.PLAY_DIR.left || dir == GameConst.PLAY_DIR.right) {
                    orignalScale = 1.16
                }

                if (dir == GameConst.PLAY_DIR.right) {
                    this.skewX = 2
                }
                else if (dir == GameConst.PLAY_DIR.left) {
                    this.skewX = -2
                }
            }
            idx = this.cardLayer.getPongKongTotalCardNum(dir) + idx
            var scaleRatio = orignalScale
            if (dir == GameConst.PLAY_DIR.right) {
                scaleRatio = scaleRatio + (idx - 1) * offScale
            }
            else if (dir == GameConst.PLAY_DIR.left) {
                scaleRatio = scaleRatio + (GameConst.perPlayerTotalCardNum - (idx - 1)) * offScale
            }
            else if (dir == GameConst.PLAY_DIR.up) {
                scaleRatio = scaleRatio + offScale
            }
            this.scaleX = this.scaleY = scaleRatio
        }


        public resetPosition(posIndex: number, trasitionType: number = 0, firstInit: boolean = false) {

            //对方手牌回放的时候需要重置csb文件为当前位置的csb
            this.idx = posIndex
            if (GameUtils.is3dMode() && !firstInit && GlobalData.gameData.isPlayBack() && this.dir == GameConst.PLAY_DIR.up) {
                var nodePath = Constants.UI_GAME_CSB_PATH + GameConst.CARD_3D_DATA.HAND_CARD[this.dir].playBackPath
                var temp_posIndex = this.cardLayer.getPongKongTotalCardNum(this.dir) + posIndex
                temp_posIndex = Math.min(temp_posIndex, 10)

                nodePath = Utils.format(nodePath, temp_posIndex)
                this.skinName = nodePath
                this.setCardValue(this.getCardValue())
                this.changeCardBack()
            }

            this.resetSize(this.dir, posIndex)
            this.resetLocalZorder(firstInit)

            var p = this.getHandCardPosition(this.dir, posIndex)
            var drawSideCardIndex = this.cardLayer.getDrawCardIndex(this.dir)
            if (posIndex == drawSideCardIndex) {
                this.showSideCardEffect(true)
            } else {
                this.showSideCardEffect(false)
            }
            if (trasitionType > 0) {
                this._canSelect = false
                this.alpha = 1
                egret.Tween.removeTweens(this)
            }


            if (trasitionType == GameConst.HAND_CARD_ACTION_TYPE.MOVE_HORIZONTAL) {
                var tw = egret.Tween.get(this, { loop: false });
                tw.to({ x: p.x, y: p.y }, 100)
                tw.call(function () {
                    this._canSelect = true
                })
            }
            else if (trasitionType == GameConst.HAND_CARD_ACTION_TYPE.INSERT_DRAW_CARD) {

                var moveOffX = 0
                var moveOffY = 0

                if (GlobalData.gameData.isPlayBack()) {
                    if (this.dir == GameConst.ME_DIR) {
                        moveOffY = -GameConst.CARD_SIZE.HAND_CARD[this.dir].height_playBack
                    } else if (this.dir == GameConst.PLAY_DIR.up) {
                        moveOffY = GameConst.CARD_SIZE.HAND_CARD[this.dir].height_playBack
                    }
                    else if (this.dir == GameConst.PLAY_DIR.left) {
                        moveOffX = GameConst.CARD_SIZE.HAND_CARD[this.dir].width_playBack
                    }
                    else if (this.dir == GameConst.PLAY_DIR.right) {
                        moveOffX = -GameConst.CARD_SIZE.HAND_CARD[this.dir].width_playBack
                    }
                }
                else {
                    if (this.dir == GameConst.ME_DIR) {
                        moveOffY = -GameConst.CARD_SIZE.HAND_CARD[this.dir].height
                    }
                    else if (this.dir == GameConst.PLAY_DIR.up) {
                        moveOffY = GameConst.CARD_SIZE.HAND_CARD[this.dir].height
                    }
                    else if (this.dir == GameConst.PLAY_DIR.left) {
                        moveOffX = GameConst.CARD_SIZE.HAND_CARD[this.dir].width
                    }
                    else if (this.dir == GameConst.PLAY_DIR.right) {
                        moveOffX = -GameConst.CARD_SIZE.HAND_CARD[this.dir].width
                    }
                }
                var tw = egret.Tween.get(this, { loop: false });
                tw.to({ x: this.x + moveOffX, y: this.y + moveOffY }, 100)
                tw.to({ x: p.x + moveOffX, y: p.y + moveOffY }, 100)
                tw.to({ x: p.x, y: p.y }, 100)
                tw.call(function () {
                    this._canSelect = true
                })
            } else if (trasitionType == GameConst.HAND_CARD_ACTION_TYPE.DRAW_CARD_ME) {
                this.x = p.x
                this.y = p.y - 30
                this.alpha = 0.1
                var tw = egret.Tween.get(this, { loop: false });
                tw.to({ alpha: 1, x: p.x, y: p.y }, 10, egret.Ease.getPowIn(5))
                tw.call(function () {
                    this._canSelect = true
                })
            }
            else if (trasitionType == GameConst.HAND_CARD_ACTION_TYPE.DRAW_CARD_OTHER) {
                this.x = p.x;
                this.y = p.y;
                this.alpha = 0.1
                var tw = egret.Tween.get(this, { loop: false });
                tw.to({ alpha: 1, x: p.x, y: p.y }, 50)
                tw.call(function () {
                    this._canSelect = true
                })
            }
            else {
                this.x = p.x;
                this.y = p.y;
            }
        }


        private resetLocalZorder(initCard:boolean = false) {
            var dir = this.dir
            var index = this.idx
            var drawCardIndex = GameConst.perPlayerTotalCardNum - this.cardLayer.getPongKongTotalCardNum(dir)
            var orderIdx = this.idx
            if (dir == GameConst.PLAY_DIR.right) {
                orderIdx = drawCardIndex - index
                if (GlobalData.gameData.isPlayBack() || initCard)
                {
                    orderIdx = 0
                }
            }
            else if (dir == GameConst.PLAY_DIR.up)
            //对家回放时手牌从第7张开始 每张的图层级别要比后面的要小
            {
                if (GlobalData.gameData.isPlayBack()) {
                    var orderIndex = this.cardLayer.getPongKongTotalCardNum(dir) + index
                    if (orderIndex >= GameConst.perPlayerTotalCardNum / 2) {
                        orderIdx = drawCardIndex - orderIndex
                    }
                }
            }

            this.parent.setChildIndex(this, orderIdx)
        }

        private resetIdx(index) {
            this.idx = index
            this.resetLocalZorder()
        }

        private changeCardFace() {
            this.setCardValue(this.getCardValue())
        }
    }
}