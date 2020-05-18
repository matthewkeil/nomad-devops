"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientBucket = void 0;
const cloudform_1 = require("cloudform");
exports.ClientBucket = new cloudform_1.S3.Bucket({
    BucketName: cloudform_1.Fn.Ref("HostName"),
    CorsConfiguration: {
        CorsRules: [
            {
                AllowedHeaders: ["*"],
                AllowedMethods: ["GET", "HEAD"],
                AllowedOrigins: ["*"]
            }
        ]
    }
});
//# sourceMappingURL=ClientBucket.js.map