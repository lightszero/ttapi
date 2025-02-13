import { IRectangle, Rectangle } from "./geom/Rectangle.js";


export const EDGE_MAX_VALUE: number = 4096;
export const EDGE_MIN_VALUE: number = 128;
export enum PACKING_LOGIC {
    MAX_AREA = 0,
    MAX_EDGE = 1
}


/**
 * Options for MaxRect Packer
 *
 * @property {boolean} options.smart Smart sizing packer (default is true)
 * @property {boolean} options.pot use power of 2 sizing (default is true)
 * @property {boolean} options.square use square size (default is false)
 * @property {boolean} options.allowRotation allow rotation packing (default is false)
 * @property {boolean} options.tag allow auto grouping based on `rect.tag` (default is false)
 * @property {boolean} options.exclusiveTag tagged rects will have dependent bin, if set to `false`, packer will try to put tag rects into the same bin (default is true)
 * @property {boolean} options.border atlas edge spacing (default is 0)
 * @property {PACKING_LOGIC} options.logic MAX_AREA or MAX_EDGE based sorting logic (default is MAX_EDGE)
 * @export
 * @interface Option
 */
export interface IOption {
    smart?: boolean
    pot?: boolean
    square?: boolean
    allowRotation?: boolean
    tag?: boolean
    exclusiveTag?: boolean
    border?: number
    logic?: PACKING_LOGIC
}


export interface IBin {
    width: number
    height: number
    maxWidth: number
    maxHeight: number
    freeRects: IRectangle[]
    rects: IRectangle[]
    options: IOption
    [propName: string]: any
}

export abstract class Bin<T extends IRectangle> implements IBin {
    public width!: number;
    public height!: number;
    public maxWidth!: number;
    public maxHeight!: number;
    public freeRects!: IRectangle[];
    public rects!: T[];
    public options!: IOption;
    public abstract add (rect: T): T | undefined;
    public abstract add (width: number, height: number, data: any): T | undefined;
    public abstract reset (deepRest: boolean): void;
    public abstract repack (): T[] | undefined;

    public data?: any;
    public tag?: string;

    protected _dirty: number = 0;
    get dirty (): boolean { return this._dirty > 0 || this.rects.some(rect => rect.dirty); }
    /**
     * Set bin dirty status
     *
     * @memberof Bin
     */
    public setDirty (value: boolean = true): void {
        this._dirty = value ? this._dirty + 1 : 0;
        if (!value) {
            for (let rect of this.rects) {
                if (rect.setDirty) rect.setDirty(false);
            }
        }
    }

    public abstract clone (): Bin<T>;
}
