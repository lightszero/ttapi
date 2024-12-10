import { Border, ElementFormat, Material, Resources, Sprite, Texture, TextureFormat, UVRect, Vector2 } from "../../ttlayer2.js";
import { SpriteData } from "../packtex/packtex";


export class TiledTexOption {
    width: number = 1024;
    height: number = 1024;
    tileSize: number = 32;
}
class Tile {
    index: number;
    posU: number;
    posV: number;
}
class TileLayer {
    smallpot: Tile;//小点点
    bigpot: Tile;//大点点
    innerCorner: Tile[];//左上 右上 左下 右下
    outCorner: Tile[];//左上角开始，扫描 9个，中间那个outCorner[4]是tiled
    tiled: Tile[];//替换的Tiled 三个
}
export class TiledTex extends Texture {

    constructor(webgl: WebGL2RenderingContext, option: TiledTexOption) {
        super(webgl, option.width, option.height, TextureFormat.RGBA32, null);
        this.tileSize = option.tileSize;
    }
    private tileSize: number;
    private tiles: Tile[] = [];
    private tileLayer: TileLayer[] = []
    private tiledMaterial: Material;
    private tileEmpty: Tile;
    GetTileLayers(): TileLayer[] {
        return this.tileLayer;
    }
    GetTileLayerCount(): number {
        return this.tileLayer.length;
    }
    GetTileLayer(index: number): TileLayer {
        return this.tileLayer[index];
    }
    GetTileSize(): number {
        return this.tileSize;
    }
    GetTileCount(): number {
        return this.tiles.length;
    }
    GetTile(index: number): Tile {
        return this.tiles[index];
    }
    GetEmpty(): Tile {
        return this.tileEmpty;
    }
    AddEmpty(): Tile {
        if (this.tileEmpty != null)
            return this.tileEmpty;
        let t = new Tile();
        t.index = 0;
        t.posU = 0;
        t.posV = 0;
        this.tiles.push(t);
        this.tileEmpty = t;
        return t;
    }
    AddTile(data: SpriteData): Tile {
        return this.SetTile(this.tiles.length, data);
    }
    SetTile(index: number, data: SpriteData): Tile {
        if (data.width != this.tileSize || data.height != this.tileSize)
            throw "错误的TileSize:" + data.width + "," + data.height;
        let tileMaxCol = (this._width / this.tileSize) | 0;
        let ux = (index % tileMaxCol) | 0;
        let uy = (index / tileMaxCol) | 0;
        let tileMaxRow = (this._height / this.tileSize) | 0;
        if (uy < 0 || uy >= tileMaxRow)
            throw "index 超出范围"

        while (this.tiles.length <= index)
            this.tiles.push(null);

        let t = new Tile();
        t.posU = ux;
        t.posV = uy;
        t.index = index;
        this.tiles[index] = t;
        if (data.format != TextureFormat.RGBA32) {
            data = data.ConvertToRGBA();
        }
        this.UploadTexture(t.posU * this.tileSize, t.posV * this.tileSize, this.tileSize, this.tileSize, data.data);
        return t;
    }
    AddLPCTile(data: SpriteData, start: Vector2 = Vector2.Zero): TileLayer {
        let tl = new TileLayer();
        this.tileLayer.push(tl);
        tl.smallpot = this.AddTile(data.Cut(0 * this.tileSize + start.X, 1 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.bigpot = this.AddTile(data.Cut(0 * this.tileSize + start.X, 0 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.innerCorner = [];
        tl.innerCorner[0] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 0 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.innerCorner[1] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 0 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.innerCorner[2] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 1 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.innerCorner[3] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 1 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.outCorner = [];
        tl.outCorner[0] = this.AddTile(data.Cut(0 * this.tileSize + start.X, 2 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.outCorner[1] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 2 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.outCorner[2] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 2 * this.tileSize + start.Y, this.tileSize, this.tileSize));

        tl.outCorner[3] = this.AddTile(data.Cut(0 * this.tileSize + start.X, 3 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.outCorner[4] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 3 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.outCorner[5] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 3 * this.tileSize + start.Y, this.tileSize, this.tileSize));

        tl.outCorner[6] = this.AddTile(data.Cut(0 * this.tileSize + start.X, 4 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.outCorner[7] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 4 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.outCorner[8] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 4 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.tiled = [];
        tl.tiled[0] = tl.outCorner[4];
        tl.tiled[1] = this.AddTile(data.Cut(0 * this.tileSize + start.X, 5 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.tiled[2] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 5 * this.tileSize + start.Y, this.tileSize, this.tileSize));
        tl.tiled[3] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 5 * this.tileSize + start.Y, this.tileSize, this.tileSize));


        return tl;
    }
    ConvertTile2Sprite(tiled: Tile): Sprite {
        if (this.tiledMaterial == null) {
            this.tiledMaterial = new Material(Resources.GetShaderProgram("simple"));
            this.tiledMaterial.uniformTexs["tex"].value = this;
        }
        let sprite = new Sprite(this.tiledMaterial);
        sprite.pixelwidth = this.tileSize;
        sprite.pixelheight = this.tileSize;
        sprite.effect = ElementFormat.RGBA;
        sprite.uvlayer = 0;
        let tileSizeX = (this._width / this.tileSize) | 0;
        let tileSizeY = (this._height / this.tileSize) | 0;
        sprite.uv = new UVRect(tiled.posU / tileSizeX, tiled.posV / tileSizeY,
            (tiled.posU + 1) / tileSizeX, (tiled.posV + 1) / tileSizeY);
        return sprite;
    }
}
export class IndexTex extends Texture {
    constructor(webgl: WebGL2RenderingContext, width: number, height: number) {
        super(webgl, width, height, TextureFormat.RGBA32, null);
        this.data = new Uint8Array(width * height * 4);
    }
    private data: Uint8Array;
    private dirty: boolean;
    MarkDirty(): void {
        this.dirty = true;
    }
    DropData(): void {
        this.data = null;
    }
    GetData(): Uint8Array {
        return this.data;
    }
    SetIndexLayer1(x: number, y: number, posU: number, posV: number): void {
        if (this.data == null)
            this.data = new Uint8Array(this._width * this._height * 4);
        this.data[(y * this._width + x) * 4 + 0] = posU;
        this.data[(y * this._width + x) * 4 + 1] = posV;
        this.dirty = true;
    }
    SetIndexLayer2(x: number, y: number, posU: number, posV: number): void {
        if (this.data == null)
            this.data = new Uint8Array(this._width * this._height * 4);
        this.data[(y * this._width + x) * 4 + 2] = posU;
        this.data[(y * this._width + x) * 4 + 3] = posV;
        this.dirty = true;
    }
    FillIndexLayer1(tiledlayer: TileLayer): void {

        for (var j = 0; j < this._height; j++) {
            for (var i = 0; i < this._width; i++) {

                let r = (Math.random() * 100 + 0.5) | 0;
                let k = r - 97;
                if (k < 0) k = 0;
                if (k > 3) k = 3;
                let t = tiledlayer.tiled[k];
                this.SetIndexLayer1(i, j, t.posU, t.posV);
            }
        }
    }
    FillIndexLayer2WithData(tiledlayer: TileLayer, FillData: Uint8Array): void {
        //每四格一样，避免奇怪的格子出现
        for (var j = 0; j < this._height; j += 2) {
            for (var i = 0; i < this._width; i += 2) {

                let c0 = FillData[j * this._width + i];
                let c1 = FillData[j * this._width + i + 1];
                let c2 = FillData[(j + 1) * this._width + i]
                let c3 = FillData[(j + 1) * this._width + i + 1];
                let sum = c0 + c1 + c2 + c3;
                let v = sum >= 2 ? 1 : 0;
                FillData[j * this._width + i] = v;
                FillData[j * this._width + i + 1] = v;
                FillData[(j + 1) * this._width + i] = v;
                FillData[(j + 1) * this._width + i + 1] = v;
            }
        }
        for (var j = 0; j < this._height; j++) {
            for (var i = 0; i < this._width; i++) {

                let c0 = 0, c1 = 0, c2 = 0;
                if (j > 0) {
                    if (i > 0)
                        c0 = FillData[(j - 1) * this._width + i - 1];
                    c1 = FillData[(j - 1) * this._width + i];
                    if (i < this._width - 1)
                        c2 = FillData[(j - 1) * this._width + i + 1];
                }
                let c3 = 0, c4 = 0, c5 = 0;
                {
                    if (i > 0)
                        c3 = FillData[(j) * this._width + i - 1];
                    c4 = FillData[(j) * this._width + i];
                    if (i < this._width - 1)
                        c5 = FillData[(j) * this._width + i + 1];
                }
                let c6 = 0, c7 = 0, c8 = 0;
                if (j < this._height - 1) {
                    if (i > 0)
                        c6 = FillData[(j + 1) * this._width + i - 1];
                    c7 = FillData[(j + 1) * this._width + i];
                    if (i < this._width - 1)
                        c8 = FillData[(j + 1) * this._width + i + 1];
                }

                if (c4 > 0) {
                    let crosscount = 0;
                    if (c1 > 0) crosscount++;
                    if (c3 > 0) crosscount++;
                    if (c5 > 0) crosscount++;
                    if (c7 > 0) crosscount++;
                    if (crosscount == 0) {
                        this.SetIndexLayer2(i, j, tiledlayer.smallpot.posU, tiledlayer.smallpot.posV);
                    }
                    else if (crosscount == 1) {
                        console.log("error count 2");
                        //error
                    }
                    else if (crosscount == 2) {
                        if (c1 == 0 && c3 == 0)
                            this.SetIndexLayer2(i, j, tiledlayer.outCorner[0].posU, tiledlayer.outCorner[0].posV);
                        if (c1 == 0 && c5 == 0)
                            this.SetIndexLayer2(i, j, tiledlayer.outCorner[2].posU, tiledlayer.outCorner[2].posV);
                        if (c7 == 0 && c3 == 0)
                            this.SetIndexLayer2(i, j, tiledlayer.outCorner[6].posU, tiledlayer.outCorner[6].posV);
                        if (c7 == 0 && c5 == 0)
                            this.SetIndexLayer2(i, j, tiledlayer.outCorner[8].posU, tiledlayer.outCorner[8].posV);
                    }
                    else if (crosscount == 3) {
                        //边
                        if (c1 == 0)
                            this.SetIndexLayer2(i, j, tiledlayer.outCorner[1].posU, tiledlayer.outCorner[1].posV);
                        if (c3 == 0)
                            this.SetIndexLayer2(i, j, tiledlayer.outCorner[3].posU, tiledlayer.outCorner[3].posV);
                        if (c5 == 0)
                            this.SetIndexLayer2(i, j, tiledlayer.outCorner[5].posU, tiledlayer.outCorner[5].posV);
                        if (c7 == 0)
                            this.SetIndexLayer2(i, j, tiledlayer.outCorner[7].posU, tiledlayer.outCorner[7].posV);
                    }
                    else if (crosscount == 4) {
                        let corcount = 0;
                        if (c0 > 0)
                            corcount++;
                        if (c2 > 0)
                            corcount++;
                        if (c6 > 0)
                            corcount++;
                        if (c8 > 0)
                            corcount++;
                        if (corcount == 3)//内角
                        {
                            if (c0 == 0)
                                this.SetIndexLayer2(i, j, tiledlayer.innerCorner[3].posU, tiledlayer.innerCorner[3].posV);
                            if (c2 == 0)
                                this.SetIndexLayer2(i, j, tiledlayer.innerCorner[2].posU, tiledlayer.innerCorner[2].posV);
                            if (c6 == 0)
                                this.SetIndexLayer2(i, j, tiledlayer.innerCorner[1].posU, tiledlayer.innerCorner[1].posV);
                            if (c8 == 0)
                                this.SetIndexLayer2(i, j, tiledlayer.innerCorner[0].posU, tiledlayer.innerCorner[0].posV);

                        }
                        else {
                            let r = (Math.random() * 100 + 0.5) | 0;
                            let k = r - 97;
                            if (k < 0) k = 0;
                            if (k > 3) k = 3;
                            let t = tiledlayer.tiled[k];
                            this.SetIndexLayer2(i, j, t.posU, t.posV);
                        }
                    }
                    //this.SetIndexLayer2(i, j, tiledlayer.smallpot.posU, tiledlayer.smallpot.posV);
                }
                else
                    this.SetIndexLayer2(i, j, 0, 0);
            }
        }
    }
    Apply(): void {
        if (!this.dirty)
            return;
        if (this.data == null)
            throw "no data on IndexdTex";
        this.UploadTexture(0, 0, this._width, this._height, this.data);
        this.dirty = false;
    }
}
