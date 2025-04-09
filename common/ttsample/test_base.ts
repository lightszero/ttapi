import { tt } from "../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Button, QUI_Label, QUI_ScreenFixer } from "../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "./ttstate_all.js";

export class Test_Base implements IState<TTState_All> {
    nav: TTState_All;
    guilayer: DrawLayer_GUI;
    container: QUI_ScreenFixer;
    private y: number = 64;

    OnInit(nav: TTState_All): void {
        this.y = 64;
        if (this.nav == null) {
            this.nav = nav;
        }
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2;

        GameApp.GetViewList().AddDrawLayer(this.guilayer);


        this.container = new QUI_ScreenFixer();
        this.container.setAsp(2 / 3, 1 / 2);
        this.guilayer.GetCanvas().AddChild(this.container);



        this.AddBackButton();
        this.nav.context.TopUI2Top();

    }

    AddEmpty(height: number = 20): void {
        this.y += height;
    }
    GetUIY() {
        return this.y;
    }
    AddLabel(text: string, s: number = 1): void {
        let label = new QUI_Label();
        label.text = text;
        this.container.AddChild(label);
        label.halign = QUI_HAlign.Left;
        label.localRect.setHPosFill(10, 10);
        label.localRect.setVPosByTopBorder(20, this.y);
        label.fontScale.X *= s;
        label.fontScale.Y *= s;
        this.y += 24 * s;
    }
    AddButton(name: string, click: () => void): void {
        let btn = new QUI_Button();
        btn.SetText(name);
        btn.localRect.setHPosFill(10, 10);
        btn.localRect.setVPosByTopBorder(20, this.y);
        this.container.AddChild(btn);

        btn.OnClick = () => {
            click();
        }

        this.y += 24;

    }
    private AddBackButton(): void {
        if (this.nav.Count() == 1) return;
        let btn = new QUI_Button();
        btn.SetText("<--");
        btn.localRect.setHPosByLeftBorder(64, 8);
        btn.localRect.setVPosByTopBorder(20, 8);
        this.container.AddChild(btn);

        btn.OnClick = () => {
            this.nav.Back();
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