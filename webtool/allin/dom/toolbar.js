//import { IO } from "../../common/io.js";
import { BaseElement, Picture } from "./dombase.js";
export class Toolbar extends BaseElement {
    constructor() {
        super();
        this.btnsize = 28;
        this.mapHtml = null;
        this._root = document.createElement("div");
        this._root.style.fontSize = "0";
        this.Style_Fill();
    }
    getPickTag() {
        return this._picktag;
    }
    getPickImg() {
        if (this.mapHtml == null || this.mapHtml[this._picktag] == null)
            return null;
        return this.mapHtml[this._picktag].children[0];
    }
    setPickTag(tag) {
        if (this.mapHtml[tag] != null) {
            this._picktag = tag;
            this.Update();
            return true;
        }
        return false;
    }
    clearButton() {
        this.mapHtml = {};
        while (this._root.children.length > 0) {
            this._root.children[this._root.children.length - 1].remove();
        }
    }
    addButton(iconurl, picktag, tips, color = null) {
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
        };
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
            this.onPick(this._picktag);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvb2xiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMENBQTBDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXBELE1BQU0sT0FBTyxPQUFRLFNBQVEsV0FBVztJQUNwQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBS1osWUFBTyxHQUFXLEVBQUUsQ0FBQztRQW1CckIsWUFBTyxHQUFxQyxJQUFJLENBQUM7UUF2QjdDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBR0QsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQ0QsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSTtZQUMzRCxPQUFPLElBQUksQ0FBQztRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQXFCLENBQUM7SUFDdkUsQ0FBQztJQUNELFVBQVUsQ0FBQyxHQUFXO1FBQ2xCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIs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