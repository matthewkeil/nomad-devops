"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostedZone = void 0;
const cloudform_1 = require("cloudform");
const config_1 = require("../../config");
exports.HostedZone = new cloudform_1.Route53.HostedZone({
    Name: config_1.config.ROOT_DOMAIN,
    HostedZoneConfig: {
        Comment: `HostedZone for ${config_1.config.ROOT_DOMAIN}`
    }
});
//# sourceMappingURL=HostedZone.js.map