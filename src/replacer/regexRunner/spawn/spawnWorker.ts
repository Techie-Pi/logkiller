import {Worker} from "worker_threads";
import {createLogger} from "../../../logger";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function spawnWorker(matcher: RegExp, string: string, replaceValue: string, timeout: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const regexThread = new Worker(`${__dirname}/workers/worker.js`);

        regexThread.on("message", result => {
            let message = null;
            tryCatch(() => message = JSON.parse(result), reject);

            if(!message) return;

            // @ts-ignore - Message is set on the tryCatch(...)
            if(message.result != null) {
                // @ts-ignore - Message is set on the tryCatch(...)
                resolve(message.result);
            }
            else {
                // @ts-ignore - Message is set on the tryCatch(...)
                reject(message.error);
            }
        })

        regexThread.postMessage(JSON.stringify({
            timeout: timeout,
            regex: {
                flags: matcher.flags,
                source: matcher.source,
            },
            replace: replaceValue,
            string,
        }));
    })
}

const tryCatch = (fn: () => void, handler: (error: any) => void): void => {
    try { fn() } catch(e) { handler(e); }
}

export {
    spawnWorker,
}
