import { Camera, ILayerRender, IRenderTarget, Vector3 } from "../ttlayer2.js";

//场景应该有机的结合多种渲染器，将渲染器牢牢的隔离在逻辑之外

export interface ISceneRender extends SceneComponent {

}
export interface SceneComponent {
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
    comps: SceneComponent[];
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
    Comp_Add(comp: SceneComponent): void {
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
        if(this.InScene())
        {
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
    }
    lastTarget: IRenderTarget;
    lastCamera: Camera;
    lastTag: number;
    private rootNode: SceneNode;
    OnUpdate(delta: number, target: IRenderTarget, camera: Camera, tag: number): void {
        this.lastTag = tag;
        this.lastCamera = camera;
        this.lastTarget = target;
        this.rootNode.OnUpdate(delta);
    }
    //收集透明 非透明，把Ztest 用起来
    OnRender(): void {

    }

    OnKey: (keycode: string, press: boolean) => void
    OnPoint: (id: number, x: number, y: number, press: boolean, move: boolean) => void

    GetRoot(): SceneNode {
        return this.rootNode;
    }
}