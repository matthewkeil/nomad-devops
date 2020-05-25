"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResourceProvider = void 0;
const cloudform_1 = require("cloudform");
exports.CustomResourceProvider = ({ Key, Bucket }) => new cloudform_1.Lambda.Function({
    Description: "Nomad Devops CloudFormation Custom::Respource Provider",
    FunctionName: "nomad-devops-custom-resource-provider",
    Role: cloudform_1.Fn.GetAtt("CustomResourceProviderRole", "Arn"),
    Runtime: "nodejs12.x",
    Code: {
        S3Bucket: Bucket,
        S3Key: Key
    },
    Handler: "index.handler",
    MemorySize: 128,
    Environment: {
        Variables: {
            DEBUG: process.env.DEBUG
        }
    }
}).dependsOn("CustomResourceProviderRole");
//# sourceMappingURL=CustomResourceProvider.js.map