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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb25mdW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWxlY3Ryb25mdW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sT0FBTyxZQUFZO0lBQ3JCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsTUFBYSxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUV6QixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQztRQUUzQyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFFL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxNQUFNLEtBQUssUUFBUTtRQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQXNCSjtBQUVELE1BQU0sT0FBTyxRQUFRO0NBS3BCO0FBQ0QsTUFBTSxPQUFPLFVBQVU7Q0FNdEI7QUFDRCxNQUFNLE9BQU8sY0FBYztDQUcxQiJ9