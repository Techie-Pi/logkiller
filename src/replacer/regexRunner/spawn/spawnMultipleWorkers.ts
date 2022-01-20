import {cpus} from "os";
import {spawnWorker} from "./spawnWorker";
import {createLogger} from "../../../logger";

const logger = createLogger("Workers Pool Spawner");

function spawnMultipleWorkers(matcher: RegExp, string: string, replaceValue: string, timeout: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const splittedString = string.split(/\r\n|\r|\n/g);
        const numberOfWorkers = cpus().length - 1;
        const numberOfLinesPerWorker = Math.round(splittedString.length / numberOfWorkers);

        const checkValues = (workerId: number, string?: string) => {
            if(string == null) {
                reject(`Worker ${workerId} failed to process the string`);
                return;
            }

            workers[workerId].result = string;

            let done = true;
            Object.keys(workers).forEach(key => {
                const worker = workers[key];
                if(worker.result == null) done = false;
            })

            if(done) {
                let finalResult = "";
                for(let i = 0; i < Object.keys(workers).length; i++) {
                    const from = workers[i].metadata?.assignedLines.from;
                    const to = workers[i].metadata?.assignedLines.to;

                    logger.debug(`Worker finished processing lines ${from}-${to} ${i}`);

                    finalResult += workers[i].result;
                }

                resolve(finalResult);
            }
        }

        const workers: any = {};
        let linesAssigned = 0;
        for(let i = 0; i < numberOfWorkers; i++) {
            const numberOfLinesToSend =
                i === numberOfLinesPerWorker - 1 ?
                    splittedString.length - linesAssigned :
                    numberOfLinesPerWorker;

            const stringToSend = splittedString.slice(linesAssigned, linesAssigned + numberOfLinesToSend).join("\n");

            workers[i] = {
                result: undefined,
                call: checkValues,
                metadata: {
                    assignedLines: {
                        from: linesAssigned,
                        to: linesAssigned + numberOfLinesToSend,
                    },
                },
            };


            spawnWorker(
                matcher,
                stringToSend,
                replaceValue,
                timeout
            )
                .then(value => workers[i].call(i, value))
                .catch(() => workers[i].call(i, undefined));

            linesAssigned += numberOfLinesToSend;
        }
    })
}

export {
    spawnMultipleWorkers,
}
