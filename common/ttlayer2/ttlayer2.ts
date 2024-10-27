import { tt } from "../ttapi/ttapi.js"
import { MainScreen } from "./graphics/mainscreen.js";
import { getWhiteTexture, ITexture, Texture, TextureFormat } from "./graphics/texture.js";
import { Color, DrawPoint } from "./math/vector.js";
import { InitInnerShader } from "./shader/shaderress.js";
import { TextTool } from "./text/texttool.js";
import { Render_Batcher } from "./ttlayer2_batcher.js";

export { MainScreen } from "./graphics/mainscreen.js";
export { getWhiteTexture, ITexture, Texture, TextureFormat } from "./graphics/texture.js";
export { Color, DrawPoint } from "./math/vector.js";
export { InitInnerShader } from "./shader/shaderress.js";
export { TextTool } from "./text/texttool.js";
export { Render_Batcher } from "./ttlayer2_batcher.js";
export { Mesh } from "../ttlayer2/graphics/mesh.js";

export interface IState {
  OnInit(): void;
  OnUpdate(delta: number): void
  OnExit(): void;
  OnResize(width: number, height: number): void;
  OnRender(): void;
  OnPostRender(): void;
}
export class GameApp {
  //Start 之前 ttapi 的某一个impl 应该提前初始化
  static Start(state: IState): void {


    let gl = tt.graphic.GetWebGL();
    //准备内置shader
    InitInnerShader(gl);
  
    this._mainscreen = new MainScreen(gl);


    this.regevent();
    this.ChangeState(state);
  }
  private static regevent(): void {
    tt.graphic.OnRender = this.OnRender.bind(this);
    tt.graphic.OnUpdate = this.OnUpdate.bind(this);
    tt.graphic.OnResize = this.OnResize.bind(this);
  }



  private static _mainscreen: MainScreen = null;

  private static _state: IState = null;

  static GetMainScreen(): MainScreen {
    return this._mainscreen;
  }
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


    if (this._state != null) {
      this._state.OnRender();

      //Scene part


      this._state.OnPostRender();
    }

  }
}
