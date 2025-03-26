

export class TTPathTool {

    static GetFileName(filename: string) {
        if (filename.includes("/")) {
            let fi = filename.lastIndexOf("/");
            let shortname = filename.substring(fi + 1);

            return shortname

        }
        if (filename.includes("\\")) {
            let fi = filename.lastIndexOf("\\");
            let shortname = filename.substring(fi + 1);

            return shortname
        }
        return filename;
    }
    static GetFirstPath(filename: string): string {
        if (filename.includes("/")) {
            let fi = filename.indexOf("/");
            if (fi < 0)
                return filename;

            let shortname = filename.substring(0, fi);

            return shortname

        }
        if (filename.includes("\\")) {
            let fi = filename.indexOf("\\");



            let shortname = filename.substring(0, fi);

            return shortname
        }
        return "";
    }
    static RemoveFirstPath(filename: string): string {
        let path = this.GetFirstPath(filename);
        return filename.substring(path.length + 1);
    }
    static GetPathName(filename: string): string {
        if (filename.includes("/")) {
            let fi = filename.lastIndexOf("/");
            if (fi < 0)
                return filename;

            let shortname = filename.substring(0, fi);

            return shortname

        }
        if (filename.includes("\\")) {
            let fi = filename.lastIndexOf("\\");



            let shortname = filename.substring(0, fi);

            return shortname
        }
        return "";
    }
    static GetFileNameWithoutExt(filename: string) {
        let shortname = this.GetFileName(filename);
        let di = shortname.indexOf(".");
        if (di < 0)
            return shortname;
        return shortname.substring(0, di);
    }
    static GetExt(filename: string): string {
        let shortname = this.GetFileName(filename);
        console.log("_getext:" + shortname);
        let di = shortname.indexOf(".");
        if (di < 0)
            return "";
        return shortname.substring(di);
    }
}