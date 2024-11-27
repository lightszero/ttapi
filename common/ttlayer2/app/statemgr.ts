export interface IState<T> {
    OnInit(mgr: StateMgr<T>): void;
    OnUpdate(delta: number): void
    OnExit(): void;
    OnResize(width: number, height: number): void;
  
    OnKey(keycode: string, press: boolean): void;
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void;
  }
  

export class StateMgr<T> {
    private contextObj: T = null;
    private _state: IState<T>=null;
    constructor(t:T)
    {
      this.contextObj = t;
    }
    GetContextObj(): T {
      return this.contextObj;
    }
    
    ChangeState(state: IState<T>): void {
      if (this._state != null) {
        this._state.OnExit();
      }
      this._state = state;
      if (this._state != null) {
        this._state.OnInit(this);
      }
    }
    GetState():IState<T>
    {
      return this._state;
    }
  }
