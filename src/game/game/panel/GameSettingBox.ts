module game
{
    export class GameSettingBox extends game.EDialog
    {
        private Button_close:EButton

        private Button_music_status:EToggleButton
        private Button_sound_status:EToggleButton
        private Button_flower_status:EToggleButton
        private Button_clickType_status:EToggleButton

        private Group_local:eui.Group
        private CheckBox_local:eui.CheckBox
        private Group_standrad:eui.Group
        private CheckBox_standrad:eui.CheckBox

        private Group_CardBg1:eui.Group
        private CheckBox_cardBg_1:eui.CheckBox
        private Group_CardBg2:eui.Group
        private CheckBox_cardBg_2:eui.CheckBox
        private Group_CardBg3:eui.Group
        private CheckBox_cardBg_3:eui.CheckBox

        private Group_CardFace0:eui.Group
        private CheckBox_cardFace_0:eui.CheckBox
        private Group_CardFace1:eui.Group
        private CheckBox_cardFace_1:eui.CheckBox

        private Group_Card_mode_0:eui.Group
        private CheckBox_cardMode_0:eui.CheckBox
        private Group_Card_mode_1:eui.Group
        private CheckBox_cardMode_1:eui.CheckBox

        private Group_deskFrame:eui.Group
        private CheckBox_deskFrame:eui.CheckBox

        private Group_deskBg1:eui.Group;
        private CheckBox_deskBg1:eui.CheckBox
        private Group_deskBg2:eui.Group;
        private CheckBox_deskBg2:eui.CheckBox
        private Group_deskBg3:eui.Group;
        private CheckBox_deskBg3:eui.CheckBox
        private Group_deskBg4:eui.Group
        private CheckBox_deskBg4:eui.CheckBox
        private Group_forbid_emotion:eui.Group
        private CheckBox_forbid_emotion:eui.CheckBox
        private Group_forbid_voice:eui.Group
        private CheckBox_forbid_voice:eui.CheckBox

        public constructor()
        {
            super(Constants.UI_PANEL_DATA_SET.gameSetting.index);
            this.skinName = "resource/skins/game/panel/GameSettingBox.exml"
        }

        public onCreateViewComplete()
        {
            super.onCreateViewComplete();
            this.init()
            this.updateUI();
        }

        private init()
        {
            this.addTapEvent(this.Button_close,this.close)
            this.addTapEvent(this.Button_music_status,():void=>{
               
                var musicOn = SoundService.getInstance().getBgMusicSwitch()
                this.Button_music_status.selected = musicOn
                SoundService.getInstance().setBgMusicSwitch(!musicOn)
                if(!musicOn)
                {
                    SoundService.getInstance().playMusic()
                }else
                {
                    SoundService.getInstance().pauseBgMusic()
                }
                this.updateMusic()
            })

            this.addTapEvent(this.Button_sound_status,():void=>{

                var soundOn = SoundService.getInstance().getAudioSwitch()
                SoundService.getInstance().setAudioSwitch(!soundOn)
                this.updateSound()
            })

            this.addTapEvent(this.Button_flower_status,():void=>{
                var flowerStatus = GlobalData.gameData.getFlowerCardVisible()
                
                GlobalData.gameData.setFlowerCardVisible(!flowerStatus)
                Utils.sendGameEvent(GameCmd.FLOWER_VISIBLE)
                this.updateFlower()
            })

             this.addTapEvent(this.Button_clickType_status,():void=>{
                var clickCardType = GlobalData.gameData.getClickCardType()
                if(clickCardType == GameConst.CLICK_CARD_TYPE.click)
                {
                    clickCardType = GameConst.CLICK_CARD_TYPE.doubleClick
                }else if(clickCardType == GameConst.CLICK_CARD_TYPE.doubleClick)
                {
                    clickCardType = GameConst.CLICK_CARD_TYPE.click
                }
                GlobalData.gameData.setClickType(clickCardType)
                
                this.updateClickCardType()
            })

            this.addTapEvent(this.Group_local,():void=>{
                GameConst.sound_type = GameConst.SOUND_TYPE_ENUM.nanjing
                DataStorage.writeLocalData(LocalStorage.setting.Sound_type,""+ GameConst.sound_type)
                this.updateLocalLanguage()
            })

             this.addTapEvent(this.Group_standrad,():void=>{
                GameConst.sound_type = GameConst.SOUND_TYPE_ENUM.standard
                DataStorage.writeLocalData(LocalStorage.setting.Sound_type,""+ GameConst.sound_type)
                this.updateLocalLanguage()
            })

            this.addTapEvent(this.Group_CardBg1,():void=>{
                GameConst.card_back_index = 0
                DataStorage.writeLocalData(LocalStorage.setting.Card_back_index,""+ GameConst.card_back_index)
                Utils.sendGameEvent(GameCmd.CHANGE_CARD_BACK)
                this.updateCardBg()
            })
            this.addTapEvent(this.Group_CardBg2,():void=>{
                GameConst.card_back_index = 1
                DataStorage.writeLocalData(LocalStorage.setting.Card_back_index,""+ GameConst.card_back_index)
                Utils.sendGameEvent(GameCmd.CHANGE_CARD_BACK)
                this.updateCardBg()
            })
            this.addTapEvent(this.Group_CardBg3,():void=>{
                GameConst.card_back_index = 2
                DataStorage.writeLocalData(LocalStorage.setting.Card_back_index,""+ GameConst.card_back_index)
                Utils.sendGameEvent(GameCmd.CHANGE_CARD_BACK)
                this.updateCardBg()
            })

            this.addTapEvent(this.Group_CardFace0,():void=>{
                GameConst.card_face_index = 0
                DataStorage.writeLocalData(LocalStorage.setting.Card_face_index,""+ GameConst.card_face_index)
                Utils.sendGameEvent(GameCmd.CHANGE_CARD_FACE)
                this.updateCardFace()
            })

            this.addTapEvent(this.Group_CardFace1,():void=>{
                GameConst.card_face_index = 1
                DataStorage.writeLocalData(LocalStorage.setting.Card_face_index,""+ GameConst.card_face_index)
                Utils.sendGameEvent(GameCmd.CHANGE_CARD_FACE)
                this.updateCardFace()
            })

            this.addTapEvent(this.Group_Card_mode_0,():void=>{
                GameConst.card_mode_index = GameConst.CARD_MODE.mode_2d
                DataStorage.writeLocalData(LocalStorage.setting.View_mode,""+ GameConst.card_mode_index)
                Utils.sendGameEvent(GameCmd.CHANGE_VIEW_MODE)
                this.updateViewModeType()
            })

            this.addTapEvent(this.Group_Card_mode_1,():void=>{
                GameConst.card_mode_index = GameConst.CARD_MODE.mode_3d
                DataStorage.writeLocalData(LocalStorage.setting.View_mode,""+ GameConst.card_mode_index)
                Utils.sendGameEvent(GameCmd.CHANGE_VIEW_MODE)
                this.updateViewModeType()
            })

            this.addTapEvent(this.Group_deskFrame,():void=>{
                var frameVisible = DataStorage.readLocalData(LocalStorage.setting.Game_bg_frame,"1")
                if (frameVisible == "1")
                {
                    DataStorage.writeLocalData(LocalStorage.setting.Game_bg_frame,"0")
                }else
                {
                     DataStorage.writeLocalData(LocalStorage.setting.Game_bg_frame,"1")
                }
                Utils.sendGameEvent(GameCmd.CHANGE_GAME_BG_FRAME)
                this.updateDeskFrame()
            })

            this.addTapEvent(this.Group_deskBg1,():void=>{
                GameConst.game_bg_index = 0
                DataStorage.writeLocalData(LocalStorage.setting.Game_bg_index,""+ GameConst.game_bg_index)
                Utils.sendGameEvent(GameCmd.CHANGE_GAME_BG)
                this.updateDeskBg()
            })

            this.addTapEvent(this.Group_deskBg2,():void=>{
                GameConst.game_bg_index = 1
                DataStorage.writeLocalData(LocalStorage.setting.Game_bg_index,""+ GameConst.game_bg_index)
                Utils.sendGameEvent(GameCmd.CHANGE_GAME_BG)
                this.updateDeskBg()
            })
            this.addTapEvent(this.Group_deskBg3,():void=>{
                GameConst.game_bg_index = 2
                DataStorage.writeLocalData(LocalStorage.setting.Game_bg_index,""+ GameConst.game_bg_index)
                Utils.sendGameEvent(GameCmd.CHANGE_GAME_BG)
                this.updateDeskBg()
            })
        
            this.addTapEvent(this.Group_forbid_emotion,():void=>{
                GameConst.forbid_emotion = !GameConst.forbid_emotion
                if(GameConst.forbid_emotion)
                {
                    DataStorage.writeLocalData(LocalStorage.setting.forbid_emotion,"" + 1)
                }else
                {
                    DataStorage.writeLocalData(LocalStorage.setting.forbid_emotion,"" + 0)
                }
                this.CheckBox_forbid_emotion.selected = GameConst.forbid_emotion
            })

            this.addTapEvent(this.Group_forbid_voice,():void=>{
                GameConst.forbid_voice = !GameConst.forbid_voice
                if(GameConst.forbid_voice)
                {
                    DataStorage.writeLocalData(LocalStorage.setting.forbid_voice,"" + 1)
                }else
                {
                    DataStorage.writeLocalData(LocalStorage.setting.forbid_voice,"" + 0)
                }
                this.CheckBox_forbid_voice.selected = GameConst.forbid_voice
            })
        }

        public updateUI_()
        {
            this.updateMusic();
            this.updateSound();
            this.updateFlower();
            this.updateClickCardType()
            this.updateLocalLanguage();
            this.updateCardBg();
            this.updateCardFace();
            this.updateDeskFrame();
            this.updateDeskBg();
            this.updateViewModeType();
            this.CheckBox_forbid_emotion.selected = GameConst.forbid_emotion
            this.CheckBox_forbid_voice.selected = GameConst.forbid_voice
        }

        private updateMusic()
        {
            var musicOn = SoundService.getInstance().getBgMusicSwitch()
            if(musicOn)
            {
                this.Button_music_status.selected = true
            }else
            {
                this.Button_music_status.selected = false
            }
        }

        private updateSound()
        {
            var soundOn =  SoundService.getInstance().getAudioSwitch()
            if(soundOn)
            {
                this.Button_sound_status.selected = true
            }else
            {
                this.Button_sound_status.selected = false
            }
        }

        private updateFlower()
        {
            var flowerStatus = GlobalData.gameData.getFlowerCardVisible()
            if(flowerStatus)
            {
                this.Button_flower_status.selected = true
            }else
            {
                this.Button_flower_status.selected = false
            }
        }

        private updateClickCardType()
        {
             var clickCardType = GlobalData.gameData.getClickCardType()
            if(clickCardType == GameConst.CLICK_CARD_TYPE.click)
            {
                this.Button_clickType_status.selected = true
            }else if(clickCardType == GameConst.CLICK_CARD_TYPE.doubleClick)
            {
                this.Button_clickType_status.selected = false
            }
        }

        private updateLocalLanguage()
        {
            if(GameConst.sound_type == GameConst.SOUND_TYPE_ENUM.nanjing)
            {
                this.CheckBox_local.selected = true
                this.CheckBox_standrad.selected = false
            }else if(GameConst.sound_type == GameConst.SOUND_TYPE_ENUM.standard)
            {
                this.CheckBox_standrad.selected = true
                this.CheckBox_local.selected = false
            }
        }

        private updateCardBg()
        {
            this.CheckBox_cardBg_1.selected = GameConst.card_back_index == 0
            this.CheckBox_cardBg_2.selected = GameConst.card_back_index == 1
            this.CheckBox_cardBg_3.selected = GameConst.card_back_index == 2
        }

        private updateCardFace()
        {
            this.CheckBox_cardFace_0.selected = GameConst.card_face_index == 0
            this.CheckBox_cardFace_1.selected = GameConst.card_face_index == 1
        }

        private updateViewModeType()
        {
            this.CheckBox_cardMode_0.selected = GameConst.card_mode_index ==  GameConst.CARD_MODE.mode_2d
            this.CheckBox_cardMode_1.selected = GameConst.card_mode_index == GameConst.CARD_MODE.mode_3d
            this.Group_deskFrame.visible = (GameConst.card_mode_index ==  GameConst.CARD_MODE.mode_2d)
        }

        private updateDeskFrame()
        {
            var frameVisible = DataStorage.readLocalData(LocalStorage.setting.Game_bg_frame,"1")
            this.CheckBox_deskFrame.selected = frameVisible == "1"
        }

        private updateDeskBg()
        {
            this.CheckBox_deskBg1.selected = GameConst.game_bg_index == 0
            this.CheckBox_deskBg2.selected = GameConst.game_bg_index == 1
            this.CheckBox_deskBg3.selected = GameConst.game_bg_index == 2
        }



    }
}