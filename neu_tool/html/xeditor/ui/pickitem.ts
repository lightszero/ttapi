import { Color, QUI_BaseContainer, QUI_ElementType, QUI_HAlign, QUI_Image, QUI_Label, QUI_Overlay } from "../../ttlayer2/ttlayer2.js";

export class PickAbleItem<T> extends QUI_BaseContainer {
    constructor(context: T) {
        super();
        let ol = new QUI_Overlay();
        this.AddChild(ol);
        ol.OnPress = () => {
            (this._parent as QUI_BaseContainer).Pick(this);
        }

        // let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
        // if (ext == ".jpg" || ext == ".png") {this
        let imgback = this.imageback = new QUI_Image();
        imgback.localRect.SetAsFill();
        this.AddChild(imgback);
        imgback.localColor.A = 0;

        let img = this.image = new QUI_Image();
        //let tex = await this.LoadFileToTexture(result[i]);
        //img.SetByTexture(tex);
        img.localRect.setByPosAndSize(0, 0, 24, 24);
        img.sprite = null;
        this.AddChild(img);
        //}
        let label = this.label = new QUI_Label();
        label.localRect.SetAsFill();

        label.localRect.offsetX1 = 25;
        label.text = "pickable"
        label.halign = QUI_HAlign.Left;
        //this.contextPanel.container().AddChild(con);
        this.AddChild(label);

        this.context = context;
    }
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_User
    }
    context: T
    image: QUI_Image;
    imageback: QUI_Image;
    label: QUI_Label;

    OnFocus(): void {
        this.imageback.localColor = new Color(0.3, 0.4, 0.9, 1);
        this.label.localColor = new Color(0.9, 0.9, 0.3, 1);
    }
    OnUnFocus(): void {
        this.imageback.localColor.A = 0;
        this.label.localColor = Color.White
    }
}