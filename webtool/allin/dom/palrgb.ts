// import { Color32, ColorF } from "../image/color.js";
// import { Vector2 } from "../math/vector2.js";
// import { BaseElement } from "./dombase.js";

// export class PaletteRGBPanel extends BaseElement {

//     c2d: CanvasRenderingContext2D;

//     constructor() {
//         super();
//         let canvas = this._root = document.createElement("canvas");
//         this.Style_Fill();
//         this.c2d = canvas.getContext("2d");

//         canvas.onmousedown = (e) => {

//             this.OnMouseDown(e.offsetX, e.offsetY)
//         }
//         canvas.onmousemove = (e) => {
//             if (this._press == 1)
//                 this.resetH(e.offsetX, e.offsetY)
//             else if (this._press == 2)
//                 this.resetSV(e.offsetX, e.offsetY)
//         }
//         window.addEventListener("mouseup", (e) => {
//             this._press = 0;
//         });
//         this.update();
//     }
//     getPickColor(): ColorF {
//         let c = ColorF.FromH(this.h * 360);
//         let overbright = (1.0 - this.s);
//         c.r = c.r * (1 - overbright) + overbright;
//         c.g = c.g * (1 - overbright) + overbright;
//         c.b = c.b * (1 - overbright) + overbright;


//         let bright = (this.v);
//         c.r *= bright;
//         c.g *= bright;
//         c.b *= bright;
//         return c;
//     }
//     onPick: (c: Color32) => void;
//     readonly ringmin: number = 100;
//     readonly ringmax: number = 128;
//     readonly rectSize: number = 128;

//     private _press: number = 0;
//     private OnMouseDown(offx: number, offy: number) {
//         let dx = offx / this.c2d.canvas.clientWidth * 2 - 1;
//         let dy = offy / this.c2d.canvas.clientHeight * 2 - 1;
//         dx *= 128;
//         dy *= 128;
//         let dir = new Vector2(dx, dy);
//         let len = Vector2.getLength(dir);
//         if (len > this.ringmin && len < this.ringmax) {
//             this.resetH(offx, offy);
//             this._press = 1;//pick h
//         }
//         else if (len <= this.ringmin) {
//             this.resetSV(offx, offy);

//             this._press = 2;
//         }

//     }
//     private resetSV(offx: number, offy: number) {
//         let dx = offx / this.c2d.canvas.clientWidth * 2 - 1;
//         let dy = offy / this.c2d.canvas.clientHeight * 2 - 1;
//         dx *= 128;
//         dy *= 128;
//         let rsize = (this.rectSize / 2);
//         let s = (dx + rsize) / this.rectSize;
//         let v = 1.0 - (dy + rsize) / this.rectSize;
//         if (s < 0) s = 0;
//         if (v < 0) v = 0;
//         if (s > 1) s = 1;
//         if (v > 1) v = 1;
//         this.s = s;
//         this.v = v;
//         this.update();
//     }
//     private resetH(offx: number, offy: number) {
//         let dx = offx / this.c2d.canvas.clientWidth * 2 - 1;
//         let dy = offy / this.c2d.canvas.clientHeight * 2 - 1;
//         dx *= 128;
//         dy *= 128;
//         let dir = new Vector2(dx, dy);




//         dir = Vector2.normalize(dir);
//         let cross = Vector2.dot(dir, new Vector2(-1, 0))
//         let angle = Math.acos(cross) / Math.PI * 180;
//         if (dir.y > 0) {

//             angle = 360 - angle;
//         }
//         this.h = angle / 360;
//         //console.log("h=" + this.h);
//         this.update();
//     }
//     h: number = 0;//h取值0~1
//     s: number = 1;
//     v: number = 1;
//     update(): void {
//         this.c2d.canvas.width = 256;
//         this.c2d.canvas.height = 256;
//         this.c2d.clearRect(0, 0, 256, 256);

//         var imgrect = new ImageData(256, 256);

//         //画色环
//         this.setHRing(imgrect, this.ringmin, this.ringmax);

//         //画中心色
//         this.setColorRect(imgrect, this.rectSize);
//         this.c2d.putImageData(imgrect, 0, 0);



//         //画当前选中H
//         this.DrawPickH((this.ringmin + this.ringmax) / 2);
//         this.DrawPickSV(this.rectSize);

//         let pickc = this.getPickColor().ToColor32();
//         this._root.style.backgroundColor = pickc.toString();
//         if (this.onPick != null)
//             this.onPick(pickc);
//     }
//     DrawPickH(r: number) {

//         let cos = Math.cos(this.h * Math.PI * 2);
//         let sin = Math.sin(this.h * Math.PI * 2);
//         let x = -cos * r + 128;
//         let y = -sin * r + 128;

//         this.c2d.strokeStyle = "#fff"
//         this.c2d.lineWidth = 3;
//         this.c2d.beginPath();
//         this.c2d.arc(x, y, 8, 0, Math.PI * 2);
//         this.c2d.closePath();
//         this.c2d.stroke();
//     }
//     DrawPickSV(size: number) {
//         let x = 128 - size / 2 + size * this.s;
//         let y = 128 - size / 2 + size * (1 - this.v);
//         this.c2d.strokeStyle = "#fff"
//         this.c2d.lineWidth = 3;
//         this.c2d.beginPath();
//         this.c2d.arc(x, y, 8, 0, Math.PI * 2);
//         this.c2d.closePath();
//         this.c2d.stroke();
//     }
//     setHRing(imgrect: ImageData, minr: number, maxr: number): void {
//         for (var y = 0; y < 256; y++) {
//             for (var x = 0; x < 256; x++) {
//                 let dir = new Vector2(x - 128, y - 128);
//                 let len = Vector2.getLength(dir);
//                 if (len > maxr) continue;
//                 if (len < minr) continue;
//                 dir = Vector2.normalize(dir);
//                 let cross = Vector2.dot(dir, new Vector2(-1, 0))
//                 let angle = Math.acos(cross) / Math.PI * 180;
//                 if (dir.y > 0) {

//                     angle = 360 - angle;
//                 }
//                 //console.log(angle);
//                 let seek = (y * 256 + x) * 4;
//                 let color = ColorF.FromH(angle).ToColor32();
//                 imgrect.data[seek + 0] = color.R;
//                 imgrect.data[seek + 1] = color.G;
//                 imgrect.data[seek + 2] = color.B;
//                 imgrect.data[seek + 3] = 255;
//             }
//         }

//     }

//     setColorRect(imgrect: ImageData, size: number): void {

//         let color = ColorF.FromH(this.h * 360);
//         //.ToColor32();
//         for (var y = 0; y < size; y++) {
//             for (var x = 0; x < size; x++) {
//                 let dx = 128 + x - size / 2;
//                 let dy = 128 + y - size / 2;
//                 let seek = (dy * 256 + dx) * 4;

//                 let r = color.r
//                 let g = color.g
//                 let b = color.b

//                 let overbright = (1 - x / size);
//                 r = r * (1 - overbright) + overbright;
//                 g = g * (1 - overbright) + overbright;
//                 b = b * (1 - overbright) + overbright;


//                 let bright = (1 - y / size);
//                 r *= bright;
//                 g *= bright;
//                 b *= bright;

//                 imgrect.data[seek + 0] = r * 255;
//                 imgrect.data[seek + 1] = g * 255;
//                 imgrect.data[seek + 2] = b * 255;
//                 imgrect.data[seek + 3] = 255;
//             }
//         }
//     }
// }