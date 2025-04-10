import { Camera, ILayerRender, IRenderTarget, SceneComp_Sprite, SceneRender_SingleMesh, SceneRender_Sprite, Vector3 } from "../ttlayer2.js";
import { SceneRender_ElementInst } from "./sceneitem_spriteinst.js";
import { ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "./scenenode.js";

//场景应该有机的结合多种渲染器，将渲染器牢牢的隔离在逻辑之外

export class Scene implements ILayerRender {
    constructor() {
        this.rootNode = new SceneNode();

        this.rootNode.OnNodeAdd(null);
        this.rootNode.OnAttachScene(this);
        this.renderList_NoOrder[SceneRenderType.SingleMesh] = [];
        this.renderList_NoOrder[SceneRenderType.VBOBatchRender] = [];
        this.renderList_NoOrder[SceneRenderType.TBOBatchRender] = [];
        this.render_NoOrder[SceneRenderType.SingleMesh] = new SceneRender_SingleMesh(true);
        this.render_NoOrder[SceneRenderType.VBOBatchRender] = new SceneRender_Sprite(true);
        this.render_NoOrder[SceneRenderType.TBOBatchRender] = new SceneRender_ElementInst(true);
        this.render_Sorted[SceneRenderType.SingleMesh] = new SceneRender_SingleMesh();
        this.render_Sorted[SceneRenderType.VBOBatchRender] = new SceneRender_Sprite();
        this.render_Sorted[SceneRenderType.TBOBatchRender] = new SceneRender_ElementInst();
    }
    lastTarget: IRenderTarget;
    lastCamera: Camera;
    lastTag: number;
    private rootNode: SceneNode;
    renderList_NoOrder: { [type: number]: ISceneRenderItem[] } = {};
    renderList_Sorted: ISceneRenderItem[] = [];
    render_NoOrder: { [type: number]: ISceneRender } = {};
    render_Sorted: { [type: number]: ISceneRender } = {};
    OnUpdate(delta: number, target: IRenderTarget, camera: Camera, tag: number): void {
        this.lastTag = tag;
        this.lastCamera = camera;
        this.lastTarget = target;
        this.rootNode.OnUpdate(delta);

        //排序渲染对象
        if (this.renderList_Sorted.length > 0) {
            this.renderList_Sorted.sort((a, b) => {
                return a.sortz - b.sortz;
            })
        }
    }
    //收集透明 非透明，把Ztest 用起来
    OnRender(): void {
        //无序批量渲染
        for (var key in this.renderList_NoOrder) {
            let render = this.render_NoOrder[key];
            let renderitemlist = this.renderList_NoOrder[key];
            render.RenderBatch(this.lastCamera, this.lastTarget, this.lastTag, renderitemlist);
        }

        //有序渲染
        if (this.renderList_Sorted.length > 0) {
            let lastrender: ISceneRender = null;
            for (var i = 0; i < this.renderList_Sorted.length; i++) {
                let renderitem = this.renderList_Sorted[i];
                let render = this.render_Sorted[renderitem.type];
                //对render也要执行类似合批动作
                if (lastrender != render) {
                    if (lastrender != null) {
                        lastrender.RenderOrderedEnd();
                    }
                    lastrender = render;
                    lastrender.RenderOrderedBegin(this.lastCamera, this.lastTarget, this.lastTag);
                }
                render.RenderOrdered(renderitem);
            }
            if (lastrender != null)
                lastrender.RenderOrderedEnd();
        }
    }

    OnKey: (keycode: string, press: boolean) => void
    OnPoint: (id: number, x: number, y: number, press: boolean, move: boolean) => void

    GetRoot(): SceneNode {
        return this.rootNode;
    }
}