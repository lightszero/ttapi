import { tt } from "../ttapi/ttapi.js";
import { CanvasView } from "../ttlayer2/pipeline/canvasview.js";
import { GUIView } from "../ttlayer2/pipeline/guiview.js";
import { Font, GameApp, IState, StateMgr } from "../ttlayer2/ttlayer2.js";

export class GContext {
    topuiview: GUIView;
    canvasview: CanvasView;
    font: Font;

}
export class TTState_All implements IState<any> {

    substatemgr: StateMgr<GContext>
    OnInit(): void {
        this.substatemgr = new StateMgr<GContext>(new GContext());
        let gl = tt.graphic.GetWebGL();
        let ct = this.substatemgr.GetContextObj();
        ct.topuiview = new GUIView();
        ct.topuiview.canvas.scale = 4.0;

        ct.canvasview = new CanvasView();
        GameApp.GetViewList().AddView(ct.topuiview);

        ct.font = new Font(gl, "VonwaonBitmap-16px", 24);
        this.asyncinit();
    }
    async asyncinit() {

    }
    OnUpdate(delta: number): void {

    }
    OnExit(): void {

    }
    OnResize(width: number, height: number): void {

    }

    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }
}