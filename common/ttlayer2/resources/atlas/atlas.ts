
import { tt } from "../../../ttapi/ttapi.js";
import { ITexture, Texture, TextureFormat } from "../../ttlayer2.js";
import { Sprite } from "./sprite.js";

//#region  Atalas
export class Atlas {
    allsprite: Sprite[] = [];
    mapsprite: { [id: string]: number } = {};
    tex: ITexture;
    ParseJson(json: any, ignoreCase: boolean = true): void {
        let ss = json["sprites"] as [];
        let texsize = (json["texsize"] as string).split(",");
        let w = parseInt(texsize[0]);
        let h = parseInt(texsize[1]);
        for (var i = 0; i < ss.length; i++) {
            let s = new Sprite(this.tex, null);
            let name = ss[i]["name"] as string;;
            if (ignoreCase) {
                name = name.toLowerCase();
            }
            let border = (ss[i]["border"] as string).split(",");
            let uv = (ss[i]["uv"] as string).split(",");
            //let pivot = (ss[i]["pivot"] as string).split(",");

            this.mapsprite[name] = this.allsprite.length;
            this.allsprite.push(s);


            s.border.XLeft = parseInt(border[0]);
            s.border.YTop = parseInt(border[1]);
            s.border.XRight = parseInt(border[2]);
            s.border.YBottom = parseInt(border[3]);

            let ux = parseInt(uv[0])
            let uy = parseInt(uv[1])
            s.pixelwidth = parseInt(uv[2])
            s.pixelheight = parseInt(uv[3])

            s.uv.U1 = (ux - 0.01) / w;
            s.uv.V1 = (uy - 0.01) / h;
            s.uv.U2 = (ux + s.pixelwidth - 0.01) / w;
            s.uv.V2 = (uy + s.pixelheight - 0.01) / h;




        }
    }

    GetSprite(name: string): Sprite {
        return this.allsprite[this.mapsprite[name]];
    }
    async LoadAsync(urlAtlas: string, urlImage: string = null,ignoreCase: boolean = true) {
        let txt = await tt.loader.LoadStringAsync(urlAtlas);
        let json = JSON.parse(txt);
        if (urlImage == null) {
            let tex = json["tex"] as string;
            urlImage= urlAtlas.substr(0, urlAtlas.lastIndexOf("/")+1)+tex;
        }
        let img =await tt.loader.LoadImageAsync(urlImage);
        let t =new Texture(tt.graphic.GetWebGL(),img.width,img.height,TextureFormat.RGBA32,null);
        t.UploadImg(img);
        this.tex=t;

        this.ParseJson(json);
    }
}
