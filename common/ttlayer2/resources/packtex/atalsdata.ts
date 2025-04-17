// import { DataStream } from "../../utils/stream/datastream.js";
// import { ITransfer, Transfer_Uint8, TransferMode } from "../../utils/stream/transfer.js";
// import { ElementFormat } from "../../ttlayer2.js";



// export class SpriteData implements ITransfer {
//     index: number = 0;
//     //中心点
//     pivotX: number = 0;
//     pivotY: number = 0;
//     //尺寸
//     sizeX: number = 0;
//     sizeY: number = 0;
//     //format
//     format: ElementFormat = ElementFormat.RGBA;
//     //pixels
//     data: number[] = [];//

//     //得到一个像素的容量
//     GetPixelSize(): number {
//         if (this.format == ElementFormat.RGBA)
//             return 4;
//         else
//             return 1;
//     }
//     //得到Data的容量
//     GetDataSize(): number {
//         if (this.format == ElementFormat.RGBA)
//             return this.sizeX * this.sizeY * 4;
//         else
//             return this.sizeX * this.sizeY;
//     }
//     ReadMutli(count: number, func: () => number): number[] {
//         let arr: number[] = [];

//         for (let i = 0; i < count; i++)
//             func();
//         return arr;
//     }
//     WriteMutli(count: number, data: number[], func: (v: number) => void): number[] {
//         let arr: number[] = [];
//         for (let i = 0; i < count; i++)
//             func(data[i]);
//         return arr;
//     }
//     Transfer(stream: DataStream, mode: TransferMode): void {
//         if (mode == TransferMode.Read) {
//             this.index = stream.ReadU16();

//             this.sizeX = stream.ReadDynUInt();
//             this.sizeY = stream.ReadDynUInt();
//             this.pivotX = stream.ReadDynUInt();
//             this.pivotY = stream.ReadDynUInt();
//             this.format = stream.ReadByte();

//             //玩个花活
//             let readfunc = (this.GetPixelSize() == 1 ? stream.ReadByte : stream.ReadU32).bind(stream);

//             this.data = this.ReadMutli(this.sizeX * this.sizeY, readfunc);

//         }
//         else {
//             stream.WriteU16(this.index);
//             stream.WriteDynUInt(this.sizeX);
//             stream.WriteDynUInt(this.sizeY);
//             stream.WriteDynUInt(this.pivotX);
//             stream.WriteDynUInt(this.pivotY);
//             stream.WriteByte(this.format);

//             let writefunc = (this.GetPixelSize() == 1 ? stream.WriteByte : stream.WriteU32).bind(stream);

//             this.WriteMutli(this.sizeX * this.sizeY, this.data, writefunc);
//         }
//     }
// }
// //Sprite 数据集
// export class SpriteDataAtlas implements ITransfer {
//     Transfer(stream: DataStream, mode: TransferMode): void {
//         //transfer Head
//         let spriteNum = 0;
//         let NameNum = 0;
//         let keys: string[] = []
//         if (mode == TransferMode.Read) {
//             let magichead = stream.ReadStr();
//             if (magichead != "atlas")
//                 throw "error head.";

//             spriteNum = stream.ReadDynUInt();
//             NameNum = stream.ReadDynUInt();

//         }
//         else {
//             let magichead = "atlas";
//             stream.WriteStr(magichead);

//             spriteNum = this.sprites.length;

//             for (let key in this.spriteNameMap) {
//                 keys.push(key);
//             }
//             NameNum = keys.length;
//             stream.WriteDynUInt(spriteNum);
//             stream.WriteDynUInt(NameNum);
//         }

//         //transfer Sprite
//         if (mode == TransferMode.Read) {
//             this.sprites = [];
//             for (var i = 0; i < spriteNum; i++) {
//                 this.sprites.push(new SpriteData());
//             }
//         }
//         for (var i = 0; i < spriteNum; i++) {
//             this.sprites[i].Transfer(stream, mode);
//         }

//         //transfer NamedInfo
//         if (mode == TransferMode.Read) {
//             this.spriteNameMap = {};
//             for (var i = 0; i < NameNum; i++) {
//                 let key = stream.ReadStr();
//                 let value = stream.ReadU16();
//                 this.spriteNameMap[key] = value;
//             }
//         }
//         else {
//             for (var i = 0; i < NameNum; i++) {
//                 let key = keys[i];
//                 let value = this.spriteNameMap[key];
//                 stream.WriteStr(key);
//                 stream.WriteU16(value);
//             }
//         }
//     }
//     sprites: SpriteData[] = [];
//     spriteNameMap: { [id: string]: number } = {}
//     GetSpriteByIndex(index: number): SpriteData {
//         return this.sprites[index];
//     }
//     GetSpriteIndex(name: string): number {
//         let index = this.spriteNameMap[name];
//         if (index == undefined)
//             return -1;
//         return index;
//     }

// }
