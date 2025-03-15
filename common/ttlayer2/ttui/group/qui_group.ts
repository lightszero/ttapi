import { Color, Rectangle } from "../../ttlayer2.js";
import { QUI_ElementType, QUI_HAlign } from "../qui_base.js";
import { QUI_Canvas } from "../qui_canvas.js";
import { QUI_DragButton, QUI_Image, QUI_Label, QUI_Panel, QUI_Resource } from "../ttui.js";

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




        // let img = new QUI_Image();
        // img.localColor = new Color(0.5, 0.5, 0.5, 1);
        // img.localRect.SetAsFill();
        //titleback.GetContainer().AddChild(img);


        let dbut = new QUI_DragButton();
        dbut.localRect.SetAsFill();
        titleback.GetContainer().AddChild(dbut);

        dbut.ElemNormal.GetContainer().RemoveChildAll();


        {
            let img = new QUI_Image();
            img.localColor = new Color(0.5, 0.5, 0.5, 1);
            img.localRect.SetAsFill();
            dbut.ElemNormal.GetContainer().AddChild(img);
        }
        {

            let title = this.title = new QUI_Label();
            title.text = "group";
            title.localRect.SetAsFill();

            title.halign = QUI_HAlign.Left;
            title.fontScale.X *= 0.5;
            title.fontScale.Y *= 0.5;


            dbut.ElemNormal.GetContainer().AddChild(title);
        }


        dbut.OnDragStart = this.OnBeginDrag.bind(this);
        dbut.OnDrag = this.OnDrag.bind(this);
    }
    posbeginx = 0;
    posbeginy = 0;

    private OnBeginDrag(x: number, y: number) {
        this.posbeginx = this.localRect.offsetX1;
        this.posbeginy = this.localRect.offsetY1;
        console.log("begin " + x + "," + y);
    }
    private OnDrag(x: number, y: number, bx: number, by: number) {
        console.log("drag " + x + "," + y + "," + bx + "," + by);
        if (this.DragEnable) {
            let w = this.localRect.offsetX2 - this.localRect.offsetX1;
            let h = this.localRect.offsetY2 - this.localRect.offsetY1;
            let pw = this._parent.GetWorldRect().Width;
            let ph = this._parent.GetWorldRect().Height;
            this.localRect.offsetX1 = this.posbeginx + x - bx;
            this.localRect.offsetY1 = this.posbeginy + y - by;

            //约束
            if (this.localRect.offsetX1 > pw - w)
                this.localRect.offsetX1 = pw - w;
            if (this.localRect.offsetX1 < 0)
                this.localRect.offsetX1 = 0;

            if (this.localRect.offsetY1 > ph - h)
                this.localRect.offsetY1 = ph - h;
            if (this.localRect.offsetY1 < 0)
                this.localRect.offsetY1 = 0;

            //保持尺寸
            this.localRect.offsetX2 = this.localRect.offsetX1 + w;
            this.localRect.offsetY2 = this.localRect.offsetY1 + h;
        }
    }
    DragEnable: boolean
    title: QUI_Label
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Group;
    }

}