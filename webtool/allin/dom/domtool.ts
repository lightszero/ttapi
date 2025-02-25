
export * from "./dombase.js";
export * from "./splitter.js";
export * from "./group.js";
export * from "./canvas.js";
export * from "./canvasraw.js";
//export * from "./preview.js";
//export * from "./palette.js"
export * from "./toolbar.js"
export * from "./menu.js"
//export * from "./palrgb.js"


import { Button, Label, Panel, Screen, TextBox, Toggle } from "./dombase.js";
import { Splitter } from "./splitter.js";

export class DomTool {
    static Init(): void {
        document.body.style.backgroundColor = "#000";
        document.body.style.color = "#fff";
        this.screen = new Screen();
    }

    static InitFullScreen(): void {
        document.body.style.backgroundColor = "#000";
        document.body.style.color = "#fff";
        document.body.style.width = "100%"
        document.body.style.height = "100%"
        document.body.style.position = "absolute"
        document.body.style.margin = "0px";
        document.body.style.padding = "0px";
        document.body.style.overflow = "hidden";

        document.body.style.transform = "scale(1,1)"
        document.body.style.userSelect = "none";
        window.addEventListener('mousewheel', function (e) {
            e = e || window.event;
            if (((e as any).wheelDelta && (e as any).ctrlKey) || (e as any).detail) {
                e.preventDefault();
            }
        }, { capture: false, passive: false });
        window.addEventListener('keydown', function (event) {
            if ((event.ctrlKey === true || event.metaKey === true)
                && (event.keyCode === 61 || event.keyCode === 107
                    || event.keyCode === 173 || event.keyCode === 109
                    || event.keyCode === 187 || event.keyCode === 189)) {
                event.preventDefault();
            }
        }, false);
        window.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, { passive: false });

        window.addEventListener('dragstart', function (event) {
            event.preventDefault();
        }, false);

        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            return false;
        })
        window.addEventListener("mousedown", function (event) {
            if (event.button == 2) {
                event.preventDefault();
            }
        })

        this.screen = new Screen();
    }

    static screen: Screen;
    static AddPanel(): Panel {
        let div = new Panel();
        this.screen.AddChild(div);
        return div;
    }

    static AddLabel(text: string): Label {
        let label = new Label(text);
        this.screen.AddChild(label);
        return label;
    }
    static AddTextBox(title: string, deftext: string): TextBox {

        let text = new TextBox(title, deftext);
        this.screen.AddChild(text);
        return text;
    }
    static AddButton(text: string, onclick: (() => void)|null = null): Button {

        let btn = new Button(text);
        btn.SetClickEvent(onclick);
        this.screen.AddChild(btn);
        return btn;
    }
    static AddToggle(title: string, value: boolean): Toggle {
        let toggle = new Toggle(title, value);
        this.screen.AddChild(toggle);
        return toggle;
    }
    static AddSpliter(): Splitter {
        let s = new Splitter();
        document.body.appendChild(s.getRoot());

        return s;
    }
}
