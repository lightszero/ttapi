import { IElement, Panel } from "./dombase.js";

export class Splitter extends Panel {
    _panel1: Panel;
    _panel2: Panel;

    constructor() {
        super();
        this.SetBorder(0);
        this._root.style.position = "absolute"


        this._panel1 = new Panel();
        this._panel1.SetBorder(0);
        this._root.appendChild(this._panel1.getRoot());



        this._panel1.getRoot().style.backgroundColor = "#c33";
        this._panel1.getRoot().style.position = "absolute"
        this._panel1.getRoot().style.left = "0px";
        this._panel1.getRoot().style.top = "0px";
        this._panel1.getRoot().style.bottom = "0px";
        this._panel1.getRoot().style.width = "100px";

        this._panel2 = new Panel();
        this._panel2.SetBorder(0);
        this._root.appendChild(this._panel2.getRoot());

        this._panel2.getRoot().style.backgroundColor = "#33c";
        this._panel2.getRoot().style.position = "absolute"
        this._panel2.getRoot().style.left = "100px";
        this._panel2.getRoot().style.top = "0px";
        this._panel2.getRoot().style.bottom = "0px";
        this._panel2.getRoot().style.right = "0px";



    }
    SetSplitPosLeft(pos: number) {
        this._panel1.getRoot().style.left = "0px";
        this._panel1.getRoot().style.right = "auto";
        this._panel1.getRoot().style.top = "0px";
        this._panel1.getRoot().style.bottom = "0px";
        this._panel1.getRoot().style.width = pos + "px";
        this._panel1.getRoot().style.height = "auto"

        this._panel2.getRoot().style.left = pos + "px";
        this._panel2.getRoot().style.top = "0px";
        this._panel2.getRoot().style.bottom = "0px";
        this._panel2.getRoot().style.right = "0px";
        this._panel2.getRoot().style.width = "auto";
        this._panel2.getRoot().style.height = "auto"
    }
    SetSplitPosRight(pos: number) {
        this._panel1.getRoot().style.left = "0px";
        this._panel1.getRoot().style.top = "0px";
        this._panel1.getRoot().style.bottom = "0px";
        this._panel1.getRoot().style.right = pos + "px";
        this._panel1.getRoot().style.width = "auto";
        this._panel1.getRoot().style.height = "auto"


        this._panel2.getRoot().style.top = "0px";
        this._panel2.getRoot().style.bottom = "0px";
        this._panel2.getRoot().style.left = "auto";
        this._panel2.getRoot().style.right = "0px";
        this._panel2.getRoot().style.width = pos + "px";
        this._panel1.getRoot().style.height = "auto"
    }
    SetSplitPosTop(pos: number) {
        this._panel1.getRoot().style.left = "0px";
        this._panel1.getRoot().style.bottom = "auto";
        this._panel1.getRoot().style.top = "0px";
        this._panel1.getRoot().style.right = "0px";
        this._panel1.getRoot().style.height = pos + "px";
        this._panel1.getRoot().style.width = "auto"

        this._panel2.getRoot().style.top = pos + "px";
        this._panel2.getRoot().style.left = "0px";
        this._panel2.getRoot().style.bottom = "0px";
        this._panel2.getRoot().style.right = "0px";
        this._panel2.getRoot().style.width = "auto";
        this._panel2.getRoot().style.height = "auto"
    }
    SetSplitPosBottom(pos: number) {
        this._panel1.getRoot().style.left = "0px";
        this._panel1.getRoot().style.bottom = pos + "px";
        this._panel1.getRoot().style.top = "0px";
        this._panel1.getRoot().style.right = "0px";
        this._panel1.getRoot().style.height = "auto"
        this._panel1.getRoot().style.width = "auto"

        this._panel2.getRoot().style.top = "auto";
        this._panel2.getRoot().style.left = "0px";
        this._panel2.getRoot().style.bottom = "0px";
        this._panel2.getRoot().style.right = "0px";
        this._panel2.getRoot().style.width = "auto";
        this._panel2.getRoot().style.height = pos + "px";
    }
    AddChild(elem: IElement): void {
        throw new Error("use left or right");
    }
}