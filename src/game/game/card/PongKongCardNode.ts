module game {
    export class PongKongCardNode extends BaseCardNode {
        private Node1: eui.Group
        private Node2: eui.Group
        private Node3: eui.Group
        private Node4: eui.Group
        private Node5: eui.Group
        private Node6: eui.Group


        private back1: eui.Image;
        private back2: eui.Image;
        private back3: eui.Image;
        private back4: eui.Image;
        private back5: eui.Image;
        private back6: eui.Image;

        private face1: eui.Image;
        private face2: eui.Image;
        private face3: eui.Image;
        private face4: eui.Image;
        private face5: eui.Image;
        private face6: eui.Image;

        private anGangFace1: eui.Image;
        private anGangFace2: eui.Image;
        private anGangFace3: eui.Image;
        private anGangFace4: eui.Image;

        private pongKongData: PongKongData

        private childCardNodes: eui.Group[]
        private backs: eui.Image[]
        private anGangFaces: eui.Image[]
        private faces: eui.Image[]
        private pos: any
        //除了对面的碰杠牌，其他的缩放默认值为0.9
        private scale_ori = 1

        public constructor(nodePath, data, dir, idx, pos: any = null) {
            super(dir, 0, idx);
            this.skinName = nodePath
            this.pongKongData = data
            this.pos = pos
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete()
            this.childCardNodes = [this.Node1, this.Node2, this.Node3, this.Node4, this.Node5, this.Node6]
            this.backs = [this.back1, this.back2, this.back3, this.back4, this.back5, this.back6]
            this.anGangFaces = [this.anGangFace1, this.anGangFace2, this.anGangFace3, this.anGangFace4]
            for (var i = 0; i < this.anGangFaces.length; i++) {
                this.anGangFaces[i].visible = false;
            }
            this.faces = [this.face1, this.face2, this.face3, this.face4, this.face5, this.face6]
            if (this.dir == GameConst.PLAY_DIR.up && GameUtils.is3dMode()) {
                for (var i = 0; i < this.faces.length; i++) {
                    this.faces[i].rotation = GameConst.top_pongKong_face_rotation[i]
                }
            }
            var p = this.pos
            if (p == null) {
                p = this.getPosition(this.dir, this.idx, this.pongKongData.getProvideClientId())
            }
            this.x = p.x
            this.y = p.y
            if (this.dir != GameConst.PLAY_DIR.up) {
                this.scale_ori = 0.9
                this.scaleX = this.scaleY = this.scale_ori
            }
            this.setData(this.pongKongData)
            if (this.pongKongData.getStutre()) {
                this.flagTwoOrThreeCard()
            }
            this.resetSize(this.dir, this.idx)
            this.resetLocalZorder()
            // this.changeCardBack()
        }


        private resetSize(dir, idx) {
            if (!GameUtils.is3dMode()) {
                return
            }
            var mode_card_data = GameConst.CARD_3D_DATA
            var offScale = mode_card_data.PONG_KONG_CARD[dir].offScale
            if (GlobalData.gameData.isPlayBack()) {
                offScale = mode_card_data.PONG_KONG_CARD[dir].offScale
            }
            var scaleRatio = 1
            if (dir == GameConst.PLAY_DIR.up) {
                scaleRatio = offScale
            }
            else if (dir == GameConst.PLAY_DIR.left) {
                scaleRatio = 1 + (4 - idx) * offScale
            }
            else if (dir == GameConst.PLAY_DIR.right) {
                scaleRatio = 1 + idx * offScale
            }
            this.scaleX = this.scaleY = scaleRatio * this.scale_ori
        }

        public setData(data: PongKongData) {
            this.pongKongData = data

            var type = data.getType()
            var provideClientId = data.getProvideClientId()
            var cardValue = data.getValue()

            //printInfo("type",type)
            //printInfo("dir",this.dir,"proId",provideClientId,"r.",(this.dir - provideClientId)% 4)

            var showNodeIndexArr = [0]
            var hideNodeIndeArr = []

            //提供者 0 自家  1 左边玩家  2 对家  3 右边玩家
            var pDirValue = ((this.dir - provideClientId) + 4) % 4
            if (pDirValue == 0 || pDirValue == 2) {
                showNodeIndexArr.push(1)
                showNodeIndexArr.push(2)
                hideNodeIndeArr.push(4)
                hideNodeIndeArr.push(5)
            }
            else if (pDirValue == 3) {
                showNodeIndexArr.push(1)
                showNodeIndexArr.push(5)
                hideNodeIndeArr.push(4)
                hideNodeIndeArr.push(2)
            }
            else if (pDirValue == 1) {
                showNodeIndexArr.push(4)
                showNodeIndexArr.push(2)
                hideNodeIndeArr.push(1)
                hideNodeIndeArr.push(5)
            }

            for (var i = 0; i < this.faces.length; i++) {
                this.faces[i].source = this.getCardFaceImgName(cardValue)
            }

            if (type == GameConst.GAIN_TYPE.PONG) {
                hideNodeIndeArr.push(3)
                for (var i = 0; i < this.anGangFaces.length; i++) {
                    this.anGangFaces[i].visible = false
                }
            }
            else if (type == GameConst.GAIN_TYPE.Exposed || type == GameConst.GAIN_TYPE.PongKong || type == GameConst.GAIN_TYPE.ConcealedKong) {
                if (type == GameConst.GAIN_TYPE.ConcealedKong) {
                    showNodeIndexArr = [0, 1, 2, 3]
                    hideNodeIndeArr = [4, 5]
                }
                else {
                    showNodeIndexArr.push(3)
                }

                if (type == GameConst.GAIN_TYPE.ConcealedKong) {
                    for (var i = 0; i < this.anGangFaces.length; i++) {
                        if (i < this.anGangFaces.length - 1) {
                            this.anGangFaces[i].visible = true
                        } else {
                            this.anGangFaces[i].visible = false
                        }
                    }
                } else {
                    for (var i = 0; i < this.anGangFaces.length; i++) {
                        this.anGangFaces[i].visible = false
                    }
                }
            }
            for (var i = 0; i < showNodeIndexArr.length; i++) {
                this.childCardNodes[showNodeIndexArr[i]].visible = true
            }

            for (var i = 0; i < hideNodeIndeArr.length; i++) {
                this.childCardNodes[hideNodeIndeArr[i]].visible = false
            }
        }

        public changeCardFace() {
            this.setData(this.pongKongData)
        }

        private changeCardBack() {


            if (GameUtils.is3dMode()) {
                if (this.dir == GameConst.PLAY_DIR.down || this.dir == GameConst.PLAY_DIR.up) {
                    for (var i = 0; i < this.childCardNodes.length; i++) {
                        var backImgData = GameConst.pongKong_back_img_data[this.dir][this.idx][i]
                        if (this.backs[i] != null && backImgData[0] != null) {
                            this.backs[i].source = GameUtils.getCardBack(backImgData[0])
                        }

                        if (this.anGangFaces[i] != null && backImgData[1] != null) {
                            this.anGangFaces[i].source = GameUtils.getCardBack(backImgData[1])
                        }
                    }
                }
                else {
                    var oriBackName_1 = "3d_left_pair_1{0}_png"
                    var oriBackName_2 = "3d_left_pair_reverseside_1{0}_png"
                    var oriBackName_dao = "3d_left_pair_dao_1{0}_png"

                    for (var i = 0; i < this.childCardNodes.length; i++) {
                        if (this.backs[i] != null) {
                            if (i == 4 || i == 5) {
                                this.backs[i].source = GameUtils.getCardBack(oriBackName_dao)
                            } else {
                                this.backs[i].source = GameUtils.getCardBack(oriBackName_1)
                                if (this.anGangFaces[i] != null) {
                                    this.anGangFaces[i].source = GameUtils.getCardBack(oriBackName_2)
                                }
                            }
                        }
                    }

                }
            }

            else {
                var oriBackName_1 = ""
                var oriBackName_2 = ""
                var oriBackName_dao = ""
                if (this.dir == GameConst.PLAY_DIR.right) {
                    oriBackName_1 = "2dmj_card_side_face{0}_png"
                    oriBackName_2 = "2dmj_card_side_back{0}_png"
                    oriBackName_dao = "2dmj_card_top_face{0}_png"
                }
                else if (this.dir == GameConst.PLAY_DIR.left) {
                    oriBackName_1 = "2dmj_card_side_face{0}_png"
                    oriBackName_2 = "2dmj_card_side_back{0}_png"
                    oriBackName_dao = "2dmj_card_top_face{0}_png"
                }
                else if (this.dir == GameConst.PLAY_DIR.up) {
                    oriBackName_1 = "2dmj_card_top_face{0}_png"
                    oriBackName_2 = "2dmj_card_top_back{0}_png"
                    oriBackName_dao = "2dmj_card_side_face{0}_png"
                }
                else if (this.dir == GameConst.PLAY_DIR.down) {
                    oriBackName_1 = "2dmj_card_me_face_2{0}_png"
                    oriBackName_2 = "2dmj_card_me_back_2{0}_png"
                    oriBackName_dao = "2dmj_card_me_face_dao{0}_png"
                }


                for (var i = 0; i < this.childCardNodes.length; i++) {
                    if (i == 4 || i == 5) {
                        this.backs[i].source = GameUtils.getCardBack(oriBackName_dao)
                    }
                    else {
                        this.backs[i].source = GameUtils.getCardBack(oriBackName_1)
                        if (this.anGangFaces[i] != null) {
                            this.anGangFaces[i].source = GameUtils.getCardBack(oriBackName_2)
                        }

                    }
                }
            }
        }

        private getPosition(dir, idx, provideClientId) {
            var card_mode_data = GameConst.CARD_DATA
            var offScaleOffy = 0
            var offScaleOffx = 0
            if (GameUtils.is3dMode()) {
                card_mode_data = GameConst.CARD_3D_DATA
                offScaleOffy = GameConst.CARD_3D_DATA.PONG_KONG_CARD[dir].offScaleOffy
                offScaleOffx = GameConst.CARD_3D_DATA.PONG_KONG_CARD[dir].offScaleOffx
            }

            var perCardXOff = card_mode_data.PONG_KONG_CARD[dir].offx
            var perCardYOff = card_mode_data.PONG_KONG_CARD[dir].offy
            var totalXOff = perCardXOff * idx
            var totalYOff = perCardYOff * idx

            if (idx > 0) {
                totalYOff = totalYOff + idx * (idx - 1) * offScaleOffy / 2
                totalXOff = totalXOff + idx * (idx - 1) * offScaleOffx / 2
            }

            //提供者 0 自家  1 左边玩家  2 对家  3 右边玩家
            var pDirValue = (this.dir - provideClientId) % 4
            if (pDirValue == 0 || pDirValue == 2) {

            }
            else if (pDirValue == 1) {
                totalXOff = totalXOff + card_mode_data.PONG_KONG_CARD[dir].dirOffx
                totalYOff = totalYOff + card_mode_data.PONG_KONG_CARD[dir].dirOffy
            }
            else if (pDirValue == 3) {
                totalXOff = totalXOff - card_mode_data.PONG_KONG_CARD[dir].dirOffx
                totalYOff = totalYOff - card_mode_data.PONG_KONG_CARD[dir].dirOffy
            }

            var startX = GameConst.GAME_ALL_CARD_NODE_POSITION.PONG_KONG_NODE[dir].x
            var startY = GameConst.GAME_ALL_CARD_NODE_POSITION.PONG_KONG_NODE[dir].y
            if (GameUtils.is3dMode()) {
                startX = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.PONG_KONG_NODE[dir].x
                startY = GameConst.GAME_ALL_CARD_NODE_POSITION_3D.PONG_KONG_NODE[dir].y
            }
            return { x: totalXOff + startX - this.width / 2, y: totalYOff + startY - this.height / 2 }
        }


        public getData() {
            return this.pongKongData
        }

        public getCardValue() {
            return this.pongKongData.getValue()
        }

        public flagSameValueCard() {
            // var flagSet = []
            for (var i = 0; i < this.childCardNodes.length; i++) {
                if (this.pongKongData.getType() != GameConst.GAIN_TYPE.ConcealedKong || i == 5) {
                    // var isLie = (i == 4 || i == 5)
                    // var maskImgName = this.getFlagMaskImgName(isLie)
                    // var zhezhao = new eui.Image(maskImgName)
                    // zhezhao.x = 0;
                    // zhezhao.y = 0;
                    // this.childCardNodes[i].addChild(zhezhao)
                    // flagSet.push(zhezhao)
                    Utils.setObjColor(this.childCardNodes[i], 0x86EBE6)
                }
            }
            // return flagSet
        }

        private clearFlagSameValueCard() {
            for (var i = 0; i < this.childCardNodes.length; i++) {
                if (this.pongKongData.getType() != GameConst.GAIN_TYPE.ConcealedKong || i == 5) {
                    if (this.pongKongData.getStutre()) {
                        Utils.setObjColor(this.childCardNodes[i], 0xE9A5A9)
                    }
                    else {
                        Utils.clearObjColor(this.childCardNodes[i])
                    }
                }
            }
        }

        public flagTwoOrThreeCard() {
            for (var i = 0; i < this.childCardNodes.length; i++) {
                if (this.pongKongData.getType() != GameConst.GAIN_TYPE.ConcealedKong || i == 5) {
                    Utils.setObjColor(this.childCardNodes[i], 0xE9A5A9)
                }
            }
        }

        public ClearTwoOrThreeCard() {
            for (var i = 0; i < this.childCardNodes.length; i++) {
                if (this.pongKongData.getType() != GameConst.GAIN_TYPE.ConcealedKong || i == 5) {
                    Utils.clearObjColor(this.childCardNodes[i])
                }
            }
        }

        public resetLocalZorder() {
            if (this.dir == GameConst.PLAY_DIR.right) {
                this.parent.setChildIndex(this, 5 - this.idx)
            }
        }
    }
}