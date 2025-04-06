import { DrawLayer_GUI, IOExt, IState } from "../../ttlayer2/ttlayer2.js";
import { Test_Base } from "../testview/test_base.js";
import { TTState_All } from "../ttstate_all.js";
import { Editor_Main } from "./ui/editor_main.js";
import { Menu_Main } from "./ui/menu_main.js";

export class Editor_TTPack extends Test_Base {
    OnInit(nav: TTState_All): void {
        super.OnInit(nav);

        IOExt.Init();

        let canvas = this.guilayer.GetCanvas();
        canvas.RemoveChildAll();
        Menu_Main.Init(canvas, () => {
            nav.Back();
        });
        Editor_Main.Init(canvas);

    }
}