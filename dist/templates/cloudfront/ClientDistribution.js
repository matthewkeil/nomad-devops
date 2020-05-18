"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDistribution = void 0;
const cloudform_1 = require("cloudform");
const config_1 = require("../../config");
exports.ClientDistribution = new cloudform_1.CloudFront.Distribution({
    DistributionConfig: {
        Aliases: [cloudform_1.Fn.Ref("HostName")],
        Comment: cloudform_1.Fn.Join("", ["cloudfront distribution for ", cloudform_1.Fn.Ref("HostName")]),
        CustomErrorResponses: [
            {
                ErrorCachingMinTTL: 3600,
                ErrorCode: 403,
                ResponseCode: 200,
                ResponsePagePath: cloudform_1.Fn.Join("", ["/", cloudform_1.Fn.Ref("RootObject")])
            },
            {
                ErrorCachingMinTTL: 3600,
                ErrorCode: 404,
                ResponseCode: 200,
                ResponsePagePath: cloudform_1.Fn.Join("", ["/", cloudform_1.Fn.Ref("RootObject")])
            }
        ],
        DefaultCacheBehavior: {
            AllowedMethods: ["GET", "HEAD"],
            CachedMethods: ["GET", "HEAD"],
            TargetOriginId: "s3Origin",
            Compress: true,
            DefaultTTL: 60 * 60 * 24 * 7,
            MinTTL: 1,
            ViewerProtocolPolicy: "redirect-to-https",
            ForwardedValues: {
                QueryString: false,
                Cookies: {
                    Forward: "none"
                }
            }
        },
        DefaultRootObject: cloudform_1.Fn.Ref("RootObject"),
        Enabled: true,
        HttpVersion: "http2",
        Origins: [
            {
                Id: "s3Origin",
                DomainName: cloudform_1.Fn.GetAtt("ClientBucket", "DomainName"),
                S3OriginConfig: {
                    OriginAccessIdentity: cloudform_1.Fn.Join("/", [
                        "origin-access-identity/cloudfront",
                        cloudform_1.Fn.Ref("ClientOriginAccessIdentity")
                    ])
                }
            }
        ],
        PriceClass: "PriceClass_100",
        ViewerCertificate: {
            AcmCertificateArn: cloudform_1.Fn.ImportValue(`${config_1.config.PROJECT_NAME}-certificate`),
            MinimumProtocolVersion: "TLSv1.1_2016",
            SslSupportMethod: "sni-only"
        }
    }
}).dependsOn(["ClientBucket", "ClientOriginAccessIdentity"]);
//# sourceMappingURL=ClientDistribution.js.map