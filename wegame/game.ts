//微信小程序使用commonjs 风格


import { tt_impl } from "./ttimpl_wegame/ttimpl_wx.js"
import { GameApp } from "./ttlayer2/ttlayer2.js"
import { TTState_Draw } from "./ttsample/ttstate_draw.js";
import { TTState_Scene } from "./ttsample/ttstate_scene.js";
console.log("-->这是mini game<--");

//var info = wx.loadFont("./VonwaonBitmap-16px.ttf")
//console.log("font:"+info);
//初始化ttapi for微信
let impl = new tt_impl.ttimpl_wx();
impl.Init();

//初始化layer2
GameApp.Start(new TTState_Scene());

