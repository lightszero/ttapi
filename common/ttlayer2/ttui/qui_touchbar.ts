import { tt } from "../../ttapi/ttapi.js";
import { Color, Rectangle, Sprite, Vector2 } from "../ttlayer2.js";
import * as QUI from "./qui_base.js"
import { QUI_Canvas } from "./qui_canvas.js";

//摇杆控件
export class QUI_TouchBar extends QUI.QUI_BaseElement {
    constructor() {
        super();
        this.localRect.setAsFill();
    }
    getElementType(): QUI.QUI_ElementType {
        return QUI.QUI_ElementType.Element_TouchBar;
    }




    spriteJoyHot: Sprite | null;


    touchHotSize: Vector2 = new Vector2(160, 160);//热点图尺寸

    private _touchHotPoint: Vector2 = new Vector2(100, 100);//触摸区中心点
    private _touchLastPoint: Vector2 = new Vector2(100, 100);
    GetTouchDirection(clear: boolean): Vector2 | null {
        if (this._press == false)
            return null;
        else {
            let dec = new Vector2(
                (this._touchHotPoint.X - this._touchLastPoint.X),
                (this._touchHotPoint.Y - this._touchLastPoint.Y)
            )
            if (clear) {
                this._touchLastPoint.X = this._touchHotPoint.X;
                this._touchLastPoint.Y = this._touchHotPoint.Y;
            }
            return dec;
        }
    }

    color: Color = Color.White;
    private _press: boolean = false;
    private _pressid: number = 0;
    OnRender(_canvas: QUI_Canvas): void {

        let sw = this.getWorldRect();
        //this.touchBackSize.X = sw.Width;
        //this.touchBackSize.Y = sw.Height;
        //this.Render_impl();
        if (this._press) {

            if (this.spriteJoyHot != null) {
                let touchhotrect = new Rectangle(
                    (this._touchHotPoint.X - this.touchHotSize.X / 2) * _canvas.scale + sw.X * _canvas.scale,
                    (this._touchHotPoint.Y - this.touchHotSize.Y / 2) * _canvas.scale + sw.Y * _canvas.scale,
                    (this.touchHotSize.X) * _canvas.scale,
                    (this.touchHotSize.Y) * _canvas.scale
                );
                this.spriteJoyHot.RenderRect(_canvas.batcherUI, touchhotrect);
            }
        }
        //super.OnRender(_canvas);
    }
    keymode: boolean = false;//加入键盘控制模式，仅PC版本有效
    OnUpdate(_canvas:QUI_Canvas,delta: number): void {
        //super.OnUpdate(_canvas,delta);
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
                let sw = this.getWorldRect();

                this._touchLastPoint = new Vector2(
                    sw.Width / 2,//this.touchBackSize.X / 2,
                    sw.Height / 2,// - this.touchBackSize.Y / 2
                );
                this._touchHotPoint = new Vector2(
                    this._touchLastPoint.X + dir.X * 1,
                    this._touchLastPoint.Y + dir.Y * 1);
            }
            else {
                this._press = false;
            }
        }

    }
    CancelTouch() {
        this._press = false;
        this._pressid = -1;
        //super.CancelTouch();
    }
    OnTouch(_canvas:QUI_Canvas,touchid: number, press: boolean, move: boolean, x: number, y: number): boolean {
        //let kill = super.OnTouch(_canvas,touchid, press, move, x, y);
        //if (kill) return true;

        this.keymode = false;

        let rect = this.getWorldRect();
        let prect = this._parent.getWorldRect();
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

                this._touchHotPoint.X = lpoint.X;
                this._touchHotPoint.Y = lpoint.Y;
                this._touchLastPoint.X = lpoint.X;
                this._touchLastPoint.Y = lpoint.Y;
                return true;
            }
        }
        //拖拽
        if (this._press == true && press == true && this._pressid == touchid) {
            let lpoint = new Vector2(x - prect.X, y - prect.Y);

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