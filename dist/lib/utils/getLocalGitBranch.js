"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalGitBranch = void 0;
const child_process_1 = require("child_process");
exports.getLocalGitBranch = () => {
    const output = child_process_1.execSync("git status");
    const results = /^On\sbranch\s([\S]*).*/.exec(output.toString());
    if (!results) {
        throw new Error("git not installed or cannot determine what branch you are on");
    }
    return results[1];
};
//# sourceMappingURL=getLocalGitBranch.js.map