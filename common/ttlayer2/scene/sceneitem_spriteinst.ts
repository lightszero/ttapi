import { Camera, IRenderTarget } from "../ttlayer2.js";
import { ISceneComponent, ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "./scenenode.js";

export class SceneRender_ElementInst implements ISceneRender {

    constructor(sort: boolean = false) {
        this._sort = sort;
    }
    private _sort: boolean = false;
    get sort(): boolean {
        return this._sort;
    }
    get type(): SceneRenderType {
        return SceneRenderType.TBOBatchRender;
    }
    RenderBatch(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem[]): void {

    }
    RenderOrderedBegin(camera: Camera, renderTarget: IRenderTarget, tag: number): void {

    }
    RenderOrdered(renderItem: ISceneRenderItem): void {

    }
    RenderOrderedEnd(): void {

    }

}
export class SceneComp_Element implements ISceneComponent, ISceneRenderItem {
    get type(): SceneRenderType {
        throw new Error("Method not implemented.");
    }
    get sort(): boolean {
        throw new Error("Method not implemented.");
    }
    get sortz(): number {
        throw new Error("Method not implemented.");
    }

    get CompType(): string {
        return "elementinst";
    }
    OnUpdate(delta: number): void {
        throw new Error("Method not implemented.");
    }
    private _node: SceneNode = null;
    get Node(): SceneNode {
        return this._node;
    }
    OnAdd(node: SceneNode): void {
        this._node = node;
    }
    OnRemove(): void {
        this._node = null;

    }
}