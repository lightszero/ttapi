import { tt } from "../ttapi/ttapi.js";
import { ElectronFunc } from "./electronfunc";

export class ElectronLoader implements tt.ILoader {
    GetPathSplitChar(): string {
        return "/";
    }
    async LoadStringAsync(name: string): Promise<string> {
        return await ElectronFunc.Instance.file_readtext(name);
    }
    async LoadBinaryAsync(name: string): Promise<ArrayBuffer> {
        let bin = await ElectronFunc.Instance.file_readbin(name);
        return bin;
    }
    async LoadImageAsync(name: string): Promise<HTMLImageElement> {
        let bin = await ElectronFunc.Instance.file_readbin(name);
        let blob = new Blob([bin]);
        let burl = URL.createObjectURL(blob)
        return await tt.loader.LoadImageAsync(name);
    }
    async LoadImageDataAsync(name: string): Promise<ImageData> {
        let bin = await ElectronFunc.Instance.file_readbin(name);
        let blob = new Blob([bin]);
        let burl = URL.createObjectURL(blob)
        return await tt.loader.LoadImageDataAsync(name);
    }
    async LoadCustomFont(name: string, url: string): Promise<string> {
        let bin = await ElectronFunc.Instance.file_readbin(name);
        let blob = new Blob([bin]);
        let burl = URL.createObjectURL(blob);
        return await tt.loader.LoadCustomFont(name, url);
    }
}