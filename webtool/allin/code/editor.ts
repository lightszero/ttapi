///<refrence path ="../jsoneditor/jsoneditor.d.ts"/>


import { Button, CanvasRaw, Color32, DomTool, Group, Label, LabelButton, Menu, Panel, Splitter } from "../dom/domtool.js";
import { PackageDialog } from "./packagedialog.js";
import { ttwin } from "./ttwin.js";



let g_menu: Panel;
async function InitMenu(workingpath: string) {
    g_menu._root.style.display = "flex";
    let label = new Label("TT Pack 编辑器");
    label._root.style.width = "auto";
    g_menu.AddChild(label);
    let btn = new Button("Edit", async () => {
        let dialog = new PackageDialog(workingpath);
        await dialog.Show();
    });
    g_menu.AddChild(btn);
    let save = new Button("保存");
    g_menu.AddChild(save);
}

window.onload = async () => {
    let b = await ttwin.Init(true);
    console.log("ttwin has init.");

    //初始化初步布局
    DomTool.InitFullScreen();

    //总布局 Menu MainEditor SecEditor
    var spMain = new Splitter();
    DomTool.Screen.AddChild(spMain);
    spMain.SetSplitV(50);
    let spMenu_MainEdit = new Splitter();
    spMenu_MainEdit.Style_Fill();
    spMenu_MainEdit.SetSplitPosTop(30);
    spMain._panel1.AddChild(spMenu_MainEdit);


    let spMainEdit = new Splitter();
    spMainEdit.Style_Fill();
    spMainEdit.SetSplitH(25);
    spMenu_MainEdit._panel2.AddChild(spMainEdit);

    let spSecondAttr = new Splitter();
    spSecondAttr.SetSplitH(25);
    spSecondAttr.Style_Fill();
    spMain._panel2.AddChild(spSecondAttr);


    //menu
    g_menu = new Panel()
    spMenu_MainEdit._panel1.AddChild(g_menu);


    //主编辑区
    let panel_MainEditTree = new Group();
    panel_MainEditTree.SetTitle("元素");
    panel_MainEditTree.Style_Fill();
    spMainEdit._panel1.AddChild(panel_MainEditTree);
    let panel_MainEdit = new Group();
    panel_MainEdit.SetTitle("Editor");
    spMainEdit._panel2.AddChild(panel_MainEdit);

    //副编辑区
    let panel_Attr = new Group();
    panel_Attr.SetTitle("属性");
    panel_Attr.Style_Fill();
    spSecondAttr._panel1.AddChild(panel_Attr);
    {//jsoneditor
        let e = new JSONEditor(spSecondAttr._panel2._root as HTMLDivElement, { mode: "code", modes: ["code", "tree"] }, {});
    }




    let root = await ttwin.Path_GetRoots();

    InitMenu(root.special.WorkingPath);
}