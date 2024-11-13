import { IRenderTarget } from "../graphics/texture.js";
import { Matrix3x2, Matrix3x2Math } from "../math/Matrix3x2.js";
import { Vector2 } from "../math/vector.js";
import { IView, IViewComponent, IViewItem, IViewRenderItem, ViewTag } from "./viewlist.js";


export class FlatViewItem implements IViewItem {

    private _worldMatrix: Matrix3x2 = new Matrix3x2();
    private componments: IViewComponent[] = [];
    private _render: IViewRenderItem = null;
    pos: Vector2 = Vector2.Zero;
    scale: Vector2 = Vector2.One;
    rotate: number = 0;

    GetWorldMatrix(): Matrix3x2 {
        return this._worldMatrix;
    }

    OnUpdate(delta: number): void {
        Matrix3x2Math.MakeTRS(this._worldMatrix, this.pos, this.rotate, this.scale);
        for (var i = 0; i < this.componments.length; i++) {
            this.componments[i].OnUpdate(delta);
        }

    }


    AddComponment(comp: IViewComponent): void {
        if (this.componments == null)
            this.componments = [];
        if (this.GetComponment(comp.GetType()) != null)
            throw ("重复的组件");
        if (comp.IsRender()) {
            if (this._render != null)
                throw ("只能有一个render组件");
            this._render = comp as IViewRenderItem;
        }

        this.componments.push(comp);
        comp.OnAdd(this);
    }
    GetComponments(): IViewComponent[] {
        return this.componments;
    }
    GetComponment(type: string): IViewComponent {
        return this.componments.find((v, i, obj) => {
            return v.GetType() == type;
        });
    }

    GetRender(tolist: IViewRenderItem[]): void {
        if (this._render != null)
            tolist.push(this._render);
    }

}
export class FlatView implements IView {
    //impl for view
    constructor(tag: ViewTag = ViewTag.Main) {
        this.tag = tag;
    }
    private tag: ViewTag;
    GetTag(): ViewTag {
        return this.tag;
    }
 
    target: IRenderTarget = null;
    viewmatrix: Float32Array = new Float32Array(16);
    GetTarget(): IRenderTarget {
        return this.target;
    }
    GetViewMatrix(): Float32Array {
        return this.viewmatrix;
    }
    tran: Vector2 = Vector2.Zero;
    scale: Vector2 = Vector2.One;
    rotate: number = 0;

    items: IViewItem[] = [];

    Update(delta: number): void {
        let mat: Matrix3x2 = new Matrix3x2();
        Matrix3x2Math.MakeTRS(mat, this.tran, this.rotate, this.scale);
        let mat4x4 = new Float32Array(16);
        Matrix3x2Math.ToMatrix4x4(mat, mat4x4);

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].OnUpdate(delta);

        }

    }
    static RenderList(target: IRenderTarget,view: IView, renders: IViewRenderItem[], tag: number): void {
        renders.sort((a, b) => a.GetSortValue() - b.GetSortValue());
        let lastRender: IViewRenderItem = null;
        for (var i = 0; i < renders.length; i++) {
            let render = renders[i];
            if (lastRender != null && render.GetRenderObject() != lastRender.GetRenderObject()) {
                lastRender.EndRender();
            }
            renders[i].OnRender(target,view, tag);
            lastRender = renders[i];
        }
        if (lastRender != null)
            lastRender.EndRender();
    }
    Render(target: IRenderTarget, tag: number): void {
        let renders: IViewRenderItem[] = [];
        this.CollRenderItem(renders);
        FlatView.RenderList(target,this, renders, tag);
    }
    CollRenderItem(list: IViewRenderItem[]): void {

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].GetRender(list);
        }

    }

}
