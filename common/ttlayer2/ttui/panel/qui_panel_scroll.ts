
import { tt } from "../../../ttapi/ttapi.js";
import { QUI_Grow } from "../ext/qui_grow.js";
import * as QUI from "../qui_base.js"
import { QUI_Canvas } from "../qui_canvas.js";
import { QUI_Panel } from "./qui_panel.js";


//滚动面板
export class QUI_Panel_Scroll extends QUI_Panel {
    constructor() {
        super();
        this.panelOffsetX = this.panelOffsetWantX = 0;
        this.panelOffsetY = this.panelOffsetWantY = 0;
        this.panelWidth = 250;
        this.panelHeight = 250;
        this.container = new QUI_Grow();
        this.container._parent = this;
        this.container.localRect.SetAsFill();
        // this._container.picker = this;
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Panel_Scroll;
    }

    protected panelOffsetX: number;
    protected panelOffsetY: number;
    private panelOffsetWantX: number;
    private panelOffsetWantY: number;
    panelWidth: number;
    panelHeight: number;
    Scroll(x: number, y: number) {

        this.panelOffsetWantX += x;
        this.panelOffsetWantY += y;
        let rectlimit = this.GetWorldRect();
        let width = rectlimit.Width - this._border.XLeft - this._border.XRight;
        let height = rectlimit.Height - this._border.YTop - this._border.YBottom;

        if (this.panelOffsetWantX < -(this.panelWidth - width))
            this.panelOffsetWantX = -(this.panelWidth - width);
        if (this.panelOffsetWantY < -(this.panelHeight - height))
            this.panelOffsetWantY = -(this.panelHeight - height);

        if (this.panelOffsetWantX > 0)
            this.panelOffsetWantX = 0;
        if (this.panelOffsetWantY > 0)
            this.panelOffsetWantY = 0;
    }
    dragDist: number = 32;//拖动多少像素触发
    dragDirection: QUI.QUI_DragDriection = QUI.QUI_DragDriection.UpToDown;
    protected updateContainerPos(): void {
        //跳过标准的边界设置，
        //scrollPanel的container 没有边界
        this.container.localRect.radioX1 = 0;
        this.container.localRect.radioY1 = 0;
        this.container.localRect.radioX2 = 0;
        this.container.localRect.radioY2 = 0;
        this.container.localRect.offsetX1 = this.panelOffsetX;
        this.container.localRect.offsetY1 = this.panelOffsetY;
        this.container.localRect.offsetX2 = this.panelOffsetX + this.panelWidth;
        this.container.localRect.offsetY2 = this.panelOffsetY + this.panelHeight;
    }
    private _press: boolean = false;
    private _pressid: number = 0;
    private _pressx: number;
    private _pressy: number;
    private _drag: boolean = false;
    private _dragy: number = 0;
    private _dragx: number = 0;
    dragout: boolean = true;//是否能拖出范围，移动端通常都可以
    CancelTouch() {
        this._press = false;
        this._pressid = -1;

    }
    OnWheel(canvas: QUI_Canvas, dx: number, dy: number, dz: number): boolean {
        let kill = super.OnWheel(canvas, dx, dy, dz);;
        if (kill)
            return true;

        console.log("wheel:" + dx + "," + dy + "," + dz);
        if (this.dragDirection == QUI.QUI_DragDriection.None)
            return false;
        else if (this.dragDirection == QUI.QUI_DragDriection.LeftToRight) {
            dy = 0;
            dz = 0;
        }
        else if (this.dragDirection == QUI.QUI_DragDriection.UpToDown) {
            dx = 0;
            dz = 0;
        }
        this.Scroll(dx, dy);
        return true;


    }
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {

        //无拖拽
        if (this.dragDirection == QUI.QUI_DragDriection.None) {
            return super.OnTouch(_canvas, touchid, press, move, x, y);
        }



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
                let dist = this._calcDragDist(x, y);
                if (dist > this.dragDist * tt.graphic.getDevicePixelRadio()) {
                    this._drag = true;
                    this._dragx = this.panelOffsetX;
                    this._dragy = this.panelOffsetY;
                    this._pressy = y;
                    this._pressx = x;
                }
            }
            else {
                this._dragPanel(x, y);

            }
        }
        if (this._pressid == touchid && this._press == true && press == false) {
            this._press = false;
            this._pressid = 0;
            this._drag = false;
        }
        //加入滚动效果
        if (this._drag) {
            //this._container.CancelTouch();
            return true;
        }
        else {
            return super.OnTouch(_canvas, touchid, press, move, x, y);
        }

    }
    private _calcDragDist(x: number, y: number): number {
        if (this.dragDirection == QUI.QUI_DragDriection.None)
            return 0;

        if (this.dragDirection == QUI.QUI_DragDriection.LeftToRight) {
            return Math.abs(x - this._pressx);
        }
        if (this.dragDirection == QUI.QUI_DragDriection.UpToDown) {
            return Math.abs(y - this._pressy);
        }
        let xadd = (x - this._pressx);
        let yadd = (y - this._pressy);
        return Math.sqrt(xadd * xadd + yadd * yadd);
    }
    private _dragPanel(x: number, y: number): void {
        if (this.dragDirection == QUI.QUI_DragDriection.None)
            return;
        if (this.dragDirection == QUI.QUI_DragDriection.UpToDown || this.dragDirection == QUI.QUI_DragDriection.Both)
            this.panelOffsetY = this._dragy + (y - this._pressy);
        if (this.dragDirection == QUI.QUI_DragDriection.LeftToRight || this.dragDirection == QUI.QUI_DragDriection.Both)
            this.panelOffsetX = this._dragx + (x - this._pressx);


        let rectlimit = this.GetWorldRect();
        let width = rectlimit.Width - this._border.XLeft - this._border.XRight;
        let height = rectlimit.Height - this._border.YTop - this._border.YBottom;

        this.panelOffsetWantX = this.panelOffsetX;
        this.panelOffsetWantY = this.panelOffsetY;

        if (this.panelOffsetWantX < -(this.panelWidth - width))
            this.panelOffsetWantX = -(this.panelWidth - width);
        if (this.panelOffsetWantY < -(this.panelHeight - height))
            this.panelOffsetWantY = -(this.panelHeight - height);

        if (this.panelOffsetWantX > 0)
            this.panelOffsetWantX = 0;
        if (this.panelOffsetWantY > 0)
            this.panelOffsetWantY = 0;

        if (this.dragout == false) {
            this.panelOffsetX = this.panelOffsetWantX;
            this.panelOffsetY = this.panelOffsetWantY;
        }
    }
    OnUpdate(_canvas: QUI_Canvas, delta: number): void {
        if (this._drag == false) {
            this.panelOffsetX = this.panelOffsetX + (this.panelOffsetWantX - this.panelOffsetX) * 0.5;
            this.panelOffsetY = this.panelOffsetY + (this.panelOffsetWantY - this.panelOffsetY) * 0.5;
        }
        super.OnUpdate(_canvas, delta);

        this.panelWidth = (this.container as QUI_Grow).GetContextWidth();
        this.panelHeight = (this.container as QUI_Grow).GetContextHeight();
    }



}