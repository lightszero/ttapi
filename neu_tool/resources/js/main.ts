

window.onload = () => {

    console.log("hello");
    Neutralino.init();
    AddLabel("退出只在window 模式有效");
    Neutralino.events.on("windowClose", () => {
        Neutralino.app.exit();
    })

    AddLabel("Neu init.");

    AddLabel("Neu 的 Messagebox 有问题，不是模式对话框")
    AddBtn("messagebox", async () => {
        let r = await Neutralino.os.showMessageBox("选文件", "hihihi");
        console.log("showMessageBox=" + JSON.stringify(r));
    })
    AddBtn("open file", async () => {
        let r = await Neutralino.os.showOpenDialog("选文件");
        console.log("showOpenDialog=" + JSON.stringify(r));
    })
    AddBtn("save file", async () => {
        let r = await Neutralino.os.showSaveDialog("选文件");
        console.log("showSaveDialog=" + JSON.stringify(r));
    })
    AddBtn("show dir", async () => {
        let r = await Neutralino.os.showFolderDialog("选文件");
        console.log("showFolderDialog=" + JSON.stringify(r));
        let infos = await Neutralino.filesystem.readDirectory(r);
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