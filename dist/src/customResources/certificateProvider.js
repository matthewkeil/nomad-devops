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
exports.certificateProvider = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:src:customResources:certificateRequestProvider" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const lib_1 = require("../../lib");
exports.certificateProvider = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Certificate: certificate } = yield lib_1.getCertificateForDomain(event.ResourceProperties.DomainName);
        switch (event.RequestType.toLowerCase()) {
            case "create":
                if (!certificate) {
                    throw new Error("please create a CertificateRequest to use your Certificate");
                }
                break;
            case "update":
                const { OldResourceProperties, ResourceProperties } = event;
                if (OldResourceProperties.DomainName !== ResourceProperties.DomainName) {
                    if (!certificate) {
                        throw new Error("To protect a different domain, please create a CertificateRequest for the new DomainName and then update your Certificate");
                    }
                }
                else {
                    if (!certificate) {
                        throw new Error("please create a CertificateRequest to use your Certificate");
                    }
                }
                break;
            case "delete":
                break;
            default:
                return Promise.resolve({
                    Status: "FAILED",
                    RequestId: event.RequestId,
                    StackId: event.StackId,
                    PhysicalResourceId: "NomadDevops::Certificate",
                    LogicalResourceId: event.LogicalResourceId,
                    Reason: "invalid event.RequestType"
                });
        }
        debug(certificate);
        const { Status } = certificate || {};
        switch (Status) {
            case "PENDING_VALIDATION":
                const status = yield lib_1.getIssuedCertificate({
                    CertificateArn: certificate.CertificateArn
                });
                if (status !== "ISSUED")
                    throw new Error("Certificate validation failed");
                break;
            case "ISSUED":
                break;
            case "FAILED":
            case "EXPIRED":
            case "REVOKED":
            case "INACTIVE":
            case "VALIDATION_TIMED_OUT":
            default:
                const message = `the status for the Certificate covering ${certificate.DomainName} is ${Status}`;
                throw new Error(message);
        }
        const response = {
            Status: "SUCCESS",
            RequestId: event.RequestId,
            StackId: event.StackId,
            PhysicalResourceId: "NomadDevops::Certificate",
            LogicalResourceId: event.LogicalResourceId
        };
        if (certificate) {
            response.Data = {
                Arn: certificate.CertificateArn
            };
        }
        return response;
    }
    catch (err) {
        return {
            Status: "FAILED",
            RequestId: event.RequestId,
            StackId: event.StackId,
            PhysicalResourceId: "NomadDevops::Certificate",
            LogicalResourceId: event.LogicalResourceId,
            Reason: JSON.stringify(err)
        };
    }
});
//# sourceMappingURL=certificateProvider.js.map