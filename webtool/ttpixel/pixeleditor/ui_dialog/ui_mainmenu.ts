import { tt } from "../../ttapi/ttapi.js";
import { ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { SpriteData } from "../../ttlayer2/resources/packtex/packtex.js";
import { Color, QUI_BaseElement, QUI_Canvas, QUI_Container, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Overlay, Resources, TextureFormat } from "../../ttlayer2/ttlayer2.js";
import { QUI_DropButton } from "../../ttlayer2/ttui/qui_dropbutton.js";
import { FileTool } from "../fileapi/filefunchtml.js";
import { UI_PixelEditor } from "../ui_pixeleditor/ui_pixeleditor.js";
import { UI_DropMenuFade } from "../common/ui_dropmenufade.js";
import { UI_MenuFade } from "../common/ui_menufade.js";

export class UI_MainMenu extends UI_DropMenuFade {
    constructor(editor: UI_PixelEditor) {
        super();
        this.localRect.setAsFill();
        this.InitMenu();


        this.editor = editor;
    }

    InitMenu(): void {
        this.AddLabelCenter("菜单");

        this.AddButton("open", async () => {
            let url = await FileTool.OpenFileAsDataUrl("Image");
            console.log("getdata=" + url.length);
            let data = await tt.loader.LoadImageDataAsync(url);
            console.log("img load:" + data.width + "X" + data.height);
            let spdata = new SpriteData;
            spdata.width = data.width;
            spdata.height = data.height;
            spdata.format = TextureFormat.RGBA32;
            spdata.data = data.data;
            this.editor.SetPixelData(spdata);
            this.Close();
        });

        this.AddButton("save img", async () => {
            let data = this.editor.GetPixelData();
            let dataurl = await FileTool.SpriteDataToPngDataUrl(data);
            await FileTool.SaveData("1.png", dataurl);
            this.Close();
        });

        this.AddButton("save package", () => {
            this.Close();
        });
        this.AddText("打开文件，从本地选一个图片编辑，不能太大", 0.5);
        this.AddText("保存，如果是浏览器则是下载", 0.5);
        this.AddText("打包保存，这是将来的事情", 0.5);
        this.AddText("按住别动，移动到想要的功能松手。", 0.5);
    }
    editor: UI_PixelEditor;
    y: number = 32;
    AddLabelCenter(text: string, scale: number = 1.0): void {
        var l = Resources.CreateGUI_Label(text);
        l.fontScale.X *= scale;
        l.fontScale.Y *= scale;
        l.localRect.setVPosByTopBorder(20, this.y);
        this.addChild(l);
        this.y += 24 * scale;
    }
    AddText(text: string, scale: number = 1.0): void {
        var l = Resources.CreateGUI_Label(text, Color.White, scale);

        l.localRect.setVPosByTopBorder(24 * scale, this.y);
        l.localRect.setHPosFill(16, 16);
        l.halign = QUI_HAlign.Left;
        this.addChild(l);
        this.y += 24 * scale;
    }
    AddButton(text: string, onclick: () => void, scale: number = 1.0): void {

        var b = Resources.CreateGUI_Button(text, Color.White, scale);
        let db = new QUI_DropButton(-1);
        db.ElemNormal = b.ElemPress;
        db.ElemActive = b.ElemNormal;
        db.localRect.setVPosByTopBorder(24 * scale, this.y);
        db.localRect.setHPosFill(16, 16);
        db.OnPressUp = onclick;
        this.addChild(db);
        this.y += 28 * scale;
    }
    OnShow(): void {
        UI_MainMenu._ishow = true;
    }
    OnClose(): void {
        this._parent.removeChild(this);
        UI_MainMenu._ishow = false;
    }

    private static _ishow: boolean = false;
    static Show(canvas: QUI_IElement, id: number, editor: UI_PixelEditor): void {

        if (this._ishow)
            return;//防止多次打开
        let menu = new UI_MainMenu(editor);
        menu.Show(canvas, id);

    }
}