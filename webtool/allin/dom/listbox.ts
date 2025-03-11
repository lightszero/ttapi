import { BaseElement, Color32, IElement, LabelButton, Panel } from "./dombase.js";

export class ListBox extends Panel {
    AddChild(elem: IElement): void {
        throw new Error("use AddItem");
    }
    AddItem(text: string, tag: any): void {
        let button = new LabelButton(text);
        button._root.style.right = "0 px";
        button._root.style.left = "0 px";
        super.AddChild(button);
        (button as any)._tag = tag;
        button.onClick = () => {
            this.OnClick(button);
            if (this.OnPick != null)
                this.OnPick(text, tag);
        }
    }
    OnClick(btn: LabelButton): void {
        if (this._picked != null) {
            this._picked.colorBack = (new Color32(0, 0, 0, 0));
            this._picked.UpdateColor();
        }
        this._picked = btn;
        this._picked.colorBack = new Color32(128, 128, 0, 128);
        this._picked.UpdateColor();
    }
    Select(index: number): void {
        this.OnClick(this.GetChild(index) as LabelButton);
    }
    private _picked: LabelButton;
    OnPick: (text: string, tag: string) => void;
    GetPickedText(): string {
        if (this._picked == null)
            return null;
        return this._picked.getText();
    }
    GetPickedTag(): string {
        if (this._picked == null)
            return null;
        return (this._picked as any).text;
    }
}