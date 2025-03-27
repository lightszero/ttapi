var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QUI_Direction2, QUI_Grow, QUI_Menu, QUI_Panel, QUI_Resource } from "../../ttlayer2/ttlayer2.js";
import { IOExt } from "../../xioext/ioext.js";
import { Working } from "../work/working.js";
import { Editor_Main } from "./editor_main.js";
import { Dialog_Message } from "./dialog_message.js";
import { Picker_TTJson } from "./picker_ttjson.js";
import { Picker_Image } from "./picker_image.js";
export class Menu_Main {
    static Init(canvas) {
        let menu;
        let titlebar = new QUI_Panel();
        canvas.AddChild(titlebar);
        titlebar.localRect.setVPosByTopBorder(22);
        let grow = new QUI_Grow();
        titlebar.container = grow;
        grow.direction = QUI_Direction2.Horizontal;
        menu = new QUI_Menu();
        let submenuFile = new QUI_Menu();
        let submenuSprite = new QUI_Menu();
        let submenuAnim = new QUI_Menu();
        let submenuOther = new QUI_Menu();
        menu.items.push({ label: "文件File", sprite: null, submenu: submenuFile, onaction: null });
        menu.items.push({ label: "精灵Sprite", sprite: null, submenu: submenuSprite, onaction: null });
        menu.items.push({ label: "动画Anim", sprite: null, submenu: submenuAnim, onaction: null });
        menu.items.push({
            label: "其它Other", sprite: QUI_Resource.GetSprite("round"), submenu: submenuOther, onaction: null
        });
        {
            submenuFile.items.push({
                label: "打开工作目录", sprite: QUI_Resource.GetSprite("corner"), submenu: null, onaction: () => {
                    this.OnOpenWorkingDir(canvas);
                }
            });
            submenuFile.items.push({ label: "--", sprite: QUI_Resource.GetSprite("border"), submenu: null, onaction: null });
            submenuFile.items.push({ label: "没菜单好摆了。", sprite: QUI_Resource.GetSprite("border"), submenu: null, onaction: null });
        }
        {
            submenuSprite.items.push({
                label: "添加", sprite: null, submenu: null, onaction: () => {
                    this.OnSpriteAdd(canvas);
                }
            });
            submenuSprite.items.push({
                label: "排序", sprite: null, submenu: null, onaction: () => {
                    this.OnSpriteSort(canvas);
                }
            });
            submenuSprite.items.push({
                label: "添加嵌入", sprite: null, submenu: null, onaction: () => {
                    Dialog_Message.Show(canvas, "尚未支持");
                }
            });
            submenuSprite.items.push({
                label: "删除选中", sprite: null, submenu: null, onaction: () => {
                    Dialog_Message.Show(canvas, "尚未支持");
                }
            });
        }
        {
            submenuAnim.items.push({
                label: "添加", sprite: null, submenu: null, onaction: () => {
                    Dialog_Message.Show(canvas, "尚未支持");
                }
            });
            submenuAnim.items.push({
                label: "排序", sprite: null, submenu: null, onaction: () => {
                    Dialog_Message.Show(canvas, "尚未支持");
                }
            });
            submenuAnim.items.push({
                label: "删除选中", sprite: null, submenu: null, onaction: () => {
                    Dialog_Message.Show(canvas, "尚未支持");
                }
            });
        }
        {
            submenuOther.items.push({
                label: "Help", sprite: null, submenu: null, onaction: () => {
                    Dialog_Message.Show(canvas, "对话框测试\ngood day。");
                }
            });
        }
        menu.FillTo(canvas, grow);
    }
    static OnOpenWorkingDir(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("open.");
            let r = yield IOExt.Picker_Folder();
            if (r != null) {
                Working.root = r;
                Working.editfile = yield Picker_TTJson.ShowPick(canvas); //这个对话框 会调用 WorkingDir.SetEditFile
                Editor_Main.Open(canvas);
            }
        });
    }
    static OnSpriteAdd(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Working.editfile == null || Working.root == null) {
                Dialog_Message.Show(canvas, "Error editfile.");
                return;
            }
            var imagefile = yield Picker_Image.ShowPick(canvas);
            if (Working.ttjson.pics == null)
                Working.ttjson.pics = {};
            yield Working.Cmd_AddImgsFromFile(imagefile);
            yield Working.Save();
            Editor_Main.UpdatePics();
        });
    }
    static OnSpriteSort(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            let keys = [];
            let oldpic = Working.ttjson.pics;
            for (var key in Working.ttjson.pics) {
                keys.push(key);
            }
            Working.ttjson.pics = {};
            keys.sort();
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                Working.ttjson.pics[key] = oldpic[key];
            }
            yield Working.Save();
            Editor_Main.UpdatePics();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudV9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudV9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBYyxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckgsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsTUFBTSxPQUFPLFNBQVM7SUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFrQjtRQUMxQixJQUFJLElBQWMsQ0FBQztRQUNuQixJQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUczQyxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUN0QixJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLElBQUksYUFBYSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7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