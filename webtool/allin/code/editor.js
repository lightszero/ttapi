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
import { Button, Color32, DomTool, Label, LabelButton, Panel, Splitter } from "../dom/domtool.js";
import { ttwin } from "./ttwin.js";
let g_filepanel;
let g_editarea;
let g_logarea;
function InitFilePanel(workingpath) {
    return __awaiter(this, void 0, void 0, function* () {
        g_filepanel.UseScrollV();
        g_filepanel.UseScrollH();
        let file = yield ttwin.Path_List(workingpath, true, "*.tt.json");
        let g_pickBtn = null;
        for (var i = 0; i < file.files.length; i++) {
            let _fullfile = file.files[i];
            let _file = _fullfile.substring(workingpath.length + 1);
            let btn = new LabelButton(_file);
            g_filepanel.AddChild(btn);
            btn.onClick = () => __awaiter(this, void 0, void 0, function* () {
                if (g_pickBtn != null) {
                    g_pickBtn.colorBack = (new Color32(0, 0, 0, 0));
                    g_pickBtn.UpdateColor();
                }
                g_pickBtn = btn;
                g_pickBtn.colorBack = new Color32(128, 128, 0, 128);
                g_pickBtn.UpdateColor();
                yield Edit(_fullfile);
                console.log("pick file:" + _fullfile);
            });
        }
    });
}
let g_menu;
function InitMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        let btn = new Button("save", () => {
        });
        g_menu.AddChild(btn);
    });
}
function Edit(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        g_editarea.RemoveAllChild();
        let div = g_editarea.getRoot();
        //let div =document.createElement("div");
        //document.body.appendChild(div);
        let file = yield ttwin.File_ReadText(filename);
        let e = new JSONEditor(div, { mode: "code", modes: ["code", "tree"] }, {});
        e.updateText(file.text);
    });
}
function Log(text) {
    return __awaiter(this, void 0, void 0, function* () {
        g_logarea.AddChild(new Label(text));
    });
}
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    let b = yield ttwin.Init(true);
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
    g_menu = new Panel();
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
    let root = yield ttwin.Path_GetRoots();
    InitFilePanel(root.special.WorkingPath);
    InitMenu();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9EQUFvRDs7Ozs7Ozs7OztBQUdwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBUSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEcsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUduQyxJQUFJLFdBQWtCLENBQUM7QUFDdkIsSUFBSSxVQUFpQixDQUFDO0FBQ3RCLElBQUksU0FBZ0IsQ0FBQztBQUNyQixTQUFlLGFBQWEsQ0FBQyxXQUFtQjs7UUFDNUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pCLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixJQUFJLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNqRSxJQUFJLFNBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFTLEVBQUU7Z0JBQ3JCLElBQUksU0FB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