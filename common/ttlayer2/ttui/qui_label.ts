
import { tt } from "../../ttapi/ttapi.js";
import { Color, Rectangle, Vector2, Font, Resources } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";

export class QUI_Label extends QUI.QUI_BaseElement {

    constructor() {
        super();
        this.font = Resources.GetDefFont();
        let fs = 16 / this.font.GetFontSize();;
        this.fontBorder = 1 / fs;
        this.fontScale = new Vector2(fs, fs);
        this.valign = QUI.QUI_VAlign.Middle;
        this.halign = QUI.QUI_HAlign.Middle;
        this.text = "Label";
        this.localRect.setByRect(new Rectangle(0, 0, 100, 16));
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Label;
    }

    font: Font | null;
    text: string;

    withShadow: boolean = true;
    colorShadow: Color = new Color(0, 0, 0, 0.5);
    //是否裁剪
    fontScale: Vector2 = new Vector2(1.0, 1.0);
    fontBorder: number = 1;
    cut: boolean = false;
    halign: QUI.QUI_HAlign = QUI.QUI_HAlign.Middle;
    valign: QUI.QUI_VAlign = QUI.QUI_VAlign.Middle;
    private _pos: Vector2 = new Vector2(0, 0);
    GetTextWidth(): number {
        if (this.font == null)
            return 0;
        let w = this.font.SureText(this.text);
        return w * this.fontScale.X;
    }
    OnRender(_canvas: QUI_Canvas): void {

        //this.Render_impl();
        if (this.font != null) {
            let sw = this.getWorldRectScale(_canvas.scale);

            let fontheight = this.font.GetFontSize() * this.fontScale.Y * _canvas.scale;
            let fontwidth = this.font.SureText(this.text) * this.fontScale.X * _canvas.scale;
            if (this.halign == QUI.QUI_HAlign.Left) {
                this._pos.X = sw.X;
            }
            else if (this.halign == QUI.QUI_HAlign.Middle) {
                this._pos.X = (sw.X + (sw.Width - fontwidth) / 2);
            }
            else if (this.halign == QUI.QUI_HAlign.Right) {
                this._pos.X = (sw.X + (sw.Width - fontwidth));
            }

            if (this.valign == QUI.QUI_VAlign.Top) {
                this._pos.Y = sw.Y;
            }
            else if (this.valign == QUI.QUI_VAlign.Middle) {
                this._pos.Y = (sw.Y + (sw.Height - fontheight) / 2);
            }
            else if (this.valign == QUI.QUI_VAlign.Bottom) {
                this._pos.Y = (sw.Y + (sw.Height - fontheight));
            }

            let fontborder = this.fontBorder * this.fontScale.Y * _canvas.scale;

            let _outs = new Vector2(this.fontScale.X * _canvas.scale, this.fontScale.Y * _canvas.scale);
            if (this.cut) {
                if (this.withShadow) {
                    this.font.RenderTextWithLimit(_canvas.batcherUI, this.text, new Vector2(this._pos.X + fontborder, this._pos.Y + fontborder), _outs, this.colorShadow, sw);
                }
                this.font.RenderTextWithLimit(_canvas.batcherUI, this.text, this._pos, _outs, this._colorFinal, sw);
            }
            else {
                if (this.withShadow) {
                    this.font.RenderText(_canvas.batcherUI, this.text, new Vector2(this._pos.X + fontborder, this._pos.Y + fontborder), _outs, this.colorShadow);
                }
                this.font.RenderText(_canvas.batcherUI, this.text, this._pos, _outs, this._colorFinal);
            }

        }
        super.OnRender(_canvas);
    }

}