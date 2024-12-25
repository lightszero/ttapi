import { Color, QUI_Container, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Overlay, Resources } from "../ttlayer2/ttlayer2.js";
import { QUI_DropButton } from "../ttlayer2/ttui/qui_dropbutton.js";

export class UI_DropMenuPal extends QUI_Container {
    private static _ishow: boolean = false;
    static Show(canvas: QUI_IElement, touchid: number): void {
        if (this._ishow)
            return;
        canvas.addChild(new UI_DropMenuPal(touchid));
        this._ishow = true;
        console.log("show drop");
    }
    _caretouchid: number;
    constructor(touchid: number) {

        super();
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

        this.AddLabelCenter("拖拽菜单");
        this.AddLabelLeft("按住别动", 0.5);
        this.AddLabelLeft("直接移动到按钮松手，空白处松手则nothing", 0.5);

        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 10; x++) {
                let btn = new QUI_DropButton(touchid);
                btn.ElemActive = Resources.CreateGUI_Border();
                let s9 = Resources.CreateGUI_Border();;
                btn.ElemNormal = s9;
                s9.color.R = 0.5;
                s9.color.G = 0.5;
                s9.color.B = 0.5;
                this.addChild(btn);
                btn.localRect.setHPosByLeftBorder(20, 20 + 30 * x);
                btn.localRect.setVPosByBottomBorder(20, 128 + 30 * y);
                btn.UsePress(touchid);
                btn.OnPressUp = () => {
                    console.log("btn1 release.");
                    this.Close();
                }
            }
        }

        this.action = 1;
        this.timer = 0;
    }
    Close(): void {
        this.action = 2;
        this.timer = 0;
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