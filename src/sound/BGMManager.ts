module game {
	/**
	 *
	 * @author 
	 *
	 */
    export class BGMManager {
        private static instance: BGMManager;
        private channel: egret.SoundChannel;
        public constructor() {
            
        }
        public static getInstance() {
            if(!BGMManager.instance) {
                BGMManager.instance = new BGMManager();
            }
            return BGMManager.instance;
        }

        private hasLoadBgm: boolean = false;
        private sound: egret.Sound;

        private soundPlaying: boolean;

        //        private autoPlay: boolean;
        public loadBGM(bgm: string,autoPlay: boolean) {
            // if(this.hasLoadBgm) return;
            // this.hasLoadBgm = true;
            // //            this.autoPlay = autoPlay;
            // if(Const.isRuntime) {
            //     this.sound = RES.getRes("bg_mp3");
            //     //                this.play();
            // } else {
            //     //创建 URLLoader 对象
            //     var loader: egret.URLLoader = new egret.URLLoader();
            //     //设置加载方式为声音
            //     loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
            //     //添加加载完成侦听
            //     loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
            //     //            var url: string = "resource/assets/sound/" + bgm;
            //     //                var resServer = PhotoManager.getResServer();
            //     var resServer = Const.resourceServerIP_Egret;
            //     var suffix = "?clientVersion=" + Const.clientVersion;
            //     //                var url: string = resServer + "resource/assets/sound/"
            //     //                    + bgm;
            //     var url = this.getBGMUrl();
            //     //                console.log("mp3 url=" + url);
            //     var request: egret.URLRequest = new egret.URLRequest(url);
            //     //开始加载
            //     loader.load(request);
            // }
        }

        private getBGMUrl() {
            // var u1 = "http://123.59.11.147:10099/girlplan/html5/resource/assets/sound/bg.mp3";
            // var u2 = "http://123.59.11.161:10155/girlplan2/resource/assets/sound/bg.mp3";
            // var rnd = UserManager.getInstance().getFUserId();
            // if(rnd % 2 == 0) {
            //     return u1;
            // }
            // return u2;
        }

        private onLoadComplete(event: egret.Event) {
            var loader: egret.URLLoader = <egret.URLLoader>event.target;
            //获取加载到的 Sound 对象
            this.sound = <egret.Sound>loader.data;
            //            if(!Main.instance.bPause)
            //            {
            //                this.play();
            //            }
        }

        // public getSoundState(): boolean {
        //     return this.soundState;
        // }

        // public play_bak() {
        //     //            this.autoPlay = true;
        //     UserManager.getInstance().getUserInfo().saveSoundState(true);
        //     if(this.sound) {
        //         this.soundPlaying = true;
        //         this.channel = this.sound.play();
        //     }
        // }

        // public setSoundState(soundState: boolean) {
        //     this.soundState = soundState;
        //     UserManager.getInstance().getUserInfo().saveSoundState(soundState);
        // }

        // public play() {
        //     //            this.autoPlay = true;
        //     //            UserManager.getInstance().getUserInfo().saveSoundState(true);

        //     if(this.soundPlaying) {
        //         return;
        //     }

        //     if(this.soundState && this.sound) {
        //         this.soundPlaying = true;
        //         this.channel = this.sound.play();
        //     }
        // }

        // public stop() {
        //     //this.autoPlay = false;
        //     //UserManager.getInstance().getUserInfo().saveSoundState(false);
        //     if(this.sound) {
        //         if(this.channel) {
        //             this.channel.stop();
        //         }
        //         this.soundPlaying = false;
        //     }
        // }

        // //        public isSoundOn():boolean 
        // //        {
        // //            return this.bSound;
        // //        }

        // public onPause() {
        //     //            if(this.sound)
        //     //            {
        //     //                this.sound.stop();
        //     //            }
        //     this.stop();
        // }

        // public onResume() {
        //     //            if(this.bSound) 
        //     //            {
        //     //                this.play();
        //     //            }
        //     this.play();
        // }

    }
}
