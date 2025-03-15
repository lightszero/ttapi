import { tt } from "../../ttapi/ttapi.js";
import { Color, Rectangle } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";


export class QUI_DropButton extends QUI.QUI_BaseElement {
    constructor(touchid: number) {
        super();
        this._pressid = touchid;
        this.localRect.setByRect(new Rectangle(0, 0, 100, 100));
        this.colorNormal = Color.White;
        this.colorActive = new Color(0.6, 0.6, 0.9, 1);
    }

    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_DropButton;
    }
    ElemNormal: QUI.QUI_IElement | null = null;

    colorNormal: Color;
    colorActive: Color;

    BindKey: string = null;
    _active: boolean = false;

    _pressid: number = -1;
    UsePress(pressid: number) {
        if (this._pressid == -1) {
            this._pressid = pressid;
            this._active = false;
        }
    }

    OnPressUp: (() => void) | null = null;
    CancelTouch() {
        this._active = false;
        this._pressid = -1;
        super.CancelTouch();
    }
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        let kill = super.OnTouch(_canvas, touchid, press, move, x, y);
        if (kill) return true;

        //this.OnTouch_Impl();
        let rect = this.GetWorldRect();
        let x2 = rect.X + rect.Width;
        let y2 = rect.Y + rect.Height;

        //console.log("touch " + touchid + " press=" + press + " x=" + x + "y=" + y);

        //拖动
        if (press == true && this._pressid == touchid) {
            if (x >= rect.X && x < x2 && y >= rect.Y && y < y2) {
                this._active = true;
                //return true;
            }
            else
                this._active = false;
        }
        //释放
        if (press == false && this._pressid == touchid) {

            this._active = false;
            this._pressid = -1;

            if (x >= rect.X && x < x2 && y >= rect.Y && y < y2) {
                if (this.OnPressUp != null)
                    this.OnPressUp();
                //return true;
            }

        }
        return false;
    }
    OnRender(_canvas: QUI_Canvas): void {


        //this.Render_impl();

        if (this.ElemNormal != null) {
            (this.ElemNormal as any)._parent = this;

            this.ElemNormal.OnRender(_canvas)
        }


        super.OnRender(_canvas);
    }
    OnUpdate(_canvas: QUI_Canvas, delta: number): void {

        if (this._active) {
            if (this.ElemNormal != null) {
                this.ElemNormal.localColor = this.colorActive;
                this.ElemNormal.OnUpdate(_canvas, delta)
            }
        }
        else {
            if (this.ElemNormal != null) {
                this.ElemNormal.localColor = this.colorNormal;
                this.ElemNormal.OnUpdate(_canvas, delta)
            }
        }
        super.OnUpdate(_canvas, delta);
    }
}