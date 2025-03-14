import { ElectronFunc } from "./electronfunc.js";
import * as SHA256 from "./sha256.js"
import * as Conv from "./convtool.js"
function getQueryVariable(variable: string) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}
class LoadInfo {
    baseurl: string;
    indexs: IndexFileInfo[]
}
class IndexFileInfo {
    file: string;
    hash: string;
    size: number;
}
function GetDirName(path: string): string {
    let i = path.lastIndexOf("/");
    return path.substring(0, i);
}
async function LoadIndex(url: string) {
    var rb = await fetch(url);
    let index = await rb.text();
    let json = JSON.parse(index) as IndexFileInfo[];
    let info = new LoadInfo();
    info.indexs = json;
    info.baseurl = GetDirName(url);
    return info;
}

async function DownFile(file: IndexFileInfo, baseurl: string, targetpath: string) {
    //Hash 都没对上，先不管了。
    var rb = await fetch(baseurl + "/" + file.file)
    var bin = await rb.arrayBuffer();
    var hash = SHA256.hash(new Uint8Array(bin));
    var hashstr = Conv.bytes2hexstr(hash);
    console.log("down hash =" + hashstr + " len=" + bin.byteLength);
    console.log("get hash =" + file.hash + " len=" + file.size);
    if(file.size!=bin.byteLength)
        throw "error size:"+file.file;
    if(hashstr!=file.hash)
        throw "error hash:"+file.file;
    
    var outfilename = file.file;
    if (outfilename.indexOf(".html_")) {
        outfilename = outfilename.replace(".html_", ".html");
    }
    console.log("downfile:" + file.file);
    var r = await ElectronFunc.Instance.file_writebin(targetpath + "/" + outfilename, bin);
    return r;
}
window.onload = async () => {
    AddLine("同步窗口");
    let syncurl = getQueryVariable("syncurl");
    AddLine("url=" + syncurl);

    let downpath = await ElectronFunc.Instance.path_getcurrent();
    downpath += "/downhtml";
    let index = await LoadIndex(syncurl);
    AddLine("Find File:" + index.indexs.length);
    for (var i = 0; i < index.indexs.length; i++) {
        let r = await DownFile(index.indexs[i], index.baseurl, downpath);
        AddLine("down file:" + r);
    }
    AddLine("下载完毕");
    await ElectronFunc.Instance.window_open("downhtml/index.html");
    window.close();

}
function AddLine(txt: string) {
    let label = document.createElement("span");
    label.textContent = txt;
    document.body.appendChild(label)
    let br = document.createElement("br");
    document.body.appendChild(br);
}
