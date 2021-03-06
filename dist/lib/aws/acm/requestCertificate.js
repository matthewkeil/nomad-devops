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
exports.requestCertificate = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:acm:requestCertificate" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const lib_1 = require("../../../lib");
const config_1 = require("../../../config");
exports.requestCertificate = ({ DomainName, IdempotencyToken, Tags, DomainValidationOptions, Options, SubjectAlternativeNames }) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        DomainName,
        IdempotencyToken,
        SubjectAlternativeNames: [`*.${DomainName}`],
        ValidationMethod: "DNS",
        Options: Object.assign(Object.assign({}, Options), { CertificateTransparencyLoggingPreference: "ENABLED" })
    };
    if (Tags)
        params.Tags = Tags;
    if (DomainValidationOptions)
        params.DomainValidationOptions = DomainValidationOptions;
    if (SubjectAlternativeNames === null || SubjectAlternativeNames === void 0 ? void 0 : SubjectAlternativeNames.length) {
        for (const alt of SubjectAlternativeNames) {
            if (alt !== params.SubjectAlternativeNames[0]) {
                SubjectAlternativeNames.push(alt);
            }
        }
    }
    debug("request params: ", params);
    const { CertificateArn } = yield config_1.config.acm.requestCertificate(params).promise();
    debug("CertificateArn: ", CertificateArn);
    const { Certificate } = yield config_1.config.acm.describeCertificate({ CertificateArn }).promise();
    debug("Certificate: ", Certificate);
    const { Id } = yield lib_1.getHostedZoneForDomain(DomainName);
    debug("HostedZoneId", Id);
    const dnsValidationOptions = Certificate.DomainValidationOptions.filter(option => {
        if (option.ValidationMethod.toLowerCase() === "dns")
            return true;
    });
    debug("dnsValidationOptions", dnsValidationOptions);
    for (const option of dnsValidationOptions) {
        yield lib_1.createCertRecordSet({
            HostedZoneId: Id.split("/").pop(),
            recordSetName: option.ResourceRecord.Name,
            recordSetValue: option.ResourceRecord.Value
        });
    }
    return Certificate;
});
//# sourceMappingURL=requestCertificate.js.map