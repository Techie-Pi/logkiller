import Watcher from "./watcher";
import {checkAndReplaceFile} from "./taskmaster";
import {createLogger} from "./logger";
import Config from "./config";
import {ConfigTypesEnvironment} from "./config/interfaces/IConfigApi";

const logger = createLogger("Main");

const includesAny = (string: string, array: string[]) => {
    let includes = false;
    array.forEach(val => includes = string.includes(val) ? true : includes)
    return includes;
}

function start() {
    const developmentMode = Config.getBoolean(ConfigTypesEnvironment.DevelopmentMode) || false;
    const path = Config.getString(ConfigTypesEnvironment.AbsolutePath);

    if(path == null) {
        throw new Error("The environment variable \"WATCHER_ABSOLUTE_PATH\" is not defined: unknown path to watch!");
    }

    const watcher = new Watcher(path);
    const skip: any = {};
    watcher.watch(async (path: string, ...data) => {
        if(developmentMode && includesAny(path, [".idea", ".git", ".env", "xml"])) return;
        if(skip[path] === true) return;

        const splittedPath = path.split(/\\|\\\\|\/|\/\//g);
        logger.debug(`Detected file change at ${splittedPath[splittedPath.length - 1]}`);

        /// This prevents any infinite loop caused by writing the filed received
        skip[path] = true;
        await checkAndReplaceFile(path);
        skip[path] = false;
    }, undefined, {
        ignoredFiles: [Config.getString(ConfigTypesEnvironment.IgnoredFilesRegex) || "source-code"],
        ignoreInitialFiles: true,
    });
}

try {
    start();
}
catch(e) {
    console.error(e);
    process.exit(1);
}
