import { Camera, IRenderTarget } from "../ttlayer2.js";
import { ISceneComponent, ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "./scenenode.js";

export class SceneRender_SingleMesh implements ISceneRender {
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

    }
    RenderOrderedEnd(): void {

    }

}

export class SceneComp_Mesh implements ISceneComponent, ISceneRenderItem {
    //ISceneRenderItem
    get type(): SceneRenderType {
        return SceneRenderType.SingleMesh;
    }
    get sort(): boolean {
        return false;
    }
    get sortz(): number {
        return this._node.pos.Z;
    }

    get CompType(): string {
        return "mesh";
    }
    private _node: SceneNode = null;
    get Node(): SceneNode
    {
        return this._node;
    }
    OnAdd(node: SceneNode): void {
        this._node = node;
        if (this.sort) {
            this._node.scene.renderList_Sorted.push(this);
        }
        else {
            this._node.scene.renderList_NoOrder[this.type].push(this);
        }
        console.log(" mesh add.");
    }
    OnRemove(): void {
        this._node = null;

        let list = this.sort ? this._node.scene.renderList_Sorted : this._node.scene.renderList_NoOrder[this.type];
        list.splice(list.indexOf(this), 1);
        console.log(" mesh remove.");
    }
    OnUpdate(delta: number): void {

    }


}