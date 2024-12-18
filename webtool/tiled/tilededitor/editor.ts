import { tt } from "../ttapi/ttapi.js";
import { Color, DrawLayer_GUI, GameApp, IUserLogic, QUI_Canvas, Resources } from "../ttlayer2/ttlayer2.js";
import { HelpDialog } from "./helpdialog.js";

export class EditorApp implements IUserLogic {

    OnInit(): void {

        this.InitAsync();
    }
    layergui: DrawLayer_GUI;
    guicanvas:QUI_Canvas;
    async InitAsync() {
        //配置绘制层
        this.layergui = new DrawLayer_GUI();
        GameApp.GetViewList().AddDrawLayer(this.layergui);
        this.layergui.GetCamera().Scale = 2.0 * tt.graphic.getDevicePixelRadio();//增加像素感
        //this.layergui.GetCanvas().scale =2.0;//增加像素感

        this.guicanvas =this.layergui.GetCanvas();
        let border = Resources.CreateGUI_Border();
        this.guicanvas.addChild(border);

        let btn =Resources.CreateGUI_Button("Help",new Color(1,1,1,1));
        btn.localRect.setVPosByTopBorder(20,8);
        btn.localRect.setHPosByLeftBorder(100,100);
        this.guicanvas.addChild(btn);
        btn.OnClick=()=>
        {
            HelpDialog.Show(this.guicanvas);
            console.log("show");
        };
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