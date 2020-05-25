#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
Error.stackTraceLimit = Infinity;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:bin:deploy" + (!!filter.length ? `:${filter}` : ""));
const debug = Debug("");
const src_1 = require("../src");
const config_1 = require("../config");
const lib_1 = require("../lib");
const processArgV = () => {
    const nomadDevops = !!process.argv.find(arg => arg === "nomad-devops");
    const coreStack = !!process.argv.find(arg => arg === "core");
    debug({ nomadDevops, coreStack });
    const stack = nomadDevops ? "NOMAD_DEVOPS" : coreStack ? "CORE" : undefined;
    const rootDomain = config_1.config.ROOT_DOMAIN;
    const coreStackName = `${lib_1.kebabCaseDomainName(rootDomain)}-core`;
    const args = {
        stack,
        rootDomain,
        coreStackName
    };
    debug({ args });
    return args;
};
const _deploy = () => __awaiter(void 0, void 0, void 0, function* () {
    const { stack, coreStackName, rootDomain } = processArgV();
    switch (stack) {
        case "NOMAD_DEVOPS":
            return src_1.deployNomadDevops();
        case "CORE":
            return src_1.deployCore({ rootDomain, stackName: coreStackName });
        default:
        // deploy({
        //   branch: "shimmyshimmy",
        //   subDomain: "cocopop",
        //   artifacts: ["docs", ".vuepress", "dist"],
        //   framework: "vuepress"
        // });
    }
});
if (require.main === module) {
    _deploy().then(console.log);
}
//# sourceMappingURL=deploy.js.map