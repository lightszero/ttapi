import { ElectronFunc } from "./electronfunc.js";

window.onload = async () => {
    let func = ElectronFunc.Instance;
    console.log('curpath=' + await func.path_getcurrent())
    console.log("curenvtype=" + func.type + " tag=" + func.tag)
    console.log("")
    {
        let btn = document.createElement("button");
        btn.textContent = "send test.";
        document.body.appendChild(btn);
        btn.onclick = async () => {
            var r = await func.dialog_msgbox("aabca", "bddb", ["ok", "cancel", "随便"]);
            console.log("return " + r);
        }
    }
    {
        let btn = document.createElement("button");
        btn.textContent = "send test.";
        document.body.appendChild(btn);
        btn.onclick = async () => {
            var r = await ElectronFunc.Instance.dialog_openfile(null);
            console.log("return " + r[0] + " len=" + r.length);
        }
    }
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.backgroundColor = "#000";
    let app = new EditorMain(canvas);
    app.Start();
}

class EditorMain {
    constructor(canvas: HTMLCanvasElement) {

    }
    Start() {
        console.log("good.");
    }
}