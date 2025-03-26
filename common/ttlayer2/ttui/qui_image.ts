
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
    keepAspect: boolean = false;

    OnRender(_canvas: QUI_Canvas): void {


        //this.Render_impl();
        if (this.sprite != null) {
            let rect = this.GetWorldRect();
            if (this.keepAspect) {

                var oldheight = rect.Height;
                var oldwidth = rect.Width;
                var asp = this.sprite.pixelheight / this.sprite.pixelwidth;
                var asprect = oldheight / oldwidth;
                if (asprect > asp)//越大越瘦高
                {
                    rect.Height = oldwidth * asp;
                    rect.Y += (oldheight - rect.Height) / 2;
                }
                else if (asprect < asp) {
                    rect.Width = oldheight / asp;
                    rect.X += (oldwidth - rect.Width) / 2;
                }
            }
            this.sprite.RenderRect(_canvas.batcherUI, rect, this._colorFinal, -1);
        }
        super.OnRender(_canvas);
    }

}