import { Navigator, IState, Resources, Color, QUI_Panel, GameApp,DrawLayer_GUI } from "../ttlayer2/ttlayer2.js";
import { GContext } from "./ttstate_all.js";

export class View_Menu implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;

    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;

        }


        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCanvas().scale = 2.0;

        GameApp.GetViewList().AddDrawLayers(this.guilayer);

        nav.GetContextObj().TopUI2Top();


        this.AddButton("Test UI");
        this.AddButton("Test InstCanvas");
        this.AddButton("Test Canvas");
        this.AddButton("Test TiledMap");
        this.AddButton("Test ParticleSystem");
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