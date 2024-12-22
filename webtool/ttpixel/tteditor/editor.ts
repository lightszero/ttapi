import { tt } from "../ttapi/ttapi.js";
import { Color, DrawLayer_GUI, GameApp, IUserLogic, QUI_Canvas, QUI_Container, QUI_HAlign, QUI_Image, QUI_JoyStick, QUI_Panel, QUI_VAlign, Rectangle, Resources } from "../ttlayer2/ttlayer2.js";
import { HelpDialog } from "./helpdialog.js";

export class EditorApp implements IUserLogic {

    OnInit(): void {

        this.InitAsync();
    }
    layergui: DrawLayer_GUI;
    guicanvas: QUI_Canvas;
    canvas: QUI_Container;//需要一个特殊的实现，能提供Grid的画板
    cursor: QUI_Image;
    async InitAsync() {
        //配置绘制层
        this.layergui = new DrawLayer_GUI();
        GameApp.GetViewList().AddDrawLayer(this.layergui);
        this.layergui.GetCamera().Scale = 2.0 * tt.graphic.getDevicePixelRadio();//增加像素感
        //this.layergui.GetCanvas().scale =2.0;//增加像素感

        this.guicanvas = this.layergui.GetCanvas();
        //let border = Resources.CreateGUI_Border();
        //this.guicanvas.addChild(border);

        this.InitMenuBar();
        this.InitCanvas();
        this.InitControlBar();
        this.InitTouchArea();

        this.cursor = new QUI_Image();
        this.cursor.sprite = Resources.GetPackElement().ConvertElemToSprite(Resources.GetPackElement().GetElementByName("arrow"));

        this.cursor.localRect.setByRect(new Rectangle(0, 0, 16, 16))
        this.guicanvas.addChild(this.cursor);
    }
    async InitMenuBar() {
        let panelmenu = new QUI_Panel();
        panelmenu.borderElement = Resources.CreateGUI_Border();
        this.guicanvas.addChild(panelmenu);
        panelmenu.localRect.setAsFill();
        panelmenu.localRect.radioY2 = 0.15;//0~15 menubar

        let btn = Resources.CreateGUI_Button("Help", new Color(1, 1, 1, 1));
        btn.localRect.setVPosByTopBorder(20, 8);
        btn.localRect.setHPosByLeftBorder(100, 100);
        panelmenu.addChild(btn);
        btn.OnClick = () => {
            HelpDialog.Show(this.guicanvas);
            console.log("show");
        };
    }
    async InitCanvas() {
        let panelcanvas = this.canvas = new QUI_Panel();
        panelcanvas.borderElement = Resources.CreateGUI_Border();
        this.guicanvas.addChild(panelcanvas);
        panelcanvas.localRect.setAsFill();
        panelcanvas.localRect.radioY1 = 0.15;
        panelcanvas.localRect.radioY2 = 0.65;//15~65 canvas
        panelcanvas.localRect.radioX1 = 0.5;
        panelcanvas.localRect.radioX2 = 0.5;

    }
    async InitControlBar() {
        let panelcontrol = new QUI_Panel();
        panelcontrol.borderElement = Resources.CreateGUI_Border();
        this.guicanvas.addChild(panelcontrol);
        panelcontrol.localRect.setAsFill();
        panelcontrol.localRect.radioY1 = 0.65;
        panelcontrol.localRect.radioY2 = 0.75;//65~75 controlbar
    }
    joy = new QUI_JoyStick();

