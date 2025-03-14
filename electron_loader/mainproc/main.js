var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { app, BrowserWindow, globalShortcut } from "electron";
import * as path from "path";
import * as fs from "fs";
import { GetRootPath, MainWinConfig, RegEvent, SetMainWinConfig, StartLocalWin } from "./event.js";
class Config extends MainWinConfig {
}
function ParseConfig(json) {
    let config = JSON.parse(json);
    if (config.sync == undefined)
        config.sync = false;
    //MainWinConfig
    if (config.devtool == undefined)
        config.devtool = false;
    if (config.fullscreen == undefined)
        config.fullscreen = false;
    if (config.noborder == undefined)
        config.noborder = false;
    if (config.width == undefined)
        config.width = 800;
    if (config.height == undefined)
        config.height = 600;
    return config;
}
//electron 启动程序
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield app.whenReady();
        console.log("electron start.");
        //注册事件
        RegEvent();
        //加载配置
        let curpath = GetRootPath(); //资源路径
        let cfgpath = path.join(curpath, "data/config.json");
        let config;
        let succload = false;
        try {
            let configstr = fs.readFileSync(cfgpath, { encoding: "utf-8" });
            config = ParseConfig(configstr);
            succload = true;
        }
        catch (_a) {
            console.log("config wrong.");
            let curpathm = import.meta.dirname; //模块路径
            let win = new BrowserWindow({
                width: 800, height: 600, webPreferences: {
                    preload: path.join(curpathm, "preload.js"),
                    nodeIntegration: true
                },
                frame: true,
                roundedCorners: false,
                autoHideMenuBar: true,
            });
            //win.webContents.openDevTools();
            win.loadFile("winerror/index.html");
            return;
        }
        if (succload) {
            SetMainWinConfig(config);
            //打开业务窗口
            if (config.sync == false) {
                console.log("config_sync==false direct open url");
                if ((config.openurl.indexOf("file://") == 0) ||
                    (config.openurl.indexOf("http://") == 0) ||
                    (config.openurl.indexOf("https://") == 0)) {
                }
                else {
                    config.openurl = "file://" + path.join(curpath, config.openurl);
                }
                StartLocalWin(config.openurl);
            }
            else {
                //先通过loading窗口
                //启动窗口
                let curpathm = import.meta.dirname; //模块路径
                let win = new BrowserWindow({
                    width: 800, height: 600, webPreferences: {
                        preload: path.join(curpathm, "preload.js"),
                        nodeIntegration: true
                    },
                    frame: false,
                    roundedCorners: false,
                });
                //win.webContents.openDevTools();
                win.loadFile("winloading/index.html", { query: { "syncurl": config.syncurl } });
                //loading win 下载资源后 通过 StartLocalWin 启动
            }
        }
        //通过全局快捷键可以屏蔽掉窗口快捷键
        let bindkey = ["ctrl+r", "ctrl+shift+i"];
        for (var i = 0; i < bindkey.length; i++) {
            let key = bindkey[i];
            globalShortcut.register(key, () => {
                console.log(key);
            });
        }
        app.on("window-all-closed", () => {
            app.exit();
        });
    });
}
Main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlELE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQzVCLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkcsTUFBTSxNQUFPLFNBQVEsYUFBYTtDQUlqQztBQUNELFNBQVMsV0FBVyxDQUFDLElBQVk7SUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQVcsQ0FBQztJQUN4QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksU0FBUztRQUN4QixNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUN4QixlQUFlO0lBQ2YsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLFNBQVM7UUFDM0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDM0IsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLFNBQVM7UUFDOUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDOUIsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLFNBQVM7UUFDNUIsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDNUIsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLFNBQVM7UUFDekIsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDdkIsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVM7UUFDMUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDeEIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FB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