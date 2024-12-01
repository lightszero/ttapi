import { ElementInst, ElementSprite } from "../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Ubo } from "../ttlayer2/graphics/pipeline/render/render_elem_ubo.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3 } from "../ttlayer2/ttlayer2.js";
import { GContext } from "./ttstate_all.js";

export class Test_Element implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;
    canvaslayer: DrawLayer;
    render: Render_Element_Ubo;

    inst: ElementInst[] = []
    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        this.AddSprites();
    }

    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = 2.0;
        //this.guilayer.GetCanvas().scale = 2.0;

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
        this.render = new Render_Element_Ubo();
        this.canvaslayer.AddRender(this.render);
        GameApp.GetViewList().AddDrawLayers(this.canvaslayer);

        let s = Resources.GetBorder2Block();
        let s2 = Resources.GetRoundBlock();
        this.render.material.uniformTexs["tex"].value = s.texrgba;
        this.render.material.uniformTexs["tex2"].value = s.texgray;

        let elem1: ElementSprite = null;
        let elem2: ElementSprite = null;
        {//Add a Sprite 原型


            let elem = new ElementSprite();
            elem.sizeTL = new Vector2(-8, -8);
            elem.sizeRB = new Vector2(8, 8);

            elem.uvCenter = new Vector2(s.uv.U1 * 0.5 + s.uv.U2 * 0.5, s.uv.V1 * 0.5 + s.uv.V2 * 0.5);
            elem.uvHalfSize = new Vector2((s.uv.U2 - s.uv.U1) * 0.5, (s.uv.V2 - s.uv.V1) * 0.5);
            elem.uvLayer = s.uvlayer;
            elem.eff = s.effect;
            elem1 = elem;
        }
        {//Add a Sprite 原型


            let elem = new ElementSprite();
            elem.sizeTL = new Vector2(-8, -8);
            elem.sizeRB = new Vector2(8, 8);

            elem.uvCenter = new Vector2(s2.uv.U1 * 0.5 + s2.uv.U2 * 0.5, s2.uv.V1 * 0.5 + s2.uv.V2 * 0.5);
            elem.uvHalfSize = new Vector2((s2.uv.U2 - s2.uv.U1) * 0.5, (s2.uv.V2 - s2.uv.V1) * 0.5);
            //elem.eff = 4;
            elem.uvLayer = s2.uvlayer;
            elem.eff = s2.effect;
            elem2 = elem;
        }
        for (var i = 0; i < 1024 * 50; i++) {
            let inst = new ElementInst();
            inst.pos = new Vector3(Math.random() * 400 - 200, Math.random() * 400 - 200, 0);
            inst.rotate = Math.random() * Math.PI;
            inst.scale = new Vector2(1, 1);
            inst.elem = i % 2 == 0 ? elem1 : elem2;

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