
import { tt } from "../ttapi/ttapi.js";
import * as impl_g from "./graphic/ttimpl_graphic.js";
import * as impl_l from "./ttimpl_web_loader.js"
import * as impl_a from "./audio/ttimpl_web_audio.js"
import * as impl_i from "./ttimpl_web_input.js"
import * as impl_p from "./ttimpl_web_platform.js"
import * as impl_st from "./store/ttimpl_web_store.js"
export namespace tt_impl {

    export class ttimpl_browser {
        constructor() {

        }

        webgl?: WebGL2RenderingContext | null;
        public Init(canvas: HTMLCanvasElement): void {
            //let canvas = wx.createCanvas();
            //wx.createImage();
            this.webgl = canvas.getContext("webgl2", { antialias: false });

            if (this.webgl != null) {
                let canvas =new OffscreenCanvas(32,32); 
                //let c = window.document.createElement("canvas");
// c.getContext("2d",{ colorSpace:"srgb", willReadFrequently:true})
                let c2d = canvas.getContext("2d",{ colorSpace:"srgb", willReadFrequently:true}) as OffscreenCanvasRenderingContext2D; 
            
                tt.graphic = new impl_g.tt_impl.ttimpl_graphics(this.webgl,c2d);

                this.timerMs = new Date().getTime();
                requestAnimationFrame(this.Update.bind(this));
            } else {
                console.error("init webgl error.");
            }
            tt.loader = new impl_l.tt_impl.Loader();
            tt.audio = new impl_a.tt_impl.AudioImpl();

            tt.input = new impl_i.tt_impl.Input(canvas);
            tt.platform = new impl_p.tt_impl.Platform();

            tt.store = new impl_st.TTStore();
        }
        public ReInitAudio(): void {
            // (tt.audio as ttimpl_audio).Init();
        }
        public SendEnvEventToUser(name: string, obj: any) {
            //     (tt.platform as tt.impl.ttimpl_platform).SendEnvEventToUser(name, obj);
        }
 
        timerMs: number = 0;
        Update(): void {
            if (this.webgl == null)
                return;
            //resize logic
            var canvas = this.webgl.canvas as HTMLCanvasElement;


            var wantwidth = (tt.graphic.getDeviceScreenWidth() * tt.graphic.getFinalScale()) | 0;
            var wantheight = (tt.graphic.getDeviceScreenHeight() * tt.graphic.getFinalScale()) | 0;
            var radio = tt.graphic.getDevicePixelRadio();
            //console.log("canvas.clientWidth=" + canvas.clientWidth + "wantwidth=" + wantwidth + "radio=" + radio + " mainscale=" + tt.graphic.getMainScreenScale());
            if (canvas.width != wantwidth || canvas.height != wantheight) {
                //console.log("radio = " + radio + " ,screenwidth=" + sw + " ,windowwidth=" + ww +",ms="+ms);
                console.log("--resize wantwidth = " + wantwidth + " ,wantheight=" + wantheight);
                canvas.width = wantwidth;
                canvas.height = wantheight;
                if (tt.graphic.OnResize != null)
                    tt.graphic.OnResize(canvas.width, canvas.height);
            }

            //update next frame.
            requestAnimationFrame(this.Update.bind(this));

            var msnow = new Date().getTime();
            var delta = (msnow - this.timerMs) / 1000.0;
            this.timerMs = msnow;

            //update logic
            if (tt.graphic.OnUpdate != null)
                tt.graphic.OnUpdate(delta);



            //render logic
            if (tt.graphic.OnRender != null)
                tt.graphic.OnRender();

        }

    }
}