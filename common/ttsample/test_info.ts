import { tt } from "../ttapi/ttapi.js";
import { ElementInst, ElementSprite, Render_Element } from "../ttlayer2/graphics/pipeline/render/render_elem.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign } from "../ttlayer2/ttlayer2.js";
import { GContext } from "./ttstate_all.js";

export class Test_Info implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;

    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        let gl = tt.graphic.GetWebGL();
        this.AddLabel("MAX_UNIFORM_BLOCK_SIZE=" + gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE));
        this.AddLabel("MAX_3D_TEXTURE_SIZE=" + gl.getParameter(gl.MAX_3D_TEXTURE_SIZE));
        this.AddLabel("MAX_ARRAY_TEXTURE_LAYERS=" + gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS));
        this.AddLabel("MAX_TEXTURE_SIZE=" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
        this.AddLabel("MAX_VERTEX_UNIFORM_BLOCKS=" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_BLOCKS));
        this.AddLabel("MAX_VERTEX_UNIFORM_COMPONENTS=" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_COMPONENTS));
    }
    y: number = 64;
    AddLabel(text: string): void {
        let label = Resources.CreateGUI_Label(text);
        this.guilayer.GetCanvas().addChild(label);
        label.halign= QUI_HAlign.Left;
        label.localRect.setHPosByLeftBorder(196, 16);
        label.localRect.setVPosByTopBorder(16,this.y);
        this.y += 16;
    }
    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = 3.0;
        GameApp.GetViewList().AddDrawLayers(this.guilayer);
        let btn = Resources.CreateGUI_Button("<--", new Color(1, 1, 1, 1));
        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().addChild(btn);

        btn.OnClick = () => {
            this.nav.Back();
        }

        this.nav.GetContextObj().TopUI2Top();
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