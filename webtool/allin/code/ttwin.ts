export class ttwin {
    private static g_url: string;
    static async Init(closewithserver: boolean = true): Promise<boolean> {
     

        try {
            let port = this.getExtPort();
            this.g_url = this.getExtUrl(port);
            let r = await this.Info();
            if (!r.succ)
                return false;
            if (closewithserver)
                this.startPingCheck(port);
        }
        catch {
            console.warn("==ttwin Init Fail.");
            return false;
        }

        return true;
    }
    static GetUrl(): string {
        return this.g_url;
    }
    private static getExtPort(): number {
        let searchParams = new URLSearchParams(window.location.search);
        let name = searchParams.get('_localext_');
        if (name == null)
            throw new Error("no localextport has recv.");
        let port = parseInt(name);
        return port;
    }
    private static getExtUrl(port: number) {
        let _localexturl = "http://127.0.0.1:" + port;
        return _localexturl;
    }
    //ping server ,keep alive with server
    private static startPingCheck(port: number) {
        let wsuri = "ws://127.0.0.1:" + port + "/ping";
        console.log("wsurl=" + wsuri);
        var ws = new WebSocket(wsuri,);
        ws.onopen = () => {
            console.warn("websocket in.");
        }
        ws.onerror = () => {
            console.warn("websocket error.");
        }
        ws.onclose = () => {
            console.warn("websocket close.");
            window.close();
        }
        ws.onmessage = (ev) => {
            console.warn("websocket onmessage.");
        };
    }

    static async Quit() {
        var info = await fetch(this.g_url + "/quit");
        var txt = await info.text();
        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined);
        let result = new Result();
        result.succ = succ;
        result.msg = p.msg;
        return result;
    }
    static async Info() {
        var info = await fetch(this.g_url + "/info");
        var txt = await info.text();
        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined && p.tag == "_ttapi_localext");
        let result = new Info();
        result.succ = succ;
        result.msg = p.msg;
        result.tag = p.tag;
        result.info = p.info;
        return result;
    }
    static async SetDebug(debug: boolean) {
        var info = await fetch(this.g_url + "/setdebug?value=" + (debug ? "1" : "0"));
        var txt = await info.text();
        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined);
        let result = new Result();
        result.succ = succ;
        result.msg = p.msg;
        return result;
    }

    static async Path_GetRoots() {
        var info = await fetch(ttwin.GetUrl() + "/fileext/getroots");
        var txt = await info.text();
        var json = JSON.parse(txt);
        let p = new RootPaths();
        p.logic = json.logic;
        p.special.MyDocuments = json.special.MyDocuments as string;
        p.special.MyMusic = json.special.MyMusic as string;
        p.special.MyPictures = json.special.MyPictures as string;
        p.special.MyVideos = json.special.MyVideos as string;
        p.special.HtmlPath = json.special.HtmlPath as string;
        p.special.WorkingPath = json.special.WorkingPath as string;
        return p;
    }
    static async Path_Info(path: string) {
        var info = await fetch(ttwin.GetUrl() + "/fileext/dir_info" + "?path=" + path);
        var txt = await info.text();
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
    }
    static async Path_List(path: string, recursion: boolean = false, pattern: string | null = null) {
        let url = ttwin.GetUrl() + "/fileext/dir_list" + "?path=" + path;
        if (pattern != null) {
            url += "&pattern=" + pattern;
        }
        if (recursion) {
            url += "&recursion=1";
        }
        var info = await fetch(url);
        var txt = await info.text();

        let p = JSON.parse(txt) as PathList;
        return p;
    }
    static async Path_Create(path: string) {
        var info = await fetch(ttwin.GetUrl() + "/fileext/dir_create" + "?path=" + path);
        var txt = await info.text();
        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined);
        let result = new Result();
        result.succ = succ;
        result.msg = p.msg;
        return result;
    }
    static async Path_Delete(path: string) {
        var info = await fetch(ttwin.GetUrl() + "/fileext/dir_delete" + "?path=" + path);
        var txt = await info.text();
        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined);
        let result = new Result();
        result.succ = succ;
        result.msg = p.msg;
        return result;
    }


    static async File_Info(path: string) {
        var info = await fetch(ttwin.GetUrl() + "/fileext/file_info" + "?path=" + path);
        var txt = await info.text();
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
    }
    static async File_Delete(path: string): Promise<Result> {
        var info = await fetch(ttwin.GetUrl() + "/fileext/file_delete" + "?path=" + path);
        var txt = await info.text();
        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined);
        let result = new Result();
        result.succ = succ;
        result.msg = p.msg;
        return result;
    }
    static async File_Copy(frompath: string, topath: string): Promise<Result> {
        var info = await fetch(ttwin.GetUrl() + "/fileext/file_copy" + "?from=" + frompath + "&to=" + topath);
        var txt = await info.text();
        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined);
        let result = new Result();
        result.succ = succ;
        result.msg = p.msg;
        return result;
    }
    static async File_WriteBinary(path: string, body: ArrayBuffer): Promise<Result> {


        var reqop: RequestInit = { "method": "post", "body": body };
        var info = await fetch(ttwin.GetUrl() + "/fileext/file_write" + "?path=" + path, reqop);
        var txt = await info.text();

        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined);
        let result = new Result();
        result.succ = succ;
        result.msg = p.msg;
        return result;
    }
    static async File_WriteText(path: string, body: string): Promise<Result> {


        var reqop: RequestInit = { "method": "post", "body": body };
        var info = await fetch(ttwin.GetUrl() + "/fileext/file_write" + "?path=" + path, reqop);
        var txt = await info.text();

        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined);
        let result = new Result();
        result.succ = succ;
        result.msg = p.msg;
        return result;
    }
    static async File_WriteBlob(path: string, body: Blob): Promise<Result> {
        var formdata = new FormData();
        formdata.append("n1", body, "f1.txt");

        var reqop: RequestInit = { "method": "post", "body": formdata };
        var info = await fetch(ttwin.GetUrl() + "/fileext/file_write" + "?path=" + path, reqop);
        var txt = await info.text();

        let p = JSON.parse(txt)
        let succ = (p.state == "ok" && p.msg == undefined);
        let result = new Result();
        result.succ = succ;
        result.msg = p.msg;
        return result;
    }
    static async File_ReadText(path: string): Promise<ResultReadText> {
        var re = await fetch(ttwin.GetUrl() + "/fileext/file_read" + "?path=" + path + "&format=text");


        var text = await re.text();
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
    }
    static async File_ReadBinary(path: string): Promise<ResultReadBinany> {
        var re = await fetch(ttwin.GetUrl() + "/fileext/file_read" + "?path=" + path + "&format=binary");

        let r = new ResultReadBinany();
        if (re.status == 200) {
            r.succ = true;
            r.data = await re.arrayBuffer();
        }
        else {
            r.succ = false;
            r.msg = JSON.parse(await re.text()).msg;
        }

     


        return r;
    }
}
export class Info {
    succ: boolean = false;
    msg: string | undefined = "";
    tag: string = "";
    info: string = "";
    toString(): string {
        if (this.succ)
            return "succ:" + this.info;
        else
            return "fail:" + this.msg + "," + this.info;
    }
}
export class Result {
    succ: boolean = false;
    msg: string | undefined = "";
    toString(): string {
        if (this.succ)
            return "succ";
        else
            return "fail:" + this.msg;
    }
}
export class ResultReadText {
    text: string | undefined = "";
    succ: boolean = false;
    msg: string | undefined = "";
    toString(): string {
        if (this.succ)
            return "succ:" + this.text;
        else
            return "fail:" + this.msg;
    }
}
export class ResultReadBinany {
    data: ArrayBuffer | undefined = undefined;
    succ: boolean = false;
    msg: string | undefined = "";
    toString(): string {
        if (this.succ)
            return "succ:" + this.data?.byteLength;
        else
            return "fail:" + this.msg;
    }
}
export class PathInfo {
    exists: boolean = false;
    Name: string = "";
    FullName: string = "";
    CreationTime: Date = new Date();
    LastWriteTime: Date = new Date();
    Hidden: boolean = false;
    System: boolean = false;
    ReadOnly: boolean = false;
    toString() {
        if (!this.exists)
            return "not exists.";

        return this.Name + "|" + this.LastWriteTime;
    }
}
export class FileInfo extends PathInfo {

    Length: number = 0;
    toString() {
        if (!this.exists)
            return "not exists.";

        return this.Name + ":" + this.Length + "|" + this.LastWriteTime;
    }
}
export class PathList {
    dirs: string[] = []
    files: string[] = []
}
export class SpecialPath {
    MyDocuments: string = "";
    MyMusic: string = "";
    MyPictures: string = "";
    MyVideos: string = "";
    HtmlPath: string = "";
    WorkingPath: string = "";
}
export class RootPaths {

    logic: string[] = [];
    special: SpecialPath = new SpecialPath();
}