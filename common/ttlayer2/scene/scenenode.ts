import { Camera, IRenderTarget, Scene, Vector3 } from "../ttlayer2.js";

//场景节点渲染器，用来处理各种特定合批情况
export enum SceneRenderType {
    SingleMesh,
    TBOBatchRender,
    VBOBatchRender,
}
export interface ISceneRenderItem {
    get type(): SceneRenderType;
    get sort(): boolean;//
    get sortz(): number;
}

export interface ISceneRender {
    get sort(): boolean;
    get type(): SceneRenderType;
    RenderBatch(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem[]): void;
    RenderOrderedBegin(camera: Camera, renderTarget: IRenderTarget, tag: number): void;
    RenderOrdered(renderItems: ISceneRenderItem): void;
    RenderOrderedEnd(): void;
}

//逻辑组件
export interface ISceneComponent {
    get CompType(): string;
    get Node(): SceneNode;
    OnUpdate(delta: number): void;
    OnAdd(node: SceneNode): void;
    OnRemove(): void;
}
//场景基本没毛病，了，但是场景图矩阵传递，更新矩阵性能就很差了，父子关系这套要收着用
//场景树结构只做分组之用，位置信息往不往下传，要具体看
export class SceneNode {
    static g_nodeid: number = 0;
    constructor() {
        this.name = "";


        this.scene = null;
        this.parent = null;
        this.comps = null;
        this.children = null;
        SceneNode.g_nodeid++;
        this._id = SceneNode.g_nodeid;
    }
    private _id: number;
    get id(): number {
        return this._id;
    }

    name: string;

    private _dirtypos = false;
    set posdirty(value: boolean) {
        this._dirtypos = value;
    }

    private _passOffset: boolean = false;//是否传递位移,当该选项为true时，会把位移传递给子物体
    get passOffset(): boolean {
        return this._passOffset;
    }
    set passOffset(value: boolean) {
        if (this._passOffset == value)
            return;
        this._passOffset = value;
        this.posdirty = true;
    }

    private _pos: Vector3 = Vector3.Zero;
    get pos(): Vector3 {
        return this._pos;
    }

    sortz: number;


    private _poslocal: Vector3 = Vector3.Zero;
    set poslocal(value: Vector3) {
        this._poslocal = value;
        this._dirtypos = true;
    }
    get poslocal(): Vector3 {
        return this._poslocal;
    }


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
    UpdatePos() {
        if (this._dirtypos) {
            if (this.parent?.passOffset) {
                this._pos = Vector3.Add(this.parent.pos, this._poslocal);
            }
            else {
                this._pos = this._poslocal;
            }
            this._dirtypos = false;
            //传递dirty
            if (this.passOffset && this.children != null) {
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].posdirty = true;
                }
            }
        }

    }
    OnUpdate(delta: number) {
        this.UpdatePos();
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
    Comp_Count(): number {
        if (this.comps == null)
            return 0;
        return this.comps.length;
    }
    Comp_GetAt(index: number): ISceneComponent {
        if (this.comps == null)
            return null;
        return this.comps[index];
    }
    Comp_Find(name: string): ISceneComponent {
        if (this.comps == null)
            return;
        for (var i = 0; i < this.comps.length; i++) {
            if (this.comps[i].CompType == name)
                return this.comps[i];
        }
        return null;
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