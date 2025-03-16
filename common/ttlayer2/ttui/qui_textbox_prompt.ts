
import { tt } from "../../ttapi/ttapi.js";
import { Color, Font, QUI_Label, QUI_Resource, Rectangle, Resources, Vector2 } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";

export class QUI_TextBox_Prompt extends QUI_Label {
    constructor() {
        super();
        this.cut = true;
        this.border = QUI_Resource.CreateGUI_Border();
        this.border.localColor = new Color(0.3, 0.6, 0.8, 1);

    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_TextBox_Prompt;
    }
    message: string = "输入文本";

    maxlen: number = 10;

    border: QUI.QUI_BaseElement;

    OnUpdate(canvas: QUI_Canvas, delta: number): void {
        super.OnUpdate(canvas, delta);
        this.border?.OnUpdate(canvas, delta);
    }
    OnRender(_canvas: QUI_Canvas): void {

        super.OnRender(_canvas);

        if (this.border != null) {
            this.border.localRect.SetAsFill();
            (this.border as QUI.QUI_BaseElement)._parent = this;
        }

        this.border.OnRender(_canvas);

    }
    _press: boolean = false;
    _pressid: number = -1;
    CancelTouch() {
        this._press = false;
        this._pressid = -1;
        //super.CancelTouch();
    }
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        //let kill = super.OnTouch(_canvas, touchid, press, move, x, y);
        //if (kill) return true;

        //this.OnTouch_Impl();
        let rect = this.GetWorldRect();
        let x2 = rect.X + rect.Width;
        let y2 = rect.Y + rect.Height;

        //console.log("touch " + touchid + " press=" + press + " x=" + x + "y=" + y);
        //按下
        if (this._press == false && press == true && move == false) {
            if (x >= rect.X && x < x2 && y >= rect.Y && y < y2) {

                this._press = true;
                this._pressid = touchid;
                return true;
            }
        }
        if (this._press == true && press == false && this._pressid == touchid) {
            this._press = false;
            this._pressid = -1;
            this.Prompt();
            return true;
        }
        return false;
    }
    async Prompt() {
        let t = await tt.input.Prompt(this.message, this.text, this.maxlen, Resources.GetDefFont().GetFont());
        if (t.length > this.maxlen)
            t = t.substring(0, this.maxlen);
        this.text = t;
    }
}