import { Color32, Palette as Pal } from "../image/color.js";
import { BaseElement } from "./dombase.js";

export class PalettePanel extends BaseElement {
    blocksize: number = 20;
    //blockcount: number = 80;
    colors: Color32[] = [];
    pickindex: number = 1;
    pickindexhide: number = 3;
    onPick: (index: number, indexhide: number) => void;
    constructor() {
        super();
        this._root = document.createElement("div");
        this._root.style.fontSize = "0";
        this.Style_Fill();
        this.InitDefPal();
        while (this.colors.length < 80) {
            this.colors.push(new Color32(0, 0, 0, 255));
        }
        this.Update();
    }

    InitDefPal(): void {
        let pal = Pal.getNesPal();



        for (var i = 0; i < pal.length; i++) {
            this.colors.push(pal[i].Clone());
        }
        // if (this.blockcount < this.colors.length)
        //     this.blockcount = this.colors.length;
        this.colors[0].A = 0;
        this.Update();
    }
    Update(): void {
        let blockcount = this.colors.length;
        if (this.pickindex >= blockcount)
            this.pickindex = 0;

        //数量准备

        while (this._root.childElementCount < blockcount) {
            let div = document.createElement("div");
            div.style.display = "inline-block";
            div.style.width = this.blocksize + "px";
            div.style.height = this.blocksize + "px";
            div.style.border = "2px solid #ccc";
            div.style.position = "relative";
            this._root.appendChild(div);
        }
        while (this._root.childElementCount > blockcount) {
            this._root.children[this._root.childElementCount - 1].remove();
        }

        for (var i = 0; i < blockcount; i++) {
            let div = this._root.children[i] as HTMLElement;
            div.title = i == 0 ? "透明色/擦除" : this.colors[i].toString();
            div.style.backgroundColor = this.colors[i].toString();


            if (this.pickindex == i) {
                div.style.border = "2px solid #fff";
            }
            else {
                div.style.border = "2px solid #000";
            }
            let index = i;
            div.onmousedown = (e) => {
                if (e.ctrlKey) {
                    this.pickindexhide = index;
                }
                else if (e.button == 0) {
                    this.pickindex = index;

                    this.Update();
                }

                if (this.onPick != null) {
                    this.onPick(this.pickindex, this.pickindexhide);
                }
            }

        }
    }
}