var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
///<reference  path="../js/filesystem.d.ts" />
///<reference  path="../js/neutralino.d.ts" />
//封装来自web的 filesystem api
//和来自 Neutralino 的 本地 api
//这样就可以用一套系统
//web filesystem 需要放弃一些能力，比如stat，比如打开一个文件，然后往上得到目录
export class IOExt {
    static Init() {
        try {
            Neutralino.init();
            this._envWeb = false;
            this.Log("Neutralino env Init.");
            Neutralino.events.on("windowClose", () => {
                Neutralino.app.exit();
            });
        }
        catch (e) {
            this.Log("error:" + e);
            this._envWeb = true;
            this.Log("Web env Init.");
        }
    }
    static IsWebEnv() {
        return this._envWeb;
    }
    static Log(text, type = IOExt_LoggerType.INFO) {
        if (!this._envWeb) {
            if (type == IOExt_LoggerType.INFO)
                Neutralino.debug.log("[IOExt]==>" + text, "INFO");
            else if (type == IOExt_LoggerType.WARNING)
                Neutralino.debug.log("[IOExt]==>" + text, "WARNING");
            else
                Neutralino.debug.log("[IOExt]==>" + text, "ERROR");
        }
        if (type == IOExt_LoggerType.INFO)
            console.log("[IOExt]==>" + text);
        else if (type == IOExt_LoggerType.WARNING)
            console.warn("[IOExt]==>" + text);
        else
            console.error("[IOExt]==>" + text);
    }
    //三个对话框，首推pickFolder
    static Picker_OpenFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let op = {
                    "types": [{ "description": "tt.json", "accept": { "tt.json": "tt.json" } }]
                };
                let r = yield window.showOpenFilePicker();
                if (r == null)
                    return null;
                //fileHandle
                return new IOExt_FileHandle(r[0]);
            }
            else {
                let op = {
                    filters: [{ name: "tt.json", extensions: ["tt.json"] }]
                };
                let r = yield Neutralino.os.showOpenDialog("open file dialog.", op);
                if (r == null || r.length == 0)
                    return null;
                //string 
                return new IOExt_FileHandle(r[0]);
            }
        });
    }
    static Picker_SaveFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let op = {
                    "types": [{ "description": "tt.json", "accept": { "tt.json": "tt.json" } }]
                };
                let r = yield window.showSaveFilePicker();
                if (r == null)
                    return null;
                //fileHandle
                return new IOExt_FileHandle(r);
            }
            else {
                let op = {
                    filters: [{ name: "tt.json", extensions: ["tt.json"] }]
                };
                let r = yield Neutralino.os.showSaveDialog("open file dialog.", op);
                if (r == null)
                    return null;
                return new IOExt_FileHandle(r);
            }
        });
    }
    static Picker_Folder() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                var dir = yield window.showDirectoryPicker();
                return new IOExt_DirectoryHandle(dir);
            }
            else {
                var r = yield Neutralino.os.showFolderDialog("选择文件夹");
                return new IOExt_DirectoryHandle(r);
            }
        });
    }
    //文件操作
    static File_ReadText(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let _file = yield file.state.getFile();
                return yield _file.text();
            }
            else {
                return yield Neutralino.filesystem.readFile(file.state);
            }
        });
    }
    static File_ReadBinary(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let _file = yield file.state.getFile();
                return yield _file.arrayBuffer();
            }
            else {
                return yield Neutralino.filesystem.readBinaryFile(file.state);
            }
        });
    }
    static File_WriteBinary(file, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let stream = yield file.state.createWritable({ "keepExistingData": false });
                stream.write(data);
                stream.close();
                return true;
            }
            else {
                yield Neutralino.filesystem.writeBinaryFile(file.state, data);
                return true;
            }
        });
    }
    static File_WriteText(file, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let stream = yield file.state.createWritable({ "keepExistingData": false });
                stream.write(data);
                stream.close();
                return true;
            }
            else {
                yield Neutralino.filesystem.writeFile(file.state, data);
                return true;
            }
        });
    }
    static File_CreateText(path, name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let file;
            if (this._envWeb) {
                let _file = yield path.state.getFileHandle(name, { "create": true });
                file = new IOExt_FileHandle(_file);
            }
            else {
                let newname = path.state + "/" + name;
                file = new IOExt_FileHandle(newname);
            }
            return yield this.File_WriteText(file, data);
        });
    }
    static File_CreateBinary(path, name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let file;
            if (this._envWeb) {
                let _file = yield path.state.getFileHandle(name, { "create": true });
                file = new IOExt_FileHandle(_file);
            }
            else {
                let newname = path.state + "/" + name;
                file = new IOExt_FileHandle(newname);
            }
            return yield this.File_WriteBinary(file, data);
        });
    }
    //目录操作
    static Directory_List(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            let out = [];
            if (this._envWeb) {
                var all = path.state.entries();
                try {
                    for (var _d = true, all_1 = __asyncValues(all), all_1_1; all_1_1 = yield all_1.next(), _a = all_1_1.done, !_a; _d = true) {
                        _c = all_1_1.value;
                        _d = false;
                        const [name, handle] = _c;
                        let u = handle;
                        if (u.kind == "file") {
                            out.push(new IOExt_FileHandle(u));
                        }
                        else {
                            out.push(new IOExt_DirectoryHandle(u));
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = all_1.return)) yield _b.call(all_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return out;
            }
            else {
                let all = yield Neutralino.filesystem.readDirectory(path.state);
                for (var i = 0; i < all.length; i++) {
                    if (all[i].type == "file") {
                        out.push(new IOExt_FileHandle(all[i].path));
                    }
                    else {
                        out.push(new IOExt_DirectoryHandle(all[i].path));
                    }
                }
                return out;
            }
        });
    }
    static Directory_Create(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let file = yield path.state.getDirectoryHandle(name, { "create": true });
                return new IOExt_DirectoryHandle(file);
            }
            else {
                let newname = path.state + "/" + name;
                yield Neutralino.filesystem.createDirectory(newname);
                return new IOExt_DirectoryHandle(newname);
            }
        });
    }
}
IOExt._envWeb = false;
var IOExt_LoggerType;
(function (IOExt_LoggerType) {
    IOExt_LoggerType[IOExt_LoggerType["INFO"] = 0] = "INFO";
    IOExt_LoggerType[IOExt_LoggerType["WARNING"] = 1] = "WARNING";
    IOExt_LoggerType[IOExt_LoggerType["ERROR"] = 2] = "ERROR";
})(IOExt_LoggerType || (IOExt_LoggerType = {}));
export class IOExt_FileHandle {
    constructor(_state) {
        this.state = _state;
        this.isfile = true;
        if (IOExt.IsWebEnv()) {
            this.name = _state.name;
        }
        else {
            let i = _state.lastIndexOf("/");
            this.name = _state.substring(i + 1);
        }
    }
}
export class IOExt_DirectoryHandle {
    constructor(_state) {
        this.state = _state;
        this.isfile = false;
        if (IOExt.IsWebEnv()) {
            this.name = _state.name;
        }
        else {
            let i = _state.lastIndexOf("/");
            this.name = _state.substring(i + 1);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHdvZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBOEM7QUFDOUMsOENBQThDO0FBQzlDLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsWUFBWTtBQUNaLGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8sS0FBSztJQUlkLE1BQU0sQ0FBQyxJQUFJO1FBQ1AsSUFBSSxDQUFDO1lBQ0QsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtZQUVoQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO2dCQUNyQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFBO1FBRU4sQ0FBQztRQUNELE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQXlCLGdCQUFnQixDQUFDLElBQUk7UUFDbkUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQixJQUFJLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJO2dCQUM3QixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFB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