//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
// declare function setNoSleepEnabled();
class Main extends egret.DisplayObjectContainer {

    public static instance: Main;

    // public dialogLayer:eui.Group;
    public sceneLayer: eui.Group;
    public toastLayer: eui.Group;
    public floatingWindowLayer: eui.Group;

    public confirmDialogLayer: eui.Group;

    public fullScreenGroup: eui.Group;
    public assetAdapter: AssetAdapter;
    private floatingWindowView: game.floatingWindow = null;
    private noSleep = null;
    public constructor() {
        super();
        Main.instance = this;
        this.uiToScreenCenter();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        // this.addEventListener(egret.Event.RESIZE, this.onScreenReSize, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {
                // console.log("-----------onUpdate");
            }
        })

        // egret.lifecycle.onPause = () => {
        //     //为了解决IOS系统点击输入框之后点完成，翻转屏幕后造成游戏渲染界面消失的问题，屏幕掉egret.ticker.pause()
        //     // egret.ticker.pause();
        //     console.log("-----------onPause");
        //     game.EAppFacade.getInstance().sendNotification(game.GameCmd.onPause)
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        //     console.log("-----------onResume");
        //     game.EAppFacade.getInstance().sendNotification(game.GameCmd.onResume)

            


        // }

        document.addEventListener("visibilitychange", function () {
            console.log( "document.hidden"+document.hidden );
            // alert("document.hidden"+document.hidden)
            if(document.hidden)
            {
                game.EAppFacade.getInstance().sendNotification(game.GameCmd.onPause)
            }else
            {
                game.EAppFacade.getInstance().sendNotification(game.GameCmd.onResume)
                var containerList = document.querySelectorAll(".egret-player");
                var length = containerList.length;
                for (var i = 0; i < length; i++) {
                    var container = containerList[i];
                    var player = container["egret-player"];
                    var webInput = player.webInput
                    webInput.disconnectStageText(webInput._stageText);
                }
            }
        });

        this.init();

        //注入自定义的素材解析器
        this.assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", this.assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.stage.addEventListener(egret.Event.RESIZE, this.onScreenReSize, this);

        this.runGame().catch(e => {
            console.log(e);
            // console.log("-----------catch");
        })
    }

    private init() {
        egret.ImageLoader.crossOrigin = "anonymous";
        console.log("-----------egret.Capabilities.runtimeType:" + egret.Capabilities.runtimeType);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            GameConfig.platform == GameConfig.PLATFORM_SET.weChat
        } else if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            GameConfig.platform == GameConfig.PLATFORM_SET.H5
        }

        this.sceneLayer = this.createGroup();
        this.addChild(this.sceneLayer);

        // this.dialogLayer = this.createGroup();
        // this.addChild(this.dialogLayer);

        this.toastLayer = this.createGroup();
        this.toastLayer.touchThrough = true
        this.addChild(this.toastLayer);



        this.confirmDialogLayer = this.createGroup();
        this.addChild(this.confirmDialogLayer);

        this.initScreenOn()
        
        this.floatingWindowLayer = this.createGroup();
        this.floatingWindowLayer.touchThrough = true
        this.addChild(this.floatingWindowLayer)
        window.addEventListener('message', function (event) {
            var result = event.data;
            if (result.type == 1) {
                console.log('最顶消息');
                window.top.location.href = "weixin://";
            }
        });
        game.TimerManager.getInstance().start();

        // 捕获全局错误onerror
        window.onerror = handleErr;
        function handleErr(msg, url, line) {
            if(GameConfig.isDebug)
            {
                var errorTxt = "";
                errorTxt += "Error: " + msg + "\n";
                errorTxt += "Line: " + line + "\n";
                errorTxt += "Url: " + url + "\n";
                alert(errorTxt);
            }
            return true;
        }
    }

    private initScreenOn()
    {
        if(!GameConfig.keepScreenOn && GameConfig.platform == GameConfig.PLATFORM_SET.H5)
        {
            return;
        }
        if(this.noSleep == null)
        {
            this.noSleep = new NoSleep();
        }

        this.fullScreenGroup = new eui.Group();
        var rect = new eui.Rect();
        rect.fillColor = 0x000000;
        rect.alpha = 0;
        // this.bgRect.width = GameConfig.ScreenW;
        // this.bgRect.height = GameConfig.ScreenH;
        var clientWidth = 1560;
        var clientHeight = GameConfig.windowHeight_h5 + GlobalData.deltaY * 2;
        rect.width = clientWidth;
        rect.height = clientHeight;
        rect.x = (GameConfig.ScreenW - clientWidth) / 2
        rect.y = (GameConfig.ScreenH - clientHeight) / 2
        this.fullScreenGroup.touchThrough = true
        this.fullScreenGroup.touchChildren = false
        rect.touchEnabled = false
        this.fullScreenGroup.addChild(rect)
        this.addChild(this.fullScreenGroup)

        this.fullScreenGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            
            this.fullScreenGroup.visible = false;
            if (egret.Capabilities.isMobile) {
                this.noSleep.enable();
                // setNoSleepEnabled();
                // Utils.fullScreen();
            }
            // alert("success");
        }, this)
        if (!egret.Capabilities.isMobile) {
            this.fullScreenGroup.visible = false;
        }
    }

    private async runGame() {
        console.log("-----------runGame start");
        if (GameConfig.isDebug) {
            // egret.runEgret({ renderMode: "webgl", audioType: 0 })
            //            egret.Profiler.getInstance().run();
        }

        var launcher = await platform.getLaunchOptionsSync()
        // console.log("launcher:"+ launcher.query.key1)
        //  platform.onLaunch(function(data)
        //  {
        //      console.log("onLaunch data" + data)
        //  })
        await platform.setKeepScreenOn()
        await this.loadResource()
        this.floatingWindowView = new game.floatingWindow();
        this.floatingWindowLayer.addChild(this.floatingWindowView)
        var data = await platform.getSystemInfo()
        // console.log("size:"+ data)
        var screenW: number = data.windowWidth * data.pixelRatio
        var screenH: number = data.windowHeight * data.pixelRatio
        GameConfig.windowWidth = screenW
        GameConfig.windowHeight = screenH
        GameConfig.pixelRatio = data.pixelRatio
        // this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        this.initService();



        // game.SceneSkip.skipToLoginScene();
        // game.SceneSkip.skipToGameScene();
        if (GameConfig.platform == GameConfig.PLATFORM_SET.weChat) {
            game.SceneSkip.skipToLoginScene();
        } else {
            game.SceneSkip.skipToLoadinScene();
        }
        
    }

    private initService() {
        game.UserInfoService.getInstance();
        game.GlobalService.init();
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json?v=" + GameConfig.version, this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }




    private async loadResource() {
        try {
            console.log("-----------loadResource start");
            // const loadingView = new LoadingUI();
            // this.stage.addChild(loadingView);
            // 

            if (GameConfig.platform == GameConfig.PLATFORM_SET.H5) {
                console.log("-----------loadResource H5");
                await RES.loadConfig("resource/default.res.json?v=" + GameConfig.version, "resource/");
            } else if (GameConfig.platform == GameConfig.PLATFORM_SET.weChat) {
                console.log("-----------loadResource weChat");
                // await RES.loadConfig("resource/default.res.json", "resource/");
                await RES.loadConfig("default.res.json?v=" + GameConfig.version, "https://res.qixiyx.cn/file/mahjong_client_egret_new_wxgame_remote/resource/");
            }
            await this.loadTheme();
            await RES.loadGroup("preload", 0);
            // this.stage.removeChild(loadingView);
            document.getElementById("preloading").style.display = "none";
            console.log("-----------loadResource finish");
        }
        catch (e) {
            console.error(e);
        }
    }

    private createGroup(): eui.Group {
        var group = new eui.Group();
        return group;
    }

    private onScreenReSize(event: egret.Event) {
        this.uiToScreenCenter();
        game.EAppFacade.getInstance().sendNotification(Constants.EVENT_STAGE_VIEW_SIZE_CHANGED);
    }

    private uiToScreenCenter() {
        var clientWidth = egret.MainContext.instance.stage.stageWidth;
        var clientHeight = egret.MainContext.instance.stage.stageHeight;
        if (clientHeight > clientWidth) {
            var temp = clientHeight;
            clientHeight = clientWidth;
            clientWidth = temp;
        }
        GameConfig.windowWidth_h5 = clientWidth
        GameConfig.windowHeight_h5 = clientHeight

        var r1 = egret.Capabilities.boundingClientWidth / egret.Capabilities.boundingClientHeight;
        var r2 = GameConfig.ScreenW / GameConfig.ScreenH;
        var deltaX = 0;
        var deltaY = 0;
        if (r1 >= r2) {
            var w = GameConfig.ScreenH * egret.Capabilities.boundingClientWidth / egret.Capabilities.boundingClientHeight;
            deltaX = (w - GameConfig.ScreenW) / 2;
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT
        } else {
            var h = GameConfig.ScreenW * egret.Capabilities.boundingClientHeight / egret.Capabilities.boundingClientWidth;
            deltaY = (h - 720) / 2;
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH
        }
        // console.log("-----------window.boundingClientWidth"+egret.Capabilities.boundingClientWidth);
        // console.log("-----------window.boundingClientHeight"+egret.Capabilities.boundingClientHeight);
        // deltaX = Math.min(deltaX,(1560-1280)/2);
        GlobalData.deltaX = deltaX;
        GlobalData.deltaY = deltaY;
        Main.instance.x = deltaX;
        Main.instance.y = deltaY;
        if (this.floatingWindowView != null) {
            this.floatingWindowView.reSet()
        }
        game.FixUIManager.getInstance().setOffX(Math.min(Math.abs(deltaX), (1560 - 1280) / 2))
        // if (this.fullScreenGroup != null && egret.Capabilities.isMobile) {
        //     this.fullScreenGroup.visible = true;
        // }
    }
}