"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRecordSet = void 0;
const cloudform_1 = require("cloudform");
const config_1 = require("../../config");
exports.ClientRecordSet = new cloudform_1.Route53.RecordSet({
    Name: cloudform_1.Fn.Ref("HostName"),
    Type: "A",
    HostedZoneId: cloudform_1.Fn.ImportValue(`${config_1.config.PROJECT_NAME}-hosted-zone`),
    AliasTarget: {
        DNSName: cloudform_1.Fn.GetAtt("ClientDistribution", "DomainName"),
        HostedZoneId: "Z2FDTNDATAQYW2"
    }
}).dependsOn("ClientDistribution");
//# sourceMappingURL=ClientRecordSet.js.map