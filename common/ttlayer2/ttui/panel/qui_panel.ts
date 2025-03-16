

import { Border, QUI_Resource, Rectangle } from "../../ttlayer2.js";
import * as QUI from "../qui_base.js"
import { QUI_Canvas } from "../qui_canvas.js";



//Panel 是最简单的组件
export class QUI_Panel extends QUI.QUI_BaseElement {
    constructor() {
        super();

        this.localRect.SetAsFill();
        this._container = new QUI.QUI_Container();
        this._container._parent = this;
        this._container.localRect.SetAsFill();
        this._border = new Border(2, 2, 2, 2);
        this.backElements = [];
        this.foreElements = [];

        this.foreElements.push(QUI_Resource.CreateGUI_Border());
    }

    GetContainer(): QUI.QUI_Container {
        return this._container;
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Panel;
    }

    backElements: QUI.QUI_BaseElement[];
    foreElements: QUI.QUI_BaseElement[];//面板的边界外观
    protected _border: Border;//面板的边距
    getBorder(): Border {
        return this._border;
    }
    protected OnRenderBack(_canvas: QUI_Canvas) {
        if (this.backElements != null) {
            for (var i = 0; i < this.backElements.length; i++) {
                this.backElements[i].OnRender(_canvas);
            }
        }
    }
    protected OnRenderFore(_canvas: QUI_Canvas) {
        if (this.foreElements != null) {
            for (var i = 0; i < this.foreElements.length; i++) {
                this.foreElements[i].OnRender(_canvas);
            }
        }
    }
    protected OnUpdateBack(_canvas: QUI_Canvas, delta: number): void {
        if (this.backElements != null) {
            for (var i = 0; i < this.backElements.length; i++) {
                let elem = this.backElements[i] as QUI.QUI_BaseElement;
                elem._parent = this;
                //elem.localRect.setAsFill();
                elem.OnUpdate(_canvas, delta);
            }
        }
    }
    protected OnUpdateFore(_canvas: QUI_Canvas, delta: number): void {
        if (this.foreElements != null) {
            for (var i = 0; i < this.foreElements.length; i++) {
                let elem = this.foreElements[i] as QUI.QUI_BaseElement;
                elem._parent = this;
                //elem.localRect.setAsFill();
                elem.OnUpdate(_canvas, delta);
            }
        }
    }
    protected CancelTouchFore() {
        if (this.foreElements != null) {
            for (var i = this.foreElements.length - 1; i >= 0; i--) {
                let elem = this.foreElements[i] as QUI.QUI_BaseElement;
                elem.CancelTouch();
            }
        }
    }
    protected CancelTouchBack() {

        if (this.backElements != null) {
            for (var i = this.backElements.length - 1; i >= 0; i--) {
                let elem = this.backElements[i] as QUI.QUI_BaseElement;
                elem.CancelTouch();
            }
        }
    }
    protected OnTouchFore(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        if (this.foreElements != null) {
            for (var i = this.foreElements.length - 1; i >= 0; i--) {
                let elem = this.foreElements[i] as QUI.QUI_BaseElement;
                let kill = elem.OnTouch(_canvas, touchid, press, move, x, y);
                if (kill)
                    return true;
            }
        }
        return false;
    }
    protected OnTouchBack(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {

        if (this.backElements != null) {
            for (var i = this.backElements.length - 1; i >= 0; i--) {
                let elem = this.backElements[i] as QUI.QUI_BaseElement;
                let kill = elem.OnTouch(_canvas, touchid, press, move, x, y);
                if (kill)
                    return true;
            }
        }
        return false;
    }
    OnRender(_canvas: QUI_Canvas): void {

        this.OnRenderBack(_canvas);
        let batcher = _canvas.batcherUI;

        //根据边距计算限制区域
        let s = _canvas.scale;
        let rectlimit = this.getWorldRectScale(s);
        rectlimit.X += this._border.XLeft * s;
        rectlimit.Y += this._border.YTop * s;
        rectlimit.Width -= (this._border.XLeft + this._border.XRight) * s;
        rectlimit.Height -= (this._border.YTop + this._border.YBottom) * s;

        let target = batcher.getTarget();
        batcher.EndDraw();

        target.PushLimitRect(rectlimit);

        batcher.BeginDraw(target);
        this._container.OnRender(_canvas);
        batcher.EndDraw();

        target.PopLimitRect();

        batcher.BeginDraw(target);
        this.OnRenderFore(_canvas);
    }

    protected updateContainerPos(): void {

        this._container.localRect.radioX1 = 0;
        this._container.localRect.radioY1 = 0;
        this._container.localRect.radioX2 = 1;
        this._container.localRect.radioY2 = 1;
        this._container.localRect.offsetX1 = this._border.XLeft;
        this._container.localRect.offsetX2 = -this._border.XRight;
        this._container.localRect.offsetY1 = this._border.YTop;
        this._container.localRect.offsetY2 = -this._border.YBottom;
    }
    OnUpdate(_canvas: QUI_Canvas, delta: number): void {
        this.OnUpdateBack(_canvas, delta);
        this.updateContainerPos();
        this._container.OnUpdate(_canvas, delta);
        this.OnUpdateFore(_canvas, delta);
        super.OnUpdate(_canvas, delta);
    }

    CancelTouch(): void {
        this.CancelTouchFore();
        super.CancelTouch();
        this.CancelTouchBack();
    }
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        let kill = this.OnTouchFore(_canvas, touchid, press, move, x, y);
        if (kill)
            return kill;

        if (press == true && move == false) {
            let rectlimit = this.GetWorldRect();
            let x1 = rectlimit.X + this._border.XLeft;
            let y1 = rectlimit.Y + this._border.YTop;
            let x2 = rectlimit.X + rectlimit.Width - this._border.XRight;
            let y2 = rectlimit.Y + rectlimit.Height - this._border.YBottom;
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {

            }
            else {
                //按下事件在panel限制只外，不往下传了
                return false;
            }
        }

        kill = this._container.OnTouch(_canvas, touchid, press, move, x, y);
        if (kill)
            return kill;
        kill = this.OnTouchBack(_canvas, touchid, press, move, x, y);
        return kill;
    }
    protected _container: QUI.QUI_Container;


}