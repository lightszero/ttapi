import { Color, QUI_BaseContainer, QUI_ElementType, QUI_HAlign, QUI_Image, QUI_Label, QUI_Overlay } from "../../ttlayer2/ttlayer2.js";
export class PickItem extends QUI_BaseContainer {
    constructor(context) {
        super();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2l0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaWNraXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0SSxNQUFNLE9BQU8sUUFBWSxTQUFRLGlCQUFpQjtJQUM5QyxZQUFZLE9BQVU7UUFDbEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLEVBQUUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFBO1FBRUQsNkRBQTZEO1FBQzdELDRDQUE0QztRQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDdkMsb0RBQW9EO1FBQ3BELHdCQUF3QjtRQUN4QixHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFD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