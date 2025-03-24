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
import { MessageDialog } from "../ui/messagedialog.js";
export class WorkingDir {
    static Open(root) {
        this.root = root;
    }
    static FindFile(filter_1) {
        return __awaiter(this, arguments, void 0, function* (filter, depth = 3) {
            let result = yield FindTool.FindAllFile(this.root, filter, depth);
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
    static CreateJsonFile(canvas, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let file = yield this.GetFile(name, this.root);
            if (file != null) {
                MessageDialog.Show(canvas, "Error CreateJsonFile 01:" + name + " 文件已存在");
                return null;
            }
            let b = yield IOExt.File_CreateText(this.root, name, "{}");
            if (!b) {
                MessageDialog.Show(canvas, "Error CreateJsonFile 02:" + name + " 文件创建失败");
                return null;
            }
            file = yield this.GetFile(name, this.root);
            if (file == null) {
                MessageDialog.Show(canvas, "Error CreateJsonFile 03:" + name + " 文件创建完却没了");
                return null;
            }
            return file;
        });
    }
    static SetEditFile(editfile) {
        this.editfile = editfile;
    }
    static GetEditFile() {
        return this.editfile;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2luZ2Rpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndvcmtpbmdkaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxLQUFLLEVBQTJDLE1BQU0sdUJBQXVCLENBQUM7QUFDdkYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE1BQU0sT0FBTyxVQUFVO0lBS25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBMkI7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNELE1BQU0sQ0FBTyxRQUFROzZEQUFDLE1BQWdCLEVBQUUsUUFBZ0IsQ0FBQztZQUNyRCxJQUFJLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEUsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBQ0QsTUFBTSxDQUFPLE9BQU8sQ0FBQyxJQUFZLEVBQUUsSUFBMkI7O1lBQzFELElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3JFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBcUIsQ0FBQztnQkFDdkMsQ0FBQztZQUNMLENBQUM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sY0FBYyxDQUFDLE1BQWtCLEVBQUUsSUFBWTs7WUFDeEQsSUFBSSxJQUFJLEdBQXFCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNmLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLDBCQUEwQixHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQztnQkFDekUsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUNELElBQUksQ0FBQyxHQUFHLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ0wsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsMEJBQTBCLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1lBRUQsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNmLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLDBCQUEwQixHQUFHLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQztnQkFDNUUsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUNELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBMEI7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUNELE1BQU0sQ0FBQyxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Q0FDSiJ9