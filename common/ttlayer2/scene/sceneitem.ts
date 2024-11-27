import { Matrix3x2, Matrix3x2Math } from "../math/Matrix3x2.js";
import { Vector2 } from "../math/vector.js";
import { ISceneItem, ISceneItemNode, ISceneItemSetParent } from "../scene/scene.js";
import { IViewComponent, IViewItem, IViewRenderItem } from "../pipeline/drawlayer.js";

export class SceneItem implements IViewItem, ISceneItemSetParent {
    private parent: ISceneItemNode;
    private _localMatrix: Matrix3x2 = new Matrix3x2();;
    private _worldMatrix: Matrix3x2 = new Matrix3x2();
    private componments: IViewComponent[] = null;
    private _render: IViewRenderItem = null;
    pos: Vector2 = Vector2.Zero;
    scale: Vector2 = Vector2.One;
    rotate: number = 0;

    GetWorldMatrix(): Matrix3x2 {
        return this._worldMatrix;
    }
    GetParent(): ISceneItemNode {
        return this.parent;
    }
    OnUpdate(delta: number): void {
        Matrix3x2Math.MakeTRS(this._localMatrix, this.pos, this.rotate, this.scale);
        if (this.GetParent() == null) {
            Matrix3x2Math.Clone(this._worldMatrix, this._localMatrix);
        }
        else {
            Matrix3x2Math.Mul(this._worldMatrix, this.GetParent().GetWorldMatrix(), this._localMatrix);
        }

        if (this.componments != null) {
            for (var i = 0; i < this.componments.length; i++) {
                this.componments[i].OnUpdate(delta);
            }
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

    GetRender(renders: IViewRenderItem[]): void {
        if (this._render != null)
            renders.push(this._render);
    }
    IsGroup(): boolean {
        return false;
    }

    SetParent(parent: ISceneItemNode): void {
        this.parent = parent;
    }
}
export class SceneItem_Group implements ISceneItemNode, ISceneItemSetParent {
    pos: Vector2 = Vector2.Zero;
    scale: Vector2 = Vector2.One;
    rotate: number = 0;
    private _localMatrix: Matrix3x2 = new Matrix3x2();;
    private _worldMatrix: Matrix3x2 = new Matrix3x2();
    GetWorldMatrix(): Matrix3x2 {
        return this._worldMatrix;
    }
    IsGroup(): boolean {
        return true;
    }
    GetParent(): ISceneItemNode {
        return this.parent;
    }
    SetParent(parent: ISceneItemNode): void {
        this.parent = parent;
    }
    private parent: ISceneItemNode;
    private items: ISceneItem[] = [];
    AddChild(item: ISceneItem): void {
        this.items.push(item);
        (item as any as ISceneItemSetParent).SetParent(this);
    }
    RemoveChild(item: ISceneItem): void {
        let index = this.items.indexOf(item);
        if (index > 0) {
            this.items.splice(index, 1);
            (item as any as ISceneItemSetParent).SetParent(null);
        }
    }
    GetItems(): ISceneItem[] {
        return this.items;
    }
    SetItems(items: ISceneItem[]): void {
        this.items = items;
        for (var i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.GetParent() != this) {
                item.GetParent().RemoveChild(item);
            }
            (item as any as ISceneItemSetParent).SetParent(this);
        }
    }
    OnUpdate(delta: number): void {
        Matrix3x2Math.MakeTRS(this._localMatrix, this.pos, this.rotate, this.scale);
        if (this.GetParent() == null) {
            Matrix3x2Math.Clone(this._worldMatrix, this._localMatrix);
        }
        else {
            Matrix3x2Math.Mul(this._worldMatrix, this.GetParent().GetWorldMatrix(), this._localMatrix);
        }


        for (var i = 0; i < this.items.length; i++) {
            this.items[i].OnUpdate(delta);
        }


        if (this.componments != null) {
            for (var i = 0; i < this.componments.length; i++) {
                this.componments[i].OnUpdate(delta);
            }
        }
    }
    private componments: IViewComponent[] = null;
    private _render: IViewRenderItem = null;
    GetRender(tolist: IViewRenderItem[]): void {
        if (this._render != null) {
            tolist.push(this._render);
        }
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].GetRender(tolist);
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

}