
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";

export class QUI_CustomRender extends QUI.QUI_BaseElement {
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_CustomRender;
    }
   
    OnCustomUpdate: ((delta: number) => void) | null = null;
    OnCustomRender: (() => void) | null = null;
    OnCustomTouch: ((touchid: number, press: boolean, move: boolean, x: number, y: number) => boolean) | null = null;

    OnRender(_canvas: QUI_Canvas): void {

        if (this.OnCustomRender != null) {

            let target = _canvas.batcherUI.getTarget();
            _canvas.batcherUI.EndDraw();

            this.OnCustomRender();

            _canvas.batcherUI.ResumeDraw();
        }
        super.OnRender(_canvas);
    }
    OnUpdate(_canvas: QUI_Canvas,delta: number): void {
        if (this.OnCustomUpdate != null) {
            this.OnCustomUpdate(delta);
        }
        super.OnUpdate(_canvas,delta);
    }
    OnTouch(_canvas: QUI_Canvas,touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        let kill = super.OnTouch(_canvas,touchid, press, move, x, y);
        if (kill)
            return true;

        if (this.OnCustomTouch != null) {
            return this.OnCustomTouch(touchid, press, move, x, y);
        }
        return false;

    }
}
