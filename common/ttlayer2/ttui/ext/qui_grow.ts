import { ChildChangeState as QUI_ChildChangeState, QUI_BaseElement, QUI_Container, QUI_Direction2, QUI_ElementType } from "../qui_base.js";
import { QUI_Canvas } from "../qui_canvas.js";

export class QUI_Grow extends QUI_Container {
    constructor() {
        super()
        this.direction = QUI_Direction2.Vertical;
        this.width = 0;
        this.height = 0;
        this.localRect.SetAsFill();
    }
    direction: QUI_Direction2
    private width: number;
    private height: number;
    GetContextWidth() {
        return this.width;
    }
    GetContextHeight()
    {
        return this.height;
    }
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Container;
    }

    OnUpdate(canvas: QUI_Canvas, delta: number): void {
        super.OnUpdate(canvas, delta);
        if (this.childState == QUI_ChildChangeState.AddOne) {
            this.Grow(this._children[this._children.length - 1]);
            this.childState = QUI_ChildChangeState.NoChange;
        }
        else if (this.childState == QUI_ChildChangeState.Dirty) {
            this.UpdateAll();
            this.childState = QUI_ChildChangeState.NoChange;
        }
    }
    private Grow(elem: QUI_BaseElement) {
        if (this.direction == QUI_Direction2.Horizontal) {
            elem.localRect.setPos(this.width, 0);
            this.height = Math.max(elem.localRect.getHeight(), this.height);
            this.width += elem.localRect.getWidth();
        }
        else {
            elem.localRect.setPos(0, this.height);
            this.width = Math.max(elem.localRect.getWidth(), this.width);
            this.height += elem.localRect.getHeight();
        }
    }
    private UpdateAll() {
        this.width = 0;
        this.height = 0;
        for (var i = 0; i < this._children.length; i++) {
            this.Grow(this._children[i]);
        }
    }
}