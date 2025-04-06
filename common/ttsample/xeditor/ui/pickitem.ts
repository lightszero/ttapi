import { Color, QUI_BaseContainer, QUI_ElementType, QUI_HAlign, QUI_Image, QUI_Label, QUI_Overlay } from "../../../ttlayer2/ttlayer2.js";

export class PickItem<T> extends QUI_BaseContainer {
    constructor(context: T) {
        super();
        this.localRect.setBySize(500, 25);
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
        img.keepAspect = true;
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

export class CheckItem<T> extends QUI_BaseContainer {
    constructor(context: T) {
        // 构造函数，传入一个上下文参数
        super();
        // 调用父类的构造函数
        let ol = new QUI_Overlay();
        // 创建一个QUI_Overlay对象
        this.AddChild(ol);
        // 将QUI_Overlay对象添加到当前对象中
        ol.OnPress = () => {
            // 当QUI_Overlay对象被按下时，执行以下操作
            this.checked = !this.checked;
            // 将当前对象的checked属性取反
            if (this.checked)
                this.OnFocus();
            else
                this.OnUnFocus();
        }

        // let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
        // if (ext == ".jpg" || ext == ".png") {this
        let imgback = this.imageback = new QUI_Image();
        // 创建一个QUI_Image对象，并将其赋值给当前对象的imageback属性
        imgback.localRect.SetAsFill();
        // 将QUI_Image对象的localRect属性设置为填充
        this.AddChild(imgback);
        // 将QUI_Image对象添加到当前对象中
        imgback.localColor.A = 0;

        let img = this.image = new QUI_Image();
        img.keepAspect = true;
        //let tex = await this.LoadFileToTexture(result[i]);
        //img.SetByTexture(tex);
        // 将QUI_Image对象的localRect属性设置为指定位置和大小
        img.localRect.setByPosAndSize(0, 0, 24, 24);
        // 将QUI_Image对象的sprite属性设置为null
        img.sprite = null;
        this.AddChild(img);
        //}
        let label = this.label = new QUI_Label();
        // 创建一个QUI_Label对象，并将其赋值给当前对象的label属性
        label.localRect.SetAsFill();

        label.localRect.offsetX1 = 25;
        // 将QUI_Label对象的localRect属性向右偏移25个像素
        label.text = "pickable"
        // 将QUI_Label对象的text属性设置为"pickable"
        label.halign = QUI_HAlign.Left;
        //this.contextPanel.container().AddChild(con);
        this.AddChild(label);

        this.context = context;
        // 将传入的上下文参数赋值给当前对象的context属性
    }
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_User
    }
    context: T
    image: QUI_Image;
    imageback: QUI_Image;
    label: QUI_Label;

    checked: boolean = false;
    OnFocus(): void {
        this.imageback.localColor = new Color(0.3, 0.4, 0.9, 1);
        this.label.localColor = new Color(0.9, 0.9, 0.3, 1);
    }
    OnUnFocus(): void {
        this.imageback.localColor.A = 0;
        this.label.localColor = Color.White
    }
}