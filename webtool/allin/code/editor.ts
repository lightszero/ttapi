///<refrence path ="../jsoneditor/jsoneditor.d.ts"/>


import { Button, Color32, DomTool, Label, LabelButton, Menu, Panel, Splitter } from "../dom/domtool.js";
import { ttwin } from "./ttwin.js";


let g_filepanel: Panel;
let g_editarea: Panel;
let g_logarea: Panel;
async function InitFilePanel(workingpath: string) {
    g_filepanel.UseScrollV();
    g_filepanel.UseScrollH();
    let file = await ttwin.Path_List(workingpath, true, "*.tt.json");
    let g_pickBtn: LabelButton = null;
    for (var i = 0; i < file.files.length; i++) {
        let _fullfile = file.files[i];
        let _file = _fullfile.substring(workingpath.length + 1);
        let btn = new LabelButton(_file);
        g_filepanel.AddChild(btn);
        btn.onClick = async () => {
            if (g_pickBtn != null) {

                g_pickBtn.colorBack = (new Color32(0, 0, 0, 0));
                g_pickBtn.UpdateColor();
            }
            g_pickBtn = btn;
            g_pickBtn.colorBack = new Color32(128, 128, 0, 128);
            g_pickBtn.UpdateColor();
            await Edit(_fullfile);
            console.log("pick file:" + _fullfile);
        };
    }

}
let g_menu: Panel;
async function InitMenu() {
    let btn = new Button("save", () => {

    });
    g_menu.AddChild(btn);
}
async function Edit(filename: string) {
    g_editarea.RemoveAllChild();
    let div = g_editarea.getRoot() as HTMLDivElement;
    //let div =document.createElement("div");
    //document.body.appendChild(div);
    let file = await ttwin.File_ReadText(filename);
    let e = new JSONEditor(div, { mode: "code", modes: ["code", "tree"] }, {});
    e.updateText(file.text);
}
async function Log(text: string) {
    g_logarea.AddChild(new Label(text));
}
window.onload = async () => {
    let b = await ttwin.Init(true);
    console.log("ttwin has init.");

    //初始化初步布局
    DomTool.InitFullScreen();
    let sp = DomTool.AddSpliter();
    sp.SetSplitPosLeft(300);

    sp._panel1.AddChild(new Label("Files"));
    g_filepanel = new Panel();
    sp._panel1.AddChild(g_filepanel);
    g_filepanel.Style_Fill();
    g_filepanel._root.style.top = "32px";


    let sp2 = new Splitter();
    sp2.Style_Fill();
    sp2.SetSplitPosBottom(300);

    sp._panel2.AddChild(sp2);
    g_menu = new Panel()

    sp2._panel1.AddChild(g_menu);

    g_editarea = new Panel();
    g_editarea.Style_Fill();
    g_editarea._root.style.top = "32px";
    sp2._panel1.AddChild(g_editarea);

    sp2._panel2.AddChild(new Label("Logs"));
    g_logarea = new Panel();
    sp2._panel2.AddChild(g_logarea);
    g_logarea.Style_Fill();
    g_logarea.SetBorder(3);
    g_logarea.UseScrollH();
    g_logarea.UseScrollV();
    g_logarea._root.style.top = "32px";



    let root = await ttwin.Path_GetRoots();
    InitFilePanel(root.special.WorkingPath);
    InitMenu();
}