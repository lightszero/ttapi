var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tt } from "../ttapi/ttapi.js";
import { ElectronFunc } from "./electronfunc";
export class ElectronLoader {
    GetPathSplitChar() {
        return "/";
    }
    LoadStringAsync(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ElectronFunc.Instance.file_readtext(name);
        });
    }
    LoadBinaryAsync(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let bin = yield ElectronFunc.Instance.file_readbin(name);
            return bin;
        });
    }
    LoadImageAsync(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let bin = yield ElectronFunc.Instance.file_readbin(name);
            let blob = new Blob([bin]);
            let burl = URL.createObjectURL(blob);
            return yield tt.loader.LoadImageAsync(name);
        });
    }
    LoadImageDataAsync(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let bin = yield ElectronFunc.Instance.file_readbin(name);
            let blob = new Blob([bin]);
            let burl = URL.createObjectURL(blob);
            return yield tt.loader.LoadImageDataAsync(name);
        });
    }
    LoadCustomFont(name, url) {
        return __awaiter(this, void 0, void 0, function* () {
            let bin = yield ElectronFunc.Instance.file_readbin(name);
            let blob = new Blob([bin]);
            let burl = URL.createObjectURL(blob);
            return yield tt.loader.LoadCustomFont(name, url);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb25sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbGVjdHJvbmxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE1BQU0sT0FBTyxjQUFjO0lBQ3ZCLGdCQUFnQjtRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNLLGVBQWUsQ0FBQyxJQUFZOztZQUM5QixPQUFPLE1BQU0sWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsQ0FBQztLQUFBO0lBQ0ssZUFBZSxDQUFDLElBQVk7O1lBQzlCLElBQUksR0FBRyxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO0tBQUE7SUFDSyxjQUFjLENBQUMsSUFBWTs7WUFDN0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwQyxPQUFPLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBQ0ssa0JBQWtCLENBQUMsSUFBWTs7WUFDakMsSUFBSSxHQUFHLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwQyxPQUFPLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBQUE7SUFDSyxjQUFjLENBQUMsSUFBWSxFQUFFLEdBQVc7O1lBQzFDLElBQUksR0FBRyxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsT0FBTyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQUE7Q0FDSiJ9