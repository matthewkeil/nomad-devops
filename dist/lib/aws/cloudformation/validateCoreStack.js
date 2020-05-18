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
exports.validateCoreStack = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:cloudformation:validateCoreStack" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const route53_1 = require("../route53");
const utils_1 = require("../../utils");
const strings_1 = require("../../strings");
exports.validateCoreStack = ({ domain, rootDomain, corePromise }) => __awaiter(void 0, void 0, void 0, function* () {
    const coreStack = yield corePromise;
    debug("coreStack: ", coreStack);
    /**: Promise<CloudFormation.Stack>
     * check that nslookup return name servers that are assigned
     * by Route53 HostedZone to verify setup is correct
     */
    const zonePromise = route53_1.getZoneInfoForDomain(rootDomain);
    const recordPromise = utils_1.getDomainRecords({ domain });
    const [zoneInfo, records] = yield Promise.all([zonePromise, recordPromise]);
    let badNs = false;
    for (const ns of records.ns)
        if (!zoneInfo.ns.has(ns))
            badNs = true;
    if (badNs) {
        utils_1.output({ log: strings_1.displayNameServerMessage(domain, zoneInfo.ns, records.ns) });
    }
    return !badNs;
});
//# sourceMappingURL=validateCoreStack.js.map