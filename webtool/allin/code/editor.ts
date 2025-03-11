///<refrence path ="../jsoneditor/jsoneditor.d.ts"/>


import { Button, CanvasRaw, Color32, DomTool, Group, Label, LabelButton, Menu, Panel, Splitter } from "../dom/domtool.js";
import { PackageDialog } from "./packagedialog.js";
import { ttwin } from "./ttwin.js";

import { TTPackage, TTPackageMgr } from "../ttlayer2/ttlayer2.js"
import { tt_impl } from "../ttimpl_web/ttimpl_web.js"

import { ttwinloader } from "./ttwinloader.js";
import { Editor_Main } from "./editor_main.js";
import { ListBox } from "../dom/listbox.js";

export class EditorMainUI {
    static g_menu: Panel;
    static g_jsonedit: JSONEditor;
    static g_canvas: HTMLCanvasElement;
    static g_element: ListBox;//Element;
    static g_editpackage: TTPackage = null;
    //准备菜单
    static async InitMenu() {
        let root = await ttwin.Path_GetRoots();
        let workingpath = root.special.WorkingPath;
        this.g_menu._root.style.display = "flex";
        let label = new Label("TT Pack 编辑器");
        label._root.style.width = "auto";
        this.g_menu.AddChild(label);

        let btn = new Button("Edit", async () => {
            let dialog = new PackageDialog(workingpath);
            await dialog.Show();

            this.OnOpenEditFile(dialog._value);

        });
        this.g_menu.AddChild(btn);

        let save = new Button("保存");
        this.g_menu.AddChild(save);
    }
    //打开编辑目标
    static async OnOpenEditFile(filename: string) {
        try {
            var txt = await ttwin.File_ReadText(filename);
            this.g_jsonedit.updateText(txt.text);

            this.g_editpackage = await TTPackageMgr.Load(filename, new ttwinloader());

        }
        catch (err) {
            console.error("load package error.");
            this.g_editpackage = null;
        }
        Editor_Main.UpdatePackage();
        this.OnUpdateElement();

    }
    static async OnUpdateElement() {
        this.g_element.RemoveAllChild();
        if (this.g_editpackage == null)
            return;
        let keys = this.g_editpackage.GetPicKey();
        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];

            this.g_element.AddItem("图片:" + key, "pic:" + key);
        }
        let anis = this.g_editpackage.GetAniKey();
        for (var i = 0; i < anis.length; i++) {
            let key = anis[i];
            this.g_element.AddItem("动画:" + key, "ani:" + key);
        }
    }
    static async OnPickElem(text: string, tag: string) {
        console.log("onpick:" + tag);
        let type = tag.split(":")[0];
        let name = tag.split(":")[1];
        if (type == "pic")
            Editor_Main.PickPic(name);
        else if (type == "ani")
            Editor_Main.PickAni(name);
    }
    //初始化Dom
    static async InitDom() {

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
        this.g_menu = new Panel()
        spMenu_MainEdit._panel1.AddChild(this.g_menu);


        //主编辑区
        let g_elementGroup = new Group();
        g_elementGroup.SetTitle("元素");
        g_elementGroup.Style_Fill();
        spMainEdit._panel1.AddChild(g_elementGroup);

        this.g_element = new ListBox();
        this.g_element.Style_Fill();
        g_elementGroup.AddChild(this.g_element);
        this.g_element.OnPick = this.OnPickElem.bind(this);

        let panel_MainEdit = new Group();
        panel_MainEdit.SetTitle("Editor");
        spMainEdit._panel2.AddChild(panel_MainEdit);
        let c = new CanvasRaw();
        panel_MainEdit.AddChild(c);
        c.Style_Fill();
        this.g_canvas = c._root as HTMLCanvasElement;

        //副编辑区
        let panel_Attr = new Group();
        panel_Attr.SetTitle("属性");
        panel_Attr.Style_Fill();
        spSecondAttr._panel1.AddChild(panel_Attr);
        {//jsoneditor
            this.g_jsonedit = new JSONEditor(spSecondAttr._panel2._root as HTMLDivElement, { mode: "code", modes: ["code", "tree"] }, {});
        }





    }



    static async InitCanvas() {

        var ttimpl = new tt_impl.ttimpl_browser();
        ttimpl.Init(this.g_canvas);
        await Editor_Main.Init();

    }
    static async Init() {
        let b = await ttwin.Init(true);
        console.log("ttwin has init.");
        await this.InitDom();


        await this.InitMenu();

        await this.InitCanvas();
    }
}

window.onload = async () => {

    await EditorMainUI.Init();

}