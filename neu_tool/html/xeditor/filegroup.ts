import { QUI_Grow, Color, QUI_Button, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Scroll } from "../ttlayer2/ttlayer2.js";
import { FindTool } from "../xioext/findtool.js";

import { IOExt, IOExt_DirectoryHandle, IOExt_FileHandle } from "../xioext/ioext.js";

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
            btn.localRect.setBySize(60, 18);
            let label = btn.elemNormal.GetChild(1) as QUI_Label;
            label.text = "Open";
            titlegrow.AddChild(btn);
            btn.OnClick = async () => {
                let r = await IOExt.Picker_Folder();
                if (r != null)
                    this.OnOpenFolder(r);
            }
        }
        // {
        //     let btn = new QUI_Button();
        //     btn.localRect.setBySize(60, 18);
        //     let label = btn.elemNormal.GetChild(1) as QUI_Label;
        //     label.text = "New";
        //     titlegrow.AddChild(btn);
        //     btn.OnClick = async () => {
        //         let r = await IOExt.Picker_SaveFile();

        //         if (r != null)
        //             this.OnSaveFile(r);
        //     }
        // }
        // {
        //     let btn = new QUI_Button();
        //     btn.localRect.setBySize(60, 18);
        //     let label = btn.elemNormal.GetChild(1) as QUI_Label;
        //     label.text = "Save";
        //     titlegrow.AddChild(btn);
        // }
        // {
        //     let label = this.titlebar_txt = new QUI_Label();
        //     label.text = "当前没有打开文件编辑"
        //     label.localRect.setBySize(200, 18);
        //     label.halign = QUI_HAlign.Left;
        //     titlegrow.AddChild(label);
        // }
    }

    dir: IOExt_DirectoryHandle;
    async OnOpenFolder(file: IOExt_DirectoryHandle) {
        this.dir = file;
        let result = await FindTool.FindAllFile(file, "*.json", 3);

        for (var i = 0; i < result.length; i++) {
            let label = new QUI_Label();
            label.localRect.setBySize(200, 20);
            label.text = (result[i].isfile ? "[File]" : "[Path]")
                + result[i].name;
            label.halign = QUI_HAlign.Left;
            this.contextPanel.GetContainer().AddChild(label);
        }
    }
    OnSaveFile(file: IOExt_FileHandle) {
        console.log("OnCreateFile:" + file);
    }

}