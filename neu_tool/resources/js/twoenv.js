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
///<reference  path="./filesystem.d.ts" />
export class IOExt {
    static get EnvIsWeb() {
        return this._envWeb;
    }
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
    static Log(text, type = LoggerType.INFO) {
        if (!this._envWeb)
            Neutralino.debug.log("==>" + text, type);
        if (type == LoggerType.INFO)
            console.log("==>" + text);
        else if (type == LoggerType.WARNING)
            console.warn("==>" + text);
        else
            console.error("==>" + text);
    }
    static pickOpenFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let op = {
                    "types": [{ "description": "tt.json", "accept": { "tt.json": "tt.json" } }]
                };
                let r = yield window.showOpenFilePicker();
                if (r == null)
                    return null;
                //fileHandle
                return new FileHandle(r[0]);
            }
            else {
                let op = {
                    filters: [{ name: "tt.json", extensions: ["tt.json"] }]
                };
                let r = yield Neutralino.os.showOpenDialog("open file dialog.", op);
                if (r == null || r.length == 0)
                    return null;
                //string 
                return new FileHandle(r[0]);
            }
        });
    }
    static readText(file) {
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
    static readBin(file) {
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
    static writeBin(file, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let stream = yield file.state.createWritable({ "keepExistingData": false });
                stream.write(data);
                stream.close();
            }
            else {
                yield Neutralino.filesystem.writeBinaryFile(file.state, data);
            }
        });
    }
    static writeText(file, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let stream = yield file.state.createWritable({ "keepExistingData": false });
                stream.write(data);
                stream.close();
            }
            else {
                yield Neutralino.filesystem.writeFile(file.state, data);
            }
        });
    }
    static pickSaveFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let op = {
                    "types": [{ "description": "tt.json", "accept": { "tt.json": "tt.json" } }]
                };
                let r = yield window.showSaveFilePicker();
                if (r == null)
                    return null;
                //fileHandle
                return new FileHandle(r);
            }
            else {
                let op = {
                    filters: [{ name: "tt.json", extensions: ["tt.json"] }]
                };
                let r = yield Neutralino.os.showSaveDialog("open file dialog.", op);
                if (r == null)
                    return null;
                return new FileHandle(r);
            }
        });
    }
    static pickFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                var dir = yield window.showDirectoryPicker();
                return new PathHandle(dir);
            }
            else {
                var r = yield Neutralino.os.showFolderDialog("选择文件夹");
                return new PathHandle(r);
            }
        });
    }
    static dirPath(path) {
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
                            out.push(new FileHandle(u));
                        }
                        else {
                            out.push(new PathHandle(u));
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
                        out.push(new FileHandle(all[i].path));
                    }
                    else {
                        out.push(new PathHandle(all[i].path));
                    }
                }
                return out;
            }
        });
    }
    static CreateFile(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let file = yield path.state.getFileHandle(name, { "create": true });
                return new FileHandle(file);
            }
            else {
                let newname = path.state + "/" + name;
                return new FileHandle(newname);
            }
        });
    }
    static CreatePath(path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._envWeb) {
                let file = yield path.state.getDirectoryHandle(name, { "create": true });
                return new PathHandle(file);
            }
            else {
                let newname = path.state + "/" + name;
                yield Neutralino.filesystem.createDirectory(newname);
                return new PathHandle(newname);
            }
        });
    }
    //noweb 模式才能用的高级技巧
    static NoWeb_GetFilePath(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._envWeb) {
                return new PathHandle(file.state);
            }
            else {
                throw "not support";
            }
        });
    }
}
IOExt._envWeb = false;
var LoggerType;
(function (LoggerType) {
    LoggerType["WARNING"] = "WARNING";
    LoggerType["ERROR"] = "ERROR";
    LoggerType["INFO"] = "INFO";
})(LoggerType || (LoggerType = {}));
export class FileHandle {
    constructor(_state) {
        this.state = _state;
    }
    IsFile() {
        return true;
    }
}
export class PathHandle {
    constructor(_state) {
        this.state = _state;
    }
    IsFile() {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdvZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHdvZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBMEM7QUFDMUMsTUFBTSxPQUFPLEtBQUs7SUFFZCxNQUFNLEtBQUssUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUk7UUFDUCxJQUFJLENBQUM7WUFDRCxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1lBRWpDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUE7UUFFTixDQUFDO1FBQ0QsV0FBTSxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQW1CLFVBQVUsQ0FBQyxJQUFJO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUNiLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFDLElBQUk7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUE7YUFDeEIsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFDLE9BQU87WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFL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