import { Camera, GameApp, IRenderTarget, tt } from "../../ttlayer2.js";
import { ISceneComponent, ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "../scene/scenenode.js";
import { ISceneRenderItem_SingleMesh as ISceneRenderItem_Single } from "../scenerender/scenerender_single.js";

export class SceneComp_Mesh implements ISceneComponent, ISceneRenderItem_Single {
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
    get Node(): SceneNode {
        return this._node;
    }
    OnAdd(node: SceneNode): void {
        this._node = node;
        node.scene.AddRenderItem(this);

        console.log(" mesh add.");
    }
    OnRender(gl: WebGL2RenderingContext) {

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