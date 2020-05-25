"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResourceProvider = void 0;
const cloudform_1 = require("cloudform");
exports.CustomResourceProvider = new cloudform_1.Lambda.Function({
    Description: "Nomad Devops CloudFormation Custom::Respource Provider",
    FunctionName: "nomad-devops-custom-resource-provider",
    Role: cloudform_1.Fn.GetAtt("CustomResourceProviderRole", "Arn"),
    Runtime: "nodejs12.x",
    Code: {
        S3Bucket: cloudform_1.Fn.Ref("CustomResourceBucket"),
        S3Key: cloudform_1.Fn.Ref("CustomResourceKey")
    },
    Handler: "index.handler",
    MemorySize: 128,
    Environment: {
        Variables: {
            DEBUG: process.env.DEBUG,
            LAMBDA: "true"
        }
    }
}).dependsOn("CustomResourceProviderRole");
//# sourceMappingURL=CustomResourceProvider.js.map