import { IRenderTarget, Render_Batcher } from "../ttlayer2.js";
import { IView, IViewRenderItem, ViewTag } from "./viewlist.js"
import { QUI_Canvas } from "../../ttui/ttui.js"
import { tt } from "../../ttapi/ttapi.js";
export class CanvasView implements IView {
    constructor(tag: ViewTag = ViewTag.GUI) {
        this.tag = tag;

        this.canvas = new Render_Batcher(tt.graphic.GetWebGL());
    }
    private tag: ViewTag;
    GetTag(): ViewTag {
        return this.tag;
    }


    canvas: Render_Batcher;
    //
    viewmatrix: Float32Array = new Float32Array(16);
    GetViewMatrix(): Float32Array {
        return this.canvas.matrixView;
    }


    Update(delta: number): void {
        if (this.OnUpdate != null)
            this.OnUpdate(delta);
        this.canvas.UpdateMatView();

    }

    Render(target: IRenderTarget, rendertag: number): void {
        if (rendertag == 0) {
            this.canvas.BeginDraw(target);
            if (this.OnDraw != null)
                this.OnDraw(this.canvas);
            this.canvas.EndDraw();
        }
    }
    OnUpdate: (delta: number) => void;
    OnDraw: (canvas: Render_Batcher) => void;

}