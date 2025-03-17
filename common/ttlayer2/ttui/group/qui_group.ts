import { Color, Rectangle } from "../../ttlayer2.js";
import { QUI_BaseElement, QUI_Container, QUI_ElementType, QUI_HAlign } from "../qui_base.js";
import { QUI_Canvas, QUI_DragButton, QUI_Image, QUI_Label, QUI_Overlay, QUI_Panel, QUI_Resource } from "../ttui.js";

export class QUI_Group extends QUI_Panel {
    constructor() {
        super();
        this._border.XLeft = 2;
        this._border.XRight = 2;
        this._border.YTop = 17;
        this._border.YBottom = 2;

        let borderElement = this.foreElements[0];
        borderElement.localRect.offsetY1 = 15;


        let titleback = new QUI_Panel();
        titleback.getBorder().XLeft = 2;
        titleback.getBorder().XRight = 2;
        titleback.getBorder().YBottom = 2;
        titleback.getBorder().YTop = 2;
        titleback.localRect.setHPosFill();
        //titleback.localRect.radioX2 = 0.5;
        titleback.localRect.setVPosByTopBorder(16);
        this.foreElements.push(titleback);

        let overlay = new QUI_Overlay();
        // overlay.OnPress = () => {

        //     if (this.autoTop) {
        //         this._parent.ToTop(this);

        //     }

        // }
        this.backElements.push(overlay);
        let back = new QUI_Image();
        back.localColor = Color.Black;
        back.localRect.SetAsFill();
        this.backElements.push(back);



        // let img = new QUI_Image();
        // img.localColor = new Color(0.5, 0.5, 0.5, 1);
        // img.localRect.SetAsFill();
        //titleback.GetContainer().AddChild(img);


        let dbut = new QUI_DragButton();
        dbut.localRect.SetAsFill();
        titleback.GetContainer().AddChild(dbut);

        (dbut.ElemNormal as QUI_Container).RemoveChildAll();


        {
            let img = new QUI_Image();
            img.localColor = new Color(0.5, 0.5, 0.5, 1);
            img.localRect.SetAsFill();
            (dbut.ElemNormal as QUI_Container).AddChild(img);
        }
        {

            let title = this.title = new QUI_Label();
            title.text = "Group";
            title.localRect.SetAsFill();

            title.halign = QUI_HAlign.Left;
            title.fontScale.X *= 0.5;
            title.fontScale.Y *= 0.5;


            (dbut.ElemNormal as QUI_Container).AddChild(title);
        }


        dbut.OnDragStart = this.OnBeginDrag.bind(this);
        dbut.OnDrag = this.OnDrag.bind(this);

        this.dragEnable = false;
        this.autoTop = true;
    }

    dragEnable: boolean
    autoTop: boolean;
    title: QUI_Label

    private _posbeginx = 0;
    private _posbeginy = 0;

    private OnBeginDrag(x: number, y: number) {
        this._posbeginx = this.localRect.offsetX1;
        this._posbeginy = this.localRect.offsetY1;
        console.log("begin " + x + "," + y);
        if (this.dragEnable) {
            if (this.autoTop) {
                (this._parent as QUI_Container).ToTop(this);

            }
        }
    }
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        let kill = this.OnTouchFore(_canvas, touchid, press, move, x, y);

        if (!kill) {
            if (press == true && move == false) {
                let rectlimit = this.GetWorldRect();
                let x1 = rectlimit.X + this._border.XLeft;
                let y1 = rectlimit.Y + this._border.YTop;
                let x2 = rectlimit.X + rectlimit.Width - this._border.XRight;
                let y2 = rectlimit.Y + rectlimit.Height - this._border.YBottom;
                if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {

                }
                else {
                    //按下事件在panel限制只外，不往下传了
                    return false;
                }
            }
        }
        if (!kill) {
            kill = this._container.OnTouch(_canvas, touchid, press, move, x, y);
        }

        if (!kill) {
            kill = this.OnTouchBack(_canvas, touchid, press, move, x, y);
        }
        if (kill) {//group 拦截一下事件
            if (this.autoTop) {
                (this._parent as QUI_Container).ToTop(this);
            }

        }
        return kill;
    }
    private OnDrag(x: number, y: number, bx: number, by: number) {
        console.log("drag " + x + "," + y + "," + bx + "," + by);
        if (this.dragEnable) {
            let w = this.localRect.getWidth();
            let h = this.localRect.getHeight();
            let pw = this._parent.GetWorldRect().Width;
            let ph = this._parent.GetWorldRect().Height;
            let targetx = this._posbeginx + x - bx;
            let targety = this._posbeginy + y - by;

            //约束
            if (targetx > pw - w)
                targetx = pw - w;
            if (targetx < 0)
                targetx = 0;

            if (targety > ph - h)
                targety = ph - h;
            if (targety < 0)
                targety = 0;

            //保持尺寸
            this.localRect.setPos(targetx, targety);
            if (this.autoTop) {
                (this._parent as QUI_Container).ToTop(this);

            }
        }
    }

    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Group;
    }

}