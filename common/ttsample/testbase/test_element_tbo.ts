import { tt } from "../../ttapi/ttapi.js";
import { ElementInst, ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Tbo } from "../../ttlayer2/graphics/pipeline/render/render_elem_tbo.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Button, QUI_Label } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "../test_base.js";

export class Test_Element_TBO extends Test_Base {

    canvaslayer: DrawLayer;
    render: Render_Element_Tbo;

    inst: ElementInst[] = []
    OnInit(nav: TTState_All): void {
        super.OnInit(nav);

        this.AddSprites();
        this.AddLabel("DrawElement,TBO模式");
        this.AddLabel("vb0 是一个小方块");
        this.AddLabel("vb1 是instance 数据");
        this.AddLabel("sprite 数据放在一张贴图里，尺寸几乎没有限制，这里使用了 512x512的float贴图");
        this.AddLabel("这个贴图尺寸下,可使用65536种精灵");



    }


    AddSprites(): void {

        this.canvaslayer = new DrawLayer(DrawLayerTag.Main);
        this.canvaslayer.GetCamera().Scale = 2.0;
        this.render = new Render_Element_Tbo();
        this.canvaslayer.AddRender(this.render);
        GameApp.GetViewList().AddDrawLayer(this.canvaslayer);

        let s = Resources.GetBlock("border2");
        let s2 = Resources.GetBlock("round");

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
        super.OnExit();
        GameApp.GetViewList().RemoveDrawLayer(this.canvaslayer);
    }
  
}