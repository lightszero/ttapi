var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { app, BrowserWindow } from "electron";
import * as evt from "./event.js";
import * as path from "path";
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield app.whenReady();
        console.log("electron start.");
        let curpath = path.resolve("./");
        console.log("dirname:" + curpath);
        evt.RegEvent();
        //启动窗口
        let win = new BrowserWindow({
            width: 800, height: 600, webPreferences: {
                preload: path.join(curpath, "mainproc/preload.js"),
                nodeIntegration: true
            }
        });
        win.webContents.openDevTools();
        win.loadFile("winmain/index.html");
    });
}
Main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxLQUFLLEdBQUcsTUFBTSxZQUFZLENBQUE7QUFDakMsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUE7QUFFNUIsU0FBZSxJQUFJOztRQUNmLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUdmLE1BQU07UUFDTixJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQWEsQ0FBQztZQUN4QixLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUN2QztnQkFDSSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUM7Z0JBQ2hELGVBQWUsRUFBRSxJQUFJO2FBQzFCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUUvQixHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUFBO0FBQ0QsSUFBSSxFQUFFLENBQUMifQ==