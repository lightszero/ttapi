import { Border, Color, QUI_Image, QUI_ImageScale9, QUI_Scale9, Resources, Sprite } from "../ttlayer2.js";

export class QUI_Resource {
    static _spriteWhite: Sprite = null;
    static get WhiteSprite(): Sprite {

        if (this._spriteWhite == null) {
            let white = Resources.getWhiteBlock();
            this._spriteWhite = Resources.GetPackElement().ConvertElemToSprite(white);
        }
        return this._spriteWhite;
    }

    static scale_border: QUI_Scale9 = null;
    static GetBorderScale(): QUI_Scale9 {
        if (this.scale_border == null) {
            this.scale_border = new QUI_Scale9(Resources.GetBorderBlock(), Resources.GetPackElement(), new Border(3, 3, 3, 3));
        }
        return this.scale_border;
    }
    static scale_border2: QUI_Scale9 = null;
    static GetBorder2Scale(): QUI_Scale9 {
        if (this.scale_border2 == null) {
            this.scale_border2 = new QUI_Scale9(Resources.GetBorder2Block(), Resources.GetPackElement(), new Border(3, 3, 3, 3));
        }
        return this.scale_border2;
    }
    static scale_borderr: QUI_Scale9 = null;
    static GetBorderScaleR(): QUI_Scale9 {
        if (this.scale_borderr == null) {
            this.scale_borderr = new QUI_Scale9(Resources.GetPackElement().GetElementByName("borderr"), Resources.GetPackElement(), new Border(3, 3, 3, 3));
        }
        return this.scale_borderr;
    }

    static CreateGUI_Border(): QUI_ImageScale9 {
        let image = new QUI_ImageScale9(this.GetBorderScale());
        image.localRect.setAsFill();
        return image;
    }
    static CreateGUI_Border2(): QUI_ImageScale9 {
        let image = new QUI_ImageScale9(this.GetBorder2Scale());
        image.localRect.setAsFill();
        return image;
    }

    // static CreateGUI_Label(text: string, color: Color = new Color(1, 1, 1, 1), scale: number = 1) {
    //     let txt = new QUI_Label(this.deffont, text);
    //     txt.color = color;
    //     txt.localRect.setAsFill();

    //     let fs = 16 / this.deffont.GetFontSize();;
    //     txt.fontBorder = 1 / fs;
    //     txt.fontScale = new Vector2(fs * scale, fs * scale);
    //     txt.valign = QUI_VAlign.Middle;
    //     txt.halign = QUI_HAlign.Middle;

    //     return txt;
    // }
    // static CreateGUI_Button(text: string, color: Color = new Color(1, 1, 1, 1), scale: number = 1): QUI_Button {
    //     let btn = new QUI_Button();
    //     let normal = new QUI_ImageScale9(this.GetBorderScaleR());
    //     let press = new QUI_ImageScale9(this.GetBorderScaleR());
    //     {
    //         normal.color = color;
    //         normal.localRect.setAsFill();

    //         let txt = new QUI_Label(this.deffont, text);
    //         txt.color = color;
    //         txt.localRect.setAsFill();
    //         let fs = 16 / this.deffont.GetFontSize();;
    //         txt.fontBorder = 1 / fs;
    //         txt.fontScale = new Vector2(fs * scale, fs * scale);
    //         normal.addChild(txt)
    //     }
    //     {
    //         let nc = color.Clone();
    //         nc.R *= 0.5;
    //         nc.G *= 0.5;
    //         nc.B *= 0.5;
    //         press.color = nc;
    //         press.localRect.setAsFill();

    //         let txt = new QUI_Label(this.deffont, text);
    //         txt.color = nc;
    //         txt.localRect.setAsFill();
    //         let fs = 16 / this.deffont.GetFontSize();;
    //         txt.fontScale = new Vector2(fs * scale, fs * scale);
    //         press.addChild(txt)
    //     }
    //     btn.ElemNormal = normal;
    //     btn.ElemPress = press;
    //     btn.localRect.setHPosByLeftBorder(100, 100);
    //     btn.localRect.setVPosByTopBorder(25, 100);
    //     return btn;
    // }
}