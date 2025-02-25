"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFscmdiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFscmdiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1REFBdUQ7QUFDdkQsZ0RBQWdEO0FBQ2hELDhDQUE4QztBQUU5QyxxREFBcUQ7QUFFckQscUNBQXFDO0FBRXJDLHNCQUFzQjtBQUN0QixtQkFBbUI7QUFDbkIsc0VBQXNFO0FBQ3RFLDZCQUE2QjtBQUM3Qiw4Q0FBOEM7QUFFOUMsd0NBQXdDO0FBRXhDLHFEQUFxRDtBQUNyRCxZQUFZO0FBQ1osd0NBQXdDO0FBQ3hDLG9DQUFvQztBQUNwQyxvREFBb0Q7QUFDcEQseUNBQXlDO0FBQ3pDLHFEQUFxRDtBQUNyRCxZQUFZO0FBQ1osc0RBQXNEO0FBQ3RELCtCQUErQjtBQUMvQixjQUFjO0FBQ2QseUJBQXlCO0FBQ3pCLFFBQVE7QUFDUiwrQkFBK0I7QUFDL0IsOENBQThDO0FBQzlDLDJDQUEyQztBQUMzQyxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELHFEQUFxRDtBQUdyRCxpQ0FBaUM7QUFDakMseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsb0JBQW9CO0FBQ3BCLFFBQVE7QUFDUixvQ0FBb0M7QUFDcEMsc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFFdkMsa0NBQWtDO0FBQ2xDLHdEQUF3RDtBQUN4RCwrREFBK0Q7QUFDL0QsZ0VBQWdFO0FBQ2hFLHFCQUFxQjtBQUNyQixxQkFBcUI7QUFDckIseUNBQXlDO0FBQ3pDLDRDQUE0QztBQUM1QywwREFBMEQ7QUFDMUQsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2QyxZQUFZO0FBQ1osMENBQTBDO0FBQzFDLHdDQUF3QztBQUV4QywrQkFBK0I7QUFDL0IsWUFBWTtBQUVaLFFBQVE7QUFDUixvREFBb0Q7QUFDcEQsK0RBQStEO0FBQy9ELGdFQUFnRTtBQUNoRSxxQkFBcUI7QUFDckIscUJBQXFCO0FBQ3JCLDJDQUEyQztBQUMzQyxnREFB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