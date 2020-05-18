"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayRole = void 0;
const cloudform_1 = require("cloudform");
exports.ApiGatewayRole = new cloudform_1.IAM.Role({
    RoleName: `nomad-house-api-gateway-role`,
    AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
            {
                Effect: "Allow",
                Action: "sts:AssumeRole",
                Principal: {
                    Service: "apigateway.amazonaws.com"
                }
            }
        ]
    }
});
//# sourceMappingURL=ApiGatewayRole.js.map