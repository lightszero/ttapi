import { tt } from "../../ttapi/ttapi.js";
import { Color, Rectangle, RectangleMath } from "../math/vector.js";
import { TextureFormat } from "./texture.js";


export class MainScreen {

    _webgl: WebGL2RenderingContext;
    constructor(webgl: WebGL2RenderingContext) {
        this._webgl = webgl;
        console.log("webgl init size:" + webgl.canvas.width + "," + webgl.canvas.height);
        this.ClearColor = new Color(1, 0, 1, 1);
    }

    ClearColor: Color;
    IsMainOutput(): boolean {
        return true;
    }
    Begin(): void {
        this._webgl.bindFramebuffer(this._webgl.FRAMEBUFFER, null);
        this._webgl.viewport(0, 0, this.getWidth(), this.getHeight());
        this._webgl.clearColor(this.ClearColor.R, this.ClearColor.G, this.ClearColor.B, this.ClearColor.A);
        this._webgl.clear(this._webgl.COLOR_BUFFER_BIT);
        this.ResetLimitRect();
    }
    End(): void {
        this._webgl.flush();
    }
    getID(): number {
        return 0
    }
    getFormat(): TextureFormat {
        return TextureFormat.RGBA32;
    }
    getWidth(): number {
        return this._webgl.canvas.width;
    }
    getHeight(): number {
        return this._webgl.canvas.height;
    }
    getData(): Uint8Array {
        throw new Error("not spport on MainScreen.");
    }
    IsStatic(): boolean {
        return true;
    }
    IsTarget(): boolean {
        return true;
    }


    UploadTexture(x: number, y: number, w: number, h: number, data: Uint8Array | Uint8ClampedArray): void {
        throw new Error("MainScreen Method not implemented.");
    }
    ApplyTexture(TurnToStatic: boolean): void {
        throw new Error("MainScreen Method not implemented.");
    }
    Destory(): void {
        throw new Error("MainScreen Method not implemented.");
    }
    Resize(width: number, height: number): void {
        throw new Error("MainScreen Method not implemented.");
    }
    rectLimit: Rectangle[] = []
    PushLimitRect(rect: Rectangle): void {
        let newrect = null;
        if (this.rectLimit.length == 0)
            newrect = RectangleMath.Clone(rect)

        else {
            let r = this.rectLimit[this.rectLimit.length - 1];
            newrect = RectangleMath.Intersect(r, rect);
        }

        this.rectLimit.push(newrect);
        this.ResetLimitRect();
    }
    PopLimitRect() {
        this.rectLimit.splice(this.rectLimit.length - 1, 1);
        this.ResetLimitRect();
    }
    ClearLimitRect(): void {
        this.rectLimit.splice(0, this.rectLimit.length);
        this.ResetLimitRect();
    }
    ResetLimitRect() {
        if (this.rectLimit.length == 0) {
            this._webgl.disable(this._webgl.SCISSOR_TEST);
            //this._webgl.scissor(0, 0, this.getWidth(), this.getHeight());
        }
        else {
            let rect = this.rectLimit[this.rectLimit.length - 1];
            this._webgl.enable(this._webgl.SCISSOR_TEST);
            this._webgl.scissor(rect.X, this.getHeight() - rect.Y - rect.Height, rect.Width, rect.Height);
        }
    }
}
