var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    static GetFile(name, path) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield IOExt.Directory_List(this.root);
            for (var i = 0; i < list.length; i++) {
                if (list[i].name.toLowerCase() == name.toLowerCase() && list[i].isfile) {
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
            let file = yield this.GetFile(name, this.root);
            if (file != null) {
                Dialog_Message.Show(canvas, "Error CreateJsonFile 01:" + name + " 文件已存在");
                return null;
            }
            let b = yield IOExt.File_CreateText(this.root, name, "{}");
            if (!b) {
                Dialog_Message.Show(canvas, "Error CreateJsonFile 02:" + name + " 文件创建失败");
                return null;
            }
            file = yield this.GetFile(name, this.root);
            if (file == null) {
                Dialog_Message.Show(canvas, "Error CreateJsonFile 03:" + name + " 文件创建完却没了");
                return null;
            }
            return file;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndvcmtpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxLQUFLLEVBQTJDLE1BQU0sdUJBQXVCLENBQUM7QUFDdkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE1BQU0sT0FBTyxPQUFPO0lBT2hCLE1BQU0sQ0FBTyxRQUFROzZEQUFDLE1BQWdCLEVBQUUsUUFBZ0IsQ0FBQztZQUNyRCxJQUFJLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEUsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBQ0QsTUFBTSxDQUFPLGdCQUFnQjs2REFBQyxJQUEyQixFQUFFLE1BQWdCLEVBQUUsUUFBZ0IsQ0FBQztZQUMxRixJQUFJLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3RCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sT0FBTyxDQUFDLElBQVksRUFBRSxJQUEyQjs7WUFDMUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDckUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFxQixDQUFDO2dCQUN2QyxDQUFDO1lBQ0wsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUNELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFZO1FBQ3ZDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNELE1BQU0sQ0FBTyxjQUFjLENBQUMsTUFBa0IsRUFBRSxJQUFZOztZQUN4RCxJQUFJLElBQUksR0FBcUIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ2YsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsMEJBQTBCLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1lBQ0QsSUFBSSxDQUFDLEdBQUcsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDTCxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSwwQkFBMEIsR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUM7Z0JBQzNFLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFFRCxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ2YsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsMEJBQTBCLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDO2dCQUM3RSxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBRUoifQ==