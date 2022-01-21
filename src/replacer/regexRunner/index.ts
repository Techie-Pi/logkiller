import {spawnMultipleWorkers, spawnWorker} from "./spawn";
import {createLogger} from "../../logger";
import Config from "../../config";
import {ConfigTypesEnvironment} from "../../config/interfaces/IConfigApi";

const logger = createLogger("Main RegExp Runner");

// @ts-ignore - The only scenario when spawnWorker(...) could not return a string is when an error is thrown
async function run(matcher: RegExp, string: string, replaceValue: string, timeout?: number, matcherId?: number): Promise<string> {
    const stringLength = string.length;
    /// Each 500k lines, 500ms are added to the timeout (on top of a base of 500ms). A top is set to 10500ms
    /// This means the following
    /// 0           -> 500ms
    /// 250_000     -> 750ms    (500ms          + 250ms)
    /// 500_000     -> 1000ms   (500ms          + 500ms)
    /// 1_000_000   -> 1500ms   (1000ms         + 500ms)
    /// 10_000_000  -> 10_500ms (10_000ms [top] + 500ms)
    const baseMs = Config.getNumber(ConfigTypesEnvironment.BaseMilliseconds) || 500;
    logger.debug(`Timeout assigned to this task: ${baseMs}ms`);
    const _timeout: number = timeout
        || Math.round((((stringLength / 500_000) > 10_000 ? 10_000 : stringLength / 500_000) * 500) + baseMs);

    /// When the string is bigger than 50_000 characters (should benchmark to come up with a logic value), the string
    /// is split in newlines (to prevent issues with RegEx detection later on) and then distributed across multiple
    /// cores of the machine.
    ///
    /// Every worker spawned has an "id" with an object associated (right now, it only contains the result, in the
    /// future this could be useful in order to add more metadata). When all the results are received, they are combined
    /// onto a single string and returned in order. Thanks to Worker.postMessage(...) there's no need to use anything
    /// quite strange.
    logger.error(`New string with ${stringLength} characters${Number.isInteger(matcherId) ?
        ` and a matcher ID of ${matcherId}` :
        ""}`);

    if(stringLength < 50_000) {
        return await spawnWorker(matcher, string, replaceValue, _timeout);
    }
    else {
        logger.debug("The content is the file is bigger than 50_000 characters: spawning multiple threads");
        return await spawnMultipleWorkers(matcher, string, replaceValue, _timeout);
    }
}

export {
    run,
}
