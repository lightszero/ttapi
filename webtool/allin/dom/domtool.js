export * from "./dombase.js";
export * from "./splitter.js";
export * from "./group.js";
export * from "./canvas.js";
export * from "./canvasraw.js";
//export * from "./preview.js";
//export * from "./palette.js"
export * from "./toolbar.js";
export * from "./menu.js";
//export * from "./palrgb.js"
import { Screen } from "./dombase.js";
export class DomTool {
    static Init() {
        document.body.style.backgroundColor = "#000";
        document.body.style.color = "#fff";
        this.screen = new Screen();
    }
    static InitFullScreen() {
        document.body.style.backgroundColor = "#000";
        document.body.style.color = "#fff";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.position = "absolute";
        document.body.style.margin = "0px";
        document.body.style.padding = "0px";
        document.body.style.overflow = "hidden";
        document.body.style.transform = "scale(1,1)";
        document.body.style.userSelect = "none";
        window.addEventListener('mousewheel', function (e) {
            e = e || window.event;
            if ((e.wheelDelta && e.ctrlKey) || e.detail) {
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
        });
        window.addEventListener("mousedown", function (event) {
            if (event.button == 2) {
                event.preventDefault();
            }
        });
        this.screen = new Screen();
    }
    static get Screen() {
        return this.screen;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tdG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvbXRvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsY0FBYyxjQUFjLENBQUM7QUFDN0IsY0FBYyxlQUFlLENBQUM7QUFDOUIsY0FBYyxZQUFZLENBQUM7QUFDM0IsY0FBYyxhQUFhLENBQUM7QUFDNUIsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQiwrQkFBK0I7QUFDL0IsOEJBQThCO0FBQzlCLGNBQWMsY0FBYyxDQUFBO0FBQzVCLGNBQWMsV0FBVyxDQUFBO0FBQ3pCLDZCQUE2QjtBQUc3QixPQUFPLEVBQXdCLE1BQU0sRUFBbUIsTUFBTSxjQUFjLENBQUM7QUFHN0UsTUFBTSxPQUFPLE9BQU87SUFDaEIsTUFBTSxDQUFDLElBQUk7UUFDUCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1FBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBYztRQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1FBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQTtRQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ25DLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUE7UUFDekMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxR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