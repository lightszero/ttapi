///<reference  path="./filesystem.d.ts" />
export class IOExt {
    private static _envWeb: boolean = false;
    static get EnvIsWeb() {
        return this._envWeb;
    }
    static Init(): void {
        try {
            Neutralino.init();
            this._envWeb = false;
            this.Log("Neutralino env found.")

            Neutralino.events.on("windowClose", () => {
                Neutralino.app.exit();
            })

        }
        catch {
            this._envWeb = true;
            this.Log("web env.");
        }
    }
    static Log(text: string, type: LoggerType = LoggerType.INFO): void {
        if (!this._envWeb)
            Neutralino.debug.log("==>" + text, type);
        if (type == LoggerType.INFO)
            console.log("==>" + text)
        else if (type == LoggerType.WARNING)
            console.warn("==>" + text)
        else
            console.error("==>" + text)
    }
    static async pickOpenFile(): Promise<FileHandle | null> {

        if (this._envWeb) {
            let op: OpenFilePickerOptions = {
                "types": [{ "description": "tt.json", "accept": { "tt.json": "tt.json" } }]
            };
            let r = await window.showOpenFilePicker();
            if (r == null)
                return null;

            //fileHandle
            return new FileHandle(r[0]);
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
            return new FileHandle(r[0]);
        }
    }
    static async readText(file: FileHandle) {
        if (this._envWeb) {

            let _file = await (file.state as FileSystemFileHandle).getFile();
            return await _file.text();
        }
        else {
            return await Neutralino.filesystem.readFile(file.state as string);
        }

    }
    static async readBin(file: FileHandle): Promise<ArrayBuffer> {
        if (this._envWeb) {

            let _file = await (file.state as FileSystemFileHandle).getFile();
            return await _file.arrayBuffer();
        }
        else {
            return await Neutralino.filesystem.readBinaryFile(file.state as string);
        }
    }
    static async writeBin(file: FileHandle, data: ArrayBuffer) {
        if (this._envWeb) {
            let stream = await (file.state as FileSystemFileHandle).createWritable({ "keepExistingData": false })
            stream.write(data);
            stream.close();
        }
        else {
            await Neutralino.filesystem.writeBinaryFile(file.state as string, data);
        }
    }
    static async writeText(file: FileHandle, data: string) {
        if (this._envWeb) {
            let stream = await (file.state as FileSystemFileHandle).createWritable({ "keepExistingData": false })
            stream.write(data);
            stream.close();
        }
        else {
            await Neutralino.filesystem.writeFile(file.state as string, data);
        }
    }
    static async pickSaveFile(): Promise<FileHandle | null> {
        if (this._envWeb) {
            let op: OpenFilePickerOptions = {
                "types": [{ "description": "tt.json", "accept": { "tt.json": "tt.json" } }]
            };
            let r = await window.showSaveFilePicker();
            if (r == null)
                return null;

            //fileHandle
            return new FileHandle(r);
        }
        else {
            let op: Neutralino.os.SaveDialogOptions =
            {
                filters: [{ name: "tt.json", extensions: ["tt.json"] }]
            };
            let r = await Neutralino.os.showSaveDialog("open file dialog.", op);
            if (r == null)
                return null;
            return new FileHandle(r);
        }
    }
    static async pickFolder(): Promise<PathHandle | null> {
        if (this._envWeb) {
            var dir = await window.showDirectoryPicker();
            return new PathHandle(dir);
        }
        else {
            var r = await Neutralino.os.showFolderDialog("选择文件夹");
            return new PathHandle(r);

        }
    }

    static async dirPath(path: PathHandle): Promise<FilexHandleUnion[]> {
        let out: (PathHandle | FileHandle)[] = [];
        if (this._envWeb) {


            var all = (path.state as FileSystemDirectoryHandle).entries();
            for await (const x of all) {

                let u: FileSystemHandleUnion = x;
                if (u.kind == "file") {
                    out.push(new FileHandle(u))
                }
                else {
                    out.push(new PathHandle(u));
                }
            }
            return out;
        }
        else {
            let all = await Neutralino.filesystem.readDirectory(path.state as string);
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
    }
    static async CreateFile(path: PathHandle, name: string): Promise<FileHandle> {
        if (this._envWeb) {
            let file = await (path.state as FileSystemDirectoryHandle).getFileHandle(name, { "create": true });
            return new FileHandle(file);
        }
        else {
            let newname = path.state as string + "/" + name;

            return new FileHandle(newname);
        }
    }
    static async CreatePath(path: PathHandle, name: string): Promise<PathHandle> {
        if (this._envWeb) {
            let file = await (path.state as FileSystemDirectoryHandle).getDirectoryHandle(name, { "create": true });
            return new PathHandle(file);
        }
        else {
            let newname = path.state as string + "/" + name;
            await Neutralino.filesystem.createDirectory(newname);
            return new PathHandle(newname);
        }
    }
    //noweb 模式才能用的高级技巧
    static async NoWeb_GetFilePath(file: FileHandle): Promise<PathHandle> {
        if (!this._envWeb) {

            return new PathHandle(file.state as string)
        }
        else {
            throw "not support";

        }
    }
}
enum LoggerType {
    WARNING = "WARNING",
    ERROR = "ERROR",
    INFO = "INFO"
}
type FilexHandleUnion = FileHandle | PathHandle;
export class FileHandle {
    constructor(_state: FileSystemFileHandle | string) {
        this.state = _state;
    }
    state: FileSystemFileHandle | string;
    IsFile() {
        return true;
    }
}
export class PathHandle {
    constructor(_state: FileSystemDirectoryHandle | string) {
        this.state = _state;
    }
    state: FileSystemDirectoryHandle | string;
    IsFile() {
        return false;
    }
}