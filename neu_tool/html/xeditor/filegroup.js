"use strict";
// import { QUI_Grow, Color, QUI_Button, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Scroll, tt, Texture, TextureFormat, QUI_Overlay, QUI_Window, QUI_BaseContainer, QUI_ElementType } from "../ttlayer2/ttlayer2.js";
// import { TTPathTool } from "../ttlayer2/utils/path/pathtool.js";
// import { FindTool } from "../xioext/findtool.js";
// import { IOExt, IOExt_DirectoryHandle, IOExt_FileHandle } from "../xioext/ioext.js";
// import { PickAbleItem } from "./ui/pickitem.js";
// export class FileGroup extends QUI_Window {
//     constructor() {
//         super();
//         this.title.text = "File_List";
//         this.InitTitleBar();
//         let panelScroll = this.contextPanel = new QUI_Panel_Scroll();
//         panelScroll.localRect.SetAsFill();
//         panelScroll.localRect.offsetY1 = 22;
//         this.container.AddChild(panelScroll);
//     }
//     contextPanel: QUI_Panel_Scroll;
//     InitTitleBar() {
//         let titlebar = new QUI_Panel();
//         titlebar.localRect.setHPosFill();
//         titlebar.localRect.setVPosByTopBorder(22);
//         this.container.AddChild(titlebar);
//         let titlegrow = new QUI_Grow();
//         titlegrow.direction = QUI_Direction2.Horizontal;
//         titlebar.container.AddChild(titlegrow);
//         {
//             let btn = new QUI_Button();
//             btn.localRect.setBySize(90, 18);
//             let label = btn.elemNormal.GetChild(1) as QUI_Label;
//             label.text = "打开目录";
//             titlegrow.AddChild(btn);
//             btn.OnClick = async () => {
//                 let r = await IOExt.Picker_Folder();
//                 if (r != null)
//                     this.OnOpenFolder(r);
//             }
//         }
//         {
//             let btn = new QUI_Button();
//             btn.localRect.setBySize(90, 18);
//             let label = btn.elemNormal.GetChild(1) as QUI_Label;
//             label.text = "编辑选中";
//             titlegrow.AddChild(btn);
//             btn.OnClick = async () => {
//                 console.log("编辑选中")
//             }
//         }
//     }
//     async LoadFileToTexture(file: IOExt_FileHandle) {
//         let idata = await IOExt.File_ReadBinary(file);
//         let b = new Blob([idata]);
//         let imagedata = await tt.loaderex.LoadImageDataAsync(URL.createObjectURL(b));
//         let tex = new Texture(tt.graphic.GetWebGL(), imagedata.width, imagedata.height, TextureFormat.RGBA32,
//             imagedata.data);
//         return tex;
//     }
//     dir: IOExt_DirectoryHandle;
//     async OnOpenFolder(file: IOExt_DirectoryHandle) {
//         this.dir = file;
//         this.contextPanel.container.RemoveChildAll();
//         let result = await FindTool.FindAllFile(file, [".json", ".jpg", ".png"], 3);
//         for (var i = 0; i < result.length; i++) {
//             let con = new PickAbleItem<IOExt_FileHandle>(result[i]);
//             con.localRect.setBySize(500, 25);
//             this.contextPanel.container.AddChild(con);
//             let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
//             if (ext == ".jpg" || ext == ".png") {
//                 let img = new QUI_Image();
//                 let tex = await this.LoadFileToTexture(result[i]);
//                 con.image.SetByTexture(tex);
//             }
//             con.label.text = (result[i].isfile ? "[File]" : "[Path]")
//                 + result[i].name;
//         }
//     }
//     OnSaveFile(file: IOExt_FileHandle) {
//         console.log("OnCreateFile:" + file);
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0UEFBNFA7QUFDNVAsbUVBQW1FO0FBQ25FLG9EQUFvRDtBQUVwRCx1RkFBdUY7QUFDdkYsbURBQW1EO0FBR25ELDhDQUE4QztBQUM5QyxzQkFBc0I7QUFDdEIsbUJBQW1CO0FBQ25CLHlDQUF5QztBQUV6QywrQkFBK0I7QUFDL0Isd0VBQXdFO0FBQ3hFLDZDQUE2QztBQUM3QywrQ0FBK0M7QUFDL0MsZ0RBQWdEO0FBQ2hELFFBQVE7QUFDUixzQ0FBc0M7QUFFdEMsdUJBQXVCO0FBQ3ZCLDBDQUEwQztBQUMxQyw0Q0FBNEM7QUFDNUMscURBQXFEO0FBQ3JELDZDQUE2QztBQUU3QywwQ0FBMEM7QUFDMUMsMkRBQTJEO0FBQzNELGtEQUFrRDtBQUVsRCxZQUFZO0FBQ1osMENBQTBDO0FBQzFDLCtDQUErQztBQUMvQyxtRUFBbUU7QUFDbkUsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2QywwQ0FBMEM7QUFDMUMsdURBQXVEO0FBQ3ZELGlDQUFpQztBQUNqQyw0Q0FBNEM7QUFDNUMsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixZQUFZO0FBQ1osMENBQTBDO0FBQzFDLCtDQUErQztBQUMvQyxtRUFBbUU7QUFDbkUsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2QywwQ0FBMEM7QUFDMUMsc0NBQXNDO0FBQ3RDLGdCQUFnQjtBQUNoQixZQUFZO0FBQ1osUUFBUTtBQUVSLHdEQUF3RDtBQUN4RCx5REFBeUQ7QUFDekQscUNBQXFDO0FBQ3JDLHdGQUF3RjtBQUN4RixnSEFBZ0g7QUFDaEgsK0JBQStCO0FBQy9CLHNCQUFzQjtBQUN0QixRQUFRO0FBQ1Isa0NBQWtDO0FBQ2xDLHdEQUF3RDtBQUN4RCwyQkFBMkI7QUFDM0Isd0RBQXdEO0FBQ3hELHVGQUF1RjtBQUV2RixvREFBb0Q7QUFDcEQsdUVBQXVFO0FBQ3ZFLGdEQUFnRDtBQUNoRCx5REFBeUQ7QUFDekQseUVBQXlFO0FBQ3pFLG9EQUFvRDtBQUNwRCw2Q0FBNkM7QUFDN0MscUVBQXFFO0FBQ3JFLCtDQUErQztBQUMvQyxnQkFBZ0I7QUFHaEIsd0VBQXdFO0FBQ3hFLG9DQUFvQztBQUVwQyxZQUFZO0FBQ1osUUFBUTtBQUNSLDJDQUEyQztBQUMzQywrQ0FBK0M7QUFDL0MsUUFBUTtBQUVSLElBQUkifQ==