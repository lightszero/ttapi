import { tt } from "../../ttapi/ttapi.js";
import { Color, QUI_Button, QUI_Canvas, QUI_Container, QUI_HAlign, QUI_Panel_Scroll, Resources } from "../../ttlayer2/ttlayer2.js";

export class UI_Main extends QUI_Container {

    constructor() {
        super();
        this.InitUI();
    }
    scroll: QUI_Panel_Scroll;
    InitUI(): void {
        let label = Resources.CreateGUI_Label("主菜单 02");
        this.addChild(label);
        label.localRect.setHPosByCenter(100);
        label.localRect.setVPosByTopBorder(24, 16);

        {
            let label2 = Resources.CreateGUI_Label("首先你需要一个Group", Color.White, 0.5);
            this.addChild(label2);
            label2.localRect.setHPosFill(16, 16);
            label2.halign = QUI_HAlign.Left;
            label2.localRect.setVPosByTopBorder(24, 32);
        }
        {
            let label2 = Resources.CreateGUI_Label("一个group能包含多个图片、角色或动画", Color.White, 0.5);
            this.addChild(label2);
            label2.localRect.setHPosFill(16, 16);
            label2.halign = QUI_HAlign.Left;
            label2.localRect.setVPosByTopBorder(24, 44);
        }
        {
            let label2 = Resources.CreateGUI_Label("这样我们能更方便的管理资源", Color.White, 0.5);
            this.addChild(label2);
            label2.localRect.setHPosFill(16, 16);
            label2.halign = QUI_HAlign.Left;
            label2.localRect.setVPosByTopBorder(24, 56);
        }

        let scroll = this.scroll = new QUI_Panel_Scroll();
        scroll.borderElement = Resources.CreateGUI_Border();
        this.addChild(scroll);

        scroll.localRect.setAsFill();
        scroll.localRect.offsetY1 = 76;
        scroll.localRect.offsetY2 = -16;

        this.UpdateGroup();
    }
    OnUpdate(canvas: QUI_Canvas, delta: number): void {
        this.scroll.panelWidth = this.scroll.getWorldRect().Width;
        super.OnUpdate(canvas, delta);
    }
    async GetGroupNames(): Promise<string[]> {
        let gtxt = await tt.store.GetText("groupnames");
        if (gtxt != null) {
            let ar = JSON.parse(gtxt) as string[];
            //对AR去重
            let od: { [id: string]: number } = {};
            for (var i = 0; i < ar.length; i++) {

                od[ar[i]] = 1

            }
            let ks: string[] = [];
            for (var key in od) {
                ks.push(key);
            }
            return ks;
        }

        return [];
    }
    async SetGroupMames(names: string[]) {
        let t = JSON.stringify(names);
        await tt.store.SaveText("groupnames", t);
    }
    async UpdateGroup() {
        await tt.store.Init();
        this.scroll.removeChildAll();
        let y = 0;
        let groups = await this.GetGroupNames();
        //创建默认group
        if (groups.length == 0) {
            await this.NewGroup("newGroup");
            return;
        }
        console.log("update groups:" + groups);
        for (let i = 0; i < groups.length; i++) {
            let txt = Resources.CreateGUI_Button("Group:" + groups[i],Color.White,0.75);
            txt.localRect.setHPosFill(16, 64);
            txt.localRect.setVPosByTopBorder(20, y);
            this.scroll.addChild(txt);

            let bdel = Resources.CreateGUI_Button("del",new Color(1,0.3,0.3,1),0.75);
            bdel.localRect.setHPosByRightBorder(48, 16);
            //bdel.localRect.radioX1 = -1;
            //bdel.localRect.offsetX1 = -80;
            bdel.localRect.setVPosByTopBorder(20, y);
            this.scroll.addChild(bdel);
            let groupname = groups[i];
            bdel.OnClick = async () => {
                await this.RemoveGroup(groupname);
            };
            y += 24;
        }

        let btnNew = Resources.CreateGUI_Button("Create Group",new Color(1,1,0.3,1),0.75);
        btnNew.localRect.setHPosFill(16, 16);
        btnNew.localRect.setVPosByTopBorder(24, y);
        y += 24;
        this.scroll.addChild(btnNew);
        btnNew.OnClick = async () => {
            let name = await tt.input.Prompt("为Group取个名字", "newGroup", 32);
            await this.NewGroup(name);
        }
    }
    async NewGroup(name: string) {
        if (name == null || name == "")
            return;
        let gnames = await this.GetGroupNames();
        gnames.push(name);
        await this.SetGroupMames(gnames);
        await this.UpdateGroup();
    }
    async RemoveGroup(name: string) {
        if (name == null || name == "")
            return;
        let gnames = await this.GetGroupNames();
        let i = gnames.indexOf(name);
        if (i < 0)
            return;
        gnames.splice(i, 1);
        await this.SetGroupMames(gnames);
        await this.UpdateGroup();
    }
}