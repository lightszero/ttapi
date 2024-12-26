import { Color, QUI_Container, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Label, QUI_Overlay, QUI_VAlign, Resources } from "../ttlayer2/ttlayer2.js";
import { QUI_DropButton } from "../ttlayer2/ttui/qui_dropbutton.js";
import { UI_PixelEditor } from "./ui_pixeleditor.js";

export class UI_DropMenuPal extends QUI_Container {
    private static _ishow: boolean = false;
    static Show(editor: UI_PixelEditor, touchid: number): void {
        if (this._ishow)
            return;
        editor.addChild(new UI_DropMenuPal(editor, touchid));
        this._ishow = true;
        console.log("show drop");
    }
    _caretouchid: number;

    _editor: UI_PixelEditor;
    constructor(editor: UI_PixelEditor, touchid: number) {

        super();
        this._editor = editor;
        this._caretouchid = touchid;
        this.localRect.setAsFill();
        //遮蔽背景
        let img = this.img = new QUI_Image(
            Resources.GetPackElement().ConvertElemToSprite(
                Resources.getWhiteBlock()
            )
        );
        img.color = new Color(0, 0, 0, 0.5);
        img.alpha = 0.5;
        img.localRect.setAsFill();
        this.addChild(img);

        //遮蔽事件
        let block = new QUI_Overlay();
        block.localRect.setAsFill();
        this.addChild(block);

        this.AddLabelTitle("拖拽菜单");
        this.AddLabel("按住别动,直接移动到按钮松手", 0.5);

        //this._editor.poshead;
        //to poscanvas
        let allrange = new QUI_Container();
        this.addChild(allrange);
        allrange.localRect.setAsFill();
        allrange.localRect.radioY1 = this._editor.poshead;
        allrange.localRect.radioY2 = this._editor.poscanvas;

        this.InitPaletteColor(allrange);

        {//中缝按钮
            let border = 0.05;
            let width = (1 - 7 * border) / 6;
            let height = (1 - 8 * border) / 7;

            let btn = new QUI_DropButton(this._caretouchid);
            btn.ElemActive = Resources.CreateGUI_Border();

            let s9 = Resources.CreateGUI_Border();;
            btn.ElemNormal = s9;
            s9.color.R = 0.5;
            s9.color.G = 0.5;
            s9.color.B = 0.5;
            btn.ElemNormal.alpha = 0.5;
            btn.localRect.setAsFill();
            btn.localRect.radioX1 = border;
            btn.localRect.radioX2 = btn.localRect.radioX1 + width * 2 + border;
            btn.localRect.radioY1 = border + (4) * (border + height);//留四行
            btn.localRect.radioY2 = btn.localRect.radioY1 + height;


            var labeltip = this.AddLabel("下面是最近颜色，上面是固定颜色", 0.5);

            labeltip.localRect.setAsFill();
            labeltip.localRect.radioX1 = btn.localRect.radioX2 + border;
            labeltip.localRect.radioX2 = 1.0 - border;
            labeltip.localRect.radioY1 = btn.localRect.radioY1
            labeltip.localRect.radioY2 = btn.localRect.radioY2

            let label = Resources.CreateGUI_Label("精确选色");
            label.fontScale.X *= 0.75;
            label.fontScale.Y *= 0.75;
            label.color.R = 0.5;
            label.color.G = 0.5;
            label.color.B = 0.5;
            btn.ElemNormal.addChild(label);
            let label2 = Resources.CreateGUI_Label("精确选色");
            label2.fontScale.X *= 0.75;
            label2.fontScale.Y *= 0.75;
            btn.ElemActive.addChild(label2);
            allrange.addChild(btn);

            btn.OnPressUp = () => {
                console.log("中缝 release.");
                this.Close();
            }

        }
        this.InitCommonColor(allrange);
        this.action = 1;
        this.timer = 0;
    }
    InitPaletteColor(container: QUI_Container) {
        //6个按钮 7 个缝
        let border = 0.05;
        let width = (1 - 7 * border) / 6;
        let height = (1 - 8 * border) / 7;
        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 6; x++) {

                let c = Color.White;


                if (y == 3) {
                    c = Color.Lerp(new Color(1, 1, 1), new Color(0, 0, 0), x / 5);
                }
                else {
                    let h360 = (y * 120 + x * 20 + 120) % 360;
                    c = Color.FromH360(h360);
                }
                let btn = this.CreateColorBtn(container, c);
                btn.localRect.setAsFill();
                btn.localRect.radioX1 = border + (border + width) * x;
                btn.localRect.radioX2 = btn.localRect.radioX1 + width;
                btn.localRect.radioY1 = border + (y) * (border + height);//留四行
                btn.localRect.radioY2 = btn.localRect.radioY1 + height;

            }
        }
    }

    //初始化常用颜色
    InitCommonColor(container: QUI_Container) {

        //6个按钮 7 个缝
        let border = 0.05;
        let width = (1 - 7 * border) / 6;
        let height = (1 - 8 * border) / 7;
        for (var y = 0; y < 2; y++) {
            for (var x = 0; x < 6; x++) {

                let btn = this.CreateColorBtn(container, new Color(1 / (x + 1), 1, 1, 1));
                btn.localRect.setAsFill();
                btn.localRect.radioX1 = border + (border + width) * x;
                btn.localRect.radioX2 = btn.localRect.radioX1 + width;
                btn.localRect.radioY1 = border + (y + 5) * (border + height);//留四行
                btn.localRect.radioY2 = btn.localRect.radioY1 + height;

            }
        }
    }
    CreateColorBtn(container: QUI_IElement, color: Color): QUI_DropButton {
        let white = Resources.GetPackElement().ConvertElemToSprite(Resources.getWhiteBlock());

        let colorUse = new QUI_Image(white);
        colorUse.color = color;
        colorUse.localRect.setAsFill();
        colorUse.localRect.offsetX1 = 2;
        colorUse.localRect.offsetX2 = -2;
        colorUse.localRect.offsetY1 = 2;
        colorUse.localRect.offsetY2 = -2;

        let colorUse2 = new QUI_Image(white);
        colorUse2.color = color;
        colorUse2.localRect.setAsFill();
        colorUse2.localRect.offsetX1 = 2;
        colorUse2.localRect.offsetX2 = -2;
        colorUse2.localRect.offsetY1 = 2;
        colorUse2.localRect.offsetY2 = -2;

        let btn = new QUI_DropButton(this._caretouchid);
        btn.ElemActive = Resources.CreateGUI_Border();
        btn.ElemActive.addChild(colorUse);

        let s9 = Resources.CreateGUI_Border();;
        btn.ElemNormal = s9;
        btn.ElemNormal.addChild(colorUse2);
        s9.color.R = 0.5;
        s9.color.G = 0.5;
        s9.color.B = 0.5;
        container.addChild(btn);

        btn.OnPressUp = () => {
            console.log("btn1 release.");
            this.Close();
        }
        return btn;
    }
    Close(): void {
        this.action = 2;
        this.timer = 0;
    }

    AddLabelTitle(text: string, scale: number = 1.0): void {
        var l = Resources.CreateGUI_Label(text);
        l.fontScale.X *= scale;
        l.fontScale.Y *= scale;
        l.localRect.setVPosByTopBorder(20, 8);
        this.addChild(l);

    }
    AddLabel(text: string, scale: number = 1.0): QUI_Label {
        var l = Resources.CreateGUI_Label(text);
        l.fontScale.X *= scale;
        l.fontScale.Y *= scale;
        l.localRect.setVPosByTopBorder(20, 30);
        l.localRect.setHPosFill(16, 16);
        l.halign = QUI_HAlign.Left;
        l.valign = QUI_VAlign.Middle;
        this.addChild(l);
        return l;
    }
    img: QUI_Image;
    action: number = 0;
    timer: number = 0;
    fadeintime: number = 0.15;
    fadeouttime: number = 0.15;
    OnUpdate(delta: number): void {

        super.OnUpdate(delta);
        if (this.action == 1) {
            if (this.timer < this.fadeintime)
                this.timer += delta;

            let p = (this.timer / this.fadeintime);
            if (p > 1) p = 1;
            this.img.alpha = p * 0.75;
        }
        if (this.action == 2) {
            if (this.timer <= this.fadeouttime)
                this.timer += delta;

            let p = (this.timer / this.fadeouttime);
            if (p >= 1) {
                p = 1;
                this.getParent().removeChild(this);
                UI_DropMenuPal._ishow = false;
                console.log("hide drop");
            }
            this.img.alpha = (1.0 - p) * 0.75;
        }
    }
    OnTouch(touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {

        let bkill = super.OnTouch(touchid, press, move, x, y);
        if (bkill)
            return true;
        if (touchid == this._caretouchid && press == false) {
            this.Close();
        }
    }
}