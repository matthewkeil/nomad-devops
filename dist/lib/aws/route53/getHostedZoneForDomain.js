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
exports.getHostedZoneForDomain = void 0;
const config_1 = require("../../../config");
const strings_1 = require("../../strings");
exports.getHostedZoneForDomain = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    const hostedZone = yield config_1.config.route53.listHostedZones().promise();
    return hostedZone.HostedZones.find(({ Name }) => strings_1.normalizeDomain(Name).includes(strings_1.normalizeDomain(domain)) ||
        strings_1.normalizeDomain(domain).includes(strings_1.normalizeDomain(Name)));
});
//# sourceMappingURL=getHostedZoneForDomain.js.map