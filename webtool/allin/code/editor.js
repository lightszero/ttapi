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
import { Button, DomTool, Group, Label, Panel, Splitter } from "../dom/domtool.js";
import { PackageDialog } from "./packagedialog.js";
import { ttwin } from "./ttwin.js";
let g_menu;
function InitMenu(workingpath) {
    return __awaiter(this, void 0, void 0, function* () {
        g_menu._root.style.display = "flex";
        let label = new Label("TT Pack 编辑器");
        label._root.style.width = "auto";
        g_menu.AddChild(label);
        let btn = new Button("Edit", () => __awaiter(this, void 0, void 0, function* () {
            let dialog = new PackageDialog(workingpath);
            yield dialog.Show();
        }));
        g_menu.AddChild(btn);
        let save = new Button("保存");
        g_menu.AddChild(save);
    });
}
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    let b = yield ttwin.Init(true);
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
    g_menu = new Panel();
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
    { //jsoneditor
        let e = new JSONEditor(spSecondAttr._panel2._root, { mode: "code", modes: ["code", "tree"] }, {});
    }
    let root = yield ttwin.Path_GetRoots();
    InitMenu(root.special.WorkingPath);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9EQUFvRDs7Ozs7Ozs7OztBQUdwRCxPQUFPLEVBQUUsTUFBTSxFQUFzQixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBcUIsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBSW5DLElBQUksTUFBYSxDQUFDO0FBQ2xCLFNBQWUsUUFBUSxDQUFDLFdBQW1COztRQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBUyxFQUFFO1lBQ3BDLElBQUksTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFTLEVBQUU7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