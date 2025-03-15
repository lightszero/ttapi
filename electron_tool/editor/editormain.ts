import { Color, DrawLayer_GUI, DrawLayerTag, GameApp, IUserLogic, MainScreen, QUI_Button, QUI_Canvas, QUI_Image, QUI_Label, QUI_Panel_Split, ResourceOption, Resources, tt } from "./ttlayer2/ttlayer2.js"

export class MyLogic implements IUserLogic {
    canvas: QUI_Canvas;
    OnInit(): void {
        let guilayer = new DrawLayer_GUI(DrawLayerTag.GUI);
      
        //改动这个会影响canvas size，会造成不点对点
        tt.graphic.setMainScreenScale(1);
   
        let pr = tt.graphic.getDevicePixelRadio();

        let scaleradio = (pr * 2) | 0;
        console.log("ScaleRadio=" + scaleradio);
        
        //改Camera的缩放会直接缩放内容
        guilayer.GetCamera().Scale = scaleradio;

        GameApp.GetViewList().AddDrawLayer(guilayer);

        this.canvas = guilayer.GetCanvas();

        let panelsplit1 = new QUI_Panel_Split();
        this.canvas.container.addChild(panelsplit1);

        let img = new QUI_Image();
        img.color = new Color(0.3, 0.3, 0.3, 1);
        panelsplit1.getPanel1().container.addChild(img);

        let label = new QUI_Label();

        panelsplit1.getPanel1().container.addChild(label);

        let btn = new QUI_Button();
        btn.localRect.offsetY1 += 32;
        btn.localRect.offsetY2 += 32;
        panelsplit1.getPanel2().container.addChild(btn);

    }
    OnUpdate(delta: number): void {

    }
    OnExit(): void {

    }
    OnResize(width: number, height: number): void {

    }
    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }

}
