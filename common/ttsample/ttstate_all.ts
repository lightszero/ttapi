import { tt } from "../ttapi/ttapi.js";
import { DrawLayer_Canvas } from "../ttlayer2/pipeline/drawlayer_canvas.js";
import { DrawLayer_GUI } from "../ttlayer2/pipeline/drawlayer_gui.js";
import { Resources } from "../ttlayer2/resources/defaultres.js";
import { Border, Font, GameApp, IState, StateMgr, Vector2 } from "../ttlayer2/ttlayer2.js";
import { QUI_ImageScale9, QUI_Label, QUI_Scale9 } from "../ttui/ttui.js";

export class GContext {
    topuiview: DrawLayer_GUI;
    canvasview: DrawLayer_Canvas;
    font: Font;

}
export class TTState_All implements IState<any> {

    substatemgr: StateMgr<GContext>
    OnInit(): void {
        this.substatemgr = new StateMgr<GContext>(new GContext());
        let gl = tt.graphic.GetWebGL();
        let ct = this.substatemgr.GetContextObj();
        ct.topuiview = new DrawLayer_GUI();
        ct.topuiview.canvas.scale = 2.0;

        ct.canvasview = new DrawLayer_Canvas();
        GameApp.GetViewList().AddView(ct.topuiview);

        ct.font = new Font(gl, "VonwaonBitmap-16px", 32);//VonwaonBitmap-16px
        this.asyncinit(ct);
    }
    async asyncinit(context: GContext) {
        let grid = Resources.GetBorder2Block();
        let uiimg = new QUI_ImageScale9();
        uiimg.scale9 = new QUI_Scale9(grid, new Border(3, 3, 3, 3), 16, 16);
        context.topuiview.canvas.addChild(uiimg);

        uiimg.localRect.setHPosFill(0, 0);
        uiimg.localRect.setVPosFill(0, 0);

        let label = new QUI_Label(context.font, "中国Hello world");
        label.fontScale=new Vector2(0.5,0.5);
        context.topuiview.canvas.addChild(label);
        label.localRect.setHPosByLeftBorder(300, 64);
        label.localRect.setVPosByTopBorder(30, 128);


    }
    OnUpdate(delta: number): void {
        this.substatemgr.GetState()?.OnUpdate(delta);
    }
    OnExit(): void {
        this.substatemgr.GetState()?.OnExit();
    }
    OnResize(width: number, height: number): void {
        this.substatemgr.GetState()?.OnResize(width, height);
    }

    OnKey(keycode: string, press: boolean): void {
        this.substatemgr.GetState()?.OnKey(keycode, press);
    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {
        this.substatemgr.GetState()?.OnPointAfterGUI(id, x, y, press, move);
    }
}