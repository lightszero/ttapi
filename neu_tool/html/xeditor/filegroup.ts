import { QUI_Grow, Color, QUI_Button, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel } from "../ttlayer2/ttlayer2.js";

import { IOExt, IOExt_DirectoryHandle, IOExt_FileHandle } from "./twoenv.js";

export class FileGroup extends QUI_Group {
    constructor() {
        super();
        this.title.text = "File_List";

        this.InitTitleBar();

    }
  
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
            let label = btn.elemNormal.AsContainer().GetChild(1) as QUI_Label;
            label.text = "Open";
            titlegrow.AddChild(btn);
            btn.OnClick = async () => {
                let r = await IOExt.Picker_Folder();
                if (r != null)
                    this.OnOpenFile(r);
            }
        }
        // {
        //     let btn = new QUI_Button();
        //     btn.localRect.setBySize(60, 18);
        //     let label = btn.elemNormal.AsContainer().GetChild(1) as QUI_Label;
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
        //     let label = btn.elemNormal.AsContainer().GetChild(1) as QUI_Label;
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

    OnOpenFile(file: IOExt_DirectoryHandle) {
        this.title.text = "FileGroup 当前编辑目录=" + file.name;
    }
    OnSaveFile(file: IOExt_FileHandle) {
        console.log("OnCreateFile:" + file);
    }

}