import { IRenderTarget } from "../graphics/texture.js";
import { Color, Vector2 } from "../math/vector.js";
import { ISceneItemNode, ISceneRenderItem } from "./scene.js";
import { SceneItem_Group } from "./sceneitem.js";

export class SceneView {
    //impl for view
    target: IRenderTarget = null;
    lookat: Vector2 = Vector2.Zero;
    scale: Vector2 = Vector2.One;
    rotate: number;
    clearColor: Color = new Color(0.5, 0.5, 0.8, 1.0);
    root: ISceneItemNode = new SceneItem_Group();
    Update(delta: number): void {
        this.root.OnUpdate(delta);
    }
    CollRenderItem(): ISceneRenderItem[] {
        let list: ISceneRenderItem[] = [];
        SceneView._CollRenderItemDepth(list, this.root);
        return list;
    }
    private static _CollRenderItemDepth(list: ISceneRenderItem[], group: ISceneItemNode): void {
        let items = group.GetItems();
        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            let r = item.GetRender();
            if (r != null) {
                list.push(r);
            }
            if (item.IsGroup()) {
                this._CollRenderItemDepth(list, item as ISceneItemNode);
            }
        }
    }
}