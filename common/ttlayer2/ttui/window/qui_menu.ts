import { Color, Sprite } from "../../ttlayer2.js"
import { QUI_BaseContainer, QUI_Canvas, QUI_Container, QUI_Grow, QUI_HAlign, QUI_Image, QUI_ImageScale9, QUI_Label, QUI_Overlay, QUI_Panel, QUI_Resource } from "../ttui.js"

export class QUI_MenuItem {

    sprite: Sprite = null;
    label: string = "";
    onaction: (item: QUI_MenuItem) => void = null;
    submenu: QUI_Menu = null;
}
export class QUI_Menu {
    items: QUI_MenuItem[] = [];
    //将当前菜单项填充到一个已经有的Grow控件中
    FillTo(canvas: QUI_Canvas, grow: QUI_BaseContainer, samewidth: boolean = false) {
        if (this.items == null)
            return;
        let width = 0;
        for (var i = 0; i < this.items.length; i++) {
            width = Math.max(width, this.AddMenuItem(canvas, grow, this.items[i]));
        }
        if (samewidth) {
            for (var i = 0; i < this.items.length; i++) {
                grow.GetChild(i).localRect.offsetX2 = width;
            }
        }
    }
    private AddMenuItem(canvas: QUI_Canvas, grow: QUI_BaseContainer, item: QUI_MenuItem): number {
        let c = new QUI_Container();

        let width = 0;
        if (item.sprite != null) {
            width = 18;
            let img = new QUI_Image();
            img.SetBySprite(item.sprite);
            img.localRect.setByPosAndSize(1, 1, 16, 16);
            c.AddChild(img);
        }

        let label = new QUI_Label();
        label.text = item.label;
        let tw = label.GetTextWidth();
        label.localRect.setByPosAndSize(width, 0, tw + 2, 18);
        width += (tw + 2);
        label.halign = QUI_HAlign.Left;
        c.AddChild(label);

        c.localRect.setBySize(width, 18);
        let overlay = new QUI_Overlay();
        c.AddChild(overlay);
        overlay.OnPress = () => {
            if (item.submenu != null) {
                let pos = overlay.GetWorldRect();
                item.submenu.Show(canvas, pos.X + pos.Width / 2, pos.Y + pos.Height / 2);
            }
            else {
                QUI_Menu.CloseMenu(canvas);
                if (item.onaction != null)
                    item.onaction(item);
            }
        }
        grow.AddChild(c);
        return width; ``
    }
    static _menuStack: { [id: number]: { canvas: QUI_Canvas, container: QUI_BaseContainer[], back: QUI_BaseContainer } } = {};
    static CloseMenu(canvas: QUI_Canvas) {
        if (this._menuStack[canvas.GetID()] == undefined) {
            return;

        }
        let can = this._menuStack[canvas.GetID()];
        for (var i = 0; i < can.container.length; i++) {
            can.canvas.RemoveChild(can.container[i]);
        }
        can.canvas.RemoveChild(can.back);
        delete this._menuStack[canvas.GetID()];
    }
    private static ShowMenuContainer(canvas: QUI_Canvas, container: QUI_BaseContainer) {
        let newmenu = false;
        if (this._menuStack[canvas.GetID()] == undefined) {

            this._menuStack[canvas.GetID()] = { canvas: canvas, container: [container], back: null };
            newmenu = true;
        }
        else {
            this._menuStack[canvas.GetID()].container.push(container);
        }
        if (newmenu) {
            let containerback = new QUI_Container();
            canvas.AddChild(containerback);
            let overlayback = new QUI_Overlay();
            overlayback.OnPress = () => {//Hide Menu
                QUI_Menu.CloseMenu(canvas);
            }
            containerback.AddChild(overlayback);
            this._menuStack[canvas.GetID()].back = containerback;
        }
    }
    //在指定坐标创建一个弹出菜单
    Show(canvas: QUI_Canvas, x: number, y: number): void {
        let psize = canvas.GetWorldRect();

        let menuback = new QUI_Container();
        QUI_Menu.ShowMenuContainer(canvas, menuback);
        canvas.AddChild(menuback);

        let panel = new QUI_Panel();

        menuback.AddChild(panel);

        let image = new QUI_Image();
        panel.backElements.splice(0, 0, image);
        //menuback.AddChild(image);
        image.localColor = new Color(0, 0, 0, 0.5);
        image.localRect.SetAsFill();

        let grow = new QUI_Grow();

        this.FillTo(canvas, grow, true);
        grow.OnUpdate(canvas, 0);
        let menuw = grow.GetContextWidth();
        let menuh = grow.GetContextHeight();
        if (x > psize.Width - menuw - 2)
            x = psize.Width - menuw - 2;
        if (y > psize.Height - menuh - 2)
            y = psize.Height - menuh - 2;
        if (x < 1) x = 1
        if (y < 1) y = 1;

        menuback.localRect.setByPosAndSize(x - 1, y - 1, menuw + 2, menuh + 2);
        //panel.container = grow;
        menuback.AddChild(grow);
        grow.localRect.setByPosAndSize(1, 1, menuw, menuh);
        menuback.OnUpdate(canvas, 0);
        //let border = QUI_Resource.CreateGUI_Border();
        //containerback.AddChild(border);
        //border.localRect.setByPosAndSize(x - 1, y - 1, menuw + 2, menuh + 2);
    }
}