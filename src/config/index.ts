import "dotenv/config";

import {ConfigTypesEnvironment, IConfigApi} from "./interfaces/IConfigApi";

const tryCatchNil = (fn: Function) => { try { return fn() } catch(e) {} }

class ConfigApi implements IConfigApi {
    private readonly env = process.env;

    getBoolean(type: ConfigTypesEnvironment): boolean | undefined {
        return tryCatchNil(() => Boolean(this.env[type]))
    }

    getNumber(type: ConfigTypesEnvironment): number | undefined {
        return tryCatchNil(() => Number(this.env[type]))
    }

    getString(type: ConfigTypesEnvironment): string | undefined {
        return this.env[type];
    }

}

export default new ConfigApi();
