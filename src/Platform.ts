/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    getUserInfo(failedFunc): Promise<any>;

    login(): Promise<any>

    setStorage(key:any,value:any): Promise<any>

    getStorage(key:any): Promise<any>

    getLocation():Promise<any>
    getLaunchOptionsSync():Promise<any>
    onLaunch(callBack):Promise<any>
    onShow(callBack):Promise<any>

    share(title, path, query,screenW,screenH) :Promise<any>
    shareWithImg(title, path,imgUrl, query) :Promise<any>

    getSystemInfo():Promise<any>

    setClipboardData(data):Promise<any>
    
    setKeepScreenOn():Promise<any>

    getBackgroundAudioPlayerState():Promise<any>
    playBackgroundAudio(url):Promise<any>
    pauseBackgroundAudio():Promise<any>
    stopBackgroundAudio():Promise<any>
    getSetting():Promise<any>
}

class DebugPlatform implements Platform {
    async getUserInfo(failedFunc) {
        return { nickName: "username" }
    }
    async login() {
        //
    }

    async setStorage(key:any,value:any)
    {

    }

    async getStorage(key:any)
    {
        return ""
    }

    async getLocation()
    {
        
    }

    async share(title, path, query,screenW,screenH){

    }

    async getSystemInfo()
    {
        return {
            windowWidth :GameConfig.ScreenW,
            windowHeight :GameConfig.ScreenH,
            pixelRatio:1

        }
    }
    async shareWithImg(title, path,imgUrl, query) 
    {

    }

    async setClipboardData(data)
    {
        
    }

    async setKeepScreenOn()
    {

    }

    async getBackgroundAudioPlayerState()
    {

    }
    async playBackgroundAudio(url)
    {
        
    }
    async pauseBackgroundAudio()
    {
        
    }
    async stopBackgroundAudio()
    {
        
    }

    async getSetting()
    {
        
    }

    async getLaunchOptionsSync()
    {

    }

    async onLaunch(callBack)
    {

    }

    async onShow(callBack)
    {

    }
    

    

    
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}





