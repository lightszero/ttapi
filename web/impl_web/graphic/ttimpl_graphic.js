import { tt } from "../../interface/ttapi.js";
export var tt_impl;
(function (tt_impl) {
    class ttimpl_graphics {
        constructor(webgl) {
            this._MainScreenScale = 1.0;
            this.OnUpdate = null;
            this.OnResize = null;
            this.OnRender = null;
            this._webgl = webgl;
            //let info = wx.getSystemInfoSync();
            //pc 平台这几个值不是稳定的
            // this._pixelRadio = window.devicePixelRatio;
            // let c = this._webgl.canvas as HTMLCanvasElement;
            // this._pixelWidth = c.clientWidth;
            // this._pixelHeight = c.clientHeight;
        }
        // _pixelRadio: number;
        // _pixelWidth: number;
        // _pixelHeight: number;
        GetWebGL() {
            return this._webgl;
        }
        getMainScreenScale() {
            return this._MainScreenScale;
        }
        setMainScreenScale(v) {
            this._MainScreenScale = v;
            this.UpdateScreenSize();
        }
        UpdateScreenSize() {
            let canvas = this._webgl.canvas;
            var wantwidth = (tt.graphic.getDeviceScreenWidth() * tt.graphic.getFinalScale()) | 0;
            var wantheight = (tt.graphic.getDeviceScreenHeight() * tt.graphic.getFinalScale()) | 0;
            if (canvas.width != wantwidth || canvas.height != wantheight) {
                //console.log("radio = " + radio + " ,screenwidth=" + sw + " ,windowwidth=" + ww +",ms="+ms);
                console.log("--resize wantwidth = " + wantwidth + " ,wantheight=" + wantheight);
                canvas.width = wantwidth;
                canvas.height = wantheight;
                if (tt.graphic.OnResize != null)
                    tt.graphic.OnResize(canvas.width, canvas.height);
            }
        }
        getDeviceScreenWidth() {
            let c = this._webgl.canvas;
            return c.clientWidth;
            //return  this._pixelWidth
        }
        getDeviceScreenHeight() {
            let c = this._webgl.canvas;
            return c.clientHeight;
            //return this._pixelHeight;
        }
        getDevicePixelRadio() {
            return window.devicePixelRatio;
            //return this._pixelRadio;
        }
        getFinalScale() {
            return this.getDevicePixelRadio() / this._MainScreenScale;
        }
    }
    tt_impl.ttimpl_graphics = ttimpl_graphics;
})(tt_impl || (tt_impl = {}));
