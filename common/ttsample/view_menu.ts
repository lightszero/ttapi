import { tt } from "../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, QUI_Button, QUI_Label, QUI_ScreenFixer } from "../ttlayer2/ttlayer2.js";

import { Test_Box2D } from "./testbase/test_box2d.js";
import { Test_Element_TBO } from "./testbase/test_element_tbo.js";
import { Test_Element_UBO } from "./testbase/test_element_ubo.js";
import { Test_FileApi } from "./testpc/test_fileapi.js";
import { Test_Info } from "./testbase/test_info.js";
import { Test_TexArr } from "./testbase/test_texarr.js";
import { Test_Tiledmap } from "./testbase/test_tiledmap.js";
import { Test_TTPack } from "./testbase/test_ttpack.js";

import { GContext, TTState_All } from "./ttstate_all.js";
import { Editor_TTPack } from "./xeditor/editor_ttpack.js";
import { TestMenu_Base } from "./testbase/testmenu_base.js";
import { Test_Base } from "./test_base.js";
import { TestMenu_PC } from "./testpc/testmenu_pc.js";
import { TestMenu_Scene } from "./testscene/testmenu_scene.js";

export class View_Menu extends Test_Base {

    OnInit(nav: TTState_All): void {
        super.OnInit(nav);

        this.container = new QUI_ScreenFixer();

        
        this.container.setAsp(2 / 3, 1 / 2);//竖屏比例限制
        this.guilayer.GetCanvas().AddChild(this.container);
        this.AddLabel("TTEngine 测试菜单");
        this.AddButton("基本特性测试", () => {
            this.nav.NavigatorTo(new TestMenu_Base())
        });
        this.AddButton("PC浏览器特性测试", () => {
            this.nav.NavigatorTo(new TestMenu_PC())
        });
        this.AddButton("编辑器(PCOnly)", () => {
            this.nav.NavigatorTo(new Editor_TTPack())
        });
        this.AddButton("综合测试", () => {
            this.nav.NavigatorTo(new TestMenu_Scene())
        });

    }

}