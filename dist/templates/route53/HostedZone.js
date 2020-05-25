"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostedZone = void 0;
const cloudform_1 = require("cloudform");
const config_1 = require("../../config");
exports.HostedZone = {
    Type: "Custom::HostedZone",
    Properties: {
        ServiceToken: cloudform_1.Fn.ImportValue("NomadDevopsCustomResourceProvider"),
        Name: config_1.config.ROOT_DOMAIN,
        HostedZoneConfig: {
            Comment: `HostedZone for ${config_1.config.ROOT_DOMAIN}`
        }
    }
};
//# sourceMappingURL=HostedZone.js.map