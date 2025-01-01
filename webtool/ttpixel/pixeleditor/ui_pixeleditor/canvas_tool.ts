import { Color32 } from "../../ttlayer2/ttlayer2.js";
import { UI_Canvas } from "./ui_canvas.js";

export interface ICanvasTool {
    Init(c: UI_Canvas): void
    Begin(): void;
    End(): void;
    Update(): void;
}
export class CanvasTool_Pen implements ICanvasTool {
    earse: boolean = false;
    color: Color32 = new Color32(0, 0, 0, 255);
    SetColor(c: Color32): boolean {
        if (Color32.Equal(c, this.color))
            return false;
        this.color = c.Clone();
        return true;
    }
    canvas: UI_Canvas;
    Init(c: UI_Canvas): void {
        this.canvas = c;
    }
    private begin: boolean = false;
    Begin(): void {
        this.begin = true;
    }
    End(): void {
        this.begin = false;
    }
    Update(): void {
        if (this.begin) {
            let x = this.canvas.pickPos.X | 0;
            let y = this.canvas.pickPos.Y | 0;
            let index = (this.canvas.data.width * y + x) * 4;
            if (this.earse) {
                this.canvas.data.data[index + 0] = 0;
                this.canvas.data.data[index + 1] = 0;
                this.canvas.data.data[index + 2] = 0;
                this.canvas.data.data[index + 3] = 0;
            }
            else {
                this.canvas.data.data[index + 0] = this.color.R;
                this.canvas.data.data[index + 1] = this.color.G;
                this.canvas.data.data[index + 2] = this.color.B;
                this.canvas.data.data[index + 3] = this.color.A;
            }
            this.canvas.simpleimage.UploadTexture(0, 0, this.canvas.data.width, this.canvas.data.height, this.canvas.data.data);

        }
    }

}