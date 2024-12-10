import { tt } from "../../ttapi/ttapi.js";
import { Render_Tiledmap } from "../../ttlayer2/graphics/pipeline/render/render_tiledmap.js";
import { PerlinNoise } from "../../ttlayer2/math/perlin/perlin.js";
import { SpriteData } from "../../ttlayer2/resources/packtex/packtex.js";
import { IndexTex as TiledIndexTex, TiledTex } from "../../ttlayer2/resources/tiledmap/tiledmap.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Image, Sprite, Material, Texture, TextureFormat } from "../../ttlayer2/ttlayer2.js";
import { GContext } from "../ttstate_all.js";

export class Test_Tiledmap implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;
    tiledlayer: DrawLayer;
    tiledrender: Render_Tiledmap;
    tiledtexIndex: TiledIndexTex;
    tiledtex: TiledTex;
    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;
        }




        this.tiledlayer = new DrawLayer(DrawLayerTag.Main);
        this.tiledlayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;
        GameApp.GetViewList().AddDrawLayer(this.tiledlayer);
        this.tiledrender = new Render_Tiledmap();
        this.tiledlayer.AddRender(this.tiledrender);
        this.tiledtex = new TiledTex(tt.graphic.GetWebGL(), { 'width': 1024, "height": 1024, "tileSize": 32 });
        this.tiledtexIndex = new TiledIndexTex(tt.graphic.GetWebGL(), 256, 256);
        this.tiledrender.SetTiledmap(this.tiledtexIndex, this.tiledtex, this.tiledtex.GetTileSize()
            , 0.25);


        this.AddBackButton();


        this.AddLabel("LPC有个很好的Tiledmap 规则");
        this.AddButton("随机地图", () => {
            this.RandomMap();
        });
        this.initacync();

    }

    private RandomMap(): void {

        let layer0 = this.tiledtex.GetTileLayer(0);
        let layer1 = this.tiledtex.GetTileLayer(1);


        //PerlinNoise.Reset();

        //填充第一层
        this.tiledtexIndex.FillIndexLayer1(layer1);


        //生成一个随机数据，只需要1 or 0
        let perlinoffset = new Vector2(Math.random(), Math.random());
        let FillData = new Uint8Array(this.tiledtexIndex.getWidth() * this.tiledtexIndex.getHeight());
        for (let j = 0; j < this.tiledtexIndex.getHeight(); j++) {
            for (let i = 0; i < this.tiledtexIndex.getWidth(); i++) {

                let h = PerlinNoise.GenNoise(
                    i / this.tiledtexIndex.getWidth() / 2 + perlinoffset.X,
                    j / this.tiledtexIndex.getHeight() / 2 + perlinoffset.Y,
                    0
                    , 5, 1
                );
                FillData[j * this.tiledtexIndex.getWidth() + i] = h > 0.5 ? 1 : 0;
            }
        }

        //用给定的数据自动填充对应的图案
        this.tiledtexIndex.FillIndexLayer2WithData(layer0, FillData);
        this.tiledtexIndex.Apply();
    }
    private async initacync() {
        let gl = tt.graphic.GetWebGL();
        let x = 16;

        this.tiledtex.AddEmpty();
        {
            let mat1 = new Material(Resources.GetShaderProgram("simple"));

            let teximg = await tt.loader.LoadImageAsync("./ttsample/data/tiledrule.png");
            let tex1 = new Texture(gl, teximg.width, teximg.height, TextureFormat.RGBA32, null);
            tex1.UploadImg(teximg);
            mat1.uniformTexs["tex"].value = tex1;

            let s1 = new Sprite(mat1);

            let img = new QUI_Image(s1);

            img.localRect.setHPosByLeftBorder(96, x);
            x += 100;
            img.localRect.setVPosByTopBorder(192, this.y);
            this.guilayer.GetCanvas().addChild(img);

        }
        {
            let mat1 = new Material(Resources.GetShaderProgram("simple"));

            let teximg = await tt.loader.LoadImageDataAsync("./ttsample/data/grass.png");
            let tex1 = new Texture(gl, teximg.width, teximg.height, TextureFormat.RGBA32, null);
            tex1.UploadImg(teximg);
            mat1.uniformTexs["tex"].value = tex1;

            let s1 = new Sprite(mat1);

            let img = new QUI_Image(s1);

            img.localRect.setHPosByLeftBorder(96, x);
            x += 100;
            img.localRect.setVPosByTopBorder(192, this.y);
            this.guilayer.GetCanvas().addChild(img);

            let imgdata = new SpriteData();
            imgdata.format = TextureFormat.RGBA32;
            imgdata.data = teximg.data;
            imgdata.width = teximg.width;
            imgdata.height = teximg.height;
            this.tiledtex.AddLPCTile(imgdata);
        }
        {
            let mat1 = new Material(Resources.GetShaderProgram("simple"));

            let teximg = await tt.loader.LoadImageDataAsync("./ttsample/data/dirt.png");
            let tex1 = new Texture(gl, teximg.width, teximg.height, TextureFormat.RGBA32, null);
            tex1.UploadImg(teximg);
            mat1.uniformTexs["tex"].value = tex1;

            let s1 = new Sprite(mat1);

            let img = new QUI_Image(s1);

            img.localRect.setHPosByLeftBorder(96, x);
            x += 100;
            img.localRect.setVPosByTopBorder(192, this.y);
            this.guilayer.GetCanvas().addChild(img);

            let imgdata = new SpriteData();
            imgdata.format = TextureFormat.RGBA32;
            imgdata.data = teximg.data;
            imgdata.width = teximg.width;
            imgdata.height = teximg.height;
            this.tiledtex.AddLPCTile(imgdata);
        }
        this.y += 192;

        this.AddLabel("使用3x6的区块，表达地表的一层");
        this.AddLabel("大点，小点，内角四块。");
        this.AddLabel("外角八块，外角的最中间是平铺块");
        this.AddLabel("最下边一行是替换的平铺块");


        this.RandomMap()
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
    AddButton(name: string, click: () => void): void {
        let btn = Resources.CreateGUI_Button(name, new Color(1, 1, 1, 1));
        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, this.y);
        this.guilayer.GetCanvas().addChild(btn);

        btn.OnClick = () => {
            click();
        }

        this.y += 24;

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


    timer: number = 0;
    OnUpdate(delta: number): void {
        if (this.tiledlayer == null)
            return;
        this.timer += delta;
        let x = Math.sin(this.timer) * 65 + 65;
        let y = Math.cos(this.timer) * 32 + 32;
        this.tiledlayer.GetCamera().LookAt.X = ((x * 2) | 0) / 2;
        this.tiledlayer.GetCamera().LookAt.Y = ((y * 2) | 0) / 2;
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