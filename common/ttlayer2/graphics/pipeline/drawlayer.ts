import { IRenderTarget } from "../../graphics/texture.js";
import { Matrix3x2, Matrix3x2Math } from "../../math/Matrix3x2.js";
import { Color, Rectangle, Vector2 } from "../../math/vector.js";
import { GameApp, QUI_Canvas } from "../../ttlayer2.js";
import { IPileLine, PipeLine_Default } from "./pipeline.js";





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

export class Camera {
    LookAt: Vector2 = Vector2.Zero;
    Scale: number = 2.0;
    limitRect: Rectangle = null;
    private _viewmatrix: Float32Array = new Float32Array(16);
    private _projmatrix: Float32Array = new Float32Array(16);

    GetViewMatrix(): Float32Array {
        let matrix = this._viewmatrix;
        let sx = this.Scale;
        let sy = this.Scale;
        let offx = -this.LookAt.X;
        let offy = -this.LookAt.Y;
        matrix[0] = sx; matrix[4] = 0; matrix[8] = 0; matrix[12] = offx * sx;
        matrix[1] = 0; matrix[5] = sy; matrix[9] = 0; matrix[13] = offy * sy;
        matrix[2] = 0; matrix[6] = 0; matrix[10] = 1; matrix[14] = 0;
        matrix[3] = 0; matrix[7] = 0; matrix[11] = 0; matrix[15] = 1;
        return this._viewmatrix;
    }
    GetProjMatrix(_target: IRenderTarget): Float32Array {
        let matrix = this._projmatrix;
        let offx: number = 0;
        let offy: number = 0;

        let sx = 1.0 * 2 / _target.getWidth()
        let sy = 1 * 2 / _target.getHeight()
        if (_target.IsMainOutput())//isMainoutput
            sy *= -1;

        matrix[0] = sx; matrix[4] = 0; matrix[8] = 0; matrix[12] = offx;
        matrix[1] = 0; matrix[5] = sy; matrix[9] = 0; matrix[13] = offy;
        matrix[2] = 0; matrix[6] = 0; matrix[10] = 1; matrix[14] = 0;
        matrix[3] = 0; matrix[7] = 0; matrix[11] = 0; matrix[15] = 1;

        return matrix;
    }
}
export interface ILayerRender {
    OnUpdate(delta: number, target: IRenderTarget, camera: Camera, tag: number): void;
    OnRender(): void;
}
//一个View 代表一个Camera
export class DrawLayer {
    constructor(tag: DrawLayerTag) {
        this.numbertag = tag;
    }
    private numbertag: number;
    private camera: Camera = new Camera();
    private renders: ILayerRender[] = [];

    GetTag(): DrawLayerTag//View Tag 是不能动态调整的
    {
        return this.numbertag;
    }
    GetCamera(): Camera {
        return this.camera;
    }
    GetRenders(): ILayerRender[] {
        return this.renders;
    }
    AddRender(render: ILayerRender): void {
        this.renders.push(render);
    }
    lasttarget: IRenderTarget;
    Update(delta: number, target: IRenderTarget, rendertag: number): void {
        for (let i = 0; i < this.renders.length; i++) {
            this.renders[i].OnUpdate(delta, target, this.camera, rendertag);
        }
    }

    //绘制View
    Render(target: IRenderTarget, rendertag: number): void {
        if (this.camera.limitRect != null) {
            target.PushLimitRect(this.camera.limitRect);
        }
        for (let i = 0; i < this.renders.length; i++) {
            this.renders[i].OnRender();
        }
        if (this.camera.limitRect != null) {
            target.ClearLimitRect();
        }
    }
    //CollRenderItem(tolist: IViewRenderItem[]): void;
}

export class DrawLayerList {
    //private views: IView[] = []
    private mapviews: { [id: number]: DrawLayer[] } = {};
    AddDrawLayer(view: DrawLayer): void {
        let tag = view.GetTag();
        if (this.mapviews[tag] == undefined) {
            this.mapviews[tag] = [];
        }
        this.mapviews[tag].push(view);
    }
    RemoveDrawLayers(view: DrawLayer): void {
        let tag = view.GetTag();
        let views = this.GetDrawLayers(tag);
        let index = views.indexOf(view);
        if (index >= 0) {
            views.splice(index, 1);
        }
    }
    GetDrawLayers(tag: number): DrawLayer[] {
        if (this.mapviews[tag] == undefined) {
            this.mapviews[tag] = [];
        }
        return this.mapviews[tag];
    }
    UpdateDrawLayers(delta: number, tag: number, target: IRenderTarget, rendertag: number): number {
        let views = this.GetDrawLayers(tag);
        if (views != null) {
            for (let i = 0; i < views.length; i++) {
                views[i].Update(delta, target, rendertag);
            }
            return views.length;
        }
        return 0;
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
        this.pipeline.Update(this, delta);
        // for (let key in this.mapviews) {
        //     let group = this.mapviews[key];
        //     for (let i = 0; i < group.length; i++) {
        //         group[i].Update(delta);
        //     }
        // }
    }



    pipeline: IPileLine = new PipeLine_Default();
    Render(): void {
        this.pipeline.Render(this);
    }
}