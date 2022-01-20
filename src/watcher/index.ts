import languages from "./languages";
import {watch} from "chokidar";

import {
    IWatcherApi,
    WatcherCallback,
    WatcherCallType,
    WatcherErrorCallback,
    WatcherIgnorableFiles
} from "./interfaces/IWatcherApi";
import {generateExtensionsRegexFromArray} from "./utils";
import {createLogger} from "../logger";

// @ts-ignore
class WatcherApi implements IWatcherApi {
    private readonly logger = createLogger("Watcher API");
    private readonly sourceCodeExtensions: string[] = languages;
    private readonly path: string;

    constructor(path: string) {
        this.path = path;
    }

    watch(
        callback: WatcherCallback,
        errorCallback?: WatcherErrorCallback,
        options?: {
            ignoredFiles?: WatcherIgnorableFiles,
            ignoreInitialFiles?: boolean,
            subscribeTo?: WatcherCallType[],
        }
    ): void {
        let filesToIgnore: string[] = [];

        if(options?.ignoredFiles != null) {
            let filesToIgnoreArray: string[] = options?.ignoredFiles;
            options?.ignoredFiles.map(val => {
                if(val !== "source-code") return val;

                this.logger.warn(
                    "You shouldn't use the `source-code` blocklist array in production! It could be a security risk!"
                );

                generateExtensionsRegexFromArray(this.sourceCodeExtensions, this.path).forEach(val => filesToIgnoreArray.push(val))
                return "";
            })
            filesToIgnore = filesToIgnoreArray;
        }

        const watcher = watch(this.path, {
            persistent: true,

            ignored: new RegExp(`/${filesToIgnore.join("|")}/`),
            ignoreInitial: options?.ignoreInitialFiles || undefined,
            atomic: true,
        });

        options?.subscribeTo?.forEach(subscription => {
            watcher.on(subscription, callback);
        })

        if(options?.subscribeTo == null) {
            watcher.on("add", callback);
            watcher.on("change", callback);
            watcher.on("unlink", callback);
        }

        if(errorCallback != null) {
            watcher.on("error", errorCallback);
        }
    }
}

export default WatcherApi;
