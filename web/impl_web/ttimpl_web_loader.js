var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tt } from "../interface/ttapi.js";
export var tt_impl;
(function (tt_impl) {
    class Loader {
        LoadStringAsync(url) {
            return __awaiter(this, void 0, void 0, function* () {
                let req = yield fetch(url);
                let txt = yield req.text();
                return txt;
            });
        }
        LoadBinaryAsync(url) {
            return __awaiter(this, void 0, void 0, function* () {
                let req = yield fetch(url);
                let bin = yield req.arrayBuffer();
                return bin;
            });
        }
        LoadImageAsync(url) {
            // while (!comp) {
            //   await tt.sleep(1);
            // }
            //标准写法，不优雅，不着急的时候可以用更优雅的tt.sleep
            let aysnc_op = new Promise((resolve, reject) => {
                let img = new Image();
                img.src = url;
                let comp = false;
                img.onload = (e) => {
                    comp = true;
                    resolve(img);
                };
                img.onerror = (e) => {
                    comp = true;
                    img = null;
                    reject("img error:" + e.toString());
                };
            });
            return aysnc_op;
        }
        LoadImageDataAsync(name, gray) {
            return __awaiter(this, void 0, void 0, function* () {
                let img = yield this.LoadImageAsync(name);
                if (Loader.c2d == null) {
                    let canvas = window.document.createElement("canvas");
                    Loader.c2d = canvas.getContext("2d");
                }
                Loader.c2d.canvas.width = img.width;
                Loader.c2d.canvas.height = img.height;
                Loader.c2d.clearRect(0, 0, img.width, img.height);
                Loader.c2d.drawImage(img, 0, 0);
                let data = Loader.c2d.getImageData(0, 0, img.width, img.height);
                let imgbuf = new tt.ImageBuffer();
                imgbuf.width = data.width;
                imgbuf.height = data.height;
                if (gray)
                    imgbuf.data = new Uint8Array(data.width * data.height);
                else
                    imgbuf.data = new Uint8Array(data.width * data.height * 4);
                for (var y = 0; y < data.height; y++) {
                    for (var x = 0; x < data.width; x++) {
                        if (gray) {
                            let r = data.data[(y * data.width + x) * 4 + 0];
                            let g = data.data[(y * data.width + x) * 4 + 1];
                            let b = data.data[(y * data.width + x) * 4 + 2];
                            let grayv = (0.299 * r + 0.587 * g + 0.114 * b) | 0;
                            if (grayv < 0)
                                grayv = 0;
                            if (grayv > 255)
                                grayv = 255;
                            imgbuf.data[(y * data.width + x)] = grayv;
                        }
                        else {
                            imgbuf.data[(y * data.width + x) * 4 + 0] = data.data[(y * data.width + x) * 4 + 0];
                            imgbuf.data[(y * data.width + x) * 4 + 1] = data.data[(y * data.width + x) * 4 + 1];
                            imgbuf.data[(y * data.width + x) * 4 + 2] = data.data[(y * data.width + x) * 4 + 2];
                            imgbuf.data[(y * data.width + x) * 4 + 3] = data.data[(y * data.width + x) * 4 + 3];
                        }
                    }
                }
                return imgbuf;
            });
        }
    }
    tt_impl.Loader = Loader;
})(tt_impl || (tt_impl = {}));
