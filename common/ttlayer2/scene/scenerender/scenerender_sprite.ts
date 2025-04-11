import { Camera, IRenderTarget, Render_Batcher, tt } from "../../ttlayer2.js";
import { ISceneRender, ISceneRenderItem, SceneRenderType } from "../scene/scenenode.js";

// 导出SceneRender_Sprite类，实现ISceneRender接口
export class SceneRender_Sprite implements ISceneRender {
    // 构造函数，传入sort参数，默认为false
    constructor(sort: boolean = false) {
        // 将sort参数赋值给_sort属性
        this._sort = sort;
        // 获取WebGL对象
        let gl = tt.graphic.GetWebGL();
        // 创建Render_Batcher对象
        this.spritebatch = new Render_Batcher(gl);
    }

    // 私有属性，默认为false
    private _sort: boolean = false;
    // 获取sort属性
    get sort(): boolean {
        return this._sort;
    }
    // 获取type属性，返回SceneRenderType.VBOBatchRender
    get type(): SceneRenderType {
        return SceneRenderType.VBOBatchRender;
    }
    // 创建Render_Batcher对象
    spritebatch: Render_Batcher;
    // 渲染批处理
    RenderBatch(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem[]): void {
        // 开始渲染
        this.RenderOrderedBegin(camera, renderTarget, tag);
        // 遍历renderItems数组
        for (var i = 0; i < renderItems.length; i++) {
            // 渲染每个renderItem
            this.RenderOrdered(renderItems[i]);
        }
        // 结束渲染
        this.RenderOrderedEnd();
    }
    // 开始渲染
    RenderOrderedBegin(camera: Camera, renderTarget: IRenderTarget, tag: number): void {
        // 开始绘制
        this.spritebatch.BeginDraw(renderTarget, camera);
    }
    // 渲染每个renderItem
    RenderOrdered(renderItem: ISceneRenderItem): void {
        // 将renderItem转换为SceneComp_Sprite类型
        let item = renderItem as ISceneRender_Sprite;
        item.OnRender(this.spritebatch);
        // 使用Render_Batcher对象渲染sprite

    }
    RenderOrderedEnd(): void {
        this.spritebatch.EndDraw();
    }

}
export interface ISceneRender_Sprite extends ISceneRenderItem {
    OnRender(spritebatch: Render_Batcher): void;
}