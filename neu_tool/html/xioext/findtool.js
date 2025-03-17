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
    static FindAllFile(dir, ext, deeplimit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ext.charAt(0) != ".") {
                ext = "." + ext;
            }
            let regex = new RegExp("(" + ext + ")$");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZHRvb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kdG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUEyQyxNQUFNLFlBQVksQ0FBQztBQUU1RSxNQUFNLE9BQU8sUUFBUTtJQUNqQixNQUFNLENBQU8sV0FBVyxDQUFDLEdBQTBCLEVBQUUsR0FBVyxFQUFFLFNBQWlCOztZQUMvRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLENBQUM7WUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3pDLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDakIsSUFBSSxNQUFNLEdBQXVCLEVBQUUsQ0FBQTtZQUNuQyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQU8sZ0JBQWdCLENBQUMsR0FBMEIsRUFBRSxHQUFXLEVBQUUsUUFBNEIsRUFBRSxTQUFpQjs7WUFDbEgsSUFBSSxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3BDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNsQixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBcUIsQ0FBQyxDQUFDO29CQUNoRCxDQUFDO2dCQUVMLENBQUM7cUJBQ0ksQ0FBQztvQkFDRixJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7d0JBQ2xELE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQTBCLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2pHLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFDRCxPQUFPO1FBQ1gsQ0FBQztLQUFBO0NBQ0oifQ==