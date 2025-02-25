//import { IO } from "../../common/io.js";
import { BaseElement, Picture } from "./dombase.js";

export class Toolbar extends BaseElement {
    constructor() {
        super();
        this._root = document.createElement("div");
        this._root.style.fontSize = "0";
        this.Style_Fill();
    }
    btnsize: number = 28;
    private _picktag: string;
    getPickTag(): string {
        return this._picktag;
    }
    getPickImg(): HTMLImageElement {
        if (this.mapHtml == null || this.mapHtml[this._picktag] == null)
            return null;
        return this.mapHtml[this._picktag].children[0] as HTMLImageElement;
    }
    setPickTag(tag: string): boolean {
        if (this.mapHtml[tag] != null) {
            this._picktag = tag;
            this.Update();
            return true;
        }
        return false;
    }
    onPick: (tag: string) => void;
    mapHtml: { [id: string]: HTMLDivElement } = null;
    clearButton(): void {
        this.mapHtml = {};
        while (this._root.children.length > 0) {
            this._root.children[this._root.children.length - 1].remove();
        }
    }
    addButton(iconurl: string, picktag: string, tips: string, color: string = null) {

        let div = document.createElement("div");
        div.style.display = "inline-block";
        div.style.width = this.btnsize + "px";
        div.style.height = this.btnsize + "px";
        div.style.border = "2px solid #ccc";
        div.style.position = "relative";
        div.style.border = "2px solid #000";
        if (color != null) {
            div.style.backgroundColor = color;
        }
        if (this.mapHtml == null) {
            this.mapHtml = {};
            this._picktag = picktag;
            div.style.border = "2px solid #fff";
        }
        this.mapHtml[picktag] = div;

        let img = new Picture();
        img.Style_Fill();
        img._root.style.objectFit = "contain";
        div.appendChild(img._root);

        let url = iconurl;
        // if (url.includes("://") == false) {
        //     url = IO.GetPluginUrl(iconurl);
        // }
        img.setSrc(url);
        img._root.title = tips;
        img._root.onmousedown = () => {
            this._picktag = picktag;

            this.Update();

        }


        this._root.appendChild(div);

    }
    Update() {
        for (var key in this.mapHtml) {
            if (key == this._picktag) {
                this.mapHtml[key].style.border = "2px solid #fff";
            }
            else {
                this.mapHtml[key].style.border = "2px solid #000";
            }
        }

        if (this.onPick != null) {
            this.onPick(this._picktag)
        }
    }
}