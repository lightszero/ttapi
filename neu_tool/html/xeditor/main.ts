import { EditorMain } from "./editormain.js";
import { tt_impl } from "../ttimpl_web/ttimpl_web.js";
import { GameApp, ResourceOption, tt } from "../ttlayer2/ttlayer2.js";
import { IOExt } from "../xioext/ioext.js";
window.onload = async () => {
    console.log("hello world.");

    IOExt.Init();
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.width = "100%";
    canvas.style.height = "100%"
    document.body.appendChild(canvas);


    var ttimpl = new tt_impl.ttimpl_browser();
    ttimpl.Init(canvas);
    var fontname = await tt.loaderex.LoadCustomFont("VonwaonBitmap", "./resource/VonwaonBitmap-16px.ttf");
    let op = new ResourceOption();
    op.defFontName = fontname;
    GameApp.Start(op, new EditorMain())

}