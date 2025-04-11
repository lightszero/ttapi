import { Camera, IRenderTarget, Render_Element_Tbo, tt } from "../../ttlayer2.js";
import { ISceneRender, ISceneRenderItem, SceneRenderType } from "../scene.js";

export class SceneRender_ElementInst implements  ISceneRender {

    // 构造函数，初始化sort属性，创建Render_Element_Tbo对象，获取WebGL上下文
    // 构造函数，初始化sort属性，创建Render_Element_Tbo对象，获取WebGL上下文
    constructor(sort: boolean = false) {
        this._sort = sort;
        this.tbo = new Render_Element_Tbo();
        this.gl = tt.graphic.GetWebGL();
    }
    // 获取sort属性
    private _sort: boolean = false;
    get sort(): boolean {
        return this._sort;
    // 获取type属性
    }
    get type(): SceneRenderType {
        return SceneRenderType.TBOBatchRender;
    }
    tbo: Render_Element_Tbo;
    gl: WebGL2RenderingContext;

    freelist: number[] = [];//freeids
    useid: number = 0;

    GetID(): number
    {
        if (this.freelist.length > 0) {
            return this.freelist.pop()!;
        }
        return this.useid++;
    }
    FreeID(id: number): void
    {
        this.freelist.push(id);
    }

    RenderBatch(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem_ElementInst[]): void {
        //donothing
        this.tbo.material.UpdateMatProj(renderTarget);
        this.tbo.material.UpdateMatView(camera.GetViewMatrix());
        this.tbo.material.UpdateMatModel(null);

        for (var i = 0; i < renderItems.length; i++) {
            renderItems[i].OnUpdateElem(this);
        }
        this.tbo.material.Apply(this.gl)
        this.tbo.OnRender();
    }
    RenderOrderedBegin(camera: Camera, renderTarget: IRenderTarget, tag: number): void {
        this.tbo.material.UpdateMatProj(renderTarget);
        this.tbo.material.UpdateMatView(camera.GetViewMatrix());
        this.tbo.material.UpdateMatModel(null);
        this.tbo.ClearElementInst();
    }
    RenderOrdered(renderItem: ISceneRenderItem_ElementInst): void {
        renderItem.OnAddElem(this.tbo);
    }
    RenderOrderedEnd(): void {
        this.tbo.material.Apply(this.gl)
        this.tbo.OnRender();

    }

}
export interface IElemntInstIDMgr {
    GetID(): number;
    FreeID(id: number): void;
}
export interface ISceneRenderItem_ElementInst extends ISceneRenderItem {
    OnAddElem(tbo: Render_Element_Tbo): void;
    OnUpdateElem(idmgr: SceneRender_ElementInst): void;
}