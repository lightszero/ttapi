
import { ElementSprite } from "../graphics/pipeline/render/elem.js";
import { PackElement } from "../resources/packtex/packelement.js";
import { Color, Rectangle, Sprite } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";


export class QUI_Image extends QUI.QUI_BaseElement {
    constructor(sprite: Sprite = null) {
        super();
        this.sprite = sprite;
        if (this.sprite != null) {
            this.localRect.setByRect(new Rectangle(0, 0, this.sprite.pixelwidth, this.sprite.pixelheight));
        }
        else {
            this.localRect.setByRect(new Rectangle(0, 0, 100, 100));
        }
    }
    Clone(): QUI.QUI_IElement {
        let elem = new QUI_Image();
        elem.localRect = this.localRect.Clone();
        elem._parent = null;
        elem.Enable = this.Enable;
        for (var i = 0; i < this.getChildCount(); i++) {
            elem.addChild(this.getChild(i).Clone());
        }

        elem.sprite = this.sprite;
        elem.color = this.color.Clone();
        return elem;
    }
    getElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Image;
    }
    sprite: Sprite | null;
    color: Color = Color.White;

    OnRender(_canvas: QUI_Canvas): void {

        this.color.A = this.alpha;
        //this.Render_impl();
        if (this.sprite != null) {
            this.sprite.RenderRect(_canvas.batcherUI, this.getWorldRectScale(_canvas.scale), this.color, -1);
        }
        super.OnRender(_canvas);
    }

}