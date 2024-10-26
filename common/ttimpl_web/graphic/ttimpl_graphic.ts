import { tt } from "../../ttapi/ttapi.js";


export namespace tt_impl {
 

    export class ttimpl_graphics implements tt.IGraphic {
        _webgl: WebGL2RenderingContext;
        public constructor(webgl: WebGL2RenderingContext) {
            this._webgl = webgl;


            //let info = wx.getSystemInfoSync();

            //pc 平台这几个值不是稳定的
            // this._pixelRadio = window.devicePixelRatio;
            // let c = this._webgl.canvas as HTMLCanvasElement;
            // this._pixelWidth = c.clientWidth;
            // this._pixelHeight = c.clientHeight;
        }
        c2d: CanvasRenderingContext2D;
        GetBackGroundC2D():CanvasRenderingContext2D
        {
            if(this.c2d==null)
            {
                let canvas = window.document.createElement("canvas");
                this.c2d = canvas.getContext("2d"); 
            }
            return this.c2d;
        }
        // _pixelRadio: number;
        // _pixelWidth: number;
        // _pixelHeight: number;
        GetWebGL():WebGL2RenderingContext
        {
            return this._webgl;
        }
     
        _MainScreenScale: number = 1.0;
        getMainScreenScale(): number {
            return this._MainScreenScale;
        }
        setMainScreenScale(v: number) {
            this._MainScreenScale = v;
            this.UpdateScreenSize();
        }
        UpdateScreenSize(): void {
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

        getDeviceScreenWidth(): number {
            let c = this._webgl.canvas as HTMLCanvasElement;
            return c.clientWidth;
            //return  this._pixelWidth
        }
        getDeviceScreenHeight(): number {
            let c = this._webgl.canvas as HTMLCanvasElement;
            return c.clientHeight;
            //return this._pixelHeight;
        }
        getDevicePixelRadio(): number {
            return  window.devicePixelRatio;
            //return this._pixelRadio;
        }

        getFinalScale(): number {
            return this.getDevicePixelRadio() / this._MainScreenScale;
        }
        OnUpdate: ((delta: number) => void) | null = null;
        OnResize: ((width: number, height: number) => void) | null = null;
        OnRender: (() => void) | null = null;

        
    }

}