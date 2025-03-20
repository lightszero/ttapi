import { tt } from "../../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, TextureArray, TextureFormat, QUI_Image, Sprite, ElementFormat, Texture, QUI_Button, QUI_Label, Font } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";

export class Test_TexArr implements IState<TTState_All> {
    nav: TTState_All;
    guilayer: DrawLayer_GUI;

    OnInit(nav: TTState_All): void {
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
        this.AddLabel("tex2=" + t2.getWidth() + "," + t2.getHeight());
        this.AddLabel("普通贴图传给texturearray不能正常渲染");

        let s = Resources.GetPackElement();
      

        {
            let s2 = Resources.GetDefFont().GetCharSprite("你".charCodeAt(0));
            let img = new QUI_Image();
            img.SetBySprite(s2);
            img.localRect.setHPosByLeftBorder(256, 32);
            img.localRect.setVPosByTopBorder(256, 32);
            this.guilayer.GetCanvas().AddChild(img);
        }
        {
            let s2 = Resources.GetDefFont().GetCharSprite("好".charCodeAt(0));
            let img = new QUI_Image();
            img.SetBySprite(s2);
            img.localRect.setHPosByLeftBorder(256, 300);
            img.localRect.setVPosByTopBorder(256, 32);
            this.guilayer.GetCanvas().AddChild(img);
        }
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
    AddButton(name: string, click: () => void): void {
        let btn = new QUI_Button();
        (btn.elemNormal.GetChild(0) as QUI_Label).text = name
        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, this.y);
        this.guilayer.GetCanvas().AddChild(btn);

        btn.OnClick = () => {
            click();
        }

        this.y += 24;

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