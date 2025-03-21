
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
  }

  export class LoaderEx implements tt.ILoaderEx {


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

    async LoadImageDataAsync(url: string): Promise<ImageData> {
      let img = await this.LoadImageAsync(url);

      let c2d = tt.graphic.GetBackGroundC2D();

      c2d.canvas.width = img.width;
      c2d.canvas.height = img.height;
      c2d.clearRect(0, 0, img.width, img.height);
      c2d.drawImage(img, 0, 0);

      let data = c2d.getImageData(0, 0, img.width, img.height);

      return data;
    }

    async LoadImageDataResizeAsync(url: string, width: number, height: number): Promise<ImageData> {
      let img = await this.LoadImageAsync(url);

      let c2d = tt.graphic.GetBackGroundC2D();

      c2d.canvas.width = img.width;
      c2d.canvas.height = img.height;
      c2d.clearRect(0, 0, img.width, img.height);
      c2d.drawImage(img, 0, 0, width, height);

      let data = c2d.getImageData(0, 0, width, height);

      return data;
    }
    async LoadCustomFont(name: string, url: string): Promise<string> {
      const myFont = new FontFace(name, "url(" + url + ")");
      let font = await myFont.load();
      document.fonts.add(font);
      return font.family;
    }


  }
}