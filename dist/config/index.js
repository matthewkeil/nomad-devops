"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const os_1 = require("os");
const getDefaultConfig_1 = require("./getDefaultConfig");
const getUserConfig_1 = require("./getUserConfig");
const validateConfig_1 = require("./validateConfig");
const cwd = process.cwd();
const SEARCH_ROOTS = [os_1.homedir(), cwd];
// check cwd for package.json and node_modules folder
// if one doesn't exist check the folder holding node_modules/nomad-devops
const config = Object.assign(Object.assign({}, getDefaultConfig_1.getDefaultConfig()), getUserConfig_1.getUserConfig({ cwd, searchRoots: SEARCH_ROOTS }));
exports.config = config;
if (config.pkg) {
    config.pkg = require(config.pkg);
}
const errors = validateConfig_1.validateConfig(config);
if (errors.length) {
    for (const message of errors)
        console.log(`>>> config error: ${message}`);
    process.exit(1);
}
//# sourceMappingURL=index.js.map