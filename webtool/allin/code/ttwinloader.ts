import { tt } from "../ttlayer2/ttlayer2.js"
import { ttwin } from "./ttwin.js";

export class ttwinloader implements tt.ILoader {
    GetPathSplitChar(): string {
        return "/";
    }
    async LoadStringAsync(name: string): Promise<string> {
        return (await ttwin.File_ReadText(name)).text;
    }
    async LoadBinaryAsync(name: string): Promise<ArrayBuffer> {
        return ((await ttwin.File_ReadBinary(name)).data);
    }
    async LoadImageAsync(name: string): Promise<HTMLImageElement> {
        var bytes: ArrayBuffer = ((await ttwin.File_ReadBinary(name)).data);
        var b = new Blob([bytes]);
        var url = URL.createObjectURL(b);
        return await tt.loader.LoadImageAsync(url);
    }
    async LoadImageDataAsync(name: string): Promise<ImageData> {
        var bytes: ArrayBuffer = ((await ttwin.File_ReadBinary(name)).data);
        var b = new Blob([bytes]);
        var url = URL.createObjectURL(b);
        return await tt.loader.LoadImageDataAsync(url);
    }
    async LoadCustomFont(name: string, url: string): Promise<string> {
        throw new Error("Not support this.");
    }

}