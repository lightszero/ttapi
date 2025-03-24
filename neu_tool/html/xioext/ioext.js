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
                let filehandle = file.state;
                let stream = yield filehandle.createWritable({ "keepExistingData": false });
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
                // let dir = (path.state as FileSystemDirectoryHandle);
                // await dir.requestPermission({ mode: "readwrite" });
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
            try {
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
                }
                else {
                    let all = yield Neutralino.filesystem.readDirectory(path.state);
                    for (var i = 0; i < all.length; i++) {
                        if (all[i].type == "FILE") {
                            out.push(new IOExt_FileHandle(all[i].path));
                        }
                        else {
                            out.push(new IOExt_DirectoryHandle(all[i].path));
                        }
                    }
                }
            }
            catch (e) {
                this.Log("Directory_List Error(" + JSON.stringify(path) + " msg:" + e, IOExt_LoggerType.ERROR);
            }
            return out;
        });
    }
    static Directory_Create(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                try {
                    let file = yield path.state.getDirectoryHandle(name, { "create": true });
                    return new IOExt_DirectoryHandle(file);
                }
                catch (e) {
                    this.Log("Directory_Create error:" + e);
                }
            }
            else {
                let newname = path.state + "/" + name;
                yield Neutralino.filesystem.createDirectory(newname);
                return new IOExt_DirectoryHandle(newname);
            }
        });
    }
    static Directory_Remove(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                try {
                    let file = yield path.state.removeEntry(name, { "recursive": true });
                    return true;
                }
                catch (e) {
                    this.Log("Directory_Create error:" + e);
                    return false;
                }
            }
            else {
                let newname = path.state + "/" + name;
                yield Neutralino.filesystem.remove(newname);
                return true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9leHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpb2V4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQThDO0FBQzlDLDhDQUE4QztBQUM5Qyx5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLFlBQVk7QUFDWixrREFBa0Q7QUFDbEQsTUFBTSxPQUFPLEtBQUs7SUFJZCxNQUFNLENBQUMsSUFBSTtRQUNQLElBQUksQ0FBQztZQUNELFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7WUFFaEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtnQkFDckMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQTtRQUVOLENBQUM7UUFDRCxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVksRUFBRSxPQUF5QixnQkFBZ0IsQ0FBQyxJQUFJO1FBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEIsSUFBSSxJQUFJLElBQUksZ0JBQWdCLENBQUMsSUFBSTtnQkFDN0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUks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