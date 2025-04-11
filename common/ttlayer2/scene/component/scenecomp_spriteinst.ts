import { Camera, IRenderTarget, Render_Element_Tbo } from "../../ttlayer2.js";
import { ISceneComponent, ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "../scene/scenenode.js";
import { ISceneRenderItem_ElementInst, SceneRender_ElementInst } from "../scenerender/scenerender_elementinst.js";


export class SceneComp_Element implements ISceneComponent, ISceneRenderItem_ElementInst {
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
        let render = node.scene.GetSceneRender(this.type, this.sort);
        if (render == undefined) {
            render = new SceneRender_ElementInst(this.sort);
            node.scene.RegSceneRender(render);
        }

        node.scene.AddRenderItem(this);
    }

    OnRemove(): void {

        let render = this._node.scene.GetSceneRender(this.type, this.sort) as SceneRender_ElementInst;
        if (render != null && this.lastid >= 0)
            render.FreeID(this.lastid);
        this._node = null;

    }
    lastid: number = -1;
    //一次性渲染
    OnAddElem(tbo: Render_Element_Tbo): void {

    }
    //服用位置
    OnUpdateElem(idmgr: SceneRender_ElementInst): void {
        if (this.lastid < 0)
            this.lastid = idmgr.GetID();
    }
}