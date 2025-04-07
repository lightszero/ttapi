import { QUI_Canvas, Scene } from "../../../ttlayer2.js";
import { IRenderTarget } from "../../texture.js";
import { Camera, ILayerRender } from "../drawlayer.js";

export class Render_Scene implements ILayerRender {
    scene: Scene;
    constructor() {
        this.scene = new Scene();
    }
    OnUpdate(delta: number, target: IRenderTarget, camera: Camera, tag: number): void {
        //this.scene.Update(delta);
        //this.scene.camera = camera
    }
    OnRender(): void {

    }

}