import { tt } from "../../ttapi/ttapi.js";
import { Camera, IRenderTarget, Rectangle, Render_Batcher } from "../ttlayer2.js";

import * as QUI from "./qui_base.js"

export class QUI_Canvas extends QUI.QUI_Container {
    constructor() {
        super();
        this.batcherUI = new Render_Batcher(tt.graphic.GetWebGL());// tt.graphic.CreateRenderer_Batcher();
        //this.FIllTarget();
    }
    FIllTarget() {
        if (this.target == null)
            return;

        this.camera.LookAt.X = this.target.getWidth() / 2 / this.camera.Scale;
        this.camera.LookAt.Y = this.target.getHeight() / 2 / this.camera.Scale;
        //让batcher的中心点看着target中心点，这样就会把0，0点移动到左上角
        //this.batcherUI.LookAt.X = this.target.getWidth() / 2;
        //this.batcherUI.LookAt.Y = this.target.getHeight() / 2;

        let scalewidth = this.target.getWidth() / this.camera.Scale;
        let scaleheight = this.target.getHeight() / this.camera.Scale;
        this.localRect.setByRect(new Rectangle(0, 0, scalewidth, scaleheight));
    }

    //Canvas Scale 不改变输出分辨率，而是直接缩放
    //而tt.graphic.setMainScreenScale 会直接改变输出分辨率
    //scale: number = 1.0;
    batcherUI: Render_Batcher;
    target: IRenderTarget;
    camera: Camera;
    //scale: number = 1.0;

    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Canvas;
    }
    OnUpdate(_canvas: QUI_Canvas, delta: number): void {

        //要考虑到屏幕尺寸会变
        if (!this.Enable)
            return;

        if (this.target != null && this.camera != null) {
            // this.batcherUI.LookAt.X = this.target.getWidth() / 2;
            // this.batcherUI.LookAt.Y = this.target.getHeight() / 2;

            this.FIllTarget();
        }
        else {
            return;
        }
        super.OnUpdate(this, delta);
        if (this._event.length > 0) {
            for (let i = 0; i < this._event.length; i++) {
                this._event[i]();
            }
            this._event.splice(0);//clear
        }
    }
    OnRender(_canvas: QUI_Canvas): void {
        //canvas 自身不绘制
        if (!this.Enable)
            return;

        this.FIllTarget();

        this.batcherUI.BeginDraw(this.target, this.camera);
        super.OnRender(this);
        this.batcherUI.EndDraw();
    }
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        let fs = tt.graphic.getFinalScale() / this.camera.Scale;
        let tx = x * fs;
        let ty = y * fs;
        return super.OnTouch(this, touchid, press, move, tx, ty);
    }
    OnWheel(_canvas: QUI_Canvas, dx: number, dy: number, dz: number): boolean {
        return super.OnWheel(this, dx, dy, dz);
    }
    _event: (() => void)[] = [];
    InvokeEvent(evt: () => void) {
        this._event.push(evt);
    }
}
