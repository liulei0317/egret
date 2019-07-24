module game {
    export class LoadingScene extends game.SceneBase implements RES.PromiseTaskReporter {
        private loadingBar: eui.ProgressBar

        private Image_progress: eui.Image

        private Image_progress_startX: number = 0
        public constructor() {
            super(Constants.SCENE_INDEX.HOT_UPDATE);
            this.skinName = "resource/skins/loading/LoadingSceneSkin.exml"
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete();
            this.Image_progress_startX = this.Image_progress.x
            this.loadingBar.labelFunction = (value: number, maximum: number): string => {
                return `资源加载中...${value}/${maximum}`;
            }
            RES.setMaxRetryTimes(50)
            RES.setMaxLoadingThread(1)
            // RES.createGroup("load", ["action"])
            RES.createGroup("load", ["loadingRes", "action"])
            // this.startLoadRes()
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup("load");
        }

        private async startLoadRes() {
            await RES.loadGroup("load", 0, this);
            // RES.setMaxLoadingThread(1)
            // await RES.loadGroup("sound", 0, this);
            this.skip()
        }
        private skip() {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            SceneSkip.skipToLoginScene()
        }

            /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
            private onResourceLoadComplete(event: RES.ResourceEvent): void {
                console.info("--onResourceLoadComplete--");
                this.skip()
            }



            /**
             * 资源组加载出错
             *  The resource group loading failed
             */
            private onResourceLoadError(event: RES.ResourceEvent): void {
                //TODO
                console.warn("Group:" + event.groupName + " has failed to load");
                //忽略加载失败的项目
                //Ignore the loading failed projects
                this.onResourceLoadComplete(event);
            }

            /**
             * preload资源组加载进度
             * Loading process of preload resource group
             */
            private onResourceProgress(event: RES.ResourceEvent): void {
                console.info("--onResourceProgress--" + event.itemsLoaded + "/"+event.itemsTotal);
                this.onProgress(event.itemsLoaded,event.itemsTotal)
            }

        public onProgress(itemsLoaded: number, itemsTotal: number) {
            this.loadingBar.value = Math.floor(itemsLoaded / itemsTotal * 100)
            this.Image_progress.x = this.Image_progress_startX + this.loadingBar.width * this.loadingBar.value / 100
        }
        public onCancel()
        {
            console.log("取消资源加载")
        }

        public onPause()
		{

		}

		public onResume()
		{
            // var result = RES.isGroupLoaded("load")
            // console.log("LoadingScene onResume loaded:"+ result)
            // if(result)
            // {
            //     this.skip();
            // }
		}
    }
}