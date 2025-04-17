import { Vector2 } from "../ttlayer2.js";
import { TTAni, TTAniFrame, TTAniPicInfo } from "./ttpackage";

export interface IAniPlayerAdapter {
    LoadPic(name: string): any;
    Render(ttpic: TTAniPicInfo, worldpos: Vector2, worldscale: Vector2): void;
}
export class AniPlayer {
    private ani: TTAni;
    private adapter: IAniPlayerAdapter;

    pos: Vector2 = new Vector2(0, 0);
    scale: Vector2 = new Vector2(1, 1);


    curframe: number;
    private drawframe: TTAniFrame;
    constructor(ttani: TTAni, adapter: IAniPlayerAdapter) {
        this.ani = ttani;
        this.adapter = adapter;
        //初始化Ani
        for (var i = 0; i < this.ani.frames.length; i++) {
            let f = this.ani.frames[i];
            if (f.pics != null) {
                for (var j = 0; j < f.pics.length; j++) {
                    let aas = adapter.LoadPic(f.pics[j].name);
                    f.pics[j].cacheobj = aas;
                }
            }
            //let aas = Resources.GetPackElement().GetElementByName("pw6_" + i);
        }
        this.curframe = 0;

    }
    Update(delta: number) {
        //play by fps
        this.curframe += delta * this.ani.fps;

        while (this.curframe >= this.ani.frames.length) {
            if (this.ani.loop) {
                this.curframe -= this.ani.frames.length;
            }
            else {
                this.curframe = this.ani.frames.length - 1;
            }
        }
        let fid = this.curframe | 0;
        //console.log("curframe=" + fid);
        
        let frame = this.ani.frames[fid];
        if (frame.refframe >= 0)
            frame = this.ani.frames[frame.refframe];
        
        this.drawframe = frame;

    }
    Render() {
        for (var j = 0; j < this.drawframe.pics.length; j++) {
            let pic = this.drawframe.pics[j];
            this.adapter.Render(pic, this.pos, this.scale);

        }
    }

}