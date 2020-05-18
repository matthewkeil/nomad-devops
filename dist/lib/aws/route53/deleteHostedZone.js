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
exports.deleteHostedZone = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:route53:deleteHostedZone" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const config_1 = require("../../../config");
exports.deleteHostedZone = ({ Id }) => __awaiter(void 0, void 0, void 0, function* () {
    const { VPCs = [] } = yield config_1.config.route53.getHostedZone({ Id }).promise();
    for (const vpc of VPCs) {
        debug("deleting vpc association: ", vpc);
        yield config_1.config.route53.disassociateVPCFromHostedZone({ HostedZoneId: Id, VPC: vpc }).promise();
    }
    let tags;
    try {
        const { ResourceTagSet } = yield config_1.config.route53
            .listTagsForResource({ ResourceType: "hostedzone", ResourceId: Id })
            .promise();
        tags = (ResourceTagSet === null || ResourceTagSet === void 0 ? void 0 : ResourceTagSet.Tags) || [];
    }
    catch (_a) { }
    if (tags.length) {
        debug("deleting tags: ", tags);
        yield config_1.config.route53
            .changeTagsForResource({
            ResourceType: "hostedzone",
            ResourceId: Id,
            RemoveTagKeys: tags.map(({ Key }) => Key)
        })
            .promise();
    }
    let queryLoggingConfig;
    try {
        const { QueryLoggingConfig } = yield config_1.config.route53.getQueryLoggingConfig({ Id }).promise();
        queryLoggingConfig = QueryLoggingConfig;
    }
    catch (_b) { }
    if (queryLoggingConfig === null || queryLoggingConfig === void 0 ? void 0 : queryLoggingConfig.CloudWatchLogsLogGroupArn) {
        debug("deleting queryLoggingConfig: ", queryLoggingConfig);
        yield config_1.config.route53
            .deleteQueryLoggingConfig({
            Id
        })
            .promise();
    }
    let Marker;
    const records = [];
    do {
        const { ResourceRecordSets = [], NextRecordIdentifier } = yield config_1.config.route53
            .listResourceRecordSets({
            HostedZoneId: Id,
            StartRecordIdentifier: Marker
        })
            .promise();
        records.push(...ResourceRecordSets);
        Marker = NextRecordIdentifier;
    } while (!!Marker);
    const changes = records
        .map(ResourceRecordSet => {
        if (ResourceRecordSet.Type === "SOA" || ResourceRecordSet.Type === "NS")
            return;
        return {
            Action: "DELETE",
            ResourceRecordSet
        };
    })
        .filter(record => !!record);
    if (changes.length) {
        yield config_1.config.route53
            .changeResourceRecordSets({
            HostedZoneId: Id,
            ChangeBatch: {
                Changes: changes
            }
        })
            .promise();
    }
    yield config_1.config.route53.deleteHostedZone({ Id }).promise();
});
//# sourceMappingURL=deleteHostedZone.js.map