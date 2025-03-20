import { tt } from "../../ttapi/ttapi.js";
import { TTAni, TTAniPicInfo, TTPackageMgr } from "../../ttlayer2/package/ttpackage.js";
import { ElementInst, ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Tbo } from "../../ttlayer2/graphics/pipeline/render/render_elem_tbo.js";
import { SpriteData } from "../../ttlayer2/resources/packtex/packtex.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, ElementFormat, TextureFormat, QUI_Label, QUI_Button } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { AniPlayer, IAniPlayerAdapter } from "../../ttlayer2/package/aniplayer.js";

class AniTboAdadpher implements IAniPlayerAdapter {
    render: Render_Element_Tbo
    aniinst: ElementInst = null;
    constructor(render: Render_Element_Tbo) {
        this.render = render;
    }
    LoadPic(name: string): any {
        let add = Resources.GetPackElement().GetElementByName(name).index;
        return add;
    }

    Render(ttpic: TTAniPicInfo, worldpos: Vector2, worldscale: Vector2): void {
        if (this.aniinst == null) {
            this.aniinst = new ElementInst();
            this.aniinst.pos = new Vector3(0, 0, 0);
            this.aniinst.rotate = 0;
            this.aniinst.scale = new Vector2(2, 2);
            this.aniinst.color = new Color(1, 1, 1, 1.0);

        }
        this.aniinst.instid = ttpic.cacheobj;
        this.aniinst.pos.X = worldpos.X + ttpic.x * worldscale.X;
        this.aniinst.pos.Y = worldpos.Y + ttpic.y * worldscale.Y;
        this.aniinst.scale.X = worldscale.X * ttpic.scaleX;
        this.aniinst.scale.Y = worldscale.Y * ttpic.scaleY;
        this.aniinst.rotate = ttpic.rotate;
        this.render.AddElementInst(this.aniinst);
    }


}
export class Test_TTPack implements IState<TTState_All> {
    nav: TTState_All;
    guilayer: DrawLayer_GUI;
    canvaslayer: DrawLayer;
    render: Render_Element_Tbo;

    inst: ElementInst[] = []
    OnInit(nav: TTState_All): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();



        this.LoadAsync();




    }
    aniadapter: AniTboAdadpher
    anip: AniPlayer;
    ani: TTAni;
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

        this.ani = pp.GetAni("ani1");



        this.AddSprites();
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
    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;

        GameApp.GetViewList().AddDrawLayer(this.guilayer);
        let btn = new QUI_Button();
        (btn.elemNormal.GetChild(0) as QUI_Label).text = "<--";

        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().AddChild(btn);

        btn.OnClick = () => {
            this.nav.Back();
        }

        this.nav.context.TopUI2Top();
    }



    AddSprites(): void {

        this.canvaslayer = new DrawLayer(DrawLayerTag.Main);
        this.canvaslayer.GetCamera().Scale = 2.0;
        this.render = new Render_Element_Tbo();
        this.aniadapter = new AniTboAdadpher(this.render);

        this.anip = new AniPlayer(this.ani, this.aniadapter);

        this.canvaslayer.AddRender(this.render);
        GameApp.GetViewList().AddDrawLayer(this.canvaslayer);

        let s = Resources.GetPackElement().GetElementByName("dot1");
        let s2 = Resources.GetBlock("round");



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

    OnUpdate(delta: number): void {
        if (this.render != null) {
            this.render.ClearElementInst();


            for (var i = 0; i < this.inst.length; i++) {
                this.inst[i].rotate += delta * Math.PI;
                this.render.AddElementInst(this.inst[i]);
            }

            //play by fps
            this.anip.Update(delta);

            for (var i = 0; i < 10; i++) {
                this.anip.pos.X = i * 50;
                this.anip.pos.Y = 50;
                this.anip.Render();


            }
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