
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";

export class QUI_Container extends QUI.QUI_BaseElement {
    getElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Container;
    }


}
export enum QUI_FillWay {
    Horizontal,
    Vertical,
    Both,
}

export class QUI_Container_AutoFill extends QUI.QUI_BaseElement {
    fillway: QUI_FillWay = QUI_FillWay.Both;
    halign: QUI.QUI_HAlign = QUI.QUI_HAlign.Middle;
    valign: QUI.QUI_VAlign = QUI.QUI_VAlign.Middle;
    autosizeASPMax: number = 1.0;//最大宽高比，宽度除高度
    autosizeASPMin: number = 1.0;//最小宽高比
    setAsp(asp1: number, asp2: number): void {
        this.autosizeASPMin = Math.min(asp1, asp2);
        this.autosizeASPMax = Math.max(asp1, asp2);
    }
    getElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Container_AutoFill;
    }

    OnUpdate(delta: number): void {
        let sw = this.getParent().getWorldRect();
        let aspnow = sw.Width / sw.Height;
        let bfixmin = false;
        let bfixmax = false;
        if (aspnow < this.autosizeASPMin) {//高度过大，缩高
            aspnow = this.autosizeASPMin;
            bfixmin = true;
        }
        else if (aspnow > this.autosizeASPMax) {//宽度过大，缩宽
            aspnow = this.autosizeASPMax;
            bfixmax = true;
        }

        //是否高度调整
        if (
            (this.fillway == QUI_FillWay.Both && bfixmin)
            ||
            (this.fillway == QUI_FillWay.Vertical)
        ) {
            this.localRect.setHPosFill();
            let newheight = sw.Width / aspnow;
            if (this.valign == QUI.QUI_VAlign.Top)
                this.localRect.setVPosByTopBorder(newheight);
            else if (this.valign == QUI.QUI_VAlign.Middle)
                this.localRect.setVPosByCenter(newheight);
            else
                this.localRect.setVPosByBottomBorder(newheight);
        }
        //是否宽度调整
        if (
            (this.fillway == QUI_FillWay.Both && bfixmax)
            ||
            (this.fillway == QUI_FillWay.Horizontal)
        ) {
            let newwidth = sw.Height * aspnow;
            this.localRect.setVPosFill();
            if (this.halign == QUI.QUI_HAlign.Left)
                this.localRect.setHPosByLeftBorder(newwidth);
            else if (this.halign == QUI.QUI_HAlign.Middle)
                this.localRect.setHPosByCenter(newwidth);
            else
                this.localRect.setHPosByRightBorder(newwidth);
        }
        //是否填充
        if (this.fillway == QUI_FillWay.Both && !bfixmax && !bfixmin) {
            this.localRect.setAsFill();
        }

        super.OnUpdate(delta);
    }
}
export class QUI_Container_AutoHeight extends QUI.QUI_BaseElement {
    getElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Container_AutoHeight;
    }
}