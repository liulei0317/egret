module game {
	export class SoundManager {

		private sounds:HashMap;

		private static instance:SoundManager;


		public constructor() {
			this.sounds = new HashMap();
		}	

		public static getInstance(){
			if(SoundManager.instance == null){
				SoundManager.instance = new SoundManager();
			}
			return SoundManager.instance;
		}

		public addSound(soundChannel,soundItem){
			this.sounds.put(soundChannel.hashCode,soundItem);
		}

		public removeSound(hashCode){
			this.sounds.remove(hashCode);
		}		

		/**
		 * 播放声音
		 */
		public play(name:string,loops = 1):SoundItem {
			var self = this;
			//创建 Sound 对象
			// var sound = new egret.Sound();



			// var loadCallback = function(event:egret.Event){
			// 	//获取加载到的 Sound 对象
			// 	var sound:egret.Sound = <egret.Sound>event.target;
			// 	//播放音乐
			// 	var channel:egret.SoundChannel = sound.play(0,1);

			// 	self.sounds.put(sound,channel);

			// 	channel.addEventListener(egret.Event.SOUND_COMPLETE, this.playFinishCallback, this);
			// }
			// //添加加载完成侦听
			// sound.addEventListener(egret.Event.COMPLETE, loadCallback, this);
			// //开始加载
			// sound.load(name);


			var sound:egret.Sound = RES.getRes(name);
			
			var soundChannel = sound.play(0,loops);		
				
			
			var soundItem = new game.SoundItem(name,sound,soundChannel,loops);
			this.addSound(soundChannel,soundItem);
			// this.sounds.put(soundChannel.hashCode,soundItem);
			return soundItem;
		}

		public async playSound(name,loop)
		{
			var soundName = name
            if (RES.hasRes(soundName))
            {
				var sound = RES.getRes(soundName);
				if(sound == null)
				{
					RES.getResAsync(soundName,function(data:any){
										this.playSound(name,loop)
									},this);
				}else
				{
					var soundChannel = sound.play(0,loop);
				}
            }
		}

		public playWxMusic()
		{
			platform.playBackgroundAudio("https://res.qixiyx.cn/file/bg.mp3")
		}

		public playMusic(name,loop,startPosition:number = 0)
		{
			if(SoundService.getInstance().curMusicChannel != null)
			{
				SoundService.getInstance().curMusicChannel.position = SoundService.getInstance().curMusicChannel.position
				return
			}
			var soundName = name
            if (RES.hasRes(soundName))
            {
				var sound = RES.getRes(soundName)
				if(sound == null)
				{
					RES.getResAsync(soundName,function(data:any){
						this.playMusic(name,loop)
                	},this);
				}else
				{
					SoundService.getInstance().curMusic = sound
					console.log("startPosition" + startPosition)
					var soundChannel = SoundService.getInstance().curMusic.play(startPosition,loop);
					SoundService.getInstance().curMusicChannel = soundChannel
				}
				
            }
		}

		/**
		 * 停止所有声音
		 */
		public stopAllAudio(){
			var values= this.sounds.values();
			for(var key in values){
				var soundItem:SoundItem = values[key];
				if(!soundItem.isBgMusic){
					soundItem.stop();
					this.sounds.remove(soundItem);
				}
			}
		}

		public stopAllSound(){
			var values= this.sounds.values();
			for(var key in values){
				var soundItem:SoundItem = values[key];
				soundItem.stop();
				this.sounds.remove(soundItem);
			}
		}
		

		/**
		 * 暂停所有声音
		 */
		public pauseAllSound(){
			var values= this.sounds.values();
			for(var key in values){
				var soundItem:SoundItem = values[key];
				soundItem.pause();
			}
		}

		/**
		 * 继续所有声音
		 */
		public resumeAllSound(){
			var values= this.sounds.values();
			for(var key in values){
				var soundItem:SoundItem = values[key];
				soundItem.resume();
			}
		}	

		/**
		 * 继续所有音效
		 */
		public resumeAllAudio(){
			var values= this.sounds.values();
			for(var key in values){
				var soundItem:SoundItem = values[key];
				if(!soundItem.isBgMusic){
					soundItem.resume();
				}
			}
		}				




	}

	export class SoundItem{
		public sound:egret.Sound;
		public soundChannel:egret.SoundChannel;
		public name:string;
		public position:number = 0
		public loops:number;
		public isPlaying = false;
		public isBgMusic = false;
		public constructor(name,sound,soundChannl,loops) {
			this.name = name;
			this.sound = sound;
			this.soundChannel = soundChannl;
			this.loops = loops;
			this.isPlaying = true;

			this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.playFinishCallback, this);
		}	


		private playFinishCallback(event:egret.Event){
				egret.log("onSoundComplete");
				var soundChannel:egret.SoundChannel = <egret.SoundChannel>event.target;
				SoundManager.getInstance().removeSound(soundChannel.hashCode)
		}		

		public stop(){
			this.clean();
		}

		public pause(){
			this.position = this.soundChannel.position;
			this.clean();
		}

		public resume(){
			if(!this.isPlaying){
				this.isPlaying = true;
				var soundChannel = this.sound.play(this.position,this.loops);
				this.soundChannel = soundChannel;
				this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.playFinishCallback, this);
				SoundManager.getInstance().addSound(this.soundChannel,this);
			}
		}

		private clean(){
			this.isPlaying = false;
			this.soundChannel.stop();
			SoundManager.getInstance().removeSound(this.soundChannel.hashCode);			
			this.soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.playFinishCallback, this);
		}

	}
}