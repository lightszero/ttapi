//微信小程序使用commonjs 风格
import {tt_impl} from "./ttapi/ttapi_impl_wegame/ttimpl_wx.js"
import {tt} from "./ttapi/ttapi_interface/ttapi.js"
console.log("--> mini game");
//初始化微信
let impl =new tt_impl.ttimpl_wx();
impl.Init();
let gl = tt.graphic.GetWebGL();
//wechat 的canvas 也是独立的
//let c2d =new OffscreenCanvas(16,16);

tt.graphic.OnRender=()=>
{
  gl.clearColor(1,0,1,1);
  gl.clear(gl.COLOR_BUFFER_BIT)
}

