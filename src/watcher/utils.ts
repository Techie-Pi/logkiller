// Thanks https://github.com/tc39/proposal-regex-escaping for the polyfill!
function escapeRegex(string: string) {
    return string.replaceAll(/[\\^$*+?.()|[\]{}]/g, "\\$&")
}

export function generateExtensionsRegexFromArray(array: string[], path: string): string[] {
    return array.map(val => `${escapeRegex(path)}/**/*.${escapeRegex(path)}`);
}
