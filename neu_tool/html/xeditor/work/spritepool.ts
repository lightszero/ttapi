import { IAniPlayerAdapter, Material, Render_Batcher, Resources, Sprite, SpriteData, Texture, tt, TTAniPicInfo, Vector2 } from "../../ttlayer2/ttlayer2.js";

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


    mapPicName: { [id: string]: string } = {}
    mapPic: { [id: string]: [Sprite, Texture] } = {}
    GetPicName(filename: string): string {
        return this.mapPicName[filename];
    }
    SetPic(name: string, filename: string, data: SpriteData): Sprite {
        if (this.mapPicName[filename] != undefined) {
            if (name != this.mapPicName[filename])
                throw "already have a picfile :" + filename + " with name:" + name;
        }
        this.mapPicName[filename] = name;

        let texture = new Texture(tt.graphic.GetWebGL(), data.width, data.height, data.format, data.data);


        let sprite: Sprite;
        if (this.mapPic[name] != undefined) {
            //销毁旧贴图 并更新
            let s = this.mapPic[name];
            s[1].Destory();
            s[0].material.uniformTexs["tex"].value = texture;
            sprite = s[0];
        }
        else {
            //创建新精灵
            let mat = new Material(Resources.GetShaderProgram("simple"));
            mat.uniformTexs["tex"].value = texture;
            sprite = new Sprite(mat);
            this.mapPic[name] = [sprite, texture];
        }
        sprite.pivotX = data.pivotX;
        sprite.pivotY = data.pivotY;
        return sprite;
    }
}