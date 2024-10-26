
import { tt } from "../ttapi/ttapi.js";

export namespace tt_impl {
  export class Loader implements tt.ILoader {


    async LoadStringAsync(url: string): Promise<string> {

      let req = await fetch(url);
      let txt = await req.text();
      return txt;

    }
    async LoadBinaryAsync(url: string): Promise<ArrayBuffer> {

      let req = await fetch(url);
      let bin = await req.arrayBuffer();
      return bin;
    }
    LoadImageAsync(url: string): Promise<HTMLImageElement> {

      // while (!comp) {
      //   await tt.sleep(1);
      // }
      //标准写法，不优雅，不着急的时候可以用更优雅的tt.sleep
      let aysnc_op = new Promise<HTMLImageElement>((resolve, reject) => {
        let img = new Image();
        img.src = url;
        let comp = false;
        img.onload = (e) => {
          comp = true;
          resolve(img);
        }
        img.onerror = (e) => {
          comp = true;
          img = null;
          reject("img error:" + e.toString());
        }
      });
      return aysnc_op;

    }
   
    async LoadImageDataAsync(name: string): Promise<ImageData> {
      let img = await this.LoadImageAsync(name);

      let c2d =tt.graphic.GetBackGroundC2D();

      c2d.canvas.width = img.width;
      c2d.canvas.height = img.height;
      c2d.clearRect(0, 0, img.width, img.height);
      c2d.drawImage(img, 0, 0);

      let data = c2d.getImageData(0, 0, img.width, img.height);

      return data;
    }

    LoadTextPixel(text: string, fontsize: number, width: number, height: number): ImageData {
      let c2d =tt.graphic.GetBackGroundC2D();
      c2d.canvas.width = width;
      c2d.canvas.height = height;

      c2d.clearRect(0, 0, width, height);
      //c2d.fillStyle = "#ffff00";
      //c2d.strokeRect(0,0,width,height);
      let font = "monospace";
      c2d.font = fontsize + "px " + font;// regular";
      c2d.textBaseline = "top";


      //画个阴影
      c2d.fillStyle = "#000000";
      c2d.fillText(text, 1, 1);

      c2d.fillStyle = "#ffffff";
      c2d.fillText(text, 0, 0);

      // c2d.strokeStyle="#000000";
      // c2d.lineWidth=1;
      // c2d.strokeText(text, 0, 0);
      //c2d.measureText(text).
      let imagedata = c2d.getImageData(0, 0, width, height);
      return imagedata;
    }

  }
}