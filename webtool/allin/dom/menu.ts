//Menu 这玩意儿 为什么要我自己搞一个，html没现成的吗？

export class Menu {
    _divMenu: HTMLDivElement;
    _context: MenuContent;
    constructor() {
        this._divMenu = document.createElement("div");
        this._divMenu.style.position = "absolute";
        this._divMenu.style.left = "0px";
        this._divMenu.style.right = "0px";
        this._divMenu.style.top = "0px";
        this._divMenu.style.bottom = "0px";
        //this._divMenu.style.backgroundColor = "rgba(0,0,0,0.5)";
        document.body.appendChild(this._divMenu);
        this._divMenu.hidden = true;
        this._divMenu.addEventListener("mousedown", () => {
            this.Close();
        }
        );
    }
    AddItem(title: string, click: ((e: HTMLElement) => void) = null): void {
        if (this._context == null)
            this._context = new MenuContent(this);

        this._context.AddItem(title, click);
    }

    Show(x: number, y: number): void {
        document.body.appendChild(this._divMenu);
        this._divMenu.hidden = false;
        if (this._context != null) {
            this._context.Show(x, y);
        }
    }

    Close(): void {
        while (this._divMenu.children.length > 0) {
            this._divMenu.children[0].remove();
        }
        this._divMenu.hidden = true;
    }
    GetElemCenter(elem: HTMLElement): { x: number, y: number } {
        let rect = elem.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
}
class MenuContent {
    _menu: Menu;
    _div: HTMLDivElement;
    _divBack: HTMLDivElement;//搞个div ban mousedown 事件
    _submenu: { [id: string]: MenuContent } = {}
    constructor(_menu: Menu) {
        this._menu = _menu;

        this._divBack = document.createElement("div");
        this._divBack.style.position = "absolute";
        this._divBack.style.left = "0px";
        this._divBack.style.right = "0px";
        this._divBack.style.top = "0px";
        this._divBack.style.bottom = "0px";
        this._divBack.style.backgroundColor = "rgba(0,0,0,0.5)";

        this._div = document.createElement("div");
        this._div.style.position = "absolute";
        this._div.style.left = "0px";
        this._div.style.right = "0px";
        this._div.style.width = "200px";
        this._div.style.height = "auto";
        this._divBack.appendChild(this._div);

        this._divBack.addEventListener("mousedown", () => {
            this._menu.Close();
        });
    }
    Show(x: number, y: number) {
        this._menu._divMenu.appendChild(this._divBack);
        this._div.style.left = x + "px";
        this._div.style.top = y + "px";
    }
    AddItem(title: string, click: (e: HTMLElement) => void): void {
        if (title.includes("/")) {
            let iname = title.indexOf("/");
            let name = title.substring(0, iname);
            if (this._submenu[name] == null) {
                let mc = new MenuContent(this._menu);
                this._submenu[name] = mc;
                mc = this._submenu[name]
                //new
                let btn = document.createElement("a");
                this._div.appendChild(btn);
                var br = document.createElement("br");
                this._div.appendChild(br);
                btn.textContent = name + "->";
                btn.onmousedown = (e) => {
                    e.stopPropagation();

                }
                btn.onclick = (e) => {
                    console.log("submenu down.");
                    let pos = this._menu.GetElemCenter(btn);
                    mc.Show(pos.x, pos.y);
                }
            }

            let restname = title.substring(iname + 1);
            this._submenu[name].AddItem(restname, click);

            return;
        }

        //特殊显示规则
        if (title[0] == "_" || title[0] == "-") {
            if (title.length == 1) {
                let br = document.createElement("hr");
                this._div.appendChild(br);
                return;
            }
            let span = document.createElement("span");
            span.textContent = title.substring(1);
            let br = document.createElement("br");
            this._div.appendChild(span);
            this._div.appendChild(br);
            return;
        }

        //没实现
        if (click == null) {
            let span = document.createElement("span");
            span.textContent = "*" + title + "*";
            let br = document.createElement("br");
            this._div.appendChild(span);
            this._div.appendChild(br);
            return;
        }


        let btn = document.createElement("button");
        this._div.appendChild(btn);
        var br = document.createElement("br");
        this._div.appendChild(br);
        btn.textContent = title;
        btn.onmousedown = (e) => {
            e.stopPropagation();

        }
        btn.onclick = (e) => {
            console.log("btn down.");

            if (click != null)
                click(btn);

            this._menu.Close();
        }
    }
}