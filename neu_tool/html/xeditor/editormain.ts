import { Navigator, Color, DrawLayer_GUI, DrawLayerTag, GameApp, IUserLogic, MainScreen, QUI_Button, QUI_Canvas, QUI_Container, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Split, QUI_Resource, QUI_TextBox_DOM, QUI_TextBox_Prompt, Rectangle, ResourceOption, Resources, tt, IState, QUI_Menu, QUI_MenuItem } from "../ttlayer2/ttlayer2.js"
import { QUI_Grow } from "../ttlayer2/ttui/ext/qui_grow.js";
import { FileGroup } from "./filegroup.js";
import { IOExt, IOExt_DirectoryHandle, IOExt_FileHandle } from "../xioext/ioext.js"


export class NavState_Begin implements IState<MyLogic> {
    fileGroup: FileGroup;
    //container: QUI_Container;
    app: MyLogic;
    init: boolean = false;
    root: QUI_Container;
    menu: QUI_Menu;;
    OnInit(mgr: MyLogic): void {

        this.app = mgr;
        //this.container = new QUI_Container();
        //mgr.canvas.AddChild(this.container);

        let container = this.root = new QUI_Container();
        mgr.canvas.AddChild(container);


        let titlebar = new QUI_Panel();
        container.AddChild(titlebar);
        titlebar.localRect.setVPosByTopBorder(22);
        let grow = new QUI_Grow();
        titlebar.container = grow;
        grow.direction = QUI_Direction2.Horizontal;


        this.menu = new QUI_Menu();
        let submenuFile = new QUI_Menu();

        this.menu.items.push(
            { label: "File", sprite: null, submenu: submenuFile, onaction: null }
        );
        this.menu.items.push(
            { label: "Info", sprite: null, submenu: null, onaction: null }
        );
        this.menu.items.push(
            { label: "其它", sprite: null, submenu: null, onaction: null }
        );
        this.menu.items.push(
            { label: "Help", sprite: QUI_Resource.GetSprite("round"), submenu: null, onaction: null }
        );
        submenuFile.items.push
            (
                {
                    label: "打开项目目录", sprite: QUI_Resource.GetSprite("corner"), submenu: null, onaction: () => {
                        console.log("open.");
                    }
                }
            );
        submenuFile.items.push
            (
                { label: "编辑", sprite: QUI_Resource.GetSprite("border"), submenu: submenuFile, onaction: null }
            );
        this.menu.FillTo(mgr.canvas, titlebar.container);

        let desktop = new QUI_Container();
        desktop.localRect.offsetY1 = 22;
        container.AddChild(desktop);

        let group = this.fileGroup = new FileGroup();
        group.resizeEnable = true;
        group.dragEnable = true;//允许拖动
        let r = mgr.canvas.GetWorldRect();


        group.localRect.setByRect(new Rectangle(100, 100, r.Width - 200, r.Height - 200));
        desktop.AddChild(group);

        //加到一个canvas 上是一个办法
    }
    OnUpdate(delta: number): void {
        if (!this.init && this.app.canvas.target != null) {
            let r = this.app.canvas.GetWorldRect();
            this.fileGroup.localRect.setByPosAndSize(150, 100, r.Width - 300, r.Height - 200);
            this.init = true;
        }
    }
    OnExit(): void {
        this.app.canvas.RemoveChild(this.root);
    }
    OnResize(width: number, height: number): void {

    }
    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }

}
export class MyLogic extends Navigator implements IUserLogic {

    canvas: QUI_Canvas;

    fps_txt: QUI_Label;

    OnInit(): void {
        let guilayer = new DrawLayer_GUI(DrawLayerTag.GUI);

        //改动这个会影响canvas size，会造成不点对点
        tt.graphic.setMainScreenScale(1);

        let pr = tt.graphic.getDevicePixelRadio();

        let scaleradio = 3;// (pr * ) | 0;
        console.log("ScaleRadio=" + scaleradio);

        //改Camera的缩放会直接缩放内容
        guilayer.GetCamera().Scale = scaleradio;

        GameApp.GetViewList().AddDrawLayer(guilayer);


        //初始化canvas 和 fps
        this.canvas = guilayer.GetCanvas();

        this.fps_txt = new QUI_Label();
        this.fps_txt.localRect.setHPosByRightBorder(100);
        this.fps_txt.localRect.setVPosByTopBorder(20, 0);
        this.fps_txt.localColor = new Color(0.9, 0.8, 0.3, 1);
        this.canvas.AddChild(this.fps_txt);

        //导航到第一个状态

        this.Push(new NavState_Begin());




        // let group2 = new QUI_Group();
        // //group2.dragEnable = true;//允许拖动
        // group2.localRect.setByRect(new Rectangle(200, 200, 200, 200));
        // this.canvas.AddChild(group2);
        // let grow = new QUI_Grow();
        // grow.direction = QUI_Direction2.Vertical;
        // group2.container.AddChild(grow);

        // let label = new QUI_Label();
        // label.localRect.setBySize(100, 16);
        // grow.AddChild(label);
        // let txtprompt = new QUI_TextBox_Prompt();
        // txtprompt.localRect.setBySize(100, 20);
        // grow.AddChild(txtprompt);
        // let txtdom = new QUI_TextBox_DOM();
        // txtdom.localRect.setBySize(100, 20);
        // grow.AddChild(txtdom);
    }

    timer: number = 0;
    framecount: number = 0;
    OnUpdate(delta: number): void {
        this.timer += delta;
        this.framecount++;
        if (this.timer > 1.0) {
            let fps = (this.framecount / this.timer * 100) | 0;
            this.framecount = 0;
            this.timer = 0;

            let fps_l = (fps % 100);
            let fps_h = (fps / 100) | 0;
            let fpsstr_h = fps_h.toString();
            while (fpsstr_h.length < 3)
                fpsstr_h = "0" + fpsstr_h;
            let fpsstr_l = fps_l.toString();
            while (fpsstr_l.length < 2)
                fpsstr_l += "0";
            let fpsstr = fpsstr_h + "." + fpsstr_l;
            this.fps_txt.text = "fps=" + fpsstr;
        }

        let state = this.GetLast()
        state?.OnUpdate(delta);
    }
    OnExit(): void {

    }
    OnResize(width: number, height: number): void {
        let state = this.GetLast()
        state?.OnResize(width, height);
    }
    OnKey(keycode: string, press: boolean): void {
        let state = this.GetLast()
        state?.OnKey(keycode, press);
    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {
        let state = this.GetLast()
        state?.OnPointAfterGUI(id, x, y, press, move);
    }

}
