var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tt } from "../ttlayer2/ttlayer2.js";
import { ttwin } from "./ttwin.js";
export class ttwinloader {
    GetPathSplitChar() {
        return "/";
    }
    LoadStringAsync(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield ttwin.File_ReadText(name)).text;
        });
    }
    LoadBinaryAsync(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield ttwin.File_ReadBinary(name)).data);
        });
    }
    LoadImageAsync(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var bytes = ((yield ttwin.File_ReadBinary(name)).data);
            var b = new Blob([bytes]);
            var url = URL.createObjectURL(b);
            return yield tt.loader.LoadImageAsync(url);
        });
    }
    LoadImageDataAsync(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var bytes = ((yield ttwin.File_ReadBinary(name)).data);
            var b = new Blob([bytes]);
            var url = URL.createObjectURL(b);
            return yield tt.loader.LoadImageDataAsync(url);
        });
    }
    LoadCustomFont(name, url) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not support this.");
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHR3aW5sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0dHdpbmxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFDNUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVuQyxNQUFNLE9BQU8sV0FBVztJQUNwQixnQkFBZ0I7UUFDWixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDSyxlQUFlLENBQUMsSUFBWTs7WUFDOUIsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNsRCxDQUFDO0tBQUE7SUFDSyxlQUFlLENBQUMsSUFBWTs7WUFDOUIsT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUFBO0lBQ0ssY0FBYyxDQUFDLElBQVk7O1lBQzdCLElBQUksS0FBSyxHQUFnQixDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsT0FBTyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtJQUNLLGtCQUFrQixDQUFDLElBQVk7O1lBQ2pDLElBQUksS0FBSyxHQUFnQixDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsT0FBTyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0lBQ0ssY0FBYyxDQUFDLElBQVksRUFBRSxHQUFXOztZQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDekMsQ0FBQztLQUFBO0NBRUoifQ==