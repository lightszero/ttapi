import { tt } from "../../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Button, QUI_Label } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "../test_base.js";

export class Test_Info extends Test_Base {

    OnInit(nav: TTState_All): void {
        super.OnInit(nav);

        let gl = tt.graphic.GetWebGL();
        this.AddLabel("DevicePixelRadio=" + tt.graphic.getDevicePixelRadio());
        this.AddLabel("font MAX_UNIFORM_BLOCK_SIZE=" + gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE));
        this.AddLabel("MAX_3D_TEXTURE_SIZE=" + gl.getParameter(gl.MAX_3D_TEXTURE_SIZE));
        this.AddLabel("MAX_ARRAY_TEXTURE_LAYERS=" + gl.getParameter(gl.MAX_ARRAY_TEXTURE_LAYERS));
        this.AddLabel("MAX_TEXTURE_SIZE=" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
        this.AddLabel("MAX_VERTEX_UNIFORM_BLOCKS=" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_BLOCKS));
        this.AddLabel("MAX_VERTEX_UNIFORM_COMPONENTS=" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_COMPONENTS));
    }

}