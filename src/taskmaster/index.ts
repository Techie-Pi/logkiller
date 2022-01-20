import {readFile, writeFile} from "fs/promises";
import {replace} from "../replacer";
import {createLogger} from "../logger";

const logger = createLogger("Task Master");

async function tryWriting5Times(path: string, result: string, i: number) {
    if(i >= 5) return;

    try {
        if(i !== 0) {
            logger.debug(`Trying to write file for the ${i} time`);
        }
        await writeFile(path, result);
    }
    catch(e) {
        logger.warn(`Something failed trying to write the file: ${path}!`);
        await tryWriting5Times(path, result, ++i);
    }
}

async function checkAndReplaceFile(path: string): Promise<void> {
    const content = await readFile(path);
    const result = await replace(content.toString(), "[CENSORED]");

    if(content.toString() === result) {
        logger.debug("Updated content is the same as the original. Not going to write the file");
        return;
    }

    logger.debug("Writing file with the updated results");
    await tryWriting5Times(path, result, 0);
}

export {
    checkAndReplaceFile,
}
