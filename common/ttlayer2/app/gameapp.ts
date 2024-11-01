import { tt } from "../../ttapi/ttapi.js"
import { MainScreen } from "../graphics/mainscreen.js";
import { InitInnerShader } from "../shader/shaderress.js";
import { Scene } from "../pipeline/scene.js";


export interface IState {
  OnInit(): void;
  OnUpdate(delta: number): void
  OnExit(): void;
  OnResize(width: number, height: number): void;

}

//添加额外的绘制层
export interface IRenderExt {
  OnPreRender(): void;
  OnPostRender(): void;
}
export class GameApp {
  //Start 之前 ttapi 的某一个impl 应该提前初始化
  static Start(state: IState): void {


    let gl = tt.graphic.GetWebGL();
    //准备内置shader
    InitInnerShader(gl);

    this._mainscreen = new MainScreen(gl);
    this._scene = new Scene();

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

  private static _scene: Scene = null;
  static GetScene(): Scene {
    return this._scene;
  }

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
  static AddRenderExt(ext: IRenderExt) {
    this.render_ext.push(ext);
  }
  static RemoveRenderExt(ext: IRenderExt) {
    let i = this.render_ext.indexOf(ext);
    if (i >= 0) {
      this.render_ext.splice(i, 1);
    }
  }
  private static OnUpdate(delta: number): void {
    this._scene.Update(delta);
    if (this._state != null) {
      this._state.OnUpdate(delta);
    }
  }
  private static OnResize(width: number, height: number): void {
    if (this._state != null) {
      this._state.OnResize(width, height);
    }
  }
  private static render_ext: IRenderExt[] = [];
  private static OnRender(): void {
    let gl = tt.graphic.GetWebGL();

    for (var i = 0; i < this.render_ext.length; i++) {
      this.render_ext[i].OnPreRender();
    }

    //Scene part
    this._scene.Render();


    for (var i = 0; i < this.render_ext.length; i++) {
      this.render_ext[i].OnPostRender();
    }


  }
}
