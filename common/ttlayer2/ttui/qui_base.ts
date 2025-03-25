
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
    sizeonly: boolean;
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
    getWidth(): number {
        if (!this.sizeonly)
            throw "onlysizeonly can getwidth"
        return this.offsetX2 - this.offsetX1;
    }
    getHeight(): number {
        if (!this.sizeonly)
            throw "onlysizeonly can getheight"
        return this.offsetY2 - this.offsetY1;
    }
    setPos(x: number, y: number): void {
        if (!this.sizeonly)
            throw "onlysizeonly can setpos"
        let w = this.getWidth();
        let h = this.getHeight();
        this.offsetX1 = x;
        this.offsetY1 = y;
        this.offsetX2 = x + w;
        this.offsetY2 = y + h;
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
        this.sizeonly = false;
    }
    setBySize(width: number, height: number): void {
        this.radioX1 = 0;
        this.radioY1 = 0;
        this.radioX2 = 0;
        this.radioY2 = 0;
        this.offsetX1 = 0;
        this.offsetX2 = width;
        this.offsetY1 = 0;
        this.offsetY2 = height;
        this.sizeonly = true;
    }
    setByPosAndSize(x: number, y: number, width: number, height: number): void {
        this.radioX1 = 0;
        this.radioY1 = 0;
        this.radioX2 = 0;
        this.radioY2 = 0;
        this.offsetX1 = x;
        this.offsetX2 = x + width;
        this.offsetY1 = y;
        this.offsetY2 = y + height;
        this.sizeonly = true;
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
        this.sizeonly = true;
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
        this.sizeonly = false;
    }
    //将水平位置设置为右对齐（宽度，边界：右）
    setHPosByRightBorder(width: number, border: number = 0) {
        this.radioX1 = 1;
        this.radioX2 = 1;
        this.offsetX1 = -border - width;
        this.offsetX2 = -border;
        this.sizeonly = false;
    }
    //将水平位置设置为填充
    setHPosFill(borderLeft: number = 0, borderRight: number = 0) {
        this.radioX1 = 0;
        this.radioX2 = 1;
        this.offsetX1 = borderLeft;
        this.offsetX2 = -borderRight;
        this.sizeonly = false;
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
        this.sizeonly = false;
    }
    //将垂直位置设置为底对齐（高度，边界：底）
    setVPosByBottomBorder(height: number, border: number = 0) {
        this.radioY1 = 1;
        this.radioY2 = 1;
        this.offsetY1 = -border - height;
        this.offsetY2 = -border;
        this.sizeonly = false;
    }
    //将垂直位置设置为填充
    setVPosFill(borderTop: number = 0, borderBottom: number = 0) {
        this.radioY1 = 0;
        this.radioY2 = 1;
        this.offsetY1 = borderTop;
        this.offsetY2 = -borderBottom;
        this.sizeonly = false;
    }
}
export enum QUI_ElementType {
    Element_User,//User 类型控件
    Element_Canvas,
    //容器控件
    Element_Container,
    //自动调整显示比例，留白
    Element_ScreenFixer,

    //基础控件
    Element_CustomRender,//自定义渲染器
    Element_Image,//图片
    Element_Image_Scale9,//图片scale9
    Element_Label,//文本
    Element_Button,//按钮
    Element_DropButton,//专门接收抬起事件
    Element_Joystick,//摇杆组件
    Element_TouchBar,//触摸板组件
    Element_TextBox_Prompt,//文本对话框组件
    Element_TextBox_DOM,
    //扩展控件
    Element_DragButton,//可以拖动的按钮
    Element_Overlay,//占位，屏蔽事件
    Element_Toggle,//有两种状态的按钮组件
    Element_Bar,//表示进度的组件
    Element_ScrollBar,//滚动条组件
    Element_Grow,
    //面板
    Element_Panel,
    Element_Panel_Scroll,
    Element_Panel_Split,
    Element_Panel_Scroll_Unlimit,
    Element_Group,
}
// export interface QUI_IElement {
//     //输入时转换为target空间的坐标 * FinalScale
//     GetElementType(): QUI_ElementType

//     CancelTouch(): void;//取消事件

//     //return true 表示 消息被吞了
//     OnTouch(canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean
//     OnRender(canvas: QUI_Canvas): void
//     OnUpdate(canvas: QUI_Canvas, delta: number): void;

//     GetParent(): QUI_BaseElement | null;
//     IsContainer(): boolean
//     AsContainer(): QUI_Container
//     //当前组件的位置
//     localRect: QUI_Rect;

//     Enable: boolean; //组件是否活动
//     Tag: string | null;
//     //得到最终位置，考虑父组件
//     GetWorldRect(): Rectangle;
//     localColor: Color;
//     GetFinalColor(): Color;
// }
// export interface QUI_IContainer extends QUI_IElement {
//     GetChildCount(): number;
//     GetChild(index: number): QUI_IElement | null;
//     AddChild(elem: QUI_IElement): void
//     RemoveChild(elem: QUI_IElement): void
//     RemoveChildAll(): void;
//     RemoveChildAt(n: number): void;
// }

