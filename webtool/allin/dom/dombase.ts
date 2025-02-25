//import { Color32 } from "../image/color.js";



export class Color32 {
    private values: Uint8ClampedArray = new Uint8ClampedArray(4);
    constructor(r: number, g: number, b: number, a: number = 255) {
        this.values[0] = r;
        this.values[1] = g;
        this.values[2] = b;
        this.values[3] = a;
    }
    get R(): number {
        return this.values[0];
    }
    get G(): number {
        return this.values[1];
    }
    get B(): number {
        return this.values[2];
    }
    get A(): number {
        return this.values[3];
    }
    set R(v: number) {
        this.values[0] = v;
    }
    set G(v: number) {
        this.values[1] = v;
    }
    set B(v: number) {
        this.values[2] = v;
    }
    set A(v: number) {
        this.values[3] = v;
    }
    static Equal(c: Color32, c2: Color32) {
        return (c.R == c2.R && c.G == c2.G && c.B == c2.B && c.A == c2.A)
    }
    toString(): string {
        return `rgba(${this.R},${this.G},${this.B},${this.A})`;
    }
    Clone(): Color32 {
        return new Color32(this.R, this.G, this.B, this.A);
    }
}
export interface IElement {
    getRoot(): HTMLElement;
    AddChild(elem: IElement): void
    RemoveChild(elem: IElement): void;
    RemoveChildAt(index: number): void
    GetChildCount(): number;
    GetChild(index: number): IElement
}
export abstract class BaseElement {
    _root: HTMLElement;
    Show(): void {
        this._root.style.visibility = "visible";
    }
    Hide(): void {
        this._root.style.visibility = "hidden";
    }
    getValue(): any {
        throw new Error("no value.");
    }
    getRoot(): HTMLElement {
        return this._root;
    }
    setBackColor(color: Color32): void {
        this._root.style.backgroundColor = color.toString();
    }
    elems: IElement[] = []
    AddChild(elem: IElement): void {
        this._root.appendChild(elem.getRoot());
        this.elems.push(elem);
    }
    RemoveAllChild(): void {
        for (var i = 0; i < this.elems.length; i++) {
            this.elems[i].getRoot().remove();
        }
        this.elems.splice(0);
    }
    RemoveChild(elem: IElement): void {
        let i = this.elems.indexOf(elem);
        if (i < 0)
            return;

        this.elems.splice(i, 1);

        elem.getRoot().remove();
    }
    RemoveChildAt(index: number): void {

        let elem = this.elems.splice(index, 1)[0];
        elem.getRoot().remove();
    }
    GetChildCount(): number {
        return this.elems.length;
    }
    GetChild(index: number): IElement {
        return this.elems[index];
    }

    Style_Fill(): void {
        this._root.style.position = "absolute";
        this._root.style.left = "0px";
        this._root.style.top = "0px";
        this._root.style.right = "0px";
        this._root.style.bottom = "0px";
        this._root.style.width = "100%";
        this._root.style.height = "100%";
    }
    Style_Size(width: number, height: number): void {
        this._root.style.width = width + "px";
        this._root.style.height = height + "px";
    }
    Style_Fix(x: number, y: number, width: number, height: number): void {
        this._root.style.position = "absolute";
        this._root.style.left = x + "px";
        this._root.style.top = y + "px";
        this._root.style.right = "auto";
        this._root.style.bottom = "auto";
        this._root.style.width = width + "px";
        this._root.style.height = height + "px";
    }
}
export class Screen extends BaseElement {
    constructor() {
        super();
        this._root = document.body;
    }

    getRoot(): HTMLElement {
        throw new Error("no root.");
    }
}
export class Label extends BaseElement {
    span: HTMLSpanElement;

    constructor(text: string = "") {
        super();
        let div = this._root = document.createElement("div");
        this.span = document.createElement("span");
        this.span.textContent = text;
        div.appendChild(this.span);
    }
    getValue() {
        return this.span.innerText
    }
    getText(): string {
        return this.span.innerText;
    }
    SetText(text: string): void {
        this.span.innerText = text;
    }


}
export class LabelButton extends BaseElement {
    span: HTMLSpanElement;

