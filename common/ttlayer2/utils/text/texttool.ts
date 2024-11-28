import { Font } from "../../ttlayer2.js";
import { tt } from "../../../ttapi/ttapi.js";
export class TextTool {

    static LoadTextPixel(text: string, font: string, fontsize: number, width: number, height: number, x: number, y: number): ImageData {
        let c2d = tt.graphic.GetBackGroundC2D();
        c2d.canvas.width = width;
        c2d.canvas.height = height;
        c2d.scale(1, 1);

        //type CanvasTextRendering = "auto" | "geometricPrecision" | "optimizeLegibility" | "optimizeSpeed";

        c2d.imageSmoothingEnabled = false;
        c2d.shadowBlur = 0;

        c2d.font = fontsize + "px " + font;// regular";

        c2d.clearRect(0, 0, width, height);
        //c2d.fillStyle = "#00000000";
        //c2d.fillRect(0, 0, width, height);


        c2d.textBaseline = "top";
        c2d.textAlign = "left"
        c2d.fillStyle = "#ffffffff";
        c2d.globalAlpha = 1;
        c2d.fillText(text, x, y);// + m.ideographicBaseline);


        let pixelwidth = c2d.measureText(text).width;
        let imagedata = c2d.getImageData(0, 0, pixelwidth, height);
        return imagedata;
    }
}