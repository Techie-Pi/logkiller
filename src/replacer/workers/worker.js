import { isMainThread, parentPort } from "worker_threads";
import { createContext, Script } from "vm";

if(!isMainThread) {
    const script = new Script("result = string.replaceAll(regex, replace)");

    parentPort.on("message", value => {
        const data = JSON.parse(value);

        const sandbox = {
            regex: new RegExp(data.regex.source, data.regex.flags),
            string: data.string,
            replace: data.replace,
            result: null,
        };

        const context = createContext(sandbox);

        try {
            script.runInContext(context, { timeout: data.timeout });

            if(sandbox.result == null) {
                parentPort.postMessage(JSON.stringify({
                    error: "No result returned from the Worker VM",
                }));
            }
            else {
                parentPort.postMessage(JSON.stringify({
                    result: sandbox.result,
                }))
            }
        }
        catch(e) {
            parentPort.postMessage(JSON.stringify({
                error: e.toString(),
            }));
        }
    })
}
