
import { ElementSprite } from "../graphics/pipeline/render/elem.js";
import { ShaderProgram } from "../graphics/shader.js";
import { PackElement } from "../resources/packtex/packelement.js";
import { Color, Material, QUI_Resource, Rectangle, Resources, Sprite, Texture } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";


export class QUI_Image extends QUI.QUI_BaseElement {
    constructor() {
        super();


        this.sprite = QUI_Resource.GetWhiteSprite();

        this.localRect.setByRect(new Rectangle(0, 0, 100, 100));

    }
    SetBySprite(sprite: Sprite) {
        this.sprite = sprite;
    }
    SetByTexture(tex: Texture) {
        let mat = new Material(Resources.GetShaderProgram("simple"));
        mat.uniformTexs["tex"].value = tex;
        this.sprite = new Sprite(mat);
    }
    SetBySpriteElement(pack: PackElement, spriteElement: ElementSprite) {
        this.sprite = pack.ConvertElemToSprite(spriteElement);
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Image;
    }
    sprite: Sprite | null;


    OnRender(_canvas: QUI_Canvas): void {


        //this.Render_impl();
        if (this.sprite != null) {
            this.sprite.RenderRect(_canvas.batcherUI, this.getWorldRectScale(_canvas.scale), this._colorFinal, -1);
        }
        super.OnRender(_canvas);
    }

}