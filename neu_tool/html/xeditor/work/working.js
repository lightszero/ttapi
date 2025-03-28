var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SpriteData, TextureFormat, tt, TTPicData } from "../../ttlayer2/ttlayer2.js";
import { TTPathTool } from "../../ttlayer2/utils/path/pathtool.js";
import { FindTool } from "../../xioext/findtool.js";
import { IOExt } from "../../xioext/ioext.js";
import { Dialog_Message } from "../ui/dialog_message.js";
import { EditorSpritePool } from "./spritepool.js";
export class EditImage {
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
    static CreateEditImage(name) {
        let editImage = new EditImage();
        editImage.name = name;
        let pic = this.texturePool.GetPicByName(name);
        editImage.data = TTPicData.FromText(this.ttjson.pics[name]);
        editImage.sprite = pic[0];
        editImage.data.data = pic[2].data;
        return editImage;
    }
    //将当前ttjson记录历史
    static Rec_History() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //回到历史位置
    static Restore_History() {
        return __awaiter(this, arguments, void 0, function* (pos = -1) {
        });
    }
    static Cmd_SetImg(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let old = this.ttjson.pics[name];
            if (old != data) {
                this.Rec_History();
                this.ttjson.pics[name] = data;
            }
        });
    }
    static Cmd_RemoveImg(name) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    static Cmd_AddImgsFromFile(imagefile) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = false;
            for (var i = 0; i < imagefile.length; i++) {
                var name = imagefile[i].name;
                var fullname = this.GetPathReletiveEditFile(imagefile[i].fullname);
                let usename = this.GetUniqueImgName(name);
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
                    let data = yield IOExt.File_ReadBinary(imagefile[i]);
                    let blob = new Blob([data]);
                    let imgdata = yield tt.loaderex.LoadImageDataAsync(URL.createObjectURL(blob));
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
        });
    }
    static GetUniqueImgName(name) {
        //先算个不重复的名字，不一定用，先占着
        //先得出文件名，需要一个图片文件名的cache
        var usename = name; //最终使用的图片名称
        let rid = 0;
        while (Working.ttjson.pics[usename] != null) {
            rid++;
            usename = name + "_" + rid;
        }
        return usename;
    }
    static Save() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield IOExt.File_WriteText(this.editfile, JSON.stringify(this.ttjson, null, 2));
        });
    }
    static FindFile(filter_1) {
        return __awaiter(this, arguments, void 0, function* (filter, depth = 3) {
            let result = yield FindTool.FindAllFile(this.root, filter, depth);
            return result;
        });
    }
    static FindFileReletive(path_1, filter_1) {
        return __awaiter(this, arguments, void 0, function* (path, filter, depth = 3) {
            let result = yield FindTool.FindAllFile(path, filter, depth);
            return result;
        });
    }
    static GetFileReletive(root, path) {
        return __awaiter(this, void 0, void 0, function* () {
            let curpath = TTPathTool.GetFirstPath(path);
            if (curpath == "")
                return this.GetFile(root, path);
            else
                return yield this.GetFileReletive(yield this.GetSubPath(root, curpath), TTPathTool.RemoveFirstPath(path));
        });
    }
    static GetFile(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield IOExt.Directory_List(path);
            for (var i = 0; i < list.length; i++) {
                if (list[i].name.toLowerCase() == name.toLowerCase() && list[i].isfile) {
                    return list[i];
                }
            }
            return null;
        });
    }
    static GetSubPath(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield IOExt.Directory_List(path);
            for (var i = 0; i < list.length; i++) {
                if (list[i].name.toLowerCase() == name.toLowerCase() && false == list[i].isfile) {
                    return list[i];
                }
            }
            return null;
        });
    }
    static GetPathReletiveEditFile(path) {
        var rootpath = this.editfile.parent.fullname;
        var result = path.replace(rootpath + "/", "");
        return result;
    }
    static CreateJsonFile(canvas, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let file = yield this.GetFile(this.root, name);
            if (file != null) {
                Dialog_Message.Show(canvas, "Error CreateJsonFile 01:" + name + " 文件已存在");
                return null;
            }
            let b = yield IOExt.File_CreateText(this.root, name, "{}");
            if (!b) {
                Dialog_Message.Show(canvas, "Error CreateJsonFile 02:" + name + " 文件创建失败");
                return null;
            }
            file = yield this.GetFile(this.root, name);
            if (file == null) {
                Dialog_Message.Show(canvas, "Error CreateJsonFile 03:" + name + " 文件创建完却没了");
                return null;
            }
            return file;
        });
    }
}
Working.texturePool = new EditorSpritePool();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndvcmtpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFzQixVQUFVLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBcUIsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsS0FBSyxFQUEyQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUduRCxNQUFNLE9BQU8sU0FBUztJQUlsQix3QkFBd0I7SUFDeEIsTUFBTTtJQUNOLEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixHQUFHLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3RCxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFdkMsQ0FBQztDQUNKO0FBQ0QsTUFBTSxPQUFPLE9BQU87SUFVaEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFZO1FBQy9CLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7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