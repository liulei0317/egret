module game {
	export class SoundService {
		private static instance:SoundService = null;

		private isBgMusicOn = true;
		private isPlaying = false;
		private isAudioOn = false;

		private bgMusic:game.SoundItem = null;

		public curMusic:egret.Sound = null
		public curMusicChannel:egret.SoundChannel = null
		public curMusicChannelPos:number = 0

		public constructor() {
			this.initData();
		}

		public static getInstance(){
			if(SoundService.instance == null){
				SoundService.instance = new SoundService();
			}
			return SoundService.instance;
		}

		private initData(){
			this.isBgMusicOn = this.getBgMusicSwitch_();
			this.isAudioOn = this.getAudioSwitch_();
			EAppFacade.getInstance().registerCommand(GameCmd.onResume,this.onResumeEvent,this)
			EAppFacade.getInstance().registerCommand(GameCmd.onPause,this.onPauseEvent,this)
		}

		private onResumeEvent()
		{
			this.playMusic()
		}

		private onPauseEvent()
		{
			this.pauseBgMusic();
		}


		public getBgMusicSwitch(){
			return this.isBgMusicOn;
		}

		private getBgMusicSwitch_(){
            var fv = DataStorage.readLocalData(LocalStorage.setting.GameMusicOn,""+1)
			return fv == "1"
		}	

		public setBgMusicSwitch(isOn:boolean){
			var a = isOn?1:0;
			this.isBgMusicOn = isOn;
			DataStorage.writeLocalData(LocalStorage.setting.GameMusicOn,""+a)
		}

		public getAudioSwitch(){
			return this.isAudioOn;
		}

		private getAudioSwitch_(){
			var fv = DataStorage.readLocalData(LocalStorage.setting.GameEffectOn,""+1)
			return fv == "1";
		}

		public setAudioSwitch(isOn:boolean){
			var a = isOn?1:0;
			this.isAudioOn = isOn;
			DataStorage.writeLocalData(LocalStorage.setting.GameEffectOn,""+a )
		}	

		public playAudio(name:string,loop:number = 1){
			if(this.isAudioOn){
				SoundManager.getInstance().playSound(name,loop);
			}
		}
		public playMusic(name:string = "bg_mp3")
		{
			if(this.isPlaying)
			{
				return
			}
			if(this.isBgMusicOn){
				if(GameConfig.platform == GameConfig.PLATFORM_SET.H5)
				{
					SoundManager.getInstance().playMusic(name,0,this.curMusicChannelPos);
				}else
				{
					SoundManager.getInstance().playWxMusic();
				}
			}
			this.isPlaying = true
		}


		public playBgMusic(name:string = "bg_mp3"){
			if(this.isBgMusicOn){
				if(this.bgMusic==null){
					this.bgMusic = SoundManager.getInstance().play(name,0);
					this.bgMusic.isBgMusic = true;
				}else{
					this.bgMusic.resume();
				}
			}		
		}	

		private curPos:number = 0;
		// public pauseBgMusic(){
		// 	if(this.bgMusic!=null){
		// 		this.bgMusic.pause();
		// 	}
		// }

		// public resumeBgMusic(){
		// 	if(this.bgMusic!=null){
		// 		if(this.isBgMusicOn){
		// 			this.bgMusic.resume();
		// 		}
		// 	}
		// }	


		public pauseBgMusic(){
			this.isPlaying = false
			if(GameConfig.platform == GameConfig.PLATFORM_SET.H5)
			{
				if(this.curMusicChannel!=null){
					this.curMusicChannelPos = this.curMusicChannel.position
					this.curMusicChannel.stop()
					this.curMusicChannel = null
				}
			}else if(GameConfig.platform == GameConfig.PLATFORM_SET.weChat)
			{
				platform.pauseBackgroundAudio()
			}
			
		}

		public resumeBgMusic(){
			this.playMusic()
		}		



		// public stopAllSound(){
		// 	SoundManager.getInstance().stopAllSound();
		// }

		public stopAllAudio(){
			SoundManager.getInstance().stopAllAudio();
		}		

		// public resumeAllSound(){
		// 	if(this.isSoundOn){
		// 		SoundManager.getInstance().resumeAllSound();
		// 	}
		// }
		public resumeAllAudio(){
			if(this.isAudioOn){
				SoundManager.getInstance().resumeAllAudio();
			}
		}		




	}
}