/// <reference path="./lib/index.d.ts" />
import { tt } from "../ttapi_interface/ttapi.js";

export namespace tt_impl {
    export class WxInput implements tt.IInput {
        constructor() {

            this.Start();

            wx.onKeyboardConfirm((x) => {
                this.onkeycomfirm(x.value);
            });
        }

        Start(): void {
            wx.onTouchStart((r: WechatMinigame.OnTouchStartListenerResult) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    let t = r.changedTouches[i];
                    this.UpdatePoint(t, true, false);
                }
            });
            wx.onTouchMove((r: WechatMinigame.OnTouchStartListenerResult) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    let t = r.changedTouches[i];
                    this.UpdatePoint(t, true, true);
                }
            });
            wx.onTouchEnd((r: WechatMinigame.OnTouchStartListenerResult) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    let t = r.changedTouches[i];
                    this.UpdatePoint(t, false, false);
                }
            });
            wx.onTouchCancel((r: WechatMinigame.OnTouchStartListenerResult) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    let t = r.changedTouches[i];
                    this.UpdatePoint(t, false, false);
                }
            });
            wx.onKeyDown((r) => {
                this.UpdateKey(r.code, true);
            })
            wx.onKeyUp((r) => {
                this.UpdateKey(r.code, false);
            })
        }
        private UpdatePoint(t: WechatMinigame.Touch, press: boolean, move: boolean): void {
            while (this.points.length <= t.identifier) {
                let p = new tt.InputPoint();
                p.id = this.points.length;
                p.press = false;
                p.x = 0;
                p.y = 0;
                this.points.push(p);
            }
            this.points[t.identifier].press = press;
            this.points[t.identifier].x = t.clientX;
            this.points[t.identifier].y = t.clientY;
            if (this.OnPoint != null)
                this.OnPoint(t.identifier, t.clientX, t.clientY, press, move);
        }
        private UpdateKey(keycode: string, press: boolean) {
            if (press) {
                if (this._pressKeys.indexOf(keycode) > 0)
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
        _pressKeys: string[] = []
        GetPressKeys(): string[] {
            return this._pressKeys;
        }
        IsKeyDown(keycode: string): boolean {
            return this._pressKeys.indexOf(keycode) >= 0;
        }
        OnKey: null | ((keycode: string, press: boolean) => void);


        points: tt.InputPoint[] = [];
        GetInputPoints(): tt.InputPoint[] {
            return this.points;
        }
        OnPoint: null | ((id: number, x: number, y: number, press: boolean, move: boolean) => void);

        async sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        onkeycomfirm: (txt: string) => void;
        ishow: boolean = false;
        async Prompt(deftxt: string = "", maxlen: number = 256): Promise<string> {
            if (this.ishow)
                return "";

            let txt = "";
            this.onkeycomfirm = (x) => {
                txt = x;
                console.log("str=" + x);
                wx.hideKeyboard();
                this.ishow = false;
            };
            this.ishow = true;
            await wx.showKeyboard({
                confirmHold: true, confirmType: "done", defaultValue: deftxt, maxLength: maxlen, multiple: false
            });
            while (this.ishow) {
                await this.sleep(1);
            }
            return txt;
        }
    }
}