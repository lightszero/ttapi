import { Comp_ParticleSystem } from "../ttlayer2/pipeline/component/comp_particlesystem.js";
import { Comp_Sprite } from "../ttlayer2/pipeline/component/comp_sprite.js";
import { SceneView } from "../ttlayer2/pipeline/sceneview.js";

import { GameApp, IState, SceneItem, SceneItem_Group } from "../ttlayer2/ttlayer2.js";

export class TTState_Scene implements IState {

    subgroup: SceneItem_Group;
    OnInit(): void {
        let defscene = GameApp.GetScene().views[0];

        //10个子物体
        for (var i = 0; i < 1; i++) {
            let sceneitem = new SceneItem();

            sceneitem.pos.X = i * 20;
            defscene.root.AddChild(sceneitem);
            let comp = new Comp_Sprite();
            comp.color.G = 0;
            sceneitem.AddComponment(comp);
        }

        //子物体
        this.subgroup = new SceneItem_Group();
        this.subgroup.pos.Y = 20;
        defscene.root.AddChild(this.subgroup);
        for (var i = 0; i < 10; i++) {
            let sceneitem = new SceneItem();
            sceneitem.pos.X = i * 20;
            sceneitem.pos.Y = 0;
            this.subgroup.AddChild(sceneitem);
            let comp = new Comp_Sprite();
            sceneitem.AddComponment(comp);
        }
        console.log("hello ha.")

        let view = new SceneView();
        GameApp.GetScene().views.push(view);
        {
            let sceneitem = new SceneItem();
            sceneitem.scale.X = 10;
            sceneitem.scale.Y = 10;
            view.root.AddChild(sceneitem);
            let comp = new Comp_ParticleSystem();

            sceneitem.AddComponment(comp);
        }
    }
    OnUpdate(delta: number): void {
        this.subgroup.rotate += delta;
    }
    OnExit(): void {
        //状态机过分暴躁,清理一下,需要一个UI栈
        let defscene = GameApp.GetScene().views[0];
        let items = defscene.root.GetItems();
        for (var i = 0; i < items.length; i++) {
            defscene.root.RemoveChild(items[i]);
        }
    }
    OnResize(width: number, height: number): void {

    }
    OnPreRender(): void {

    }
    OnPostRender(): void {

    }

}