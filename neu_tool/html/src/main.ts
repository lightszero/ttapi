import { IOExt } from "./twoenv.js";


window.onload = () => {

    console.log("hello");
    let n = (window as any).Neutralino;
    console.log("Is Neutralino env:" + typeof n);
    IOExt.Init();
    AddLabel("退出只在window 模式有效");

    AddLabel("Neu init.IsWebEnv=" + IOExt.IsWebEnv());

    AddLabel("Neu 的 Messagebox 有问题，不是模式对话框")
    AddBtn("messagebox", async () => {
        let r = await Neutralino.os.showMessageBox("选文件", "hihihi");
        IOExt.Log("showMessageBox=" + JSON.stringify(r));
    })
    AddBtn("open file", async () => {
        let r = await IOExt.Picker_OpenFile();
        IOExt.Log("showOpenDialog=" + JSON.stringify(r));
    })
    AddBtn("save file", async () => {
        let r = await IOExt.Picker_SaveFile();
        IOExt.Log("showSaveDialog=" + JSON.stringify(r));
    })
    AddBtn("show dir", async () => {
        let folder = await IOExt.Picker_Folder();
        IOExt.Log("showFolderDialog=" + JSON.stringify(folder));
        let infos = await IOExt.Directory_List(folder);
        for (var i = 0; i < infos.length; i++) {
            console.log(JSON.stringify(infos[i]));
        }
    })
}
function AddBtn(text: string, action: () => void) {
    let btn = document.createElement('button');
    btn.textContent = text;
    btn.onclick = () => {
        action();
    }
    document.body.appendChild(btn);

    document.body.appendChild(document.createElement("br"));
}
function AddLabel(text: string) {
    let label = document.createElement("span");
    label.textContent = text;
    document.body.appendChild(label);
    document.body.appendChild(document.createElement("br"));
}