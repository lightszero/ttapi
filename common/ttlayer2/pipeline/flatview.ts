import { IRenderTarget } from "../graphics/texture.js";
import { Matrix3x2, Matrix3x2Math } from "../math/Matrix3x2.js";
import { Vector2 } from "../math/vector.js";
import { IView, IViewComponent, IViewItem, IViewRenderItem } from "./viewlist.js";


export class FlatViewItem implements IViewItem {

    private _worldMatrix: Matrix3x2 = new Matrix3x2();
    private componments: IViewComponent[] = null;
    private _render: IViewRenderItem = null;
    pos: Vector2 = Vector2.Zero;
    scale: Vector2 = Vector2.One;
    rotate: number = 0;

    GetWorldMatrix(): Matrix3x2 {
        return this._worldMatrix;
    }

    OnUpdate(delta: number): void {
        Matrix3x2Math.MakeTRS(this._worldMatrix, this.pos, this.rotate, this.scale);

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

    GetRender(): IViewRenderItem | null {
        return this._render;
    }

}
export class FlatView implements IView {
    //impl for view
    tag: string;
    sortvalue: number = 0;
    GetSortValue(): number
    {
        return this.sortvalue;
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
    CollRenderItem(list: IViewRenderItem[]): void {

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].GetRender(list);
        }

    }

}
