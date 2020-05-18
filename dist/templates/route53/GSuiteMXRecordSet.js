"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GSuiteMXRecordSet = void 0;
const cloudform_1 = require("cloudform");
const config_1 = require("../../config");
exports.GSuiteMXRecordSet = new cloudform_1.Route53.RecordSet({
    Name: config_1.config.ROOT_DOMAIN.endsWith(".") ? config_1.config.ROOT_DOMAIN : `${config_1.config.ROOT_DOMAIN}.`,
    HostedZoneId: cloudform_1.Fn.Ref("HostedZone"),
    Type: "MX",
    TTL: "300",
    ResourceRecords: [
        "1 aspmx.l.google.com.",
        "5 alt1.aspmx.l.google.com.",
        "5 alt2.aspmx.l.google.com.",
        "10 aspmx2.googlemail.com.",
        "10 aspmx3.googlemail.com."
    ]
}).dependsOn("HostedZone");
//# sourceMappingURL=GSuiteMXRecordSet.js.map