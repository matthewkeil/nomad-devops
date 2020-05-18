import { Lambda, Fn } from "cloudform";

export const CustomResourceProvider = new Lambda.Function({
  Description: "Nomad Devops CloudFormation Custom::Respource Provider",
  FunctionName: "nomad-devops-custom-resource-provider",
  Role: Fn.GetAtt("CustomResourceProviderRole", "Arn"),
  Runtime: "nodejs12.x",
  Code: {
    S3Bucket: "nomad-devops",
    S3Key: "resources/nomad-devops-custom-resources"
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
