import { CloudFront, Fn } from "cloudform";
import { config } from "../../config";

export const ClientDistribution = new CloudFront.Distribution({
  DistributionConfig: {
    Aliases: [Fn.Ref("HostName")],
    Comment: Fn.Join("", ["cloudfront distribution for ", Fn.Ref("HostName")]),
    CustomErrorResponses: [
      {
        ErrorCachingMinTTL: 3600,
        ErrorCode: 403,
        ResponseCode: 200,
        ResponsePagePath: Fn.Join("", ["/", Fn.Ref("RootObject")])
      },
      {
        ErrorCachingMinTTL: 3600,
        ErrorCode: 404,
        ResponseCode: 200,
        ResponsePagePath: Fn.Join("", ["/", Fn.Ref("RootObject")])
      }
    ],
    DefaultCacheBehavior: {
      AllowedMethods: ["GET", "HEAD"],
      CachedMethods: ["GET", "HEAD"],
      TargetOriginId: "s3Origin",
      Compress: true,
      DefaultTTL: 60 * 60 * 24 * 7, // cache for a week
      MinTTL: 1,
      ViewerProtocolPolicy: "redirect-to-https",
      ForwardedValues: {
        QueryString: false,
        Cookies: {
          Forward: "none"
        }
      }
    },
    DefaultRootObject: Fn.Ref("RootObject"),
    Enabled: true,
    HttpVersion: "http2",
    Origins: [
      {
        Id: "s3Origin",
        DomainName: Fn.GetAtt("ClientBucket", "DomainName"),
        S3OriginConfig: {
          OriginAccessIdentity: Fn.Join("/", [
            "origin-access-identity/cloudfront",
            Fn.Ref("ClientOriginAccessIdentity")
          ])
        }
      }
    ],
    PriceClass: "PriceClass_100",
    ViewerCertificate: {
      AcmCertificateArn: Fn.ImportValue(`${config.PROJECT_NAME}-certificate`),
      MinimumProtocolVersion: "TLSv1.1_2016",
      SslSupportMethod: "sni-only"
    }
  }
}).dependsOn(["ClientBucket", "ClientOriginAccessIdentity"]);
