import { FindTool } from "../../xioext/findtool.js";
import { IOExt, IOExt_DirectoryHandle, IOExt_FileHandle } from "../../xioext/ioext.js";

export class WorkingDir {
    private static root: IOExt_DirectoryHandle

    private static editfile: IOExt_FileHandle;

    static Open(root: IOExt_DirectoryHandle) {
        this.root = root;
    }
    static async FindFile(filter: string[], depth: number = 3) {
        let result = await FindTool.FindAllFile(this.root, filter, depth);
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
    static async CreateJsonFile(name: string): Promise<IOExt_FileHandle> {
        let file = this.GetFile(name, this.root);
        if (file != null)
            throw "Error CreateJsonFile 01:" + name;
        let b = await IOExt.File_CreateText(this.root, name, "{}");
        if (!b)
            throw "Error CreateJsonFile 02:" + name;
        file = this.GetFile(name, this.root);
        if (file == null)
            throw "Error CreateJsonFile 02:" + name;
        return file;
    }
    static SetEditFile(editfile: IOExt_FileHandle) {
        this.editfile = editfile;
    }
    static GetEditFile(): IOExt_FileHandle {
        return this.editfile;
    }
}