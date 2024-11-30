import { tt } from "../../ttapi/ttapi.js"
import { MainScreen } from "../graphics/mainscreen.js";
import { InitInnerShader } from "../resources/defshader.js";
import { DrawLayer_GUI } from "../graphics/pipeline/drawlayer_gui.js";
import { DrawLayerList, DrawLayerTag } from "../graphics/pipeline/drawlayer.js";

import { IState } from "./statemgr.js";
import { Resources } from "../ttlayer2.js";



export interface IUserLogic {
  OnInit(): void;
  OnUpdate(delta: number): void
  OnExit(): void;
  OnResize(width: number, height: number): void;

  OnKey(keycode: string, press: boolean): void;
  OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void;
}

export class GameApp {
  static gameData: object;
  //Start 之前 ttapi 的某一个impl 应该提前初始化
  static Start(userlogic: IUserLogic): void {


    let gl = tt.graphic.GetWebGL();

    Resources.InitInnerResource();

    this._mainscreen = new MainScreen(gl);
    this._viewlist = new DrawLayerList();

    this.regevent();

    this.SetUserLogic(userlogic);
  }

  private static regevent(): void {
    tt.graphic.OnRender = this.OnRender.bind(this);
    tt.graphic.OnUpdate = this.OnUpdate.bind(this);
    tt.graphic.OnResize = this.OnResize.bind(this);
    tt.input.OnPoint = this.OnPoint.bind(this);
    tt.input.OnKey = this.OnKey.bind(this);
  }

  public static Pause(v: boolean) {
    this._pause = v;
  }
  private static _pause: boolean = false;

  private static _mainscreen: MainScreen = null;

  private static _state: IUserLogic = null;

  static SetUserLogic(_logic: IUserLogic) {
    if (this._state != null) {
      this._state.OnExit();
    }
    this._state = _logic;
    if (this._state != null) {
      this._state.OnInit();
    }
  }
  private static _viewlist: DrawLayerList = null;
  static GetViewList(): DrawLayerList {
    return this._viewlist;
  }

  private static _willfence: boolean = false;
  static Fence(): boolean {
    if (this._willfence)
      return false;
    this._willfence = true;
    return true;
  }
  static CanFence(): boolean {
    return !this._willfence;
  }
  private static _fenceid: number = 0;
  static GetFenceID(): number {
    return this._fenceid;
  }

  static GetMainScreen(): MainScreen {
    return this._mainscreen;
  }


  private static OnUpdate(delta: number): void {
    if (this._pause)
      return;
    this._viewlist.Update(delta);
    if (this._state != null) {
      this._state.OnUpdate(delta);
    }
  }
  private static OnResize(width: number, height: number): void {
    if (this._pause)
      return;
    if (this._state != null) {
      this._state.OnResize(width, height);
    }
  }


  private static OnRender(): void {
    if (this._pause)
      return;
    //console.log("============renderframe========<");
    let gl = tt.graphic.GetWebGL();



    //Scene part
    this._viewlist.Render();



    if (this._willfence) {
      this.DoFence(gl);
    }
  }
  private static DoFence(gl: WebGL2RenderingContext) {
    //console.log("==>start fence");
    this._willfence = false;


    //用update 查fence 虽然也行，但感觉上setTimeout(0) 可能会更快一点？
    let fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    let checkfunc = () => {
      //webgl 这东西咋没啥用


      // readonly ALREADY_SIGNALED: 0x911A;
      // readonly TIMEOUT_EXPIRED: 0x911B;
      // readonly CONDITION_SATISFIED: 0x911C;
      // readonly WAIT_FAILED: 0x911D;
      let r = gl.clientWaitSync(fence, 0, 0);
      //console.log("clientWaitSync state=0x" + r.toString(16));

      //waitsync 和 clientwaitsync 都可以处理
      //clientWaitSync的返回值可以直接判断，用waitsync 就需要用getSyncParameter来出判断
      //gl.waitSync(fence, 0, gl.TIMEOUT_IGNORED);
      //readonly UNSIGNALED: 0x9118;
      //readonly SIGNALED: 0x9119;
      //let s = gl.getSyncParameter(fence, gl.SYNC_STATUS);
      //console.log("sync state=0x" + s.toString(16));


      if (r == gl.TIMEOUT_EXPIRED || r == gl.WAIT_FAILED) {
        console.log("=>not signed.");
        setTimeout(checkfunc, 0);
        return;
      }
      else {
        console.log("=>signed.");
        gl.deleteSync(fence);

        this._willfence = false;
        this._fenceid++;
      }

    }
    setTimeout(checkfunc, 0);
  }
  private static OnPoint(id: number, x: number, y: number, press: boolean, move: boolean): void {
    if (this._pause)
      return;
    let guiview = this._viewlist.GetDrawLayers(DrawLayerTag.GUI);
    if (guiview != null) {
      for (let i = guiview.length - 1; i >= 0; i--) {

        let kill = false;

        let rs = guiview[i].GetRenders();
        for (let j = rs.length - 1; j >= 0; j--) {
          let gui = rs[j].GetGUI();
          if (gui != null) {
            kill = gui.OnTouch(id, press, move, x, y);
            if (kill)
              break;
          }
        }

        if (kill)
          break;
      }
    }
    if (this._state != null) {
      this._state.OnPointAfterGUI(id, x, y, press, move);
    }
  }
  private static OnKey(keycode: string, press: boolean): void {
    if (this._pause)
      return;
    if (this._state != null) {
      this._state.OnKey(keycode, press);
    }
  }
}
