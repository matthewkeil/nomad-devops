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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertificateForDomain = void 0;
const config_1 = require("../../../config");
const strings_1 = require("../../strings");
const extractSubdomains = (domain, base) => {
    const result = strings_1.normalizeDomain(domain).replace(strings_1.normalizeDomain(base), "");
    return result.endsWith(".") ? result.slice(0, -1) : result;
};
exports.getCertificateForDomain = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    function finalize(Certificate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(Certificate === null || Certificate === void 0 ? void 0 : Certificate.CertificateArn))
                return {};
            return yield config_1.config.acm
                .describeCertificate({ CertificateArn: Certificate.CertificateArn })
                .promise();
        });
    }
    const { CertificateSummaryList } = yield config_1.config.acm.listCertificates().promise();
    const certSummary = CertificateSummaryList.find(({ DomainName }) => strings_1.normalizeDomain(domain).endsWith(strings_1.normalizeDomain(DomainName)));
    if (certSummary) {
        const { CertificateArn } = certSummary;
        const { Certificate } = yield config_1.config.acm.describeCertificate({ CertificateArn }).promise();
        const subDomain = extractSubdomains(domain, Certificate.DomainName);
        if (subDomain !== "") {
            if (Certificate.SubjectAlternativeNames && Certificate.SubjectAlternativeNames.length) {
                const match = Certificate.SubjectAlternativeNames.find(altName => {
                    const altSubDomain = extractSubdomains(altName, Certificate.DomainName);
                    if (altSubDomain === "*")
                        return true;
                    if (altSubDomain === subDomain)
                        return true;
                });
                if (match)
                    return finalize(Certificate);
            }
            return {};
        }
        return finalize(Certificate);
    }
});
//# sourceMappingURL=getCertificateForDomain.js.map