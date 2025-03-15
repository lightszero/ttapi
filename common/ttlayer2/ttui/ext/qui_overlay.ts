
import { QUI_Canvas, Rectangle } from "../../ttlayer2.js";
import * as QUI from "../qui_base.js"


//Over控件只是单纯的吃掉触摸事件，没别的功能
export class QUI_Overlay extends QUI.QUI_BaseElement {
    constructor() {
        super();
        this.localRect.setByRect(new Rectangle(0, 0, 100, 100));
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Overlay;
    }

    OnPress: () => void;

    ids: number[] = []
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {

        let kill = super.OnTouch(_canvas, touchid, press, move, x, y);
        if (kill) return true;

        //this.OnTouch_Impl();
        let rect = this.GetWorldRect();
        let x2 = rect.X + rect.Width;
        let y2 = rect.Y + rect.Height;

        //console.log("touch " + touchid + " press=" + press + " x=" + x + "y=" + y);
        //按下
        if (press == true && move == false) {
            if (x >= rect.X && x < x2 && y >= rect.Y && y < y2) {
                if (this.ids.indexOf(touchid) < 0)
                    this.ids.push(touchid);
                if (this.OnPress != null) {
                    _canvas.InvokeEvent(() => {
                        this.OnPress();
                    });
                }

                return true;
            }
        }
        //拖动
        if (press == true && move == true && this.ids.indexOf(touchid) >= 0) {

            return true;
        }
        if (press == false && this.ids.indexOf(touchid) >= 0) {
            let i = this.ids.indexOf(touchid);
            this.ids.splice(i, 1);
            return true;
        }
        return false;
    }

}