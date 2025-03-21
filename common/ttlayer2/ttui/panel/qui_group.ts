import { Color, Rectangle } from "../../ttlayer2.js";
import { QUI_BaseElement, QUI_Container, QUI_ElementType, QUI_HAlign } from "../qui_base.js";
import { QUI_Canvas, QUI_DragButton, QUI_Image, QUI_Label, QUI_Overlay, QUI_Panel, QUI_Resource } from "../ttui.js";


//Group 就是一个单纯的带title的Panel
export class QUI_Group extends QUI_Panel {
    constructor() {
        super();
        this._border.XLeft = 2;
        this._border.XRight = 2;
        this._border.YTop = 17;
        this._border.YBottom = 2;

        let borderElement = this.foreElements[0];
        borderElement.localRect.offsetY1 = 15;


        let titleback = this.titleback = new QUI_Panel();
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


    }

    title: QUI_Label
    titleback: QUI_Panel;


    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Group;
    }


}