export class ElectronFunc {
    constructor() {
        let win = window;
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
        this.window_open = win.window_open;
    }
    static get Instance() {
        if (this.g_inst == null)
            this.g_inst = new ElectronFunc();
        return this.g_inst;
    }
}
export class FileInfo {
}
export class FileFilter {
}
export class OpenFileOption {
}
