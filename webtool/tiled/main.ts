import { tt_impl } from "./ttimpl_web/ttimpl_web.js";
import { tt } from "./ttapi/ttapi.js";
import { GameApp, ResourceOption } from "./ttlayer2/ttlayer2.js";
//import { TTState_All } from "./ttsample/ttstate_all.js";
import { EditorApp } from "./tilededitor/editor.js";


async function start() {
   
   


    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.border = "0px";
    canvas.style.margin = "0px";

    document.body.appendChild(canvas);

     //初始化图像
    var ttimpl = new tt_impl.ttimpl_browser();
    ttimpl.Init(canvas);
    console.log("TTAPI has init.");

    // //web 音效需要按钮激活
    tt.audio.ReInit();

    // //加载自定义字体

    let font = await tt.loader.LoadCustomFont("VonwaonBitmap-16px", "./data/VonwaonBitmap-16px.ttf");

    console.log("add font:" + font);
    let op = new ResourceOption();
    op.defFontName = "VonwaonBitmap-16px";
    op.defFontSize = 32;
    GameApp.Start(op, new EditorApp());


}
start();