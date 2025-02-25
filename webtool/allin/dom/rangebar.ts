import { BaseElement, Button, Label } from "./dombase.js";

export class RangeBar extends BaseElement {
    private _label: HTMLSpanElement;
    private _input: HTMLInputElement;
    private _min: number = 1;
    private _max: number = 64;
    usestepmode: boolean = true;//阶乘式变化数值
    get min(): number {
        return this._min;
    }
    set min(v: number) {
        this._min = v;
        this._input.min = this._min.toString();
        this._input.max = this._max.toString();
    }
    get max(): number {
        return this._max;
    }
    set max(v: number) {
        this._max = v;
        this._input.min = this._min.toString();
        this._input.max = this._max.toString();
    }
    getValue(): number {
        return this._input.valueAsNumber | 0;
    }
    valueAdd():void
    {
        let value = parseFloat(this._input.value) | 0
        if (this.usestepmode) {
            for (var i = 1; i <= 8; i++) {
                let v = Math.pow(2, i - 1);
                let vbig = Math.pow(2, i);
                if (v <= value && value < vbig) {
                    value = vbig;
                    break;
                }
            }
        }
        else {
            value++;
        }
        if (value > this.max)
            value = this.max;

        this.changeValue(value);
    }
    valueDec():void
    {
        let value = parseFloat(this._input.value) | 0
        if (this.usestepmode) {
            for (var i = 8; i > 0; i--) {
                let v = Math.pow(2, i);
                let vsmall = Math.pow(2, i - 1);
                if (vsmall < value && value <= v) {
                    value = vsmall;
                    break;
                }
            }
        }
        else {
            value--;
        }
        if (value < this.min)
            value = this.min;

        this.changeValue(value);
    }
    constructor() {
        super();
        let div = this._root = document.createElement("div");
        this.Style_Fill();
        let btnleft = new Button("◀");
        btnleft._root.style.position = "absolute";
        btnleft._root.style.width = "24px";
        btnleft._root.style.height = "24px";

        let btnright = new Button("▶");
        btnright._root.style.position = "absolute";
        btnright._root.style.width = "24px";
        btnright._root.style.height = "24px";
        btnright._root.style.right = "0px";


        let input = this._input = document.createElement("input");

        input.style.position = "absolute";
        input.style.left = "24px";
        input.style.height = "24px";
        input.style.right = "60px";

        input.type = "range";
        input.min = this._min.toString();
        input.max = this._max.toString();
        input.onchange = () => {
            let value = parseFloat(this._input.value) | 0

            this.changeValue(value);

        }

        this._label = document.createElement("span");
        this._label.style.position = "absolute";
        this._label.style.width = "36px";
        this._label.style.height = "24px";
        this._label.style.right = "24px";

        this.getRoot().appendChild(btnleft.getRoot());
        this.getRoot().appendChild(input);
        this.getRoot().appendChild(this._label);
        this.getRoot().appendChild(btnright.getRoot());

        btnleft._root.onclick = () => {
           this.valueDec();
        }
        btnright._root.onclick = () => {
            this.valueAdd();
        }
        this.changeValue(1);
    }
    changeValue(v: number) {
        if (v > this.max)
            v = this.max;
        if (v < this.min)
            v = this.min;
        this._input.value = v.toString();
        this._label.textContent = "X" + v.toString();
        if (this.onchange != null)
            this.onchange(v);
    }

    onchange: (v: number) => void
}