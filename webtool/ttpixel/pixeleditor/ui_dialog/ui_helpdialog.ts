import { ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Color, QUI_BaseElement, QUI_Canvas, QUI_Container, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Overlay, Resources } from "../../ttlayer2/ttlayer2.js";
import { UI_DropMenuFade } from "./ui_dropmenufade.js";
import { UI_MenuFade } from "./ui_menufade.js";

export class UI_HelpDialog extends UI_DropMenuFade {
    constructor() {
        super();
        this.localRect.setAsFill();


        this.AddLabelCenter("像素编辑器");
        this.AddLabelLeft("这是一个为移动平台和触摸操作准备的像素编辑器", 0.5);
        this.AddLabelLeft("关于摇杆的想法，是来自于dotpict", 0.5);
        this.AddLabelLeft("按住别动，松手关闭", 0.5);

    }
    y: number = 32;
    AddLabelCenter(text: string, scale: number = 1.0): void {
        var l = Resources.CreateGUI_Label(text);
        l.fontScale.X *= scale;
        l.fontScale.Y *= scale;
        l.localRect.setVPosByTopBorder(20, this.y);
        this.addChild(l);
        this.y += 24 * scale;
    }
    AddLabelLeft(text: string, scale: number = 1.0): void {
        var l = Resources.CreateGUI_Label(text);
        l.fontScale.X *= scale;
        l.fontScale.Y *= scale;
        l.localRect.setVPosByTopBorder(20, this.y);
        l.localRect.setHPosFill(16, 16);
        l.halign = QUI_HAlign.Left;
        this.addChild(l);
        this.y += 24 * scale;
    }

    OnShow(): void {
        UI_HelpDialog._ishow = true;
    }
    OnClose(): void {
        this._parent.removeChild(this);
        UI_HelpDialog._ishow = false;
    }
    private static _ishow: boolean = false;
    static Show(canvas: QUI_IElement, id: number): void {

        if (this._ishow)
            return;//防止多次打开
        let menu = new UI_HelpDialog();
        menu.Show(canvas, id);

    }
}