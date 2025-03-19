
import { tt } from "../ttapi/ttapi.js";

export namespace tt_impl {
    export class Input implements tt.IInput {
        constructor(canvas: HTMLCanvasElement) {

            this.Start(canvas);

            // wx.onKeyboardConfirm((x) => {
            //     this.onkeycomfirm(x.value);
            // });
        }
        _mousepress: boolean = false;

        Start(canvas: HTMLCanvasElement): void {

            window.addEventListener("keydown", (r) => {
                this.UpdateKey(r.code, true);
            });
            window.addEventListener("keyup", (r) => {
                this.UpdateKey(r.code, false);
            });
            canvas.addEventListener("mousedown", (r) => {
                if (r.button == 0) {


                    if (this.lasttouchx == r.x && this.lasttouchy == r.y) {
                        console.log("cancel sim mouse");
                        this.lasttouchx = -1;
                        this.lasttouchy = -1;
                        return;
                    }
                    //console.log("mousedown=" + (r.x | 0) + "," + (r.y | 0));
                    this.UpdateMouse(r, true, false);
                    this._mousepress = true;
                }
            });
            canvas.addEventListener("mouseup", (r) => {
                if (r.button == 0) {
                    //console.log("mouseup");
                    this.UpdateMouse(r, false, false);
                    this._mousepress = false;
                }
            });
            canvas.addEventListener("mousemove", (r) => {

                if (r.button == 0) {

                    this.UpdateMouse(r, this._mousepress, true);
                }
            });
            canvas.addEventListener("touchstart", (r) => {
                //console.log("touchstart");
                for (var i = 0; i < r.changedTouches.length; i++) {
                    this.UpdatePoint(r.changedTouches[i], true, false);
                }
            })
            canvas.addEventListener("touchmove", (r) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    this.UpdatePoint(r.changedTouches[i], true, true);
                }
            })
            canvas.addEventListener("touchend", (r) => {
                //console.log("touchend=" + this.lasttouchx + "|" + this.lasttouchy);
                for (var i = 0; i < r.changedTouches.length; i++) {
                    this.UpdatePoint(r.changedTouches[i], false, false);
                }
            })
            canvas.addEventListener("touchcancel", (r) => {
                for (var i = 0; i < r.changedTouches.length; i++) {
                    this.UpdatePoint(r.changedTouches[i], false, false);
                }
            })
        }
        private UpdateMouse(m: MouseEvent, press: boolean, move: boolean): void {


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
            this.points[0].y = m.y
            if (this.OnPoint != null)
                this.OnPoint(0, m.x, m.y, press, move);
        }
        lasttouchx: number = -1;
        lasttouchy: number = -1;

        private UpdatePoint(t: Touch, press: boolean, move: boolean): void {
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
            if (press) {

                this.lasttouchx = t.clientX | 0;
                this.lasttouchy = t.clientY | 0;
            }

            if (this.OnPoint != null)
                this.OnPoint(touchid, t.clientX, t.clientY, press, move);
        }
        private UpdateKey(keycode: string, press: boolean) {
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
            //console.log("Input Key:" + keycode + "=" + press);
          
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

        onkeycomfirm: (txt: string) => void;
        ishow: boolean = false;
        async Prompt(message: string, deftxt: string = "", maxlen: number = 256, font: string = ""): Promise<string> {
            //releaseinput
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].press = false;
            }

            //prompt 很多情况会被禁止
            //return window.prompt(message, deftxt);


            let txt = deftxt;
            let finish = false;

            let div = document.createElement("div");

            let divback = document.createElement("div");
            {//准备dom界面遮蔽事件



                div.style.backgroundColor = "#00000070";
                div.style.position = "absolute";
                div.style.width = "100%"
                div.style.height = "100%"
                div.style.backgroundColor = "#00000070";

                div.onclick = (evt) => {
                    //evt.preventDefault();
                }
                div.onpointerdown = (evt) => {
                    //evt.preventDefault();
                }
                div.ontouchstart = (evt) => {
                    //evt.preventDefault();
                }
                document.body.appendChild(div);

                divback.style.backgroundColor = "#aaaaaa";
                divback.style.borderWidth = "2px";
                divback.style.borderColor = "#fff";
                divback.style.borderStyle = "solid";
                divback.style.position = "absolute";
                divback.style.left = "25%";
                divback.style.top = "35%";
                divback.style.right = "25%";
                divback.style.bottom = "35%"
                div.appendChild(divback);
            }
            {//准备事件组件
                let divmsg = document.createElement("span");
                divmsg.style.position = "absolute";
                divmsg.style.left = "25%";
                divmsg.style.right = "25%";
                divmsg.style.top = "100px";
                divmsg.style.fontFamily = font;
                divmsg.style.fontSize = "32";
                divmsg.textContent = message;
                divback.appendChild(divmsg);

                let input = document.createElement("input");
                input.type = "text";
                input.style.color = "#000";
                input.style.position = "absolute";
                input.style.left = "25%";
                input.style.right = "25%";
                input.style.top = "150px";
                input.value = deftxt;
                input.maxLength = maxlen;
                input.style.fontFamily = font;
                input.style.fontSize = "32";
                divback.appendChild(input);
                input.onchange = () => {
                    txt = input.value;
                }

                let btn = document.createElement("button");
                btn.style.left = "25%";
                btn.style.right = "25%";
                btn.style.position = "absolute";

                btn.style.top = "200px";
                btn.textContent = "OK";
                btn.style.fontFamily = font;
                btn.style.fontSize = "32";
                btn.onclick = () => {
                    finish = true;
                }
                divback.appendChild(btn);

            }
            while (!finish) {
                await tt.sleep(1);
            }
            document.body.removeChild(div);
            return txt;
        }
    }
}