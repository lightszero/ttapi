import { Scene } from "../../scene/scene.js";
import { DrawLayer, DrawLayerTag } from "./drawlayer.js";

export class DrawLayer_Scene extends DrawLayer {

    constructor(tag: DrawLayerTag = DrawLayerTag.Main) {
        super(tag);
    }
    private scene:Scene;
}