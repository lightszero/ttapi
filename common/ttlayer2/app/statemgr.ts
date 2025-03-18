export interface IState<T> {
    OnInit(mgr: T): void;
    OnUpdate(delta: number): void
    OnExit(): void;
    OnResize(width: number, height: number): void;

    OnKey(keycode: string, press: boolean): void;
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void;
}


//状态机

export class StateMgr {



    protected _state: IState<StateMgr> = null;


    ChangeState(state: IState<StateMgr>): void {
        if (this._state != null) {
            this._state.OnExit();
        }
        this._state = state;
        if (this._state != null) {
            this._state.OnInit(this);
        }
    }
    GetState(): IState<StateMgr> {
        return this._state;
    }
}


//导航器
export class Navigator {


    protected _stateStack: IState<Navigator>[] = [];


    GetLast(): IState<Navigator> {
        if (this._stateStack.length == 0)
            return null;
        return this._stateStack[this._stateStack.length - 1];
    }
    Count(): number {
        return this._stateStack.length;
    }
    NavigatorTo(state: IState<Navigator>): void {
        if (state == null)
            throw "不可以导航到空状态"
        let index = this._stateStack.indexOf(state);
        //如果存在则//一路Back
        if (index >= 0) {
            this.BackTo(state);
        }
        else {
            this.Push(state);
        }
    }
    Back(): void {
        if (this._stateStack.length == 0)
            throw "已经是空栈状态";
        let last = this._stateStack[this._stateStack.length - 1];
        this._stateStack.splice(this._stateStack.length - 1, 1);
        last.OnExit();

        if (this._stateStack.length > 0) {
            let last2 = this._stateStack[this._stateStack.length - 1];

            last2.OnInit(this);

        }
    }
    BackTo(state: IState<Navigator>): void {
        if (state == null)
            throw "不可以导航到空状态"
        let index = this._stateStack.indexOf(state);
        if (index < 0)
            throw "不存在的栈,无法回退"

        //已经完成
        if (index == this._stateStack.length - 1)
            throw "不能回退到自身"

        while (this._stateStack.length > 0) {
            let last = this._stateStack[this._stateStack.length - 1];
            this._stateStack.splice(this._stateStack.length - 1, 1);
            if (last != state) {
                last.OnExit();
            }
            else {
                last.OnInit(this);
                return;
            }
        }
    }
    Push(state: IState<Navigator>): void {
        if (this._stateStack.length > 0) {
            this._stateStack[this._stateStack.length - 1].OnExit();
        }
        this._stateStack.push(state);
        state.OnInit(this);
    }
}