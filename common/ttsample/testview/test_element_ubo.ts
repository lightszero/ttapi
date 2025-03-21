import { tt } from "../../ttapi/ttapi.js";
import { ElementInst, ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Ubo } from "../../ttlayer2/graphics/pipeline/render/render_elem_ubo.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Label, QUI_Button } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "./test_base.js";

export class Test_Element_UBO extends Test_Base {

    canvaslayer: DrawLayer;
    render: Render_Element_Ubo;

    inst: ElementInst[] = []
    OnInit(nav: TTState_All): void {
        super.OnInit(nav);

        this.AddSprites();
        this.AddLabel("DrawElement,UBO模式");
        this.AddLabel("vb0 是一个小方块");
        this.AddLabel("vb1 是instance 数据");
        this.AddLabel("sprite 数据放在Uniform里，尺寸受到设备限制");
        this.AddLabel("移动平台可使用1023种精灵");
        this.AddLabel("这个模式不如TBO模式");

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
        for (var i = 0; i < 1024; i++) {
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
        super.OnExit();
        GameApp.GetViewList().RemoveDrawLayers(this.canvaslayer);
    }

}