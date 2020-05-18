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
exports.hostedZoneProvider = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:src:customResources:hostedZoneProvider" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const lib_1 = require("../../lib");
exports.hostedZoneProvider = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Name = event.ResourceProperties.Name;
        if (!Name)
            throw new Error("must provide a Name for HostedZone");
        const hostedZone = yield lib_1.getHostedZoneForDomain(Name);
        const HostedZoneId = hostedZone === null || hostedZone === void 0 ? void 0 : hostedZone.Id.split("/").pop();
        let results;
        let zoneInfo;
        switch (event.RequestType.toLowerCase()) {
            case "create":
                results = yield lib_1.createHostedZone({
                    RequestId: event.RequestId,
                    ResourceProperties: event.ResourceProperties
                });
                zoneInfo = yield lib_1.getZoneInfoForDomain(Name);
                break;
            case "update":
                results = yield lib_1.updateHostedZone({
                    Id: HostedZoneId,
                    OldResourceProperties: event.OldResourceProperties,
                    ResourceProperties: event.ResourceProperties
                });
                zoneInfo = yield lib_1.getZoneInfoForDomain(Name);
                break;
            case "delete":
                results = yield lib_1.deleteHostedZone({
                    Id: HostedZoneId
                });
                break;
            default:
                return Promise.resolve({
                    Status: "FAILED",
                    RequestId: event.RequestId,
                    StackId: event.StackId,
                    PhysicalResourceId: "NomadDevops::HostedZone",
                    LogicalResourceId: event.LogicalResourceId,
                    Reason: "invalid event.RequestType"
                });
        }
        debug(results);
        const response = {
            Status: "SUCCESS",
            RequestId: event.RequestId,
            StackId: event.StackId,
            PhysicalResourceId: "NomadDevops::HostedZone",
            LogicalResourceId: event.LogicalResourceId
        };
        if (zoneInfo) {
            response.Data = {
                NameServers: zoneInfo.ns,
                Id: HostedZoneId
            };
        }
        return response;
    }
    catch (err) {
        return {
            Status: "FAILED",
            RequestId: event.RequestId,
            StackId: event.StackId,
            PhysicalResourceId: "NomadDevops::HostedZone",
            LogicalResourceId: event.LogicalResourceId,
            Reason: JSON.stringify(err)
        };
    }
});
//# sourceMappingURL=hostedZoneProvider.js.map