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
exports.getDomainRecords = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default("devops:lib:utils:getDomainRecords");
const dns_1 = require("dns");
const strings_1 = require("../strings");
const { resolveNs, resolveSoa, resolveMx, resolveCname } = dns_1.promises;
exports.getDomainRecords = ({ domain, getCname, getMx = false }) => __awaiter(void 0, void 0, void 0, function* () {
    const _rootDomain = domain + ".";
    const records = { domain: strings_1.normalizeDomain(_rootDomain) };
    try {
        for (const ns of yield resolveNs(_rootDomain)) {
            if (!records.ns)
                records.ns = new Set();
            records.ns.add(strings_1.normalizeDomain(ns));
        }
        const soa = yield resolveSoa(_rootDomain);
        records.soa = Object.assign(Object.assign({}, soa), { nsname: strings_1.normalizeDomain(soa.nsname), hostmaster: strings_1.normalizeDomain(soa.hostmaster) });
    }
    catch (err) {
        debug(err);
        return;
    }
    if (getMx) {
        records.mx = new Map();
        try {
            for (const mx of yield resolveMx(_rootDomain))
                records.mx.set(mx.exchange, mx.priority);
        }
        catch (err) {
            debug(err);
            records.mx = undefined;
        }
    }
    if (getCname) {
        records.cname = new Map();
        try {
            const subDomain = getCname.endsWith(".") ? getCname : getCname.concat(".");
            records.cname.set(subDomain.slice(0, -1), strings_1.normalizeDomain((yield resolveCname(subDomain + _rootDomain))[0]));
        }
        catch (err) {
            debug(err);
            records.cname = undefined;
        }
    }
    return records;
});
//# sourceMappingURL=getDomainRecords.js.map