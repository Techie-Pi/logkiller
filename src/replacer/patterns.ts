import ipRegex from "ip-regex";

const isIpAddress = ipRegex({ exact: false });
const isPhoneNumber = /^(\+*)(\d*)([(]\d{1,3}[)]*)*(\s?\d+|\+\d{2,3}\s\d+|\d+)[\s|-]?\d+([\s|-]?\d+){1,2}(\s)*$/gm;
const isBcryptHash = /^\$2[ayb]\$.{56}$/g;

const _patterns = {
    isIpAddress,
    isPhoneNumber,
    isBcryptHash,
}

export default Object.values(_patterns);
