import { IState } from "./ttlayer2/ttlayer2.js"
export class UserState01 implements IState {
    OnInit(): void {
        console.log("User state init.")
    }
    OnUpdate(delta: number): void {
        //console.log("User state OnUpdate:" + delta);
    }
    OnExit(): void {
        console.log("User state exit.")
    }
    OnResize(width:number,height:number):void
    {

    }
    OnPostRender():void
    {

    }

}