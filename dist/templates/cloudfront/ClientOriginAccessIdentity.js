"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientOriginAccessIdentity = void 0;
const cloudform_1 = require("cloudform");
exports.ClientOriginAccessIdentity = new cloudform_1.CloudFront.CloudFrontOriginAccessIdentity({
    CloudFrontOriginAccessIdentityConfig: {
        Comment: cloudform_1.Fn.Join("", [`origin access identity for `, cloudform_1.Fn.Ref("HostName")])
    }
});
//# sourceMappingURL=ClientOriginAccessIdentity.js.map