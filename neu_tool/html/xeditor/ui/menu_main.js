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
import { PickTTDialog } from "./picker_ttjson.js";
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
                yield PickTTDialog.Show(canvas); //这个对话框 会调用 WorkingDir.SetEditFile
                Editor_Main.Open(canvas);
            }
        });
    }
    static OnSpriteAdd(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudV9tYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudV9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBYyxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckgsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxNQUFNLE9BQU8sU0FBUztJQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQWtCO1FBQzFCLElBQUksSUFBYyxDQUFDO1FBQ25CLElBQUksUUFBUSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFFL0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQixRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUIsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDO1FBRzNDLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ3RCLElBQUksV0FBVyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDakMsSUFBSSxhQUFhLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNuQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FB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