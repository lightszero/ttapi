import { tt } from "../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI } from "../ttlayer2/ttlayer2.js";
import { Test_Element_TBO } from "./testview/test_element_tbo.js";
import { Test_Element_UBO } from "./testview/test_element_ubo.js";
import { Test_FileApi } from "./testview/test_fileapi.js";
import { Test_Info } from "./testview/test_info.js";
import { Test_TexArr } from "./testview/test_texarr.js";
import { Test_Tiledmap } from "./testview/test_tiledmap.js";
import { Test_TTPack } from "./testview/test_ttpack.js";
import { Tool_TexPack } from "./toolview/tool_texpack.js";
import { GContext } from "./ttstate_all.js";

export class View_Menu implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;

    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;

        }


        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;

        GameApp.GetViewList().AddDrawLayer(this.guilayer);

        nav.GetContextObj().TopUI2Top();

        this.x = 32;
        this.y = 16;
        this.AddButton("工具:本地看图",new Tool_TexPack());
        this.AddButton("Test:Show GL Info", new Test_Info());
        this.AddButton("Test:TextureArray", new Test_TexArr());
        this.AddButton("Test:Element (UBO,废弃)", new Test_Element_UBO());
        this.AddButton("Test:Element (TBO)", new Test_Element_TBO());
        this.AddButton("Test:Element Tilemap[欠]", null);
        this.AddButton("Test:TF 粒子系统[欠]", null);
        this.AddButton("Test:GUI[欠]");
        this.AddButton("Test:Box2d[欠]");
        this.AddButton("Test:Ani[欠]");
        this.AddButton("Test:FileApi",new Test_FileApi());
        this.AddButton("Test:Tiledmap", new Test_Tiledmap());
        this.AddButton("Test:TTPack", new Test_TTPack());
    }
    y: number = 16;
    x: number = 16;
    AddButton(name: string, target: IState<Navigator<GContext>> = null): void {
        let btn = Resources.CreateGUI_Button(name, new Color(1, 1, 1, 1));
        btn.localRect.setHPosByLeftBorder(196, this.x);
        btn.localRect.setVPosByTopBorder(20, this.y);
        this.guilayer.GetCanvas().addChild(btn);
        if (target != null) {
            btn.OnClick = () => {
                this.nav.NavigatorTo(target);
            }
        }
        this.y += 24;
        if (this.y > 256) {
            this.y = 16;
            this.x += 200;
        }
    }
    OnUpdate(delta: number): void {

    }
    OnExit(): void {
        GameApp.GetViewList().RemoveDrawLayers(this.guilayer);

    }
    OnResize(width: number, height: number): void {

    }

    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }
}