var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ElectronFunc, FileFilter, OpenFileOption } from "./electronfunc.js";
console.log("testpage js ok.");
function AddButton(title, _evt) {
    let btn = document.createElement("button");
    document.body.appendChild(btn);
    btn.textContent = title;
    btn.onclick = _evt;
    let br = document.createElement("br");
    document.body.appendChild(br);
}
function AddLabel(title) {
    let btn = document.createElement("span");
    document.body.appendChild(btn);
    btn.textContent = title;
    let br = document.createElement("br");
    document.body.appendChild(br);
}
window.onload = () => {
    AddButton("openfile dialog single", () => __awaiter(void 0, void 0, void 0, function* () {
        let r = yield ElectronFunc.Instance.dialog_openfile(null);
        console.log(JSON.stringify(r));
    }));
    AddButton("openfile dialog multi .json", () => __awaiter(void 0, void 0, void 0, function* () {
        let f = new FileFilter();
        f.name = "json file";
        f.extensions = ["json"];
        let op = new OpenFileOption();
        op.filters = [f];
        op.multiSelect = true;
        let r = yield ElectronFunc.Instance.dialog_openfile(op);
        console.log(JSON.stringify(r));
    }));
    AddButton('prompt', () => {
        let v = prompt("ggod,", "123");
        console.log("input=" + v);
    });
};
