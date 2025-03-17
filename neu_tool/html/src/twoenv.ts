///<reference  path="../js/filesystem.d.ts" />
///<reference  path="../js/neutralino.d.ts" />
//封装来自web的 filesystem api
//和来自 Neutralino 的 本地 api
//这样就可以用一套系统
//web filesystem 需要放弃一些能力，比如stat，比如打开一个文件，然后往上得到目录
export class IOExt {
    private static _envWeb: boolean = false;


    static Init(): void {
        try {
            Neutralino.init();
            this._envWeb = false;
            this.Log("Neutralino env Init.")

            Neutralino.events.on("windowClose", () => {
                Neutralino.app.exit();
            })

        }
        catch (e) {
            this.Log("error:" + e);
            this._envWeb = true;
            this.Log("Web env Init.");
        }
    }

    static IsWebEnv(): boolean {
        return this._envWeb;
    }

    static Log(text: string, type: IOExt_LoggerType = IOExt_LoggerType.INFO): void {
        if (!this._envWeb) {
            if (type == IOExt_LoggerType.INFO)
                Neutralino.debug.log("[IOExt]==>" + text, "INFO" as Neutralino.debug.LoggerType);
            else if (type == IOExt_LoggerType.WARNING)
                Neutralino.debug.log("[IOExt]==>" + text, "WARNING" as Neutralino.debug.LoggerType);
            else
                Neutralino.debug.log("[IOExt]==>" + text, "ERROR" as Neutralino.debug.LoggerType);
        }

        if (type == IOExt_LoggerType.INFO)
            console.log("[IOExt]==>" + text)
        else if (type == IOExt_LoggerType.WARNING)
            console.warn("[IOExt]==>" + text)
        else
            console.error("[IOExt]==>" + text)

    }
    //三个对话框，首推pickFolder
    static async Picker_OpenFile(): Promise<IOExt_FileHandle | null> {

        if (this._envWeb) {
            let op: OpenFilePickerOptions = {
                "types": [{ "description": "tt.json", "accept": { "tt.json": "tt.json" } }]
            };
            let r = await window.showOpenFilePicker();
            if (r == null)
                return null;

            //fileHandle
            return new IOExt_FileHandle(r[0]);
        }
        else {
            let op: Neutralino.os.OpenDialogOptions =
            {
                filters: [{ name: "tt.json", extensions: ["tt.json"] }]
            };
            let r = await Neutralino.os.showOpenDialog("open file dialog.", op);
            if (r == null || r.length == 0)
                return null;
            //string 
            return new IOExt_FileHandle(r[0]);
        }
    }
    static async Picker_SaveFile(): Promise<IOExt_FileHandle | null> {
        if (this._envWeb) {
            let op: OpenFilePickerOptions = {
                "types": [{ "description": "tt.json", "accept": { "tt.json": "tt.json" } }]
            };
            let r = await window.showSaveFilePicker();
            if (r == null)
                return null;

            //fileHandle
            return new IOExt_FileHandle(r);
        }
        else {
            let op: Neutralino.os.SaveDialogOptions =
            {
                filters: [{ name: "tt.json", extensions: ["tt.json"] }]
            };
            let r = await Neutralino.os.showSaveDialog("open file dialog.", op);
            if (r == null)
                return null;
            return new IOExt_FileHandle(r);
        }
    }
    static async Picker_Folder(): Promise<IOExt_DirectoryHandle | null> {
        if (this._envWeb) {
            var dir = await window.showDirectoryPicker();
            return new IOExt_DirectoryHandle(dir);
        }
        else {
            var r = await Neutralino.os.showFolderDialog("选择文件夹");
            return new IOExt_DirectoryHandle(r);

        }
    }

    //文件操作
    static async File_ReadText(file: IOExt_FileHandle) {
        if (this._envWeb) {

            let _file = await (file.state as FileSystemFileHandle).getFile();
            return await _file.text();
        }
        else {
            return await Neutralino.filesystem.readFile(file.state as string);
        }

    }
    static async File_ReadBinary(file: IOExt_FileHandle): Promise<ArrayBuffer> {
        if (this._envWeb) {

            let _file = await (file.state as FileSystemFileHandle).getFile();
            return await _file.arrayBuffer();
        }
        else {
            return await Neutralino.filesystem.readBinaryFile(file.state as string);
        }
    }
    static async File_WriteBinary(file: IOExt_FileHandle, data: ArrayBuffer): Promise<boolean> {
        if (this._envWeb) {
            let stream = await (file.state as FileSystemFileHandle).createWritable({ "keepExistingData": false })
            stream.write(data);
            stream.close();
            return true;
        }
        else {
            await Neutralino.filesystem.writeBinaryFile(file.state as string, data);
            return true;
        }
    }
    static async File_WriteText(file: IOExt_FileHandle, data: string): Promise<boolean> {
        if (this._envWeb) {
            let stream = await (file.state as FileSystemFileHandle).createWritable({ "keepExistingData": false })
            stream.write(data);
            stream.close();
            return true;
        }
        else {
            await Neutralino.filesystem.writeFile(file.state as string, data);
            return true;
        }
    }


