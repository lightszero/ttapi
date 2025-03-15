
import { QUI_Canvas } from "./qui_canvas.js";
import { Color, Rectangle } from "../ttlayer2.js";
//开发一个简洁的UI系统
export enum QUI_DragDriection {
    None,
    LeftToRight,
    UpToDown,
    Both,
}
export enum QUI_Direction {
    LeftToRight,
    UpToDown,
    RightToLeft,
    DownToUp,
}
export enum QUI_Direction2 {
    Horizontal,
    Vertical,
}
export enum QUI_HAlign {
    Left,
    Middle,
    Right,
}
export enum QUI_VAlign {
    Top,
    Middle,
    Bottom,
}
export class QUI_Rect {//相对父结构的位置，百分比，
    radioX1: number;
    radioY1: number;
    radioX2: number;
    radioY2: number;
    //相对父结构的偏移
    offsetX1: number;
    offsetY1: number;
    offsetX2: number;
    offsetY2: number;
    Clone(): QUI_Rect {
        let nr = new QUI_Rect();
        nr.radioX1 = this.radioX1;
        nr.radioX2 = this.radioX2;
        nr.radioY1 = this.radioY1;
        nr.radioY2 = this.radioY2;
        nr.offsetX1 = this.offsetX1;
        nr.offsetX2 = this.offsetX2;
        nr.offsetY1 = this.offsetY1;
        nr.offsetY2 = this.offsetY2;
        return nr;
    }
    getFinalRect(parentFinal: Rectangle): Rectangle {
        let px1 = parentFinal.X;
        let px2 = parentFinal.X + parentFinal.Width;
        let py1 = parentFinal.Y;
        let py2 = parentFinal.Y + parentFinal.Height;
        let x1 = px1 + this.radioX1 * (px2 - px1) + this.offsetX1;
        let y1 = py1 + this.radioY1 * (py2 - py1) + this.offsetY1;
        let x2 = px1 + this.radioX2 * (px2 - px1) + this.offsetX2;
        let y2 = py1 + this.radioY2 * (py2 - py1) + this.offsetY2;
        let r = new Rectangle(x1, y1, x2 - x1, y2 - y1);
        return r;
    }
    getFinalRectScale(parentFinal: Rectangle, scale: number): Rectangle {
        let px1 = parentFinal.X;
        let px2 = parentFinal.X + parentFinal.Width;
        let py1 = parentFinal.Y;
        let py2 = parentFinal.Y + parentFinal.Height;
        let x1 = (px1 + this.radioX1 * (px2 - px1) + this.offsetX1) * scale;
        let y1 = (py1 + this.radioY1 * (py2 - py1) + this.offsetY1) * scale;
        let x2 = (px1 + this.radioX2 * (px2 - px1) + this.offsetX2) * scale;
        let y2 = (py1 + this.radioY2 * (py2 - py1) + this.offsetY2) * scale;
        let r = new Rectangle(x1, y1, x2 - x1, y2 - y1);
        return r;
    }
    //按照填充模式设置控件位置
    SetAsFill(): void {
        // 该函数等价于
        // this.setHPosFill(0,0);
        // this.setVPosFill(0,0);
        this.radioX1 = 0;
        this.radioY1 = 0;
        this.radioX2 = 1;
        this.radioY2 = 1;
        this.offsetX1 = 0;
        this.offsetX2 = 0;
        this.offsetY1 = 0;
        this.offsetY2 = 0;
    }
    //按照左上角定位模式设置控件位置&尺寸
    setByRect(rect: Rectangle): void {
        // 该函数等价于
        // this.setHPosByLeftBorder(rect.Width,rect.X);
        // this.setVPosByTopBorder(rect.Height,rect.Y);
        this.radioX1 = 0;
        this.radioY1 = 0;
        this.radioX2 = 0;
        this.radioY2 = 0;
        this.offsetX1 = rect.X;
        this.offsetX2 = rect.X + rect.Width;
        this.offsetY1 = rect.Y;
        this.offsetY2 = rect.Y + rect.Height;
    }
    //将水平位置设置为左对齐（宽度，边界：左）
    setHPosByLeftBorder(width: number, border: number = 0) {
        this.radioX1 = 0;
        this.radioX2 = 0;
        this.offsetX1 = border
        this.offsetX2 = border + width;
    }
    //将水平位置设置为居中（宽度）
    setHPosByCenter(width: number) {
        this.radioX1 = 0.5;
        this.radioX2 = 0.5;
        this.offsetX1 = width * -0.5
        this.offsetX2 = width * 0.5
    }
    //将水平位置设置为右对齐（宽度，边界：右）
    setHPosByRightBorder(width: number, border: number = 0) {
        this.radioX1 = 1;
        this.radioX2 = 1;
        this.offsetX1 = -border - width;
        this.offsetX2 = -border;
    }
    //将水平位置设置为填充
    setHPosFill(borderLeft: number = 0, borderRight: number = 0) {
        this.radioX1 = 0;
        this.radioX2 = 1;
        this.offsetX1 = borderLeft;
        this.offsetX2 = -borderRight;
    }
    //将垂直位置设置为顶对齐（高度，边界：顶）
    setVPosByTopBorder(height: number, border: number = 0) {
        this.radioY1 = 0;
        this.radioY2 = 0;
        this.offsetY1 = border
        this.offsetY2 = border + height;
    }
    //将垂直位置设置为居中（高度）
    setVPosByCenter(height: number) {
        this.radioY1 = 0.5;
        this.radioY2 = 0.5;
        this.offsetY1 = height * -0.5
        this.offsetY2 = height * 0.5
    }
    //将垂直位置设置为底对齐（高度，边界：底）
    setVPosByBottomBorder(height: number, border: number = 0) {
        this.radioY1 = 1;
        this.radioY2 = 1;
        this.offsetY1 = -border - height;
        this.offsetY2 = -border;
    }
    //将垂直位置设置为填充
    setVPosFill(borderTop: number = 0, borderBottom: number = 0) {
        this.radioY1 = 0;
        this.radioY2 = 1;
        this.offsetY1 = borderTop;
        this.offsetY2 = -borderBottom;
    }
}
export enum QUI_ElementType {
    Element_Canvas,
    //基本控件
    Element_Container,
    Element_Container_AutoFill,

