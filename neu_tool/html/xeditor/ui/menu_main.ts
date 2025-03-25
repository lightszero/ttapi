import { QUI_Canvas, QUI_Direction2, QUI_Grow, QUI_Menu, QUI_Panel, QUI_Resource } from "../../ttlayer2/ttlayer2.js";
import { IOExt } from "../../xioext/ioext.js";
import { MainLogic } from "../mainlogic.js";
import { Working } from "../work/working.js";
import { Editor_Main } from "./editor_main.js";
import { Dialog_Message } from "./dialog_message.js";
import { Picker_TTJson } from "./picker_ttjson.js";
import { Picker_Image } from "./picker_image.js";

export class Menu_Main {
    static Init(canvas: QUI_Canvas) {
        let menu: QUI_Menu;
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
        menu.items.push(
            { label: "文件File", sprite: null, submenu: submenuFile, onaction: null }
        );
        menu.items.push(
            { label: "精灵Sprite", sprite: null, submenu: submenuSprite, onaction: null }
        );
        menu.items.push(
            { label: "动画Anim", sprite: null, submenu: submenuAnim, onaction: null }
        );

        menu.items.push(
            {
                label: "其它Other", sprite: QUI_Resource.GetSprite("round"), submenu: submenuOther, onaction: null
            }
        );
        {
            submenuFile.items.push
                ({
                    label: "打开工作目录", sprite: QUI_Resource.GetSprite("corner"), submenu: null, onaction: () => {
                        this.OnOpenWorkingDir(canvas);
                    }
                }
                );
            submenuFile.items.push
                (
                    { label: "--", sprite: QUI_Resource.GetSprite("border"), submenu: null, onaction: null }
                );
            submenuFile.items.push
                (
                    { label: "没菜单好摆了。", sprite: QUI_Resource.GetSprite("border"), submenu: null, onaction: null }
                );
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

    static async OnOpenWorkingDir(canvas: QUI_Canvas) {

        console.log("open.");
        let r = await IOExt.Picker_Folder();
        if (r != null) {
            Working.root = r;
            Working.editfile = await Picker_TTJson.ShowPick(canvas);//这个对话框 会调用 WorkingDir.SetEditFile
            Editor_Main.Open(canvas);
        }

    }

    static async OnSpriteAdd(canvas: QUI_Canvas) {
        if (Working.editfile == null) {
            Dialog_Message.Show(canvas, "Error editfile.");
        }
        var imagefile = await Picker_Image.ShowPick(canvas);
    }
}