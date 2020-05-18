"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certificate = void 0;
const cloudform_1 = require("cloudform");
const config_1 = require("../../config");
exports.Certificate = new cloudform_1.CertificateManager.Certificate({
    DomainName: config_1.config.ROOT_DOMAIN,
    SubjectAlternativeNames: [`*.${config_1.config.ROOT_DOMAIN}`],
    ValidationMethod: "DNS"
});
//# sourceMappingURL=Certificate.js.map