import { tt_impl } from "./ttimpl_web/ttimpl_web.js";
import { tt } from "./ttapi/ttapi.js";
import { GameApp } from "./ttlayer2/ttlayer2.js";
import { TTState_Draw } from "./ttsample/ttstate_draw.js";
import { TTState_Scene } from "./ttsample/ttstate_scene.js";


async function start() {
    //初始化图像
    var ttimpl = new tt_impl.ttimpl_browser();


    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.border = "0px";
    canvas.style.margin = "0px";

    document.body.appendChild(canvas);
    ttimpl.Init(canvas);
    console.log("hello world");

    //web 音效需要按钮激活
    //tt.audio.ReInit();

    //加载自定义字体

    let font = await tt.loader.LoadCustomFont("v16", "./VonwaonBitmap-16px.ttf");

    console.log("add font:" + font);
    //初始化layer2
    GameApp.Start(new TTState_Scene());
    //GameApp.ChangeState();

}
start();
