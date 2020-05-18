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
exports.deploy = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:src:deploy" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const lib_1 = require("../lib");
const deployCore_1 = require("./deployCore");
const config_1 = require("../config");
const deployClient_1 = require("./deployClient");
const validateCoreStack_1 = require("../lib/aws/cloudformation/validateCoreStack");
exports.deploy = (params) => __awaiter(void 0, void 0, void 0, function* () {
    debug("params: ", params);
    const { framework, artifacts, branch, subDomain } = params;
    /**
     * only check that core stack exists. will check the dns status
     * after deploy to make sure its standing correctly
     */
    const coreStackName = lib_1.getStackName({ stack: "core" });
    debug("coreStackName: ", coreStackName);
    const corePromise = lib_1.getStack({ StackName: coreStackName }).then(coreStatus => {
        return coreStatus
            ? Promise.resolve(coreStatus)
            : deployCore_1.deployCore({ rootDomain: config_1.config.ROOT_DOMAIN, stackName: coreStackName });
    });
    /**
     * decipher project type and build project if needed. can
     * supply either valid location of artifacts directory or
     * script can try to build project by either using the
     * supplied config or fallback to sniffing project meta for
     * clues on what command to run and where to "default" look
     * for the build artifacts.
     */
    const details = lib_1.getProjectDetails(framework);
    let buildPromise;
    if (artifacts) {
        buildPromise = Promise.resolve(artifacts);
    }
    else {
        const command = `export NODE_ENV=production && ${details.commands.length === 1 ? details.commands[0] : details.commands.join(" && ")}`;
        debug(`rebuilding ${details.framework + " "}app using "${command}"`);
        buildPromise = lib_1.exec(command).then(log => {
            debug(log);
            return details.distLocation;
        });
    }
    /**
     * wait for build project and core stack verification.
     *
     * use project info from above to decide which recipe to use
     * and deploy the appropriate stack type
     */
    const allowNaked = config_1.config.ALLOW_NAKED;
    const rootDomain = config_1.config.ROOT_DOMAIN;
    const _subDomain = subDomain || config_1.config.SUB_DOMAIN;
    const domain = lib_1.buildDomainName({
        branch,
        subDomain: _subDomain,
        rootDomain,
        allowNaked
    });
    debug("deploy params: ", { domain, branch, subDomain, rootDomain, allowNaked });
    if (yield validateCoreStack_1.validateCoreStack({ corePromise, rootDomain, domain })) {
        let distribution;
        switch (framework) {
            case "vue":
            case "nuxt":
            case "vuepress":
            case "angular":
            case "react":
            case "next":
            case "ember":
            case "svelte":
            default:
                distribution = yield deployClient_1.deployClient({
                    branch,
                    domain,
                    buildPromise
                });
        }
        lib_1.output({ log: `>>>\n>>>\n your project is live at ${distribution.DomainName}\n>>>` });
    }
});
//# sourceMappingURL=deploy.js.map