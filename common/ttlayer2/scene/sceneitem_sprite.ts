import { Camera, Color, IRenderTarget, Rectangle, Render_Batcher, Resources, Sprite, tt, Vector2 } from "../ttlayer2.js";
import { ISceneComponent, ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "./scenenode.js";

export class SceneRender_Sprite implements ISceneRender {
    constructor(noorder: boolean = false) {
        //noorder=true mean use zwrite & ztest
        let gl = tt.graphic.GetWebGL();
        this.spritebatch = new Render_Batcher(gl);
    }
    spritebatch: Render_Batcher;
    RenderBatch(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem[]): void {
        this.RenderOrderedBegin(camera, renderTarget, tag);
        for (var i = 0; i < renderItems.length; i++) {
            this.RenderOrdered(renderItems[i]);
        }
        this.RenderOrderedEnd();
    }
    RenderOrderedBegin(camera: Camera, renderTarget: IRenderTarget, tag: number): void {
        this.spritebatch.BeginDraw(renderTarget, camera);
    }
    RenderOrdered(renderItem: ISceneRenderItem): void {
        let item = renderItem as SceneComp_Sprite;
        item.sprite.RenderWithPivot(this.spritebatch, item.pos, item.scale, item.color, 0);
    }
    RenderOrderedEnd(): void {
        this.spritebatch.EndDraw();
    }

}
export class SceneComp_Sprite implements ISceneComponent, ISceneRenderItem {
    constructor() {
        this.sprite = Resources.GetPackElement().ConvertElemToSprite(Resources.GetWhiteBlock());
    }

    sprite: Sprite;
    pos: Vector2;
    scale: Vector2 = Vector2.One;
    color: Color = Color.White;
    private _sort: boolean = false;
    //ISceneRenderItem
    get type(): SceneRenderType {
        return SceneRenderType.VBOBatchRender;
    }

    get sort(): boolean {
        return this._sort;
    }
    set sort(value: boolean) {
        if (value == this._sort)
            return;
        if (this.node != null) {
            let oldnode = this.node;
            this.OnRemove();
            this._sort = value;
            this.OnAdd(oldnode);
        }
        else {
            this._sort = value;
        }
    }
    get sortz(): number {
        return this.node.pos.Z;
    }


    get CompType(): string
    {
        return "sprite";
    }

    OnUpdate(delta: number): void {
        this.pos = this.node.pos;
    }
    node: SceneNode;
    OnAdd(node: SceneNode): void {
        this.node = node;
        let renderlist = this.sort ? this.node.scene.renderList_Sorted : this.node.scene.renderList_NoOrder[this.type];
        renderlist.push(this);
    }
    OnRemove(): void {
        let renderlist = this.sort ? this.node.scene.renderList_Sorted : this.node.scene.renderList_NoOrder[this.type];
        renderlist.splice(renderlist.indexOf(this), 1);
        this.node = null;
    }

}