module GameConfig
{
    export var isDebug:boolean = false;
    export var ScreenW = 1280;
    export var ScreenH = 720;

    export var windowWidth = 0;
    export var windowHeight = 0;
    export var pixelRatio = 0;

    export var windowWidth_h5 = 0;
    export var windowHeight_h5 = 0;

    export var gameID = Constants.GAME_ID_SET.nanjing


    export var localVersion:boolean = false
    export var keepScreenOn:boolean = false
    export var version:string = "1.0.0"

    export var PLATFORM_SET = 
    {
        H5:"h5",//H5版本
        weChat :"weChat"//小程序
    }
    export var platform:string = PLATFORM_SET.H5 //""
}