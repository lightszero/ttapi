import { QUI_Canvas, TTJson, TTPackage } from "../../ttlayer2/ttlayer2.js";
import { FindTool } from "../../xioext/findtool.js";
import { IOExt, IOExt_DirectoryHandle, IOExt_FileHandle } from "../../xioext/ioext.js";
import { Dialog_Message } from "../ui/dialog_message.js";

export class Working {
    static root: IOExt_DirectoryHandle

    static editfile: IOExt_FileHandle;

    static ttjson: TTJson;

    static async FindFile(filter: string[], depth: number = 3) {
        let result = await FindTool.FindAllFile(this.root, filter, depth);
        return result;
    }
    static async FindFileReletive(path: IOExt_DirectoryHandle, filter: string[], depth: number = 3) {
        let result = await FindTool.FindAllFile(path, filter, depth);
        return result;
    }
    static async GetFile(name: string, path: IOExt_DirectoryHandle): Promise<IOExt_FileHandle> {
        let list = await IOExt.Directory_List(this.root);
        for (var i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase() == name.toLowerCase() && list[i].isfile) {
                return list[i] as IOExt_FileHandle;
            }
        }
        return null;
    }
    static async CreateJsonFile(canvas: QUI_Canvas, name: string): Promise<IOExt_FileHandle> {
        let file: IOExt_FileHandle = await this.GetFile(name, this.root);
        if (file != null) {
            Dialog_Message.Show(canvas, "Error CreateJsonFile 01:" + name + " 文件已存在");
            return null;
        }
        let b = await IOExt.File_CreateText(this.root, name, "{}");
        if (!b) {
            Dialog_Message.Show(canvas, "Error CreateJsonFile 02:" + name + " 文件创建失败");
            return null;
        }

        file = await this.GetFile(name, this.root);
        if (file == null) {
            Dialog_Message.Show(canvas, "Error CreateJsonFile 03:" + name + " 文件创建完却没了");
            return null;
        }
        return file;
    }

}