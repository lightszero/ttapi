import { MyLogic } from "./editormain.js";
import { tt_impl } from "./ttimpl_web/ttimpl_web.js";
import { GameApp, ResourceOption, tt } from "./ttlayer2/ttlayer2.js";
window.onload = async () => {
    console.log("hello world.");

    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.width = "100%";
    canvas.style.height = "100%"
    document.body.appendChild(canvas);

    // {
    //     //创建拖动条，这个方法并不好
    //     let div = document.createElement("div");
    //     div.style.position = "absolute";
    //     div.style.left = "5px";
    //     div.style.top = "5px";
    //     div.style.width = "25%"
    //     div.style.height = "24px";
    //     div.style.border = "solid 3px,#fff";
    //     div.style.backgroundColor = "#53f";
    //     (div.style as any)["-webkit-app-region"] = "drag";
    //     document.body.appendChild(div);
    // }
    //初始化ttimpl，这样就可以正常使用ttapi了
    var ttimpl = new tt_impl.ttimpl_browser();
    ttimpl.Init(canvas);
    var fontname = await tt.loader.LoadCustomFont("VonwaonBitmap", "./data/VonwaonBitmap-16px.ttf");
    let op = new ResourceOption();
    op.defFontName = fontname;
    GameApp.Start(op, new MyLogic())

}