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
exports.updateCertificate = void 0;
const debug_1 = __importDefault(require("debug"));
const Debug = (filter) => debug_1.default("devops:lib:aws:acm:updateCertificate" + (filter.length ? `:${filter}` : ""));
const debug = Debug("");
const config_1 = require("../../../config");
const updateCertificateTags_1 = require("./updateCertificateTags");
exports.updateCertificate = ({ CertificateArn, Options, Tags = [] }) => __awaiter(void 0, void 0, void 0, function* () {
    debug({ CertificateArn, Options, Tags });
    yield updateCertificateTags_1.updateCertificateTags({ CertificateArn, Tags });
    if (Options)
        yield config_1.config.acm.updateCertificateOptions({ CertificateArn, Options }).promise();
    const { Certificate } = yield config_1.config.acm.describeCertificate({ CertificateArn }).promise();
    debug("Certificate: ", Certificate);
    return Certificate;
});
//# sourceMappingURL=updateCertificate.js.map