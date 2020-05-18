"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResourceProviderLogGroup = void 0;
const cloudform_1 = require("cloudform");
exports.CustomResourceProviderLogGroup = new cloudform_1.Logs.LogGroup({
    LogGroupName: cloudform_1.Fn.Join("/", ["/aws/lambda", cloudform_1.Fn.Ref("CustomResourceProvider")]),
    RetentionInDays: 7
});
//# sourceMappingURL=CustomResourceProviderLogGroup.js.map