import { IRenderTarget } from "../graphics/texture.js";
import { Matrix3x2, Matrix3x2Math } from "../math/Matrix3x2.js";
import { Color, Vector2 } from "../math/vector.js";
import { GameApp } from "../ttlayer2.js";
import { SceneItem_Group } from "./sceneitem.js";
import { SceneView } from "./sceneview.js";

export interface ITran {
    pos: Vector2;
    scale: Vector2;
    rotate: number;

}

export interface ISceneRenderItem extends ISceneComponent {
    GetSortValue(): number
    OnRender(view: SceneView, tag: number): void;
    GetRenderObject(): any;
    EndRender(): void;
}
export interface ISceneComponent {
    GetType(): string;
    OnAdd(item: ISceneItem): void;
    OnUpdate(delta: number): void;
    IsRender(): boolean;
}
export interface ISceneItem extends ITran {
    GetWorldMatrix(): Matrix3x2;
    GetParent(): ISceneItemNode;
    OnUpdate(delta: number): void;
    GetRender(): ISceneRenderItem | null;
    IsGroup(): boolean
    AddComponment(comp: ISceneComponent): void
    GetComponments(): ISceneComponent[];
    GetComponment(Type: string): ISceneComponent;
}
//节点也必须继承这个,不过不想让用户可以随时访问当
export interface ISceneItemSetParent {
    SetParent(parent: ISceneItemNode): void
}
export interface ISceneItemNode extends ISceneItem {

    AddChild(item: ISceneItem): void;
    RemoveChild(item: ISceneItem): void;
    GetItems(): ISceneItem[];
    SetItems(items: ISceneItem[]): void
}
//场景图概念,树形组织,方便理解
export class Scene {
    views: SceneView[] = [new SceneView()]
    clearColor: Color = Color.Black;
    Update(delta: number): void {
        for (var i = 0; i < this.views.length; i++) {
            this.views[i].Update(delta);
            let v = this.views[i];
            if (v.target == null || v.target.IsMainOutput()) {
                this.clearColor = v.clearColor;
            }
        }
    }

    RenderList(view: SceneView, renders: ISceneRenderItem[], tag: number): void {
        renders.sort((a, b) => a.GetSortValue() - b.GetSortValue());
        let lastRender: ISceneRenderItem = null;
        for (var i = 0; i < renders.length; i++) {
            let render = renders[i];
            if (lastRender != null && render.GetRenderObject() != lastRender.GetRenderObject()) {
                lastRender.EndRender();
            }
            renders[i].OnRender(view, tag);
            lastRender = renders[i];
        }
        if (lastRender != null)
            lastRender.EndRender();
    }
    Render(): void {
        //默认管线,后期把这玩意儿搞成容易配置的

        //绘制BackBuffer
        let lasttarget: IRenderTarget = null;
        for (var i = 0; i < this.views.length; i++) {
            let v = this.views[i];
            if (v.target != null && !v.target.IsMainOutput()) {
                if (lasttarget != v.target) {
                    if (lasttarget != null)
                        lasttarget.End();
                    v.target.Begin();
                    lasttarget = v.target;
                }
                let renders = v.CollRenderItem();
                this.RenderList(v, renders, 0);
            }


        }

        if (lasttarget != null) {
            lasttarget.End();
        }

        //绘制上屏View
        GameApp.GetMainScreen().Begin();
        GameApp.GetMainScreen().Clear(this.clearColor);
        for (var i = 0; i < this.views.length; i++) {
            let v = this.views[i];
            if (v.target == null || v.target.IsMainOutput()) {
                let renders = v.CollRenderItem();
                this.RenderList(v, renders, 0);

            }
        }
        GameApp.GetMainScreen().End();
    }
}