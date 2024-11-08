import { IRenderTarget } from "../graphics/texture.js";
import { Matrix3x2, Matrix3x2Math } from "../math/Matrix3x2.js";
import { Color, Vector2 } from "../math/vector.js";
import { GameApp } from "../ttlayer2.js";
import { IPileLine, PipeLine_Default } from "./pipeline.js";


///一个场景化的系统是通用的
///tiledmap系统 用来绘制背景
///粒子系统 用来绘制大量粒子
///粒子系统的变种可以用来绘制大量精灵
///Canvas系统 用来绘制大量精灵
export interface ITran {
    pos: Vector2;
    scale: Vector2;
    rotate: number;

}

export interface IViewRenderItem extends IViewComponent {
    GetSortValue(): number
    OnRender(view: IView, tag: number): void;
    GetRenderObject(): any;
    EndRender(): void;
}
export interface IViewComponent {
    GetType(): string;
    OnAdd(item: IViewItem): void;
    OnUpdate(delta: number): void;
    IsRender(): boolean;
}
export interface IViewItem extends ITran {
    GetWorldMatrix(): Matrix3x2;

    OnUpdate(delta: number): void;
    GetRender(tolist: IViewRenderItem[]): void;

    AddComponment(comp: IViewComponent): void
    GetComponments(): IViewComponent[];
    GetComponment(Type: string): IViewComponent;
}


export interface IView {
    tag: string;
    GetSortValue():number;
    GetTarget(): IRenderTarget;
    GetViewMatrix(): Float32Array;
    Update(delta: number): void;
    CollRenderItem(tolist: IViewRenderItem[]): void;
}

export class ViewList {
    views: IView[] = []
   
    Update(delta: number): void {
        for (var i = 0; i < this.views.length; i++) {
            this.views[i].Update(delta);
            //ClearColor 不重要
        }
    }

    RenderList(view: IView, renders: IViewRenderItem[], tag: number): void {
        renders.sort((a, b) => a.GetSortValue() - b.GetSortValue());
        let lastRender: IViewRenderItem = null;
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

    pipeline:IPileLine =new PipeLine_Default();
    Render(): void {
        this.pipeline.Render(this);
    }
}