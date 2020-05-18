"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResourceProvider = void 0;
const cloudform_1 = require("cloudform");
exports.CustomResourceProvider = new cloudform_1.Lambda.Function({
    Description: "Nomad Devops CloudFormation Custom::Respource Provider",
    FunctionName: "nomad-devops-custom-resource-provider",
    Role: cloudform_1.Fn.GetAtt("CustomResourceProviderRole", "Arn"),
    Runtime: "nodejs10.x",
    Code: {
        S3Bucket: cloudform_1.Fn.Ref("NomadDevopsBucket"),
        S3Key: cloudform_1.Fn.Ref("NomadDevopsHandlerKey")
    },
    Handler: "index.handler",
    MemorySize: 128
}).dependsOn("CustomResourceProviderPolicy");
//# sourceMappingURL=CustomResourceProvider.js.map