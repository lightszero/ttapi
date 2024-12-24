import { tt } from "../ttapi/ttapi.js";
import { Color, DrawLayer_GUI, GameApp, IUserLogic, MainScreen, QUI_Canvas, QUI_Container, QUI_Container_AutoFill, QUI_HAlign, QUI_Image, QUI_JoyStick, QUI_Panel, QUI_VAlign, Rectangle, Resources, Vector2 } from "../ttlayer2/ttlayer2.js";
import { HelpDialog } from "./helpdialog.js";
import { UI_Canvas } from "./ui_canvas.js";
import { UI_PixelEditor } from "./ui_pixeleditor.js";

export class EditorApp implements IUserLogic {

    OnInit(): void {

        this.InitAsync();
    }
    layergui: DrawLayer_GUI;
   
    async InitAsync() {
        //配置绘制层
        this.layergui = new DrawLayer_GUI();
        GameApp.GetViewList().AddDrawLayer(this.layergui);
        this.layergui.GetCamera().Scale = 2.0 * tt.graphic.getDevicePixelRadio();//增加像素感
        //this.layergui.GetCanvas().scale =2.0;//增加像素感

        let ui_editor =new UI_PixelEditor();
        ui_editor.localRect.setAsFill();
        this.layergui.GetCanvas().addChild(ui_editor);
        //主要区域限制比例
        //this.root = new QUI_Container_AutoFill();
        //this.root.setAsp(9 / 16, 2 / 3);



    }


    OnUpdate(delta: number): void {
  
        //throw new Error("Method not implemented.");

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