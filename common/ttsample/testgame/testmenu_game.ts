import { tt } from "../../ttapi/ttapi.js";
import { ElementInst, ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Tbo } from "../../ttlayer2/graphics/pipeline/render/render_elem_tbo.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Button, QUI_Label, QUI_ScreenFixer } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "../test_base.js";


export class TestMenu_PC extends Test_Base {


    OnInit(nav: TTState_All): void {
        super.OnInit(nav);



        this.container.setAsp(2 / 3, 1 / 2);
        this.AddLabel("游戏测试")
        this.AddButton("Test:Game", () => {
            //this.nav.NavigatorTo(new Test_FileApi())
        });
       
    }


}