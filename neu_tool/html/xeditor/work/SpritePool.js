import { Material, Resources, Sprite, Texture, tt } from "../../ttlayer2/ttlayer2.js";
//Editor模式管理Sprite,全都是独立图片
export class EditorSpritePool {
    constructor() {
        this.mapPicName2FileName = {}; //Name=>FileName
        this.mapPicFileName2Name = {}; //FileName=>Name
        this.mapPic = {}; //FileName=>Sprite
    }
    LoadPic(name) {
    }
    Render(ttpic, worldpos, worldscale) {
        let s = ttpic.cacheobj;
        //pivot?
        s.RenderWithPivot(this.batcher, worldpos, worldscale);
    }
    HavePic(filename) {
        return this.mapPic[filename] != undefined;
    }
    GetPicName(filename) {
        return this.mapPicFileName2Name[filename];
    }
    GetPicByFileName(filename) {
        let pic = this.mapPic[filename];
        if (pic == undefined)
            return null;
        return pic[0];
    }
    SetPicNameOnly(name, filename) {
        this.mapPicName2FileName[name] = filename;
        this.mapPicFileName2Name[filename] = name;
    }
    SetPic(name, filename, data) {
        if (this.mapPic[filename] != undefined) {
            throw "already have a picfile :" + filename + " with name:" + name;
        }
        this.SetPicNameOnly(name, filename);
        let texture = new Texture(tt.graphic.GetWebGL(), data.width, data.height, data.format, data.data);
        let sprite;
        {
            //创建新精灵
            let mat = new Material(Resources.GetShaderProgram("simple"));
            mat.uniformTexs["tex"].value = texture;
            sprite = new Sprite(mat);
            this.mapPic[filename] = [sprite, texture];
        }
        sprite.pivotX = data.pivotX;
        sprite.pivotY = data.pivotY;
        return sprite;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaXRlcG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwcml0ZXBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFxQixRQUFRLEVBQWtCLFNBQVMsRUFBRSxNQUFNLEVBQWMsT0FBTyxFQUFFLEVBQUUsRUFBeUIsTUFBTSw0QkFBNEIsQ0FBQztBQUU1SiwwQkFBMEI7QUFDMUIsTUFBTSxPQUFPLGdCQUFnQjtJQUE3QjtRQVlJLHdCQUFtQixHQUE2QixFQUFFLENBQUEsQ0FBQSxnQkFBZ0I7UUFDbEUsd0JBQW1CLEdBQTZCLEVBQUUsQ0FBQSxDQUFBLGdCQUFnQjtRQUNsRSxXQUFNLEdBQXdDLEVBQUUsQ0FBQSxDQUFBLGtCQUFrQjtJQXFDdEUsQ0FBQztJQWpERyxPQUFPLENBQUMsSUFBWTtJQUVwQixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQW1CLEVBQUUsUUFBaUIsRUFBRSxVQUFtQjtRQUM5RCxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBa0IsQ0FBQztRQUNqQyxRQUFRO1FBQ1IsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBS0QsT0FBTyxDQUFDLFFBQWdCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQUNELFVBQVUsQ0FBQyxRQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsUUFBZTtRQUU1QixJQUFJLEdBQUcsR0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQUcsR0FBRyxJQUFFLFNBQVM7WUFDYixPQUFPLElBQUksQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBQ0QsY0FBYyxDQUFDLElBQVksRUFBRSxRQUFnQjtRQUN6QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxJQUFnQjtRQUNuRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7WUFDckMsTUFBTSwwQkFBMEIsR0FBRyxRQUFRLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQztRQUN2RSxDQUFDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFcEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEcsSUFBSSxNQUFjLENBQUM7UUFDbkIsQ0FBQztZQUNHLE9BQU87WUFDUCxJQUFJLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3RCxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDdkMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUNKIn0=