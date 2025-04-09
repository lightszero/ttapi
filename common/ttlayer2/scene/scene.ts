import { Camera, ILayerRender, IRenderTarget, SceneRender_SingleMesh, Vector3 } from "../ttlayer2.js";

//场景应该有机的结合多种渲染器，将渲染器牢牢的隔离在逻辑之外
export enum SceneRenderType {
    SingleMesh,
    TBORender,
    BatchRender,
}
export interface ISceneRenderItem {
    get type(): SceneRenderType;
    get sort(): boolean;//
    get sortz(): number;
}
export interface ISceneRender {
    Render(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem[]): void;
    RenderOrdered(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem): void;
}
export interface ISceneComponent {
    OnUpdate(delta: number): void;
    OnAdd(node: SceneNode): void;
    OnRemove(): void;
}
//场景基本没毛病，了 矩阵往下传的一套，随便去哪里扒一下就有了
export class SceneNode {
    constructor() {
        this.name = "";

        this.pos = Vector3.Zero;
        this.scene = null;
        this.parent = null;
        this.comps = null;
        this.children = null;

    }
    name: string;
    pos: Vector3;
    children: SceneNode[];
    comps: ISceneComponent[];
    parent: SceneNode;
    scene: Scene;


    IsRoot(): boolean {
        return this.scene != null && this.parent == null;
    }
    //对一个树结构，这个判断不成立
    InScene(): boolean {
        return this.scene != null;
    }
    OnNodeAdd(node: SceneNode) {
        this.parent = node;
    }
    OnNodeRemove() {
        this.parent = null;
    }
    OnAttachScene(scene: Scene) {
        if (this.scene == null) {
            this.scene = scene;
            //当进入场景时组件初始化
            if (this.comps != null) {
                for (var i = 0; i < this.comps.length; i++) {
                    this.comps[i].OnAdd(this);
                }
            }
            //节点往下传递
            if (this.children != null) {
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].OnAttachScene(scene);
                }
            }
        }
    }
    OnRemoveScene() {
        if (this.scene != null) {
            //离开场景时，组件都离开
            if (this.comps != null) {
                for (var i = 0; i < this.comps.length; i++) {
                    this.comps[i].OnRemove();
                }
            }
            //节点往下传递
            if (this.children != null) {
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].OnRemoveScene();
                }
            }
        }
        this.scene = null;
    }

    OnUpdate(delta: number) {
        if (this.comps != null)
            for (var i = 0; i < this.comps.length; i++) {
                this.comps[i].OnUpdate(delta);
            }
        if (this.children != null)
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].OnUpdate(delta);
            }
    }
    //增加组件
    Comp_Add(comp: ISceneComponent): void {
        if (this.comps == null)
            this.comps = [];
        if (this.comps.indexOf(comp) >= 0)
            throw "alread have comp.";
        this.comps.push(comp);
        if (this.InScene()) {
            comp.OnAdd(this);
        }
    }
    //子节点操作
    Node_Add(node: SceneNode) {
        if (node.IsRoot())
            throw "this is root node.";

        if (node.InScene()) {
            node.parent.Node_Remove(node);
        }

        if (this.children == null)
            this.children = [];
        if (this.children.indexOf(node) >= 0)
            throw "error alread have node.";
        this.children.push(node);

        node.OnNodeAdd(this);
        if (this.InScene()) {
            node.OnAttachScene(this.scene);
        }
    }
    Node_Remove(node: SceneNode) {
        if (this.children == null) {
            throw "not have this node.";
        }
        let index = this.children.indexOf(node);
        if (index < 0)
            throw "not have this node.";
        this.children.splice(index, 1);
        node.OnNodeRemove();
        if (this.InScene()) {
            //离开场景，会传递
            node.OnRemoveScene();
        }
    }
    Node_GetCount(): number {
        return this.children?.length;
    }
    Node_GetChild(index: number): SceneNode {
        return this.children?.[index];
    }
}
export class Scene implements ILayerRender {
    constructor() {
        this.rootNode = new SceneNode();

        this.rootNode.OnNodeAdd(null);
        this.rootNode.OnAttachScene(this);
        this.renderList_NoOrder[SceneRenderType.SingleMesh] = [];
        this.renderList_NoOrder[SceneRenderType.BatchRender] = [];
        this.renderList_NoOrder[SceneRenderType.TBORender] = [];
        this.render_NoOrder[SceneRenderType.SingleMesh] = new SceneRender_SingleMesh(true);
        this.render_NoOrder[SceneRenderType.BatchRender] = new SceneRender_SingleMesh(true);
        this.render_NoOrder[SceneRenderType.TBORender] = new SceneRender_SingleMesh(true);
        this.render_Sorted[SceneRenderType.SingleMesh] = new SceneRender_SingleMesh();
        this.render_Sorted[SceneRenderType.BatchRender] = new SceneRender_SingleMesh();
        this.render_Sorted[SceneRenderType.TBORender] = new SceneRender_SingleMesh();
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
    }
    //收集透明 非透明，把Ztest 用起来
    OnRender(): void {
        //无序批量渲染
        for (var key in this.renderList_NoOrder) {
            let render = this.render_NoOrder[key];
            let renderitemlist = this.renderList_NoOrder[key];
            render.Render(this.lastCamera, this.lastTarget, this.lastTag, renderitemlist);
        }

        for (var i = 0; i < this.renderList_Sorted.length; i++) {
            let renderitem = this.renderList_Sorted[i];
            let render = this.render_Sorted[renderitem.type];
            render.RenderOrdered(this.lastCamera, this.lastTarget, this.lastTag, renderitem);
        }
    }

    OnKey: (keycode: string, press: boolean) => void
    OnPoint: (id: number, x: number, y: number, press: boolean, move: boolean) => void

    GetRoot(): SceneNode {
        return this.rootNode;
    }
}