// TypeScript file
module GameUtils {

    export function is3dMode() {
        return GameConst.card_mode_index == GameConst.CARD_MODE.mode_3d
    }

    export function getShareRoomInfo(data) {
        var shareDesc = ""
        if (data.gameId == Constants.MINI_GAME_ID_SET.mahjong) {
            var roomInfo = new game.RoomInfo();
            roomInfo.parse(data)
            data.mjRoomInfo = roomInfo
            shareDesc = data.mjRoomInfo.getShareRoomInfo()
        }
        else if (data.gameId == Constants.MINI_GAME_ID_SET.biji) {
            var desc = ""

            if (data.hasTwoWang)
                desc = desc + "带双王、"
            else
                desc = desc + "不带双王、"

            if (data.hasPierSort)
                desc = desc + "墩位从小到大、"
            else
                desc = desc + "不指定墩位大小、"

            if (data.canThrowTile)
                desc = desc + "可以弃牌、"
            else
                desc = desc + "不可以弃牌、"

            if (data.hasFirstShunQing)
                desc = desc + "顺清打头、"

            if (data.hasSanQing)
                desc = desc + "三清、"

            if (data.multiple)
                desc = desc + data.multiple + "倍、"

            var subStr = desc.substr(1, -4)
            game.LogUtils.info(Utils.format("sub string : {0}, {1}", subStr, desc))
            var num = data.turnNumber
            var jushuTxt = "对局数:" + num + "把  "

            shareDesc = "付费方式:" + this.getPayModeDesc(data) + jushuTxt + desc
            game.LogUtils.info(Utils.format("微信分享内容 {0}", shareDesc));
        }
        else if (data.gameId == Constants.MINI_GAME_ID_SET.zhuandan) {
            var num = data.turnNumber
            var jushuTxt = "对局数:" + num + "把"
            shareDesc = " 付费方式:" + this.getPayModeDesc(data) + jushuTxt
            game.LogUtils.info(Utils.format("微信分享内容 {0}", shareDesc));
        }

        else if (data.gameId == Constants.MINI_GAME_ID_SET.fightThree) {
            var num = data.turnNumber
            var jushuTxt = "对局数:" + num + "把  "
            var playTypeDesc = ""

            if (data.playType == 0)
                playTypeDesc = "去掉2-5牌、"
            else if (data.playType == 1)
                playTypeDesc = "散牌235大于AAA、"
            else if (data.playType == 2)
                playTypeDesc = "散牌235大于豹子、"

            var potDesc = Utils.format("底分{0}、", data.pot)
            var roundDesc = Utils.format("{0}轮、", data.round)
            var stuffyNumDesc = ""
            if (data.stuffyNum == 0)
                stuffyNumDesc = "无必闷、"
            else
                stuffyNumDesc = Utils.format("闷{0}圈、", data.stuffyNum)

            var showCardsDesc = ""
            if (data.hasShowCards)
                showCardsDesc = "结算展示手牌、"
            else
                showCardsDesc = "结算不展示手牌、"

            var desc = ""
            desc = roundDesc +
                showCardsDesc +
                playTypeDesc +
                stuffyNumDesc
            var subStr = desc.substr(1, -4);
            shareDesc = "付费方式:" + this.getPayModeDesc(data) + jushuTxt + subStr
            game.LogUtils.info(Utils.format("微信分享内容 {0}", shareDesc))
        }
        return shareDesc
    }

    export function getPayModeDesc(data) {
        var payModeDesc = ""
        if (data.payMode == Constants.ROOM_PAY_MODE.AA)
            payModeDesc = "AA付费 "
        else if (data.payMode == Constants.ROOM_PAY_MODE.creator)
            payModeDesc = "房主付费 "
        else if (data.payMode == Constants.ROOM_PAY_MODE.other)
            payModeDesc = "会长付费 "
        return payModeDesc
    }

    export function getTemplateMainInfo(data) {
        var mainInfo = ""
        if (data.gameId == Constants.MINI_GAME_ID_SET.mahjong)
            mainInfo = data.mjRoomInfo.getTemplateMainInfo()
        else if (data.gameId == Constants.MINI_GAME_ID_SET.biji)
            mainInfo = GlobalData.getMiniGameName(Constants.MINI_GAME_ID_SET.biji)
        else if (data.gameId == Constants.MINI_GAME_ID_SET.zhuandan)
            mainInfo = GlobalData.getMiniGameName(Constants.MINI_GAME_ID_SET.zhuandan)
        else if (data.gameId == Constants.MINI_GAME_ID_SET.fightThree)
            mainInfo = GlobalData.getMiniGameName(Constants.MINI_GAME_ID_SET.fightThree)
        return mainInfo
    }

    export function getTemplateRulesInfo(data) {
        var rulesInfo = ""
        if (data.gameId == Constants.MINI_GAME_ID_SET.mahjong)
            rulesInfo = data.mjRoomInfo.getRulesDesc()
        else if (data.gameId == Constants.MINI_GAME_ID_SET.biji)
            rulesInfo = this.getShareRoomInfo(data)
        else if (data.gameId == Constants.MINI_GAME_ID_SET.zhuandan)
            rulesInfo = this.getShareRoomInfo(data)
        else if (data.gameId == Constants.MINI_GAME_ID_SET.fightThree)
            rulesInfo = this.getShareRoomInfo(data)
        return rulesInfo
    }

    export function getCardBack(imgBackName) {
        var suffix = ""
        if (GameConst.card_back_index == 1) {
            suffix = "_y"
        }
        else if (GameConst.card_back_index == 2) {
            suffix = "_b"
        }
        var backFrameName = Utils.format(imgBackName, suffix)
        return backFrameName
    }

    export function getCardFace(imgBackName) {
        var suffix = ""
        if (GameConst.card_face_index == 1) {
            suffix = "1_"
        }
        var frameName = Utils.format("{0}" + imgBackName, suffix)
        return frameName
    }
    export function sub(node: eui.Label, str: string, _maxWidth: number, extraStr: string = "...") {
        let n = 1
        let maxWidth = str.length
        node.text = str
        while (node.textWidth > _maxWidth) {
            node.text = str.substring(0, maxWidth) + extraStr
            maxWidth--
        }
    }

    export function createQrcode(node: egret.DisplayObject, content: string) {
        var width = node.width - 10
        var height = node.height - 10
        var sprite = qr.QRCode.create(content, width, height, qr.QRErrorCorrectLevel.M, 10);
        sprite.anchorOffsetX = width / 2
        sprite.anchorOffsetY = height / 2
        sprite.x = node.x + node.width / 2
        sprite.y = node.y + node.height / 2
        node.parent.addChild(sprite)
    }
}