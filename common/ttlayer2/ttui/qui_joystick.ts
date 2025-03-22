import { tt } from "../../ttapi/ttapi.js";
import { Color, Rectangle, Sprite, Vector2 } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";

//摇杆控件
export class QUI_JoyStick extends QUI.QUI_BaseElement {
    constructor() {
        super();
        this.localRect.SetAsFill();
    }
    GetElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_Joystick;
    }



    spriteJoyBack: Sprite | null;
    spriteJoyHot: Sprite | null;
    //touchArea: Rectangle = new Rectangle(100, 100, 320, 320);//整体可触碰区域


    touchBackSize: Vector2 = new Vector2(160, 160);//背景图大小
    private _touchBackPoint: Vector2 = new Vector2(100, 100);//背景区中心点

    touchHotSize: Vector2 = new Vector2(160, 160);//热点图尺寸
    hotMaxDist: number = 100;
    private _touchHotPoint: Vector2 = new Vector2(100, 100);//触摸区中心点
    GetTouchDirection(): Vector2 | null {
        if (this._press == false)
            return null;
        else {
            let dec = new Vector2(
                (this._touchHotPoint.X - this._touchBackPoint.X) / this.hotMaxDist,
                (this._touchHotPoint.Y - this._touchBackPoint.Y) / this.hotMaxDist
            )
            return dec;
        }
    }

    color: Color = Color.White;
    private _press: boolean = false;
    private _pressid: number = 0;
    OnRender(_canvas: QUI_Canvas): void {

        let sw = this.GetWorldRect();
        //this.touchBackSize.X = sw.Width;
        //this.touchBackSize.Y = sw.Height;
        //this.Render_impl();
        if (this._press) {
            if (this.spriteJoyBack != null) {
                let touchbackrect = new Rectangle(
                    (this._touchBackPoint.X - this.touchBackSize.X / 2) * 1 + sw.X * 1,
                    (this._touchBackPoint.Y - this.touchBackSize.Y / 2) * 1 + sw.Y * 1,
                    (this.touchBackSize.X) * 1,
                    (this.touchBackSize.Y) * 1
                );
                this.spriteJoyBack.RenderRect(_canvas.batcherUI, touchbackrect);
            }
            if (this.spriteJoyHot != null) {
                let touchhotrect = new Rectangle(
                    (this._touchHotPoint.X - this.touchHotSize.X / 2) * 1 + sw.X * 1,
                    (this._touchHotPoint.Y - this.touchHotSize.Y / 2) * 1 + sw.Y * 1,
                    (this.touchHotSize.X) * 1,
                    (this.touchHotSize.Y) * 1
                );
                this.spriteJoyHot.RenderRect(_canvas.batcherUI, touchhotrect);
            }
        }
        super.OnRender(_canvas);
    }
    keymode: boolean = false;//加入键盘控制模式，仅PC版本有效
    OnUpdate(_canvas: QUI_Canvas, delta: number): void {
        super.OnUpdate(_canvas, delta);
        this._updateKeyBoardToDir();
    }
    private _updateKeyBoardToDir() {
        let p = false;
        let dir = Vector2.Zero;
        if (tt.input.IsKeyDown("KeyW")) {
            this.keymode = true;
            p = true;
            dir.Y -= 1;
        }
        if (tt.input.IsKeyDown("KeyS")) {
            this.keymode = true;
            p = true;
            dir.Y += 1;
        }
        if (tt.input.IsKeyDown("KeyA")) {
            this.keymode = true;
            p = true;
            dir.X -= 1;
        }
        if (tt.input.IsKeyDown("KeyD")) {
            this.keymode = true;
            p = true;
            dir.X += 1;
        }
        if (this.keymode) {

            if (p) {
                this._press = true;
                let sw = this.GetWorldRect();

                this._touchBackPoint = new Vector2(
                    sw.Width / 2,//this.touchBackSize.X / 2,
                    sw.Height / 2,// - this.touchBackSize.Y / 2
                );
                this._touchHotPoint = new Vector2(
                    this._touchBackPoint.X + dir.X * this.hotMaxDist,
                    this._touchBackPoint.Y + dir.Y * this.hotMaxDist);
            }
            else {
                this._press = false;
            }
        }

    }
    CancelTouch() {
        this._press = false;
        this._pressid = -1;
        super.CancelTouch();
    }
    OnTouch(_canvas: QUI_Canvas, touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        let kill = super.OnTouch(_canvas, touchid, press, move, x, y);
        if (kill) return true;

        this.keymode = false;

        let rect = this.GetWorldRect();
        let prect = this._parent.GetWorldRect();
        let x2 = rect.X + rect.Width;
        let y2 = rect.Y + rect.Height;

        //初次按下
        if (this._press == false && press == true && move == false) {
            if (x >= rect.X && x < x2 && y >= rect.Y && y < y2) {
                this._press = true;
                this._pressid = touchid;
                let lx = x - prect.X
                let ly = y - prect.Y;
                let lpoint = new Vector2(lx, ly);
                let tx2 = rect.Width - this.touchBackSize.X / 2;
                let ty2 = rect.Height - this.touchBackSize.Y / 2;
                if (lx < this.touchBackSize.X / 2)
                    lx = this.touchBackSize.X / 2;
                if (ly < this.touchBackSize.Y / 2)
                    ly = this.touchBackSize.Y / 2;
                if (lx > tx2)
                    lx = tx2;
                if (ly > ty2)
                    ly = ty2;
                this._touchBackPoint.X = lx;
                this._touchBackPoint.Y = ly;

                let dist = Vector2.Dist(this._touchBackPoint, lpoint);
                if (dist > this.hotMaxDist) {
                    let dir = Vector2.Dir(this._touchBackPoint, lpoint);
                    dir.X *= this.hotMaxDist;
                    dir.Y *= this.hotMaxDist;
                    lpoint = Vector2.Add(this._touchBackPoint, dir);
                }
                this._touchHotPoint.X = lpoint.X;
                this._touchHotPoint.Y = lpoint.Y;

                return true;
            }
        }
        //拖拽
        if (this._press == true && press == true && this._pressid == touchid) {
            let lpoint = new Vector2(x - prect.X, y - prect.Y);

            let dist = Vector2.Dist(this._touchBackPoint, lpoint);
            if (dist > this.hotMaxDist) {
                let dir = Vector2.Dir(this._touchBackPoint, lpoint);
                dir.X *= this.hotMaxDist;
                dir.Y *= this.hotMaxDist;
                lpoint = Vector2.Add(this._touchBackPoint, dir);

            }
            this._touchHotPoint.X = lpoint.X;
            this._touchHotPoint.Y = lpoint.Y;

            return true;
        }
        //弹起
        if (this._press == true && press == false && this._pressid == touchid) {
            this._press = false;
            this._pressid = -1;
            return true;
        }
        return false;
    }
}