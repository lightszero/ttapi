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
                label: "刷新", sprite: null, submenu: null, onaction: () => {
                }
            });
        }
        {
            submenuAnim.items.push({ label: "添加", sprite: null, submenu: null, onaction: null });
            submenuAnim.items.push({ label: "刷新", sprite: null, submenu: null, onaction: null });
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
            if (Working.editfile == null) {
                Dialog_Message.Show(canvas, "Error editfile.");
            }
            var imagefile = yield Picker_Image.ShowPick(canvas);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudV9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudV9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBYyxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckgsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsTUFBTSxPQUFPLFNBQVM7SUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFrQjtRQUMxQixJQUFJLElBQWMsQ0FBQztRQUNuQixJQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUczQyxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUN0QixJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLElBQUksYUFBYSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7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