import { ElementFormat, Material, Resources, Sprite, Texture, TextureFormat, UVRect, Vector2 } from "../../ttlayer2.js";
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
    smallpot: number;//小点点
    bigpot: number;//大点点
    innerCorner: number[];//左上 右上 左下 右下
    outCorner: number[];//左上角开始，扫描 9个，中间那个outCorner[4]是tiled
    tiled: number[];//替换的Tiled 三个
}
export class TiledTex extends Texture {

    constructor(webgl: WebGL2RenderingContext, option: TiledTexOption) {
        super(webgl, option.width, option.height, TextureFormat.RGBA32, null);
        this.tileSize = option.tileSize;
    }
    private tileSize: number;
    private tiles: Tile[] = [];
    tileLayer: TileLayer[] = []
    private tiledMaterial: Material;
    private tileEmpty: Tile;
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
        tl.smallpot = this.AddTile(data.Cut(0 * this.tileSize + start.X, 0 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.bigpot = this.AddTile(data.Cut(0 * this.tileSize + start.X, 1 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.innerCorner = [];
        tl.innerCorner[0] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 0 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.innerCorner[1] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 0 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.innerCorner[2] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 1 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.innerCorner[3] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 1 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.outCorner = [];
        tl.outCorner[0] = this.AddTile(data.Cut(0 * this.tileSize + start.X, 2 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.outCorner[1] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 2 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.outCorner[2] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 2 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;

        tl.outCorner[3] = this.AddTile(data.Cut(0 * this.tileSize + start.X, 3 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.outCorner[4] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 3 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.outCorner[5] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 3 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;

        tl.outCorner[6] = this.AddTile(data.Cut(0 * this.tileSize + start.X, 4 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.outCorner[7] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 4 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.outCorner[8] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 4 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.tiled = [];
        tl.tiled[0] = this.AddTile(data.Cut(0 * this.tileSize + start.X, 5 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.tiled[1] = this.AddTile(data.Cut(1 * this.tileSize + start.X, 5 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;
        tl.tiled[2] = this.AddTile(data.Cut(2 * this.tileSize + start.X, 5 * this.tileSize + start.Y, this.tileSize, this.tileSize)).index;


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
    Apply(): void {
        if (!this.dirty)
            return;
        if (this.data == null)
            throw "no data on IndexdTex";
        this.UploadTexture(0, 0, this._width, this._height, this.data);
        this.dirty = false;
    }
}
