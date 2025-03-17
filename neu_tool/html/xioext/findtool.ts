import { IOExt, IOExt_DirectoryHandle, IOExt_FileHandle } from "./ioext.js";

export class FindTool {
    static async FindAllFile(dir: IOExt_DirectoryHandle, ext: string, deeplimit: number) {
        if (ext.charAt(0) != ".") {
            ext = "." + ext;
        }

        let regex = new RegExp("(" + ext + ")$");
        regex.ignoreCase;
        let result: IOExt_FileHandle[] = []
        await this.FindAllFile_Deep(dir, regex, result, 2);
        return result;
    }
    static async FindAllFile_Deep(dir: IOExt_DirectoryHandle, ext: RegExp, filelist: IOExt_FileHandle[], deeplimit: number): Promise<void> {
        let files = await IOExt.Directory_List(dir);
        for (var i = 0; i < files.length; i++) {
            if (files[i].isfile) {
                if (ext.test(files[i].name)) {
                    filelist.push(files[i] as IOExt_FileHandle);
                }

            }
            else {
                if (deeplimit > 1 && files[i].name.charAt(0) != ".") {
                    await this.FindAllFile_Deep(files[i] as IOExt_DirectoryHandle, ext, filelist, deeplimit - 1);
                }
            }
        }
        return;
    }
}