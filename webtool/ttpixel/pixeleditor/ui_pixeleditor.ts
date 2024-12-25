import { tt } from "../ttapi/ttapi.js";
import { Color, Color32, QUI_Canvas, QUI_Container, QUI_Container_AutoFill, QUI_HAlign, QUI_Image, QUI_JoyStick, QUI_Panel, QUI_TouchBar, QUI_VAlign, Rectangle, Resources, Vector2 } from "../ttlayer2/ttlayer2.js";
import { UI_HelpDialog } from "./ui_helpdialog.js";
import { Pen, UI_Canvas } from "./ui_canvas.js";
import { UI_DropMenuPal } from "./ui_dropmenu.js";

export class UI_PixelEditor extends QUI_Container_AutoFill {
    constructor() {
        super();
        this.setAsp(9 / 21, 2 / 3);


        this.InitMenuBar();
        this.InitCanvas();
        this.InitToolBar();
        this.InitTouchArea();

        this.InitCursor();
    }
    readonly poshead: number = 0.10;
    readonly poscanvas: number = 0.65;
    readonly postool: number = 0.73;
    InitMenuBar() {
        let panelmenu = new QUI_Panel();
        panelmenu.borderElement = Resources.CreateGUI_Border();
        this.addChild(panelmenu);
        panelmenu.localRect.setAsFill();
        panelmenu.localRect.radioY2 = this.poshead;//0~15 menubar

        let btnmenu =Resources.CreateGUI_Button("Menu");
        panelmenu.addChild(btnmenu);
        btnmenu.localRect.setHPosByLeftBorder(30,8);
        btnmenu.localRect.setVPosByCenter(20);

        let btnhelp = Resources.CreateGUI_Button("?");
        panelmenu.addChild(btnhelp);
        btnhelp.localRect.setHPosByRightBorder(20,8);
        btnhelp.localRect.setVPosByCenter(20);
        btnhelp.OnPressDown = () => {

            UI_HelpDialog.Show(this);
        }
    }
    canvas: UI_Canvas;
    pen: Pen;
    InitCanvas() {
        let canvasarea = new QUI_Container();
        canvasarea.localRect.setAsFill();
        canvasarea.localRect.radioY1 = this.poshead;
        canvasarea.localRect.radioY2 = this.poscanvas;//15~65 canvas
        canvasarea.localRect.radioX1 = 0;
        canvasarea.localRect.radioX2 = 1;
        this.addChild(canvasarea);

        let image = Resources.CreateGUI_ImgWhite(new Color(0, 0, 1, 1));
        image.localRect.setAsFill();
        canvasarea.addChild(image);

        //let canvas_autosize = new QUI_Container_AutoFill();
        //canvasarea.addChild(canvas_autosize);
        //let image2 = Resources.CreateGUI_ImgWhite();
        //canvas_autosize.addChild(image2);

        let panelcanvas = new QUI_Panel();
        panelcanvas.borderElement = Resources.CreateGUI_Border();
        canvasarea.addChild(panelcanvas);
        panelcanvas.localRect.setAsFill();

        this.canvas = new UI_Canvas();
        this.canvas.localRect.setAsFill();
        panelcanvas.addChild(this.canvas)
        //panelcanvas.localRect.radioY1 = 0.15;
        //panelcanvas.localRect.radioY2 = 0.65;//15~65 canvas
        // panelcanvas.localRect.radioX1 = 0.5;
        // panelcanvas.localRect.radioX2 = 0.5;

        //let grid =new UI_Grid();
        //grid.localRect.setAsFill();
        //panelcanvas.addChild(grid);

    }

    InitToolBar() {
        let panelcontrol = new QUI_Panel();
        panelcontrol.borderElement = Resources.CreateGUI_Border();
        this.addChild(panelcontrol);
        panelcontrol.localRect.setAsFill();
        panelcontrol.localRect.radioY1 = this.poscanvas;
        panelcontrol.localRect.radioY2 = this.postool;//65~75 controlbar

        let btnset1 = Resources.CreateGUI_Button("set1");
        panelcontrol.addChild(btnset1);
        btnset1.localRect.setAsFill();
        btnset1.localRect.radioX1 = 0.1;
        btnset1.localRect.radioX2 = 0.2;
        btnset1.localRect.radioY1 = 0.2;
        btnset1.localRect.radioY2 = 0.8;
        btnset1.OnPressDown = (id) => {
            UI_DropMenuPal.Show(this, id);
        }

        let btn3 = Resources.CreateGUI_Button("set2");
        panelcontrol.addChild(btn3);
        btn3.localRect.setAsFill();
        btn3.localRect.radioX1 = 0.3;
        btn3.localRect.radioX2 = 0.4;
        btn3.localRect.radioY1 = 0.2;
        btn3.localRect.radioY2 = 0.8;
    }

    private cursor: QUI_Image;
    InitCursor() {
        this.cursor = new QUI_Image();
        this.cursor.sprite = Resources.GetPackElement().ConvertElemToSprite(Resources.GetPackElement().GetElementByName("arrow"));

        this.cursor.localRect.setByRect(new Rectangle(0, 0, 16, 16))
        this.cursor._parent = this;
        this.addChild(this.cursor);
    }
    joy: QUI_TouchBar;

