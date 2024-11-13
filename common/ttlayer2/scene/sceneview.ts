import { IRenderTarget } from "../graphics/texture.js";
import { Color, Vector2 } from "../math/vector.js";
import { IView, IViewRenderItem, ViewTag } from "../pipeline/viewlist.js";
import { SceneItem_Group } from "../scene/sceneitem.js";
import { ISceneItemNode } from "../scene/scene.js";
import { Matrix3x2, Matrix3x2Math } from "../math/Matrix3x2.js";


export class SceneView implements IView {
    //impl for view
    constructor(tag: ViewTag = ViewTag.Main) {
        this.tag = tag;
    }
    private tag: ViewTag;
    GetTag(): ViewTag {
        return this.tag;
    }
    target: IRenderTarget = null;
    GetTarget(): IRenderTarget {
        return this.target;
    }
    GetViewMatrix(): Float32Array {
        let mat: Matrix3x2;
        Matrix3x2Math.MakeTRS(mat, this.tran, this.rotate, this.scale);
        let mat4x4 = new Float32Array(16);
        Matrix3x2Math.ToMatrix4x4(mat, mat4x4);
        return mat4x4;
    }
    tran: Vector2 = Vector2.Zero;
    scale: Vector2 = Vector2.One;
    rotate: number;
    clearColor: Color = new Color(0.5, 0.5, 0.8, 1.0);
    root: ISceneItemNode = new SceneItem_Group();
    Update(delta: number): void {
        this.root.OnUpdate(delta);
    }
    CollRenderItem(list: IViewRenderItem[]): void {
        this.root.GetRender(list);

    }
    static RenderList(target: IRenderTarget, view: IView, renders: IViewRenderItem[], tag: number): void {
        renders.sort((a, b) => a.GetSortValue() - b.GetSortValue());
        let lastRender: IViewRenderItem = null;
        for (var i = 0; i < renders.length; i++) {
            let render = renders[i];
            if (lastRender != null && render.GetRenderObject() != lastRender.GetRenderObject()) {
                lastRender.EndRender();
            }
            renders[i].OnRender(target, view, tag);
            lastRender = renders[i];
        }
        if (lastRender != null)
            lastRender.EndRender();
    }
    Render(target: IRenderTarget, tag: number): void {
        let renders: IViewRenderItem[] = [];
        this.CollRenderItem(renders);
        SceneView.RenderList(target, this, renders, tag);
    }
}