    constructor(text: string = "") {
        super();
        let div = this._root = document.createElement("div");
        this.span = document.createElement("span");
        this.span.textContent = text;
        div.appendChild(this.span);
        //this._root.style.position = "absolute";
        div.style.width = "100%";
        div.onmousedown = (e) => {
            div.style.backgroundColor = this.colorBackDown.toString();
            this.span.style.color = this.colorLabelDown.toString();
        }
        div.onmouseup = (e) => {
            div.style.backgroundColor = this.colorBack.toString();
            this.span.style.color = this.colorLabel.toString();
            if (this.onClick != null) {
                this.onClick();
            }
        }
        div.onmouseleave = (e) => {
            div.style.backgroundColor = this.colorBack.toString();
            this.span.style.color = this.colorLabel.toString();
        }
        this.UpdateColor();
    }
    UpdateColor() {
        let div = this._root as HTMLDivElement;
        div.style.backgroundColor = this.colorBack.toString();
        this.span.style.color = this.colorLabel.toString();
    }
    colorBack: Color32 = new Color32(0, 0, 0, 0);
    colorBackDown: Color32 = new Color32(255, 255, 0);
    colorLabel: Color32 = new Color32(0, 0, 0, 255);
    colorLabelDown: Color32 = new Color32(0, 0, 255, 255);
    onClick: () => void;
    getValue() {
        return this.span.innerText
    }
    getText(): string {
        return this.span.innerText;
    }
    SetText(text: string): void {
        this.span.innerText = text;
    }
}
export class Picture extends BaseElement {
    constructor(url: string = "") {
        super();
        let img = this._root = document.createElement("img");
        //img.style.position = "absolute";
        img.src = url;
    }
    setSrc(url: string): void {
        (this._root as HTMLImageElement).src = url;
    }
    Style_Fill(): void {
        super.Style_Fill();
        this._root.style.objectFit = "cover";
    }

}
export class TextBox extends BaseElement {
    span: HTMLSpanElement;

    input: HTMLInputElement;
    constructor(title: string, defvalue: string) {
        super();
        let div = this._root = document.createElement("div");
        this.span = document.createElement("span");
        this.span.textContent = title;
        div.appendChild(this.span);
        this.input = document.createElement("input");
        this.input.value = defvalue;
        this.input.type = "input";
        div.appendChild(this.input);
    }
    setTitle(title: string): void {
        this.span.textContent = title;
    }
    setValue(text: string): void {
        this.input.value = text;
    }
    getValue(): string {
        return this.input.value;
    }
}
export class Toggle extends BaseElement {
    span: HTMLSpanElement;

    input: HTMLInputElement;
    constructor(title: string, defvalue: boolean = false) {
        super();
        let div = this._root = document.createElement("div");
        this.span = document.createElement("span");
        this.span.textContent = title;
        div.appendChild(this.span);
        this.input = document.createElement("input");
        this.input.checked = defvalue;
        this.input.type = "checkbox";
        div.appendChild(this.input);
    }
    setTitle(title: string): void {
        this.span.textContent = title;
    }
    setValue(value: boolean): void {
        this.input.checked = value;
    }
    getValue(): boolean {
        return this.input.checked;
    }
}
export class Button extends BaseElement {
    constructor(title: string, click: (() => void)|null = null) {
        super()
        let btn = this._root = document.createElement("button");
        btn.innerText = title;
        btn.onclick = click
    }
    SetText(value: string) {
        this._root.textContent = value;
    }
    SetClickEvent(click:( () => void)|null) {
        (this._root as HTMLButtonElement).onclick = click;
    }
}
export class Space extends BaseElement {
    constructor(width = 32) {
        super()
        this._root = document.createElement("span");
        this._root.style.width = width + "px";
        this._root.style.display = "inline-flex";
    }
}
export class Panel extends BaseElement {
    constructor() {
        super();
        let div = this._root = document.createElement("div");
        //div.style.position = "absolute";
        div.style.border = "1px solid"
        div.style.borderColor = "#fff";
        div.style.color = "#fff";
        div.style.left = "0px";
        div.style.right = "0px";
        div.style.top = "0px";
        div.style.bottom = "0px";
    }
    SetBorder(width: number) {
        let div = this._root as HTMLDivElement;
        div.style.border = width + "px solid"
    }
    SetVCenter() {
        let div = this._root as HTMLDivElement;
        div.style.top = "50%";
        div.style.position = "relative";
        div.style.transform = "translateY(-50%)";
    }
    UseScrollV() {
        let div = this._root as HTMLDivElement;
        div.style.overflowY = "scroll";
    }
    UseScrollH() {
        let div = this._root as HTMLDivElement;
        div.style.overflowX = "scroll";
    }
}