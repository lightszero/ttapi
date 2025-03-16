
import { tt } from "../../ttapi/ttapi.js";
import { Color, Font, QUI_Label, QUI_Resource, Rectangle, Resources, Vector2 } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";

export class QUI_TextBox_DOM extends QUI_Label {
    constructor() {
        super();
        this.cut = true;
        this.text = "input dom";
        this.border = QUI_Resource.CreateGUI_Border();
        this.border.localColor = new Color(0.8, 0.6, 0.3, 1);

    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_TextBox_DOM;
    }

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
    _divback: HTMLDivElement;
    _finishdom: boolean;
    //移植过程把Focus 机制丢了，不过也没啥用
    CancelTouch() {
        console.log("input cancel touch.")
        this._press = false;
        this._pressid = -1;
        this._divback?.remove();
        this._divback = null;
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
            this.Prompt(_canvas.scale);
            return true;
        }
        return false;
    }
    async Prompt(scale: number) {


        let txt: string = this.text;
        let r = this.getWorldRectScale(scale / tt.graphic.getDevicePixelRadio());
        let border = 8;
        let divback = this._divback = document.createElement("div");
        divback.style.backgroundColor = "#aaaaaa";
        divback.style.position = "absolute";
        divback.style.left = (r.X - border).toString();
        divback.style.top = (r.Y - border).toString();
        divback.style.width = (r.Width + border * 2).toString();
        divback.style.height = (r.Height + border * 2).toString();
        document.body.appendChild(divback);

        this._finishdom = false;
        {
            let input = document.createElement("input");
            input.type = "text";
            input.style.color = "#000";
            input.style.position = "absolute";
            input.style.left = border.toString();
            input.style.right = border.toString();
            input.style.right = border.toString();
            input.style.bottom = border.toString();
            input.value = this.text;
            input.maxLength = this.maxlen;
            input.style.fontFamily = this.font.GetFont();
            input.style.fontSize = "32";
            divback.appendChild(input);
            input.onchange = () => {
                //修改文本
                this.text = input.value;

            }
            input.onkeydown = (ev) => {
                //按键退出
                if (ev.code == "Escape" || ev.code == "Eascpe")
                    this._finishdom = true;
                console.log(ev.code);
            }

            input.onblur = () => {
                //失去焦点
                this._finishdom = true;
                
                console.log("onblur.");
            }

            input.focus()
        }
        while (!this._finishdom) {
            await tt.sleep(1);
        }

        this.CancelTouch();
    }
}