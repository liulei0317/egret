module Utils {
    /**
     * return [min,max)
     */
    export function getRandom(min: number, max: number): number {
        var rnd = Math.random();
        var ex = Math.floor(min + rnd * (max - min));
        return ex;
    }

    export function format(str: string, ...arg: any[]) {
        if (arguments.length == 0)
            return str;
        for (var i = 0; i < arguments.length; i++) {
            var re: RegExp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            if (str.match(re) != null) {
                str = str.replace(re, arguments[i]);
            }
        }
        return str;
    }


    export function getNumberFormatStr(value) {
        var valueStr = value
        if (value < 10) {
            valueStr = "0" + value
        }
        return valueStr
    }

    export function sendGameEvent(cmd, data: any = null) {
        var sendData = null
        if (data == null) {
            sendData = { cmd: cmd }
        } else {
            sendData = { cmd: cmd, data: data }
        }
        game.EAppFacade.getInstance().sendNotification("gameScene", sendData)
    }

    export function sendPanelEvent(cmd, data: any = null) {
        var sendData = null
        if (data == null) {
            sendData = { cmd: cmd }
        } else {
            sendData = { cmd: cmd, data: data }
        }
        game.EAppFacade.getInstance().sendNotification("panel", sendData)
    }


    export function isNumbers(str: string) {
        var reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(str)) {
            return true;
        }
        return false;
    }

    export function checkInputNumber(str: string, min, max) {
        if (str.length == 0) {
            return false;
        }
        var a = parseInt(str);
        if (a >= min && a <= max) {
            return true;
        } else {
            return false;
        }
    }

    export function addGrayEffect(obj: egret.DisplayObject) {
        //颜色矩阵数组
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFlilter];
    }

    export function removeGrayEffect(obj: egret.DisplayObject) {
        obj.filters = null;
    }

    export function setObjColor(obj: egret.DisplayObject, color: number) {
        Utils.clearObjColor(obj);
        // 将16进制颜色分割成rgb值
        let spliceColor = (color) => {
            let result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        }
        let result = spliceColor(color);
        let colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        let colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFilter];
    }

    export function clearObjColor(obj: egret.DisplayObject) {
        obj.filters = null;
    }

    export function RGBA2Color(r, g, b, a: number = 255) {
        var result = parseInt((r << 16 | g << 8 | b).toString(16), 16)
        return result;
    }


    export function CreateTextureSheet(texture: egret.Texture, w: number, h: number): egret.Texture[] {
        var spriteSheet = new egret.SpriteSheet(texture);
        var group: egret.Texture[] = [];
        var column = texture.textureWidth / w;
        var row = texture.textureHeight / h;
        for (var i = 0; i < column * row; i++) {
            var x = i % column * w;
            var y = Math.floor(i / column) * h;
            group.push(spriteSheet.createTexture("a" + i, x, y, w, h));
        }
        return group;
    }

    export async function copyToClipboard(text: string) {
        if (text == undefined || text == null) {
            return
        }
        if (GameConfig.platform == GameConfig.PLATFORM_SET.H5) {
            try {
                let input = document.createElement("textarea");
                input.readOnly = true;
                input.value = text;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length);
                document.execCommand("copy");
                document.body.removeChild(input);
                game.CommonView.showToast(Strings.copyToClipboardSuccess)

            } catch (e) {
                game.LogUtils.error("拷贝失败")
            }
        } else {
            await platform.setClipboardData(text)
        }

    }

    export function getCharLen(str: string) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
        }
        return realLength;
    }


    export function fullScreen() {
        var doc = window.document as any;
        var docEl = doc.documentElement;

        if ((doc.fullScreenElement && doc.fullScreenElement !== null) ||
            (!doc.mozFullScreen && !doc.webkitIsFullScreen && !doc.mozFullscreen && !doc.webkitIsFullscreen)) {
            if (docEl.requestFullScreen) {
                docEl.requestFullScreen();
            } else if (docEl.requestFullscreen) {
                docEl.requestFullscreen();
            } else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen();
            } else if (docEl.mozRequestFullscreen) {
                docEl.mozRequestFullscreen();
            } else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen();
            } else if (docEl.webkitRequestFullScreen) {
                docEl.webkitRequestFullScreen();
            }
        }
        return;
    }
    //退出全屏

    export function exitScreen() {
        var doc = window.document as any;
        if (doc.cancelFullScreen) {
            doc.cancelFullScreen();
        } else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        } else if (doc.webkitCancelFullScreen) {
            doc.webkitCancelFullScreen();
        }
    }

    export function toggleFullScreen() {

        var doc = window.document as any;
        var docEl = doc.documentElement;

        if ((doc.fullScreenElement && doc.fullScreenElement !== null) ||
            (!doc.mozFullScreen && !doc.webkitIsFullScreen && !doc.mozFullscreen && !doc.webkitIsFullscreen)) {
            if (docEl.requestFullScreen) {
                docEl.requestFullScreen();
            } else if (docEl.requestFullscreen) {
                docEl.requestFullscreen();
            } else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen();
            } else if (docEl.mozRequestFullscreen) {
                docEl.mozRequestFullscreen();
            } else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen();
            } else if (docEl.webkitRequestFullScreen) {
                docEl.webkitRequestFullScreen();
            }
        } else {
            if (doc.cancelFullScreen) {
                doc.cancelFullScreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.webkitCancelFullScreen) {
                doc.webkitCancelFullScreen();
            }
        }
    }


    export function getQrcodeUrl(url) {
        return Utils.format("http://qr.topscan.com/api.php?&text={0}", url)
    }

    export function callWxApp() {
        var locatUrl = "weixin://";

        if (egret.Capabilities.os == "Android") {
            if (/ipad|iphone|mac/i.test(navigator.userAgent)) {

                var ifr = document.createElement("iframe");

                ifr.src = locatUrl;

                ifr.style.display = "none";

                document.body.appendChild(ifr);
            } else {
                window.location.href = locatUrl;
            }
        } else if (egret.Capabilities.os == "iOS") {
            window.top.postMessage({ type: 1 }, "*");
        } else {
            game.DialogManager.getInstance().popUp1(Utils.format("暂不支持{0}，请使用安卓或者苹果手机浏览器", egret.Capabilities.os))
        }

        if (isWeiXin()) {
            game.DialogManager.getInstance().popUp1("当前已在微信中，请关闭当前页面")
        }

    }

    export async function captureScreen() {
        let renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(Main.instance, new egret.Rectangle(-140, 0, 1560, 720));
        if (egret.Capabilities.os == "Android" || egret.Capabilities.os == "iOS") {
            let divImage = document.getElementById("divImage");//获取DIV
            let shareImage: HTMLImageElement = document.getElementById("shareImage") as HTMLImageElement;//获取Image标签
            shareImage.src = await renderTexture.toDataURL('image/jpeg');//把数据赋值给Image
            divImage.style.display = "block";//显示DIV
        }
        else {
            let timestamp1 = Date.parse(new Date().toString());
            await renderTexture.saveToFile('image/jpeg', "mahjong_" + timestamp1 + ".png");
        }
    }

    export function isWeiXin(): boolean {
        var ua: string = navigator.userAgent.toString();
        var str: any = ua.match(/MicroMessenger/i);
        if (str == "MicroMessenger") {
            return true;
        }
        else {
            return false;
        }
    }
    export function isHasSpecialWord(str: string) {
        let ret = false
        let reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$")
        ret = !reg.test(str.trim())
        return ret
    }
}