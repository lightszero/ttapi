import { tt } from "../../ttapi/ttapi.js";
import { Render_Tiledmap } from "../../ttlayer2/graphics/pipeline/render/render_tiledmap.js";
import { PerlinNoise } from "../../ttlayer2/math/perlin/perlin.js";
import { SpriteData } from "../../ttlayer2/resources/packtex/packtex.js";
import { IndexTex as TiledIndexTex, TiledTex } from "../../ttlayer2/resources/tiledmap/tiledmap.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Image, Sprite, Material, Texture, TextureFormat, QUI_Label, QUI_Button } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "../test_base.js";

export class Test_Tiledmap extends Test_Base {

    tiledlayer: DrawLayer;
    tiledrender: Render_Tiledmap;
    tiledtexIndex: TiledIndexTex;
    tiledtex: TiledTex;
    OnInit(nav: TTState_All): void {
        super.OnInit(nav);




        this.tiledlayer = new DrawLayer(DrawLayerTag.Main);
        this.tiledlayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;
        GameApp.GetViewList().AddDrawLayer(this.tiledlayer);
        this.tiledrender = new Render_Tiledmap();
        this.tiledlayer.AddRender(this.tiledrender);
        this.tiledtex = new TiledTex(tt.graphic.GetWebGL(), { 'width': 1024, "height": 1024, "tileSize": 32 });
        this.tiledtexIndex = new TiledIndexTex(tt.graphic.GetWebGL(), 256, 256);
        this.tiledrender.SetTiledmap(this.tiledtexIndex, this.tiledtex, this.tiledtex.GetTileSize()
            , 0.25);




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

            let teximg = await tt.loaderex.LoadImageAsync("./data/tiledrule.png");
            let tex1 = new Texture(gl, teximg.width, teximg.height, TextureFormat.RGBA32, null);
            tex1.UploadImg(teximg);
            mat1.uniformTexs["tex"].value = tex1;

            let s1 = new Sprite(mat1);

            let img = new QUI_Image();
            img.sprite = s1;
            img.localRect.setHPosByLeftBorder(96, x);
            x += 100;
            img.localRect.setVPosByTopBorder(192, this.GetUIY());
            this.guilayer.GetCanvas().AddChild(img);

        }
        {
            let mat1 = new Material(Resources.GetShaderProgram("simple"));

            let teximg = await tt.loaderex.LoadImageDataAsync("./data/grass.png");
            let tex1 = new Texture(gl, teximg.width, teximg.height, TextureFormat.RGBA32, null);
            tex1.UploadImg(teximg);
            mat1.uniformTexs["tex"].value = tex1;

            let s1 = new Sprite(mat1);

            let img = new QUI_Image();
            img.sprite = s1;
            img.localRect.setHPosByLeftBorder(96, x);
            x += 100;
            img.localRect.setVPosByTopBorder(192, this.GetUIY());
            this.guilayer.GetCanvas().AddChild(img);

            let imgdata = new SpriteData();
            imgdata.format = TextureFormat.RGBA32;
            imgdata.data = teximg.data;
            imgdata.width = teximg.width;
            imgdata.height = teximg.height;
            this.tiledtex.AddLPCTile(imgdata);
        }
        {
            let mat1 = new Material(Resources.GetShaderProgram("simple"));

            let teximg = await tt.loaderex.LoadImageDataAsync("./data/dirt.png");
            let tex1 = new Texture(gl, teximg.width, teximg.height, TextureFormat.RGBA32, null);
            tex1.UploadImg(teximg);
            mat1.uniformTexs["tex"].value = tex1;

            let s1 = new Sprite(mat1);

            let img = new QUI_Image();
            img.sprite = s1;
            img.localRect.setHPosByLeftBorder(96, x);
            x += 100;
            img.localRect.setVPosByTopBorder(192, this.GetUIY());
            this.guilayer.GetCanvas().AddChild(img);

            let imgdata = new SpriteData();
            imgdata.format = TextureFormat.RGBA32;
            imgdata.data = teximg.data;
            imgdata.width = teximg.width;
            imgdata.height = teximg.height;
            this.tiledtex.AddLPCTile(imgdata);
        }
        this.AddEmpty(192);

        this.AddLabel("使用3x6的区块，表达地表的一层");
        this.AddLabel("大点，小点，内角四块。");
        this.AddLabel("外角八块，外角的最中间是平铺块");
        this.AddLabel("最下边一行是替换的平铺块");


        this.RandomMap()
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
        super.OnExit();
        GameApp.GetViewList().RemoveDrawLayers(this.tiledlayer);
    }

}