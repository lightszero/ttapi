import { ElectronFunc, FileFilter, OpenFileOption } from "./electronfunc.js";

console.log("testpage js ok.");
function AddButton(title: string, _evt: () => void) {
    let btn = document.createElement("button");
    document.body.appendChild(btn);
    btn.textContent = title;
    btn.onclick = _evt;
    let br = document.createElement("br");
    document.body.appendChild(br);

}

function AddLabel(title: string) {
    let btn = document.createElement("span");
    document.body.appendChild(btn);
    btn.textContent = title;

    let br = document.createElement("br");
    document.body.appendChild(br);

}
window.onload = () => {
    AddButton("openfile dialog single", async () => {
        let r = await ElectronFunc.Instance.dialog_openfile(null);
        console.log(JSON.stringify(r));
    });
    AddButton("openfile dialog multi .json", async () => {
        let f = new FileFilter()
        f.name = "json file";
        f.extensions = ["json"];
        let op = new OpenFileOption();
        op.filters = [f];
        op.multiSelect = true;
        let r = await ElectronFunc.Instance.dialog_openfile(op);
        console.log(JSON.stringify(r));
    });
    AddButton('prompt', () => {
        let v = prompt("ggod,", "123");
        console.log("input=" + v);
    })
}