///<refrence path ="../jsoneditor/jsoneditor.d.ts"/>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Button, CanvasRaw, DomTool, Group, Label, Panel, Splitter } from "../dom/domtool.js";
import { PackageDialog } from "./packagedialog.js";
import { ttwin } from "./ttwin.js";
import { TTPackageMgr } from "../ttlayer2/ttlayer2.js";
import { tt_impl } from "../ttimpl_web/ttimpl_web.js";
import { ttwinloader } from "./ttwinloader.js";
import { Editor_Main } from "./editor_main.js";
import { ListBox } from "../dom/listbox.js";
export class EditorMainUI {
    //准备菜单
    static InitMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            let root = yield ttwin.Path_GetRoots();
            let workingpath = root.special.WorkingPath;
            this.g_menu._root.style.display = "flex";
            let label = new Label("TT Pack 编辑器");
            label._root.style.width = "auto";
            this.g_menu.AddChild(label);
            let btn = new Button("Edit", () => __awaiter(this, void 0, void 0, function* () {
                let dialog = new PackageDialog(workingpath);
                yield dialog.Show();
                this.OnOpenEditFile(dialog._value);
            }));
            this.g_menu.AddChild(btn);
            let save = new Button("保存");
            this.g_menu.AddChild(save);
        });
    }
    //打开编辑目标
    static OnOpenEditFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var txt = yield ttwin.File_ReadText(filename);
                this.g_jsonedit.updateText(txt.text);
                this.g_editpackage = yield TTPackageMgr.Load(filename, new ttwinloader());
            }
            catch (err) {
                console.error("load package error.");
                this.g_editpackage = null;
            }
            Editor_Main.UpdatePackage();
            this.OnUpdateElement();
        });
    }
    static OnUpdateElement() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    static OnPickElem(text, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("onpick:" + tag);
            let type = tag.split(":")[0];
            let name = tag.split(":")[1];
            if (type == "pic")
                Editor_Main.PickPic(name);
            else if (type == "ani")
                Editor_Main.PickAni(name);
        });
    }
    //初始化Dom
    static InitDom() {
        return __awaiter(this, void 0, void 0, function* () {
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
            this.g_menu = new Panel();
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
            this.g_canvas = c._root;
            //副编辑区
            let panel_Attr = new Group();
            panel_Attr.SetTitle("属性");
            panel_Attr.Style_Fill();
            spSecondAttr._panel1.AddChild(panel_Attr);
            { //jsoneditor
                this.g_jsonedit = new JSONEditor(spSecondAttr._panel2._root, { mode: "code", modes: ["code", "tree"] }, {});
            }
        });
    }
    static InitCanvas() {
        return __awaiter(this, void 0, void 0, function* () {
            var ttimpl = new tt_impl.ttimpl_browser();
            ttimpl.Init(this.g_canvas);
            yield Editor_Main.Init();
        });
    }
    static Init() {
        return __awaiter(this, void 0, void 0, function* () {
            let b = yield ttwin.Init(true);
            console.log("ttwin has init.");
            yield this.InitDom();
            yield this.InitMenu();
            yield this.InitCanvas();
        });
    }
}
EditorMainUI.g_editpackage = null;
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    yield EditorMainUI.Init();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9EQUFvRDs7Ozs7Ozs7OztBQUdwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBVyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBcUIsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRW5DLE9BQU8sRUFBYSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUE7QUFFckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsTUFBTSxPQUFPLFlBQVk7SUFNckIsTUFBTTtJQUNOLE1BQU0sQ0FBTyxRQUFROztZQUNqQixJQUFJLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN2QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN6QyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lB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