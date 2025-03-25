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
import { MainEditor } from "./maineditor.js";
import { MessageDialog } from "./dialog_message.js";
import { PickTTDialog } from "./picker_ttjson.js";
export function InitMainMenu(canvas) {
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
                OnOpenWorkingDir(canvas);
            }
        });
        submenuFile.items.push({ label: "--", sprite: QUI_Resource.GetSprite("border"), submenu: null, onaction: null });
        submenuFile.items.push({ label: "没菜单好摆了。", sprite: QUI_Resource.GetSprite("border"), submenu: null, onaction: null });
    }
    {
        submenuSprite.items.push({
            label: "添加", sprite: null, submenu: null, onaction: () => {
                OnSpriteAdd(canvas);
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
                MessageDialog.Show(canvas, "对话框测试\ngood day。");
            }
        });
    }
    menu.FillTo(canvas, grow);
}
function OnOpenWorkingDir(canvas) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("open.");
        let r = yield IOExt.Picker_Folder();
        if (r != null) {
            Working.root = r;
            yield PickTTDialog.Show(canvas); //这个对话框 会调用 WorkingDir.SetEditFile
            MainEditor.Open(canvas);
        }
    });
}
function OnSpriteAdd(canvas) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbm1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWlubWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWMsY0FBYyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHbEQsTUFBTSxVQUFVLFlBQVksQ0FBQyxNQUFrQjtJQUMzQyxJQUFJLElBQWMsQ0FBQztJQUNuQixJQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQzFCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztJQUczQyxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUN0QixJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQ2pDLElBQUksYUFBYSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDbkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUNqQyxJQUFJLFlBQVksR0FBRyxJQUFJ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