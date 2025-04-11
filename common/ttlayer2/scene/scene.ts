import { Camera, ILayerRender, IRenderTarget, SceneComp_Sprite, SceneRender_SingleMesh, SceneRender_Sprite, Vector3 } from "../ttlayer2.js";
import { SceneRender_ElementInst } from "./sceneitem_spriteinst.js";
import { ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "./scenenode.js";

//场景应该有机的结合多种渲染器，将渲染器牢牢的隔离在逻辑之外
export interface ISceneSystem {
    get type(): string;
    OnAdd(scene: Scene): void
    OnRemove(): void;
    OnUpdate(delta: number, tag: number): void;
}
export class Scene implements ILayerRender {
    constructor() {
        this.rootNode = new SceneNode();

        this.rootNode.OnNodeAdd(null);
        this.rootNode.OnAttachScene(this);
    }
    lastTarget: IRenderTarget;
    lastCamera: Camera;
    lastTag: number;
    private rootNode: SceneNode;
    GetSceneRender(type: number, sroted: boolean): ISceneRender {
        if (sroted) {
            return this.render_Sorted[type];
        } else {
            return this.render_NoOrder[type];
        }
    }
    RegSceneRender(item: ISceneRender) {
        if (item.sort) {
            this.render_Sorted[item.type] = item;
        }
        else {
            this.render_NoOrder[item.type] = item;
            this.renderList_NoOrder[item.type] = [];
        }
    }
    renderList_NoOrder: { [type: number]: ISceneRenderItem[] } = {};
    renderList_Sorted: ISceneRenderItem[] = [];
    render_NoOrder: { [type: number]: ISceneRender } = {};
    render_Sorted: { [type: number]: ISceneRender } = {};
    private systems: { [type: string]: ISceneSystem } = {};
    GetSystem(type: string): ISceneSystem {
        return this.systems[type];
    }
    RegSystem(item: ISceneSystem) {
        item.OnAdd(this);
        this.systems[item.type] = item;
    }
    RemoveSystem(type: string) {
        this.systems[type]?.OnRemove();
        delete this.systems[type];
    }
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
        for (var key in this.systems) {
            this.systems[key].OnUpdate(delta, tag);
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