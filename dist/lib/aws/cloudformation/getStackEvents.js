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
exports.getStackEvents = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("devops:lib:aws:cloudformation:getStackEvents");
const config_1 = require("../../../config");
exports.getStackEvents = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield config_1.config.cf.describeStackEvents(params).promise();
    debug(response);
    let updateOrCreateNotReached = true;
    const results = response.StackEvents.map(event => ({
        Timestamp: event.Timestamp,
        LogicalResourceId: event.LogicalResourceId,
        ResourceType: event.ResourceType,
        ResourceStatus: event.ResourceStatus,
        StatusReason: event.ResourceStatusReason
    })).filter(({ ResourceType, ResourceStatus }) => {
        if (!updateOrCreateNotReached)
            return false;
        if (ResourceType === "AWS::CloudFormation::Stack" &&
            (ResourceStatus === "UPDATE_IN_PROGRESS" || ResourceStatus === "CREATE_IN_PROGRESS")) {
            updateOrCreateNotReached = false;
        }
        return true;
    });
    return results.reverse();
});
//# sourceMappingURL=getStackEvents.js.map