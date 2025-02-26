import { tt } from "../../ttapi/ttapi.js";
import { TTPackageMgr } from "../../ttlayer2/format/ttpackage.js";
import { ElementInst, ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Tbo } from "../../ttlayer2/graphics/pipeline/render/render_elem_tbo.js";
import { SpriteData } from "../../ttlayer2/resources/packtex/packtex.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, ElementFormat, TextureFormat } from "../../ttlayer2/ttlayer2.js";
import { GContext } from "../ttstate_all.js";

export class Test_TTPack implements IState<Navigator<GContext>> {
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



        this.LoadAsync();




    }
    async LoadAsync() {


        this.AddLabel("测试TTPack加载");
        let pp = await TTPackageMgr.Load("data/p01.tt.json", tt.loader);
        console.log("pp=" + pp.Name);
        this.AddLabel("Load Package:" + pp.Name);
        let keys = pp.GetPicKey();
        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];
            let pic = pp.GetPic(key);
            this.AddLabel("Load pic:" + key + "," + pic.width + "," + pic.height
                + "," + pic.pivotX + "," + pic.pivotY);
            let spdata = new SpriteData();
            spdata.data = pic.data;
            spdata.format = TextureFormat.RGBA32;
            spdata.width = pic.width;
            spdata.height = pic.height;
            spdata.pivotX = pic.pivotX;
            spdata.pivotY = pic.pivotY;
            Resources.GetPackElement().AddSprite(spdata, ElementFormat.RGBA, key);
        }


        this.AddSprites();
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

        GameApp.GetViewList().AddDrawLayer(this.guilayer);
        let btn = Resources.CreateGUI_Button("<--", new Color(1, 1, 1, 1));
        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().addChild(btn);

        btn.OnClick = () => {
            this.nav.Back();
        }

        this.nav.GetContextObj().TopUI2Top();
    }

    aniid: number[] = [];
    aniinst = new ElementInst();
    AddSprites(): void {

        this.canvaslayer = new DrawLayer(DrawLayerTag.Main);
        this.canvaslayer.GetCamera().Scale = 2.0;
        this.render = new Render_Element_Tbo();
        this.canvaslayer.AddRender(this.render);
        GameApp.GetViewList().AddDrawLayer(this.canvaslayer);

        let s = Resources.GetPackElement().GetElementByName("dot1");
        let s2 = Resources.GetRoundBlock();
        for (var i = 0; i < 6; i++) {
            let aas = Resources.GetPackElement().GetElementByName("pw6_" + i);

            this.aniid.push(aas.index);
        }
        this.aniinst.pos = new Vector3(0, 0, 0);
        this.aniinst.rotate = 0;
        this.aniinst.scale = new Vector2(2, 2);
        this.aniinst.color = new Color(1, 1, 1, 1.0);

        this.render.SetPackElement(Resources.GetPackElement());

        for (var i = 0; i < 5; i++) {
            let inst = new ElementInst();
            inst.pos = new Vector3(i * 50, 0, 0);
            inst.rotate = 0;
            inst.scale = new Vector2(2, 2);
            inst.instid = i % 2 == 0 ? s.index : s2.index;

            inst.color = new Color(1, Math.random(), 1, 1.0);

            this.inst.push(inst);
            this.render.AddElementInst(this.inst[i]);
        }
        console.log("int count =" + this.inst.length);

    }
    anicurid: number = 0;
    OnUpdate(delta: number): void {
        if (this.render != null) {
            this.render.ClearElementInst();


            for (var i = 0; i < this.inst.length; i++) {
                this.inst[i].rotate += delta * Math.PI;
                this.render.AddElementInst(this.inst[i]);
            }

            this.anicurid += delta * 8;
            if (this.anicurid > 6.0)
                this.anicurid -= 6.0;

            this.aniinst.instid = this.aniid[(this.anicurid | 0) % 6];
            this.render.AddElementInst(this.aniinst);
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