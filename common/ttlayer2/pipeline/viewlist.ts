import { IRenderTarget } from "../graphics/texture.js";
import { Matrix3x2, Matrix3x2Math } from "../math/Matrix3x2.js";
import { Color, Vector2 } from "../math/vector.js";
import { GameApp } from "../ttlayer2.js";


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
    GetTarget(): IRenderTarget;
    GetViewMatrix(): Float32Array;
    Update(delta: number): void;
    CollRenderItem(tolist: IViewRenderItem[]): void;
}

export class ViewList {
    views: IView[] = []
    clearColor: Color = Color.Black;
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
    Render(): void {
        //默认管线,后期把这玩意儿搞成容易配置的

        //绘制BackBuffer
        let lasttarget: IRenderTarget = null;
        for (var i = 0; i < this.views.length; i++) {
            let v = this.views[i];
            let target = v.GetTarget();
            if (target == null)
                continue;//

            if (!target.IsMainOutput()) {
                if (lasttarget != target) {
                    if (lasttarget != null)
                        lasttarget.End();

                    lasttarget = target;
                    lasttarget.Begin();
                }
                let renders: IViewRenderItem[] = [];
                v.CollRenderItem(renders);
                this.RenderList(v, renders, 0);
            }


        }

        if (lasttarget != null) {
            lasttarget.End();
        }

        //绘制上屏View
        let maintarget = GameApp.GetMainScreen();
        maintarget.Begin();
        maintarget.Clear(this.clearColor);
        for (var i = 0; i < this.views.length; i++) {
            let v = this.views[i];
            let target = v.GetTarget();
            if (target == null)
                target = maintarget;
            if (target.IsMainOutput()) {
                let renders: IViewRenderItem[] = [];
                v.CollRenderItem(renders);
                this.RenderList(v, renders, 0);
            }
        }
        GameApp.GetMainScreen().End();


    }
}