import { Color, Color32, QUI_BaseElement, QUI_Container, QUI_ElementType, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Label, QUI_Overlay, QUI_VAlign, Resources } from "../../ttlayer2/ttlayer2.js";
import { QUI_DropButton } from "../../ttlayer2/ttui/qui_dropbutton.js";



export class UI_DropMenuPal extends QUI_Container {


    Show(touchid: number): void {
        if (this.Enable)
            return;
        this._caretouchid = touchid;
        UI_DropMenuPal.PassPress(this, touchid);

        this.Enable = true;
        this.timer = 0;
        this.action = 1;
        console.log("...show..." + touchid);
    }
    static PassPress(ui: QUI_IElement, touchid: number) {
        for (let i = 0; i < ui.getChildCount(); i++) {
            let e = ui.getChild(i);
            if (e.getElementType() == QUI_ElementType.Element_DropButton) {
                let btn = e as QUI_DropButton;
                btn.UsePress(touchid);
            }
            else {
                this.PassPress(e, touchid);
            }
        }
    }
    _caretouchid: number = -1;

    colorpick: Color32 = new Color32(0, 0, 0, 1);//用color32 才方便判断
    colorHistory: Color32[] = [];//历史Color

    ui_colorpick: QUI_Image;
    ui_colorHistory: QUI_DropButton[] = [];
    ui_colorSame: QUI_DropButton[] = [];

