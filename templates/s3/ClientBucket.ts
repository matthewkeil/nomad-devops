import { Fn, S3 } from "cloudform";

export const ClientBucket = new S3.Bucket({
  BucketName: Fn.Ref("HostName"),
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
