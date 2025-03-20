
import { tt } from "../../../ttapi/ttapi.js";
import * as QUI from "../qui_base.js"
import { QUI_Canvas } from "../qui_canvas.js";
import { QUI_Panel } from "./qui_panel.js";


export class QUI_Panel_Scroll_Unlimit<T> extends QUI_Panel {
    constructor(updateUIFunc: (itemData: T, elem: QUI.QUI_BaseElement, id: number, pick: boolean) => QUI.QUI_BaseElement) {
        super();
        this.ResetItemFunc(updateUIFunc);
    }
    ResetItemFunc(updateUIFunc: (itemData: T, elem: QUI.QUI_BaseElement, id: number, pick: boolean) => QUI.QUI_BaseElement) {
        this._updateUIFunc = updateUIFunc;
        if (this._updateUIFunc != null) {
            for (var i = 0; i < 10; i++) {
                this._freeItem.push(this._updateUIFunc(null, null, -1, false));
            }
            this._itemheight = this._freeItem[0].localRect.offsetY2 - this._freeItem[0].localRect.offsetY1;
        }
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Panel_Scroll_Unlimit;
    }
  
    private _freeItem: QUI.QUI_BaseElement[] = [];

    private _itemheight: number = 0;
    _updateUIFunc: (itemData: T, elem: QUI.QUI_BaseElement, id: number, pick: boolean) => QUI.QUI_BaseElement
    panelValue: number = 0;
    panelWantValue: number = 0;
    ScrollZero() {
        this.panelValue = 0;
        this.panelWantValue = 0;
    }
    //列表的内容，这里放一个数据就行
    private _items: T[] = [];
    private _pickid: number = -1;
    getItems(): T[] {
        return this._items;
    }
    Clear() {
        this._items.splice(0);
        this._pickid = -1;
        this.ScrollZero();
    }
    getTotalHeight(): number {
        return this._items.length * this._itemheight;
    }
    PickAt(id: number): void {
        if (id < 0 || id >= this._items.length)
            id = -1;

        if (id != this._pickid && this.OnItemPick != null) {
            this._pickid = id;
            let pickitem: T = null;
            if (id != -1)
                pickitem = this._items[id];
            this.OnItemPick(id, pickitem);
        }

    }
    OnItemPick: (index: number, item: T) => void;
    //更新
    UpdateList(): void {

        let ystartindx = (this.panelValue / this._itemheight) | 0

        let height = this.container.GetWorldRect().Height;

        let y = ystartindx * this._itemheight - this.panelValue;

        //let endindex = -1;

        let visindex = 0;

        for (var i = ystartindx; i < this._items.length; i++) {


            // let index = i - ystartindx;

            //保证充足
            while (this.container.GetChildCount() <= visindex) {
                let reuseitem = null;
                if (this._freeItem.length > 0) {
                    reuseitem = this._freeItem.pop();
                }
                if (reuseitem == null)
                    this.container.AddChild(this._updateUIFunc(null, null, -1, false));
                else
                    this.container.AddChild(reuseitem);
            }
            if (i >= 0) {
                //改外形，改位置
                this._updateUIFunc(this._items[i], this.container.GetChild(visindex), i, this._pickid == i);

                let elem = this.container.GetChild(visindex);
                elem.localRect.offsetY1 = y;
                elem.localRect.offsetY2 = y + this._itemheight;
                visindex++;
            }

            y += this._itemheight;


            if (y > height) //移除多余的显示内容
            {
                //endindex = visindex;
                break;

            }
        }
        if (visindex >= 0)  //多余的丢Free
        {
            for (var j = visindex; j < this.container.GetChildCount(); j++) {
                this._freeItem.push(this.container.GetChild(j));

            }

            this.container.RemoveChildAt(visindex);

        }

    }
    //连模板都干掉
    ResetList(): void {
        this._freeItem.splice(0, this._freeItem.length);

        for (var i = 0; i < 10; i++) {
            this._freeItem.push(this._updateUIFunc(null, null, -1, false));
        }
        this.UpdateList();
    }

    private _press: boolean = false;
    private _pressid: number = 0;
    private _pressx: number;
    private _pressy: number;
    private _drag: boolean = false;
    private _dragy: number = 0;

    dragout: boolean = true;//是否能拖出范围，移动端通常都可以
    dragDist: number = 32;//拖动多少像素触发
    CancelTouch() {
        this._press = false;
        this._pressid = -1;
        super.CancelTouch();
    }
    OnTouch(_canvas:QUI_Canvas,touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {





        if (this._press == false && press == true && move == false) {
            let rectlimit = this.GetWorldRect();
            let x1 = rectlimit.X + this._border.XLeft;
            let y1 = rectlimit.Y + this._border.YTop;
            let x2 = rectlimit.X + rectlimit.Width - this._border.XRight;
            let y2 = rectlimit.Y + rectlimit.Height - this._border.YBottom;

            //按下
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                //inlimit  
                this._press = true;
                this._pressid = touchid;
                this._pressx = x;
                this._pressy = y;
            }
        }
        //拖动
        if (this._pressid == touchid && this._press == true && press == true && move == true) {
            if (!this._drag) {
                let dist = Math.abs(y - this._pressy);
                if (dist > this.dragDist * tt.graphic.getDevicePixelRadio()) {
                    this._drag = true;

                    this._dragy = this.panelValue;
                    this._pressy = y;
                    this._pressx = x;
                }
            }
            else {
                this._dragPanel(y);

            }
        }
        if (this._pressid == touchid && this._press == true && press == false) {
            this._press = false;
            this._pressid = 0;
            this._drag = false;
        }
        //加入滚动效果
        if (this._drag) {
            this.container.CancelTouch();
            return true;
        }
        else {
            return super.OnTouch(_canvas,touchid, press, move, x, y);
        }

    }
    _dragPanel(y: number): void {
        this.panelValue = this._dragy - (y - this._pressy);
        this.panelWantValue = this.panelValue;


        //限制
        if (this.panelWantValue < 0)
            this.panelWantValue = 0;
        let height = this.container.GetWorldRect().Height;
        let totalheight = this.getTotalHeight();
        let bot = totalheight - height;
        if (bot < 0) bot = 0;
        if (this.panelWantValue > bot)
            this.panelWantValue = bot;

        if (this.dragout == false) {
            this.panelValue = this.panelWantValue;
        }
    }


    OnUpdate(_canvas:QUI_Canvas,delta: number): void {
        if (this._drag == false) {
            this.panelValue = this.panelValue + (this.panelWantValue - this.panelValue) * 0.1;
        }
        this.UpdateList();
        super.OnUpdate(_canvas,delta);
    }
}