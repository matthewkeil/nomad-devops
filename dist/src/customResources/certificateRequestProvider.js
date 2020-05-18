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
exports.certificateRequestProvider = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:src:customResources:certificateRequestProvider" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const config_1 = require("../../config");
const lib_1 = require("../../lib");
const handleCertificateRequestUpdate = ({ OldResourceProperties, ResourceProperties }) => __awaiter(void 0, void 0, void 0, function* () {
    if (ResourceProperties.DomainName !== ResourceProperties.DomainName) {
        throw new Error("cannot update the DomainName of a Certificate");
    }
    if (ResourceProperties.ValidationMethod !== ResourceProperties.ValidationMethod) {
        throw new Error("cannot update the ValidationMethod of a Certificate");
    }
    const oldAlts = new Set(OldResourceProperties.SubjectAlternativeNames || []);
    const newAlts = new Set(ResourceProperties.SubjectAlternativeNames || []);
    let badAlts = false;
    for (const old of oldAlts)
        if (!newAlts.has(old))
            badAlts = true;
    for (const alt of newAlts)
        if (!oldAlts.has(alt))
            badAlts = true;
    if (badAlts) {
        throw new Error("cannot update the SubjectAlternativeNames of a Certificate");
    }
    const oldOpts = new Set((OldResourceProperties.DomainValidationOption || []));
    const newOpts = new Set((ResourceProperties.DomainValidationOption || []));
    let badOpts = false;
    for (const opt of oldOpts)
        if (!newAlts.has(opt))
            badOpts = true;
    for (const opt of newOpts)
        if (!oldAlts.has(opt))
            badOpts = true;
    if (badOpts) {
        throw new Error("cannot update the ValidationMethod of a Certificate");
    }
    const { Certificate } = yield lib_1.getCertificateForDomain(ResourceProperties.DomainName);
    yield lib_1.updateCertificate({
        CertificateArn: Certificate.CertificateArn,
        Options: ResourceProperties.Options,
        Tags: ResourceProperties.Tags
    });
    return yield config_1.config.acm
        .describeCertificate({ CertificateArn: Certificate.CertificateArn })
        .promise();
});
exports.certificateRequestProvider = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { Certificate: certificate } = yield lib_1.getCertificateForDomain(event.ResourceProperties["DomainName"]);
        let results;
        switch (event.RequestType.toUpperCase()) {
            case "CREATE":
                if (!certificate)
                    certificate = yield lib_1.requestCertificate(Object.assign(Object.assign({}, event.ResourceProperties), { IdempotencyToken: event.RequestId }));
                break;
            case "UPDATE":
                const { Certificate } = yield handleCertificateRequestUpdate(event);
                certificate = Certificate;
                break;
            case "DELETE":
                yield config_1.config.acm
                    .deleteCertificate({ CertificateArn: certificate.CertificateArn })
                    .promise();
                break;
            default:
                return {
                    Status: "FAILED",
                    RequestId: event.RequestId,
                    StackId: event.StackId,
                    PhysicalResourceId: "NomadDevops::CertificateRequest",
                    LogicalResourceId: event.LogicalResourceId,
                    Reason: "invalid event.RequestType"
                };
        }
        debug(results);
        const response = {
            Status: "SUCCESS",
            RequestId: event.RequestId,
            StackId: event.StackId,
            PhysicalResourceId: "NomadDevops::CertificateRequest",
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
            PhysicalResourceId: "NomadDevops::CertificateRequest",
            LogicalResourceId: event.LogicalResourceId,
            Reason: JSON.stringify(err)
        };
    }
});
//# sourceMappingURL=certificateRequestProvider.js.map