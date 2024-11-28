
//一个数据流的封装,dataview你自己提前放好容量
export class DataStream {
    constructor(dataview: DataView) {
        this.dataview = dataview;
        this.Reset();
    }
    dataview: DataView;
    pos: number = 0;
    maxpos: number = 0;
    lastpos: number = 0;
    Reset(): void {
        this.pos = 0;
        this.maxpos = 0;
        this.lastpos = 0;
    }
    AddPos(count: number): void {
        this.lastpos = this.pos;
        this.pos += count;
        this.maxpos = Math.max(this.pos, this.maxpos);
    }
    ReadByte(): number {
        let i = this.dataview.getUint8(this.pos);
        this.AddPos(1);
        return i;
    }
    WriteByte(value: number): void {
        this.dataview.setUint8(this.pos, value);
        this.AddPos(1);
    }
    ReadU16(): number {
        let v = this.dataview.getUint16(this.pos, true);
        this.AddPos(2);
        return v;
    }
    WriteU16(value: number): void {
        this.dataview.setUint16(this.pos, value, true);
        this.AddPos(2);
    }
    ReadU32(): number {
        let v = this.dataview.getUint32(this.pos, true);
        this.AddPos(2);
        return v;
    }
    WriteU32(value: number): void {
        this.dataview.setUint32(this.pos, value, true);
        this.AddPos(2);
    }
    ReadI32(): number {
        let v = this.dataview.getInt32(this.pos, true);
        this.AddPos(2);
        return v;
    }
    WriteI32(value: number): void {
        this.dataview.setInt32(this.pos, value, true);
        this.AddPos(2);
    }
    ReadFloat(): number {
        let v = this.dataview.getFloat32(this.pos, true);
        this.AddPos(2);
        return v;
    }
    WriteFloat(value: number): void {
        this.dataview.setFloat32(this.pos, value, true);
        this.AddPos(2);
    }


    ReadDynUInt(): number {
        let i = this.ReadByte();
        let itag1 = i >> 7;
        let itag2 = (i >> 6) & 0x01;
        let itag3 = (i >> 5) & 0x01;
        let itag4 = (i >> 3) & 0x01;
        let itag5 = (i >> 3) & 0x01;
        if (itag1 == 0)//单字节 0nnnnnnn 最大128
            return i;
        if (itag2 == 0)//双字节//10nnnnnn nnnnnnnn
        {
            let i2 = this.ReadByte();//10 nnnnnn nnnnnnnn,最大一万6
            return ((i & 0x3f) << 8) | (i2);
        }
        if (itag3 == 0)//三字节//110 nnnnn nnnnnnnn nnnnnnnn,最大两百万
        {
            let i2 = this.ReadByte();
            let i3 = this.ReadByte();
            return ((i & 0x1f) << 16) | (i2 << 8) | (i3);
        }
        if (itag4 == 0)//四字节 1110 nnnn nnnnnnnn nnnnnnnn nnnnnnnn ,最大表达到5个亿
        {
            let i2 = this.ReadByte();
            let i3 = this.ReadByte();
            let i4 = this.ReadByte();
            return ((i & 0x0f) << 24) | (i2 << 16) | (i3 << 8) | (i4);
        }
        if (itag5 == 0)//五字节 11110 nnn nnnnnnnn nnnnnnnn nnnnnnnn nnnnnnnn ,超过uint32表达能力,这种情况取 uint32 最大值
        {
            let i2 = this.ReadByte();
            let i3 = this.ReadByte();
            let i4 = this.ReadByte();
            let i5 = this.ReadByte();
            let ileft = i & 0x0f;
            if (ileft > 0)
                throw "ReadDynUInt 读取一个超过uint32 的数字";
            return (ileft << 32) | (i2 << 24) | (i3 << 16) | (i4 << 8) | (i5);
        }
        throw "ReadDynUInt 错误的格式";
    }
    WriteDynUInt(value: number): void {
        if (value < 0)
            throw "WriteDynUInt 写入一个负数";
        if (value > 0xffffffff)
            throw "WriteDynUInt 写入一个超过uint32 的数字";
        if (value > 0x0fffffff)//五字节 ,最大 ffffffff
        {
            let i = 0xf0;
            let i2 = value >> 24;
            let i3 = value >> 16;
            let i4 = value >> 8;
            let i5 = value & 0xff;
            this.WriteByte(i);
            this.WriteByte(i2);
            this.WriteByte(i3);
            this.WriteByte(i4);
            this.WriteByte(i5);
            return;
        }
        if (value > 0x1fffff)//四字节 1110 nnnn nnnnnnnn nnnnnnnn nnnnnnnn ,最大0fffffff 表达到5个亿
        {
            let i = 0xe0 | (value >> 24);
            let i2 = value >> 16;
            let i3 = value >> 8;
            let i4 = value & 0xff;
            this.WriteByte(i);
            this.WriteByte(i2);
            this.WriteByte(i3);
            this.WriteByte(i4);
            return;
        }
        if (value > 0x3fff)//三字节//110 nnnnn nnnnnnnn nnnnnnnn,最大1fffff 两百万
        {
            let i = 0xc0 | (value >> 16);
            let i2 = value >> 8;
            let i3 = value & 0xff;
            this.WriteByte(i);
            this.WriteByte(i2);
            this.WriteByte(i3);
            return;
        }
        if (value > 0x7f)//两字节//10nnnnnn nnnnnnnn 最大3fff 1万6
        {
            let i = 0x80 | (value >> 8);
            let i2 = value & 0xff;
            this.WriteByte(i);
            this.WriteByte(i2);
            return;
        }
        let i = value & 0xff;//一字节 0nnnnnnn 最大 7f
        this.WriteByte(i);
    }

    ReadStr(): string {
        let len = this.ReadDynUInt();
        let codes: number[] = [];
        for (let i = 0; i < len; i++) {
            codes.push(this.ReadDynUInt());
        }
        return String.fromCodePoint(...codes);
    }
    WriteStr(str: string): void {
        let codearr: number[] = [];
        for (let ch of str) {
            let code = ch.codePointAt(0);
            if (code != undefined)
                codearr.push();
        }
        this.WriteDynUInt(codearr.length);
        for (let i = 0; i < codearr.length; i++) {
            this.WriteDynUInt(codearr[i]);
        }
    }
   
}
