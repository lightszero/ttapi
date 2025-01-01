import { ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Color, QUI_BaseElement, QUI_Button, QUI_Canvas, QUI_Container, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Overlay, Resources } from "../../ttlayer2/ttlayer2.js";

export abstract class UI_MenuFade extends QUI_Container {
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
        let block = this.block = new QUI_Button();
        block.localRect.setAsFill();
        this.addChild(block);
        block.OnClick = () => {
            block.Enable = false;
            this.action = 2;
            this.timer = 0;
        }


        this.action = 1;
        this.timer = 0;

    }
    Close(): void {
        this.action = 2;
        this.timer = 0;

    }
    Show(root: QUI_IElement): void {
        root.addChild(this);
        this.block.Enable = true;
        this.action = 1;
        this.timer = 0;
    }
    abstract OnClose(): void;
    block: QUI_Button;
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
                this.OnClose();
            }
            this.img.alpha = (1.0 - p) * 0.75;
        }
    }

}