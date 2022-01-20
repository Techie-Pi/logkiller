export type WatcherCallType = "add" | "change" | "unlink" | "addDir" | "unlinkDir" | "ready" | "raw";

export type WatcherCallback = (...data: any[]) => void;
export type WatcherErrorCallback = () => void;

export type WatcherIgnorableFiles = ["source-code" | string];

export interface IWatcherApi {
    constructor(path: string): void,
    watch(
        callback: WatcherCallback,
        errorCallback?: WatcherErrorCallback,
        options?: {
            ignoredFiles?: WatcherIgnorableFiles,
            ignoreInitialFiles?: boolean,
            subscribeTo?: WatcherCallType[],
        }
    ): void,
}
