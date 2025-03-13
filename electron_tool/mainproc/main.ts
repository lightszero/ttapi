import { app, BrowserWindow, globalShortcut } from "electron";
import * as path from "path"
import * as fs from "fs";
import { GetRootPath, RegEvent, StartLocalWin } from "./event.js";

class Config {
    sync: boolean;
    syncurl: string;
    openurl: string;
    devtool: false;
    fullscreen: false;
    width: number;
    height: number;

}
function ParseConfig(json: string): Config {
    let config = JSON.parse(json) as Config;
    if (config.sync == undefined)
        config.sync = false;
    if (config.fullscreen == undefined)
        config.fullscreen = false;
    if (config.width == undefined)
        config.width = 800;
    if (config.height == undefined)
        config.height = 600;
    return config;
}
//electron 启动程序
async function Main() {
    await app.whenReady();
    console.log("electron start.");

    //注册事件
    RegEvent();

    //加载配置
    let curpath = GetRootPath();//资源路径
    let configstr = fs.readFileSync(path.join(curpath, "data/config.json"), { encoding: "utf-8" });
    let config = ParseConfig(configstr);



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
            width: 800, height: 600, webPreferences:
            {
                preload: path.join(curpathm, "preload.js")
                , nodeIntegration: true
            }
        });

        win.webContents.openDevTools();

        win.loadFile("winloading/index.html", { query: { "syncurl": config.syncurl } });
        //loading win 下载资源后 通过 StartLocalWin 启动
    }

    //通过全局快捷键可以屏蔽掉窗口快捷键
    let bindkey: string[] = ["ctrl+r", "ctrl+shift+i"]
    for (var i = 0; i < bindkey.length; i++) {
        let key = bindkey[i];
        globalShortcut.register(key, () => {
            console.log(key);
        });
    }


    app.on("window-all-closed", () => {
        app.exit();
    })
}
Main();
