
import { Color, QUI_Container, QUI_ImageScale9, QUI_Label, QUI_Resource, Rectangle } from "../../ttlayer2.js";
import * as QUI from "../qui_base.js"
import { QUI_Canvas } from "../qui_canvas.js";


export class QUI_DragButton extends QUI.QUI_BaseElement {
    constructor() {
        super();
        this.localRect.setByRect(new Rectangle(0, 0, 100, 100));
        this.colorNormal = Color.White;
        this.colorPress = new Color(0.9, 0.9, 0.3, 1);

        let normal = new QUI_Container();

        {
            normal.localRect.SetAsFill();
            let normalback = QUI_Resource.CreateGUI_Border();
            normal.AsContainer().AddChild(normalback);
            normalback.color = new Color(1, 1, 1, 1);
            normalback.localRect.SetAsFill();

            let txt = new QUI_Label();

            txt.localRect.SetAsFill();
            txt.text = "DragBtn";
            normal.AsContainer().AddChild(txt)

            
        }
        this.ElemNormal = normal;
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_DragButton;
    }

    ElemNormal: QUI.QUI_BaseElement | null = null;
    colorNormal: Color;
    colorPress: Color;
    private press: boolean = false;
    private pressid: number = -1;
    private dragX: number;
    private dragY: number;
    private dragOX: number;
    private dragOY: number;
    OnDragStart: ((x: number, y: number) => void) | null = null;
    OnDrag: ((x: number, y: number, beginx: number, beginy: number) => void) | null = null;
    OnDragEnd: ((x: number, y: number) => void) | null = null;
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {

        let kill = super.OnTouch(_canvas, touchid, press, move, x, y);
        if (kill) return true;

        //this.OnTouch_Impl();
        let rect = this.GetWorldRect();
        let x1 = rect.X;
        let y1 = rect.Y;
        let x2 = rect.X + rect.Width;
        let y2 = rect.Y + rect.Height;

        //自动转换到绝对定位
        // let prect = this.getParent().getWorldRect();
        // rect.X -= prect.X;
        // rect.Y -= prect.Y;
        // this.localRect.setByRect(rect);

        //console.log("touch " + touchid + " press=" + press + " x=" + x + "y=" + y);
        //按下
        if (this.press == false && press == true && move == false) {
            if (x >= x1 && x < x2 && y >= y1 && y < y2) {
                this.press = true;
                this.pressid = touchid;

                this.dragX = x;
                this.dragY = y;
                this.dragOX = this.localRect.offsetX1;
                this.dragOY = this.localRect.offsetY1;
                if (this.OnDragStart != null) {
                    _canvas.InvokeEvent(() => {
                        this.OnDragStart(x, y);
                    })
                }

                return true;
            }
        }
        //拖动
        if (this.press == true && press == true && this.pressid == touchid) {

            // var xadd = x - this.dragX;
            // var yadd = y - this.dragY;
            // this.localRect.offsetX1 = this.dragOX + xadd;
            // this.localRect.offsetY1 = this.dragOY + yadd;
            // this.localRect.offsetX2 = this.localRect.offsetX1 + rect.Width;
            // this.localRect.offsetY2 = this.localRect.offsetY1 + rect.Height;
            if (this.OnDrag != null) {
                _canvas.InvokeEvent(() => {
                    this.OnDrag(x, y, this.dragX, this.dragY);
                });

            }

            return true;
        }
        //释放
        if (this.press == true && press == false && this.pressid == touchid) {
            this.press = false;
            this.pressid = -1;
            if (this.OnDragEnd != null) {
                _canvas.InvokeEvent(() => {
                    this.OnDragEnd(x, y);
                });
            }

            // if (x >= x1 && x < x2 && y >= y1 && y < y2) {
            //     // if (this.OnClick != null) {
            //     //     // if (x >= rect.X && x < x2 && y >= rect.Y && y < y2) {
            //     //     this.OnClick();
            //     //     //return true;
            //     //     //}
            //     // }


            // }
            return true;
        }
        return false;
    }
    OnRender(_canvas: QUI_Canvas): void {


        //this.Render_impl();

        if (this.ElemNormal != null) {
            (this.ElemNormal as any)._parent = this;
            this.ElemNormal.OnRender(_canvas)
        }


        super.OnRender(_canvas);
    }
    OnUpdate(_canvas: QUI_Canvas, delta: number): void {
        // //自动转换到绝对定位
        // let rect = this.getWorldRect();
        // let prect = this.getParent().getWorldRect();
        // rect.X -= prect.X;
        // rect.Y -= prect.Y;
        // this.localRect.setByRect(rect);

        if (this.press) {
            if (this.ElemNormal != null) {
                this.ElemNormal.localColor = this.colorPress;
                this.ElemNormal.OnUpdate(_canvas, delta)
            }
        }
        else {
            if (this.ElemNormal != null) {
                this.ElemNormal.localColor = this.colorNormal;
                this.ElemNormal.OnUpdate(_canvas, delta)
            }
        }


    }
}