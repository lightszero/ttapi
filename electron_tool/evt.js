var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
///<reference path="node_modules/electron/electron.d.ts"/>
import * as electron from "electron";
function rpc_msgbox(evt, title, message) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("callm1d");
        let win = electron.BrowserWindow.getFocusedWindow();
        yield electron.dialog.showMessageBox(win, { title: title, message: message });
        return 1;
    });
}
function rpc_openfile(evt, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        let win = electron.BrowserWindow.getFocusedWindow();
        var d = yield electron.dialog.showOpenDialog(win, { "filters": filters, });
        return d.filePaths;
    });
}
export function RegEvent() {
    electron.ipcMain.handle("msgbox", (evt, args) => {
        console.log("recv evt.");
        let win = electron.BrowserWindow.getFocusedWindow();
        let txt_t = args[0];
        let msg = args[1];
        electron.dialog.showMessageBox(win, { title: txt_t, message: msg });
    });
    electron.ipcMain.handle("rpc_msgbox", rpc_msgbox);
    electron.ipcMain.handle("rpc_openfile", rpc_openfile);
    console.log("reg event ok.");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDBEQUEwRDtBQUMxRCxPQUFPLEtBQUssUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUdyQyxTQUFlLFVBQVUsQ0FBQyxHQUFnQyxFQUFFLEtBQWEsRUFBRSxPQUFlOztRQUN0RixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUVwRCxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFlLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDeEYsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0NBQUE7QUFDRCxTQUFlLFlBQVksQ0FBQyxHQUFnQyxFQUFFLE9BQThCOztRQUN4RixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFcEQsSUFBSSxDQUFDLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMzRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkIsQ0FBQztDQUFBO0FBQ0QsTUFBTSxVQUFVLFFBQVE7SUFDcEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3BELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQVcsQ0FBQztRQUM5QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFXLENBQUM7UUFDNUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQWUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNsRixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsRCxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNqQyxDQUFDIn0=