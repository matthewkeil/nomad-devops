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
exports.createHostedZone = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:route53:createHostedZone" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const config_1 = require("../../../config");
const getDelegationSet_1 = require("./getDelegationSet");
const uuid_1 = require("uuid");
const getFullHostedZoneInfo_1 = require("./getFullHostedZoneInfo");
exports.createHostedZone = ({ RequestId = uuid_1.v4(), ResourceProperties }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { Name, HostedZoneConfig = {}, HostedZoneTags, QueryLoggingConfig, VPCs } = ResourceProperties;
    HostedZoneConfig.PrivateZone = false;
    if (!HostedZoneConfig.Comment)
        HostedZoneConfig.Comment = "brought to you by https://devops.nomad.house";
    const deletgationSet = yield getDelegationSet_1.getDelegationSet();
    const params = {
        CallerReference: RequestId,
        Name,
        DelegationSetId: deletgationSet.Id,
        HostedZoneConfig
    };
    if (VPCs)
        params.VPC = VPCs[0];
    const { HostedZone } = yield config_1.config.route53.createHostedZone(params).promise();
    const Id = HostedZone.Id.split("/").pop();
    if ((VPCs === null || VPCs === void 0 ? void 0 : VPCs.length) > 1) {
        for (const vpc of VPCs.slice(1)) {
            yield config_1.config.route53.associateVPCWithHostedZone({ HostedZoneId: Id, VPC: vpc }).promise();
        }
    }
    if (HostedZoneTags === null || HostedZoneTags === void 0 ? void 0 : HostedZoneTags.length) {
        yield config_1.config.route53
            .changeTagsForResource({
            ResourceId: Id,
            ResourceType: "hostedzone",
            AddTags: HostedZoneTags
        })
            .promise();
    }
    if ((_a = QueryLoggingConfig) === null || _a === void 0 ? void 0 : _a.CloudWatchLogsLogGroupArn) {
        yield config_1.config.route53
            .createQueryLoggingConfig({
            HostedZoneId: Id,
            CloudWatchLogsLogGroupArn: QueryLoggingConfig.CloudWatchLogsLogGroupArn
        })
            .promise();
    }
    return yield getFullHostedZoneInfo_1.getFullHostedZoneInfo({ Id });
});
//# sourceMappingURL=createHostedZone.js.map