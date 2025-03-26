import { Color, QUI_BaseContainer, QUI_ElementType, QUI_HAlign, QUI_Image, QUI_Label, QUI_Overlay } from "../../ttlayer2/ttlayer2.js";
export class PickItem extends QUI_BaseContainer {
    constructor(context) {
        super();
        this.localRect.setBySize(500, 25);
        let ol = new QUI_Overlay();
        this.AddChild(ol);
        ol.OnPress = () => {
            this._parent.Pick(this);
        };
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
        label.text = "pickable";
        label.halign = QUI_HAlign.Left;
        //this.contextPanel.container().AddChild(con);
        this.AddChild(label);
        this.context = context;
    }
    GetElementType() {
        return QUI_ElementType.Element_User;
    }
    OnFocus() {
        this.imageback.localColor = new Color(0.3, 0.4, 0.9, 1);
        this.label.localColor = new Color(0.9, 0.9, 0.3, 1);
    }
    OnUnFocus() {
        this.imageback.localColor.A = 0;
        this.label.localColor = Color.White;
    }
}
export class CheckItem extends QUI_BaseContainer {
    constructor(context) {
        // 构造函数，传入一个上下文参数
        super();
        this.checked = false;
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
        };
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
        label.text = "pickable";
        // 将QUI_Label对象的text属性设置为"pickable"
        label.halign = QUI_HAlign.Left;
        //this.contextPanel.container().AddChild(con);
        this.AddChild(label);
        this.context = context;
        // 将传入的上下文参数赋值给当前对象的context属性
    }
    GetElementType() {
        return QUI_ElementType.Element_User;
    }
    OnFocus() {
        this.imageback.localColor = new Color(0.3, 0.4, 0.9, 1);
        this.label.localColor = new Color(0.9, 0.9, 0.3, 1);
    }
    OnUnFocus() {
        this.imageback.localColor.A = 0;
        this.label.localColor = Color.White;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2l0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaWNraXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0SSxNQUFNLE9BQU8sUUFBWSxTQUFRLGlCQUFpQjtJQUM5QyxZQUFZLE9BQVU7UUFDbEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ2IsSUFBSSxDQUFDLE9BQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQTtRQUVELDZEQUE2RDtRQUM3RCw0Q0FBNEM7UUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG9EQUFvRDtRQUNwRCx3QkFBd0I7UUFDeEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFF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