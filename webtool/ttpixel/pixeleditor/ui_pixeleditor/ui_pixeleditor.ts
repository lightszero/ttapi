import { tt } from "../../ttapi/ttapi.js";
import { Color, Color32, QUI_Button, QUI_Canvas, QUI_Container, QUI_Container_AutoFill, QUI_HAlign, QUI_IElement, QUI_Image, QUI_JoyStick, QUI_Panel, QUI_TouchBar, QUI_VAlign, Rectangle, Resources, Vector2 } from "../../ttlayer2/ttlayer2.js";
import { UI_HelpDialog } from "../ui_dialog/ui_helpdialog.js";
import { Pen, UI_Canvas } from "./ui_canvas.js";
import { UI_DropMenuPal } from "./ui_dropmenupal.js";
import { UI_4Color } from "./ui_4color.js";
import { QUI_DropButton } from "../../ttlayer2/ttui/qui_dropbutton.js";

export class UI_PixelEditor extends QUI_Container {
    constructor() {
        super();
        //this.setAsp(9 / 21, 2 / 3);



        this.InitCanvas();
        this.InitToolBar();
        this.InitTouchArea();

        this.InitCursor();
    }

    readonly poscanvas: number = 0.65;
    readonly postool: number = 0.73;

    canvas: UI_Canvas;
    canvasback: UI_4Color;
    pen: Pen;
    color4: Color[];
    InitCanvas() {
        let canvasarea = new QUI_Container();
        canvasarea.localRect.setAsFill();
        canvasarea.localRect.radioY1 = 0;
        canvasarea.localRect.radioY2 = this.postool;//15~65 canvas
        canvasarea.localRect.radioX1 = 0;
        canvasarea.localRect.radioX2 = 1;
        this.addChild(canvasarea);

        //let image = Resources.CreateGUI_ImgWhite(new Color(0, 0, 1, 1));
        let white = Resources.GetPackElement().ConvertElemToSprite(Resources.getWhiteBlock());
        let image4 = this.canvasback = new UI_4Color(white);
        this.color4 = [];
        for (var i = 0; i < 4; i++) {
            this.color4[i] = Color.White;
        }
        this.color4[0].R = 0.5;
        this.color4[0].G = 0.5;
        this.color4[0].B = 0.8;
        this.color4[1].R = 0.5;
        this.color4[1].G = 0.5;
        this.color4[1].B = 0.8;

        this.color4[2].R = 0.1;
        this.color4[2].G = 0.1;
        this.color4[2].B = 0.8;

        this.color4[3].R = 0.1;
        this.color4[3].G = 0.1;
        this.color4[3].B = 0.8;
        image4.localRect.setAsFill();
        canvasarea.addChild(image4);

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
    _canvastimer: number = 0;
    UpdateCanvasBack(delta: number) {
        this._canvastimer += delta;
        if (this._canvastimer > 4.0)
            this._canvastimer = 0;
        let add = this._canvastimer | 0;
        let small = this._canvastimer - add;

        for (var i = 0; i < 4; i++) {

            let col = Color.Lerp(this.color4[(i + add) % 4], this.color4[(i + add + 1) % 4], small);
            var targeti = i;
            if (i == 2)
                targeti = 3;
            if (i == 3)
                targeti = 2;
            this.canvasback.colors[targeti] = col;
        }
    }
    dropColor: UI_DropMenuPal;
    ui_pickColor: QUI_Button;
    pickColor: Color32 = new Color32(0, 0, 0, 255);
    CreateColorBtn(container: QUI_IElement, color: Color): QUI_Button {
        let white = Resources.GetPackElement().ConvertElemToSprite(Resources.getWhiteBlock());

        let colorUse = new QUI_Image(white);
        colorUse.color = color;
        colorUse.localRect.setAsFill();
        colorUse.localRect.offsetX1 = 2;
        colorUse.localRect.offsetX2 = -2;
        colorUse.localRect.offsetY1 = 2;
        colorUse.localRect.offsetY2 = -2;

        let colorUse2 = new QUI_Image(white);
        colorUse2.color = color;
        colorUse2.localRect.setAsFill();
        colorUse2.localRect.offsetX1 = 2;
        colorUse2.localRect.offsetX2 = -2;
        colorUse2.localRect.offsetY1 = 2;
        colorUse2.localRect.offsetY2 = -2;

        let btn = new QUI_Button();
        btn.ElemNormal = Resources.CreateGUI_Border();
        btn.ElemNormal.addChild(colorUse);

        let s9 = Resources.CreateGUI_Border();;
        btn.ElemPress = s9;
        btn.ElemPress.addChild(colorUse2);
        s9.color.R = 0.5;
        s9.color.G = 0.5;
        s9.color.B = 0.5;
        container.addChild(btn);


        return btn;
    }
    InitToolBar() {
        let panelcontrol = new QUI_Panel();
        //panelcontrol.borderElement = Resources.CreateGUI_Border();
        this.addChild(panelcontrol);
        panelcontrol.localRect.setAsFill();
        panelcontrol.localRect.radioY1 = this.poscanvas;
        panelcontrol.localRect.radioY2 = this.postool;//65~75 controlbar

        this.ui_pickColor = this.CreateColorBtn(panelcontrol, Color.Black);



        this.ui_pickColor.localRect.setAsFill();
        this.ui_pickColor.localRect.radioX1 = 0.05;
        this.ui_pickColor.localRect.radioX2 = 0.15;
        this.ui_pickColor.localRect.radioY1 = 0.2;
        this.ui_pickColor.localRect.radioY2 = 0.8;
        this.ui_pickColor.OnPressDown = (id) => {
            if (this.dropColor == null) {
                this.dropColor = new UI_DropMenuPal();
                //对话框显示到上面去
                this._parent.addChild(this.dropColor);
            }
            this.dropColor.Show(id);
        }
        let label = Resources.CreateGUI_Label("选择颜色");
        label.halign = QUI_HAlign.Left;
        panelcontrol.addChild(label);
        label.fontScale.X *= 0.5;
        label.fontScale.Y *= 0.5;
        label.localRect.radioX1 = 0.2;
        label.localRect.radioX2 = 0.4;
        label.localRect.radioY1 = 0.2;
        label.localRect.radioY2 = 0.8;

        let btn3 = Resources.CreateGUI_Button("btn2");
        panelcontrol.addChild(btn3);
        btn3.localRect.setAsFill();
        btn3.localRect.radioX1 = 0.5;
        btn3.localRect.radioX2 = 0.6;
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

        let panelright = new QUI_Container_AutoFill();
        panelright.setAsp(1, 1);
        panelright.halign = QUI_HAlign.Right;
        panelright.valign = QUI_VAlign.Bottom;

        paneltouch.addChild(panelright);
        //panelright.localRect.setAsFill();
        //panelright.localRect.radioX1 = 0.5;


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
            this.pen.earse = false;
            console.log("earse=fasle");
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
            this.pen.earse = true;
            console.log("earse=true");
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
        //同步拾色器
        if (this.dropColor != null) {
            let pcolor = this.dropColor.GetPickColor32();
            if (!Color32.Equal(this.pickColor, pcolor)) {
                this.pickColor = pcolor;
                (this.ui_pickColor.ElemNormal.getChild(0) as QUI_Image).color = this.dropColor.GetPickColor();
                (this.ui_pickColor.ElemPress.getChild(0) as QUI_Image).color = this.dropColor.GetPickColor();

                if (this.pen != null) {
                    this.pen.SetColor(this.dropColor.GetPickColor32());

                }
            }
        }

        this.UpdateCanvasBack(delta);

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