import { IRenderTarget, QUI_Canvas } from "../../ttlayer2.js";
import { DrawLayer, DrawLayerTag } from "./drawlayer.js"

import { tt } from "../../../ttapi/ttapi.js";
import { Render_GUI } from "./render/render_gui.js";
export class DrawLayer_GUI extends DrawLayer {
    constructor(tag: DrawLayerTag = DrawLayerTag.GUI) {
        super(tag);
        let guirender = new Render_GUI();
        this.canvas = guirender.canvas;
        this.GetRenders().push(guirender);
    }

    private canvas: QUI_Canvas;
    GetCanvas(): QUI_Canvas {
        return this.canvas;
    }


}