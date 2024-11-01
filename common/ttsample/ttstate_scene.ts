import { tt } from "../ttapi/ttapi.js";
import { Font } from "../ttlayer2/atlas/font.js";
import { Vector3 } from "../ttlayer2/math/vector.js";
import { Comp_Label } from "../ttlayer2/pipeline/component/comp_label.js";
import { Comp_ParticleSystem } from "../ttlayer2/pipeline/component/comp_particlesystem.js";
import { Comp_ParticleSystem_TF, ParticleInfo } from "../ttlayer2/pipeline/component/comp_particlesystem_tf.js";
import { Comp_Sprite } from "../ttlayer2/pipeline/component/comp_sprite.js";
import { SceneView } from "../ttlayer2/pipeline/sceneview.js";

import { GameApp, IState, SceneItem, SceneItem_Group } from "../ttlayer2/ttlayer2.js";


export class TTState_Scene implements IState {

    subgroup: SceneItem_Group;
    comp_p: Comp_ParticleSystem;

    private font: Font = null;
    private comp_l: Comp_Label = null;
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
            sceneitem.scale.X = 5;
            sceneitem.scale.Y = 5;
            view.root.AddChild(sceneitem);
            let comp = this.comp_p = new Comp_ParticleSystem();

            sceneitem.AddComponment(comp);
        }

        {
            let sceneitem = new SceneItem();
            sceneitem.scale.X = 1;
            sceneitem.scale.Y = 1;
            sceneitem.pos.X = -150;
            sceneitem.pos.Y = -150;
            view.root.AddChild(sceneitem);
            let comp = this.comp_l = new Comp_Label();
            comp.font = this.font = new Font(tt.graphic.GetWebGL(), "VonwaonBitmap-16px", 24);
            comp.text = "FPS:label";
            sceneitem.AddComponment(comp);
        }
    }
    private _timer: number = 0;
    private _framecount: number = 0;

    OnUpdate(delta: number): void {


        this._timer += delta;
        this._framecount++;
        if (this._timer > 1.0) {
            let _fps = (((this._framecount / this._timer) * 10 + 0.5) | 0) / 10;
            this.comp_l.text = "FPS:" + _fps;
            this._framecount = 0;
            this._timer -= 1.0;
        }

        this.subgroup.rotate += delta;
        let pss: ParticleInfo[] = [];
        let ranpos = new Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, 0);
        for (var i = 0; i < 10; i++) {
            let p = new ParticleInfo();
            p.pos = ranpos;
            p.normal = new Vector3(Math.random() - 0.5, Math.random() - 0.5, 0);
            let norlen = Math.sqrt(p.normal.X * p.normal.X + p.normal.Y * p.normal.Y + p.normal.Z * p.normal.Z);
            p.normal.X /= norlen;
            p.normal.Y /= norlen;
            p.normal.Z /= norlen;
            pss.push(p);
        }
        this.comp_p.UpdateParticles(pss);
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


}