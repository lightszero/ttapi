var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ElectronFunc } from "./electronfunc.js";
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    let func = ElectronFunc.Instance;
    console.log('curpath=' + (yield func.path_getcurrent()));
    console.log("curenvtype=" + func.type + " tag=" + func.tag);
    console.log("");
    {
        let btn = document.createElement("button");
        btn.textContent = "send test.";
        document.body.appendChild(btn);
        btn.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
            var r = yield func.dialog_msgbox("aabca", "bddb", ["ok", "cancel", "随便"]);
            console.log("return " + r);
        });
    }
    {
        let btn = document.createElement("button");
        btn.textContent = "send test.";
        document.body.appendChild(btn);
        btn.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
            var r = yield ElectronFunc.Instance.dialog_openfile(null);
            console.log("return " + r[0] + " len=" + r.length);
        });
    }
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.backgroundColor = "#000";
    let app = new EditorMain(canvas);
    app.Start();
});
class EditorMain {
    constructor(canvas) {
    }
    Start() {
        console.log("good.");
    }
}
