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
exports.getFullHostedZoneInfo = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:route53:getFullHostedZoneInfo" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const config_1 = require("../../../config");
exports.getFullHostedZoneInfo = ({ Id }) => __awaiter(void 0, void 0, void 0, function* () {
    const { HostedZone, VPCs } = yield config_1.config.route53.getHostedZone({ Id }).promise();
    const Name = HostedZone.Name;
    const HostedZoneConfig = HostedZone.Config;
    let HostedZoneTags;
    try {
        const { ResourceTagSet } = yield config_1.config.route53
            .listTagsForResource({ ResourceId: Id, ResourceType: "hostedzone" })
            .promise();
        HostedZoneTags = ResourceTagSet === null || ResourceTagSet === void 0 ? void 0 : ResourceTagSet.Tags;
    }
    catch (_a) { }
    let QueryLoggingConfig;
    try {
        const queryConfig = yield config_1.config.route53.getQueryLoggingConfig({ Id }).promise();
        QueryLoggingConfig = queryConfig.QueryLoggingConfig;
    }
    catch (_b) { }
    return {
        Name,
        HostedZoneConfig,
        HostedZoneTags,
        QueryLoggingConfig,
        VPCs
    };
});
//# sourceMappingURL=getFullHostedZoneInfo.js.map