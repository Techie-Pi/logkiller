import "dotenv/config";

import Watcher from "./watcher";
import {checkAndReplaceFile} from "./taskmaster";

function start() {
    const path = process.env.WATCHER_ABSOLUTE_PATH;

    if(path == null) {
        throw new Error("The environment variable \"WATCHER_ABSOLUTE_PATH\" is not defined: unknown path to watch!");
    }

    const watcher = new Watcher(path);

    const skip: any = {};
    watcher.watch(async (path, ...data) => {
        console.log(path, "called!", Date.now());
        if(skip[path] === true) return;

        skip[path] = true;
        await checkAndReplaceFile(path);
        skip[path] = false;
    }, undefined, {
        ignoredFiles: ["source-code"],
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
