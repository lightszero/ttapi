import {app,BrowserWindow} from "electron";
import * as evt from "./event.js"
import * as path from "path"

async function Main() {
    await app.whenReady();
    console.log("electron start.");
    let curpath = path.resolve("./");
    console.log("dirname:" + curpath);
    evt.RegEvent();


    //启动窗口
    let win = new BrowserWindow({
        width: 800, height: 600, webPreferences:
        {
            preload: path.join(curpath, "mainproc/preload.js")
            , nodeIntegration: true
        }
    });

    win.webContents.openDevTools();

    win.loadFile("winmain/index.html");
}
Main();
