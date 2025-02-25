var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ttwin {
    static Init() {
        return __awaiter(this, arguments, void 0, function* (closewithserver = true) {
            try {
                let port = this.getExtPort();
                this.g_url = this.getExtUrl(port);
                let r = yield this.Info();
                if (!r.succ)
                    return false;
                if (closewithserver)
                    this.startPingCheck(port);
            }
            catch (_a) {
                console.warn("==ttwin Init Fail.");
                return false;
            }
            return true;
        });
    }
    static GetUrl() {
        return this.g_url;
    }
    static getExtPort() {
        let searchParams = new URLSearchParams(window.location.search);
        let name = searchParams.get('_localext_');
        if (name == null)
            throw new Error("no localextport has recv.");
        let port = parseInt(name);
        return port;
    }
    static getExtUrl(port) {
        let _localexturl = "http://127.0.0.1:" + port;
        return _localexturl;
    }
    //ping server ,keep alive with server
    static startPingCheck(port) {
        let wsuri = "ws://127.0.0.1:" + port + "/ping";
        console.log("wsurl=" + wsuri);
        var ws = new WebSocket(wsuri);
        ws.onopen = () => {
            console.warn("websocket in.");
        };
        ws.onerror = () => {
            console.warn("websocket error.");
        };
        ws.onclose = () => {
            console.warn("websocket close.");
            window.close();
        };
        ws.onmessage = (ev) => {
            console.warn("websocket onmessage.");
        };
    }
    static Quit() {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(this.g_url + "/quit");
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined);
            let result = new Result();
            result.succ = succ;
            result.msg = p.msg;
            return result;
        });
    }
    static Info() {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(this.g_url + "/info");
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined && p.tag == "_ttapi_localext");
            let result = new Info();
            result.succ = succ;
            result.msg = p.msg;
            result.tag = p.tag;
            result.info = p.info;
            return result;
        });
    }
    static SetDebug(debug) {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(this.g_url + "/setdebug?value=" + (debug ? "1" : "0"));
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined);
            let result = new Result();
            result.succ = succ;
            result.msg = p.msg;
            return result;
        });
    }
    static Path_GetRoots() {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(ttwin.GetUrl() + "/fileext/getroots");
            var txt = yield info.text();
            var json = JSON.parse(txt);
            let p = new RootPaths();
            p.logic = json.logic;
            p.special.MyDocuments = json.special.MyDocuments;
            p.special.MyMusic = json.special.MyMusic;
            p.special.MyPictures = json.special.MyPictures;
            p.special.MyVideos = json.special.MyVideos;
            p.special.HtmlPath = json.special.HtmlPath;
            p.special.WorkingPath = json.special.WorkingPath;
            return p;
        });
    }
    static Path_Info(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(ttwin.GetUrl() + "/fileext/dir_info" + "?path=" + path);
            var txt = yield info.text();
            var json = JSON.parse(txt);
            let p = new PathInfo();
            p.exists = json.exists;
            if (p.exists) {
                p.Name = json.Name;
                p.FullName = json.FullName;
                p.CreationTime = new Date(json.CreationTime * 1000);
                p.LastWriteTime = new Date(json.LastWriteTime * 1000);
                p.Hidden = json.Hidden;
                p.System = json.System;
                p.ReadOnly = json.ReadOnly;
            }
            return p;
        });
    }
    static Path_List(path_1) {
        return __awaiter(this, arguments, void 0, function* (path, recursion = false, pattern = null) {
            let url = ttwin.GetUrl() + "/fileext/dir_list" + "?path=" + path;
            if (pattern != null) {
                url += "&pattern=" + pattern;
            }
            if (recursion) {
                url += "&recursion=1";
            }
            var info = yield fetch(url);
            var txt = yield info.text();
            let p = JSON.parse(txt);
            return p;
        });
    }
    static Path_Create(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(ttwin.GetUrl() + "/fileext/dir_create" + "?path=" + path);
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined);
            let result = new Result();
            result.succ = succ;
            result.msg = p.msg;
            return result;
        });
    }
    static Path_Delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(ttwin.GetUrl() + "/fileext/dir_delete" + "?path=" + path);
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined);
            let result = new Result();
            result.succ = succ;
            result.msg = p.msg;
            return result;
        });
    }
    static File_Info(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(ttwin.GetUrl() + "/fileext/file_info" + "?path=" + path);
            var txt = yield info.text();
            var json = JSON.parse(txt);
            let p = new FileInfo();
            p.exists = json.exists;
            if (p.exists) {
                p.Name = json.Name;
                p.FullName = json.FullName;
                p.Length = json.Length;
                p.CreationTime = new Date(json.CreationTime * 1000);
                p.LastWriteTime = new Date(json.LastWriteTime * 1000);
                p.Hidden = json.Hidden;
                p.System = json.System;
                p.ReadOnly = json.ReadOnly;
            }
            return p;
        });
    }
    static File_Delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(ttwin.GetUrl() + "/fileext/file_delete" + "?path=" + path);
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined);
            let result = new Result();
            result.succ = succ;
            result.msg = p.msg;
            return result;
        });
    }
    static File_Copy(frompath, topath) {
        return __awaiter(this, void 0, void 0, function* () {
            var info = yield fetch(ttwin.GetUrl() + "/fileext/file_copy" + "?from=" + frompath + "&to=" + topath);
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined);
            let result = new Result();
            result.succ = succ;
            result.msg = p.msg;
            return result;
        });
    }
    static File_WriteBinary(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var reqop = { "method": "post", "body": body };
            var info = yield fetch(ttwin.GetUrl() + "/fileext/file_write" + "?path=" + path, reqop);
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined);
            let result = new Result();
            result.succ = succ;
            result.msg = p.msg;
            return result;
        });
    }
    static File_WriteText(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var reqop = { "method": "post", "body": body };
            var info = yield fetch(ttwin.GetUrl() + "/fileext/file_write" + "?path=" + path, reqop);
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined);
            let result = new Result();
            result.succ = succ;
            result.msg = p.msg;
            return result;
        });
    }
    static File_WriteBlob(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var formdata = new FormData();
            formdata.append("n1", body, "f1.txt");
            var reqop = { "method": "post", "body": formdata };
            var info = yield fetch(ttwin.GetUrl() + "/fileext/file_write" + "?path=" + path, reqop);
            var txt = yield info.text();
            let p = JSON.parse(txt);
            let succ = (p.state == "ok" && p.msg == undefined);
            let result = new Result();
            result.succ = succ;
            result.msg = p.msg;
            return result;
        });
    }
    static File_ReadText(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var re = yield fetch(ttwin.GetUrl() + "/fileext/file_read" + "?path=" + path + "&format=text");
            var text = yield re.text();
            let r = new ResultReadText();
            if (re.status == 200) {
                r.succ = true;
                r.text = text;
            }
            else {
                r.succ = false;
                r.msg = JSON.parse(text).msg;
            }
            return r;
        });
    }
    static File_ReadBinary(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var re = yield fetch(ttwin.GetUrl() + "/fileext/file_read" + "?path=" + path + "&format=binary");
            let r = new ResultReadBinany();
            if (re.status == 200) {
                r.succ = true;
                r.data = yield re.arrayBuffer();
            }
            else {
                r.succ = false;
                r.msg = JSON.parse(yield re.text()).msg;
            }
            return r;
        });
    }
}
export class Info {
    constructor() {
        this.succ = false;
        this.msg = "";
        this.tag = "";
        this.info = "";
    }
    toString() {
        if (this.succ)
            return "succ:" + this.info;
        else
            return "fail:" + this.msg + "," + this.info;
    }
}
export class Result {
    constructor() {
        this.succ = false;
        this.msg = "";
    }
    toString() {
        if (this.succ)
            return "succ";
        else
            return "fail:" + this.msg;
    }
}
export class ResultReadText {
    constructor() {
        this.text = "";
        this.succ = false;
        this.msg = "";
    }
    toString() {
        if (this.succ)
            return "succ:" + this.text;
        else
            return "fail:" + this.msg;
    }
}
export class ResultReadBinany {
    constructor() {
        this.data = undefined;
        this.succ = false;
        this.msg = "";
    }
    toString() {
        var _a;
        if (this.succ)
            return "succ:" + ((_a = this.data) === null || _a === void 0 ? void 0 : _a.byteLength);
        else
            return "fail:" + this.msg;
    }
}
export class PathInfo {
    constructor() {
        this.exists = false;
        this.Name = "";
        this.FullName = "";
        this.CreationTime = new Date();
        this.LastWriteTime = new Date();
        this.Hidden = false;
        this.System = false;
        this.ReadOnly = false;
    }
    toString() {
        if (!this.exists)
            return "not exists.";
        return this.Name + "|" + this.LastWriteTime;
    }
}
export class FileInfo extends PathInfo {
    constructor() {
        super(...arguments);
        this.Length = 0;
    }
    toString() {
        if (!this.exists)
            return "not exists.";
        return this.Name + ":" + this.Length + "|" + this.LastWriteTime;
    }
}
export class PathList {
    constructor() {
        this.dirs = [];
        this.files = [];
    }
}
export class SpecialPath {
    constructor() {
        this.MyDocuments = "";
        this.MyMusic = "";
        this.MyPictures = "";
        this.MyVideos = "";
        this.HtmlPath = "";
        this.WorkingPath = "";
    }
}
export class RootPaths {
    constructor() {
        this.logic = [];
        this.special = new SpecialPath();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHR3aW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0dHdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLE9BQU8sS0FBSztJQUVkLE1BQU0sQ0FBTyxJQUFJOzZEQUFDLGtCQUEyQixJQUFJO1lBRzdDLElBQUksQ0FBQztnQkFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFDUCxPQUFPLEtBQUssQ0FBQztnQkFDakIsSUFBSSxlQUFlO29CQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQztZQUNELFdBQU0sQ0FBQztnQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ25DLE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFDRCxNQUFNLENBQUMsTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ08sTUFBTSxDQUFDLFVBQVU7UUFDckIsSUFBSSxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFDLElBQUksSUFBSSxJQUFJLElBQUk7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDakQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FB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