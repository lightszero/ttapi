"use strict";
// import { Color32 } from "../image/color.js";
// import { Target2D } from "../image/image.js";
// import { RectRange } from "../image/rect.js";
// import { Canvas } from "./canvas.js";
// import { Panel, Picture } from "./dombase.js";
// import { RangeBar } from "./rangebar.js";
// export class Preview extends Panel {
//     private _rt: Target2D;
//     private _panel: Panel;
//     _range: RangeBar;
//     rectX: number = 0;
//     rectY: number = 0;
//     rectWidth: number = 100;
//     rectHeight: number = 100;
//     getScale(): number {
//         return this._range.getValue();
//     }
//     //showrect: RectRange = new RectRange(0, 0, 100, 100);
//     private _canvas: Canvas;
//     constructor() {
//         super()
//         {
//             this.Style_Fill();
//             this.SetBorder(1);
//             this._panel = new Panel();
//             this._panel.SetBorder(1);
//             this._panel._root.style.position = "absolute";
//             this._panel._root.style.left = "0px";
//             this._panel._root.style.top = "0px";
//             this._panel._root.style.right = "0px";
//             this._panel._root.style.bottom = "auto";
//             this._panel._root.style.width = "auto";
//             this._panel._root.style.height = "auto";
//             this._panel._root.style.aspectRatio = "1/1";
//             this._root.appendChild(this._panel.getRoot());
//             let bar = this._range = new RangeBar();
//             bar._root.style.top = "auto";
//             bar._root.style.height = "24px";
//             this._root.appendChild(bar.getRoot());
//             bar.onchange = (v) => {
//                 if (this.onChangeScale != null)
//                     this.onChangeScale(v);
//             }
//             // this._img = new Picture("");
//             //  this._canvas._root.style.width = "100%";
//             //  this._canvas._root.style.height = "100%";
//             //  this._canvas._root.style.backgroundColor = "#000";
//             //  this._canvas.Fill();
//             // this._img._root.onload = () => {
//             //     this.Refresh();
//             // }
//             // this._panel.AddChild(this._img);
//             this._canvas = new Canvas();
//             this._canvas.Style_Fill();
//             this._canvas._root.style.width = "100%";
//             this._canvas._root.style.height = "100%";
//             //this._canvas._root.style.backgroundColor = "#000";
//             this._canvas.RePaint = this.RePaint.bind(this);
//             this._panel.AddChild(this._canvas);
//             let mx, my;
//             let press = false;
//             let _elayer = this._canvas.getRoot();
//             _elayer.onmousedown = (e) => {
//                 mx = e.clientX;
//                 my = e.clientY;
//                 press = true;
//             }
//             _elayer.onmousemove = (e) => {
//                 if (press) {
//                     //处理点在红框之外
//                     let fh = _elayer.clientHeight;
//                     let scale = fh / this.imgheight;
//                     if (this.rectX < e.offsetX / scale - this.rectWidth)
//                         this.rectX = e.offsetX / scale - this.rectWidth
//                     if (this.rectY < e.offsetY / scale - this.rectHeight)
//                         this.rectY = e.offsetY / scale - this.rectHeight
//                     if (this.rectX > e.offsetX / scale)
//                         this.rectX = e.offsetX / scale;
//                     if (this.rectY > e.offsetY / scale)
//                         this.rectY = e.offsetY / scale;
//                     //移动红框
//                     this.rectX += e.movementX / scale;
//                     this.rectY += e.movementY / scale;
//                     //不让红框离开canvas
//                     if (this.rectX > this.imgwidth - this.rectWidth)
//                         this.rectX = this.imgwidth - this.rectWidth
//                     if (this.rectY > this.imgheight - this.rectHeight)
//                         this.rectY = this.imgheight - this.rectHeight
//                     if (this.rectX < 0)
//                         this.rectX = 0;
//                     if (this.rectY < 0)
//                         this.rectY = 0;
//                     this.Refresh();
//                 }
//             }
//             window.addEventListener("mouseup", (e) => {
//                 press = false;
//             });
//         }
//     }
//     imgradio = 1;
//     imgheight: number;
//     imgwidth: number;
//     SetImg(img: Target2D): void {
//         this.imgheight = img.getHeight();
//         this.imgwidth = img.getWidth();
//         this.imgradio = img.getWidth() / img.getHeight();
//         this._rt = img;
//         this.Refresh();
//         //this._img.setSrc(img.src);
//     }
//     UpdateImgSize(): void {
//         let img = this._rt;
//         console.log("update img size.");
//         this.imgheight = img.getHeight();
//         this.imgwidth = img.getWidth();
//         this.imgradio = img.getWidth() / img.getHeight();
//         let r = this._panel._root.clientWidth / this._panel._root.clientHeight;
//         let w = this._panel._root.clientWidth;
//         let h = this._panel._root.clientHeight
//         let rimg = this.imgradio;
//         let fw = 0;
//         let fh = 0;
//         if (rimg < r) {
//             fh = h;
//             fw = h * rimg;
//             this._canvas._root.style.height = h + "px";
//             this._canvas._root.style.width = (h * rimg) + "px";
//             this._canvas._root.style.left = ((w - rimg * h) / 2) + "px";
//             this._canvas._root.style.top = "0px";
//             this._canvas._root.style.right = "auto"
//             this._canvas._root.style.bottom = "auto"
//             let c = this._canvas._root as HTMLCanvasElement;
//             c.width = h * rimg;
//             c.height = h;
//         }
//         else {
//             fw = w;
//             fh = w / rimg;
//             this._canvas._root.style.width = w + "px";
//             this._canvas._root.style.height = (w / rimg) + "px";
//             this._canvas._root.style.left = "0px";// ((w - rimg * h) / 2) + "px";
//             this._canvas._root.style.top = ((h - w / rimg) / 2) + "px";
//             this._canvas._root.style.right = "auto"
//             this._canvas._root.style.bottom = "auto"
//             let c = this._canvas._root as HTMLCanvasElement;
//             c.width = w;
//             c.height = w / rimg;
//         }
//         this.Refresh();
//     }
//     onChange: () => void;
//     onChangeScale: (v: number) => void;
//     private _inref: boolean = false;;
//     Refresh() {
//         this._canvas.Refresh();
//         //处理点在红框之外
//         if (this.rectX > this.imgwidth - this.rectWidth)
//             this.rectX = this.imgwidth - this.rectWidth
//         if (this.rectY > this.imgheight - this.rectHeight)
//             this.rectY = this.imgheight - this.rectHeight
//         if (this.rectX < 0)
//             this.rectX = 0;
//         if (this.rectY < 0)
//             this.rectY = 0;
//         //防事件递归
//         if (this._inref == true)
//             return;
//         if (this.onChange != null) {
//             this._inref = true;
//             this.onChange();
//             this._inref = false;
//         }
//     }
//     private _bordercolor: Color32 = new Color32(255, 255, 255, 255);
//     setBackColor(color: Color32): void {
//         this._canvas.setBackColor(color);
//         //super.setBackColor(color);
//         let g = color.R / 255 * 0.4 + color.G / 255 * 0.5 + color.B / 255 * 0.1;
//         if (g < 0.6) {
//             this._bordercolor.R = 255
//             this._bordercolor.G = 255
//             this._bordercolor.B = 255
//         }
//         else {
//             this._bordercolor.R = 0
//             this._bordercolor.G = 0
//             this._bordercolor.B = 0
//         }
//         this.Refresh();
//     }
//     RePaint(c2d: CanvasRenderingContext2D) {
//         this._canvas._c2d.imageSmoothingEnabled = false;
//         //refix imgsize
//         let r = this._panel._root.clientWidth / this._panel._root.clientHeight;
//         let w = this._panel._root.clientWidth;
//         let h = this._panel._root.clientHeight
//         let rimg = this.imgradio;
//         let fw = 0;
//         let fh = 0;
//         if (rimg < r) {
//             fh = h;
//             fw = h * rimg;
//             this._canvas._root.style.height = h + "px";
//             this._canvas._root.style.width = (h * rimg) + "px";
//             this._canvas._root.style.left = ((w - rimg * h) / 2) + "px";
//             this._canvas._root.style.top = "0px";
//             this._canvas._root.style.right = "auto"
//             this._canvas._root.style.bottom = "auto"
//         }
//         else {
//             fw = w;
//             fh = w / rimg;
//             this._canvas._root.style.width = w + "px";
//             this._canvas._root.style.height = (w / rimg) + "px";
//             this._canvas._root.style.left = "0px";// ((w - rimg * h) / 2) + "px";
//             this._canvas._root.style.top = ((h - w / rimg) / 2) + "px";
//             this._canvas._root.style.right = "auto"
//             this._canvas._root.style.bottom = "auto"
//         }
//         if (this._rt != null) {
//             let img = this._rt.getBitmap();
//             //let c = this._canvas._root as HTMLCanvasElement;
//             c2d.drawImage(img, 0, 0, img.width, img.height, 0, 0, fw, fh);
//         }
//         c2d.strokeStyle = this._bordercolor.toString();
//         let scale = fh / this.imgheight;
//         c2d.lineWidth = 4;
//         c2d.strokeRect(this.rectX * scale, this.rectY * scale, this.rectWidth * scale, this.rectHeight * scale);
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByZXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtDQUErQztBQUMvQyxnREFBZ0Q7QUFDaEQsZ0RBQWdEO0FBQ2hELHdDQUF3QztBQUN4QyxpREFBaUQ7QUFDakQsNENBQTRDO0FBRzVDLHVDQUF1QztBQUN2Qyw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLHdCQUF3QjtBQUN4Qix5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLCtCQUErQjtBQUMvQixnQ0FBZ0M7QUFDaEMsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6QyxRQUFRO0FBQ1IsNkRBQTZEO0FBQzdELCtCQUErQjtBQUMvQixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLFlBQVk7QUFDWixpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLHlDQUF5QztBQUN6Qyx3Q0FBd0M7QUFDeEMsNkRBQTZEO0FBQzdELG9EQUFvRDtBQUNwRCxtREFBbUQ7QUFDbkQscURBQXFEO0FBQ3JELHVEQUF1RDtBQUN2RCxzREFBc0Q7QUFDdEQsdURBQXVEO0FBQ3ZELDJEQUEyRDtBQUczRCw2REFBNkQ7QUFHN0Qsc0RBQXNEO0FBQ3RELDRDQUE0QztBQUM1QywrQ0FBK0M7QUFDL0MscURBQXFEO0FBQ3JELHNDQUFzQztBQUN0QyxrREFBa0Q7QUFDbEQsNkNBQTZDO0FBQzdDLGdCQUFnQjtBQUVoQiw4Q0FBOEM7QUFDOUMsMkRBQTJEO0FBQzNELDREQUE0RDtBQUM1RCxxRUFBcUU7QUFDckUsdUNBQXVDO0FBQ3ZDLGtEQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsbUJBQW1CO0FBQ25CLGtEQUFrRDtBQUVsRCwyQ0FBMkM7QUFFM0MseUNBQXlDO0FBQ3pDLHVEQUF1RDtBQUN2RCx3REFBd0Q7QUFDeEQsbUVBQW1FO0FBQ25FLDhEQUE4RDtBQUM5RCxrREFBa0Q7QUFFbEQsMEJBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyxvREFBb0Q7QUFD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