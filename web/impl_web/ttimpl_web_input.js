var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tt } from "../interface/ttapi.js";
export var tt_impl;
(function (tt_impl) {
    class Input {
        constructor(canvas) {
            this._mousepress = false;
            this._pressKeys = [];
            this.points = [];
            this.ishow = false;
            this.Start(canvas);
            // wx.onKeyboardConfirm((x) => {
            //     this.onkeycomfirm(x.value);
            // });
        }
        Start(canvas) {
            window.addEventListener("keydown", (r) => {
                this.UpdateKey(r.code, true);
            });
            window.addEventListener("keyup", (r) => {
                this.UpdateKey(r.code, false);
            });
            canvas.addEventListener("mousedown", (r) => {
                if (r.button == 0) {
                    this.UpdateMouse(r, true, false);
                    this._mousepress = true;
                }
            });
            canvas.addEventListener("mouseup", (r) => {
                if (r.button == 0) {
                    this.UpdateMouse(r, false, false);
                    this._mousepress = false;
                }
            });
            canvas.addEventListener("mousemove", (r) => {
                if (r.button == 0 && this._mousepress) {
                    this.UpdateMouse(r, true, true);
                }
            });
            canvas.addEventListener("touchstart", (r) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    this.UpdatePoint(r.changedTouches[i], true, false);
                }
            });
            canvas.addEventListener("touchmove", (r) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    this.UpdatePoint(r.changedTouches[i], true, true);
                }
            });
            canvas.addEventListener("touchend", (r) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    this.UpdatePoint(r.changedTouches[i], false, false);
                }
            });
            canvas.addEventListener("touchcancel", (r) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    this.UpdatePoint(r.changedTouches[i], false, false);
                }
            });
        }
        UpdateMouse(m, press, move) {
            while (this.points.length <= 0) {
                let p = new tt.InputPoint();
                p.id = this.points.length;
                p.press = false;
                p.x = 0;
                p.y = 0;
                this.points.push(p);
            }
            this.points[0].id = 0;
            this.points[0].press = press;
            this.points[0].x = m.x;
            this.points[0].y = m.y;
            if (this.OnPoint != null)
                this.OnPoint(0, m.x, m.y, press, move);
        }
        UpdatePoint(t, press, move) {
            let touchid = t.identifier + 1;
            while (this.points.length <= touchid) {
                let p = new tt.InputPoint();
                p.id = this.points.length;
                p.press = false;
                p.x = 0;
                p.y = 0;
                this.points.push(p);
            }
            this.points[touchid].press = press;
            this.points[touchid].x = t.clientX;
            this.points[touchid].y = t.clientY;
            if (this.OnPoint != null)
                this.OnPoint(touchid, t.clientX, t.clientY, press, move);
        }
        UpdateKey(keycode, press) {
            if (press) {
                if (this._pressKeys.indexOf(keycode) >= 0)
                    return;
                else
                    this._pressKeys.push(keycode);
            }
            else {
                let i = this._pressKeys.indexOf(keycode);
                if (i >= 0) {
                    this._pressKeys.splice(i, 1);
                }
            }
            console.log("Input Key:" + keycode + "=" + press);
            if (this.OnKey != null)
                this.OnKey(keycode, press);
        }
        GetPressKeys() {
            return this._pressKeys;
        }
        IsKeyDown(keycode) {
            return this._pressKeys.indexOf(keycode) >= 0;
        }
        GetInputPoints() {
            return this.points;
        }
        Prompt(deftxt = "", maxlen = 256) {
            return __awaiter(this, void 0, void 0, function* () {
                //releaseinput
                for (var i = 0; i < this.points.length; i++) {
                    this.points[i].press = false;
                }
                return window.prompt("", deftxt);
            });
        }
    }
    tt_impl.Input = Input;
})(tt_impl || (tt_impl = {}));
