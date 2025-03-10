

import { Border, Rectangle } from "../../ttlayer2.js";
import * as QUI from "../qui_base.js"
import { QUI_Canvas } from "../qui_canvas.js";
import { QUI_Container } from "../qui_container.js";


//Panel 是最简单的组件
export class QUI_Panel extends QUI.QUI_BaseElement {
    constructor() {
        super();

        this.localRect.setByRect(new Rectangle(0, 0, 250, 250));
        this.container = new QUI_Container();
        this.container._parent = this;
        this.container.localRect.setAsFill();
        this._border = new Border(2, 2, 2, 2);
    }
    getElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Panel;
    }
  
    backElement: QUI.QUI_IElement;
    borderElement: QUI.QUI_IElement;//面板的边界外观
    protected _border: Border;//面板的边距
    getBorder(): Border {
        return this._border;
    }
    OnRender(_canvas: QUI_Canvas): void {
        if (this.backElement != null) {
            this.backElement.OnRender(_canvas);
        }
        let batcher = _canvas.batcherUI;

        //根据边距计算限制区域
        let s =_canvas.scale;
        let rectlimit = this.getWorldRectScale(s);
        rectlimit.X += this._border.XLeft*s;
        rectlimit.Y += this._border.YTop*s;
        rectlimit.Width -= (this._border.XLeft + this._border.XRight)*s;
        rectlimit.Height -= (this._border.YTop + this._border.YBottom)*s;

        let target = batcher.getTarget();
        batcher.EndDraw();

        target.PushLimitRect(rectlimit);

        batcher.BeginDraw(target);
        this.container.OnRender(_canvas);
        batcher.EndDraw();

        target.PopLimitRect();

        batcher.BeginDraw(target);
        if (this.borderElement != null)
            this.borderElement.OnRender(_canvas);
    }

    protected updateContainerPos(): void {

        this.container.localRect.radioX1 = 0;
        this.container.localRect.radioY1 = 0;
        this.container.localRect.radioX2 = 1;
        this.container.localRect.radioY2 = 1;
        this.container.localRect.offsetX1 = this._border.XLeft;
        this.container.localRect.offsetX2 = -this._border.XRight;
        this.container.localRect.offsetY1 = this._border.YTop;
        this.container.localRect.offsetY2 = -this._border.YBottom;
    }
    OnUpdate(_canvas:QUI_Canvas,delta: number): void {
        if (this.backElement != null) {
            (this.backElement as QUI.QUI_BaseElement)._parent = this;
            this.backElement.localRect.setAsFill();
            this.backElement.OnUpdate(_canvas,delta);
        }
        this.updateContainerPos();
        this.container.OnUpdate(_canvas,delta);
        if (this.borderElement != null) {
            (this.borderElement as QUI.QUI_BaseElement)._parent = this;
            this.borderElement.localRect.setAsFill();
            this.borderElement.OnUpdate(_canvas,delta);
        }
        super.OnUpdate(_canvas,delta);
    }
    OnTouch(_canvas:QUI_Canvas,touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        if (press == true && move == false) {
            let rectlimit = this.getWorldRect();
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

        return this.container.OnTouch(_canvas,touchid, press, move, x, y);
    }
    protected container: QUI_Container;
    getChildCount(): number {
        return this.container.getChildCount();
    }
    getChild(index: number): QUI.QUI_IElement | null {
        return this.container.getChild(index);
    }
    addChild(elem: QUI.QUI_IElement): void {

        this.container.addChild(elem);
    }
    removeChild(elem: QUI.QUI_IElement): void {
        this.container.removeChild(elem);
    }
    removeChildAll(): void {
        this.container.removeChildAll();
    }
    removeChildBegin(n: number): void {
        this.container.removeChildBegin(n);
    }
    removeChildAt(index: number): void {
        this.container.removeChildAt(index);
    }

}