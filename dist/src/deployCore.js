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
exports.deployCore = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:src:deployCore" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const cloudform_1 = __importDefault(require("cloudform"));
const templates_1 = require("../templates");
const lib_1 = require("../lib");
exports.deployCore = ({ rootDomain, stackName }) => __awaiter(void 0, void 0, void 0, function* () {
    const [nslookup, zoneInfo, certificate] = yield Promise.all([
        lib_1.getDomainRecords({
            domain: rootDomain,
            getMx: true
        }),
        lib_1.getZoneInfoForDomain(rootDomain),
        lib_1.getCertificateForDomain(rootDomain)
    ]);
    debug(nslookup, zoneInfo, certificate);
    if (!certificate) {
        lib_1.output({ log: "deploying ssl/tls certificate. process will take 15-20 minutes" });
    }
    const template = yield templates_1.buildCoreTemplate({
        stackName,
        hostedZone: (zoneInfo || {}).HostedZoneId,
        certificate: (certificate === null || certificate === void 0 ? void 0 : certificate.Certificate) ? certificate.Certificate.CertificateArn : undefined,
        cognito: false
    });
    return lib_1.handleStack({
        StackName: stackName,
        TemplateBody: cloudform_1.default(template),
        Capabilities: ["CAPABILITY_NAMED_IAM"]
    });
});
//# sourceMappingURL=deployCore.js.map