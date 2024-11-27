import { IRenderTarget } from "../ttlayer2.js";
import { IDrawLayer, IViewRenderItem, DrawLayerTag } from "./drawlayer.js"
import { QUI_Canvas } from "../../ttui/ttui.js"
import { tt } from "../../ttapi/ttapi.js";
export class DrawLayer_GUI implements IDrawLayer {
    constructor(tag: DrawLayerTag = DrawLayerTag.GUI) {
        this.tag = tag;


    }
    private tag: DrawLayerTag;
    GetTag(): DrawLayerTag {
        return this.tag;
    }


    canvas: QUI_Canvas = new QUI_Canvas(null);
    //
    viewmatrix: Float32Array = new Float32Array(16);
    GetViewMatrix(): Float32Array {
        return this.viewmatrix;
    }


    Update(delta: number): void {
        this.canvas.OnUpdate(delta);

    }
    Render(target: IRenderTarget, rendertag: number): void {
        if (rendertag == 0) {
            this.canvas.target = target;
            this.canvas.FIllTarget();
            this.canvas.OnRender(null);
        }
    }


}