export abstract class QUI_BaseElement {
    static _id: number = 0;
    private _thisid: number = 0;
    constructor() {
        QUI_BaseElement._id++;
        this._thisid = QUI_BaseElement._id;
    }
    GetID(): number {
        return this._thisid;
    }
    abstract GetElementType(): QUI_ElementType;

    Tag: string | null = null;
    localRect: QUI_Rect = new QUI_Rect();
    _parent: QUI_BaseElement | null = null;
    GetParent(): QUI_BaseElement | null {
        return this._parent;
    }
    GetCanvas(): QUI_Canvas | null {
        if (this._parent == null) {
            if (this.GetElementType() == QUI_ElementType.Element_Canvas)
                return (this as QUI_BaseElement as QUI_Canvas);
            return null;
        }
        if (this._parent.GetElementType() == QUI_ElementType.Element_Canvas) {
            return this._parent as QUI_Canvas;
        }
        return this._parent.GetCanvas();
    }
    IsContainer(): boolean {
        return true;
    }
    // AsContainer(): QUI_Container {
    //     if (this.IsContainer())
    //         return this as any as QUI_Container;
    //     else
    //         return null;
    // }
    Enable: boolean = true;
    _colorFinal: Color = Color.White;

    //复合控件会调用，需要处理这个，否则在滚动panel 内 会出问题
    CancelTouch(): void {

    }
    OnTouch(canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        return false;
    }
    OnWheel(canvas:QUI_Canvas,dx:number,dy:number,dz:number):boolean
    {
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
    OnFocus() {

    }
    OnUnFocus() {

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


export enum ChildChangeState {
    NoChange,//无改变
    AddOne,//增加了一个
    Dirty,//改变太多，整体重刷吧
}
export abstract class QUI_BaseContainer extends QUI_BaseElement {
    constructor() {
        super();
        this.localRect.SetAsFill();
    }
    protected _children: QUI_BaseElement[];

    GetChildCount(): number {
        return this._children == null ? 0 : this._children.length;
    }
    ToTop(elem: QUI_BaseElement): void {
        this.RemoveChild(elem);
        this.AddChild(elem);
    }
    GetChild(index: number): QUI_BaseElement | null {
        if (this._children == null || index >= this._children.length)
            return null;
        return this._children[index];
    }
    GetChildAt(elem: QUI_BaseElement): number {
        if (elem == null)
            return -1;
        return this._children.indexOf(elem);
    }
    AddChild(elem: QUI_BaseElement): void {

        if (this._children == null)
            this._children = [];
        if (this._children.indexOf(elem) >= 0)
            return;

        //移除旧爹
        let p = (elem as QUI_BaseElement)._parent;
        if (p != null)
            (p as QUI_BaseContainer).RemoveChild(p);

        this._children.push(elem);
        if (this.childState == ChildChangeState.NoChange) {
            this.childState = ChildChangeState.AddOne;
        }
        else {
            this.childState = ChildChangeState.Dirty;
        }
        //换新爹
        (elem as QUI_BaseElement)._parent = this;
    }
    RemoveChild(elem: QUI_BaseElement): void {
        if (this._children == null)
            return;
        let i = this._children.indexOf(elem);
        if (i < 0)
            return;

        this._children.splice(i, 1);

        (elem as QUI_BaseElement)._parent = null;
        this.childState = ChildChangeState.Dirty;
    }
    RemoveChildAt(index: number): void {
        if (this._children == null)
            return;
        let elem = this._children[index];
        this._children.splice(index, 1);
        (elem as QUI_BaseElement)._parent = null;
        this.childState = ChildChangeState.Dirty;
    }

    RemoveChildAll(): void {
        if (this._children == null)
            return;
        for (var i = 0; i < this._children.length; i++) {
            //移除 旧爹
            let elem = this._children[i];
            (elem as QUI_BaseElement)._parent = null;
        }
        this._children.splice(0, this._children.length);
        this.childState = ChildChangeState.Dirty;
    }


    protected childState: ChildChangeState = ChildChangeState.NoChange;

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
    OnWheel(canvas:QUI_Canvas,dx:number,dy:number,dz:number):boolean
    {
        
        if (this._children != null) {
            for (var i = this._children.length - 1; i >= 0; i--) {
                let child = this._children[i];
                if (child.Enable) {
                    let kill = child.OnWheel(canvas, dx,dy,dz);
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

    protected _picked: QUI_BaseElement;
    GetPicked(): QUI_BaseElement {
        return this._picked;
    }

    Pick(pick: QUI_BaseElement) {
        if (this._picked == pick)
            return;
        this._picked?.OnUnFocus();
        this._picked = pick;
        this._picked?.OnFocus();
    }
    PickAt(index: number) {
        this.Pick(this._children[index]);
    }
    UnPick(): void {
        this._picked?.OnUnFocus();
        this._picked = null;
    }
}

export class QUI_Container extends QUI_BaseContainer
{

    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Container;
    }    
}