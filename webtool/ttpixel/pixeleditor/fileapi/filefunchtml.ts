import { SpriteData } from "../../ttlayer2/resources/packtex/packtex";

export class FileTool {
    static input: HTMLInputElement = null;
    static canvas: HTMLCanvasElement = null;
    static c2d: CanvasRenderingContext2D = null;
    static a: HTMLAnchorElement = null;
    static async OpenFileAsDataUrl(mime: string = "image/png"): Promise<string> {
        if (this.input == null) {
            this.input = document.createElement("input");
            //input.accept="image/png,image/jpeg";
            document.body.appendChild(this.input);
            this.input.type = "file";
            this.input.style.visibility = "hidden";

        }
        this.input.accept = mime;

        return new Promise((resolve) => {
            this.input.onchange = () => {
                console.log("input.onchange");
                var file: File = this.input.files[0];
                if (file != undefined) {
                    console.log("file name:" + file.name + " size:" + file.size);
                    let re = new FileReader();

                    re.onload = () => {
                        console.log("file=" + re.result);
                        resolve(re.result as string);
                    }
                    re.readAsDataURL(this.input.files[0]);
                }
                else {
                    resolve(null);
                }
            }

            this.input.click();
            console.log("input.click");
        });

    }
    static async SpriteDataToPngDataUrl(spdata: SpriteData): Promise<string> {
        let b = await this.SpriteDataToPngBlob(spdata);
        return URL.createObjectURL(b);
    }
    static async SpriteDataToPngBlob(spdata: SpriteData): Promise<Blob> {
        if (this.canvas == null) {
            this.canvas = document.createElement("canvas");
            document.body.appendChild(this.canvas);
            this.canvas.style.visibility = "hidden";
            this.c2d = this.canvas.getContext("2d");
        }
        var idata = new ImageData(spdata.width, spdata.height);
        for (let i = 0; i < spdata.data.length; i++) {
            idata.data[i] = spdata.data[i];
        }
        this.canvas.width = spdata.width;
        this.canvas.height = spdata.height;
        this.c2d.putImageData(idata, 0, 0);
        return new Promise((resolve) => {
            this.canvas.toBlob((b) => {
                resolve(b);
            }, "png");
        })



    }
    static DataURLToBlob(dataurl: string): Blob {
        let parts = dataurl.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new window.Blob([uInt8Array], { type: contentType });
    }

    static async SaveData(name: string, dataurl: string) {
        if (this.a == null) {
            this.a = document.createElement("a");
            document.body.appendChild(this.a);
            this.a.style.visibility = "hidden";
        }

        this.a.href = dataurl;
        this.a.download = name;

        this.a.click();

    }
}