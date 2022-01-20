function generateLogFunction(fn: (...params: any[]) => void): (namespace: string, ...params: any[]) => void {
    return (namespace, params) => {
        fn(`[${namespace}]`, ...params);
    };
}

const debug = generateLogFunction(console.debug);
const log = generateLogFunction(console.log);
const warn = generateLogFunction(console.warn);
const error = generateLogFunction(console.error);
const table = console.table;

export function createLogger(namespace: string) {
    return {
        debug: (...params: any[]) => debug(namespace, params),
        log: (...params: any[]) => log(namespace, params),
        warn: (...params: any[]) => warn(namespace, params),
        error: (...params: any[]) => error(namespace, params),
        table: (...params: any[]) => table(namespace, params),
    }
}
