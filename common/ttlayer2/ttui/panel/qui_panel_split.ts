
import * as QUI from "../qui_base.js"

import { QUI_DragButton } from "../ext/qui_dragbutton.js";
import { QUI_Canvas } from "../qui_canvas.js";
import { Border, QUI_Panel, QUI_Resource, Rectangle } from "../../ttlayer2.js";

//切分面板
export class QUI_Panel_Split extends QUI.QUI_BaseElement {
    constructor() {
        super();
        this.splitDir = QUI.QUI_Direction2.Horizontal;
        this.localRect.SetAsFill();
        this._panel1 = new QUI_Panel();
        this._panel1._parent = this;
        this._panel1.localRect.SetAsFill();
        this._panel1.foreElements = [];
       
        this._panel1.foreElements.push(QUI_Resource.CreateGUI_Border());
        this._panel2 = new QUI_Panel();
        this._panel2._parent = this;
        this._panel2.localRect.SetAsFill();
        this._panel2.foreElements = [];
        this._panel2.foreElements.push(QUI_Resource.CreateGUI_Border());
        //this.borderElement = QUI_Resource.CreateGUI_Border();
        this._border = new Border(1, 1, 1, 1);

        this._splitButton = new QUI_DragButton();
        this._splitButton._parent = this;
        this._splitButton.localRect.SetAsFill();
        this._splitButton.OnDragStart = this._ondragstart.bind(this);
        this._splitButton.OnDrag = this._ondrag.bind(this);
        // this._splitButton.OnDragEnd = this._ondragend.bind(this);

        this.splitSize = 8;

        this.updateContainerPos();
        this.updateSplitBtnPos();
    }
    // _dragx: number;
    // _dragy: number;
    private _dragvalue: number;
    _ondragstart(x: number, y: number): void {
        // this._dragx = x;
        // this._dragy = y;
        this._dragvalue = this.splitPos;
    }
    _ondrag(x: number, y: number, bx: number, by: number): void {
        if (this.splitDir == QUI.QUI_Direction2.Horizontal) {
            let xadd = (x - bx) / this.GetWorldRect().Width;
            this.splitPos = this._dragvalue + xadd;
        }
        else {
            let yadd = (y - by) / this.GetWorldRect().Height;
            this.splitPos = this._dragvalue + yadd;
        }
        if (this.splitPos < 0.1)
            this.splitPos = 0.1;
        if (this.splitPos > 0.9)
            this.splitPos = 0.9;
        this.updateSplitBtnPos();
    }
    // _ondragend(x: number, y: number): void {
    //     this.updateSplitBtnPos();
    // }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Panel_Split;
    }

    backElement: QUI.QUI_BaseElement;
    borderElement: QUI.QUI_BaseElement;//面板的边界外观
    protected _border: Border;//面板的边距
    getBorder(): Border {
        return this._border;
    }
    splitSize: number = 16;
    splitPos: number = 0.5;
    splitDir: QUI.QUI_Direction2 = QUI.QUI_Direction2.Horizontal;
    private _splitButton: QUI_DragButton;
    getSplitButton(): QUI_DragButton {
        return this._splitButton;
    }
    OnRender(_canvas: QUI_Canvas): void {
        if (this.backElement != null) {
            this.backElement.OnRender(_canvas);
        }
        //根据边距计算限制区域
        let batcher = _canvas.batcherUI;


        let target = batcher.getTarget();
        batcher.EndDraw();


        {
            target.PushLimitRect(this._panel1.getWorldRectScale(_canvas.camera.Scale));

            batcher.ResumeDraw();
            this._panel1.OnRender(_canvas);
            batcher.EndDraw();

            target.PopLimitRect();
        }
        {
            target.PushLimitRect(this._panel2.getWorldRectScale(_canvas.camera.Scale));

            batcher.ResumeDraw();
            this._panel2.OnRender(_canvas);
            batcher.EndDraw();

            target.PopLimitRect();
        }
        batcher.ResumeDraw();

        this._splitButton.OnRender(_canvas);

        if (this.borderElement != null)
            this.borderElement.OnRender(_canvas);
    }

    protected updateSplitBtnPos(): void {

        if (this.splitDir == QUI.QUI_Direction2.Horizontal) {

            this._splitButton.localRect.radioX1 = this.splitPos;
            this._splitButton.localRect.radioX2 = this.splitPos;
            this._splitButton.localRect.radioY1 = 0;
            this._splitButton.localRect.radioY2 = 1;
            this._splitButton.localRect.offsetX1 = -this.splitSize * 0.5;
            this._splitButton.localRect.offsetX2 = this.splitSize * 0.5;
            this._splitButton.localRect.offsetY1 = this._border.YTop;
            this._splitButton.localRect.offsetY2 = -this._border.YBottom;
        }
        else {


            this._splitButton.localRect.radioY1 = this.splitPos;
            this._splitButton.localRect.radioY2 = this.splitPos;
            this._splitButton.localRect.radioX1 = 0;
            this._splitButton.localRect.radioX2 = 1;
            this._splitButton.localRect.offsetX1 = this._border.XLeft;
            this._splitButton.localRect.offsetX2 = this._border.XRight;
            this._splitButton.localRect.offsetY1 = -this.splitSize * 0.5;
            this._splitButton.localRect.offsetY2 = this.splitSize * 0.5;
        }
    }
    protected updateContainerPos(): void {

        if (this.splitDir == QUI.QUI_Direction2.Horizontal) {
            this._panel1.localRect.radioX1 = 0;
            this._panel1.localRect.radioY1 = 0;
            this._panel1.localRect.radioX2 = this.splitPos;
            this._panel1.localRect.radioY2 = 1;
            this._panel1.localRect.offsetX1 = this._border.XLeft;
            this._panel1.localRect.offsetX2 = this.splitSize * -0.5;
            this._panel1.localRect.offsetY1 = this._border.YTop;
            this._panel1.localRect.offsetY2 = -this._border.YBottom;

            this._panel2.localRect.radioX1 = this.splitPos;
            this._panel2.localRect.radioY1 = 0;
            this._panel2.localRect.radioX2 = 1;
            this._panel2.localRect.radioY2 = 1;
            this._panel2.localRect.offsetX1 = this.splitSize * 0.5;
            this._panel2.localRect.offsetX2 = -this._border.XRight;
            this._panel2.localRect.offsetY1 = this._border.YTop;
            this._panel2.localRect.offsetY2 = -this._border.YBottom;

        }
        else {
            this._panel1.localRect.radioX1 = 0;
            this._panel1.localRect.radioY1 = 0;
            this._panel1.localRect.radioX2 = 1;
            this._panel1.localRect.radioY2 = this.splitPos;
            this._panel1.localRect.offsetX1 = this._border.XLeft;
            this._panel1.localRect.offsetX2 = -this._border.XRight;
            this._panel1.localRect.offsetY1 = this._border.YTop;
            this._panel1.localRect.offsetY2 = this.splitSize * -0.5;

            this._panel2.localRect.radioX1 = 0;
            this._panel2.localRect.radioY1 = this.splitPos;
            this._panel2.localRect.radioX2 = 1;
            this._panel2.localRect.radioY2 = 1;
            this._panel2.localRect.offsetX1 = this._border.XLeft;
            this._panel2.localRect.offsetX2 = this._border.XRight;
            this._panel2.localRect.offsetY1 = this.splitSize * 0.5;
            this._panel2.localRect.offsetY2 = -this._border.YBottom;

        }
    }
    OnUpdate(_canvas: QUI_Canvas, delta: number): void {
        if (this.backElement != null) {
            (this.backElement as QUI.QUI_BaseElement)._parent = this;
            this.backElement.localRect.SetAsFill();
            this.backElement.OnUpdate(_canvas, delta);
        }
        this.updateContainerPos();
        this.updateSplitBtnPos();

        this._panel1.OnUpdate(_canvas, delta);
        this._panel2.OnUpdate(_canvas, delta);
        this._splitButton.OnUpdate(_canvas, delta);

        if (this.borderElement != null) {
            (this.borderElement as QUI.QUI_BaseElement)._parent = this;
            this.borderElement.localRect.SetAsFill();
            this.borderElement.OnUpdate(_canvas, delta);
        }

        super.OnUpdate(_canvas, delta);
    }
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        let skippanel1 = false;
        let skippanel2 = false;
        if (press == true && move == false) {
            {
                let rectlimit = this._panel1.GetWorldRect();
                let x1 = rectlimit.X;
                let y1 = rectlimit.Y;
                let x2 = rectlimit.X + rectlimit.Width;
                let y2 = rectlimit.Y + rectlimit.Height;
                if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {

                }
                else {
                    //按下事件在panel限制只外，不往下传了
                    skippanel1 = true;
                }
            }
            {
                let rectlimit = this._panel2.GetWorldRect();
                let x1 = rectlimit.X;
                let y1 = rectlimit.Y;
                let x2 = rectlimit.X + rectlimit.Width;
                let y2 = rectlimit.Y + rectlimit.Height;
                if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {

                }
                else {
                    //按下事件在panel限制只外，不往下传了
                    skippanel2 = true;
                }
            }
        }

        if (this._splitButton.OnTouch(_canvas, touchid, press, move, x, y))
            return true;

        var b1 = skippanel1 ? false : this._panel1.OnTouch(_canvas, touchid, press, move, x, y);
        if (b1) return true;
        var b2 = skippanel2 ? false : this._panel2.OnTouch(_canvas, touchid, press, move, x, y);
        return b2;
    }
    protected _panel1: QUI_Panel;
    protected _panel2: QUI_Panel;
    GetPanel1(): QUI_Panel {
        return this._panel1;
    }
    GetPanel2(): QUI_Panel {
        return this._panel2;
    }
  


}