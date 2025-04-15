import { Camera, Color, IRenderTarget, Rectangle, Render_Batcher, Resources, Scene, Sprite, tt, Vector2 } from "../../ttlayer2.js";
import { ISceneComponent, ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "../scene/scenenode.js";
import { ISceneRender_Sprite, SceneRender_Sprite } from "../scenerender/scenerender_sprite.js";

export class SceneComp_Sprite implements ISceneComponent, ISceneRender_Sprite {
    constructor() {
        this.sprite = Resources.GetPackElement().ConvertElemToSprite(Resources.GetWhiteBlock());
        this.sprite.pivotX = this.sprite.pixelwidth / 2;
        this.sprite.pivotY = this.sprite.pixelheight / 2;
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
        if (this._node != null) {
            let oldnode = this._node;
            this.OnRemove();
            this._sort = value;
            this.OnAdd(oldnode);
        }
        else {
            this._sort = value;
        }
    }
    sortz: number

    OnRender(spritebatch: Render_Batcher) {
        this.sprite.RenderWithPivot(spritebatch, this.pos, this.scale, this.color, 0);
    }
    get CompType(): string {
        return "sprite";
    }

    OnUpdate(delta: number): void {
        this.pos = this._node.pos;
        this.sortz = this._node.sortz;
    }
    private _node: SceneNode = null;
    get Node(): SceneNode {
        return this._node;
    }
    OnAdd(node: SceneNode): void {
        //保证自己对应的Render 被注册到场景
        let render = node.scene.GetSceneRender(this.type, this.sort);
        if (render == undefined) {
            node.scene.RegSceneRender(new SceneRender_Sprite(this.sort));
        }
        this._node = node;
        this._node.scene.AddRenderItem(this);
    }
    OnRemove(): void {
        let renderlist = this.sort ? this._node.scene.renderList_Sorted : this._node.scene.renderList_NoOrder[this.type];
        renderlist.splice(renderlist.indexOf(this), 1);
        this._node = null;
    }

}
