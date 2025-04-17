

//主窗口上的功能
export interface IWinMgr {
    name: string;
}
export async function NextFrame(): Promise<void> {
    return new Promise((resolve, reject) => {
        requestAnimationFrame(() => {
            resolve();
        });
    });
}
export async function GetWinTag(): Promise<string> {
    let tag = (window as any)["__tag__"];
    if (tag == undefined)
        await NextFrame();
    return (window as any)["__tag__"];
}
export async function GetWinMgr(): Promise<IWinMgr> {
    if (await GetWinTag() == "mainwin") {
        return (window as any)["__winmgr__"];
    }
    else {
        return (window.top as any)["__winmgr__"];
    }
}