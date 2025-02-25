import { BaseElement } from "./dombase.js";

export class Canvas extends BaseElement {

    constructor() {
        super();
        this._root = document.createElement("canvas");
        this._root.style.left = "0px";
        this._root.style.right = "0px";
        this._root.style.top = "0px";
        this._root.style.bottom = "0px";
        this._root.style.position = "absolute";
        this._root.style.width = "100%";
        this._root.style.height = "100%";

        this._c2d = (this._root as HTMLCanvasElement).getContext("2d");
        window.addEventListener("resize", () => {
            this.Refresh();
        });
        // this._root.addEventListener("resize", () => {
        //   
        // });
    }
    Refresh() {
        this._c2d.canvas.width = this._root.clientWidth;
        this._c2d.canvas.height = this._root.clientHeight;
        if (this.RePaint != null)
            this.RePaint(this._c2d);
    }
    RePaint: (c2d: CanvasRenderingContext2D) => void;
    _c2d: CanvasRenderingContext2D;
    getC2D(): CanvasRenderingContext2D {
        return this._c2d;
    }

}