import { Lambda, Fn } from "cloudform";

export const CustomResourceProvider = ({ Key, Bucket }: { Key: string; Bucket: string }) =>
  new Lambda.Function({
    Description: "Nomad Devops CloudFormation Custom::Respource Provider",
    FunctionName: "nomad-devops-custom-resource-provider",
    Role: Fn.GetAtt("CustomResourceProviderRole", "Arn"),
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