    panelright: QUI_Container;
    InitTouchArea() {
        let paneltouch = new QUI_Container();
        //paneltouch.borderElement = Resources.CreateGUI_Border();
        this.addChild(paneltouch);
        paneltouch.localRect.setAsFill();
        paneltouch.localRect.radioY1 = this.postool;
        paneltouch.localRect.radioY2 = 1.0;//10~60 canvas
        {
            let panelleft = new QUI_Container();
            paneltouch.addChild(panelleft);
            panelleft.localRect.setAsFill();
            panelleft.localRect.radioX2 = 0.5;



            let border = Resources.CreateGUI_Border();
            panelleft.addChild(border);
            let label = Resources.CreateGUI_Label("TouchArea 触摸区");
            label.fontScale.X *= 0.5;
            label.fontScale.Y *= 0.5;
            panelleft.addChild(label);
            label.halign = QUI_HAlign.Middle;
            label.valign = QUI_VAlign.Middle;

            //配置摇杆
            let joy = this.joy = new QUI_TouchBar();
            panelleft.addChild(joy);
            joy.localRect.setAsFill();
            joy.spriteJoyHot = Resources.GetPackElement().ConvertElemToSprite(Resources.GetRoundBlock());
            //joy.spriteJoyBack = Resources.GetPackElement().ConvertElemToSprite(Resources.GetRoundBlock());
            joy.touchHotSize.X = 16;
            joy.touchHotSize.Y = 16;
            // joy.touchBackSize.X = 64;
            // joy.touchBackSize.Y = 64;
            // joy.hotMaxDist = 64;
        }

        let panelright = this.panelright = new QUI_Container();
        paneltouch.addChild(panelright);
        panelright.localRect.setAsFill();
        panelright.localRect.radioX1 = 0.5;


        let border2 = Resources.CreateGUI_Border();
        panelright.addChild(border2);

        let btnM = Resources.CreateGUI_Button("A");
        panelright.addChild(btnM);
        btnM.localRect.setAsFill();
        btnM.localRect.radioX1 = 0.5;
        btnM.localRect.radioX2 = 0.9;
        btnM.localRect.radioY1 = 0.5;
        btnM.localRect.radioY2 = 0.9;
        btnM.OnPressDown = () => {
            if (this.pen == null)
                this.pen = new Pen();
            this.pen.color.A = 255;
            this.pen.color.R = 0;
            this.pen.color.G = 0;
            this.pen.color.B = 0;
            this.canvas.ChangeTool(this.pen);
            this.pen.Begin();

            // this.canvas.BeginPencil(new Color(0, 0, 0, 1));
        }
        btnM.OnPressUp = () => {

            this.canvas.GetTool()?.End();
        }
        btnM.BindKey = "Period";

        let btn1 = Resources.CreateGUI_Button("B");
        panelright.addChild(btn1);
        btn1.localRect.setAsFill();
        btn1.localRect.radioX1 = 0.15;
        btn1.localRect.radioX2 = 0.4;
        btn1.localRect.radioY1 = 0.5;
        btn1.localRect.radioY2 = 0.9;
        btn1.BindKey = "Comma";
        btn1.OnPressDown = () => {
            if (this.pen == null)
                this.pen = new Pen();
            this.pen.color.A = 0;
            this.pen.color.R = 0;
            this.pen.color.G = 0;
            this.pen.color.B = 0;
            this.canvas.ChangeTool(this.pen);
            this.pen.Begin();
        }
        btn1.OnPressUp = () => {
            this.canvas.GetTool()?.End();
        }




    }
    OnUpdate(delta: number): void {
        super.OnUpdate(delta);
        if (this._canvas == null)
            return;

        var dir = this.joy.GetTouchDirection(true);
        if (dir != null) {
            let movespeed = 1;// 32 * delta * this._canvas.scale;
            dir.X *= movespeed;
            dir.Y *= movespeed;
            this.MoveCursor(dir);



        }
        let cursor = this.cursor;
        cursor.color.R = cursor.color.G = cursor.color.B = this.canvas.GetPickFlashValue();
        // if (this.drawAction != null) {
        //     var dirty = this.drawAction.Apply(this.grid.pickPos, this.grid.data);
        //     if (dirty)
        //         this.grid.simpleimage.UploadTexture(0, 0, this.grid.data.width, this.grid.data.height, this.grid.data.data);
        // }

    }
    MoveCursor(dir: Vector2) {

        let cursor = this.cursor;
        cursor.localRect.radioX1 = 0;
        cursor.localRect.radioX2 = 0;
        cursor.localRect.radioY1 = 0;
        cursor.localRect.radioY2 = 0;


        cursor.localRect.offsetX1 += dir.X;
        cursor.localRect.offsetY1 += dir.Y;

        //限制光标范围
        var limit = this.canvas.getWorldRect();
        var sw = this.getWorldRect();
        limit.X -= sw.X;
        limit.Y -= sw.Y;
        if (cursor.localRect.offsetX1 < limit.X)
            cursor.localRect.offsetX1 = limit.X;
        if (cursor.localRect.offsetX1 > limit.X + limit.Width - 1)
            cursor.localRect.offsetX1 = limit.X + limit.Width - 1;
        if (cursor.localRect.offsetY1 < limit.Y)
            cursor.localRect.offsetY1 = limit.Y;
        if (cursor.localRect.offsetY1 > limit.Y + limit.Height - 1)
            cursor.localRect.offsetY1 = limit.Y + limit.Height - 1;
        cursor.localRect.offsetX2 = cursor.localRect.offsetX1 + 16;
        cursor.localRect.offsetY2 = cursor.localRect.offsetY1 + 16;

        let cursorpos = cursor.getWorldRect();
        this.canvas.PickByWorld(new Vector2(cursorpos.X, cursorpos.Y));
    }
    private _canvas: QUI_Canvas
    OnRender(canvas: QUI_Canvas): void {
        this._canvas = canvas;
        super.OnRender(canvas);
    }

}