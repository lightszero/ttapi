var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tt } from "../../interface/ttapi.js";
export class TTStore {
    constructor() {
        this._loaded = false;
        this.InitAsync();
    }
    InitAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield KeyStore.OpenOrCreateDB("_ttstore_");
            this._loaded = true;
        });
    }
    IsReady() {
        return this._loaded;
    }
    GetText(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield KeyStore.GetStringValue(key);
        });
    }
    GetBinary(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield KeyStore.GetBinaryValue(key);
        });
    }
    SaveText(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield KeyStore.SetStringValue(key, data);
        });
    }
    SaveBinary(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield KeyStore.SetBinaryValue(key, data);
        });
    }
    SaveDataToLocal(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 创建隐藏的可下载链接
            var eleLink = document.createElement('a');
            eleLink.download = key;
            eleLink.style.display = 'none';
            // 字符内容转变成blob地址
            var blob = new Blob([data]);
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
            return true;
        });
    }
}
//将INDEXDBSTORE 封装起来
const _storename = "__store__";
class StoreItem {
}
class KeyStore {
    static DeleteDb(dbname) {
        return __awaiter(this, void 0, void 0, function* () {
            let dbreq = indexedDB.deleteDatabase(dbname);
            let dbinit = 0;
            dbreq.onsuccess = () => {
                console.log("db delete succ.");
                dbinit = 1;
            };
            dbreq.onerror = () => {
                console.log("db delete error.");
                dbinit = 2;
            };
            while (dbinit == 0) {
                yield tt.sleep(1);
            }
        });
    }
    static OpenOrCreateDB(dbname) {
        return __awaiter(this, void 0, void 0, function* () {
            let dbinit = 0;
            let dbreq = indexedDB.open(dbname, 1);
            dbreq.onsuccess = (evt) => {
                console.log("db open");
                dbinit = 1;
                this.db = dbreq.result;
            };
            dbreq.onerror = () => {
                console.log(" dbreq.onerror");
                dbinit = 2;
                this.db = null;
            };
            dbreq.onupgradeneeded = (evt) => {
                console.log("db onupgradeneeded");
                this.db = dbreq.result;
                let store = this.db.createObjectStore(_storename, { "keyPath": ["_id"] });
                store.createIndex("_id", "_id", { "unique": true });
                //let idi= store.createIndex("value", "value", { "unique": false });
                //let idi2= store.createIndex("value2", "value2", { "unique": false });
                console.log(" --create store--");
                //dbinit = 1;
            };
            while (dbinit == 0) {
                yield tt.sleep(1);
            }
        });
    }
    static SetStringValue(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db == null)
                return;
            let tran = this.db.transaction(_storename, "readwrite");
            let reqdone = 0;
            let store = tran.objectStore(_storename);
            let req = store.put({ "_id": key, "value": data, "format": "text" });
            req.onsuccess = (ev) => {
                reqdone = 1;
                console.log("SetValue " + " key:" + key + " data:" + JSON.stringify(data));
            };
            req.onerror = (ev) => {
                reqdone = 2;
                console.log("SetValue fail " + " key:" + key + " data:" + JSON.stringify(data));
            };
            while (reqdone == 0) {
                yield tt.sleep(1);
            }
        });
    }
    static SetBinaryValue(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db == null)
                return;
            let tran = this.db.transaction(_storename, "readwrite");
            let reqdone = 0;
            let store = tran.objectStore(_storename);
            let req = store.put({ "_id": key, "value": data, "format": "hex" });
            req.onsuccess = (ev) => {
                reqdone = 1;
                console.log("SetValue " + " key:" + key + " data:" + JSON.stringify(data));
            };
            req.onerror = (ev) => {
                reqdone = 2;
                console.log("SetValue fail " + " key:" + key + " data:" + JSON.stringify(data));
            };
            while (reqdone == 0) {
                yield tt.sleep(1);
            }
        });
    }
    static GetValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db == null)
                return null;
            let tran = this.db.transaction(_storename, "readonly");
            let store = tran.objectStore(_storename);
            let index = store.index("_id"); //用索引去查
            let req = index.get(key);
            //let req = store.get(key); //直接用主键查不好使
            let reqdone = 0;
            req.onsuccess = (ev) => {
                reqdone = 1;
                console.log("GetValue " + "key:" + key + " data:" + JSON.stringify(req.result));
            };
            req.onerror = (ev) => {
                reqdone = 2;
                console.log("GetValue Fail " + "key:" + JSON.stringify(req.result));
            };
            while (reqdone == 0) {
                yield tt.sleep(1);
            }
            return req.result;
        });
    }
    static GetBinaryValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let v = yield this.GetValue(key);
            if (v == undefined)
                return null;
            else if (v.format == "hex")
                return v.value;
            else
                throw new Error("format is text.");
        });
    }
    static GetStringValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let v = yield this.GetValue(key);
            if (v == undefined)
                return null;
            else if (v.format == "text")
                return v.value;
            else
                throw new Error("format is text.");
        });
    }
}
KeyStore.db = null;
