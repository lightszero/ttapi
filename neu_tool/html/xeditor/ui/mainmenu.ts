import { QUI_Canvas, QUI_Direction2, QUI_Grow, QUI_Menu, QUI_Panel, QUI_Resource } from "../../ttlayer2/ttlayer2.js";
import { IOExt } from "../../xioext/ioext.js";
import { EditorMain } from "../editormain.js";
import { WorkingDir } from "../work/workingdir.js";
import { MainEditor } from "./maineditor.js";
import { MessageDialog } from "./messagedialog.js";
import { PickTTDialog } from "./pickttdialog.js";


export function InitMainMenu(canvas: QUI_Canvas) {
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
                    OnOpenWorkingDir(canvas);
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
        submenuSprite.items.push({ label: "添加", sprite: null, submenu: null, onaction: null });
        submenuSprite.items.push({ label: "刷新", sprite: null, submenu: null, onaction: null });
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
async function OnOpenWorkingDir(canvas: QUI_Canvas) {

    console.log("open.");
    let r = await IOExt.Picker_Folder();
    if (r != null) {
        WorkingDir.Open(r);
        await PickTTDialog.Show(canvas);//这个对话框 会调用 WorkingDir.SetEditFile
        MainEditor.Open();
    }

}