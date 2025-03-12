

export class ElectronFunc {
    private constructor() {
        let win = window as any;

        this.type = win.MyAPI.type;
        this.tag = win.MyAPI.tag;

        this.dialog_msgbox = win.dialog_msgbox;
        this.dialog_openfile = win.dialog_openfile;
        this.dialog_savefile = win.dialog_savefile;

        this.path_getcurrent = win.path_getcurrent;
        this.path_list = win.path_list;
        this.path_delete = win.path_delete;
        this.path_stat = win.path_stat;

        this.file_readtext = win.file_readtext;
        this.file_readbin = win.file_readbin;
        this.file_writetext = win.file_writetext;
        this.file_appendtext = win.file_appendtext;
        this.file_writebin = win.file_writebin;
        this.file_delete = win.file_delete;
    }
    private static g_inst: ElectronFunc;
    static get Instance() {
        if (this.g_inst == null)
            this.g_inst = new ElectronFunc();
        return this.g_inst;
    }
    readonly type: string;
    readonly tag: any;

    readonly dialog_msgbox: (title: string, message: string, buttons: string[] | null) => Promise<number>
    readonly dialog_openfile: (filter: FileFilter) => Promise<string[]>
    readonly dialog_savefile: (filters: FileFilter[]) => Promise<string>


    readonly path_getcurrent: () => Promise<string>
    readonly path_list: (path: string) => Promise<FileInfo[]>
    readonly path_delete: (path: string, recursive: boolean | null) => Promise<boolean>;
    readonly path_stat: (path: string) => Promise<FileInfo>

    readonly file_readtext: (path: string) => Promise<string>
    readonly file_readbin: (path: string) => Promise<ArrayBufferLike>
    readonly file_writetext: (_path: string, text: string) => Promise<boolean>
    readonly file_appendtext: (_path: string, text: string) => Promise<boolean>
    readonly file_writebin: (_path: string, data: ArrayBufferLike) => Promise<boolean>
    readonly file_delete: (_path: string) => Promise<boolean>

}

class FileInfo {
    isdir: boolean;
    name: string;
    size: number;
    time: number;
}
interface FileFilter {

    // Docs: https://electronjs.org/docs/api/structures/file-filter

    extensions: string[];
    name: string;
}