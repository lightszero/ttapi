/// <reference types="../fileapi/wicg-file-system-access" />

import { tt } from "../../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign } from "../../ttlayer2/ttlayer2.js";
import { GContext } from "../ttstate_all.js";

export class Test_FileApi implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;

    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        this.AddLabel("Filesystem access Api Test 只有https才可以用 ");
        this.AddLabel("移动平台通常不支持!");

        this.AddBtn("Open Path", () => {
            this.OpenPath();
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
    y: number = 64;
    AddLabel(text: string): void {
        let label = Resources.CreateGUI_Label(text);
        this.guilayer.GetCanvas().addChild(label);
        label.halign = QUI_HAlign.Left;
        label.localRect.setHPosByLeftBorder(196, 16);
        label.localRect.setVPosByTopBorder(16, this.y);
        label.fontScale.X *= 0.5;
        label.fontScale.Y *= 0.5;
        this.y += 20;
    }
    AddBtn(text: string, onclick: () => void): void {
        let btn = Resources.CreateGUI_Button(text, new Color(1, 1, 1, 1));
        this.guilayer.GetCanvas().addChild(btn);

        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(16, this.y);
        btn.OnClick = onclick;
        this.y += 20;
    }
    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;
        GameApp.GetViewList().AddDrawLayer(this.guilayer);
        let btn = Resources.CreateGUI_Button("<--", new Color(1, 1, 1, 1));
        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().addChild(btn);

        btn.OnClick = () => {
            this.nav.Back();
        }

        this.nav.GetContextObj().TopUI2Top();
    }


    OnUpdate(delta: number): void {

    }
    OnExit(): void {
        GameApp.GetViewList().RemoveDrawLayers(this.guilayer);

    }
    OnResize(width: number, height: number): void {

    }

    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }
}