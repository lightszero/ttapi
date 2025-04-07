import { IRenderTarget, QUI_Canvas } from "../../../ttlayer2.js";
import { Camera, ILayerRender } from "../drawlayer.js";

export class Render_GUI implements ILayerRender {
    canvas: QUI_Canvas = new QUI_Canvas();
    GetGUI(): QUI_Canvas {
        return this.canvas;
    }
    lasttag: number = 0;
    OnUpdate(delta: number, target: IRenderTarget, camera: Camera, rendertag: number): void {
        this.lasttag = rendertag;
        this.canvas.target = target;
        this.canvas.camera = camera;
        this.canvas.OnUpdate(null, delta);
    }
    OnRender(): void {
        if (this.lasttag == 0) {
            //this.canvas.batcherUI.LookAt = camera.LookAt;


            this.canvas.OnRender(null);
        }
    }

}