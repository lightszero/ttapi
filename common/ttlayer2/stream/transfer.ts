import { DataStream } from "./datastream.js";

export enum TransferMode {
    Read,
    Write,
}

export interface ITransfer {
    Transfer(stream: DataStream, mode: TransferMode): void
}
export class Transfer_Uint8 implements ITransfer {
    value: number = 0;
    Transfer(stream: DataStream, mode: TransferMode): void {
        if (mode == TransferMode.Write) {
            stream.WriteByte(this.value);
        }
        else {
            this.value = stream.ReadByte();
        }
    }
}