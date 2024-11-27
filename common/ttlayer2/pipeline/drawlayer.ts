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
    OnRender(target: IRenderTarget, view: IDrawLayer, tag: number): void;
    GetRenderObject(): object;
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


export enum DrawLayerTag {
    ERROR,
    Main,//主输出
    GUI,//GUI
    PreRender,//预渲染
    POSTRender,//后渲染
    CUSTOM,
}

//View 也不会太多
//GUIView，已GUI为核心的View
//CanvasView，用于绘制大量图素的组件

//粒子View，用于绘制大量图素的视图，不受控
//粒子和Canvas 或许可以组合为一个。

//SceneView 用场景树组织的结构

//一个View 代表一个Camera
export interface IDrawLayer {
    GetTag(): DrawLayerTag;//View Tag 是不能动态调整的

    //在相同Tag之间的View的排序值。不需要，自己组织去
    //GetSortValue():number;

    //Target 去掉，由管线去控制
    //GetTarget(): IRenderTarget;


    Update(delta: number): void;

    //绘制View
    Render(target: IRenderTarget, rendertag: number): void
    //CollRenderItem(tolist: IViewRenderItem[]): void;
}

export class DrawLayerList {
    //private views: IView[] = []
    private mapviews: { [id: number]: IDrawLayer[] } = {};
    AddDrawLayers(view: IDrawLayer): void {
        let tag = view.GetTag();
        if (this.mapviews[tag] == undefined) {
            this.mapviews[tag] = [];
        }
        this.mapviews[tag].push(view);
    }
    RemoveDrawLayers(view: IDrawLayer): void {
        let tag = view.GetTag();
        let views = this.GetDrawLayers(tag);
        let index = views.indexOf(view);
        if (index >= 0) {
            views.splice(index, 1);
        }
    }
    GetDrawLayers(tag: number): IDrawLayer[] {
        if (this.mapviews[tag] == undefined) {
            this.mapviews[tag] = [];
        }
        return this.mapviews[tag];
    }
    RenderDrawLayers(tag: number, target: IRenderTarget, rendertag: number): number {
        let views = this.GetDrawLayers(tag);
        if (views != null) {
            for (let i = 0; i < views.length; i++) {
                views[i].Render(target, rendertag);
            }
            return views.length;
        }
        return 0;
    }
    GetDrawLayerTags(): number[] {
        let tags: DrawLayerTag[] = [];
        for (let key in this.mapviews) {
            tags.push(key as any as number);
        }
        return tags;
    }
    Update(delta: number): void {
        for (let key in this.mapviews) {
            let group = this.mapviews[key];
            for (let i = 0; i < group.length; i++) {
                group[i].Update(delta);
            }
        }
    }



    pipeline: IPileLine = new PipeLine_Default();
    Render(): void {
        this.pipeline.Render(this);
    }
}