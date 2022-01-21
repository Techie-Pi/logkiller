import ipRegex from "ip-regex";

const isIpAddress = ipRegex({ exact: false });
const isBcryptHash = /(\$2a\$|\$2b\$|\$2x\$|\$2y\$)(.*)\s+/gi;
const isGitHubToken = /((gh._)(.*)\s+)/g;

const _patterns = {
    isIpAddress,
    isBcryptHash,
    isGitHubToken,
}

export default Object.values(_patterns);
