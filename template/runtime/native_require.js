
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"modules/ProtoBuf/bin/protobuf/protobuf.js",
	"polyfill/promise.js",
	"bin-debug/component/EComponent.js",
	"bin-debug/scene/BaseScene.js",
	"bin-debug/component/EItemRender.js",
	"bin-debug/component/EPanel.js",
	"bin-debug/config/GameConfig.js",
	"bin-debug/constants/GameConst.js",
	"bin-debug/Main.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/scene/GameLayerManager.js",
	"bin-debug/scene/login/LoginScene.js",
	"bin-debug/scene/main/MainScene.js",
	"bin-debug/scene/PopUpManager.js",
	"bin-debug/scene/SceneManager.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/utils/VirturalProgress.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "fixedHeight",
		contentWidth: 1280,
		contentHeight: 720,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:24,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 1,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};