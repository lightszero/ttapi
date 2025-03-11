


import {
    Camera, IRenderTarget, Render_Element_Tbo, ElementInst, ResourceOption, tt,
    MainScreen, Resources, Color, Vector3, Vector2,
    ElementSprite,
    ElementFormat,
    TextureFormat,SpriteData
} from "../ttlayer2/ttlayer2.js";
import { EditorMainUI } from "./editor.js";

export class Editor_Main {
    //最核心的渲染组件
    static g_render_tbo: Render_Element_Tbo;//
    static g_tmpinst: ElementInst;
    static g_mainscreen: IRenderTarget;
    static g_camera: Camera;
    static g_r: number = 0;

    static g_elemSprite: ElementSprite;
    static UpdatePackage() {
        var p = EditorMainUI.g_editpackage;
        if (p == null)
            return;
        var keys = p.GetPicKey();
        for (var i = 0; i < keys.length; i++) {
            console.log("pic=" + keys[i]);
        }
    }

    static PickPic(name: string) {
        var p = EditorMainUI.g_editpackage;
        this.g_elemSprite = null;
        if (p == null) {
           
            return;
        }
        this.g_elemSprite = Resources.GetPackElement().GetElementByName(name);
        if (this.g_elemSprite == undefined) {
            let pic = p.GetPic(name);
            let data = new SpriteData();
            data.data = pic.data;
            data.pivotX = pic.pivotX;
            data.pivotY = pic.pivotY;
            data.width = pic.width;
            data.height = pic.height;
            data.format = TextureFormat.RGBA32;

            this.g_elemSprite = Resources.GetPackElement().AddSprite(data, ElementFormat.RGBA, name);
        }

    }
    static PickAni(name: string) {
        var p = EditorMainUI.g_editpackage;
        this.g_elemSprite = null;
        if (p == null) {
           
            return;
        }
    }
    static async Init() {
        let op = new ResourceOption();
        let gl = tt.graphic.GetWebGL();
        this.g_mainscreen = new MainScreen(gl);
        Resources.Init(op);
        this.g_render_tbo = new Render_Element_Tbo();
        this.g_render_tbo.SetPackElement(Resources.GetPackElement());

        //GameApp.Start(op, null);
        this.g_camera = new Camera();
        this.g_camera.Scale = 4.0;
        this.g_tmpinst = new ElementInst();
        //自己接管渲染，不要GameApp管
        tt.graphic.OnRender = this.OnRender.bind(this);
        tt.graphic.OnUpdate = this.OnUpdate.bind(this);
    }
    static OnRender() {
        this.g_mainscreen.Begin();
        this.g_mainscreen.Clear(new Color(0.4, 0.6, 0.2, 1));

        this.g_render_tbo.OnRender(this.g_mainscreen, this.g_camera, 0);
        this.g_mainscreen.End();
    }
    static AddText(tex: string, x: number, y: number, color: Color) {
        Resources.GetDefFont().SureText(tex);
        let xuse = x;
        let e = this.g_tmpinst;
        for (var i = 0; i < tex.length; i++) {

            let c = tex.charAt(i);
            let sp = Resources.GetPackElement().GetElementByName(c);
            if (sp == null) continue;
            e.instid = sp.index;
            e.color = color;
            e.pos = new Vector3(xuse, y, 0);
            e.scale = new Vector2(0.5, 0.5);
            e.rotate = 0;
            this.g_render_tbo.AddElementInst(e);
            xuse += sp.sizeRB.X / 2;
        }
    }
    static AddRect(x: number, y: number, width: number, height: number, color: Color) {


        //8x8
        let e = this.g_tmpinst;

        let border = Resources.getWhiteBlock();

        e.color = color;
        e.pos = new Vector3(x + width / 2, y + 0.5, 0);
        e.scale = new Vector2((width) / 8, (1) / 8);
        e.rotate = 0;
        e.instid = border.index;

        this.g_render_tbo.AddElementInst(e);

        e.pos = new Vector3(x + width / 2, y + height - 0.5, 0);
        e.scale = new Vector2((width) / 8, (1) / 8);
        this.g_render_tbo.AddElementInst(e);

        e.pos = new Vector3(x + 0.5, y + height / 2, 0);
        e.scale = new Vector2(1 / 8, (height) / 8);
        this.g_render_tbo.AddElementInst(e);

        e.pos = new Vector3(x + width - 0.5, y + height / 2, 0);
        e.scale = new Vector2(1 / 8, (height) / 8);
        this.g_render_tbo.AddElementInst(e);

    }
    static OnUpdate(delta: number) {
        this.g_r += delta * Math.PI;


        this.g_render_tbo.ClearElementInst();


        this.g_tmpinst.instid = Resources.getWhiteBlock().index;
        let e = this.g_tmpinst;


        //8x8
        let border = Resources.getWhiteBlock();
        e.color = new Color(1, 1, 1, 1);
        e.pos = new Vector3(0, 0, 0);
        let pixelwidth = (this.g_mainscreen.getWidth() / this.g_camera.Scale) | 0;
        let pixelheight = (this.g_mainscreen.getHeight() / this.g_camera.Scale) | 0;
        e.scale = new Vector2((pixelwidth - 2) / 8, (pixelheight - 2) / 8);
        e.rotate = 0;
        e.instid = border.index;

        //this.g_render_tbo.AddElementInst(e);

        this.AddRect((-pixelwidth / 2 + 1), (-pixelheight / 2 + 1),
            pixelwidth - 2, pixelheight - 2, new Color(0.5, 0.5, 1, 1));

        for (var i = 0; i < 10; i++) {
            e.color = new Color(1, 1, 1, 1);
            e.pos = new Vector3(i * 30, 0, 0);
            e.scale = new Vector2(1, 1);
            e.rotate = this.g_r;
            this.g_render_tbo.AddElementInst(e);
        }
        this.AddText("地球上的人们 Hello World.", 0, 0, new Color(1, 1, 0.3, 1));

        if (this.g_elemSprite != null) {
            e.color = new Color(1, 1, 1, 1);
            e.pos = new Vector3(0, 0, 0);

            e.scale = new Vector2(1, 1);
            e.rotate = 0;
            e.instid = this.g_elemSprite.index;
            this.g_render_tbo.AddElementInst(e);

        }
    }
}