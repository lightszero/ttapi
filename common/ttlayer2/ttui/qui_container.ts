
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";

export class QUI_Container extends QUI.QUI_BaseElement {
    getElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Container;
    }

}
export class QUI_Container_AutoSize extends QUI.QUI_BaseElement {

    halign: QUI.QUI_HAlign = QUI.QUI_HAlign.Middle;
    valign: QUI.QUI_VAlign = QUI.QUI_VAlign.Middle;
    autosizeASPMax: number = 1.0;//最大宽高比，宽度除高度
    autosizeASPMin: number = 1.0;//最小宽高比

    getElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Container_AutoSize;
    }

    OnUpdate(delta: number): void {
        let sw = this.getParent().getWorldRect();
        let aspnow = sw.Width / sw.Height;


        if (aspnow < this.autosizeASPMin) {//高度过大，缩高
            aspnow = this.autosizeASPMin;
            this.localRect.setHPosFill();
            let newheight = sw.Width / aspnow;
            this.localRect.setVPosByCenter(newheight);

        }
        else if (aspnow > this.autosizeASPMax) {//宽度过大，缩宽
            aspnow = this.autosizeASPMax;
            this.localRect.setVPosFill();
            let newwidth = sw.Height * aspnow;
            this.localRect.setHPosByCenter(newwidth);
        }
        else {
            this.localRect.setAsFill();
        }

        super.OnUpdate(delta);
    }
}
