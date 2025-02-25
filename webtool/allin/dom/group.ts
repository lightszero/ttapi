import { IElement, Label, Panel } from "./dombase.js";

export class Group extends Panel {
    _panel: Panel;
    _label: Label;
    constructor() {
        super();
        this._root.style.position = "absolute"

        this._label = new Label("group");
        this._root.appendChild(this._label.getRoot());


        this._label.getRoot().style.position = "absolute"
        this._label.getRoot().style.left = "0px";
        this._label.getRoot().style.right = "0px";
        this._label.getRoot().style.top = "0px";
        this._label.getRoot().style.height = "20px";

        this._panel = new Panel();
        this._root.appendChild(this._panel.getRoot());


        this._panel.getRoot().style.position = "absolute"
        this._panel.getRoot().style.left = "0px";
        this._panel.getRoot().style.right = "0px";
        this._panel.getRoot().style.top = "20px";
        this._panel.getRoot().style.bottom = "0px";
    }
    SetTitle(title: string) {
        this._label.SetText(title);
    }
    AddChild(elem: IElement): void {
        throw new Error("use panel");
    }
}