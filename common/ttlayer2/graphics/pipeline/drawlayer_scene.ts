import { Scene } from "../../scene/scene.js";
import { DrawLayer, DrawLayerTag } from "./drawlayer.js";

export class DrawLayer_Scene extends DrawLayer {

    constructor(scene: Scene, tag: DrawLayerTag = DrawLayerTag.Main) {
        super(tag);
        this.SetScene(scene);
    }
    private scene: Scene;
    GetScene(): Scene {
        return this.scene;
    }
    SetScene(scene: Scene) {
        this.scene = scene;
        this.GetRenders().splice(0);
        this.AddRender(this.scene);
    }
}