/// <reference path="./lib/index.d.ts" />
import { tt } from "../ttapi_interface/ttapi.js";

export namespace tt_impl {
  export class WxLoader implements tt.ILoader {
    IsSupportTextSync(): boolean {
      return true;
    }

    IsSupportBinarySync(): boolean {
      return true;
    }
    IsSupportImageSync(): boolean {
      return false;
    }
    async sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    LoadStringSync(name: string): string {
      let fs = wx.getFileSystemManager();
      let t = fs.readFileSync(name, "utf8") as string;
      return t;
    }

    async LoadStringAsync(name: string): Promise<string> {

      let fs = wx.getFileSystemManager();
      let _txt: string = null;
      let comp: boolean = false;
      fs.readFile({
        "filePath": name, "encoding": "utf-8", "complete": (c) => {
          comp = true;
          console.log(" c.errMsg=" + c.errMsg);
          //console.log("--load comp:" + JSON.stringify(c));
        }
        , "success": (c) => {
          _txt = c.data as string;
          //console.log("--load succ:" + JSON.stringify(c));
        }

      });
      while (!comp) {
        await this.sleep(1);
      }
      return _txt;
    }

    LoadBinarySync(name: string): ArrayBuffer {
      let fs = wx.getFileSystemManager();
      let t = fs.readFileSync(name, undefined) as ArrayBuffer;
      return t;
    }

    async LoadBinaryAsync(name: string): Promise<ArrayBuffer> {

      let fs = wx.getFileSystemManager();
      let _ret: ArrayBuffer = null;
      let comp: boolean = false;
      fs.readFile({
        "filePath": name, "encoding": undefined, "complete": (c) => {
          comp = true;

        }
        , "success": (c) => {
          _ret = c.data as ArrayBuffer;
        }
      });
      while (!comp) {
        await this.sleep(1);
      }
      return _ret;
    }
    LoadImageSync(url: string): HTMLImageElement {
      throw new Error("not support in this env.");
    }
    async LoadImageAsync(url: string): Promise<HTMLImageElement> {
      let img = wx.createImage();
      img.src = url;
      let comp = false;
      img.onload = (e) => {
        comp = true;
      }
      img.onerror = (e) => {
        comp = true;
        img = null;
      }

      while (!comp) {
        await this.sleep(1);
      }
      return img as HTMLImageElement;
    }
    static c2d: CanvasRenderingContext2D;
    async LoadImageDataAsync(name: string, gray: boolean): Promise<tt.ImageBuffer> {
      let img = await this.LoadImageAsync(name);
      if (WxLoader.c2d == null) {
        let canvas = wx.createCanvas();
        WxLoader.c2d = canvas.getContext("2d");
      }
      WxLoader.c2d.canvas.width = img.width;
      WxLoader.c2d.canvas.height = img.height;
      WxLoader.c2d.clearRect(0, 0, img.width, img.height);
      WxLoader.c2d.drawImage(img, 0, 0);

      let data = WxLoader.c2d.getImageData(0, 0, img.width, img.height);
      let imgbuf = new tt.ImageBuffer();
      imgbuf.width = data.width;
      imgbuf.height = data.height;
      if (gray) {
        imgbuf.data = new Uint8Array(data.width * data.height);
      }
      else {
        imgbuf.data = new Uint8Array(data.width * data.height * 4);
      }
      for (var y = 0; y < data.height; y++) {
        for (var x = 0; x < data.width; x++) {
          if (gray) {
            let r = data.data[(y * data.width + x) * 4 + 0];
            let g = data.data[(y * data.width + x) * 4 + 1];
            let b = data.data[(y * data.width + x) * 4 + 2]
            let grayv = (0.299 * r + 0.587 * g + 0.114 * b) | 0;
            if (grayv < 0)
              grayv = 0;
            if (grayv > 255)
              grayv = 255;
            imgbuf.data[(y * data.width + x)] = grayv;
          }
          else {
            imgbuf.data[(y * data.width + x) * 4 + 0] = data.data[(y * data.width + x) * 4 + 0]
            imgbuf.data[(y * data.width + x) * 4 + 1] = data.data[(y * data.width + x) * 4 + 1]
            imgbuf.data[(y * data.width + x) * 4 + 2] = data.data[(y * data.width + x) * 4 + 2]
            imgbuf.data[(y * data.width + x) * 4 + 3] = data.data[(y * data.width + x) * 4 + 3]
          }
        }
      }
      return imgbuf;
    }

  }
}