///<reference  path="./filesystem.d.ts" />
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
//封装来自web的 filesystem api
//和来自 Neutralino 的 本地 api
//这样就可以用一套系统
export class IOExt {
    static Init() {
        try {
            Neutralino.init();
            this._envWeb = false;
            this.Log("Neutralino env found.");
            Neutralino.events.on("windowClose", () => {
                Neutralino.app.exit();
            });
        }
        catch (_a) {
            this._envWeb = true;
            this.Log("web env.");
        }
    }
    static IsWebEnv() {
        return this._envWeb;
    }
    static Log(text, type = IOExt_LoggerType.INFO) {
        if (!this._envWeb) {
            if (type == IOExt_LoggerType.INFO)
                Neutralino.debug.log("[IOExt]==>" + text, Neutralino.debug.LoggerType.INFO);
            else if (type == IOExt_LoggerType.WARNING)
                Neutralino.debug.log("[IOExt]==>" + text, Neutralino.debug.LoggerType.WARNING);
            else
                Neutralino.debug.log("[IOExt]==>" + text, Neutralino.debug.LoggerType.ERROR);
        }
        else {
            if (type == IOExt_LoggerType.INFO)
                console.log("[IOExt]==>" + text);
            else if (type == IOExt_LoggerType.WARNING)
                console.warn("[IOExt]==>" + text);
            else
                console.error("[IOExt]==>" + text);
        }
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
                        const x = _c;
                        let u = x;
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
    }
    IsFile() {
        return true;
    }
}
export class IOExt_DirectoryHandle {
    constructor(_state) {
        this.state = _state;
    }
    IsFile() {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHdvZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBDQUEwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFMUMseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QixZQUFZO0FBQ1osTUFBTSxPQUFPLEtBQUs7SUFJZCxNQUFNLENBQUMsSUFBSTtRQUNQLElBQUksQ0FBQztZQUNELFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7WUFFakMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtnQkFDckMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQTtRQUVOLENBQUM7UUFDRCxXQUFNLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQXlCLGdCQUFnQixDQUFDLElBQUk7UUFDbkUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQixJQUFJLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJO2dCQUM3QixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzRSxJQUFJLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxP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