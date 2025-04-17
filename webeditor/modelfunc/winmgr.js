var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function NextFrame() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            requestAnimationFrame(() => {
                resolve();
            });
        });
    });
}
export function GetWinTag() {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = window["__tag__"];
        if (tag == undefined)
            yield NextFrame();
        return window["__tag__"];
    });
}
export function GetWinMgr() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield GetWinTag()) == "mainwin") {
            return window["__winmgr__"];
        }
        else {
            return window.top["__winmgr__"];
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lubWdyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2lubWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE1BQU0sVUFBZ0IsU0FBUzs7UUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FBQTtBQUNELE1BQU0sVUFBZ0IsU0FBUzs7UUFDM0IsSUFBSSxHQUFHLEdBQUksTUFBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksR0FBRyxJQUFJLFNBQVM7WUFDaEIsTUFBTSxTQUFTLEVBQUUsQ0FBQztRQUN0QixPQUFRLE1BQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQUE7QUFDRCxNQUFNLFVBQWdCLFNBQVM7O1FBQzNCLElBQUksQ0FBQSxNQUFNLFNBQVMsRUFBRSxLQUFJLFNBQVMsRUFBRSxDQUFDO1lBQ2pDLE9BQVEsTUFBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7YUFDSSxDQUFDO1lBQ0YsT0FBUSxNQUFNLENBQUMsR0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0NBQUEifQ==