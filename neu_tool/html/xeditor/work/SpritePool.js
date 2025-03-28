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
        let name = this.mapPicFileName2Name[filename];
        if (name == undefined)
            return null;
        return name;
    }
    GetPicByName(name) {
        let filename = this.mapPicName2FileName[name];
        if (filename == undefined)
            return null;
        return this.GetPicByFileName(filename);
    }
    GetPicByFileName(filename) {
        let pic = this.mapPic[filename];
        if (pic == undefined)
            return null;
        return pic;
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
            this.mapPic[filename] = [sprite, texture, data];
        }
        sprite.pivotX = data.pivotX;
        sprite.pivotY = data.pivotY;
        return [sprite, texture, data];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ByaXRlcG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwcml0ZXBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFxQixRQUFRLEVBQWtCLFNBQVMsRUFBRSxNQUFNLEVBQWMsT0FBTyxFQUFFLEVBQUUsRUFBeUIsTUFBTSw0QkFBNEIsQ0FBQztBQUU1SiwwQkFBMEI7QUFDMUIsTUFBTSxPQUFPLGdCQUFnQjtJQUE3QjtRQVlJLHdCQUFtQixHQUE2QixFQUFFLENBQUEsQ0FBQSxnQkFBZ0I7UUFDbEUsd0JBQW1CLEdBQTZCLEVBQUUsQ0FBQSxDQUFBLGdCQUFnQjtRQUNsRSxXQUFNLEdBQW9ELEVBQUUsQ0FBQSxDQUFBLGtCQUFrQjtJQTZDbEYsQ0FBQztJQXpERyxPQUFPLENBQUMsSUFBWTtJQUVwQixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQW1CLEVBQUUsUUFBaUIsRUFBRSxVQUFtQjtRQUM5RCxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBa0IsQ0FBQztRQUNqQyxRQUFRO1FBQ1IsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBS0QsT0FBTyxDQUFDLFFBQWdCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQUNELFVBQVUsQ0FBQyxRQUFnQjtRQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLElBQUksU0FBUztZQUNqQixPQUFPLElBQUksQ0FBQztRQUNoQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQVk7UUFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUksUUFBUSxJQUFJLFNBQVM7WUFDckIsT0FBTyxJQUFJLENBQUM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNELGdCQUFnQixDQUFDLFFBQWdCO1FBQzdCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsSUFBSSxHQUFHLElBQUksU0FBUztZQUNoQixPQUFPLElBQUksQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDRCxjQUFjLENBQUMsSUFBWSxFQUFFLFFBQWdCO1FBQ3pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDMUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLElBQWdCO1FBQ25ELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNyQyxNQUFNLDBCQUEwQixHQUFHLFFBQVEsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVwQyxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRyxJQUFJLE1BQWMsQ0FBQztRQUNuQixDQUFDO1lBQ0csT0FBTztZQUNQLElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdELEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUN2QyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNKIn0=