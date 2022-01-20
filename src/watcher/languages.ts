/// Most of the data comes from this StackOverflow question and answers
/// Link: https://stackoverflow.com/questions/1614520/what-are-common-file-extensions-for-web-programming-languages
///
/// Some of them are added by myself, the idea is to create an array with all the files that _by default_ people
/// wouldn't like to be touched. You may think "Isn't it better to create an allowlist instead of a blocklist?".
///
/// For the most part, yes! That's the best idea, but this service is meant to be removing *all* the possible logs
/// that may be outputted, this means that if an attacker gained access to the server where the service is hosted
/// and knows that they are using this project to prevent the logging of sensitive data, and a whitelist is enabled:
/// The attacker could save personal information on *any* and it would be completely unrecognized.
///
/// Although they could use *any* of the file extensions added here, this is just an *opt-in* default!
/// The best is to analyze your project, the files being deployed and generated, and from that you need to create
/// *your own* blocklist!
///
/// This list is great for development and project on an _alpha_ state!
/// But it is *not* intended for production, and the project warns you when this list is being used.
///
/// There are also some other protections like warn when "the list is larger than x" and things like that to prevent
/// the misuse of this project!
///
/// Thank you for coming to my TED talk!

export default [
    "asp",
    "aspx",
    "axd",
    "asx",
    "asmx",
    "ashx",
    "css",
    "cfm",
    "yaws",
    "swf",
    "html",
    "htm",
    "xhtml",
    "jhtml",
    "java",
    "jsp",
    "jspx",
    "wss",
    "do",
    "action",
    "js",
    "ts",
    "pl",
    "php",
    "php3",
    "php4",
    "php5",
    "phtml",
    "py",
    "rb",
    "rhtml",
    "shtml",
    "svg",
    "cgi",
    "dll",
    "out",
    "c",
    "cpp",
    "rs",
    "cls",
    "vbz",
    "vbp",
    "vbg",
    "vb",
    "frx",
    "frm",
    "dep",
    "dob",
    "dox",
    "dsr",
    "dsx",
    "dws",
    "sql",
    "wasm",
    "swift",
    "go",
    "cs",
    "kt",
    "coffee",
    "_coffee",
    "cake",
    "cjsx",
    "jsx",
    "tsx",
    "cjs",
    "mjs",
    "cson",
    "cake",
    "iced",
    "cfm",
    "cfml",
    "dtl",
    "sass",
    "less",
    "ccss",
    "pcss",
    "hss",
    "scss",
    "r",
    "md",
    "json",
    "lock",
    "env",
    "*.env",
    "xml",
];
