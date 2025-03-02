//import { IO } from "../../common/io.js";
import { Dir2 } from "../dom/dir2.js";
import { BaseElement, Button, Label, Panel, TextBox, Toggle } from "../dom/dombase.js";

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export abstract class BaseDialog<T> {

    constructor() {
        this._divBack = document.createElement("div");
        this._divBack.style.position = "absolute";
        this._divBack.style.left = "0px";
        this._divBack.style.right = "0px";
        this._divBack.style.top = "0px";
        this._divBack.style.bottom = "0px";
        this._divBack.style.backgroundColor = "rgba(0,0,0,0.75)";
        this._divBack.style.zIndex="99999";
        this._panel = new Panel();
        this._divBack.appendChild(this._panel._root);

        this._panel._root.style.position = "absolute";
        this._panel._root.style.left = "25%";
        this._panel._root.style.right = "25%";
        this._panel._root.style.top = "25%";
        this._panel._root.style.bottom = "25%";
        this._panel._root.style.border = "2px solid #fff";
        //this._panel._root.style.textAlign = "center";
        
    }
    private _divBack: HTMLDivElement;
    protected _panel: Panel;
    protected _done: boolean; //给他赋值就行
    _value: T;



    async Show(): Promise<T> {
        this._done = false;
        document.body.appendChild(this._divBack);

        while (this._done == false) {
            await sleep(1);
        }

        this._divBack.remove();

        return this._value;
    }
    onCheck: (value: T) => Boolean;

}


export class MessageDialog extends BaseDialog<void>
{
    divCenter = new Panel();
    constructor(title: string, msgs: { txt: string, align: string }[] = null) {
        super();
        let divCenter = this.divCenter = new Panel();

        divCenter.SetBorder(0);
        divCenter.SetVCenter();
        divCenter._root.style.top = "50%";
        divCenter._root.style.position = "relative";
        divCenter._root.style.transform = "translateY(-50%)";
        this._panel.AddChild(divCenter);

        this.AddLabel(title, "middle");

        if (msgs != null) {
            for (var i = 0; i < msgs.length; i++) {
                let msg = msgs[i].txt;

                if (msg == "") {
                    this.AddBr();
                }
                else
                    this.AddLabel(msg, msgs[i].align);


            }
        }
        this.AddBr();
        let btn = new Button("Close", () => {
            this._done = true;
        });

        this.divCenter.AddChild(btn);
    }
    private AddLabel(txt: string, align: string = "left"): void {

        let label = new Label(txt);
        label._root.style.textAlign = align
        this.divCenter.AddChild(label);
    }
    private AddBr() {
        this.divCenter._root.appendChild(document.createElement("br"));
    }

}


export enum ValueType {
    BOOL,
    STRING,
    NUMBER,
    DIR2,
}
export class ValueDesc {
    name: string = "";
    type: ValueType = ValueType.NUMBER;
    defvalue: any = 0;
}


export class ValuesDialog extends BaseDialog<any[]> {
    constructor(title: string, vs: ValueDesc[]) {
        super();
        let l = new Label(title);
        this._panel.AddChild(l);

        let ts: BaseElement[] = []
        for (var i = 0; i < vs.length; i++) {
            if (vs[i].type == ValueType.NUMBER || vs[i].type == ValueType.STRING) {
                let t1 = new TextBox(vs[i].name, vs[i].defvalue.toString());
                this._panel.AddChild(t1);
                ts.push(t1);
            }
            else if (vs[i].type == ValueType.BOOL) {
                let t1 = new Toggle(vs[i].name, vs[i].defvalue);
                this._panel.AddChild(t1);
                ts.push(t1);
            }
            else if (vs[i].type == ValueType.DIR2) {
                let t1 = new Dir2(vs[i].name, vs[i].defvalue);
                this._panel.AddChild(t1);
                ts.push(t1);
            }

        }


        let btn = new Button("OK", async () => {
            try {
                this._value = [];
                for (var i = 0; i < vs.length; i++) {
                    if (vs[i].type == ValueType.NUMBER) {
                        let v = parseInt(ts[i].getValue() as string);
                        this._value.push(v);
                    }
                    else {
                        let b = ts[i].getValue();
                        this._value.push(b);
                    }
                }

                if (this.onCheck != null) {
                    if (!this.onCheck(this._value)) {
                        throw new Error("检查失败")
                    }
                }

            }
            catch (e) {
                let msg = new MessageDialog("Error:" + e);
                await msg.Show();
                return;
            }

            this._done = true;
        })
        btn.Style_Size(100, 24);
        this._panel.AddChild(btn);

        let btn2 = new Button("Cancel", () => {
            this._value = null;
            this._done = true;
        })
        this._panel.AddChild(btn2);
    }

}
