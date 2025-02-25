///<refrence path ="../jsoneditor/jsoneditor.d.ts"/>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ttwin } from "./ttwin.js";
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    let b = yield ttwin.Init(true);
    console.log("ttwin has init.");
    let div = document.createElement("div");
    document.body.appendChild(div);
    let e = new JSONEditor(div, { mode: "code", modes: ["code", "tree"] }, {});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9EQUFvRDs7Ozs7Ozs7OztBQUdwRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBUyxFQUFFO0lBQ3ZCLElBQUksQ0FBQyxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFL0IsSUFBSSxHQUFHLEdBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQixJQUFJLENBQUMsR0FBRSxJQUFLLFVBQVUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsRUFBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZFLENBQUMsQ0FBQSxDQUFBIn0=