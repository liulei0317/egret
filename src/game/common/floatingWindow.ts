module game {
    export class floatingWindow extends EComponent {
        private popMenuGroup: eui.Group
        private btn: eui.Button
        private enterFullScreenGroup: eui.Group
        private lightingGroup: eui.Group
        private refreshWebGroup: eui.Group
        private enterFullScreen: EButton
        private exitFullScreen: EButton
        private lightingOn: EButton
        private lightingOff: EButton
        private refreshWeb: EButton
        private _touchStatus: boolean = false
        private touchPoint: egret.Point
        private _distance: egret.Point = new egret.Point()
        private _isDrag: boolean = false
        private rightX = 675
        private rightX2 = 575
        private leftX = 225
        private bgImage: eui.Image
        private isLeft: boolean = false
        private isRight: boolean = false
        private isTop: boolean = false
        private isBottom: boolean = false
        public isFullScreen: boolean = false
        public isLightOn: boolean = false
        public constructor() {
            super()
            this.skinName = "resource/skins/common/floatingWindow.exml"
        }

        public onCreateViewComplete() {
            super.onCreateViewComplete()
            EAppFacade.getInstance().registerCommand(GameCmd.onPause, this.onPause, this)
            this.btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnTouchBegin, this)
            this.btn.addEventListener(egret.TouchEvent.TOUCH_END, this.btnTouchEnd, this)
            this.btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
                this.btnTouchEnd()
            }, this)
            this.exitFullScreen.visible = false
            this.lightingOff.visible = false
            this.popMenuGroup.visible = false
            this.anchorOffsetX = this.width / 2
            this.anchorOffsetY = this.height / 2
            this.x = this.btn.width / 2
            this.y = this.btn.height / 2
            this.addTapEvent(this.enterFullScreen, this.clickedEnterFullScreen)
            this.addTapEvent(this.exitFullScreen, this.clickedExitFullScreen)
            this.addTapEvent(this.refreshWeb, this.clickedRefresh)

            this.addTapEvent(this.lightingOn, this.ClickedLightingOn)
            this.addTapEvent(this.lightingOff, this.ClickedLightingOff)

            this.updateLayout()
        }
        private btnTouchBegin(e: egret.TouchEvent) {
            this.touchPoint = new egret.Point(e.stageX, e.stageY)
            this._isDrag = false
            this._distance.x = e.stageX - this.x
            this._distance.y = e.stageY - this.y
            this._touchStatus = true
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.btnTouchMove, this)
            let obj = egret.Tween.get(this)
            if (!this.popMenuGroup.visible) {
                if (this.isLeft) {
                    obj.to({ scaleX: 1, scaleY: 1, x: this.x + 50 }, 150)
                }
                else if (this.isRight) {
                    obj.to({ scaleX: 1, scaleY: 1, x: this.x - 50 }, 150)
                }
                else if (this.isTop) {
                    obj.to({ scaleX: 1, scaleY: 1, y: this.y + 50 }, 150)
                }
                else if (this.isBottom) {
                    obj.to({ scaleX: 1, scaleY: 1, y: this.y - 50 }, 150)
                }
                else {
                    obj.to({ scaleX: 1, scaleY: 1 }, 150)
                }
            }
        }
        private btnTouchEnd() {
            // console.log("mouse leave!")
            let obj = egret.Tween.get(this)
            if (!this._isDrag) {
                let p = this.localToGlobal(this.btn.x, this.btn.y)
                if (p.x > egret.MainContext.instance.stage.stageWidth / 2) {
                    this.popMenuGroup.x = this.leftX
                    this.bgImage.scaleX = 1
                }
                else {
                    if (egret.Capabilities.os == "iOS")
                        this.popMenuGroup.x = this.rightX2
                    else
                        this.popMenuGroup.x = this.rightX
                    this.bgImage.scaleX = -1
                }
                this.popMenuGroup.visible = !this.popMenuGroup.visible
                this.scaleX = this.scaleY = 1
                if (!this.popMenuGroup.visible) {
                    if (this.isLeft) {
                        obj.to({ scaleX: 1, scaleY: 1, x: this.x - 50 }, 150)
                    }
                    else if (this.isRight) {
                        obj.to({ scaleX: 1, scaleY: 1, x: this.x + 50 }, 150)
                    }
                    else if (this.isTop) {
                        obj.to({ scaleX: 1, scaleY: 1, y: this.y - 50 }, 150)
                    }
                    else if (this.isBottom) {
                        obj.to({ scaleX: 1, scaleY: 1, y: this.y + 50 }, 150)
                    }
                    else {
                        obj.to({ scaleX: 1, scaleY: 1 }, 150)
                    }
                }
            }
            else {
                let p = this.localToGlobal(this.btn.x, this.btn.y)
                let off = this.btn.width / 2
                let leftSideDis = p.x - off
                let rightSideDis = egret.MainContext.instance.stage.stageWidth - (p.x + off)
                let topSideDis = p.y - off
                let bottomSideDis = egret.MainContext.instance.stage.stageHeight - (p.y + off)
                let arr = [
                    { key: "left", dis: leftSideDis },
                    { key: "right", dis: rightSideDis },
                    { key: "top", dis: topSideDis },
                    { key: "bottom", dis: bottomSideDis }
                ]
                arr.sort((a: any, b: any) => {
                    if (a.dis > b.dis)
                        return 1
                    else if (a.dis < b.dis)
                        return -1
                    return 0
                })
                let toDis = 0
                switch (arr[0].key) {
                    case "left":
                        toDis = this.x - arr[0].dis
                        this.isLeft = true
                        break
                    case "right":
                        toDis = this.x + arr[0].dis
                        this.isRight = true
                        break
                    case "top":
                        toDis = this.y - arr[0].dis
                        this.isTop = true
                        break
                    case "bottom":
                        toDis = this.y + arr[0].dis
                        this.isBottom = true
                        break
                }
                this._isDrag = false
                if (this.isLeft) {
                    obj.to({ x: toDis }, 100)
                        .to({ scaleX: 1, scaleY: 1, x: toDis - 50 }, 150)
                }
                else if (this.isRight) {
                    obj.to({ x: toDis }, 100)
                        .to({ scaleX: 1, scaleY: 1, x: toDis + 50 }, 150)
                }
                else if (this.isTop) {
                    obj.to({ y: toDis }, 100)
                        .to({ scaleX: 1, scaleY: 1, y: toDis - 50 }, 150)
                }
                else if (this.isBottom) {
                    obj.to({ y: toDis }, 100)
                        .to({ scaleX: 1, scaleY: 1, y: toDis + 50 }, 150)
                }
                else {
                    obj.to({ scaleX: 1, scaleY: 1 }, 150)
                }
            }
            this._touchStatus = false
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.btnTouchMove, this)
        }
        private btnTouchMove(e: egret.TouchEvent) {
            if (this._touchStatus) {
                egret.Tween.removeTweens(this)
                this.popMenuGroup.visible = false
                let distance = egret.Point.distance(this.touchPoint, new egret.Point(e.stageX, e.stageY))
                if (!this._isDrag) {
                    this._isDrag = distance > 10
                }
                let toPosition: egret.Point = new egret.Point(e.stageX - this._distance.x, e.stageY - this._distance.y)
                this.x = toPosition.x
                this.y = toPosition.y
                let p = this.localToGlobal(this.btn.x, this.btn.y)
                let dtx, dty
                if (p.x - this.btn.width / 2 < 0) {
                    dtx = Math.abs(p.x - this.btn.width / 2)
                    this.x += dtx
                    this.isLeft = true
                }
                else if (p.x + this.btn.width / 2 > egret.MainContext.instance.stage.stageWidth) {
                    dtx = Math.abs(p.x + this.btn.width / 2) - egret.MainContext.instance.stage.stageWidth
                    this.x -= dtx
                    this.isRight = true
                }
                else {
                    this.isLeft = false
                    this.isRight = false
                }
                if (p.y - this.btn.height / 2 < 0) {
                    dty = Math.abs(p.y - this.btn.height / 2)
                    this.y += dty
                    this.isTop = true
                }
                else if (p.y + this.btn.height / 2 > egret.MainContext.instance.stage.stageHeight) {
                    dty = Math.abs(p.y + this.btn.height / 2) - egret.MainContext.instance.stage.stageHeight
                    this.y -= dty
                    this.isBottom = true
                }
                else {
                    this.isTop = false
                    this.isBottom = false
                }
            }
        }
        public reSet() {
            let p = this.localToGlobal(this.btn.x, this.btn.y)
            let dtx, dty
            if (p.x - this.btn.width / 2 < 0) {
                dtx = Math.abs(p.x - this.btn.width / 2)
                this.x += dtx
            }
            else if (p.x + this.btn.width / 2 > egret.MainContext.instance.stage.stageWidth) {
                dtx = Math.abs(p.x + this.btn.width / 2) - egret.MainContext.instance.stage.stageWidth
                this.x -= dtx
            }
            if (p.y - this.btn.height / 2 < 0) {
                dty = Math.abs(p.y - this.btn.height / 2)
                this.y += dty
            }
            else if (p.y + this.btn.height / 2 > egret.MainContext.instance.stage.stageHeight) {
                dty = Math.abs(p.y + this.btn.height / 2) - egret.MainContext.instance.stage.stageHeight
                this.y -= dty
            }
        }
        public updateButton() {
            this.enterFullScreen.visible = !this.isFullScreen
            this.exitFullScreen.visible = this.isFullScreen
            this.lightingOn.visible = !this.isLightOn
            this.lightingOff.visible = this.isLightOn
        }
        private clickedEnterFullScreen() {
            Utils.fullScreen()
            this.isFullScreen = true
            this.updateButton()
        }
        private clickedExitFullScreen() {
            Utils.exitScreen()
            this.isFullScreen = false
            this.updateButton()
        }
        private clickedRefresh() {
            // location = location

            // window.location.reload()
            if (Utils.isWeiXin()) {
                var len = window.location.href.indexOf("?")
                if (len > 0) {
                    window.location.href = window.location.href.substring(0, len) + "?" + Math.random()
                } else {
                    window.location.href = window.location.href + "?" + Math.random()
                }
            } else {
                //部分浏览器全屏之后调用上面的刷新方法无效
                location.reload()
            }

        }
        private ClickedLightingOn() {
            this.isLightOn = true
            this.updateButton()
        }
        private ClickedLightingOff() {
            this.isLightOn = false
            this.updateButton()
        }
        private updateLayout() {
            if (egret.Capabilities.os == "iOS") {
                this.bgImage.width = 350
                this.enterFullScreenGroup.visible = false
                // this.lightingGroup.visible = false
            }
        }
        private onPause(evt: egret.Event) {
            this.isFullScreen = false
            this.updateButton()
        }
        public clean() {
            super.clean()
            EAppFacade.getInstance().removeCommand(GameCmd.onPause, this.onPause, this)
        }
    }
}