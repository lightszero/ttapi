var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QUI_Direction2, QUI_Grow, QUI_Menu, QUI_Panel, QUI_Resource } from "../../ttlayer2/ttlayer2.js";
import { IOExt } from "../../xioext/ioext.js";
import { WorkingDir } from "../work/workingdir.js";
import { MainEditor } from "./maineditor.js";
import { PickTTDialog } from "./pickttdialog.js";
export function InitMainMenu(canvas) {
    let menu;
    let titlebar = new QUI_Panel();
    canvas.AddChild(titlebar);
    titlebar.localRect.setVPosByTopBorder(22);
    let grow = new QUI_Grow();
    titlebar.container = grow;
    grow.direction = QUI_Direction2.Horizontal;
    menu = new QUI_Menu();
    let submenuFile = new QUI_Menu();
    menu.items.push({ label: "File", sprite: null, submenu: submenuFile, onaction: null });
    menu.items.push({ label: "Info", sprite: null, submenu: null, onaction: null });
    menu.items.push({ label: "其它", sprite: null, submenu: null, onaction: null });
    menu.items.push({ label: "Help", sprite: QUI_Resource.GetSprite("round"), submenu: null, onaction: null });
    submenuFile.items.push({
        label: "打开工作目录", sprite: QUI_Resource.GetSprite("corner"), submenu: null, onaction: () => {
            OnOpenWorkingDir(canvas);
        }
    });
    submenuFile.items.push({ label: "编辑", sprite: QUI_Resource.GetSprite("border"), submenu: submenuFile, onaction: null });
    menu.FillTo(canvas, grow);
}
function OnOpenWorkingDir(canvas) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("open.");
        let r = yield IOExt.Picker_Folder();
        if (r != null) {
            WorkingDir.Open(r);
            yield PickTTDialog.Show(canvas); //这个对话框 会调用 WorkingDir.SetEditFile
            MainEditor.Open();
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbm1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWlubWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWMsY0FBYyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JILE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUdqRCxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQWtCO0lBQzNDLElBQUksSUFBYyxDQUFDO0lBQ25CLElBQUksUUFBUSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7SUFFL0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDMUIsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDO0lBRzNDLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQ3RCLElBQUksV0FBVyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFFakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ1gsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQ3hFLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDWCxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FDakUsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNYLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUMvRCxDQUFDO0lBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ1gsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUM1RixDQUFDO0lBQ0YsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBR2Q7UUFDSSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNyRixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQ0osQ0FDSixDQUFDO0lBQ04sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBRWQsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUNsRyxDQUFDO0lBRU4sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUNELFNBQWUsZ0JBQWdCLENBQUMsTUFBa0I7O1FBRTlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsTUFBTSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7WUFDWixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLGtDQUFrQztZQUNsRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUVMLENBQUM7Q0FBQSJ9