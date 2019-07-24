class EScroller extends eui.Scroller {
    private elementSize: number = 10;
    private disOfElement: number = 0;
    private viewElementSize: number;
    private viewContentGroup: eui.Group;
    public scrollerHeight = 0;
    private sizeRect: eui.Rect;
    private hasSetData = false;
    public constructor() {
        super();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.release, this);
    }

    /**elementSize单元控件的尺寸 disOfElement单元控件的间距*/
    public setScrollerHeight(height) {
        this.scrollerHeight = height;
    }

    public setElementViewInfo(elementSize: number, disOfElement: number) {
        this.elementSize = elementSize;
        this.disOfElement = disOfElement;
    }

    private bInited: boolean = false;
    private maxShowCount: number;
    private contentSize: number;
    private init() {
        this.viewElementSize = this.elementSize + this.disOfElement;
        var viewSize = this.getViewSize();
        this.maxShowCount = Math.round(viewSize / this.viewElementSize) + 1;
        //            this.maxShowCount = Math.ceil(viewSize / this.viewElementSize) + 1;
        this.bInited = true;
        this.viewElementList = [];
        this.viewport = this.viewContentGroup;
        this.firstViewIndex = 0;
        this.setViewPortHeight();
        this.viewContentGroup.addChild(this.sizeRect);
        if (this.needOptimize()) {
            // this.sizeRect = new eui.Rect();
            // this.sizeRect.visible = false;
            // this.sizeRect.height = this.getContentSize();

            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
    }

    private setViewPortHeight() {
        this.sizeRect.height = this.getContentSize();
        // this.sizeRect.height = 2000;
    }

    private getMaxViewPortHeight() {
        return this.sizeRect.height;
    }

    private needOptimize() {
        return this.getElementCount() >= this.maxShowCount;
    }

    private getViewSize() {
        if (this.scrollerHeight == 0) {
            this.scrollerHeight = this.height;
            if (this.scrollerHeight == 0) {
                this.scrollerHeight = 400;
            }
        }
        return this.scrollerHeight;
    }
    private getContentSize() {
        return this.getElementCount() * this.viewElementSize - this.disOfElement;
    }

    public getElementCount() {
        if (this.dataContent) {
            return this.dataContent.length;
        }
        return 0;
    }

    private viewElementList: eui.UIComponent[];
    private addScrollerElement(data) {
        if (!this.bInited) {
            this.init();
        }

        var viewElementCount = this.viewElementList.length;

        if (viewElementCount < this.maxShowCount) {
            var element = this.createElement(data);
            var posY = this.getPos(viewElementCount);
            this.setPos(element, posY);
            //                element.y = posY;
            this.viewElementList.push(element);
            this.viewContentGroup.addChild(element);
        }
    }

    // public addItem(data){
    //     if (!this.bInited) {
    //         this.init();
    //     }
    //     this.setViewPortHeight();
    //     this.addScrollerElement(data);
    // }

    // public removeItem(){
    //     if (!this.bInited) {
    //         this.init();
    //     }
    //     this.removeScrollerElement();
    //     this.setViewPortHeight();
    // }

    private removeScrollerElement() {
        if (!this.bInited) {
            this.init();
        }

        var viewElementCount = this.viewElementList.length;
        var contentLen = this.dataContent.length;
        if (viewElementCount > 0) {
            for (var i: number = viewElementCount - 1; i >= contentLen; i--) {
                var element = this.viewElementList[i];
                var posY = this.getPos(viewElementCount);
                this.setPos(element, posY);
                this.viewElementList.splice(i, 1);
                this.viewContentGroup.removeChild(element);
            }
        }
    }

    private getPos(index: number) {
        return this.viewElementSize * index;
    }
    private setPos(element: eui.UIComponent, pos: number) {
        element.y = pos;
    }

    public clearContent() {
        //            this.viewport.verticalScrollPosition = 0; 
        if (this.viewport != null) {
            this.viewport.scrollV = 0;
        }
        this.bInited = false;
        if (this.viewContentGroup) {
            //                this.viewContentGroup.removeAllElements();
            this.viewContentGroup.removeChildren();
        } else {
            this.viewContentGroup = new eui.Group();
            this.sizeRect = new eui.Rect();
            this.sizeRect.visible = false;
            this.viewContentGroup.addChild(this.sizeRect);
        }
        if (this.needOptimize()) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
    }

    public release() {
        // this.addEventListener(eui.UIEvent.COMPLETE,this.onSelfViewComplete,this);      
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.release, this);
        this.clearContent();

    }

    private dataContent: any[];
    /**设置Scroller的内容*/
    public setScrollerContent(data: any[], bForcedFresh?: boolean) {
        this.dataContent = data;
        if (!this.hasSetData) {
            this.hasSetData = true;
            // if (this.dataContent != data || bForcedFresh) {
            // this.dataContent = data;
            this.clearContent();
            for (var i = 0; i < data.length; i++) {
                this.addScrollerElement(data[i]);
            }
        } else {
            this.updateUI();
        }

    }

    private elementCreate: Function;
    /**设置创建element的方法 实现格式fun(data):Element*/
    public setElementCreateFunction(fun: Function) {
        this.elementCreate = fun;
    }

    public createElement(data: any): eui.UIComponent {
        if (this.elementCreate) {
            var element = this.elementCreate.call(null, data);
            if (!this.needOptimize()) {
                this.onElementShown(element);
            }
            return element;
        }
        return null;
    }

    private updateElement: Function;
    /**设置更新element数据的方法 实现格式fun(element, data)*/
    public setElementUpdateDataFun(fun: Function) {
        this.updateElement = fun;
    }
    private updateElementData(element: eui.UIComponent, data: any) {
        if (this.updateElement) {
            this.updateElement.call(null, element, data);
        }
    }

    private updateElementUIFun: Function;
    /**设置更新element UI的方法 实现格式fun(element)*/
    public setElementUpdateUIFun(fun: Function) {
        this.updateElementUIFun = fun;
    }
    private updateElementUI(element: eui.UIComponent) {
        if (this.updateElementUIFun) {
            this.updateElementUIFun.call(null, element);
        }
    }
    private onShowElementFun: Function;
    /**设置element被显示的时候调用的方法 */
    public setElementOnShowFun(fun: Function) {
        this.onShowElementFun = fun;
    }
    private onElementShown(element: eui.UIComponent) {
        if (this.onShowElementFun) {
            this.onShowElementFun.call(null, element);
        }
    }


    private firstViewIndex: number = 0;
    private onEnterFrame() {
        if (!this.visible) {
            return;
        }
        if (!this.bInited) return;
        var viewY = this.localToGlobal().y - this.viewContentGroup.localToGlobal().y;
        var fIndex = this.getCurrentFirstIndexView(viewY);
        if (fIndex != this.firstViewIndex) {
            var updateNumber = Math.abs(fIndex - this.firstViewIndex)
            // var updateNumber = 2
            // console.log("fIndex " + fIndex)
            // console.log("this.firstViewIndex " + this.firstViewIndex)
            // console.log("updateNumber " + updateNumber)
            for(var i = 0;i < updateNumber;i ++)
            {
                var toIdx = 0
                var tempElement = null
                if(fIndex >= this.firstViewIndex)
                {
                    toIdx = fIndex + this.maxShowCount - 1 - (updateNumber - i - 1)
                    tempElement = this.viewElementList.shift()
                    this.viewElementList.push(tempElement)
                    // console.log("fromIdx " + this.firstViewIndex)
                }else
                {
                    toIdx = fIndex + (updateNumber - i - 1)
                    tempElement = this.viewElementList.pop()
                    this.viewElementList.unshift(tempElement)
                    // console.log("fromIdx " + (this.firstViewIndex + this.maxShowCount - 1))
                }
                // console.log("toIdx " + toIdx)
                var posY = this.getPos(toIdx);
                var data = this.dataContent[toIdx];
                this.setPos(tempElement, posY);
                this.updateElementData(tempElement, data);
            }
            this.firstViewIndex = fIndex;
            // for (var i = fIndex; i < fIndex + this.maxShowCount; i++) {
            //     var eIndex = i - fIndex;
            //     var element = this.viewElementList[eIndex];
            //     var data = this.dataContent[i];
            //     var posY = this.getPos(i);
            //     this.setPos(element, posY);
            //     this.updateElementData(element, data);
            // }
        }
        // this.updateViewItem();

        for (var i = 0; i < this.viewElementList.length; i++) {
            var element = this.viewElementList[i];
            var bVisible = this.getElementTop(element) - viewY < this.height;
            element.visible = bVisible;
            if (bVisible) {
                this.onElementShown(element);
            }
        }
    }

    private getElementTop(element: eui.UIComponent) {
        return element.y - element.anchorOffsetY;
    }

    private updateViewItem() {
        var viewY = this.localToGlobal().y - this.viewContentGroup.localToGlobal().y;
        var fIndex = this.getCurrentFirstIndexView(viewY);
        var viewNum = this.viewElementList.length;
        this.firstViewIndex = fIndex;
        for (var i = 0; i < viewNum; i++) {
            var element = this.viewElementList[i];
            var data = this.dataContent[i + fIndex];
            var posY = this.getPos(i + fIndex);
            this.setPos(element, posY);
            this.updateElementData(element, data);
        }

    }

    public updateUI() {
        if (!this.bInited) {
            this.init();
        }
        // for (var i = 0; i < this.viewElementList.length; i++) {
        //     var element = this.viewElementList[i];
        //     this.updateElementUI(element);
        // }
        var contentLen = this.dataContent.length;
        if (contentLen > 0) {
            var viewLen = this.viewElementList.length;
            var max = Math.min(contentLen, this.maxShowCount);
            for (var i: number = viewLen; i < max; i++) {
                var data = this.dataContent[i];
                this.addScrollerElement(data);
            }
        }
        this.removeScrollerElement();
        this.setViewPortHeight();
        var maxViewPortH = this.getMaxViewPortHeight() - this.height;
        if (this.viewport.scrollV > maxViewPortH) {
            this.viewport.scrollV = maxViewPortH;
            if (this.viewport.scrollV < 0) {
                this.viewport.scrollV = 0;
            }
        }
        this.updateViewItem();
    }

    private getCurrentFirstIndexView(viewY: number): number {
        var index = Math.floor(viewY / this.viewElementSize);
        if (index < 0) {
            index = 0;
        } else {
            var endIndex = this.getElementCount() - this.maxShowCount;
            if (index > endIndex) {
                index = endIndex;
            }
        }
        if (index < 0) index = 0;
        return index;
    }
}
window["EScroller"] = EScroller
