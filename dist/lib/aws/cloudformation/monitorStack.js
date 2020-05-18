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
exports.monitorStack = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("devops:lib:aws:cloudformation:monitorStack");
const config_1 = require("../../../config");
const utils_1 = require("../../utils");
const getStackEvents_1 = require("./getStackEvents");
const route53_1 = require("../route53");
const processListForTable = ({ StackName, list }) => {
    return list
        .filter(event => !(event.StatusReason || "").includes("Resource creation Initiated"))
        .map(event => {
        const ResourceType = event.ResourceType.split("::");
        return {
            StackName,
            ResourceName: event.LogicalResourceId,
            Timestamp: event.Timestamp.toLocaleTimeString(),
            Service: [...ResourceType].slice(-2)[0],
            Resource: [...ResourceType].pop(),
            Status: event.ResourceStatus.substring(0, 14)
        };
    });
};
exports.monitorStack = ({ StackName }) => {
    return setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const list = yield getStackEvents_1.getStackEvents({ StackName });
        const table = utils_1.buildConsoleTable(processListForTable({ StackName, list }));
        utils_1.output({
            table
        });
        const certCreationEvent = list.find(event => {
            if (event.ResourceType === "AWS::CertificateManager::Certificate" &&
                (event.StatusReason || "").includes("Content of DNS Record")) {
                return true;
            }
        });
        if (certCreationEvent) {
            const dnsRecord = certCreationEvent.StatusReason.split(": ");
            const recordSetName = dnsRecord[2].split(",")[0];
            const recordSetValue = dnsRecord[4].substr(0, dnsRecord[4].length - 1);
            debug(`>>>\n>>>found request for SSL validation at CNAME of\n>>> ${recordSetName}\n>>> with a value of\n>>> ${recordSetValue}\n>>>`);
            const { StackResourceSummaries } = yield config_1.config.cf
                .listStackResources({
                StackName
            })
                .promise();
            const { PhysicalResourceId: HostedZoneId } = StackResourceSummaries.find(resource => resource.ResourceType === "AWS::Route53::HostedZone");
            yield route53_1.createCertRecordSet({
                HostedZoneId,
                recordSetName,
                recordSetValue
            });
        }
    }), 2000);
};
//# sourceMappingURL=monitorStack.js.map