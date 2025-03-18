import { QUI_Grow, Color, QUI_Button, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Scroll, QUI_Container, tt, Texture, TextureFormat, QUI_Overlay } from "../ttlayer2/ttlayer2.js";
import { TTPathTool } from "../ttlayer2/utils/path/pathtool.js";
import { FindTool } from "../xioext/findtool.js";

import { IOExt, IOExt_DirectoryHandle, IOExt_FileHandle } from "../xioext/ioext.js";

export class PickAble_FileItem extends QUI_Container {
    constructor() {
        super();
        let ol = new QUI_Overlay();
        this.AddChild(ol);
        ol.OnPress = () => {
            (this._parent as QUI_Container).Pick(this);
        }

        // let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
        // if (ext == ".jpg" || ext == ".png") {this
        let imgback = this.imageback = new QUI_Image();
        imgback.localRect.SetAsFill();
        this.AddChild(imgback);
        imgback.localColor.A = 0;

        let img = this.image = new QUI_Image();
        //let tex = await this.LoadFileToTexture(result[i]);
        //img.SetByTexture(tex);
        img.localRect.setByPosAndSize(0, 0, 24, 24);
        img.sprite = null;
        this.AddChild(img);
        //}
        let label = this.label = new QUI_Label();
        label.localRect.SetAsFill();

        label.localRect.offsetX1 = 25;
        label.text = "pickable"
        label.halign = QUI_HAlign.Left;
        //this.contextPanel.GetContainer().AddChild(con);
        this.AddChild(label);
    }
    image: QUI_Image;
    imageback: QUI_Image;
    label: QUI_Label;

    OnFocus(): void {
        this.imageback.localColor = new Color(0.3, 0.4, 0.9, 1);
        this.label.localColor = new Color(0.9, 0.9, 0.3, 1);
    }
    OnUnFocus(): void {
        this.imageback.localColor.A = 0;
        this.label.localColor = Color.White
    }
}
export class FileGroup extends QUI_Group {
    constructor() {
        super();
        this.title.text = "File_List";

        this.InitTitleBar();
        let panelScroll = this.contextPanel = new QUI_Panel_Scroll();
        panelScroll.localRect.SetAsFill();
        panelScroll.localRect.offsetY1 = 22;
        this.GetContainer().AddChild(panelScroll);
    }
    contextPanel: QUI_Panel_Scroll;

    InitTitleBar() {
        let titlebar = new QUI_Panel();
        titlebar.localRect.setHPosFill();
        titlebar.localRect.setVPosByTopBorder(22);
        this.GetContainer().AddChild(titlebar);

        let titlegrow = new QUI_Grow();
        titlegrow.direction = QUI_Direction2.Horizontal;
        titlebar.GetContainer().AddChild(titlegrow);

        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(90, 18);
            let label = btn.elemNormal.GetChild(1) as QUI_Label;
            label.text = "打开目录";
            titlegrow.AddChild(btn);
            btn.OnClick = async () => {
                let r = await IOExt.Picker_Folder();
                if (r != null)
                    this.OnOpenFolder(r);
            }
        }
        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(90, 18);
            let label = btn.elemNormal.GetChild(1) as QUI_Label;
            label.text = "编辑选中";
            titlegrow.AddChild(btn);
            btn.OnClick = async () => {
                console.log("编辑选中")
            }
        }
    }

    async LoadFileToTexture(file: IOExt_FileHandle) {
        let idata = await IOExt.File_ReadBinary(file);
        let b = new Blob([idata]);
        let imagedata = await tt.loader.LoadImageDataAsync(URL.createObjectURL(b));
        let tex = new Texture(tt.graphic.GetWebGL(), imagedata.width, imagedata.height, TextureFormat.RGBA32,
            imagedata.data);
        return tex;
    }
    dir: IOExt_DirectoryHandle;
    async OnOpenFolder(file: IOExt_DirectoryHandle) {
        this.dir = file;
        this.contextPanel.GetContainer().RemoveChildAll();
        let result = await FindTool.FindAllFile(file, [".json", ".jpg", ".png"], 3);

        for (var i = 0; i < result.length; i++) {
            let con = new PickAble_FileItem();
            con.localRect.setBySize(500, 25);
            this.contextPanel.GetContainer().AddChild(con);
            let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
            if (ext == ".jpg" || ext == ".png") {
                let img = new QUI_Image();
                let tex = await this.LoadFileToTexture(result[i]);
                con.image.SetByTexture(tex);
            }


            con.label.text = (result[i].isfile ? "[File]" : "[Path]")
                + result[i].name;

        }
    }
    OnSaveFile(file: IOExt_FileHandle) {
        console.log("OnCreateFile:" + file);
    }

}