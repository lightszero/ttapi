import { IRenderTarget, QUI_Canvas } from "../../../ttlayer2.js";
import { Camera, ILayerRender } from "../drawlayer.js";

export class Render_GUI implements ILayerRender {
    canvas: QUI_Canvas = new QUI_Canvas();
    GetGUI(): QUI_Canvas {
        return this.canvas;
    }
    OnUpdate(delta: number): void {
        this.canvas.OnUpdate(null, delta);
    }
    OnRender(target: IRenderTarget, camera: Camera, rendertag: number): void {
        if (rendertag == 0) {
            //this.canvas.batcherUI.LookAt = camera.LookAt;


            this.canvas.target = target;
            this.canvas.camera = camera;

            this.canvas.OnRender(null);
        }
    }

}