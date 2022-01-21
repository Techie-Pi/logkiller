export enum ConfigTypesEnvironment {
    AbsolutePath = "WATCHER_ABSOLUTE_PATH",
    DevelopmentMode = "WATCHER_DEVELOPMENT_MODE",
    ReplacementValue = "WATCHER_REPLACEMENT_VALUE",
    BaseMilliseconds = "WATCHER_BASE_MILLISECONDS"
}

export interface IConfigApi {
    getBoolean(type: ConfigTypesEnvironment): boolean | undefined,
    getNumber(type: ConfigTypesEnvironment): number | undefined,
    getString(type: ConfigTypesEnvironment): string | undefined,
}
