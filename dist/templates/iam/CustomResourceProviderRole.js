"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResourceProviderRole = void 0;
const cloudform_1 = require("cloudform");
exports.CustomResourceProviderRole = new cloudform_1.IAM.Role({
    RoleName: "nomad-devops-custom-resource-provider-role",
    AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
            {
                Effect: "Allow",
                Action: "sts:AssumeRole",
                Principal: {
                    Service: "lambda.amazonaws.com"
                }
            }
        ]
    }
});
//# sourceMappingURL=CustomResourceProviderRole.js.map