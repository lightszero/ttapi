
import { Color, Rectangle } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";
import * as QUIS9 from "./qui_scale9.js"


export class QUI_ImageScale9 extends QUI.QUI_BaseElement {
    constructor(scale9: QUIS9.QUI_Scale9 = null) {
        super();
        this.scale9 = scale9;
        if (scale9 != null)
            this.localRect.setByRect(new Rectangle(0, 0, scale9.getMinWidth(), scale9.getMinHeight()));
        else
            this.localRect.setByRect(new Rectangle(0, 0, 128, 128));
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Image_Scale9;
    }

    scale9: QUIS9.QUI_Scale9 | null;
   

    OnRender(_canvas: QUI_Canvas): void {


        //this.Render_impl();
        if (this.scale9 != null) {
            this.scale9.RenderRect(_canvas.batcherUI, this.getWorldRectScale(_canvas.scale), this._colorFinal, -1, _canvas.scale);
        }
        super.OnRender(_canvas);
    }

}