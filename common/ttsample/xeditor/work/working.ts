import { TTPathTool, FindTool, IOExt, IOExt_DirectoryHandle, IOExt_FileHandle, QUI_Canvas, Sprite, SpriteData, TextureFormat, tt, TTJson, TTPackage, TTPicData } from "../../../ttlayer2/ttlayer2.js";


import { Dialog_Message } from "../ui/dialog_message.js";
import { EditorSpritePool } from "./spritepool.js";


export class EditImage {
    name: string
    data: TTPicData
    sprite: Sprite
    //spritedata: SpriteData
    //保存修改
    Apply() {
        if (this.data.IsInnerHex()) {
            this.data.FillHexSrcName(this.data.data);
        }
        let str = this.data.srcfile;
        str += ";pivot=" + this.data.pivotX + "," + this.data.pivotY;
        Working.Cmd_SetImg(this.name, str);

    }
}
export class Working {
    static root: IOExt_DirectoryHandle

    static editfile: IOExt_FileHandle;
    static ttjson: TTJson;

    static histroy: string[];//将ttjson的历史存起来

    static texturePool: EditorSpritePool = new EditorSpritePool();

    static CreateEditImage(name: string) {
        let editImage = new EditImage();
        editImage.name = name;
        let pic = this.texturePool.GetPicByName(name);
        editImage.data = TTPicData.FromText(this.ttjson.pics[name]);
        editImage.sprite = pic[0];
        editImage.data.data = pic[2].data;
        return editImage;
    }
    //将当前ttjson记录历史
    static async Rec_History() {

    }
    //回到历史位置
    static async Restore_History(pos: number = -1) {

    }
    static async Cmd_SetImg(name: string, data: string) {
        let old = this.ttjson.pics[name];
        if (old != data) {
            this.Rec_History();
            this.ttjson.pics[name] = data;
        }
    }
    static async Cmd_RemoveImg(name: string[]) {
        let start = false;
        for (let i = 0; i < name.length; i++) {
            let old = this.ttjson.pics[name[i]];
            if (old != undefined) {

                if (start == false) {
                    start = true;
                    this.Rec_History();
                }
                delete this.ttjson.pics[name[i]];
            }
        }
    }
    static async Cmd_AddImgsFromFile(imagefile: IOExt_FileHandle[]) {
        let start = false;
        for (var i = 0; i < imagefile.length; i++) {

            var name = imagefile[i].name;

            var fullname = this.GetPathReletiveEditFile(imagefile[i].fullname);

            let usename: string = this.GetUniqueImgName(name);
            if (this.texturePool.HavePic(fullname)) {
                //这张图片已经在texture pool 里面了
                let name = this.texturePool.GetPicName(fullname);
                if (this.ttjson.pics[name] != undefined) {
                    //重复图片，不添加了
                    continue;
                }
                //这张图片已经在texture pool 里面了,但是并没出现在ttjson中，改名添加

                this.texturePool.SetPicNameOnly(usename, fullname);
            }
            else {
                //需要加载图片

                let data = await IOExt.File_ReadBinary(imagefile[i]);

                let blob = new Blob([data]);
                let imgdata = await tt.loaderex.LoadImageDataAsync(URL.createObjectURL(blob));
                let spritedata = new SpriteData();
                spritedata.pivotX = 0;
                spritedata.pivotY = 0;
                spritedata.data = imgdata.data;
                spritedata.format = TextureFormat.RGBA32;
                spritedata.width = imgdata.width;
                spritedata.height = imgdata.height;

                this.texturePool.SetPic(name, fullname, spritedata);
            }

            if (start == false) {
                start = true;
                this.Rec_History();
            }
            Working.ttjson.pics[usename] = fullname;



        }
    }
    static GetUniqueImgName(name: string) {
        //先算个不重复的名字，不一定用，先占着
        //先得出文件名，需要一个图片文件名的cache
        var usename = name//最终使用的图片名称
        let rid = 0;
        while (Working.ttjson.pics[usename] != null) {
            rid++;
            usename = name + "_" + rid;
        }
        return usename;

    }
    static async Save(): Promise<boolean> {
        return await IOExt.File_WriteText(this.editfile, JSON.stringify(this.ttjson, null, 2));
    }
    static async FindFile(filter: string[], depth: number = 3) {
        let result = await FindTool.FindAllFile(this.root, filter, depth);
        return result;
    }
    static async FindFileReletive(path: IOExt_DirectoryHandle, filter: string[], depth: number = 3) {
        let result = await FindTool.FindAllFile(path, filter, depth);
        return result;
    }
    static async GetFileReletive(root: IOExt_DirectoryHandle, path: string): Promise<IOExt_FileHandle> {
        let curpath = TTPathTool.GetFirstPath(path);
        if (curpath == "")
            return this.GetFile(root, path);
        else
            return await this.GetFileReletive(await this.GetSubPath(root, curpath), TTPathTool.RemoveFirstPath(path));
    }
    static async GetFile(path: IOExt_DirectoryHandle, name: string): Promise<IOExt_FileHandle> {
        let list = await IOExt.Directory_List(path);
        for (var i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase() == name.toLowerCase() && list[i].isfile) {
                return list[i] as IOExt_FileHandle;
            }
        }
        return null;
    }
    static async GetSubPath(path: IOExt_DirectoryHandle, name: string): Promise<IOExt_DirectoryHandle> {
        let list = await IOExt.Directory_List(path);
        for (var i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase() == name.toLowerCase() && false == list[i].isfile) {
                return list[i] as IOExt_DirectoryHandle;
            }
        }
        return null;
    }
    static GetPathReletiveEditFile(path: string): string {
        var rootpath = this.editfile.parent.fullname;
        var result = path.replace(rootpath + "/", "");
        return result;
    }
    static async CreateJsonFile(canvas: QUI_Canvas, name: string): Promise<IOExt_FileHandle> {
        let file: IOExt_FileHandle = await this.GetFile(this.root, name);
        if (file != null) {
            Dialog_Message.Show(canvas, "Error CreateJsonFile 01:" + name + " 文件已存在");
            return null;
        }
        let b = await IOExt.File_CreateText(this.root, name, "{}");
        if (!b) {
            Dialog_Message.Show(canvas, "Error CreateJsonFile 02:" + name + " 文件创建失败");
            return null;
        }

        file = await this.GetFile(this.root, name);
        if (file == null) {
            Dialog_Message.Show(canvas, "Error CreateJsonFile 03:" + name + " 文件创建完却没了");
            return null;
        }
        return file;
    }

}