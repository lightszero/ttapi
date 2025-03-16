import { Color, Rectangle } from "../../ttlayer2.js";
import { QUI_ElementType, QUI_HAlign } from "../qui_base.js";
import { QUI_DragButton, QUI_Image, QUI_Label, QUI_Panel } from "../ttui.js";

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

        dbut.ElemNormal.AsContainer().RemoveChildAll();


        {
            let img = new QUI_Image();
            img.localColor = new Color(0.5, 0.5, 0.5, 1);
            img.localRect.SetAsFill();
            dbut.ElemNormal.AsContainer().AddChild(img);
        }
        {

            let title = this.title = new QUI_Label();
            title.text = "Group";
            title.localRect.SetAsFill();

            title.halign = QUI_HAlign.Left;
            title.fontScale.X *= 0.5;
            title.fontScale.Y *= 0.5;


            dbut.ElemNormal.AsContainer().AddChild(title);
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
            let w = this.localRect.getWidth();
            let h = this.localRect.getHeight();
            let pw = this._parent.GetWorldRect().Width;
            let ph = this._parent.GetWorldRect().Height;
            let targetx = this.posbeginx + x - bx;
            let targety = this.posbeginy + y - by;

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
        }
    }
    DragEnable: boolean
    title: QUI_Label
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Group;
    }

}