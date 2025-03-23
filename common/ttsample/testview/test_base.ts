import { tt } from "../../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Button, QUI_Label } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";

export class Test_Base implements IState<TTState_All> {
    nav: TTState_All;
    guilayer: DrawLayer_GUI;

    OnInit(nav: TTState_All): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        let gl = tt.graphic.GetWebGL();
    }
    y: number = 64;
    AddLabel(text: string, s: number = 1): void {
        let label = new QUI_Label();
        label.text = text;
        this.guilayer.GetCanvas().AddChild(label);
        label.halign = QUI_HAlign.Left;
        label.localRect.setHPosByLeftBorder(196, 16);
        label.localRect.setVPosByTopBorder(16, this.y);
        label.fontScale.X *= s;
        label.fontScale.Y *= s;
        this.y += 18 * s;
    }
    AddButton(name: string, click: () => void): void {
        let btn = new QUI_Button();
        btn.SetText(name);
        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, this.y);
        this.guilayer.GetCanvas().AddChild(btn);

        btn.OnClick = () => {
            click();
        }

        this.y += 24;

    }
    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 1.5;
        
        GameApp.GetViewList().AddDrawLayer(this.guilayer);
        let btn = new QUI_Button();
        btn.SetText("<--");
        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().AddChild(btn);

        btn.OnClick = () => {
            this.nav.Back();
        }

        this.nav.context.TopUI2Top();
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