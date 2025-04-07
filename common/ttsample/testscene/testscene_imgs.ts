
import { DrawLayer_GUI, DrawLayer_Scene,GameApp } from "../../ttlayer2/ttlayer2.js";
import { Test_Base } from "../testview/test_base.js";
import { TTState_All } from "../ttstate_all.js";

export class TestScene_Imgs extends Test_Base {
    scenelayer: DrawLayer_Scene;
    guilayer:DrawLayer_GUI;
    constructor()
    {
        super();
        this.guilayer =new DrawLayer_GUI();
        this.scenelayer =new DrawLayer_Scene();
        GameApp.GetViewList().AddDrawLayer(this.scenelayer);
        GameApp.GetViewList().AddDrawLayer(this.guilayer);
    }
    OnInit(nav: TTState_All): void {    
        super.OnInit(nav);
      
    }
}