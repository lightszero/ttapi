
//declare var msgbox: (title: string, message: string) => void;

window.onload = () => {
    {
        let btn = document.createElement("button");
        btn.textContent = "send test.";
        document.body.appendChild(btn);
        btn.onclick = async () => {


            var r = await msgbox("aabca", "bddb");
            console.log("return " + r);
        }
    }
    {
        let btn = document.createElement("button");
        btn.textContent = "send test.";
        document.body.appendChild(btn);
        btn.onclick = async () => {


            var r = await openfile(null);
            console.log("return " + r);
        }
    }
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.backgroundColor = "#000";
    let app = new EditorMain(canvas);
    app.Start();
}

class EditorMain {
    constructor(canvas: HTMLCanvasElement) {

    }
    Start() {
        console.log("good.");
    }
}