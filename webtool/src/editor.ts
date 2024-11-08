import { FlatView } from "../ttlayer2/pipeline/flatview.js";
import { GameApp, IState } from "../ttlayer2/ttlayer2.js";

export class EditState implements IState
{
    OnInit(): void
    {
        let newr = new FlatView();
        GameApp.GetViewList().views.push(newr);
        
        
    }
    OnUpdate(delta: number): void
    {

    }
    OnExit(): void
    {

    }
    OnResize(width: number, height: number): void
    {

    }
}