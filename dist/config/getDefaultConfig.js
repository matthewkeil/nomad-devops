"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultConfig = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:config:getDefaultConfig" + (!!filter.length ? `:${filter}` : ""));
const debug = Debug("");
const interfaces_1 = require("../lib/interfaces");
exports.getDefaultConfig = () => {
    // TODO Sort out default config
    const config = {
        REGION: "us-east-1",
        ALLOWED_METHODS: interfaces_1.methods,
        ALLOW_NAKED: false
    };
    debug(config);
    return config;
};
//# sourceMappingURL=getDefaultConfig.js.map