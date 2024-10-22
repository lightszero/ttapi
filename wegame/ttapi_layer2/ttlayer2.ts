import { tt } from "../ttapi/ttapi_interface/ttapi.js"
import { MainScreen } from "./graphics/mainscreen.js";
import { getWhiteTexture, ITexture, Texture, TextureFormat } from "./graphics/texture.js";
import { DrawPoint } from "./math/vector.js";
import { InitInnerShader } from "./shader/shaderress.js";
import { Render_Batcher } from "./ttlayer2_batcher.js";


export interface IState {
  OnInit(): void;
  OnUpdate(delta: number): void
  OnExit(): void;
  OnResize(width: number, height: number): void;
  OnPostRender(): void;
}
export class GameApp {
  //Start 之前 ttapi 的某一个impl 应该提前初始化
  static Start(): void {


    let gl = tt.graphic.GetWebGL();
    //准备内置shader
    InitInnerShader(gl);
    this._quadbatcher = new Render_Batcher(gl);
    this._mainscreen = new MainScreen(gl);

    let p0 = new DrawPoint();
    p0.x = 0;
    p0.y = 0;
    p0.u = 0;
    p0.v = 0;

    let p1 = new DrawPoint();
    p1.x = 50
    p1.y = 0;
    p1.u = 1;
    p1.v = 0;
    p1.eff = 0;
    let p2 = new DrawPoint();
    p2.x = 0;
    p2.y = 50;
    p2.u = 0;
    p2.v = 1;
    p2.eff = 0;
    let p3 = new DrawPoint();
    p3.x = 50;
    p3.y = 50;
    p3.u = 1;
    p3.v = 1;
    p3.eff = 0;
    this.pts.push(p0);
    this.pts.push(p1);
    this.pts.push(p2);
    this.pts.push(p3);

    let data= tt.loader.LoadTextPixel("你好H2o",24 ,240,24);

    this.tex = new Texture(gl,data.width,data.height,TextureFormat.RGBA32,data.data,true,false);
    this.regevent();
  }
  private static regevent(): void {
    tt.graphic.OnRender = this.OnRender.bind(this);
    tt.graphic.OnUpdate = this.OnUpdate.bind(this);
    tt.graphic.OnResize = this.OnResize.bind(this);
  }

  private static pts: DrawPoint[] = [];
  private static tex: ITexture = null;

  private static _mainscreen: MainScreen = null;
  private static _quadbatcher: Render_Batcher = null;
  private static _state: IState = null;
  static ChangeState(state: IState): void {
    if (this._state != null) {
      this._state.OnExit();
    }
    this._state = state;
    if (this._state != null) {
      this._state.OnInit();
    }
  }
  private static OnUpdate(delta: number): void {
    if (this._state != null) {
      this._state.OnUpdate(delta);
    }
  }
  private static OnResize(width: number, height: number): void {
    if (this._state != null) {
      this._state.OnResize(width, height);
    }
  }
  private static OnRender(): void {

    let gl = tt.graphic.GetWebGL();

    gl.clearColor(1, 0, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT)

    this._mainscreen.Begin();
    {
      this._quadbatcher.BeginDraw(this._mainscreen);

      for (var i = 0; i < 10; i++) {
        // for (var k = 0; k < 4; k++) {
        //     this.pts[k].r = Math.random();
        //     this.pts[k].g = Math.random();
        //     this.pts[k].b = Math.random();
        // }
        this.pts[0].x = this.pts[2].x =  - 150;
        this.pts[1].x = this.pts[3].x = this.pts[0].x + 3000;

        this.pts[0].y = this.pts[1].y =  - 150;
        //let y =this.pts[0].y;
        this.pts[2].y = this.pts[3].y = this.pts[0].y + 300;
        this._quadbatcher.DrawQuads(this.tex, null, null, this.pts, 1);
      }


      this._quadbatcher.EndDraw();
    }
    this._mainscreen.End();
    if (this._state != null) {
      this._state.OnPostRender();
    }

  }
}
