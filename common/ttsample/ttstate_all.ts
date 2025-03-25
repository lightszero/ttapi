
import { tt } from "../ttapi/ttapi.js";
import { DrawLayer_GUI, Resources, Border, Font, GameApp, IState, StateMgr, Vector2, QUI_ImageScale9, QUI_Label, QUI_Scale9, Color, IUserLogic, Navigator, DrawLayerTag, QUI_Image, QUI_HAlign, TextureArray, TextureFormat, Texture, ElementFormat, QUI_Resource } from "../ttlayer2/ttlayer2.js";
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
export class TTState_All extends Navigator implements IUserLogic {


    label_fps: QUI_Label;
    context: GContext = new GContext();
    OnInit(): void {
        //创建一个导航器框架




        this.context.topuiview = new DrawLayer_GUI();

        GameApp.GetViewList().AddDrawLayer(this.context.topuiview);

        this.InitTopUI(this.context);
        this.NavigatorTo(new View_Menu());

    }
    InitTopUI(context: GContext) {
        {
            tt.graphic.setMainScreenScale(1);
            context.topuiview.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 1.5;
            //title
            {
                let labels = new QUI_Label();
                labels.text = "新TTAPI";
                labels.localColor = new Color(0, 0, 0, 0.5);
                context.topuiview.GetCanvas().AddChild(labels);
                labels.localRect.setHPosFill(33, 31);
                labels.localRect.setVPosByTopBorder(16, 9);

            }
            let label = new QUI_Label();
            label.text = "新TTAPI";
            label.localColor = new Color(0.8, 1.0, 0, 1);
            context.topuiview.GetCanvas().AddChild(label);
            label.localRect.setHPosFill(32, 32);
            label.localRect.setVPosByTopBorder(16, 8);

            let img = new QUI_Image();
            img.sprite = QUI_Resource.GetSprite("round");
            img.localRect.setHPosByLeftBorder(16, 0);
            img.localRect.setVPosByTopBorder(16, 0);
            context.topuiview.GetCanvas().AddChild(img);

            //fps
            let label_fps = this.label_fps = new QUI_Label();
            label_fps.text = "FPS:";
            context.topuiview.GetCanvas().AddChild(label_fps);
            label_fps.halign = QUI_HAlign.Left;
            label_fps.localRect.setHPosByLeftBorder(100, 16);
            label_fps.localRect.setVPosByTopBorder(16, 0);
        }

    }
    frameCount: number = 0;
    timer: number = 0;

    OnUpdate(delta: number): void {
        this.GetLast()?.OnUpdate(delta);

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
        this.GetLast()?.OnExit();
    }
    OnResize(width: number, height: number): void {
        this.GetLast()?.OnResize(width, height);
    }

    OnKey(keycode: string, press: boolean): void {
        this.GetLast()?.OnKey(keycode, press);
    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {
        this.GetLast()?.OnPointAfterGUI(id, x, y, press, move);
    }
    OnWheelAfterGUI(dx: number, dy: number, dz: number): void {
        this.GetLast()?.OnWheelAfterGUI(dx, dy, dz);
    }
}