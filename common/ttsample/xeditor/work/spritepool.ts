import { IAniPlayerAdapter, Material, Render_Batcher, Resources, Sprite, SpriteData, Texture, tt, TTAniPicInfo, Vector2 } from "../../../ttlayer2/ttlayer2.js";

//Editor模式管理Sprite,全都是独立图片
export class EditorSpritePool implements IAniPlayerAdapter {

    LoadPic(name: string): any {

    }
    batcher: Render_Batcher;
    Render(ttpic: TTAniPicInfo, worldpos: Vector2, worldscale: Vector2): void {
        let s = ttpic.cacheobj as Sprite;
        //pivot?
        s.RenderWithPivot(this.batcher, worldpos, worldscale);
    }

    mapPicName2FileName: { [id: string]: string } = {}//Name=>FileName
    mapPicFileName2Name: { [id: string]: string } = {}//FileName=>Name
    mapPic: { [id: string]: [Sprite, Texture, SpriteData] } = {}//FileName=>Sprite
    HavePic(filename: string): boolean {
        return this.mapPic[filename] != undefined;
    }
    GetPicName(filename: string): string | null {
        let name = this.mapPicFileName2Name[filename];
        if (name == undefined)
            return null;
        return name;
    }
    GetPicByName(name: string): [Sprite, Texture, SpriteData] | null {
        let filename = this.mapPicName2FileName[name];
        if (filename == undefined)
            return null;
        return this.GetPicByFileName(filename);
    }
    GetPicByFileName(filename: string): [Sprite, Texture, SpriteData] | null {
        let pic = this.mapPic[filename];
        if (pic == undefined)
            return null;
        return pic;
    }
    SetPicNameOnly(name: string, filename: string) {
        this.mapPicName2FileName[name] = filename;
        this.mapPicFileName2Name[filename] = name;
    }
    SetPic(name: string, filename: string, data: SpriteData): [Sprite, Texture, SpriteData] {
        if (this.mapPic[filename] != undefined) {
            throw "already have a picfile :" + filename + " with name:" + name;
        }
        this.SetPicNameOnly(name, filename);

        let texture = new Texture(tt.graphic.GetWebGL(), data.width, data.height, data.format, data.data);
        let sprite: Sprite;
        {
            //创建新精灵
            let mat = new Material(Resources.GetShaderProgram("simple"));
            mat.uniformTexs["tex"].value = texture;
            sprite = new Sprite(mat);
            this.mapPic[filename] = [sprite, texture, data];
        }
        sprite.pivotX = data.pivotX;
        sprite.pivotY = data.pivotY;
        return [sprite, texture, data];
    }
}