    static async File_CreateText(path: IOExt_DirectoryHandle, name: string, data: string): Promise<boolean> {
        let file: IOExt_FileHandle;
        if (this._envWeb) {
            let _file = await (path.state as FileSystemDirectoryHandle).getFileHandle(name, { "create": true });

            file = new IOExt_FileHandle(_file);
        }
        else {
            let newname = path.state as string + "/" + name;

            file = new IOExt_FileHandle(newname);
        }
        return await this.File_WriteText(file, data);
    }
    static async File_CreateBinary(path: IOExt_DirectoryHandle, name: string, data: ArrayBuffer): Promise<boolean> {
        let file: IOExt_FileHandle;
        if (this._envWeb) {
            let _file = await (path.state as FileSystemDirectoryHandle).getFileHandle(name, { "create": true });

            file = new IOExt_FileHandle(_file);
        }
        else {
            let newname = path.state as string + "/" + name;

            file = new IOExt_FileHandle(newname);
        }
        return await this.File_WriteBinary(file, data);
    }

    //目录操作
    static async Directory_List(path: IOExt_DirectoryHandle): Promise<IOExt_HandleUnion[]> {
        let out: (IOExt_DirectoryHandle | IOExt_FileHandle)[] = [];
        if (this._envWeb) {


            var all = (path.state as FileSystemDirectoryHandle).entries();
            for await (const [name, handle] of all) {

                let u: FileSystemHandleUnion = handle;
                if (u.kind == "file") {
                    out.push(new IOExt_FileHandle(u))
                }
                else {
                    out.push(new IOExt_DirectoryHandle(u));
                }
            }
            return out;
        }
        else {
            let all = await Neutralino.filesystem.readDirectory(path.state as string);
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
    }
    static async Directory_Create(path: IOExt_DirectoryHandle, name: string): Promise<IOExt_DirectoryHandle> {
        if (this._envWeb) {
            let file = await (path.state as FileSystemDirectoryHandle).getDirectoryHandle(name, { "create": true });
            return new IOExt_DirectoryHandle(file);
        }
        else {
            let newname = path.state as string + "/" + name;
            await Neutralino.filesystem.createDirectory(newname);
            return new IOExt_DirectoryHandle(newname);
        }
    }
    //noweb 模式才能用的方法，也就没有了控制力
    // static async File_Stat(path: IOExt_FileHandle): Promise<{ size: number, time: number }> {
       
    //     if (this._envWeb) {

    //         throw "no this func";
    //     }
    //     else {
    //         let stats = await Neutralino.filesystem.getStats(path.state as string);
    //         return { size: stats.size, time: stats.modifiedAt };
    //     }

    // }
    // static async Directory_FromFile(file: IOExt_FileHandle): Promise<IOExt_DirectoryHandle> {
    //     if (!this._envWeb) {

    //         return new IOExt_DirectoryHandle(file.state as string)
    //     }
    //     else {
    //         throw "not support";

    //     }
    // }
}
enum IOExt_LoggerType {
    INFO,
    WARNING,
    ERROR,
}
export interface IOExt_Handle {
    isfile: boolean;
    name: string;
}
type IOExt_HandleUnion = IOExt_FileHandle | IOExt_DirectoryHandle;
export class IOExt_FileHandle implements IOExt_Handle {
    constructor(_state: FileSystemFileHandle | string) {
        this.state = _state;
        this.isfile = true;
        if (IOExt.IsWebEnv()) {
            this.name = (_state as FileSystemFileHandle).name
        }
        else {
            let i = (_state as string).lastIndexOf("/");
            this.name = (_state as string).substring(i + 1);
        }
    }
    state: FileSystemFileHandle | string;
    name: string
    isfile: boolean;
}
export class IOExt_DirectoryHandle {
    constructor(_state: FileSystemDirectoryHandle | string) {
        this.state = _state;
        this.isfile = false;
        if (IOExt.IsWebEnv()) {
            this.name = (_state as FileSystemDirectoryHandle).name
        }
        else {
            let i = (_state as string).lastIndexOf("/");
            this.name = (_state as string).substring(i + 1);
        }
    }
    state: FileSystemDirectoryHandle | string;
    name: string
    isfile: boolean;
}