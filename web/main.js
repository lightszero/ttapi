import { tt_impl } from "./ttimpl_web/ttimpl_web.js";
import { GameApp } from "./ttlayer2/ttlayer2.js";
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
//初始化layer2
GameApp.Start();
// tt.graphic.OnRender=()=>{
//     var gl =tt.graphic.GetWebGL();
//     gl.clearColor(0,0.5,0.5,1); 
//     gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//     gl.finish();
// }
