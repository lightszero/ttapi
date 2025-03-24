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
    static CreateJsonFile(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let file = this.GetFile(name, this.root);
            if (file != null)
                throw "Error CreateJsonFile 01:" + name;
            let b = yield IOExt.File_CreateText(this.root, name, "{}");
            if (!b)
                throw "Error CreateJsonFile 02:" + name;
            file = this.GetFile(name, this.root);
            if (file == null)
                throw "Error CreateJsonFile 02:" + name;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2luZ2Rpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndvcmtpbmdkaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxLQUFLLEVBQTJDLE1BQU0sdUJBQXVCLENBQUM7QUFFdkYsTUFBTSxPQUFPLFVBQVU7SUFLbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUEyQjtRQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxDQUFPLFFBQVE7NkRBQUMsTUFBZ0IsRUFBRSxRQUFnQixDQUFDO1lBQ3JELElBQUksTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRSxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sT0FBTyxDQUFDLElBQVksRUFBRSxJQUEyQjs7WUFDMUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDckUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFxQixDQUFDO2dCQUN2QyxDQUFDO1lBQ0wsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUNELE1BQU0sQ0FBTyxjQUFjLENBQUMsSUFBWTs7WUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksSUFBSSxJQUFJLElBQUk7Z0JBQ1osTUFBTSwwQkFBMEIsR0FBRyxJQUFJLENBQUM7WUFDNUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxDQUFDO2dCQUNGLE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxDQUFDO1lBQzVDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxJQUFJLElBQUksSUFBSTtnQkFDWixNQUFNLDBCQUEwQixHQUFHLElBQUksQ0FBQztZQUM1QyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQTBCO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFDRCxNQUFNLENBQUMsV0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0NBQ0oifQ==