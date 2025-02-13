
import { tt } from "../ttapi/ttapi.js";
import { DrawLayer_GUI, Resources, Border, Font, GameApp, IState, StateMgr, Vector2, QUI_ImageScale9, QUI_Label, QUI_Scale9, Color, IUserLogic, Navigator, DrawLayerTag, QUI_Image, QUI_HAlign, TextureArray, TextureFormat, Texture, ElementFormat } from "../ttlayer2/ttlayer2.js";
import { View_Menu } from "./view_menu.js";


export class GContext {
    topuiview: DrawLayer_GUI;
    //将TopUI置顶
    TopUI2Top(): void {
        let views = GameApp.GetViewList().GetDrawLayers(DrawLayerTag.GUI);
        let index = views.indexOf(this.topuiview);
        if (index != views.length - 1) {
            views.splice(index, 1);
            views.push(this.topuiview);
        }
    }
}
export class TTState_All implements IUserLogic {

    nav: Navigator<GContext>
    label_fps: QUI_Label;
    OnInit(): void {
        //创建一个导航器框架
        this.nav = new Navigator<GContext>(new GContext());


        let ct = this.nav.GetContextObj();
        ct.topuiview = new DrawLayer_GUI();

        GameApp.GetViewList().AddDrawLayer(ct.topuiview);

        this.InitTopUI(ct);
        this.nav.NavigatorTo(new View_Menu());

    }
    InitTopUI(context: GContext) {
        {
            context.topuiview.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;
            //title
            {
                let labels = Resources.CreateGUI_Label("新TTAPI", new Color(0, 0, 0, 0.5));
                context.topuiview.GetCanvas().addChild(labels);
                labels.localRect.setHPosFill(33, 31);
                labels.localRect.setVPosByTopBorder(16, 9);

            }
            let label = Resources.CreateGUI_Label("新TTAPI", new Color(0.8, 1.0, 0, 1));
            context.topuiview.GetCanvas().addChild(label);
            label.localRect.setHPosFill(32, 32);
            label.localRect.setVPosByTopBorder(16, 8);

            let roundsprite =Resources.GetPackElement().ConvertElemToSprite(Resources.GetRoundBlock());
            let img = new QUI_Image(roundsprite);
            img.localRect.setHPosByLeftBorder(16, 0);
            img.localRect.setVPosByTopBorder(16, 0);
            context.topuiview.GetCanvas().addChild(img);

            //fps
            let label_fps = this.label_fps = Resources.CreateGUI_Label("FPS:");
            context.topuiview.GetCanvas().addChild(label_fps);
            label_fps.halign = QUI_HAlign.Left;
            label_fps.localRect.setHPosByLeftBorder(100, 16);
            label_fps.localRect.setVPosByTopBorder(16, 0);
        }

    }
    frameCount: number = 0;
    timer: number = 0;

    OnUpdate(delta: number): void {
        this.nav.GetLast()?.OnUpdate(delta);

        this.frameCount++;
        this.timer += delta;
        if (this.timer > 1.0) {
            let _fps = ((((this.frameCount / this.timer) * 10 + 0.5) | 0) / 10).toString();
            if (_fps.indexOf(".") < 0)
                _fps += ".0";

            this.label_fps.text = "FPS:" + _fps;

            this.timer = 0;
            this.frameCount = 0;
        }
    }
    OnExit(): void {
        this.nav.GetLast()?.OnExit();
    }
    OnResize(width: number, height: number): void {
        this.nav.GetLast()?.OnResize(width, height);
    }

    OnKey(keycode: string, press: boolean): void {
        this.nav.GetLast()?.OnKey(keycode, press);
    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {
        this.nav.GetLast()?.OnPointAfterGUI(id, x, y, press, move);
    }
}