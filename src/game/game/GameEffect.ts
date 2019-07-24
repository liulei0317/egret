module game {
    export class GameEffect {
        private effectGroup: eui.Group;
        // private operateArmature: dragonBones.EgretArmatureDisplay[]
        // private emotionArmature: dragonBones.EgretArmatureDisplay[]

        private markOutCardEffect: dragonBones.EgretArmatureDisplay
        private dirArrowEffect: dragonBones.EgretArmatureDisplay
        private dirArrow3dEffect: dragonBones.EgretArmatureDisplay

        public constructor(effectGroup: eui.Group) {
            this.effectGroup = effectGroup;
            this.init()
        }

        public init() {
            // this.operateArmature = []
            // this.emotionArmature = []
        }

        public playFireWorks(dir) {
            var index = GameConst.ACTION_DATA.FIREWORKS.index
            var data = GameConst.ACTION_DATA.FIREWORKS.data
            this.playOperateEffect(dir, index, data)
        }

        public playWin(dir, frameName: string) {
            if (frameName == GameConst.ACTION_WIN_ACTINDEX.gangkai)
            {
                SoundUtils.playEffectSoundNameBindPlayer(dir,CardCost.other.kongWin)
            }
            else if (frameName == GameConst.ACTION_WIN_ACTINDEX.dihu)
            {
                SoundUtils.playEffectSoundNameBindPlayer(dir,CardCost.other.diHu)
            }
            else if (frameName == GameConst.ACTION_WIN_ACTINDEX.hu)
            {
                SoundUtils.playEffectSoundNameBindPlayer(dir,CardCost.other.win)
            }
            else if(frameName == GameConst.ACTION_WIN_ACTINDEX.zimo) 
            {
                SoundUtils.playEffectSoundNameBindPlayer(dir,CardCost.other.ziMo)
            }
            else if(frameName == GameConst.ACTION_WIN_ACTINDEX.tianhu)
            {
                SoundUtils.playEffectSoundNameBindPlayer(dir,CardCost.other.tianHu)
            }

            var x = GameConst.ACTION_POSITION.OPERATE[dir].x
            var y = GameConst.ACTION_POSITION.OPERATE[dir].y
            var actionData = GameConst.ACTION_DATA.OPERATE.WIN.data
            this.playEffect(actionData,(arm:dragonBones.EgretArmatureDisplay):void=>{
                arm.x = x;
                arm.y = y;
                arm.animation.play(frameName, 1);
                this.effectGroup.addChild(arm);
            })
           
        }

        public playPong(dir) {
            SoundUtils.playEffectSoundNameBindPlayer(dir,CardCost.other.pong)
            SoundService.getInstance().playAudio("pen_s_mp3")
            var index = GameConst.ACTION_DATA.OPERATE.PONG.index
            var data = GameConst.ACTION_DATA.OPERATE.PONG.data
            this.playOperateEffect(dir, index, data)
        }

        public playHuaKong(dir) {
            SoundUtils.playEffectSoundNameBindPlayer(dir,CardCost.other.kong)
            var index = GameConst.ACTION_DATA.OPERATE.HUA_KONG.index
            var data = GameConst.ACTION_DATA.OPERATE.HUA_KONG.data
            this.playOperateEffect(dir, index, data)
        }

        public playSiFeng(dir) {
            var index = GameConst.ACTION_DATA.OPERATE.SIFENG.index
            var data = GameConst.ACTION_DATA.OPERATE.SIFENG.data
            this.playOperateEffect(dir, index, data)
        }
        
        public playBuHua(dir, defaultIndex?:number) {
            SoundUtils.playEffectSoundNameBindPlayer(dir,CardCost.other.buHua,defaultIndex)
            var index = GameConst.ACTION_DATA.OPERATE.BUHUA.index
            var actionData = GameConst.ACTION_DATA.OPERATE.BUHUA.data
            this.playOperateEffect(dir, index, actionData)
        }

        public playKong(dir) {
            SoundUtils.playEffectSoundNameBindPlayer(dir,CardCost.other.kong)
            SoundService.getInstance().playAudio("gang_s_mp3")
            var index = GameConst.ACTION_DATA.OPERATE.KONG.index
            var data = GameConst.ACTION_DATA.OPERATE.KONG.data
            this.playOperateEffect(dir, index, data)
        }

        public playPass(dir) {
            var index = GameConst.ACTION_DATA.OPERATE.PASS.index
            var data = GameConst.ACTION_DATA.OPERATE.PASS.data
            this.playOperateEffect(dir, index, data)
        }

        public playOperateEffect(dir, index, actionData, frameName: string = null) {
            this.playEffect(actionData,(arm:dragonBones.EgretArmatureDisplay):void=>{
                this.effectGroup.addChild(arm);
                var x = GameConst.ACTION_POSITION.OPERATE[dir].x
                var y = GameConst.ACTION_POSITION.OPERATE[dir].y
                arm.visible = true
                arm.x = x;
                arm.y = y;
                arm.addEventListener(dragonBones.EventObject.COMPLETE, ():void=> {
                    LogUtils.info("播放完成")
                    this.effectGroup.removeChild(arm)
                }, this);
                arm.animation.play(frameName, 1);
            })
        }

        public playEffect(actionData,successFunc?:Function) {
            var dbdata = RES.getRes(actionData.dragonbonesData);
            var texturedata = RES.getRes(actionData.textureData);
            var texture = RES.getRes(actionData.texture);

            if(dbdata == null)
            {
                console.log("dbdata null")
                RES.getResAsync(actionData.dragonbonesData,(data:any):void=>{
                    this.playEffect(actionData,successFunc)
                },this);
                return
            }else if (texturedata == null)
            {
                console.log("texturedata null")
                 RES.getResAsync(actionData.textureData,(data:any):void=>{
                    this.playEffect(actionData,successFunc)
                },this);
                return
            }else if (texture == null)
            {
                console.log("texture null")
                 RES.getResAsync(actionData.texture,(data:any):void=>{
                    this.playEffect(actionData,successFunc)
                },this);
                return
            }
            // var dbf: dragonBones.EgretFactory = new dragonBones.EgretFactory();
            // dbf.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dbdata));
            // dbf.addTextureAtlasData(dbf.parseTextureAtlasData(texturedata, texture));
            // var arm: dragonBones.EgretArmatureDisplay = dbf.buildArmatureDisplay("armatureName");

            let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
            if  (egretFactory.getDragonBonesData(actionData.name) == null)
            {
                 egretFactory.parseDragonBonesData(dbdata); 
                 egretFactory.parseTextureAtlasData(texturedata, texture); 
            }
            let arm: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(actionData.name);
            if(arm != null && successFunc != null)
            {
                successFunc(arm)
            }
        }

        public playDiscardEffect(dir, value) {
            var effectCard = new OutCardEffect(dir,value)
            this.effectGroup.addChild(effectCard)
        }

        public playShaiZi(finishCallBack?:Function) {
            SoundService.getInstance().playAudio("saizi_mp3")
            var data = RES.getRes("shezi_json");
            var txtr = RES.getRes("shezi_png");
            if(data == null)
            {
                RES.getResAsync("shezi_json",(data:any):void=>{
                    this.playShaiZi(finishCallBack)
                },this);
                return
            }else if (txtr == null)
            {
                 RES.getResAsync("shezi_png",(data:any):void=>{
                    this.playShaiZi(finishCallBack)
                },this);
                return
            }
            
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
            var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "shezi" ) );
            mc1.x = 640 - mc1.width/2
            mc1.y = 320 - mc1.height/2
            this.effectGroup.addChild( mc1 );
            mc1.gotoAndPlay("run",1);
            mc1.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
                console.log(e.type);//输出3次
                this.effectGroup.removeChild(mc1)
                if (finishCallBack!= null){
                    finishCallBack()
                }
            }, this);
        }

        public showScoreEffect(clientId, score) {
            if (score == null || score == 0)
            {
                return
            }
            var scoreEffect = new GameScoreEffect(score)
             var x = GameConst.ACTION_POSITION.FA_FEN[clientId].x
            var y = GameConst.ACTION_POSITION.FA_FEN[clientId].y
            scoreEffect.x = x
            scoreEffect.y = y
            this.effectGroup.addChild(scoreEffect)
        }


        public playCurDiscardArrow(pos:egret.Point) {
            //  if not this.initFinish then
            //     return
            // end
            var playFunc = ():void=>{
                pos.y = pos.y - 30
                var arm = this.markOutCardEffect
                arm.x = pos.x;
                arm.y = pos.y;
                arm.animation.play(null, 0);
            }
            var index = GameConst.ACTION_DATA.ARROW.index
            var data = GameConst.ACTION_DATA.ARROW.data
            if (this.markOutCardEffect == null) {
                this.playEffect(data,(arm:dragonBones.EgretArmatureDisplay):void=>{
                    if(this.markOutCardEffect == null)
                    {
                        this.markOutCardEffect = arm
                        LogUtils.info("playCurDiscardArrow addChild")
                        this.effectGroup.addChild(this.markOutCardEffect)
                    }
                    playFunc();
                })
                return;
            }
            playFunc();
            
           
        }

        public hideCurDiscardArrow() {
            if (this.markOutCardEffect == null) {
                return
            }
            var index = GameConst.ACTION_DATA.ARROW.index
            this.markOutCardEffect.visible = false
        }

        public playChatMsg(dir, type, index) {
            var x, y
            if (type == GameConst.CHAT_MSG_TYPE.EMOTION) {
                x = GameConst.ACTION_POSITION.CHAT_MSG.EMOTION[dir].x
                y = GameConst.ACTION_POSITION.CHAT_MSG.EMOTION[dir].y
                var emotionName = GameConst.CHAT_EMOTION_NAME[index]
                var data =
                {
                    name:emotionName,
                    dragonbonesData: emotionName + "_ske_json",
                    textureData: emotionName + "_tex_json",
                    texture: emotionName + "_tex_png"
                }
                this.playEffect(data,(arm:dragonBones.EgretArmatureDisplay):void=>{
                    arm.x = x
                    arm.y = y
                    arm.animation.play(null, 1);
                    arm.addEventListener(dragonBones.EventObject.COMPLETE, ():void=> {
                        LogUtils.info("播放完成")
                        this.effectGroup.removeChild(arm)
                    }, this);
                    this.effectGroup.addChild(arm);
                })
                
            }
            else if (type == GameConst.CHAT_MSG_TYPE.TEXT) {
                var textData = Strings.chatText
                if(GameConst.sound_type == GameConst.SOUND_TYPE_ENUM.standard)
                {
                    textData = Strings.chatText_standard
                }
                SoundUtils.playChatMsgEffectSoundNameBindPlayer(dir,index + 1)
                var gameChatText = new GameChatText(dir,textData[index])
                this.effectGroup.addChild(gameChatText)
            }
        }

        public playVoiceEffect(dir) {
            //  if this.playVoiceNode == nil then
            //     var path = UI_PANEL_CSB_PATH.."voice/playVoice.csb"
            //     this.playVoiceNode = cc.CSLoader:createNode(path):addTo(this.rootNode)
            //     this.voiceTimeLine = cc.CSLoader:createTimeline(path)
            //     this.playVoiceNode:runAction(this.voiceTimeLine)
            // end
            // this.playVoiceNode:setVisible(true)
            // var x = ACTION_POSITION.VOICE[dir].x
            // var y = ACTION_POSITION.VOICE[dir].y
            // this.playVoiceNode:setPosition(cc.p(x, y))
            // this.voiceTimeLine:gotoFrameAndPlay(0, true)
            // if dir == PLAY_DIR.right or dir == PLAY_DIR.up then
            //     this.playVoiceNode:setScaleX(-1)
            // else
            //     this.playVoiceNode:setScaleX(1)
            // end
        }

        public stopVoiceEffect() {
            //  if this.playVoiceNode == nil then
            //     return
            // end
            // this.playVoiceNode:setVisible(false)
            // this.voiceTimeLine:pause()
            // this.playVoiceNode:setScaleX(1)
        }

        public playPointEmotion(from, to, index) {
            SoundService.getInstance().playAudio("pesound_send_mp3")
            var startP = GameConst.PLAYER_HEAD_POSITION[from]
            var endP = GameConst.PLAYER_HEAD_POSITION[to]

            var emotionImg = new eui.Image("img_personal_item_" + index + "_png")
            emotionImg.width = 80
            emotionImg.height = 80
            emotionImg.x = startP.x - emotionImg.width/2
            emotionImg.y = startP.y - emotionImg.height/2 - 20
            this.effectGroup.addChild(emotionImg)
            var duration = Math.sqrt(Math.pow((startP.x - endP.x), 2) + Math.pow((startP.y - endP.y), 2)) / 2.5
            var tw = egret.Tween.get(emotionImg)
            tw.to({ x: endP.x - emotionImg.width/2 , y: endP.y - emotionImg.height/2}, duration, egret.Ease.getPowIn(3))
            tw.call((): void => {
                this.effectGroup.removeChild(emotionImg)
                var emotionName = GameConst.POINT_EMOTION_NAME[index-1]
                var data =
                    {
                        name:emotionName,
                        dragonbonesData: emotionName + "_ske_json",
                        textureData: emotionName + "_tex_json",
                        texture: emotionName + "_tex_png"
                    }
                this.playEffect(data,(arm:dragonBones.EgretArmatureDisplay):void=>{
                    arm.x = endP.x
                    arm.y = endP.y
                    arm.animation.play(null, 1);
                    arm.addEventListener(dragonBones.EventObject.COMPLETE, ():void=> {
                        LogUtils.info("播放完成")
                        this.effectGroup.removeChild(arm)
                    }, this);
                    this.effectGroup.addChild(arm);
                    SoundService.getInstance().playAudio("pesound_"+index+"_mp3")
                })
                
            })
        }

        public playPointEmotionGold(idx, price) {
            // var csbPath = UI_PANEL_CSB_PATH.."PointEmotionCost.csb"
            // if not cc.FileUtils:getInstance():isFileExist(csbPath) then
            //     return
            // end

            // var node = cc.CSLoader:createNode(csbPath):addTo(this.rootNode)
            // node:setPosition(cc.p(display.cx,100))
            // var price = node:getChildByName("Text_price")
            // price:setString("-"..POINT_EMOTION_PRICE[idx])
            // var itemIcon = node:getChildByName("Image_item")
            // itemIcon:loadTexture("img_personal_item_"..idx..".png",UI_TEX_TYPE_PLIST)
            // var moveByAction = cc.MoveBy:create(1, cc.p(0, 100))
            // var fadeOutAction = cc.EaseIn:create(cc.FadeOut:create(1),3)
            // var spawnAction = cc.Spawn:create(moveByAction,fadeOutAction)
            // var callFun = cc.CallFunc:create(function()
            //     node:removeSelf()
            // end)
            // var action = cc.Sequence:create(spawnAction,callFun)
            // node:runAction(action)
        }

        public playBixihuaEffect() {
            var bxhGroup = new eui.Group()
            var bg = new eui.Image("bg_gameUI_bixiahu_png")
            bg.width = 460
            bg.height = 200
            var bxh = new eui.Image("text_gameUI_bixiahu_png")
            bxh.width = 294
            bxh.height = 112
            bxh.anchorOffsetX = bxh.width/2
            bxh.anchorOffsetY = bxh.height/2
            bxhGroup.addChild(bg)
            bxhGroup.addChild(bxh)
            bxhGroup.width = bg.width
            bxhGroup.height = bg.height
            bxh.x = (bxhGroup.width - bxh.width)/2 + bxh.anchorOffsetX
            bxh.y = (bxhGroup.height - bxh.height)/2 + bxh.anchorOffsetY
            var x = (GameConfig.ScreenW - bxhGroup.width)/2
            var y = (GameConfig.ScreenH - bxhGroup.height)/2 - 35
            bxhGroup.x = x
            bxhGroup.y = y
            this.effectGroup.addChild(bxhGroup)
            var tw = egret.Tween.get(bxh)
            bxh.scaleX = 4
            bxh.scaleY = 4
            bxh.alpha = 0
            tw.to({alpha:1,scaleX : 1,scaleY : 1},400,egret.Ease.getPowIn(2))
            tw.wait(1000)
            tw.call(():void=>{
                this.effectGroup.removeChild(bxhGroup)
            })
        }

        public playChuchongEffect(dir) {

            var chuchongGroup = new eui.Group()
            var bg = new eui.Image("bg_gameUI_chuchong_png")
            bg.width = 310
            bg.height = 170
            var chuchong = new eui.Image("text_gameUI_chuchong_png")
            chuchong.width = 175
            chuchong.height = 100
            chuchong.anchorOffsetX = chuchong.width/2
            chuchong.anchorOffsetY = chuchong.height/2
            chuchongGroup.addChild(bg)
            chuchongGroup.addChild(chuchong)
            chuchongGroup.width = bg.width
            chuchongGroup.height = bg.height
            chuchong.x = (chuchongGroup.width - chuchong.width)/2 + chuchong.anchorOffsetX
            chuchong.y = (chuchongGroup.height - chuchong.height)/2 + chuchong.anchorOffsetY
            var x = GameConst.ACTION_POSITION.OPERATE[dir].x - chuchongGroup.width/2
            var y = GameConst.ACTION_POSITION.OPERATE[dir].y - chuchongGroup.height/2
            chuchongGroup.x = x
            chuchongGroup.y = y
            this.effectGroup.addChild(chuchongGroup)
            var tw = egret.Tween.get(chuchong)
            chuchong.scaleX = 3
            chuchong.scaleY = 3
            chuchong.alpha = 0
            tw.to({alpha:1,scaleX : 1,scaleY : 1},400,egret.Ease.getPowIn(5))
            tw.wait(500)
            tw.call(():void=>{
                this.effectGroup.removeChild(chuchongGroup)
            })

        }

        public playDirArrow(dir, addTo: eui.Group) {

            var playFun = ()=>
            {
                var x = GameConst.ACTION_DIR_ARROW_DATA[dir].offx
                var y = GameConst.ACTION_DIR_ARROW_DATA[dir].offy
                var arm = this.dirArrowEffect
                arm.x = x;
                arm.y = y;
                arm.animation.play("fengxiang_" + (dir + 1), 0);
            }
            if (this.dirArrowEffect == null) {
                LogUtils.info("创建动画")
                this.playEffect(GameConst.ACTION_DATA.FENGXIANG.data,(arm:dragonBones.EgretArmatureDisplay):void=>{
                    if(this.dirArrowEffect == null)
                    {
                        LogUtils.info("playDirArrow addChild ")
                        this.dirArrowEffect = arm
                        addTo.addChild(this.dirArrowEffect);
                    }
                    playFun()
                })
                return
            }
            playFun()

        }


        public play3dDirArrow(dir, addTo: eui.Group) {

            var playFun = ()=>
            {
                var pData = GameConst.ACTION_DIR_ARROW_DATA_3D[dir]
                var x = pData.offx
                var y = pData.offy
                var arm = this.dirArrow3dEffect
                arm.x = x;
                arm.y = y;
                arm.animation.play("fengxiang_" + (dir + 1), 0);
            }
            if (this.dirArrow3dEffect == null) {
                LogUtils.info("创建动画")
                this.playEffect(GameConst.ACTION_DATA.FENGXIANG_3D.data,(arm:dragonBones.EgretArmatureDisplay):void=>{
                    if(this.dirArrow3dEffect == null)
                    {
                        LogUtils.info("playDirArrow addChild ")
                        this.dirArrow3dEffect = arm
                        addTo.addChild(this.dirArrow3dEffect);
                    }
                    playFun()
                })
                return
            }
            playFun()

        }
    }
}