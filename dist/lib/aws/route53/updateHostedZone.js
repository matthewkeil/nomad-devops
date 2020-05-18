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
exports.updateHostedZone = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:route53:updateHostedZone" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const config_1 = require("../../../config");
const getFullHostedZoneInfo_1 = require("./getFullHostedZoneInfo");
exports.updateHostedZone = ({ Id, ResourceProperties, OldResourceProperties }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (OldResourceProperties.Name !== ResourceProperties.Name) {
        throw new Error("cannot update the Name of a HostedZone");
    }
    if (OldResourceProperties.HostedZoneConfig.Comment !== ResourceProperties.HostedZoneConfig.Comment) {
        yield config_1.config.route53.updateHostedZoneComment({
            Id,
            Comment: ResourceProperties.HostedZoneConfig.Comment
        });
    }
    if (OldResourceProperties.HostedZoneTags || ResourceProperties.HostedZoneTags) {
        const oldTags = new Map(OldResourceProperties.HostedZoneTags.map(({ Key, Value }) => [
            Key,
            Value
        ]) || []);
        const newTags = new Map(ResourceProperties.HostedZoneTags.map(({ Key, Value }) => [
            Key,
            Value
        ]) || []);
        const deletes = [];
        const adds = [];
        for (const [Key] of oldTags)
            if (!newTags.has(Key))
                deletes.push(Key);
        for (const [Key, Value] of newTags)
            if (!oldTags.has(Key))
                adds.push({ Key, Value });
        const params = {
            ResourceType: "hostedzone",
            ResourceId: Id
        };
        if (adds.length)
            params.AddTags = adds;
        if (deletes.length)
            params.RemoveTagKeys = deletes;
        yield config_1.config.route53.changeTagsForResource(params).promise();
    }
    if (((_a = OldResourceProperties.QueryLoggingConfig) === null || _a === void 0 ? void 0 : _a.CloudWatchLogsLogGroupArn) !== ((_b = ResourceProperties.QueryLoggingConfig) === null || _b === void 0 ? void 0 : _b.CloudWatchLogsLogGroupArn)) {
        yield config_1.config.route53.deleteQueryLoggingConfig({ Id }).promise();
        yield config_1.config.route53
            .createQueryLoggingConfig({
            HostedZoneId: Id,
            CloudWatchLogsLogGroupArn: ResourceProperties.QueryLoggingConfig
                .CloudWatchLogsLogGroupArn
        })
            .promise();
    }
    if (OldResourceProperties.VPCs || ResourceProperties.VPCs) {
        const oldVPCs = new Set(OldResourceProperties.VPCs || []);
        const newVPCs = new Set(ResourceProperties.VPCs || []);
        const changes = [];
        for (const vpc of oldVPCs) {
            if (!newVPCs.has(vpc)) {
                changes.push(config_1.config.route53.disassociateVPCFromHostedZone({ HostedZoneId: Id, VPC: vpc }).promise());
            }
        }
        for (const vpc of newVPCs) {
            if (!oldVPCs.has(vpc)) {
                changes.push(config_1.config.route53.associateVPCWithHostedZone({ HostedZoneId: Id, VPC: vpc }).promise());
            }
        }
        yield Promise.all(changes);
    }
    return yield getFullHostedZoneInfo_1.getFullHostedZoneInfo({ Id });
});
//# sourceMappingURL=updateHostedZone.js.map