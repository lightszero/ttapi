import { tt } from "../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, QUI_Button, QUI_Label } from "../ttlayer2/ttlayer2.js";
import { TestScene_Imgs } from "./testscene/testscene_imgs.js";
import { Test_Box2D } from "./testview/test_box2d.js";
import { Test_Element_TBO } from "./testview/test_element_tbo.js";
import { Test_Element_UBO } from "./testview/test_element_ubo.js";
import { Test_FileApi } from "./testview/test_fileapi.js";
import { Test_Info } from "./testview/test_info.js";
import { Test_TexArr } from "./testview/test_texarr.js";
import { Test_Tiledmap } from "./testview/test_tiledmap.js";
import { Test_TTPack } from "./testview/test_ttpack.js";

import { GContext, TTState_All } from "./ttstate_all.js";
import { Editor_TTPack } from "./xeditor/editor_ttpack.js";

export class View_Menu implements IState<TTState_All> {
    nav: TTState_All;
    guilayer: DrawLayer_GUI;

    OnInit(nav: TTState_All): void {
        if (this.nav == null) {
            this.nav = nav;

        }


        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2

        GameApp.GetViewList().AddDrawLayer(this.guilayer);

        nav.context.TopUI2Top();

        this.x = 32;
        this.y = 16;

        this.AddButton("Test:Show GL Info", new Test_Info());
        this.AddButton("Test:TextureArray", new Test_TexArr());
        this.AddButton("Test:Element (UBO,废弃)", new Test_Element_UBO());
        this.AddButton("Test:Element (TBO)", new Test_Element_TBO());
        this.AddButton("Test:FileApi", new Test_FileApi());
        this.AddButton("Test:Tiledmap", new Test_Tiledmap());
        this.AddButton("Test:TTPack", new Test_TTPack());
        this.AddButton("Test:Box2d", new Test_Box2D());
        this.AddEmpty();
        this.AddButton("TestScene:Imgs",new TestScene_Imgs());
        this.AddEmpty();
        this.AddButton("Editor:动画编辑器", new Editor_TTPack());
    }
    y: number = 16;
    x: number = 16;
    AddEmpty():void
    {
        this.y += 24;
        if (this.y > 256) {
            this.y = 16;
            this.x += 200;
        }
    }
    AddButton(name: string, target: IState<Navigator> = null): void {
        let btn = new QUI_Button();
        btn.SetText(name);
        btn.localRect.setHPosByLeftBorder(196, this.x);
        btn.localRect.setVPosByTopBorder(20, this.y);
        this.guilayer.GetCanvas().AddChild(btn);
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
    OnWheelAfterGUI(dx: number, dy: number, dz: number): void {

    }
}