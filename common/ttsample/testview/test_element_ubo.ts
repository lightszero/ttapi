import { tt } from "../../ttapi/ttapi.js";
import { ElementInst, ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Ubo } from "../../ttlayer2/graphics/pipeline/render/render_elem_ubo.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Label, QUI_Button } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";

export class Test_Element_UBO implements IState<TTState_All> {
    nav: TTState_All;
    guilayer: DrawLayer_GUI;
    canvaslayer: DrawLayer;
    render: Render_Element_Ubo;

    inst: ElementInst[] = []
    OnInit(nav: TTState_All): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        this.AddSprites();
        this.AddLabel("DrawElement,UBO模式");
        this.AddLabel("vb0 是一个小方块");
        this.AddLabel("vb1 是instance 数据");
        this.AddLabel("sprite 数据放在Uniform里，尺寸受到设备限制");
        this.AddLabel("移动平台可使用1023种精灵");
        this.AddLabel("这个模式不如TBO模式");

    }
    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;
        GameApp.GetViewList().AddDrawLayer(this.guilayer);
        let btn = new QUI_Button();
        (btn.elemNormal.GetChild(0) as QUI_Label).text = "<--"
        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().AddChild(btn);

        btn.OnClick = () => {
            this.nav.Back();
        }

        this.nav.context.TopUI2Top();
    }

    y: number = 64;
    AddLabel(text: string): void {
        let label = new QUI_Label();
        label.text = text;
        this.guilayer.GetCanvas().AddChild(label);
        label.halign = QUI_HAlign.Left;
        label.localRect.setHPosByLeftBorder(196, 16);
        label.localRect.setVPosByTopBorder(16, this.y);
        label.fontScale.X *= 0.5;
        label.fontScale.Y *= 0.5;
        this.y += 16;
    }
    AddSprites(): void {

        this.canvaslayer = new DrawLayer(DrawLayerTag.Main);
        this.canvaslayer.GetCamera().Scale = 2.0;
        this.render = new Render_Element_Ubo();
        this.canvaslayer.AddRender(this.render);
        GameApp.GetViewList().AddDrawLayer(this.canvaslayer);

        let s = Resources.GetBlock("border2")
        let s2 = Resources.GetBlock("round");

        this.render.SetTexture(Resources.GetPackElement().GetPackTexDuo());

        let elem1: ElementSprite = null;
        let elem2: ElementSprite = null;
        {//Add a Sprite 原型


            let elem = new ElementSprite();
            elem.sizeTL = new Vector2(0, 0);
            elem.sizeRB = new Vector2(16, 16);

            elem.uvCenter = s.uvCenter.Clone();
            elem.uvHalfSize = s.uvHalfSize.Clone();
            elem.uvLayer = s.uvLayer;
            elem.eff = s.eff
            this.render.AddElement(elem);
            elem1 = elem;
        }
        {//Add a Sprite 原型


            let elem = new ElementSprite();
            elem.sizeTL = new Vector2(-8, -8);
            elem.sizeRB = new Vector2(8, 8);

            elem.uvCenter = s2.uvCenter.Clone();
            elem.uvHalfSize = s2.uvHalfSize.Clone();
            elem.uvLayer = s2.uvLayer;
            elem.eff = s2.eff
            this.render.AddElement(elem);
            elem2 = elem;
        }
        for (var i = 0; i < 1024 ; i++) {
            let inst = new ElementInst();
            inst.pos = new Vector3(Math.random() * 400 - 200, Math.random() * 400 - 200, 0);
            inst.rotate = Math.random() * Math.PI;
            inst.scale = new Vector2(1, 1);
            inst.instid = i % 2 == 0 ? elem1.index : elem2.index;

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