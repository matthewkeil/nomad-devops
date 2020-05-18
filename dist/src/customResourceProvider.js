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
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const recordSetProvider_1 = require("./customResources/recordSetProvider");
const hostedZoneProvider_1 = require("./customResources/hostedZoneProvider");
const certificateProvider_1 = require("./customResources/certificateProvider");
const certificateRequestProvider_1 = require("./customResources/certificateRequestProvider");
const resourceProviders = {
    RecordSet: recordSetProvider_1.recordSetProvider,
    HostedZone: hostedZoneProvider_1.hostedZoneProvider,
    Certificate: certificateProvider_1.certificateProvider,
    CertificateRequest: certificateRequestProvider_1.certificateRequestProvider
};
const resourceTypes = new Set(Object.keys(resourceProviders));
const sendResponse = ({ ResponseURL, response }) => axios_1.default({
    url: ResponseURL,
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Content-Encoding": "utf8"
    },
    data: JSON.stringify(response)
});
exports.handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    const RequestId = uuid_1.v4();
    const type = event.ResourceType.split("::").pop();
    const { ResponseURL, StackId, LogicalResourceId } = event;
    if (!resourceTypes.has(type)) {
        yield sendResponse({
            ResponseURL,
            response: {
                Status: "FAILED",
                Reason: "NomadDevops doesn't have that kind of custom resource",
                PhysicalResourceId: LogicalResourceId,
                StackId,
                RequestId,
                LogicalResourceId
            }
        });
        return;
    }
    yield sendResponse({ ResponseURL, response: yield resourceProviders[type](event, context) });
});
//# sourceMappingURL=customResourceProvider.js.map