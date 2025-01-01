import { ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Color, QUI_BaseElement, QUI_Canvas, QUI_Container, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Overlay, Resources } from "../../ttlayer2/ttlayer2.js";
import { UI_MenuFade } from "./ui_menufade.js";

export class UI_MainMenu extends UI_MenuFade {
    constructor() {
        super();
        this.localRect.setAsFill();


        this.AddLabelCenter("菜单");

        this.AddButton("open", () => {

        });

        this.AddButton("save img", () => {

        });

        this.AddButton("save package", () => {

        });
        this.AddText("打开文件，从本地选一个图片编辑，不能太大", 0.5);
        this.AddText("保存，如果是浏览器则是下载", 0.5);
        this.AddText("打包保存，这是将来的事情", 0.5);
        this.AddText("点击任意位置，关闭菜单", 0.5);

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
    AddText(text: string, scale: number = 1.0): void {
        var l = Resources.CreateGUI_Label(text, Color.White, scale);

        l.localRect.setVPosByTopBorder(24 * scale, this.y);
        l.localRect.setHPosFill(16, 16);
        l.halign = QUI_HAlign.Left;
        this.addChild(l);
        this.y += 24 * scale;
    }
    AddButton(text: string, onclick: () => void, scale: number = 1.0): void {

        var b = Resources.CreateGUI_Button(text, Color.White, scale);
        b.localRect.setVPosByTopBorder(24 * scale, this.y);
        b.localRect.setHPosFill(16, 16);

        this.addChild(b);
        this.y += 28 * scale;
    }
    OnClose(): void {
        UI_MainMenu._ishow = false;
    }

    private static _ishow: boolean = false;
    static Show(canvas: QUI_IElement): void {

        if (this._ishow)
            return;//防止多次打开
        let menu = new UI_MainMenu();
        menu.Show(canvas);

    }
}