    Element_RenderContainer,
    Element_Image,
    Element_Image_Scale9,
    Element_Label,
    Element_Button,
    Element_DropButton,//专门接收抬起事件
    Element_Joystick,
    Element_TouchBar,
    Element_TextBox_Prompt,
    //扩展控件
    Element_DragButton,
    Element_Overlay,
    Element_Toggle,
    Element_Bar,
    Element_ScrollBar,
    //面板
    Element_Panel,
    Element_Panel_Scroll,
    Element_Panel_Split,
    Element_Panel_Scroll_Unlimit,
    Element_Group,
}
export interface QUI_IElement {
    //输入时转换为target空间的坐标 * FinalScale
    GetElementType(): QUI_ElementType

    CancelTouch(): void;//取消事件

    //return true 表示 消息被吞了
    OnTouch(canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean
    OnRender(canvas: QUI_Canvas): void
    OnUpdate(canvas: QUI_Canvas, delta: number): void;

    GetParent(): QUI_IElement | null;
    GetContainer(): QUI_IContainer
    //当前组件的位置
    localRect: QUI_Rect;

    Enable: boolean; //组件是否活动
    Tag: string | null;
    //得到最终位置，考虑父组件
    GetWorldRect(): Rectangle;
    localColor: Color;
    GetFinalColor(): Color;
}
export interface QUI_IContainer {
    GetChildCount(): number;
    GetChild(index: number): QUI_IElement | null;
    AddChild(elem: QUI_IElement): void
    RemoveChild(elem: QUI_IElement): void
    RemoveChildAll(): void;
    RemoveChildAt(n: number): void;
}

export abstract class QUI_BaseElement implements QUI_IElement {
    abstract GetElementType(): QUI_ElementType;

    Tag: string | null = null;
    localRect: QUI_Rect = new QUI_Rect();
    _parent: QUI_IElement | null = null;
    GetParent(): QUI_IElement | null {
        return this._parent;
    }
    GetContainer(): QUI_IContainer {
        return null;
    }
    Enable: boolean = true;
    _colorFinal: Color = Color.White;

    CancelTouch(): void {

    }
    OnTouch(canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        return false;
    }
    OnRender(canvas: QUI_Canvas): void {

    }
    OnUpdate(canvas: QUI_Canvas, delta: number): void {
        if (this._parent == null) {
            this._colorFinal = this.localColor;
        }
        else {
            this._colorFinal = Color.Mul(this._parent.GetFinalColor(), this.localColor)
        }

    }

