import { IRenderTarget, Render_Batcher, Sprite, Vector2 } from "../ttlayer2.js";
import { IDrawLayer, IViewRenderItem, DrawLayerTag } from "./drawlayer.js"

import { tt } from "../../ttapi/ttapi.js";

//inst info
//uv
//textureid inlayer
//pos
//scale
//rotate

//gui用的Batcher去合
//canvas 想用DrawInstance实现,并且配合TextureArray
class CanvasItem 
{
    texid:number;
    uvCenter:Vector2;
    uvHalfSize:Vector2;
    targetPos:Vector2;
    targetHalfsize:Vector2;
    targetRotate:number;
}
export class DrawLayer_Canvas implements IDrawLayer {
    constructor(tag: DrawLayerTag = DrawLayerTag.Main) {
        this.tag = tag;

        this.canvas = new Render_Batcher(tt.graphic.GetWebGL());
        
    }
    private tag: DrawLayerTag;
    GetTag(): DrawLayerTag {
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