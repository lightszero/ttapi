import { tt } from "../../ttapi/ttapi.js";
import { ElementInst, ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Tbo } from "../../ttlayer2/graphics/pipeline/render/render_elem_tbo.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign } from "../../ttlayer2/ttlayer2.js";
import { GContext } from "../ttstate_all.js";

export class Test_Load implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;
    canvaslayer: DrawLayer;
    render: Render_Element_Tbo;

    inst: ElementInst[] = []
    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        this.AddSprites();
        this.AddLabel("DrawElement,TBO模式");
        this.AddLabel("vb0 是一个小方块");
        this.AddLabel("vb1 是instance 数据");
        this.AddLabel("sprite 数据放在一张贴图里，尺寸几乎没有限制，这里使用了 512x512的float贴图");
        this.AddLabel("这个贴图尺寸下,可使用65536种精灵");



    }
    y: number = 64;
    AddLabel(text: string): void {
        let label = Resources.CreateGUI_Label(text);
        this.guilayer.GetCanvas().addChild(label);
        label.halign = QUI_HAlign.Left;
        label.localRect.setHPosByLeftBorder(196, 16);
        label.localRect.setVPosByTopBorder(16, this.y);
        label.fontScale.X *= 0.5;
        label.fontScale.Y *= 0.5;
        this.y += 16;
    }
    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;

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
        this.canvaslayer.GetCamera().Scale = 2.0;
        this.render = new Render_Element_Tbo();
        this.canvaslayer.AddRender(this.render);
        GameApp.GetViewList().AddDrawLayers(this.canvaslayer);

        let s = Resources.GetBorder2Block();
        let s2 = Resources.GetRoundBlock();

        this.render.SetPackElement(Resources.GetPackElement());

        for (var i = 0; i < 1024 * 50; i++) {
            let inst = new ElementInst();
            inst.pos = new Vector3(Math.random() * 400 - 200, Math.random() * 400 - 200, 0);
            inst.rotate = Math.random() * Math.PI;
            inst.scale = new Vector2(1, 1);
            inst.instid = i % 2 == 0 ? s.index : s2.index;

            inst.color = new Color(Math.random(), Math.random(), Math.random(), Math.random());
            this.render.AddElementInst(inst);
            this.inst.push(inst);
        }


    }
    OnUpdate(delta: number): void {
        for (var i = 0; i < this.inst.length; i++) {
            this.inst[i].rotate += delta * Math.PI;
            this.render.WriteElementInst(this.inst[i], i);
        }
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