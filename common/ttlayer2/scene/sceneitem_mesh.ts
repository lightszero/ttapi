import { Camera, IRenderTarget } from "../ttlayer2.js";
import { ISceneComponent, ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "./scenenode.js";

export class SceneRender_SingleMesh implements ISceneRender {
    constructor(noorder: boolean = false) {

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
        return this.node.pos.Z;
    }

    get CompType(): string
    {
        return "mesh";
    }
    node: SceneNode = null;
    OnAdd(node: SceneNode): void {
        this.node = node;
        if (this.sort) {
            this.node.scene.renderList_Sorted.push(this);
        }
        else {
            this.node.scene.renderList_NoOrder[this.type].push(this);
        }
        console.log(" mesh add.");
    }
    OnRemove(): void {
        this.node = null;

        let list = this.sort ? this.node.scene.renderList_Sorted : this.node.scene.renderList_NoOrder[this.type];
        list.splice(list.indexOf(this), 1);
        console.log(" mesh remove.");
    }
    OnUpdate(delta: number): void {

    }


}