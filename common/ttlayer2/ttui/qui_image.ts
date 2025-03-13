
import { ElementSprite } from "../graphics/pipeline/render/elem.js";
import { PackElement } from "../resources/packtex/packelement.js";
import { Color, QUI_Resource, Rectangle, Sprite } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";


export class QUI_Image extends QUI.QUI_BaseElement {
    constructor() {
        super();


        this.sprite = QUI_Resource.WhiteSprite;
        this.color = Color.White;
        this.localRect.setByRect(new Rectangle(0, 0, 100, 100));

    }
    SetBySprite(sprite: Sprite) {
        this.sprite = sprite;
    }
    SetBySpriteElement(pack: PackElement, spriteElement: ElementSprite) {
        this.sprite = pack.ConvertElemToSprite(spriteElement);
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