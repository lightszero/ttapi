import { ElementSprite } from "../ttlayer2/graphics/pipeline/render/elem.js";
import { Color, QUI_BaseElement, QUI_Canvas, QUI_Container, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Overlay, Resources } from "../ttlayer2/ttlayer2.js";

export class HelpDialog extends QUI_Container {
    constructor() {
        super();
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

        this.AddLabelCenter("像素编辑器");
        this.AddLabelLeft("这是一个为移动平台和触摸操作准备的像素编辑器", 0.5);
        this.AddLabelLeft("关于摇杆的想法，是来自于dotpict", 0.5);

        let btnClose = Resources.CreateGUI_Button("Close");
        btnClose.localRect.setHPosByCenter(100);
        btnClose.localRect.setVPosByBottomBorder(20, 48);
        btnClose.OnClick = () => {
            btnClose.Enable = false;
            this.action = 2;
            this.timer = 0;
            //this.getParent().removeChild(this);
        }
        this.addChild(btnClose);
        this.action = 1;
        this.timer = 0;
    }
    y: number = 32;
    AddLabelCenter(text: string, scale: number=1.0): void {
        var l = Resources.CreateGUI_Label(text);
        l.fontScale.X *= scale;
        l.fontScale.Y *= scale;
        l.localRect.setVPosByTopBorder(20, this.y);
        this.addChild(l);
        this.y += 24 * scale;
    }
    AddLabelLeft(text: string, scale: number=1.0): void {
        var l = Resources.CreateGUI_Label(text);
        l.fontScale.X *= scale;
        l.fontScale.Y *= scale;
        l.localRect.setVPosByTopBorder(20, this.y);
        l.localRect.setHPosFill(16,16);
        l.halign= QUI_HAlign.Left;
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
            if (this.timer < this.fadeintime)
                this.timer += delta;

            let p = (this.timer / this.fadeouttime);
            if (p > 1) {
                p = 1;
                this.getParent().removeChild(this);
            }
            this.img.alpha = (1.0 - p) * 0.75;
        }
    }
    OnRender(canvas: QUI_Canvas): void {
        super.OnRender(canvas);
    }

    static Show(canvas: QUI_IElement): void {
        canvas.addChild(new HelpDialog());
    }
}