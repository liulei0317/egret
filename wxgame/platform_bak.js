/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

const bgAudio = wx.createInnerAudioContext();
bgAudio.loop = true
bgAudio.autoplay = true
class WxgamePlatform {

    name = 'wxgame'
    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })
        })
    }

    getUserInfo(failedFunc) {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(res);
                },
                fail: function (res) {
                    if(failedFunc != null)
                    {
                        failedFunc();
                    }
                    reject(res);
                }
            })
        })
    }

    share(title, path, query, screenW, screenH) {
        console.log("call share")
        return new Promise((resolve, reject) => {

            canvas.toTempFilePath({
                x: (screenW - screenH * 1.25) / 2,
                y: 0,
                width: screenH * 1.25,
                height: screenH,
                destWidth: 500,
                destHeight: 400,
                success: (res) => {
                    wx.shareAppMessage({
                        title: title,
                        path: path,
                        query: query,
                        imageUrl: res.tempFilePath
                    })
                    resolve(res)
                },
                fail: (res) => {
                    reject(res)
                }
            })

        })
    }

    shareWithImg(title, path, imgUrl, query) {
        console.log("call share")
        return new Promise((resolve, reject) => {
            wx.shareAppMessage({
                title: title,
                path: path,
                query: query,
                imageUrl: imgUrl
            })

        })
    }

    showShareMenu(title, path, imgUrl, query) {
        return new Promise((resolve, reject) => {
            wx.showShareMenu({

                withShareTicket: 'true',
                shareTicket: {
                    a: "123",
                    b: 123
                },
                success: function () {

                    console.log('成功调用')
                    wx.onShareAppMessage(function (res) {

                        // 用户点击了“转发”按钮 
                        if (res.from === 'button') {
                            // 来自页面内转发按钮
                            console.log(res.target)
                        }
                        return {

                            title: title,
                            path: path,
                            query: query,
                            imageUrl: imgUrl
                        }

                    })


                },

                fail: function (data) {

                    console.log(data);

                }

            })
        })
    }

    getShareInfo(shareTicket) {
        return new Promise((resolve, reject) => {
            wx.getShareInfo({
                shareTicket: shareTicket,
                success: function (res) {
                    resolve(res);
                },
                fail: function (data) {
                    console.log(data);
                }
            })
        })
    }


    getLaunchOptionsSync() {
        return new Promise((resolve, reject) => {
            var launchOption = wx.getLaunchOptionsSync()
            resolve(launchOption)
        })
    }

    onShow(callBack) {
        return new Promise((resolve, reject) => {
            wx.onShow(function (data) {
                callBack(data)
                var audio = wx.createInnerAudioContext()
                if (audio != null) {
                    audio.play()
                }
            })
        })
    }

    onLaunch(callBack) {
        return new Promise((resolve, reject) => {
            wx.onLaunch(function (data) {
                callBack(data)
            })
        })
    }

    getFriendCloudStorage(keyList) {
        return new Promise((resolve, reject) => {
            // wx.getFriendCloudStorage(
            //     {
            //         keyList:keyList,
            //         success:function (res) {
            //             resolve(res);
            //         },
            //         fail:function (res) {
            //             reject(res);
            //         }
            //     }
            // )
            let openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage({
                text: 'hello',
                year: (new Date()).getFullYear()
            })
        })
    }

    getGroupCloudStorage(keyList) {
        return new Promise((resolve, reject) => {

            wx.getGroupCloudStorage(
                {
                    keyList: keyList,
                    success: function (res) {
                        resolve(res);
                    },
                    fail: function (res) {
                        reject(res);
                    }
                }
            )
        })
    }


    setUserCloudStorage(kvList) {
        return new Promise((resolve, reject) => {

            wx.setUserCloudStorage(
                {
                    KVDataList: kvList,
                    success: function (res) {
                        resolve(res);
                    },
                    fail: function (res) {
                        reject(res);
                    }
                }
            )
        })
    }

    getSystemInfo() {
        return new Promise((resolve, reject) => {
            wx.getSystemInfo({
                success: function (res) {
                    console.log(res)
                    resolve(res);
                }
            })

        })
    }

    getLocation() {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                success: function (res) {
                    console.log(res)
                    resolve(res);
                },
                fail: function (res) {
                    console.log(res)
                    reject(res);
                }
            })
        })
    }

    setClipboardData(data) {
        return new Promise((resolve, reject) => {
            wx.setClipboardData({
                data: data,
                success: function (res) {
                    console.log(res)
                    resolve(res);
                },
                fail: function (res) {
                    console.log(res)
                    reject(res);
                }
            })
        })
    }
    setKeepScreenOn() {
        return new Promise((resolve, reject) => {
            wx.setKeepScreenOn({
                keepScreenOn: true,
                success: function (res) {
                    console.log(res)
                    resolve(res);
                },
                fail: function (res) {
                    console.log(res)
                    reject(res);
                }
            })
        })
    }

    getBackgroundAudioPlayerState() {
        return new Promise((resolve, reject) => {
            wx.getBackgroundAudioPlayerState({
                success: function (res) {
                    console.log(res)
                    resolve(res);
                },
                fail: function (res) {
                    console.log(res)
                    reject(res);
                }
            })
        })
    }



    playBackgroundAudio(url) {
        return new Promise((resolve, reject) => {
            bgAudio.src = url // src 可以设置 http(s) 的路径，本地文件路径或者代码包文件路径
            bgAudio.play()
        })
    }
    pauseBackgroundAudio() {
        return new Promise((resolve, reject) => {
            bgAudio.pause()
        })
    }
    stopBackgroundAudio() {
        return new Promise((resolve, reject) => {
            bgAudio.stop()
        })
    }

    createUserInfoButton(data) {
        return new Promise((resolve, reject) => {

        })
    }

    getSetting(data) {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success: function (res) {
                    resolve(res)
                }
            })
        })
    }


    openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        egret.startTick((timeStarmp) => {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();
