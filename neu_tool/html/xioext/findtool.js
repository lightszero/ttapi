var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { IOExt } from "./ioext.js";
export class FindTool {
    static FindAllFile(dir, exts, deeplimit) {
        return __awaiter(this, void 0, void 0, function* () {
            let regstr = "";
            for (var i = 0; i < exts.length; i++) {
                let ext = exts[i];
                if (ext.charAt(0) != ".") {
                    ext = "." + ext;
                }
                if (i > 0)
                    regstr += "|";
                regstr = regstr + "((" + ext + ")$)";
            }
            let regex = new RegExp(regstr);
            regex.ignoreCase;
            let result = [];
            yield this.FindAllFile_Deep(dir, regex, result, 2);
            return result;
        });
    }
    static FindAllFile_Deep(dir, ext, filelist, deeplimit) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = yield IOExt.Directory_List(dir);
            for (var i = 0; i < files.length; i++) {
                if (files[i].isfile) {
                    if (ext.test(files[i].name)) {
                        filelist.push(files[i]);
                    }
                }
                else {
                    if (deeplimit > 1 && files[i].name.charAt(0) != ".") {
                        yield this.FindAllFile_Deep(files[i], ext, filelist, deeplimit - 1);
                    }
                }
            }
            return;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZHRvb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kdG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUEyQyxNQUFNLFlBQVksQ0FBQztBQUU1RSxNQUFNLE9BQU8sUUFBUTtJQUNqQixNQUFNLENBQU8sV0FBVyxDQUFDLEdBQTBCLEVBQUUsSUFBYyxFQUFFLFNBQWlCOztZQUNsRixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQ3BCLENBQUM7Z0JBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDTCxNQUFNLElBQUksR0FBRyxDQUFDO2dCQUVsQixNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ3pDLENBQUM7WUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ2pCLElBQUksTUFBTSxHQUF1QixFQUFFLENBQUE7WUFDbkMsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBQ0QsTUFBTSxDQUFPLGdCQUFnQixDQUFDLEdBQTBCLEVBQUUsR0FBVyxFQUFFLFFBQTRCLEVBQUUsU0FBaUI7O1lBQ2xILElBQUksS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNwQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUMxQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQXFCLENBQUMsQ0FBQztvQkFDaEQsQ0FBQztnQkFFTCxDQUFDO3FCQUNJLENBQUM7b0JBQ0YsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO3dCQUNsRCxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUEwQixFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNqRyxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ0QsT0FBTztRQUNYLENBQUM7S0FBQTtDQUNKIn0=