import { Color, Color32, QUI_BaseElement, QUI_Canvas, QUI_Container, QUI_ElementType, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Label, QUI_Overlay, QUI_VAlign, Resources } from "../../ttlayer2/ttlayer2.js";
import { QUI_DropButton } from "../../ttlayer2/ttui/qui_dropbutton.js";



export abstract class UI_DropMenuFade extends QUI_Container {


    Show(parent: QUI_IElement, touchid: number): void {
        this._caretouchid = touchid;
        UI_DropMenuFade.PassPress(this, touchid);
        this.timer = 0;
        this.action = 1;
        console.log("...show..." + touchid);
        if (this._parent == null)
            parent.addChild(this);
        this.OnShow();
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



        this.action = 0;
        this.timer = 0;


    }


    Close(): void {
        console.log("...close..." + this._caretouchid);
        this.action = 2;
        this.timer = 0;
    }
    abstract OnShow():void;
    abstract OnClose(): void;
    img: QUI_Image;
    action: number = 0;
    timer: number = 0;
    fadeintime: number = 0.15;
    fadeouttime: number = 0.15;
    OnUpdate(_canvas: QUI_Canvas, delta: number): void {

        super.OnUpdate(_canvas, delta);
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
                
                this.OnClose();
                console.log("hide drop" + this._caretouchid);
            }
            this.img.alpha = (1.0 - p) * 0.75;
        }
    }
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {

        let bkill = super.OnTouch(_canvas, touchid, press, move, x, y);

        if (press == false) {
            console.log("release..." + touchid);
            if (touchid == this._caretouchid) {
                this.Close();
            }
        }
        return bkill;
    }
}