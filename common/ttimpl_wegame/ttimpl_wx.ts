
/// <reference path="./lib/index.d.ts" />
import { tt } from "../ttapi/ttapi.js";
import * as impl_g from "./graphic/ttimpl_graphic";
//import * as impl_s from "./graphic/shader/shaders"
import * as impl_l from "./ttimpl_wx_loader"
//import * as impl_a from "./audio/ttimpl_wx_audio"
import * as impl_a2 from "./audio/ttimpl_webaudio"
import * as impl_i from "./ttimpl_wx_input"
import * as impl_p from "./ttapi_impl_platform"
import { WXStore } from "./ttimpl_wx_store";
export namespace tt_impl {

    export class ttimpl_wx {
        constructor() {

        }

        webgl?: WebGL2RenderingContext | null;
        public Init(): void {
            let canvas = wx.createCanvas();
            wx.createCanvas();


            //wx.createImage();
            this.webgl = canvas.getContext("webgl2", { antialias: false });

            if (this.webgl != null) {
                //明确初始化backcanvas,明确告诉你
                let _canvas2d = wx.createCanvas();

                let c2d = _canvas2d.getContext("2d");
                tt.graphic = new impl_g.tt_impl.ttimpl_graphics(this.webgl, c2d);

                this.timerMs = new Date().getTime();
                requestAnimationFrame(this.Update.bind(this));
            } else {
                console.error("init webgl error.");
            }


  

            tt.loader = new impl_l.tt_impl.WxLoader();
            //tt.audio = new impl_a.tt_impl.WxAudio();
            tt.audio = new impl_a2.tt_impl.AudioImpl();
            tt.input = new impl_i.tt_impl.WxInput();
            tt.platform = new impl_p.tt_impl.Platform();
            tt.store = new WXStore();
            // tt.platform = new ttimpl_platform();
            // (tt.audio as ttimpl_audio).Init();
        }
        public ReInitAudio(): void {
            // (tt.audio as ttimpl_audio).Init();
        }
        public SendEnvEventToUser(name: string, obj: any) {
            //     (tt.platform as tt.impl.ttimpl_platform).SendEnvEventToUser(name, obj);
        }
        // public async LoadDirect(rootPack:tt.IPackGroup )
        // {
        //     tt.rootPack =rootPack;
        //     this.Start();
        // }

        // public async LoadResPack(url: string): Promise<void> {
        //     if (url.includes(".ttpak")) {
        //         let down = await fetch(url);
        //         let u8 = new Uint8Array(await down.arrayBuffer());
        //         tt.rootPack = new ttimpl_PackGroup_Mem("root", u8);

        //     }
        //     else {
        //         var folder = new ttimpl_PackGroup_Path(url);
        //         await folder.LoadAsync();
        //         tt.rootPack = folder;
        //     }

        //     this.Start();
        // }
        // Start():void
        // {
        //     var allres = tt.rootPack.GetAllResourceName();
        //     for (var i in allres) {
        //         console.log("res=" + allres[i]);

        //     }
        //     var jsonitem = tt.rootPack.GetPackItem("index");
        //     if (jsonitem == null)
        //         throw new Error("not have index.");
        //     var json = JSON.parse(jsonitem.GetAsText());
        //     var name = json["name"];
        //     var desc = json["desc"];
        //     var cover = json["cover"];
        //     console.warn("pack load:" + name + "  desc=" + desc + "  cover=" + cover);
        //     var scripts = json["script"] as string[];
        //     for (var s = 0; s < scripts.length; s++) {
        //         var scriptitem = tt.rootPack.GetPackItem(PathTool.GetFileName(scripts[s]).name)
        //         if (scriptitem == null)
        //             throw new Error("not have script:" + scripts[s]);
        //         eval(scriptitem.GetAsText());
        //     }
        // }
        timerMs: number = 0;
        Update(): void {
            if (this.webgl == null)
                return;
            //resize logic
            var canvas = this.webgl.canvas as HTMLCanvasElement;


            var wantwidth = (tt.graphic.getDeviceScreenWidth() * tt.graphic.getFinalScale()) | 0;
            var wantheight = (tt.graphic.getDeviceScreenHeight() * tt.graphic.getFinalScale()) | 0;

            //console.log("canvas.clientWidth=" + canvas.clientWidth + "wantwidth=" + wantwidth + "radio=" + radio + " mainscale=" + api.tt.graphic.getMainScreenScale());
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
            // (tt.graphic as impl_g.tt_impl.ttimpl_graphics)._OnUpdateTask();
            //tt.graphic.getMainScreen().Begin();
            if (tt.graphic.OnRender != null)
                tt.graphic.OnRender();
        }

    }
}