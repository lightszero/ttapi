
import { tt } from "../ttapi_interface/ttapi.js";

export class WXStore implements tt.IStore {
    async GetText(name: string): Promise<string | null> {
        let fm = wx.getFileSystemManager();
        let _filename = `${wx.env.USER_DATA_PATH}/${name}.dat`;
        let res: string;
        let done = false
        fm.readFile({
            "filePath": _filename, "encoding": "utf8",
            "success": (r) => {
                res = r.data as string;
                done = true;

            },
            "fail": (r) => {
                res = null;
                done = true;
            }
        });
        while (!done) {
            await this.sleep(1);
        }
        return res;
    }
    async GetBinary(name: string): Promise<Uint8Array | null> {
        let fm = wx.getFileSystemManager();
        let _filename = `${wx.env.USER_DATA_PATH}/${name}.dat`;
        let res: Uint8Array;
        let done = false
        fm.readFile({
            "filePath": _filename, "encoding": undefined,
            "success": (r) => {
                res = new Uint8Array(r.data as ArrayBuffer);
                done = true;

            },
            "fail": (r) => {
                res = null;
                done = true;
            }
        });
        while (!done) {
            await this.sleep(1);
        }
        return res;
    }
    async SaveText(name: string, data: string): Promise<void> {
        let fm = wx.getFileSystemManager();
        let _filename = `${wx.env.USER_DATA_PATH}/${name}.dat`;
        let done = false;
        fm.writeFile({
            "filePath": _filename, "data": data, "encoding": "utf8", "complete": (r) => {
                done = true;
            }
        });
        while (!done) {
            await this.sleep(1);
        }
    }
    async SaveBinary(name: string, data: Uint8Array): Promise<void> {
        let fm = wx.getFileSystemManager();
        let _filename = `${wx.env.USER_DATA_PATH}/${name}.dat`;
        let done = false;
        fm.writeFile({
            "filePath": _filename, "data": data, "encoding": undefined, "complete": (r) => {
                done = true;
            }
        });
        while (!done) {
            await this.sleep(1);
        }
    }


    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async SaveDataToLocal(key: string, data: string | ArrayBuffer): Promise<boolean> {
        let done = false;
        let succ = false;

        let _tempfilename = `${wx.env.USER_DATA_PATH}/_outsave_${key}.dat`
        let fm = wx.getFileSystemManager();
        console.log("save local,0step ");
        fm.writeFile({
            "filePath": _tempfilename, "data": data, "success": () => {
                done = true;
                succ = true;
            }, "fail": () => {
                done = true;
                succ = false;
            }
        });
        while (!done) {
            await this.sleep(1);
        }
        console.log("save local,1step write=" + succ);
        if (succ == false)
            throw new Error("write file fail.");

        done = false;
        succ = false;
        wx.saveFileToDisk({
            "filePath": _tempfilename, "success": () => {
                succ = true;
                done = true;
            }, "fail": () => {
                succ = false;
                done = true;
            }
        })
        while (!done) {
            await this.sleep(1);
        }
        let finalsucc = succ;
        console.log("save local,2step save=" + succ);

        done = false;
        succ = false;
        fm.unlink({
            "filePath": _tempfilename, "success": () => {
                done = true;
                succ = true;
            }, "fail": () => {
                done = true;
                succ = false;
            }
        });
        while (!done) {
            await this.sleep(1);
        }
        console.log("save local,3step del=" + succ);
        return finalsucc
    }
}