var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TTPathTool } from "../../ttlayer2/utils/path/pathtool.js";
import { FindTool } from "../../xioext/findtool.js";
import { IOExt } from "../../xioext/ioext.js";
import { Dialog_Message } from "../ui/dialog_message.js";
export class Working {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndvcmtpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsS0FBSyxFQUEyQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUd6RCxNQUFNLE9BQU8sT0FBTztJQVFoQixNQUFNLENBQU8sUUFBUTs2REFBQyxNQUFnQixFQUFFLFFBQWdCLENBQUM7WUFDckQsSUFBSSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUNELE1BQU0sQ0FBTyxnQkFBZ0I7NkRBQUMsSUFBMkIsRUFBRSxNQUFnQixFQUFFLFFBQWdCLENBQUM7WUFDMUYsSUFBSSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBQ0QsTUFBTSxDQUFPLGVBQWUsQ0FBQyxJQUEyQixFQUFFLElBQVk7O1lBQ2xFLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxPQUFPLElBQUksRUFBRTtnQkFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztnQkFFaEMsT0FBTyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElB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