    //当前组件的位置

    localColor: Color = Color.White;
    GetFinalColor(): Color {
        return this._colorFinal;
    }
    //得到最终位置，考虑父组件
    GetWorldRect(): Rectangle {
        if (this._parent == null) {
            let x1 = this.localRect.offsetX1;
            let y1 = this.localRect.offsetY1;
            let x2 = this.localRect.offsetX2;
            let y2 = this.localRect.offsetY2;
            return new Rectangle(x1, y1, x2 - x1, y2 - y1);
        }
        else {
            let pw = this._parent.GetWorldRect();
            return this.localRect.getFinalRect(pw);
        }
    }
    getWorldRectScale(scale: number): Rectangle {
        if (this._parent == null) {
            let x1 = this.localRect.offsetX1 * scale;
            let y1 = this.localRect.offsetY1 * scale;
            let x2 = this.localRect.offsetX2 * scale;
            let y2 = this.localRect.offsetY2 * scale;
            return new Rectangle(x1, y1, (x2 - x1), y2 - y1);
        }
        else {
            let pw = this._parent.GetWorldRect();
            return this.localRect.getFinalRectScale(pw, scale);
        }
    }
}



export class QUI_Container extends QUI_BaseElement implements QUI_IContainer {
    constructor() {
        super();
    }
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Container;
    }
    GetContainer(): QUI_IContainer {
        return this;
    }

    protected _children: QUI_IElement[];

    GetChildCount(): number {
        return this._children == null ? 0 : this._children.length;
    }
    GetChild(index: number): QUI_IElement | null {
        if (this._children == null || index >= this._children.length)
            return null;
        return this._children[index];
    }
    AddChild(elem: QUI_IElement): void {

        if (this._children == null)
            this._children = [];
        if (this._children.indexOf(elem) >= 0)
            return;

        //移除旧爹
        let p = (elem as any)._parent as QUI_IElement;
        if (p != null)
            p.GetContainer().RemoveChild(p);

        this._children.push(elem);

        //换新爹
        (elem as any)._parent = this;
    }
    RemoveChild(elem: QUI_IElement): void {
        if (this._children == null)
            return;
        let i = this._children.indexOf(elem);
        if (i < 0)
            return;
        this._children.splice(i, 1);
        (elem as any)._parent = null;
    }
    removeChildAt(index: number): void {
        if (this._children == null)
            return;
        this._children.splice(index, 1);
    }

    RemoveChildAll(): void {
        if (this._children == null)
            return;
        for (var i = 0; i < this._children.length; i++) {
            //移除 旧爹
            let elem = this._children[i];
            (elem as any)._parent = null;
        }
        this._children.splice(0, this._children.length);
    }

    RemoveChildAt(n: number): void {
        if (this._children == null)
            return;
        for (var i = n; i < this._children.length; i++) {
            //移除 旧爹
            let elem = this._children[i];
            (elem as any)._parent = null;
        }
        this._children.splice(n);
    }

    //处理container

    CancelTouch(): void {
        if (this._children != null) {
            for (var i = this._children.length - 1; i >= 0; i--) {
                let child = this._children[i];
                if (child.Enable) {
                    child.CancelTouch();
                }
            }
        }
    }
    OnTouch(canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {

        if (this._children != null) {
            for (var i = this._children.length - 1; i >= 0; i--) {
                let child = this._children[i];
                if (child.Enable) {
                    let kill = child.OnTouch(canvas, touchid, press, move, x, y);
                    if (kill)
                        return true;
                }
            }
        }
        return false;
    }
    OnRender(canvas: QUI_Canvas): void {

        if (this._children == null)
            return;
        {
            for (var i = 0; i < this._children.length; i++) {
                let child = this._children[i];
                if (child.Enable) {
                    child.OnRender(canvas);
                }
            }
        }
    }
    OnUpdate(canvas: QUI_Canvas, delta: number): void {

        super.OnUpdate(canvas, delta);
        if (this._children == null)
            return;
        for (var i = 0; i < this._children.length; i++) {
            let child = this._children[i];
            if (child.Enable) {
                child.OnUpdate(canvas, delta);
            }
        }
    }

}