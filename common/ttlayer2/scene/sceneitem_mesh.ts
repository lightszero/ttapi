import { Camera, IRenderTarget } from "../ttlayer2.js";
import { ISceneComponent, ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "./scene.js";

export class SceneRender_SingleMesh implements ISceneRender{
    constructor(noorder: boolean = false) {

    }
    Render(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem[]): void {
       
    }
    RenderOrdered(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem): void {
       
    }
    
}
export class SceneComp_Mesh implements ISceneComponent, ISceneRenderItem {

    get type(): SceneRenderType {
        return SceneRenderType.SingleMesh;
    }
    get sort(): boolean {
        return false;
    }
    get sortz(): number {
        return this.node.pos.Z;
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