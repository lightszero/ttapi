import { tt } from "../../ttapi/ttapi.js";
import { Color, QUI_Container, QUI_ImageScale9, QUI_Label, QUI_Resource, Rectangle } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";


export class QUI_Button extends QUI.QUI_BaseElement {
    constructor() {
        super();

        this.localRect.setByRect(new Rectangle(0, 0, 100, 32));
        let normal = new QUI_Container();


        {
            normal.localRect.SetAsFill();
            let normalback = new QUI_ImageScale9(QUI_Resource.GetBorderScaleR());
            normal.AddChild(normalback);
            normalback.localColor = new Color(1, 1, 1, 1);
            normalback.localRect.SetAsFill();

            let txt = new QUI_Label();

            txt.localRect.SetAsFill();
            txt.text = "Button";
            normal.AddChild(txt)
        }

        this.elemNormal = normal;
        this.colorNormal = Color.White;
        this.colorPress = new Color(0.9, 0.9, 0.3, 1);
    }
    SetText(text: string): void {
        if (this.elemNormal == null || this.elemNormal.GetChildCount() < 2)
            return;
        let e = this.elemNormal.GetChild(1);
        if (e == null || e.GetElementType() != QUI.QUI_ElementType.Element_Label) {
            return;
        }
        (e as QUI_Label).text = text;
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Button;
    }
    elemNormal: QUI.QUI_BaseContainer | null = null;

    colorNormal: Color;
    colorPress: Color;
    BindKey: string = null;
    _press: boolean = false;
    _keypress: boolean = false;
    _pressid: number = -1;
    UsePress(pressid: number) {
        if (this._pressid == -1) {
            this._pressid = pressid;
            this._press = true;
        }
    }
    OnClick: (() => void) | null = null;
    OnPressDown: ((id: number) => void) | null = null;
    OnPressUp: (() => void) | null = null;
    CancelTouch(): void {
        this._press = false;
        this._pressid = -1;
    }
    OnTouch(canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        let kill = super.OnTouch(canvas, touchid, press, move, x, y);
        if (kill) return true;

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
                console.log("btn down." + touchid);
                if (this.OnPressDown != null) {
                    canvas.InvokeEvent(() => {
                        this.OnPressDown(touchid);

                    });
                }
                return true;
            }
        }
        //拖动
        if (this._press == true && press == true && this._pressid == touchid) {
            return true;
        }
        //释放
        if (this._press == true && press == false && this._pressid == touchid) {
            this._press = false;
            this._pressid = -1;
            console.log("btn up." + touchid);
            if (this.OnPressUp != null) {
                canvas.InvokeEvent(() => {
                    this.OnPressUp();

                });
            }
            if (x >= rect.X && x < x2 && y >= rect.Y && y < y2) {
                console.log("btn click.");
                if (this.OnClick != null) {
                    // if (x >= rect.X && x < x2 && y >= rect.Y && y < y2) {
                    canvas.InvokeEvent(() => {
                        this.OnClick();

                    });
                    //return true;
                    //}
                }
                return true;
            }

        }
        return false;
    }
    OnRender(_canvas: QUI_Canvas): void {


        //this.Render_impl();

        if (this.elemNormal != null) {
            (this.elemNormal as any)._parent = this;

            this.elemNormal.OnRender(_canvas)
        }



        super.OnRender(_canvas);
    }
    OnUpdate(_canvas: QUI_Canvas, delta: number): void {
        if (this.BindKey != null) {
            let keydown = tt.input.IsKeyDown(this.BindKey);
            if (this._keypress && !keydown) {
                this._keypress = false;
                this._press = false;
                if (this.OnPressDown != null)
                    this.OnPressUp();
            }
            else if (this._keypress == false && keydown) {
                this._keypress = true;
                this._press = true;
                if (this.OnPressDown != null)
                    this.OnPressDown(0);
            }
        }
        if (this._press) {
            if (this.elemNormal != null) {
                this.elemNormal.localColor = this.colorPress;
                this.elemNormal.OnUpdate(_canvas, delta)
            }
        }
        else {
            if (this.elemNormal != null) {
                this.elemNormal.localColor = this.colorNormal;
                this.elemNormal.OnUpdate(_canvas, delta)
            }
        }

        super.OnUpdate(_canvas, delta);
    }
}