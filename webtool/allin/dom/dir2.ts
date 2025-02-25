import { BaseElement } from "./dombase.js";

export class Dir2 extends BaseElement {


    constructor(title: string = "", value: { x: number, y: number } = null) {
        super();
        this._root = document.createElement("div");
        this._root.style.fontSize = "0";
        //this.Style_Fill();
        let span = document.createElement("span");
        span.textContent = title;
        span.style.fontSize = "16px";
        this._root.appendChild(span);
        let br = document.createElement("br");
        this._root.appendChild(br);
        for (var y = -1; y <= 1; y++) {
            for (var x = -1; x <= 1; x++) {
                let div = document.createElement("div");
                div.style.display = "inline-block";
                div.style.width = "32px";
                div.style.height = "32px";
                div.style.border = "2px solid #ccc";
                div.style.position = "relative";
                this._root.appendChild(div);
                div.title = x + "," + y;
                this._divs.push(div);
                let sx = x;
                let sy = y;
                div.onmousedown = () => {
                    this._value.x = sx;
                    this._value.y = sy;
                    this.updatePick();
                }
            }
            let br = document.createElement("br");
            this._root.appendChild(br);
        }
        this.updatePick();
    }
    _divs: HTMLDivElement[] = [];
    _value = { x: 0, y: 0 };
    getValue(): any {
        return this._value;
    }
    private updatePick(): void {
        for (var i = 0; i < 9; i++) {
            let y = ((i / 3) | 0) - 1;
            let x = ((i % 3) | 0) - 1;
            if (x == this._value.x && y == this._value.y) {
                this._divs[i].style.backgroundColor = "#3c3";
            }
            else {
                this._divs[i].style.backgroundColor = "#333";
            }
        }
    }
}