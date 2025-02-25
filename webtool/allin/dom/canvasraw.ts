import { BaseElement } from "./dombase.js";

export class CanvasRaw extends BaseElement {

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

     
    }

    getHtml(): HTMLCanvasElement {
        return this._root as HTMLCanvasElement
    }

}