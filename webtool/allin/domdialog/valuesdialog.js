var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { IO } from "../../common/io.js";
import { Dir2 } from "../dom/dir2.js";
import { Button, Label, Panel, TextBox, Toggle } from "../dom/dombase.js";
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
export class BaseDialog {
    constructor() {
        this._divBack = document.createElement("div");
        this._divBack.style.position = "absolute";
        this._divBack.style.left = "0px";
        this._divBack.style.right = "0px";
        this._divBack.style.top = "0px";
        this._divBack.style.bottom = "0px";
        this._divBack.style.backgroundColor = "rgba(0,0,0,0.75)";
        this._divBack.style.zIndex = "99999";
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
    Show() {
        return __awaiter(this, void 0, void 0, function* () {
            this._done = false;
            document.body.appendChild(this._divBack);
            while (this._done == false) {
                yield sleep(1);
            }
            this._divBack.remove();
            return this._value;
        });
    }
}
export class MessageDialog extends BaseDialog {
    constructor(title, msgs = null) {
        super();
        this.divCenter = new Panel();
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
    AddLabel(txt, align = "left") {
        let label = new Label(txt);
        label._root.style.textAlign = align;
        this.divCenter.AddChild(label);
    }
    AddBr() {
        this.divCenter._root.appendChild(document.createElement("br"));
    }
}
export var ValueType;
(function (ValueType) {
    ValueType[ValueType["BOOL"] = 0] = "BOOL";
    ValueType[ValueType["STRING"] = 1] = "STRING";
    ValueType[ValueType["NUMBER"] = 2] = "NUMBER";
    ValueType[ValueType["DIR2"] = 3] = "DIR2";
})(ValueType || (ValueType = {}));
export class ValueDesc {
    constructor() {
        this.name = "";
        this.type = ValueType.NUMBER;
        this.defvalue = 0;
    }
}
export class ValuesDialog extends BaseDialog {
    constructor(title, vs) {
        super();
        let l = new Label(title);
        this._panel.AddChild(l);
        let ts = [];
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
        let btn = new Button("OK", () => __awaiter(this, void 0, void 0, function* () {
            try {
                this._value = [];
                for (var i = 0; i < vs.length; i++) {
                    if (vs[i].type == ValueType.NUMBER) {
                        let v = parseInt(ts[i].getValue());
                        this._value.push(v);
                    }
                    else {
                        let b = ts[i].getValue();
                        this._value.push(b);
                    }
                }
                if (this.onCheck != null) {
                    if (!this.onCheck(this._value)) {
                        throw new Error("检查失败");
                    }
                }
            }
            catch (e) {
                let msg = new MessageDialog("Error:" + e);
                yield msg.Show();
                return;
            }
            this._done = true;
        }));
        btn.Style_Size(100, 24);
        this._panel.AddChild(btn);
        let btn2 = new Button("Cancel", () => {
            this._value = null;
            this._done = true;
        });
        this._panel.AddChild(btn2);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWVzZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsdWVzZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDBDQUEwQztBQUMxQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFlLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV2RixTQUFlLEtBQUssQ0FBQyxFQUFVOztRQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FBQTtBQUNELE1BQU0sT0FBZ0IsVUFBVTtJQUU1QjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGtCQUFrQixDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxPQUFPLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUss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RyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbkUsSUFBSSxFQUFFLEdBQUcsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLENBQUM7aUJBQ0ksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLENBQUM7aUJBQ0ksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLENBQUM7UUFFTCxDQUFDO1FBR0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQVMsRUFBRTtZQUNsQyxJQUFJLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ2pDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFZLENBQUMsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzt3QkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDM0IsQ0FBQztnQkFDTCxDQUFDO1lBRUwsQ0FBQztZQUNELE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDakIsT0FBTztZQUNYLENBQUM7WUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUEsQ0FBQyxDQUFBO1FBQ0YsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FFSiJ9