    GetPickColor(): Color {
        return new Color(this.colorpick.R / 255, this.colorpick.G / 255, this.colorpick.B / 255, this.colorpick.A / 255);
    }
    GetPickColor32(): Color32 {
        return this.colorpick.Clone();
    }
    PickColor(color: Color) {

        //记录历史颜色
        let havehistory = false;
        for (var i = 0; i < this.colorHistory.length; i++) {
            let c = this.colorHistory[i];
            if (Color32.Equal(c, this.colorpick)) {
                havehistory = true;
                break;
            }
        }
        if (!havehistory) {
            this.colorHistory.splice(0, 0, this.colorpick.Clone());
        }
        //同步历史颜色
        for (var i = 0; i < this.ui_colorHistory.length; i++) {
            let b = this.ui_colorHistory[i];
            (b.ElemNormal.getChild(0) as QUI_Image).color = this.colorHistory[i].ToColor();
            (b.ElemActive.getChild(0) as QUI_Image).color = this.colorHistory[i].ToColor();
        }


        //同步关联颜色
        for (var i = 0; i < 4; i++) {
            let b = this.ui_colorSame[i];
            let b2 = this.ui_colorSame[i + 4];
            {
                let c = color.Clone();
                c.R -= (i + 1) * 0.2;
                c.G -= (i + 1) * 0.2;
                c.B -= (i + 1) * 0.2;
                if (c.R < 0) c.R = 0;
                if (c.G < 0) c.G = 0;
                if (c.B < 0) c.B = 0;
                (b2.ElemNormal.getChild(0) as QUI_Image).color = c.Clone();
                (b2.ElemActive.getChild(0) as QUI_Image).color = c.Clone();
            }
            {
                let c = color.Clone();
                c.R += ((4 - i) * 0.2);
                c.G += ((4 - i) * 0.2);
                c.B += ((4 - i) * 0.2);
                if (c.R > 1) c.R = 1;
                if (c.G > 1) c.G = 1;
                if (c.B > 1) c.B = 1;
                (b.ElemNormal.getChild(0) as QUI_Image).color = c.Clone();
                (b.ElemActive.getChild(0) as QUI_Image).color = c.Clone();
            }
        }


        //修改选中颜色
        this.colorpick.R = color.R * 255;
        this.colorpick.G = color.G * 255;
        this.colorpick.B = color.B * 255;
        this.colorpick.A = color.A * 255;
        this.ui_colorpick.color = color;

    }
    constructor() {

        super();
        this.Enable = false;
        for (var i = 0; i < 8; i++) {
            this.colorHistory[i] = new Color32(0, 0, 0);
        }

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

        {
            var l = Resources.CreateGUI_Label("拖拽菜单");
            l.fontScale.X *= 1.0;
            l.fontScale.Y *= 1.0;
            l.localRect.setVPosByTopBorder(20, 8);
            l.localRect.radioY1 = 0.65;
            l.localRect.radioY2 = 0.65;
            this.addChild(l);

        }
        {
            var l = Resources.CreateGUI_Label("按住别动,直接移动到按钮松手.最下面两排是关联颜色");
            l.fontScale.X *= 0.5;
            l.fontScale.Y *= 0.5;
            l.localRect.setVPosByTopBorder(20, 30);
            l.localRect.radioY1 = 0.65;
            l.localRect.radioY2 = 0.65;
            this.addChild(l);
        }
      
        //this._editor.poshead;
        //to poscanvas
        let allrange = new QUI_Container();
        this.addChild(allrange);
        allrange.localRect.setAsFill();
        allrange.localRect.radioY1 = 0;
        allrange.localRect.radioY2 = 0.65;

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
        this.action = 0;
        this.timer = 0;

        this.PickColor(Color.Black);
    }
    InitPaletteColor(container: QUI_Container) {
        //6个按钮 7 个缝
        let border = 0.05;
        let width = (1 - 7 * border) / 6;
        let height = (1 - 8 * border) / 7;
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 6; x++) {

                let c = Color.White;


                if (y == 4) {
                    if (x < 2)
                        continue;

                    c = Color.Lerp(new Color(1, 1, 1), new Color(0, 0, 0), (x - 2) / 3);
                }
                else {
                    let h360 = (x * 60 + y * 15 + 120) % 360;
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
        let border = 0.05;
        let bordersmall = 0.025;
        let height = (1 - 8 * border) / 7;
        let width = (1 - 2 * border - 9 * bordersmall) / 10;

        //当前颜色
        let white = Resources.GetPackElement().ConvertElemToSprite(Resources.getWhiteBlock());
        let colorUse = new QUI_Image(white);
        //colorUse.color = color;
        container.addChild(colorUse);
        colorUse.localRect.setAsFill();
        colorUse.localRect.radioX1 = border;
        colorUse.localRect.radioX2 = colorUse.localRect.radioX1 + width * 2 + bordersmall;
        colorUse.localRect.radioY1 = border + (5) * (border + height);//留四行
        colorUse.localRect.radioY2 = colorUse.localRect.radioY1 + height * 2 + border;
        this.ui_colorpick = colorUse;
        //6个按钮 7 个缝



        for (var y = 0; y < 2; y++) {
            for (var x = 0; x < 8; x++) {

                let btn = this.CreateColorBtn(container, new Color(1 / (x + 1), 1, 1, 1));
                btn.localRect.setAsFill();
                btn.localRect.radioX1 = border + (bordersmall + width) * (x + 2);
                btn.localRect.radioX2 = btn.localRect.radioX1 + width;
                btn.localRect.radioY1 = border + (y + 5) * (border + height);//留四行
                btn.localRect.radioY2 = btn.localRect.radioY1 + height;
                if (y == 1)
                    this.ui_colorHistory[x] = btn;
                else
                    this.ui_colorSame[x] = btn;
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
            let _c = colorUse.color;
            this.PickColor(_c);
            console.log("btn1 release.");
            this.Close();
        }
        return btn;
    }
    Close(): void {
        console.log("...close..." + this._caretouchid);
        this.action = 2;
        this.timer = 0;
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
                this.Enable = false;
                console.log("hide drop" + this._caretouchid);
            }
            this.img.alpha = (1.0 - p) * 0.75;
        }
    }
    OnTouch(touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {

        let bkill = super.OnTouch(touchid, press, move, x, y);

        if (press == false) {
            console.log("release..." + touchid);
            if (touchid == this._caretouchid) {
                this.Close();
            }
        }
        return bkill;
    }
}