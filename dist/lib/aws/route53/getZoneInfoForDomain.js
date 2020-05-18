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
exports.getZoneInfoForDomain = void 0;
const config_1 = require("../../../config");
const strings_1 = require("../../strings");
const getHostedZoneForDomain_1 = require("./getHostedZoneForDomain");
exports.getZoneInfoForDomain = (rootDomain) => __awaiter(void 0, void 0, void 0, function* () {
    const hostedZone = yield getHostedZoneForDomain_1.getHostedZoneForDomain(rootDomain);
    if (!hostedZone)
        return;
    const records = {
        HostedZoneId: hostedZone.Id.split("/").pop()
    };
    const types = ["NS", "SOA", "CNAME", "MX"];
    const { ResourceRecordSets } = yield config_1.config.route53
        .listResourceRecordSets({
        HostedZoneId: hostedZone.Id
    })
        .promise();
    const findRecord = (_type) => ResourceRecordSets.filter(({ Type }) => Type === _type);
    for (const type of types) {
        const record = findRecord(type);
        if (!record.length)
            continue;
        switch (type) {
            case "NS":
                records.domain = strings_1.normalizeDomain(record[0].Name);
                records.ns = new Set();
                for (const ns of record[0].ResourceRecords.map(ns => ns.Value))
                    records.ns.add(strings_1.normalizeDomain(ns));
                break;
            case "MX":
                records.mx = new Map();
                record[0].ResourceRecords.map(mx => mx.Value.split(" ")).map(([priority, exchange]) => records.mx.set(strings_1.normalizeDomain(exchange), +priority));
                break;
            case "SOA":
                const [nsname, hostmaster, serial, refresh, retry, expire, minttl] = record[0].ResourceRecords[0].Value.split(" ");
                records.soa = {
                    nsname: strings_1.normalizeDomain(nsname),
                    hostmaster: strings_1.normalizeDomain(hostmaster),
                    serial: +serial,
                    refresh: +refresh,
                    retry: +retry,
                    expire: +expire,
                    minttl: +minttl
                };
                break;
            case "CNAME":
                if (!records.cname)
                    records.cname = new Map();
                records.cname.set(record[0].Name.split(".").shift(), record[0].ResourceRecords[0].Value);
                break;
        }
    }
    return records;
});
//# sourceMappingURL=getZoneInfoForDomain.js.map