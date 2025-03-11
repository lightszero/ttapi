import * as electron from "electron";
import * as evt from "./evt.js"
import * as path from "path"

async function Main() {
    await electron.app.whenReady();
    console.log("electron start.");
    let curpath = path.resolve("./");
    console.log("dirname:" + curpath);
    evt.RegEvent();

    let win = new electron.BrowserWindow({
        width: 800, height: 600, webPreferences:
        {
            preload: path.join(curpath, "preload/winpreload.js")
            , nodeIntegration: true
        }
    });

    win.webContents.openDevTools();

    win.loadFile("winmain/index.html");
}
Main();
