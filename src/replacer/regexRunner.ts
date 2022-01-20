import {Worker} from "worker_threads";

import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tryCatch = (fn: () => void, handler: (error: any) => void): void => {
    try { fn() } catch(e) { handler(e); }
}

function run(matcher: RegExp, string: string, replaceValue: string, timeout?: number): Promise<string> {
    /// Each 500k lines, 500ms are added to the timeout (on top of a base of 500ms). A top is set to 10500ms
    /// This means the following
    /// 0           -> 500ms
    /// 250_000     -> 750ms    (500ms          + 250ms)
    /// 500_000     -> 1000ms   (500ms          + 500ms)
    /// 1_000_000   -> 1500ms   (1000ms         + 500ms)
    /// 10_000_000  -> 10_500ms (10_000ms [top] + 500ms)
    const _timeout: number = timeout
        || Math.round((((string.length / 500_000) > 10_000 ? 10_000 : string.length / 500_000) * 500) + 500)

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
            timeout: _timeout,
            regex: {
                flags: matcher.flags,
                source: matcher.source,
            },
            replace: replaceValue,
            string,
        }));
    })
}

export {
    run,
}
