import { QUI_Button, QUI_HAlign, QUI_IElement, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Scroll_Unlimit, Resources, Vector2 } from "../../ttlayer2/ttlayer2.js";


export class FileItem {
    parent: FileItem;
    handle: FileSystemHandle;
    GetName(): string {
        let pname = "";
        if (this.parent != null)
            pname = this.parent.GetName() + "/";
        return pname + this.handle.name;
    }
}
//这个FolderList 是基于FileSystem API的，移动端不可以用
export class FolderList extends QUI_Panel {
    root: FileItem = null;
    curDir: FileItem = null;
    panel_File: QUI_Panel_Scroll_Unlimit<FileItem>;
    constructor() {
        super();

        this.panel_File = new QUI_Panel_Scroll_Unlimit<FileItem>(
            this.updateFileElem.bind(this)
        );
        this.panel_File.localRect.setAsFill();
        this.addChild(this.panel_File);

        this.panel_File.OnPick = this.onPick.bind(this);

    }
    OnPickFile: (file: File) => void
    FileFilter: (name: string) => boolean;
    async OpenFolder(startIn?: WellKnownDirectory | FileSystemHandle | undefined) {
        let roothandle = await showDirectoryPicker({ "mode": "readwrite", "startIn": "documents" });
        this.root = new FileItem();
        this.root.handle = roothandle;
        this.curDir = this.root;
        this.FillItems();
    }
    private async FillItems() {
        let items = this.panel_File.getItems();
        items.splice(0);
        if (this.curDir != this.root) {
            let upitem = new FileItem()
            upitem.parent = this.curDir.parent;
            upitem.handle = null;
            items.push(upitem);
        }
        let pathhandle = this.curDir.handle as FileSystemDirectoryHandle;
        for await (let i of pathhandle.entries()) {
            let key: string = i[0];
            let value: FileSystemHandle = i[1];
            let subitem = new FileItem();
            subitem.parent = this.curDir;
            subitem.handle = value;
            if (value.kind == "file") {
                if(this.FileFilter!=null)
                {    //文件过滤
                    if(this.FileFilter(value.name))
                        items.push(subitem);
                }
                else
                {
                    items.push(subitem);
                }
            
                
            }
            else {
                items.push(subitem);
            }
        }
    }
    private async onPick(index: number, item: FileItem) {
        if (item.handle == null) {
            this.curDir = item.parent;
            this.FillItems();
            this.panel_File.Pick(-1);
        }
        else if (item.handle.kind == "file") {
            if (this.OnPickFile != null) {
                let file = await (item.handle as FileSystemFileHandle).getFile();
                this.OnPickFile(file);
            }

        }
        else {
            this.curDir = item;
            this.FillItems();
            this.panel_File.Pick(-1);
        }

    }
    private updateFileElem(item: FileItem, elem: QUI_IElement, index: number, pick: boolean): QUI_IElement {
        if (elem == null) {
            elem = new QUI_Panel();
            let btn = new QUI_Button();
            let writesprite = Resources.GetPackElement().ConvertElemToSprite(Resources.getWhiteBlock());

            btn.ElemNormal = new QUI_Image(writesprite);
            btn.ElemNormal.localRect.setAsFill();

            elem.addChild(btn);
            elem.addChild(new QUI_Label(Resources.GetDefFont(), ""));
            elem.localRect.setVPosByTopBorder(20, 0);
            elem.localRect.setHPosFill(4, 4);
            (elem as QUI_Image).getChild(0).localRect.setAsFill();
            (elem as QUI_Image).getChild(1).localRect.setAsFill();
        }

        let back = (elem as QUI_Image).getChild(0) as QUI_Button;
        back.Tag = index.toString();
        back.OnClick = () => {
            this.panel_File.Pick(index);
        }
        if (pick)
            back.alpha = 0.5;
        else
            back.alpha = 0;

        let label = (elem as QUI_Panel).getChild(1) as QUI_Label;
        if (item != null) {
            if (item.handle == null) {
                label.text = "..";
            }
            else if (item.handle.kind == "file") {
                label.text = item.handle.name;// etName();
            }
            else {
                label.text = "[Path]" + item.handle.name;
            }
        }
        let fs = 16 / label.font.GetFontSize();;
        label.fontScale = new Vector2(fs, fs);

        label.halign = QUI_HAlign.Left;

        return elem;
    }
}