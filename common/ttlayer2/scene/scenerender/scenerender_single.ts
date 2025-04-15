import { Camera, IRenderTarget, tt } from "../../ttlayer2.js";
import { ISceneRender, ISceneRenderItem, SceneRenderType } from "../scene.js";

export class SceneRender_Single implements ISceneRender {
    constructor(sort: boolean = false) {
        this._sort = sort;
    }
    private _sort: boolean = false;
    get sort(): boolean {
        return this._sort;
    }
    get type(): SceneRenderType {
        return SceneRenderType.SingleMesh;
    }
    gl: WebGL2RenderingContext = null;
    RenderBatch(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem[]): void {
        this.RenderOrderedBegin(camera, renderTarget, tag);
        for (var i = 0; i < renderItems.length; i++) {
            this.RenderOrdered(renderItems[i]);
        }
        this.RenderOrderedEnd();
    }
    RenderOrderedBegin(camera: Camera, renderTarget: IRenderTarget, tag: number): void {

    }
    RenderOrdered(renderItems: ISceneRenderItem): void {
        if (this.gl == null)
            this.gl = tt.graphic.GetWebGL();
        (renderItems as ISceneRenderItem_SingleMesh).OnRender(this.gl);
    }
    RenderOrderedEnd(): void {

    }

}
export interface ISceneRenderItem_SingleMesh extends ISceneRenderItem {
    OnRender(gl: WebGL2RenderingContext): void;
}