var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ElectronFunc } from "./electronfunc.js";
import * as SHA256 from "./sha256.js";
import * as Conv from "./convtool.js";
function getQueryVariable(variable) {
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
}
class IndexFileInfo {
}
function GetDirName(path) {
    let i = path.lastIndexOf("/");
    return path.substring(0, i);
}
function LoadIndex(url) {
    return __awaiter(this, void 0, void 0, function* () {
        var rb = yield fetch(url);
        let index = yield rb.text();
        let json = JSON.parse(index);
        let info = new LoadInfo();
        info.indexs = json;
        info.baseurl = GetDirName(url);
        return info;
    });
}
function DownFile(file, baseurl, targetpath) {
    return __awaiter(this, void 0, void 0, function* () {
        //Hash 都没对上，先不管了。
        var rb = yield fetch(baseurl + "/" + file.file);
        var bin = yield rb.arrayBuffer();
        var hash = SHA256.hash(new Uint8Array(bin));
        var hashstr = Conv.bytes2hexstr(hash);
        console.log("down hash =" + hashstr + " len=" + bin.byteLength);
        console.log("get hash =" + file.hash + " len=" + file.size);
        if (file.size != bin.byteLength)
            throw "error size:" + file.file;
        if (hashstr != file.hash)
            throw "error hash:" + file.file;
        var outfilename = file.file;
        if (outfilename.indexOf(".html_")) {
            outfilename = outfilename.replace(".html_", ".html");
        }
        console.log("downfile:" + file.file);
        var r = yield ElectronFunc.Instance.file_writebin(targetpath + "/" + outfilename, bin);
        return r;
    });
}
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    AddLine("同步窗口");
    let syncurl = getQueryVariable("syncurl");
    AddLine("url=" + syncurl);
    let downpath = yield ElectronFunc.Instance.path_getcurrent();
    downpath += "/downhtml";
    let index = yield LoadIndex(syncurl);
    AddLine("Find File:" + index.indexs.length);
    for (var i = 0; i < index.indexs.length; i++) {
        let r = yield DownFile(index.indexs[i], index.baseurl, downpath);
        AddLine("down file:" + r);
    }
    AddLine("下载完毕");
    yield ElectronFunc.Instance.window_open("downhtml/index.html");
    window.close();
});
function AddLine(txt) {
    let label = document.createElement("span");
    label.textContent = txt;
    document.body.appendChild(label);
    let br = document.createElement("br");
    document.body.appendChild(br);
}
