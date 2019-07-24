module game {
    export class OutCardNode extends BaseCardNode {
        private face: eui.Image;
        private back: eui.Image;
        private pos: any = null
        private two_player_back_data: number[] = [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0, 9, 8, 7, 6]


        private perLineNum: number = 0;
        private maxLine: number = 0;
        private floorMaxNum: number = 0;
        private idxInLine: number = 0;
        private lineIdx: number = 0;
        private floorIdx: number = 0;
        public constructor(nodePath, cardValue, dir, index, pos: any = null) {
            super(dir, cardValue, index);
            this.skinName = nodePath
            LogUtils.info("OutCardNode skinName" + this.skinName)
            this.pos = pos
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete()
            this.initData();
            var p = this.pos
            if (this.pos == null) {
                p = this.getOutCardPosition(this.dir, this.idx)
            }
            this.x = p.x;
            this.y = p.y;
            this.resetSize(this.dir, this.idx)
            this.resetLocalZorder()
            this.changeCardBack()
            this.resetCardFace()
        }

        private resetCardFace()
        {
            if(GameUtils.is3dMode() && (this.dir == GameConst.PLAY_DIR.up || this.dir == GameConst.PLAY_DIR.down)&& this.face != null)
            {
                var playNumber = GlobalData.gameData.getCurPlayerNum()
                var card_face_idx = this.idxInLine
                if(playNumber != 2)
                {
                    card_face_idx = this.idxInLine + 5
                }
                if(this.dir == GameConst.PLAY_DIR.up)
                {
                    card_face_idx = GameConst.card_face_data_3d_up_down.length - card_face_idx
                }
                this.face.skewX = GameConst.card_face_data_3d_up_down[card_face_idx]

                if(this.dir == GameConst.PLAY_DIR.up)
                {
                    this.face.rotation = 180
                }
            }
        }

        private initData() {
            var mode_card_data = GameConst.CARD_DATA
            if (GameUtils.is3dMode()) {
                mode_card_data = GameConst.CARD_3D_DATA
            }

            var playNumber = GlobalData.gameData.getCurPlayerNum()
            this.perLineNum = mode_card_data.OUT_CARD[this.dir].perlineNum
            this.maxLine = mode_card_data.OUT_CARD[this.dir].maxLine
            if (playNumber == 2) //二人麻将时
            {
                this.perLineNum = 20
                this.maxLine = 2
            }

            this.floorMaxNum = this.perLineNum * this.maxLine
            LogUtils.info(Utils.format("getOutCardPosition dir {0},idx {1}", this.dir, this.idx))
            this.idxInLine = (this.idx % this.perLineNum) + 1 //列索引
            this.lineIdx = Math.floor((this.idx / this.perLineNum)) //行索引
            this.floorIdx = Math.floor(this.lineIdx / this.maxLine) // 叠加层索引
            this.lineIdx = this.lineIdx - this.floorIdx * this.maxLine
        }

        public setCardValue(value) {
            super.setCardValue(value)
            this.changeCardFace()
        }

        public changeCardFace()
        {
            var faceCardImgName = this.getCardFaceImgName(this._value)
            this.face.source = faceCardImgName
        }


        private resetSize(dir, idx) {
            if (!GameUtils.is3dMode()) {
                return
            }
            var mode_card_data = GameConst.CARD_3D_DATA
            var offScale = mode_card_data.OUT_CARD[dir].offScale

            var playNumber = GlobalData.gameData.getCurPlayerNum()
            if (GameUtils.is3dMode() && playNumber == 2) {
                offScale = mode_card_data.OUT_CARD[dir].offScale_2_PLAYER
            }

            var scaleRatio = 1
            if (dir == GameConst.PLAY_DIR.right) {
                scaleRatio = 1 + (this.idxInLine - 1) * offScale[0]
            }
            else if (dir == GameConst.PLAY_DIR.left) {
                scaleRatio = 1 + (this.perLineNum - this.idxInLine) * offScale[0]
            }
            else if (dir == GameConst.PLAY_DIR.down) {
                scaleRatio = offScale[this.lineIdx % this.maxLine]
            }
            else if (dir == GameConst.PLAY_DIR.up) {
                scaleRatio = offScale[this.lineIdx % this.maxLine]
            }
            this.scaleX = this.scaleY = scaleRatio
        }


        private getOutCardPosition(dir, idx) {
            var mode_card_data = GameConst.CARD_DATA

            var scale = 1
            var offScaleOffy = 0
            var offScaleOffx = 0
            var playNumber = GlobalData.gameData.getCurPlayerNum()
            if (GameUtils.is3dMode()) {
                mode_card_data = GameConst.CARD_3D_DATA
                var lineNum = this.lineIdx
                var offScale = GameConst.CARD_3D_DATA.OUT_CARD[dir].offScale

                if (dir == GameConst.PLAY_DIR.down || dir == GameConst.PLAY_DIR.up) {
                    if (playNumber == 2) {
                        offScale = GameConst.CARD_3D_DATA.OUT_CARD[dir].offScale_2_PLAYER
                    }
                    scale = offScale[lineNum % this.maxLine]
                }

                offScaleOffy = GameConst.CARD_3D_DATA.OUT_CARD[dir].offScaleOffy
                offScaleOffx = GameConst.CARD_3D_DATA.OUT_CARD[dir].offScaleOffx
            }

            var secondLineXOff = mode_card_data.OUT_CARD[dir].secondLineXOff
            var secondLineYOff = mode_card_data.OUT_CARD[dir].secondLineYOff
            if (playNumber == 2 && GameUtils.is3dMode()) {
                secondLineXOff = GameConst.CARD_3D_DATA.OUT_CARD[dir].secondLineXOff_2_PLAYER
                secondLineYOff = GameConst.CARD_3D_DATA.OUT_CARD[dir].secondLineYOff_2_PLAYER
            }
            var perCardXOff = mode_card_data.OUT_CARD[dir].offx
            var perCardYOff = mode_card_data.OUT_CARD[dir].offy
            //自家和对家的打出牌面之间的X轴间距需要通过缩放比例乘以原始间距
            if (dir == GameConst.PLAY_DIR.down || dir == GameConst.PLAY_DIR.up) {
                perCardXOff = perCardXOff * scale
            }

            var multiLineXOff = mode_card_data.OUT_CARD[dir].multiLineXOff
            var multiLineYOff = mode_card_data.OUT_CARD[dir].multiLineYOff

            var multiLineXOff_ = 0
            var multiLineYOff_ = 0
            var secondLineXOff_ = 0
            var secondLineYOff_ = 0

            if (this.floorIdx > 0) {
                multiLineXOff_ = multiLineXOff * this.floorIdx
                multiLineYOff_ = multiLineYOff * this.floorIdx
            }

            if (this.lineIdx >= 1) {
                secondLineXOff_ = secondLineXOff
                secondLineYOff_ = secondLineYOff
                if (GameUtils.is3dMode()) {
                    if (this.dir == GameConst.PLAY_DIR.right) {
                        perCardXOff = -5.5
                        offScaleOffx = 0.18
                    } else if (this.dir == GameConst.PLAY_DIR.left) {
                        perCardXOff = -5
                        offScaleOffx = -0.12
                    }
                }
            }

            var totalXOff = 0
            var totalYOff = 0
            totalXOff = perCardXOff * (this.idxInLine - 1)
            totalYOff = perCardYOff * (this.idxInLine - 1)


            totalXOff = totalXOff + multiLineXOff_ + secondLineXOff_
            totalYOff = totalYOff + multiLineYOff_ + secondLineYOff_

            if (this.idxInLine - 1 > 0) {
                totalYOff = totalYOff + (this.idxInLine - 1) * (this.idxInLine - 2) * offScaleOffy / 2
                totalXOff = totalXOff + (this.idxInLine - 1) * (this.idxInLine - 2) * offScaleOffx / 2
            }
            var startX = 0
            var startY = 0
            var playNumber = GlobalData.gameData.getCurPlayerNum()
            if (playNumber == 2) {
                startX = GameConst.GAME_ALL_CARD_NODE_POSITION.OUT_CARD_2PLAYERS[dir].x
                startY = GameConst.GAME_ALL_CARD_NODE_POSITION.OUT_CARD_2PLAYERS[dir].y
                if (GameUtils.is3dMode()) {
                    startX = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.OUT_CARD_2PLAYERS[dir].x
                    startY = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.OUT_CARD_2PLAYERS[dir].y
                }
            } else {
                startX = GameConst.GAME_ALL_CARD_NODE_POSITION.OUT_CARD[dir].x
                startY = GameConst.GAME_ALL_CARD_NODE_POSITION.OUT_CARD[dir].y
                if (GameUtils.is3dMode()) {
                    startX = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.OUT_CARD[dir].x
                    startY = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.OUT_CARD[dir].y
                }
            }
            return { x: totalXOff + startX - this.width / 2, y: totalYOff + startY - this.height / 2 }
        }

        private changeCardBack() {
            var oriBackName = ""
            var cardBackName = ""
            this.back.scaleX = 1
            if (GameUtils.is3dMode()) {
                if (this.dir == GameConst.PLAY_DIR.right)
                {
                    oriBackName = "3d_left_showcard_1{0}_png"
                    this.back.scaleX = -1
                }
                else if (this.dir == GameConst.PLAY_DIR.left)
                {
                    oriBackName = "3d_left_showcard_1{0}_png"
                }
                else if (this.dir == GameConst.PLAY_DIR.up) {
                    var playNumber = GlobalData.gameData.getCurPlayerNum()
                    var back_data_idx = this.idxInLine
                    if (playNumber == 2)
                    {
                        back_data_idx = this.idxInLine
                    }
                    else
                    {
                        back_data_idx = this.idxInLine - 1 + 5
                    }
                    oriBackName = "3d_me_showcard_flower_" + this.two_player_back_data[20 - back_data_idx] + "{0}_png"
                    LogUtils.info("up oriBackName "+ oriBackName)
                    if(this.idxInLine < this.perLineNum/2)
                    {
                        this.back.scaleX = -1
                    }
                }
                else if (this.dir == GameConst.PLAY_DIR.down) {
                    var playNumber = GlobalData.gameData.getCurPlayerNum()
                    var back_data_idx = this.idxInLine
                    if (playNumber == 2)
                    {
                        back_data_idx = this.idxInLine
                    }
                    else
                    {
                        back_data_idx = this.idxInLine - 1 + 5
                    }
                    oriBackName = "3d_me_showcard_flower_" + this.two_player_back_data[back_data_idx] + "{0}_png"
                    LogUtils.info("down oriBackName "+ oriBackName)
                    if(this.idxInLine >= this.perLineNum/2)
                    {
                        this.back.scaleX = -1
                    }
                }

                cardBackName = GameUtils.getCardBack(oriBackName)
            }
            else {
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


        public flagSameValueCard() {
            Utils.setObjColor(this, 0x86EBE6)
        }

        public clearFlagSameValueCard() {
            Utils.clearObjColor(this);
        }


        private resetLocalZorder() {
            var zorder = this.idx
            var dir = this.dir
            var index = this.floorIdx
            if (GameUtils.is3dMode()) {
                if (dir == GameConst.PLAY_DIR.right) {
                    zorder = 0
                    if (this.lineIdx > 0) {
                        zorder = zorder + this.perLineNum * this.lineIdx
                    }
                }
                else if (dir == GameConst.PLAY_DIR.down || dir == GameConst.PLAY_DIR.up) {
                    zorder = this.idxInLine
                    //控制第一行图层比第二行高
                    if (dir == GameConst.PLAY_DIR.down) {
                        zorder = zorder + this.perLineNum * (this.maxLine - this.lineIdx - 1)
                        LogUtils.info(Utils.format("idx {0} zorder{1} " ,this.idx,zorder))
                        if (this.idxInLine > this.perLineNum / 2) {
                            zorder = 0
                        }
                    }
                    else {
                        if (this.idxInLine > this.perLineNum / 2) {
                            zorder = 0
                        }
                        zorder = zorder + this.perLineNum * this.lineIdx
                    }
                    
                }
            }
            else {
                if (dir == GameConst.PLAY_DIR.down || dir == GameConst.PLAY_DIR.right) {
                    zorder = (this.floorMaxNum - index) % this.floorMaxNum
                }
            }

            if (this.idx >= this.floorMaxNum) 
            {
                if(dir == GameConst.PLAY_DIR.right)
                {
                    zorder = this.floorMaxNum
                }else
                {
                    zorder = zorder + this.floorMaxNum
                }
            }
            
            this.parent.setChildIndex(this, zorder)
        }
    }
}