    panelright: QUI_Container;
    async InitTouchArea() {
        let paneltouch = new QUI_Container();
        //paneltouch.borderElement = Resources.CreateGUI_Border();
        this.guicanvas.addChild(paneltouch);
        paneltouch.localRect.setAsFill();
        paneltouch.localRect.radioY1 = 0.75;
        paneltouch.localRect.radioY2 = 1.0;//10~60 canvas

        let panelleft = new QUI_Container();
        paneltouch.addChild(panelleft);
        panelleft.localRect.setAsFill();
        panelleft.localRect.radioX2 = 0.5;



        let border = Resources.CreateGUI_Border();
        panelleft.addChild(border);
        let label = Resources.CreateGUI_Label("TouchArea 摇杆区");
        label.fontScale.X *= 0.5;
        label.fontScale.Y *= 0.5;
        panelleft.addChild(label);
        label.halign = QUI_HAlign.Middle;
        label.valign = QUI_VAlign.Middle;

        //配置摇杆
        let joy = this.joy = new QUI_JoyStick();
        panelleft.addChild(joy);
        joy.localRect.setAsFill();
        joy.spriteJoyHot = Resources.GetPackElement().ConvertElemToSprite(Resources.GetRoundBlock());
        joy.spriteJoyBack = Resources.GetPackElement().ConvertElemToSprite(Resources.GetRoundBlock());
        joy.touchHotSize.X = 32;
        joy.touchHotSize.Y = 32;
        joy.touchBackSize.X = 64;
        joy.touchBackSize.Y = 64;
        joy.hotMaxDist = 64;


        let panelright = this.panelright = new QUI_Container();
        paneltouch.addChild(panelright);
        panelright.localRect.setAsFill();
        panelright.localRect.radioX1 = 0.5;

        let btnM = Resources.CreateGUI_Button("Dot");
        panelright.addChild(btnM);
        btnM.localRect.setAsFill();
        btnM.localRect.radioX1 = 0.6;
        btnM.localRect.radioX2 = 0.9;
        btnM.localRect.radioY1 = 0.6;
        btnM.localRect.radioY2 = 0.9;


        let btn1 = Resources.CreateGUI_Button("1");
        panelright.addChild(btn1);
        btn1.localRect.setAsFill();
        btn1.localRect.radioX1 = 0.25;
        btn1.localRect.radioX2 = 0.45;
        btn1.localRect.radioY1 = 0.6;
        btn1.localRect.radioY2 = 0.8;

        let btn2 = Resources.CreateGUI_Button("2");
        panelright.addChild(btn2);
        btn2.localRect.setAsFill();
        btn2.localRect.radioX1 = 0.3;
        btn2.localRect.radioX2 = 0.5;
        btn2.localRect.radioY1 = 0.3;
        btn2.localRect.radioY2 = 0.5;

        let btn3 = Resources.CreateGUI_Button("3");
        panelright.addChild(btn3);
        btn3.localRect.setAsFill();
        btn3.localRect.radioX1 = 0.60;
        btn3.localRect.radioX2 = 0.80;
        btn3.localRect.radioY1 = 0.25;
        btn3.localRect.radioY2 = 0.45;
    }
    UpdatePanelRightSize() {
        var limit = this.panelright.getWorldRect();
        this.panelright.localRect.setHPosByRightBorder(limit.Height, 0);
    }
    OnUpdate(delta: number): void {
        this.UpdatePanelRightSize();
        var limit = this.canvas.getWorldRect();
        this.canvas.localRect.offsetX1 = -limit.Height * 0.5;
        this.canvas.localRect.offsetX2 = limit.Height * 0.5;


        //throw new Error("Method not implemented.");
        var dir = this.joy.GetTouchDirection();
        if (dir != null) {
            this.cursor.localRect.radioX1 = 0;
            this.cursor.localRect.radioX2 = 0;
            this.cursor.localRect.radioY1 = 0;
            this.cursor.localRect.radioY2 = 0;

            let movespeed = 64 * delta * tt.graphic.getDevicePixelRadio();
            this.cursor.localRect.offsetX1 += dir.X * movespeed;
            this.cursor.localRect.offsetY1 += dir.Y * movespeed;

            //限制光标范围
            var limit = this.canvas.getWorldRect();
            if (this.cursor.localRect.offsetX1 < limit.X)
                this.cursor.localRect.offsetX1 = limit.X;
            if (this.cursor.localRect.offsetX1 > limit.X + limit.Width)
                this.cursor.localRect.offsetX1 = limit.X + limit.Width;
            if (this.cursor.localRect.offsetY1 < limit.Y)
                this.cursor.localRect.offsetY1 = limit.Y;
            if (this.cursor.localRect.offsetY1 > limit.Y + limit.Height)
                this.cursor.localRect.offsetY1 = limit.Y + limit.Height;
            this.cursor.localRect.offsetX2 = this.cursor.localRect.offsetX1 + 16;
            this.cursor.localRect.offsetY2 = this.cursor.localRect.offsetY1 + 16;

        }
    }
    OnExit(): void {
        //throw new Error("Method not implemented.");
    }
    OnResize(width: number, height: number): void {
        //throw new Error("Method not implemented.");
    }
    OnKey(keycode: string, press: boolean): void {
        // throw new Error("Method not implemented.");
    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {
        //throw new Error("Method not implemented.");
    }

}