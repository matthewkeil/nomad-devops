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
exports.recordSetProvider = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:src:customResources:certificateRequestProvider" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
exports.recordSetProvider = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results;
        let recordInfo;
        switch (event.RequestType.toLowerCase()) {
            case "create":
                break;
            case "update":
                break;
            case "delete":
                break;
            default:
                return Promise.resolve({
                    Status: "FAILED",
                    RequestId: event.RequestId,
                    StackId: event.StackId,
                    PhysicalResourceId: "NomadDevops::RecordSet",
                    LogicalResourceId: event.LogicalResourceId,
                    Reason: "invalid event.RequestType"
                });
        }
        debug(results);
        const response = {
            Status: "SUCCESS",
            RequestId: event.RequestId,
            StackId: event.StackId,
            PhysicalResourceId: "NomadDevops::RecordSet",
            LogicalResourceId: event.LogicalResourceId
        };
        if (recordInfo) {
            response.Data = {};
        }
        return response;
    }
    catch (err) {
        return {
            Status: "FAILED",
            RequestId: event.RequestId,
            StackId: event.StackId,
            PhysicalResourceId: "NomadDevops::RecordSet",
            LogicalResourceId: event.LogicalResourceId,
            Reason: JSON.stringify(err)
        };
    }
});
//# sourceMappingURL=recordSetProvider.js.map