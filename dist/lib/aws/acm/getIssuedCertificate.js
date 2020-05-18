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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIssuedCertificate = void 0;
const config_1 = require("../../../config");
const organizeOptions = (Certificate) => Certificate.DomainValidationOptions.filter(opt => opt.DomainName === Certificate.DomainName && opt.ValidationMethod === "DNS").reduce((all, opt) => {
    switch (opt.ValidationStatus) {
        case "PENDING_VALIDATION":
            all.pending = all.pending ? all.pending.concat(opt) : [opt];
            break;
        case "SUCCESS":
            all.success = all.success ? all.success.concat(opt) : [opt];
            break;
        case "FAILED":
            all.failed = all.failed ? all.failed.concat(opt) : [opt];
            break;
    }
    return all;
}, {});
function pollStatus(arn) {
    return __asyncGenerator(this, arguments, function* pollStatus_1() {
        while (true) {
            const { Certificate } = yield __await(config_1.config.acm.describeCertificate({ CertificateArn: arn }).promise());
            const options = organizeOptions(Certificate);
            // const pending = !!options.pending?.length;
            // const failed = !!options.failed?.length;
            yield yield __await(Certificate.Status);
        }
    });
}
exports.getIssuedCertificate = ({ CertificateArn }) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const poller = pollStatus(CertificateArn);
        const interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const { value: status = "" } = yield poller.next();
            switch (status) {
                case "PENDING_VALIDATION":
                    break;
                default:
                    clearInterval(interval);
                    void poller.return();
                    resolve(status);
            }
        }), 1000);
    }));
});
//# sourceMappingURL=getIssuedCertificate.js.map