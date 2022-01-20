import patterns from "./patterns";
import {run} from "./regexRunner";

async function replace(string: string, replaceValue: string): Promise<string> {
    let value = string.slice();

    for(let i = 0; i < patterns.length; i++) {
        value = await run(patterns[i], value, replaceValue);
    }
    return value;
}

export {
    replace,
}
