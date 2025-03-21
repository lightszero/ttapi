/// <reference types="../fileapi/wicg-file-system-access" />

import { tt } from "../../ttapi/ttapi.js";
import { SpriteData } from "../../ttlayer2/resources/packtex/packtex.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, TextureFormat, QUI_Button, QUI_Label } from "../../ttlayer2/ttlayer2.js";
import { FileTool } from "../fileapi/filefunchtml.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "./test_base.js";

export class Test_FileApi extends Test_Base {
  
    OnInit(nav: TTState_All): void {
        super.OnInit(nav);

        this.AddLabel("Filesystem access Api Test 只有https才可以用 ");
        this.AddLabel("移动平台通常不支持!");
        var support = window["showDirectoryPicker"] != undefined;
        this.AddLabel("FileAPI支持=" + support);
        this.AddButton("Open Path", () => {
            this.OpenPath();
        });
        this.AddLabel("Input 支持好些，但是体验较差!");

        this.AddButton("Open By Input", async () => {
            var url = await FileTool.OpenFileAsDataUrl("image/png,image/jpeg");
            console.log("file=" + url);


        });
        this.AddButton("Save By FileWriter", async () => {
            var idata = new SpriteData();
            idata.width = 32;
            idata.height = 32;
            idata.format = TextureFormat.RGBA32;
            idata.data = new Uint8Array(32 * 32 * 4);
            for (let i = 0; i < idata.data.length; i++) {
                idata.data[i] = 255;
            }
            var b = FileTool.DataURLToBlob(FileTool.SpriteDataToDataUrl(idata));
            FileTool.SaveData("abcd.png", URL.createObjectURL(b));


        });
    }
    async OpenPath() {
        try {
            let dichandle = await showDirectoryPicker({ "mode": "readwrite", "startIn": "documents" });

            for await (let i of dichandle.entries()) {
                let key: string = i[0];
                let value: FileSystemHandle = i[1];
                console.log(key + ":" + value.kind);

            }
            let f1 = await dichandle.getFileHandle("f1.json", { "create": true });
            let ws = await f1.createWritable({ "keepExistingData": false });
            await ws.write("text ab1");
            await ws.close();

            let d1 = await dichandle.getDirectoryHandle("bb", { "create": true });

        }
        catch (e) {
            this.AddLabel("Err:" + e);
        }

    }


}