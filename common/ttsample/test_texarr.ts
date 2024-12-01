import { tt } from "../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, TextureArray, TextureFormat, QUI_Image, Sprite, SpriteFormat, Texture } from "../ttlayer2/ttlayer2.js";
import { GContext } from "./ttstate_all.js";

export class Test_TexArr implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;

    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        let gl = tt.graphic.GetWebGL();

        let t = new TextureArray(gl, 16, 16, 5, TextureFormat.R8);
        let t2 = new Texture(gl, 16, 16, TextureFormat.R8, null);
        let data1 = new Uint8Array(256);
        for (let i = 0; i < 256; i++) {
            data1[i] = i;
        }
        let data2 = new Uint8Array(256);
        for (let i = 0; i < 256; i++) {
            data2[i] = 255 - i;
        }
        this.AddLabel("tex1=" + t.getWidth() + "," + t.getHeight() + "," + t.GetLayer());
        t.UploadSubTexture(0, 0, 0, 16, 16, data1);
        t2.UploadTexture(0, 0, 16, 16, data2);
        this.AddLabel("tex2=" + t2.getWidth() + "," + t2.getHeight() );
        this.AddLabel("普通贴图传给texturearray不能正常渲染" );

        let s = new Sprite(Resources.GetPackedTexture().packRGBA, t);
        let s2 = new Sprite(Resources.GetPackedTexture().packRGBA, t2);
        s.effect = s2.effect = SpriteFormat.GrayAsAlpha;
        {
            let img = new QUI_Image(s);
            img.localRect.setHPosByLeftBorder(256, 32);
            img.localRect.setVPosByTopBorder(256, 32);
            this.guilayer.GetCanvas().addChild(img);
        }
        {
            let img = new QUI_Image(s2);
            img.localRect.setHPosByLeftBorder(256, 300);
            img.localRect.setVPosByTopBorder(256, 32);
            this.guilayer.GetCanvas().addChild(img);
        }
    }
    y: number = 64;
    AddLabel(text: string): void {
        let label = Resources.CreateGUI_Label(text);
        this.guilayer.GetCanvas().addChild(label);
        label.halign = QUI_HAlign.Left;
        label.localRect.setHPosByLeftBorder(196, 16);
        label.localRect.setVPosByTopBorder(16, this.y);
        this.y += 16;
    }
    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = 3.0;
      
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


    OnUpdate(delta: number): void {

    }
    OnExit(): void {
        GameApp.GetViewList().RemoveDrawLayers(this.guilayer);

    }
    OnResize(width: number, height: number): void {

    }

    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }
}