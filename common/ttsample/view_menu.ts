import { tt } from "../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI } from "../ttlayer2/ttlayer2.js";
import { Test_Element_TBO } from "./test_element_tbo.js";
import { Test_Element_UBO } from "./test_element_ubo.js";
import { Test_FileApi } from "./test_fileapi.js";
import { Test_Info } from "./test_info.js";
import { Test_TexArr } from "./test_texarr.js";
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

        GameApp.GetViewList().AddDrawLayers(this.guilayer);

        nav.GetContextObj().TopUI2Top();

        this.x = 32;
        this.y = 16;
        this.AddButton("Test Info", new Test_Info());
        this.AddButton("TextureArray", new Test_TexArr());
        this.AddButton("Element 渲染器(UBO,废弃)", new Test_Element_UBO());
        this.AddButton("Element 渲染器(TBO)", new Test_Element_TBO());
        this.AddButton("Element Tilemap[欠]", null);
        this.AddButton("Element + TF 粒子系统[欠]", null);
        this.AddButton("GUI[欠]");
        this.AddButton("Box2d[欠]");
        this.AddButton("Ani[欠]");
        this.AddButton("FILE API",new Test_FileApi());
    }
    y: number = 32;
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
            this.y = 32;
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