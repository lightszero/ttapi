import { Render_Inst } from "../ttlayer2/graphics/pipeline/render/render_inst.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag } from "../ttlayer2/ttlayer2.js";
import { GContext } from "./ttstate_all.js";

export class Test_Canvas implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;
    canvaslayer: DrawLayer;
    canvasInst: Render_Inst;
    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        this.AddSprites();
    }

    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCanvas().scale = 2.0;

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
    AddSprites(): void {
    
        this.canvaslayer = new DrawLayer(DrawLayerTag.Main);
        this.canvasInst = new Render_Inst();
        this.canvaslayer.AddRender(this.canvasInst);
        GameApp.GetViewList().AddDrawLayers(this.canvaslayer);
    }
    OnUpdate(delta: number): void {

    }
    OnExit(): void {
        GameApp.GetViewList().RemoveDrawLayers(this.guilayer);
        GameApp.GetViewList().RemoveDrawLayers(this.canvaslayer);
    }
    OnResize(width: number, height: number): void {

    }

    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }
}