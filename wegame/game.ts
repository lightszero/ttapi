//微信小程序使用commonjs 风格
import { UserState01 } from "./game_state1.js";
import { tt_impl } from "./ttapi/ttapi_impl_wegame/ttimpl_wx.js"
import { GameApp } from "./ttapi_layer2/ttlayer2.js"
console.log("-->这是mini game<--");

//初始化ttapi for微信
let impl = new tt_impl.ttimpl_wx();
impl.Init();

//初始化layer2
GameApp.Start();
GameApp.ChangeState(new UserState01());
