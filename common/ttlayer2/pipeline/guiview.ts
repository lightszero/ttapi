import { IRenderTarget } from "../ttlayer2.js";
import { IView, IViewRenderItem, ViewTag } from "./viewlist.js"
import { QUI_Canvas } from "../../ttui/ttui.js"
import { tt } from "../../ttapi/ttapi.js";
export class GUIView implements IView {
    constructor(tag: ViewTag = ViewTag.GUI) {
        this.tag = tag;


    }
    private tag: ViewTag;
    GetTag(): ViewTag {
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