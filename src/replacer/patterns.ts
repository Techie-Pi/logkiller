import ipRegex from "ip-regex";

const isIpAddress = ipRegex({ exact: false });
const isBcryptHash = /(\$2a\$|\$2b\$|\$2x\$|\$2y\$)(.*)(\s+|[\n|\r\n|\r]{2})/gi;
const isScryptHash = /(c2NyeXB0)(.*)(\s+|[\n|\r\n|\r]{2})/gi;
const isArgon2Hash = /(\$argon2)(.*)(\s+|[\n|\r\n|\r]{2})/gi;
const isGitHubToken = /((gh._)(.*)\s+)/g;

const _patterns = {
    isIpAddress,
    isBcryptHash,
    isScryptHash,
    isArgon2Hash,
    isGitHubToken,
}

export default Object.values(_patterns);
