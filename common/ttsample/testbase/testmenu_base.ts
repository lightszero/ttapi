import { tt } from "../../ttapi/ttapi.js";
import { ElementInst, ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Tbo } from "../../ttlayer2/graphics/pipeline/render/render_elem_tbo.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Button, QUI_Label, QUI_ScreenFixer } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "../test_base.js";
import { Test_Info } from "./test_info.js";
import { Test_TexArr } from "./test_texarr.js";
import { Test_Element_TBO } from "./test_element_tbo.js";
import { Test_Tiledmap } from "./test_tiledmap.js";
import { Test_TTPack } from "./test_ttpack.js";
import { Test_Box2D } from "./test_box2d.js";

export class TestMenu_Base extends Test_Base {


    OnInit(nav: TTState_All): void {
        super.OnInit(nav);



        this.container.setAsp(2 / 3, 1 / 2);
        this.AddLabel("基本功能测试")
        this.AddButton("Test:Show GL Info", () => {
            this.nav.NavigatorTo(new Test_Info())
        });
        this.AddButton("Test:TextureArray", () => {
            this.nav.NavigatorTo(new Test_TexArr())
        });
        this.AddButton("Test:Element (TBO)", () => {
            this.nav.NavigatorTo(new Test_Element_TBO())
        });
        this.AddButton("Test:Tiledmap", () => {
            this.nav.NavigatorTo(new Test_Tiledmap())
        });
        this.AddButton("Test:TTPack", () => {
            this.nav.NavigatorTo(new Test_TTPack())
        });
        this.AddButton("Test:Box2d", () => {
            this.nav.NavigatorTo(new Test_Box2D())
        });
    }


}